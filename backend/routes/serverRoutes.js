const express = require('express');
const axios = require('axios');
const cryptoData = require('../models/cryptoData');
const cron = require('node-cron');

const router = express.Router();
// Task 1  : Background job to fetch crypto data every 2 hours ...
cron.schedule('0 */2 * * *', async () => {
    console.log("Cron job started...");
    await fetchCryptoData();  // Call the same function in cron job
    console.log("Cron job finished.");
});

// Manually callable function to fetch and save data
async function fetchCryptoData() {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    for (let coin of coins) {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
            const data = res.data[coin];
            const newData = new cryptoData({
                coin: coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24th: data.usd_24h_change
            });
            await newData.save();
            console.log(`${coin} data saved`);
        } catch (err) {
            console.log(`Error fetching ${coin} data:`, err);
        }
    }
}

// Call this function manually for testing or on-demand
fetchCryptoData();


// Task 2 : Latest stats Api ...
router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    console.log(coin);

    try {
        const latestData = await cryptoData.findOne({ coin }).sort({ timestamp: -1 });
        if (latestData) {
            res.json({
                price: latestData.price,
                marketCap: latestData.marketCap,
                '24thChange': latestData.change24th
            });
        } else {
            res.status(404).json({ error: 'No data found for the requested coin' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Task 3  :  standard  deviation Api ...
router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    try {
        const prices = await cryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');
        const priceValues = prices.map((entry) => entry.price);

        if (priceValues.length < 2) {
            return res.json({ deviation: 0 });
        }

        // Calculate standard deviation ...
        const mean = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
        const variance = priceValues.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / priceValues.length;
        const stdDeviation = Math.sqrt(variance);

        res.json({ deviation: stdDeviation.toFixed(2) });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
