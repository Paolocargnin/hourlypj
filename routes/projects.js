var express = require('express');
var router = express.Router();

var _ = require('lodash-node');

var mongoose = require('mongoose');
var Projects = require('../models/Projects.js');
var Clients = require('../models/Clients.js');

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
  Projects.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    Clients.findById(req.body._client,function(err,client){
      var clientWithNewProj= client;
      clientWithNewProj.projects.push(post._id);
      
      Clients.findByIdAndUpdate(req.body._client,clientWithNewProj, function (err, post) {
        if (err) return next(err);
      })
    });
  });
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
    Clients.findById(post._client,function(err,client){
      var clientWithoutProj= {};

      clientWithoutProj.projects=_.filter(client.projects,function(pj){
        return pj != req.params.id;
      })
      
      Clients.findByIdAndUpdate(req.body._client,clientWithoutProj, function (err, post) {
        if (err) return next(err);
      })
    });

  });
});

module.exports = router;