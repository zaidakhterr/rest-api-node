const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  channelsSubscribed: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
