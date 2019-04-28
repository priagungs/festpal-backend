User = require('../Model/User');

// POST api/user/
// req.body : email, name, address, phone, isUMKM, businessName, businessSector, businessDesc
exports.createUser = (req, res) => {
    const { email, name, address, phone, isUMKM, businessName, businessSector, businessDesc }  = req.body;
    var business = {name: businessName, sector: businessSector, desc: businessDesc};

    const createUserQuery = User.create({
       email, 
       name,
       address,
       phone,
       isUMKM,
       business
    });

    Promise.resolve(createUserQuery)
        .then((newUser) => {
            return res.json(newUser);
        })
        .catch((error) => {
            res.status(404).send('Not found');
        })
};

// GET api/user/:email
// req.params : email
exports.getUser = (req, res) => {
    const { email } = req.params;

    const getUserQuery = User.findOne({ email });
    
    Promise.resolve(getUserQuery)
        .then((user) => {
            if(!user)
                res.status(404).send('Not found');
            return res.json(user);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user with that email',
                data: error
            })
        })
    
};

// PUT api/user/book
exports.addBookedFestival = (req, res) => {
    const { idUser, idEvent } = req.body;

    let getUserQuery = User.findById(idUser)
    let getEventQuery = Event.findById(idEvent)

    Promise.all([getUserQuery, getEventQuery])
        .then((result) => {
            user = result[0]; event = result[1];
            let booking = {event: idEvent, status: false};
            user.bookedStands.push(booking);
            event.availableStands -= 1;

            Promise.all([user.save(), event.save()]) 
                .then((result) => {
                    return res.json({
                        status: "success",
                        message: "succesfully add new book"
                    })
                })
                .catch((err) => {
                    return res.json({
                        status: "error",
                        message: "failed to make booking"
                    })
                })

        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user',
                data: error
            })
        })
}

// PUT api/user/book/remove
exports.removeBookedFestival = (req, res) => {
    const { idUser, idEvent } = req.body;

    let getUserQuery = User.findById(idUser)
    let getEventQuery = Event.findById(idEvent)

    Promise.all([getUserQuery, getEventQuery])
        .then((result) => {
            user = result[0]; event = result[1];
            
            let obj = user.bookedStands.find(o => o.event === idEvent);
            let idx = user.bookedStands.indexOf(obj);
            user.bookedStands.splice(idx, 1);
            
            event.availableStands += 1;

            Promise.all([user.save(), event.save()]) 
                .then((result) => {
                    return res.json({
                        status: "success",
                        message: "succesfully remove book"
                    })
                })
                .catch((err) => {
                    return res.json({
                        status: "error",
                        message: "failed to remove booking"
                    })
                })

        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user',
                data: error
            })
        })
}

// PUT api/user/favorites
exports.addFavoriteFestival = (req, res) => {
    const { idUser, idEvent } = req.body;

    let getUserQuery = User.findById(idUser)
    let getEventQuery = Event.findById(idEvent)

    Promise.all([getUserQuery, getEventQuery])
        .then((result) => {
            user = result[0]; event = result[1];
            user.favoriteFestivals.push(idEvent);
            event.favoritedCount += 1;

            Promise.all([user.save(), event.save()]) 
                .then((result) => {
                    return res.json({
                        status: "success",
                        message: "succesfully add new favorite events"
                    })
                })
                .catch((err) => {
                    return res.json({
                        status: "error",
                        message: "failed to add new favorite"
                    })
                })

        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user',
                data: error
            })
        })
}

// PUT api/user/favorites/remove
exports.removeFavoriteFestival = (req, res) => {
    const { idUser, idEvent } = req.body;

    let getUserQuery = User.findById(idUser)
    let getEventQuery = Event.findById(idEvent)

    Promise.all([getUserQuery, getEventQuery])
        .then((result) => {
            user = result[0]; event = result[1];
            
            var idx = user.favoriteFestivals.indexOf(idEvent);
            user.favoriteFestivals.splice(idx, 1);
            event.favoritedCount -= 1;

            Promise.all([user.save(), event.save()]) 
                .then((result) => {
                    return res.json({
                        status: "success",
                        message: "succesfully removed favorite event"
                    })
                })
                .catch((err) => {
                    return res.json({
                        status: "error",
                        message: "failed to remove favorite"
                    })
                })

        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to remove favorite',
                data: error
            })
        })
}

// GET /api/user/favorites/:emailUser
// req.params : emailUser
exports.getUserFavoriteEvents = (req, res) => {
    const { email } = req.params;

    const getUserQuery = User.findOne({ email }).select("favoriteFestivals").populate("favoriteFestivals");
    
    Promise.resolve(getUserQuery)
        .then((user) => {
            return res.json(user.favoriteFestivals);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user with that email',
                data: error
            })
        })
    
};


// GET /api/user/book/:emailUser
// req.params : emailUser
exports.getUserBookedEvents = (req, res) => {
    const { email } = req.params;

    const getUserQuery = User.findOne({ email }).select("bookedStands").populate("bookedStands.event");
    
    Promise.resolve(getUserQuery)
        .then((user) => {
            return res.json(user.bookedStands);
        })
        .catch((error) => {
            return res.json({
                status: 'error',
                message: 'failed to retrieve user with that email',
                data: error
            })
        })
    
};