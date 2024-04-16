import express from 'express';
import { News } from '../schemas/newsSchema.js';

const router = express.Router();

// const vaildateArticles = (articles) => {
//   return articles.filter((article) => {
//     return (
//       article.content && article.publishedAt && article.title && article.url
//     );
//   });
// };

router.get('/', async (req, res) => {
  console.log('news route hit!');
  try {
    const articles = await News.find();
    res.status(200).send(articles);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/', async (req, res) => {
//   console.log('news route hit!');

//   try {
//     // Fetch data from external API
//     const response = await fetch(
//       `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.API_KEY}`
//     );
//     const articles = await response.json();
//     const validatedArticles = vaildateArticles(articles.articles);

//     // Insert articles into MongoDB
//     // const insertedArticles = await News.insertMany(validatedArticles);

//     // Respond with inserted data
//     res.json(insertedArticles);
//   } catch (error) {
//     console.error('Error inserting data into MongoDB:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router;
