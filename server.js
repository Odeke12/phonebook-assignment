const express = require('express')
const app = express()
require("dotenv").config();
mongoose = require('mongoose')
// const studentRoutes = require('./routes/students')
const {MongoClient} = require('mongodb');
const { interfaces } = require('mocha');

const client = new MongoClient(process.env.DATABASE);


const contacts = []

// mongoose.connect(
//     process.env.DATABASE,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // useCreateIndex: true,
// });

// mongoose.connection
//     .on('open', () => {
//         console.log('Mongoose connection open');
//     })
//     .on('error', (err) => {
//         console.log(`Connection error: ${err.message}`);
//     });  

 app.use(express.json());                                     
 app.use(express.urlencoded({extended: true}));               
 app.use(express.text());                                    
 app.use(express.json({ type: 'application/json'}));  

 const sendMessage = (res,status_num,message) => {
    res.status(status_num).send(message);
}

    app.get('/',(req,res) => {
        if(contacts.length == 0){
            console.log('No numbers yet')
            sendMessage(res,400,"Empty phone book")
        }else{
            sendMessage(res,400,contacts) 
        }
    })

    app.post('/',(req,res) => {
        if(req.body.first_name == undefined || req.body.last_name == undefined || req.body.phone_number == undefined){
            sendMessage(res,500,"Please enter all fields")
        }else{
            contacts.push(req.body)
            sendMessage(res,200,contacts)
        }
    })

    const port = process.env.port || 3000

    app.listen(port, () =>{
        console.log(`Server running on port ${port}`);
    });
    
    module.exports = app