var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    date: {type: Date, required: true},
    venue: {type: String, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
    standsCapacity: {type: Number, required: true},
    availableStands: {type: Number, required: true},
    pricePerStand: {type: Number, required: true},
    favoritedCount: {type: Number, required: true},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

