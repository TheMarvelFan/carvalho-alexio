const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Configure rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to all requests
app.use(limiter);

// Helper function to scrape Amazon
const scrapeAmazon = async (keyword) => {
    const url = `https://www.amazon.com/s?k=${keyword}`;
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const products = [];
    const items = document.querySelectorAll('.s-main-slot .s-result-item');

    items.forEach(item => {
        const title = item.querySelector('h2 a span')?.textContent;
        const rating = item.querySelector('.a-icon-alt')?.textContent;
        const reviewCount = item.querySelector('.a-size-small .a-size-base')?.textContent;
        const imageUrl = item.querySelector('.s-image')?.src;

        if (title && rating && reviewCount && imageUrl) {
            products.push({
                title,
                rating,
                reviewCount,
                imageUrl
            });
        }
    });

    return products;
};

// API endpoint to scrape Amazon
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    try {
        const products = await scrapeAmazon(keyword);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape Amazon' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
