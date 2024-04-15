import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.API_KEY}`
  )
    .then((response) => response.json())
    .then((articles) => res.send(articles));
});

export default router;
