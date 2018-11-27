//controller.js
const eventsController = require('../controller/events.js')
const testData = require('./testData')
const chai = require('chai')
const expect = chai.expect;


describe('Controller Tests', function(){
    describe('Events controller', function(){
        describe('getNextEventIds', function(){
            it('should be a function', function(done){
                expect(typeof eventsController.getNextEventIds).to.equal('function');
                done()
            })
        })
    })
})