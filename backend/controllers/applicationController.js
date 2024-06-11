import { Application } from '../schemas/applicationSchema.js';
import { File } from '../schemas/fileSchema.js';
import { Vacancy } from '../schemas/vacancySchema.js';

export const submitApplication = async (req, res) => {
  const { name, surname, email, phone, vacancyId, cvId } = req.body;

  if (!name || !surname || !email || !phone || !vacancyId || !cvId) {
    return res.status(418).json('Lūdzu aizpildiet visus laukus!');
  }

  const vacancy = await Vacancy.findById(vacancyId);

  try {
    const newApplication = new Application({
      name,
      surname,
      email,
      phone,
      cvId,
      vacancyId,
      vacancyName: vacancy.title,
    });

    await newApplication.save();

    res.status(200).json('Pieteikums aizsūtīts!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda aizsūtot aplikāciju!');
  }
};

export const getAllApplications = async (req, res) => {
  console.log('GIT ROTUE!');
  try {
    const applications = await Application.find();
    res.status(200).send(applications);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error');
  }
};

export const getApplicationById = async (req, res) => {
  const id = req.params.id;
  try {
    const application = await Application.findById(id);
    const file = await File.findById(application.cvId);
    res.status(200).json({ application, file });
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const getApplicationCount = async (req, res) => {
  try {
    const count = await Application.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};

export const deleteApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const application = await Application.findById(id);
    await File.findByIdAndDelete(application.cvId);
    await Application.findByIdAndDelete(id);

    res.status(200).json('Veiksmigi dzesc!');
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong!');
  }
};
