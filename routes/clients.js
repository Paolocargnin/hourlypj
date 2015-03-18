var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Clients = require('../models/Clients.js');

/* GET /Clientss listing. */
router.get('/', function(req, res, next) {
  Clients.find(function (err, Clientss) {
    if (err) return next(err);
    var rt = {
      count: Clientss.length,
      clients: Clientss
    }
    res.json(rt);
  });
});

/* GET /Clientss/id */
router.get('/:id', function(req, res, next) {
  Clients.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /Clientss */
router.post('/', function(req, res, next) {
  Clients.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Clientss/:id */
router.put('/:id', function(req, res, next) {
  Clients.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Clientss/:id */
router.delete('/:id', function(req, res, next) {
  Clients.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;