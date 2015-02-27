var express = require('express');
var router = express.Router();

var _ = require('lodash-node');

var mongoose = require('mongoose');
var Projects = require('../models/Projects.js');
var Hours = require('../models/Hours.js');

/* GET /Hourss listing. */
router.get('/', function(req, res, next) {
  Hours.find(function (err, Hourss) {
    if (err) return next(err);
    res.json(Hourss);
  });
});

/* GET /Hourss/id */
router.get('/:id', function(req, res, next) {
  Hours.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /Hourss */
router.post('/', function(req, res, next) {
  Hours.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    Projects.findById(req.body._project,function(err,project){
      var projWithNewHour= project;
      projWithNewHour.hours.push(post._id);
      
      Projects.findByIdAndUpdate(req.body._project,projWithNewHour, function (err, post) {
        if (err) return next(err);
      })
    });
  });
});

/* PUT /Hourss/:id */
router.put('/:id', function(req, res, next) {
  Hours.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Hourss/:id */
router.delete('/:id', function(req, res, next) {
  Hours.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    Projects.findById(post._project,function(err,project){
      var projectWithoutHour= {};

      projectWithoutHour.hours=_.filter(project.hours,function(pj){
        return pj != req.params.id;
      })
      
      Projects.findByIdAndUpdate(post._project,projectWithoutHour, function (err, post) {
        if (err) return next(err);
      })
    });

  });
});

module.exports = router;