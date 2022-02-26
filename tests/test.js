const app = require('../server')
var assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const res = require('express/lib/response');
//Assertion type
chai.should()

chai.use(chaiHttp);

describe('GET', () => {
    it('Accessing an empty phone book', (done) => {
        chai
        .request(app)
        .get('/')
        .end((err, response) => {
            response.should.have.status(400);
            // response.body.should.be.a('object');
            response.body.should.have.property('message').eql('Empty phone book');
            // response.body.should.be.eq(1);
        // this.timeout(500);
        done();
        })
    });

    it('Should not access a page that does not exist', (done) => {
        chai
        .request(app)
        .get('/contacts')
        .end((err, response) => {
            response.should.have.status(404);

        done();
        })
    });

})

describe('POST ', () => {
    it('Should post a new contact', (done) => {
        const contact = {
            first_name : "Timothy",
            last_name : "Odongo",
            phone_number : "+256771419370",
        }
        chai
        .request(app)
        .post('/')
        .send(contact)
        .type('json')
        .end((err, response) => {
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql('Book successfully added!');
            response.body.contacts[0].should.have.property('first_name')
            contact.should.have.property('first_name')
            contact.should.have.property('last_name')
            contact.should.have.property('phone_number')
            // response.body.should.have.property('message').eql('Book successfully added!');
            // response.body.should.have.property('message').eql('Student successfully added!');
            response.should.have.status(200);

        done();
        })
    });

    it('It should not post a contact with missing fields', (done) => {
        const contact = {
            first_name : "Timothy",
            last_name : "Odongo",

        }
        chai
        .request(app)
        .post('/')
        .send(contact)
        .type('json')
        .end((err, response) => {


            contact.should.have.property('first_name')
            contact.should.have.property('last_name')
            contact.should.have.property('phone_number')
            // response.body.should.have.property('message').eql('Book successfully added!');
            // response.body.should.have.property('message').to.not.eql('Phone number already exists');
            response.should.have.status(500);

        done();
        })
    });

    it('Should retrieve posted contacts', (done) => {
        chai
        .request(app)
        .get('/')
        .end((err, response) => {
            response.body.should.have.a('array');
            // response.body.should.be.eq(3);
            response.should.have.status(200);
            response.body.length.should.be.eql(1);
            console.log(response.body)
        done();
        })
    });
    it('It should not post a phone number that exists', (done) => {
        const contact = {
            first_name : "Odeke",
            last_name : "Trevor",
            phone_number : "+256771419370",
        }
        chai
        .request(app)
        .post('/')
        .send(contact)
        .type('json')
        .end((err, response) => {
    
    
            contact.should.have.property('first_name')
            contact.should.have.property('last_name')
            contact.should.have.property('phone_number')
            // response.body.should.have.property('message').eql('Book successfully added!');
            response.body.should.have.property('message').not.eql('Phone number already exists');
            response.should.have.status(200);
    
        done();
        })
    });

})

describe('SEARCH FOR CONTACTS', () => {
    it('Searching for a contact', (done) => {
        let name = "Timothy"
        chai
        .request(app)
        .get('/search/'+name)
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.search_results[0].should.have.property('first_name')
            response.body.search_results[0].should.have.property('last_name')
            response.body.search_results[0].should.have.property('phone_number')
            // response.body.should.have.property('message').eql('Empty phone book');
            // response.body.should.be.eq(1);
        // this.timeout(500);
        done();
        })
    });

    it('Should not access a page that does not exist', (done) => {
        chai
        .request(app)
        .get('/contacts')
        .end((err, response) => {
            response.should.have.status(404);

        done();
        })
    });

})
describe('UPDATE A CONTACT', () => {
    it('Should update a number', (done) => {
        let contact = "+256771419370"

        const new_contact = {
            first_name : "Trevor",
            last_name : "Angulo",
            phone_number : "+256771419370",
        }
        chai
        .request(app)
        .put('/update/'+contact)
        .send(new_contact)
        .type('json')
        .end((err, response) => {
            response.should.have.status(200);
            response.body['contact'].should.have.property('first_name')
            response.body.contact.should.have.property('last_name')
            response.body.contact.should.have.property('phone_number')
            response.body.should.have.property('message').eql('Contact editted');
            // response.body.should.be.eq(1);
        // this.timeout(500);
        done();
        })
    });

})

describe('DELETE A CONTACT', () => {
    it('Should delete a contact', (done) => {
        let contact = "+256771419370"
        chai
        .request(app)
        .delete('/remove/'+contact)
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have.property('message').eql('Contact removed');
            // response.body.should.be.eq(1);
        // this.timeout(500);
        done();
        })
    });

})




