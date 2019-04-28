var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    isUMKM: {type: Boolean, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    business: {name: String, sector: String, desc: String},
    bookedStands: [{event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}, status: String}],
    favoriteFestivals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

