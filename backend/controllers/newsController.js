import { News } from '../schemas/newsSchema.js';

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

  console.log('Request body:', req.body);  // Debug log

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

  try {
    const article = await News.findById(id);
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, iegūstot datus no MongoDB!');
  }
};

export const deleteNews = async (req, res) => {
  const id = req.params.id;

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

  if (!title || !content) {
    return res.status(400).send('Lūdzu, aizpildiet visus nepieciešamos laukus!');
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        publishedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).send('Ziņu raksts nav atrasts!');
    }
    res.status(200).json('Ziņu raksts veiksmīgi atjaunināts!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda, atjauninot datus MongoDB!');
  }
};
