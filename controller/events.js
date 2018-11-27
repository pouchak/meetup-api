"use strict"
const meetupApi = require('./meetupapi.js')

/** getRelatedGroups
 * 1. Uses meetup api to retrieve related groups
 * 2. Returns an array of events from Meetup Api
 */
const getRelatedGroups = (options) => {
    return new Promise((resolve, reject)=>{
    meetupApi.getRelatedGroups(options.event, (err, res) => {
        if(err){
            let error = {
                status:err.response.status,
                message:err.response.text
            }
            reject(error)
        }
        resolve(res)
    })
})
}

/** getNextEvents
 * 1. Receives an array of related groups
 * 2. pulls next_event id's and urlnames from them
 * 3. returns an array of ids and ulrnames
 */
const getNextEventIds = (options, callback) => {
    return new Promise((resolve, reject)=>{
        let data = options.data;
        let urlArr = []
        
        for(let i=0; i<data.length;i++){
            if(data[i].next_event){//check that there is a next event
                urlArr.push({id:data[i].next_event.id, urlname:data[i].urlname, })
            }
        }
        resolve({data:urlArr})
    })
}
/** getEventDetails
 * 1. receives options.data, containing array of ids and urlnames
 * 2. iterates over each array element, sending each to an api call
 * 3. calculates the amount of array elements and returns the event details
 */
const getEventDetails = (options, callback) => {
    return new Promise((resolve, reject) =>{
        let resObject = {
            events:[],
            count:0
        }
        let arrVar = options.data
        let syncApiCall = function (val){
            return new Promise((resolve, reject)=>{
                meetupApi.getEvent(val, (err, res)=>{
                    resObject.events.push(res)
                    resolve(res)
                })
            })
        }
        let results = Promise.all(arrVar.map(syncApiCall));
        results.then(data=> {
            resObject.count = resObject.events.length;
            resolve(resObject)
        })
    })
}

module.exports = {
    getRelatedGroups,
    getNextEventIds,
    getEventDetails
}