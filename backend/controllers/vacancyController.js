import { Vacancy } from '../schemas/vacancySchema.js';

export const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json(vacancies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const createVacancy = async (req, res) => {
  const {
    title,
    description,
    address,
    salary,
    experience,
    workTime,
    workType,
    load,
    tags,
  } = req.body;

  if (!title || !description || !address) {
    res.status(418).send('Lūdzu aizpildiet visus obligātos laukus!');
  }

  const newVacancy = {
    title,
    description,
    address,
    salary,
    experience,
    workTime,
    workType,
    load,
  };

  if (tags) {
    newVacancy.tags = tags;
  }

  try {
    const vacancy = new Vacancy(newVacancy);

    await vacancy.save();
    res.status(200).json('Sludinājums izveidots!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const getVacancyCount = async (req, res) => {
  try {
    const count = await Vacancy.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const getSingleVacancy = async (req, res) => {
  const id = req.params.id;

  try {
    const vacancy = await Vacancy.findById(id);
    res.status(200).json(vacancy);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};

export const deleteVacancy = async (req, res) => {
  const id = req.params.id;

  try {
    await Vacancy.findByIdAndDelete(id);
    res.status(200).json('Vacancy deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting vacancy!');
  }
};

export const editVacancy = async (req, res) => {
  const {
    title,
    description,
    address,
    salary,
    experience,
    workTime,
    workType,
    load,
  } = req.body;

  if (!title || !description || !address) {
    return res.status(418).send('Lūdzu aizpildiet visus obligātos laukus!');
  }

  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        address,
        salary,
        experience,
        workTime,
        workType,
        load,
      },
      { new: true }
    );

    if (!updatedVacancy) {
      return res.status(400).send('Vakance nav atrasta!');
    }
    res.status(200).json('Vakance rediģēta!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Kļūda ienākošajos datus!');
  }
};
