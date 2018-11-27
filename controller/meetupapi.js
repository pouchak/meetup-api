"use strict"
const superagent = require('superagent');
const config = require('../config.js')

/** getRelatedGroups
 * 
 * 1. Receives a group name
 * 2. Returns an array of related groups from the meetup.com api.
 */
const getRelatedGroups = (options, callback)=>{
    let url = 'https://api.meetup.com/' + options + '/similar_groups'
    superagent.get(url)
    .query({key:config.apikey, sign:'true'})
    .end((err, res) => {
        if(err){
            callback(err, null)
        }else{
            callback(null, {data:res.body})
        }
    })
}
/** getEvent
 * 1. receives a next_event id and a urlName
 * 2. returns a number of event detail objects from the meetup.com api.
 */
const getEvent = (options, callback)=>{
    let url = 'https://api.meetup.com/' + options.urlname + '/events/' + options.id
    superagent.get(url)
    .query({key:config.apikey, sign:'true'})
    .end((err, res) => {
        if(err){
            callback(err, null)
        }else{
            callback(null, res.body)
        }
    })
}
module.exports = {
    getEvent,
    getRelatedGroups
}