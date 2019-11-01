const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

//Getting all Subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

//Creating a Subscriber
router.post('/', async (req, res) => {
  const { name } = req.body;
  const subscriber = new Subscriber({ name });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

//Getting a Subscriber
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

//Updating a Subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
  const { name, increment } = req.body;

  if (name) {
    res.subscriber.name = name;
  }
  if (increment) {
    res.subscriber.channelsSubscribed += increment;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

//Deleting a Subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted subscriber' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

//getSubscriber Middleware
async function getSubscriber(req, res, next) {
  let subscriber;

  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  } catch ({ message }) {
    return res.status(500).json({ message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
