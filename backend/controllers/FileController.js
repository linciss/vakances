import multer from 'multer';
import { File } from '../schemas/fileSchema.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  if (req.file.mimetype !== 'application/pdf') {
    return res.status(418).json('Nepareizs faila formāts');
  }

  //if file size is bigger than 5mb return
  if (req.file.size > 5000000) {
    return res.status(418).json('Faila izmērs ir pārāk liels');
  }
  
  const newFile = new File({
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    data: req.file.buffer,
    size: req.file.size,
  });

  try {
    const savedFile = await newFile.save();
    res.status(200).json(savedFile._id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFiles = async (req, res) => {
  console.log(req.params.id);
  try {
    const files = await File.findById(req.params.id);
    res.status(200).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};
