import mongoose from 'mongoose';
import { News } from '../schemas/newsSchema.js';
import { File } from '../schemas/fileSchema.js';

// Helper function to validate ObjectId format
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const getNews = async (req, res) => {
  try {
    const articles = await News.find().populate('imgId');
    console.log(articles);
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, iegūstot datus no MongoDB!');
  }
};

export const createNews = async (req, res) => {
  const { title, content, imgId } = req.body;
  if (!title || !content || !imgId) {
    return res
      .status(400)
      .json({ message: 'Lūdzu, aizpildiet visus nepieciešamos laukus!' });
  }

  try {
    const news = new News({
      title,
      content,
      imgId,
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
    const article = await News.findById(id).populate('imgId');
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
    const news = await News.findById(id);
    await File.findByIdAndDelete(news.imgId);
    await News.findByIdAndDelete(id);

    res.status(200).json('Ziņu raksts veiksmīgi dzēsts!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, dzēšot ziņu rakstu!');
  }
};

export const editNews = async (req, res) => {
  const { title, content, imgId } = req.body;
  const id = req.params.id;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'Lūdzu, aizpildiet visus nepieciešamos laukus!' });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const update = {
      title,
      content,
      publishedAt: new Date(),
    };

    if (imgId) {
      const news = await News.findById(id);
      await File.findByIdAndDelete(news.imgId);
      update.imgId = imgId;
    }

    const updatedNews = await News.findByIdAndUpdate(id, update, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ message: 'Ziņu raksts nav atrasts!' });
    }
    res.status(200).json({ message: 'Ziņu raksts veiksmīgi atjaunināts!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, atjauninot datus MongoDB!');
  }
};
