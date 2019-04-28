let router = require('express').Router();
const { createUser, getUser, getUserBookedEvents, getUserFavoriteEvents,
        addFavoriteFestival, addBookedFestival,
        removeBookedFestival, removeFavoriteFestival } = require('./Controller/user');
const { createEvent, getEvent, 
    getEvents, getEventsByName } = require('./Controller/event');
// const { createBRIVA } = require('./Controller/briapi')

// Test API
router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'All iz well'
    });
});

// User API
router.post('/user/', createUser);
router.get('/user/:email', getUser);
router.get('/user/favorites/:email', getUserFavoriteEvents);
router.get('/user/books/:email', getUserBookedEvents);
router.put('/user/books/remove', removeBookedFestival);
router.put('/user/favorites/remove', removeFavoriteFestival);
router.put('/user/favorites', addFavoriteFestival);
router.put('/user/books', addBookedFestival);


// Event API
router.post('/event', createEvent);
router.get('/event/:idEvent', getEvent);
router.get('/events/:eventName', getEventsByName)
router.get('/events', getEvents);


// BRI API
// router.post('/briva/create', createBRIVA);   

module.exports = router;