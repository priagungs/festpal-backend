Event = require('../Model/Event');

// POST api/event/
// req.body : name, date, venue, desc, image, standsCapacity, availableStands, pricePerStand, favoritedCount
exports.createEvent = (req, res) => {
    const { name, date, venue, desc, image, standsCapacity, availableStands, pricePerStand, favoritedCount }  = req.body;
    
    const createEventQuery = Event.create({
        name, date, venue, desc, image, standsCapacity, availableStands, pricePerStand, favoritedCount
    });

    Promise.resolve(createEventQuery)
        .then((newEvent) => {
            return res.json(newEvent);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to create new event',
                data: error
            })
        })
};

// GET api/event/:idEvent
// req.params : idEvent
exports.getEvent = (req, res) => {
    const { idEvent } = req.params;

    const getEventsQuery = Event.findById(idEvent);

    Promise.resolve(getEventsQuery)
        .then((event) => {
            return res.json(event);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve event',
                data: error
            })
        })
}


// GET api/events/
// req.query : pageNum, limit, sortBy={date, favoritedCount}
exports.getEvents = (req, res) => {
    const pageNum = req.query.pageNum ? (Number) (req.query.pageNum-1) : 0;
    const limit = req.query.limit ? (Number) (req.query.limit) : 5;
    let sortBy = req.query.sortBy ? req.query.sortBy : "favoritedCount";
    sortBy = "-" + sortBy;

    const getEventsQuery = 
        Event.find()
            .limit(limit)
            .skip(pageNum*limit)
            .sort(sortBy)

    Promise.resolve(getEventsQuery)
        .then((events) => {
            return res.json(events);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve events',
                data: error
            })
        })
}

// GET api/events/:eventName
// req.params : eventName
exports.getEventsByName = (req, res) => {
    let { eventName } = req.params;
    eventName = new RegExp(eventName, 'i');
    console.log(eventName);
    const getEventsQuery = Event.find({name: {$regex: eventName}}).sort('-date');
    Promise.resolve(getEventsQuery)
        .then((events) => {
            return res.json(events);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve events',
                data: error
            })
        })
}