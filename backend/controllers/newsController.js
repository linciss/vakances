import mongoose from 'mongoose';
import { News } from '../schemas/newsSchema.js';

// Helper function to validate ObjectId format
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const getNews = async (req, res) => {
  try {
    const articles = await News.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, iegūstot datus no MongoDB!');
  }
};

export const createNews = async (req, res) => {
  const { title, content } = req.body;

  console.log('Request body:', req.body); // Debug log

  if (!title || !content) {
    return res.status(400).json({ message: 'Lūdzu, aizpildiet visus nepieciešamos laukus!' });
  }

  try {
    const news = new News({
      title,
      content,
      publishedAt: new Date(),
    });

    await news.save();
    res.status(200).json({ message: 'Ziņu raksts veiksmīgi izveidots!' });
  } catch (err) {
    console.error('Kļūda, saglabājot datus MongoDB:', err);
    res.status(500).json({ message: 'Kļūda, saglabājot datus MongoDB!' });
  }
};

export const getNewsCount = async (req, res) => {
  try {
    const count = await News.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, iegūstot datus no MongoDB!');
  }
};

export const getSingleNews = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const article = await News.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, iegūstot datus no MongoDB!');
  }
};

export const deleteNews = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    await News.findByIdAndDelete(id);
    res.status(200).json('Ziņu raksts veiksmīgi dzēsts!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, dzēšot ziņu rakstu!');
  }
};

export const editNews = async (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Lūdzu, aizpildiet visus nepieciešamos laukus!' });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      {
        title,
        content,
        publishedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'Ziņu raksts nav atrasts!' });
    }
    res.status(200).json({ message: 'Ziņu raksts veiksmīgi atjaunināts!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, atjauninot datus MongoDB!');
  }
};
