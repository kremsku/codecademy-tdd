const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }

});

router.get('/items/:bearId', async (req, res, next) => {
  const bear = await Item.findById(req.params.bearId);
  res.render('single', {bear: bear});
});

router.post('/items/:bearId/delete', async (req, res, next) => {
  const bear = await Item.findByIdAndRemove(req.params.bearId);
  const items = await Item.find({});
  res.render('index', {items});
});

module.exports = router;
