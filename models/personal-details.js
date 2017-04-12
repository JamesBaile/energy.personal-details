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
  gasUsagePeriod: Number,
  gasLastBillingPeriod: Number,
  gasUsageType: Number,
  electricityUsage: Number,
  electricityUsagePeriod: Number,
  electricityLastBillingPeriod: Number,
  electricityUsafeType: Number
});;

// Export the Mongoose model
module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
