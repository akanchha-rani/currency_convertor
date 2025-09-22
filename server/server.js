import axios from 'axios';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

const app = express();
config({ path: './config/config.env' });

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/convert', async (req, res) => {
    const { base_currency, currencies } = req.query;
    try {
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.API_KEY}&base_currency=${base_currency}&currencies=${currencies}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.log("Error fetching data", error.message, error.response?.data);
        res.status(500).json({
            message: 'Error fetching data',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
