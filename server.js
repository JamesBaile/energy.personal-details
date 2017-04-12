'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var PersonalDetails = require('./models/personal-details');

// Use environment defined port or 3001
var port = process.env.PORT || 3001;
var mongoConnection = process.env.MONGO || 'mongodb://mongo:27017/energy-usage';

console.log(mongoConnection);

mongoose.connect(mongoConnection);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create our Express router
var router = express.Router();

router.get('/private/ping', function(req, res) {
  res.json({ message: 'pong' });
});

router.get('/health', function(req, res) {
  res.json({ serviceName: 'energy.personal-details', version: "1.0.0.0", isOk: true });
});

// -- New Code Below Here -- //

var route = router.route('/personal-details');


route.post(function(req, res) {
  // Create a new instance of the PersonalDetails model
  var details = new PersonalDetails();

  details.customerId = req.body.customerId;
  details.emailAddress = req.body.emailAddress;
  details.lastName = req.body.lastName;
  details.firstName = req.body.firstName;
  details.dateOfBirth = req.body.dateOfBirth;
  details.mobilePhoneNumber =  req.body.mobilePhoneNumber;
  details.postcode = req.body.postcode;
  details.gasUsage = req.body.gasUsage;
  details.gasUsagePeriod = req.body.gasUsagePeriod;
  details.gasLastBillingPeriod = req.body.gasLastBillingPeriod
  details.electricityUsage = req.body.electricityUsage;
  details.electricityUsagePeriod = req.body.electricityUsagePeriod;
  details.electricityLastBillingPeriod = req.body.electricityLastBillingPeriod;


  details.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'PersonalDetails usage saved', data: details });
  });
});

route.get(function(req, res) {
  console.log('searching for customer ' + req.params.customerId);
  PersonalDetails.findOne({"customerId": req.params.customerId}, function(err, details) {
    if (err)
      res.send(err);

    res.json(details);
  });
});


route.put(function(req, res) {
  PersonalDetails.findOne({"customerId": req.params.customerId}, function(err, details) {
    if (err)
      res.send(err);

      details.emailAddress = req.body.emailAddress;
      details.lastName = req.body.lastName;
      details.firstName = req.body.firstName;
      details.dateOfBirth = req.body.dateOfBirth;
      details.mobilePhoneNumber =  req.body.mobilePhoneNumber;
      details.postcode = req.body.postcode;
      details.gasUsage = req.body.gasUsage;
      details.gasUsagePeriod = req.body.gasUsagePeriod;
      details.gasLastBillingPeriod = req.body.gasLastBillingPeriod
      details.electricityUsage = req.body.electricityUsage;
      details.electricityUsagePeriod = req.body.electricityUsagePeriod;
      details.electricityLastBillingPeriod = req.body.electricityLastBillingPeriod;

    details.save(function(err) {
      if (err)
        res.send(err);

      res.json(details);
    });
  });
});

route.delete(function(req, res) {
  PersonalDetails.findOneAndRemove({"customerId": req.params.customerId}, function(err, details) {
    if (err)
      res.send(err);

    res.json({ message: 'PersonalDetails removed' });
  });
});

// Register all our routes with /api
app.use('/', router);

app.listen(port);
console.log('Running on http://localhost:' + port);
