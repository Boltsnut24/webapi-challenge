const express = require('express');
const User = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  User.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error getting projects.' });
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.getProjectActions(id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects)
      } else {
        res.status(404).json({ error: 'Projects with id does not match.' })
      }
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  User.update(id, { name, description })
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error updatig project.' })
    })
})

router.post('/', (req, res) => {
  const project = req.body;
  User.insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error inserting project.' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error deleting projects.' })
    })
});

module.exports = router;