/* eslint-disable @typescript-eslint/no-var-requires */

import express from 'express';
import axios from 'axios';
require('dotenv').config()

interface ItemProps {
  id: string;
  title: string;
  currency_id: string;
  price: number;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/items', async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);

    const formattedResponse = {
      author: {
        name: 'Julio Cesar',
        lastname: 'Arroyave',
      },
      categories: response.data.filters[0].values[0].path_from_root,
      items: response.data.results.slice(0, 4).map((item: ItemProps ) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: item.price % 1 ? Number((item.price % 1).toFixed(2).split('.')[1]) : 0,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error('Error en /api/items:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ]);

    const formattedResponse = {
      author: {
        name: 'Julio Cesar',
        lastname: 'Arroyave',
      },
      item: {
        id: itemResponse.data.id,
        title: itemResponse.data.title,
        price: {
          currency: itemResponse.data.currency_id,
          amount: Math.floor(itemResponse.data.price),
          decimals: itemResponse.data.price % 1
            ? Number((itemResponse.data.price % 1).toFixed(2).split('.')[1])
            : 0,
        },
        picture: itemResponse.data.thumbnail,
        condition: itemResponse.data.condition,
        free_shipping: itemResponse.data.shipping.free_shipping,
        sold_quantity: itemResponse.data.sold_quantity,
        description: descriptionResponse.data.plain_text,
        category: itemResponse.data.category_id
      },
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error('Error in /api/items/:id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en: http://localhost:${PORT}`);
});