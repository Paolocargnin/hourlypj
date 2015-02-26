var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Projects = require('../models/Projects.js');

/* GET /Projectss listing. */
router.get('/', function(req, res, next) {
  Projects.find(function (err, Projectss) {
    if (err) return next(err);
    res.json(Projectss);
  });
});

/* GET /Projectss/id */
router.get('/:id', function(req, res, next) {
  Projects.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /Projectss */
router.post('/', function(req, res, next) {
  res.json(req.body);
  // Projects.create(req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });
});

/* PUT /Projectss/:id */
router.put('/:id', function(req, res, next) {
  Projects.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Projectss/:id */
router.delete('/:id', function(req, res, next) {
  Projects.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;