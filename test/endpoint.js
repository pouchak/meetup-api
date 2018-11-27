const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server');
const expect = chai.expect;
chai.use(chaiHttp)


describe('endpoint tests', function(){
    describe('healthcheck', function(){
        it('should return 200', function(done){
            chai.request(server)
            .get('/health')
            .end((err, res)=>{
                expect(err).to.not.exist;
                expect(res).to.have.status(200);
                done()
            })
        })
    })
    describe('/relatedevents/{meetup_group_urlname}', function(){
        it('should hit the events endpoint with a correct group name', function(done){
            chai.request(server)
            .get('/relatedevents/javascriptla')
            .end((err, res)=>{
                expect(err).to.not.exist;
                expect(res).to.have.status(200);
                done()
            })
        })
        it('should hit the events endpoint with an incorrect group name', function(done){
            chai.request(server)
            .get('/relatedevents/javascript---la')
            .end((err, res)=>{
                //expect(err).to.exist;
                expect(res).to.have.status(404);
                done()
            })
        })
    })
})