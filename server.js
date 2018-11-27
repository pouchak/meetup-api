"use strict"

const config = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser');
const app = express();

/** controllers */
const eventsController = require('./controller/events.js')

/** @healthcheck */
app.route('/health')
    .get((req, res)=>{
        res.sendStatus(200)
    })

/**  Related Events */
app.get('/relatedevents/:event', function(req,res){

    eventsController.getRelatedGroups(req.params)
    .then(groups => eventsController.getNextEventIds(groups))
    .then(eventIds => eventsController.getEventDetails(eventIds))
    .then(details =>{
        res.json(details)
    })
    .catch((err)=>{
        res.status(err.status).send(err.message);
    })
})

/** Start Server */
app.listen(config.port, () => {
    console.log(`listening on ${config.port}.`)
})

/** For Endpoint Testing */
module.exports = app