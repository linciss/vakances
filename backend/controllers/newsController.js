import { News } from '../schemas/newsSchema.js';

export const getNews = async (req, res) => {
  try {
    const articles = await News.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from MongoDB!');
  }
};

export const createNews = async (req, res) => {
  const {
    author,
    content,
    description,
    publishedAt,
    source,
    title,
    url,
    urlToImage,
  } = req.body;

  if (!content || !publishedAt || !title || !url) {
    return res.status(400).send('Please fill all the required fields!');
  }

  try {
    const news = new News({
      author,
      content,
      description,
      publishedAt,
      source,
      title,
      url,
      urlToImage,
    });

    await news.save();
    res.status(200).json('News article created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data to MongoDB!');
  }
};

export const getNewsCount = async (req, res) => {
  try {
    const count = await News.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from MongoDB!');
  }
};

export const getSingleNews = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await News.findById(id);
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from MongoDB!');
  }
};

export const deleteNews = async (req, res) => {
  const id = req.params.id;

  try {
    await News.findByIdAndDelete(id);
    res.status(200).json('News article deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting news article!');
  }
};

export const editNews = async (req, res) => {
  const {
    author,
    content,
    description,
    publishedAt,
    source,
    title,
    url,
    urlToImage,
  } = req.body;

  if (!content || !publishedAt || !title || !url) {
    return res.status(400).send('Please fill all the required fields!');
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        author,
        content,
        description,
        publishedAt,
        source,
        title,
        url,
        urlToImage,
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).send('News article not found!');
    }
    res.status(200).json('News article updated successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating data in MongoDB!');
  }
};
