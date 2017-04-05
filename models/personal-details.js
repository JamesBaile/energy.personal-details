var mongoose = require('mongoose');

// Define our beer schema
var PersonalDetailsSchema   = new mongoose.Schema({
  customerId: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  mobilePhoneNumber: String,
  postcode: String,
  gasUsage: Number,
  gasUsagePeriod: String,
  gasLastBillingPeriod: Date,
  electricityUsage: Number,
  electricityUsagePeriod: String,
  electricityLastBillingPeriod: Date
});

// Export the Mongoose model
module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
