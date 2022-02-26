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
            response.body.should.have.property('message').eql('Student successfully added!');
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

})

// describe('DELETE STUDENT ', () => {
//     it('Should delete a student', (done) => {

//         chai
//         .request(app)
//         .post('/api/students/delete/2')
//         // .type('form')
//         .end((err, response) => {
//             // response.body.should.have.property('message').eql('Student successfully added!');
//             response.should.have.status(400);

//         done();
//         })
//     });

// })

describe('UPDATE STUDENT ', () => {
    it('Should not update non existing student', (done) => {
        const student = {
            '_method': 'post',
            first_name : "Timothy",
            last_name : "Odongo",
            reg_no : "18/U/23423/PS",
            age: 12,
            stclass: "P6"
        }
        chai
        .request(app)
        .post('/students/update/2')
        .send(student)
        .type('form')
        .end((err, response) => {

            // student.should.have.property('first_name')
            // student.should.have.property('last_name')
            // student.should.have.property('reg_no')
            // student.should.have.property('age')
            // console.log(response.body)
            // response.should.have.property('message').eql('Student does not exist');
            response.should.have.status(400);

        done();
        })
    });


})

