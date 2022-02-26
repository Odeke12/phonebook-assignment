const express = require('express')
const app = express()
require("dotenv").config();
mongoose = require('mongoose')
// const studentRoutes = require('./routes/students')
const {MongoClient} = require('mongodb');
const { interfaces } = require('mocha');
const { serialize } = require('bson');

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
            sendMessage(res,400,{message:"Empty phone book"})
        }else{
            sendMessage(res,200,contacts) 
        }
    })

    app.post('/',(req,res) => {
        var check = false
        const {first_name,last_name, phone_number} = req.body
        if(first_name == undefined || last_name == undefined || phone_number == undefined){
            sendMessage(res,500,"Please enter the contact details")
        }
        if(typeof(first_name)!= "string" || typeof(last_name)!= "string"){
            sendMessage(res,500,"Please provide a valid name")
        }
        // else{
        //     contacts.push(req.body)
        //     sendMessage(res,200,contacts)
        // }
        contacts.forEach(contact => {
            if(contact.first_name == first_name && contact.last_name == last_name){
                sendMessage(res,200,"Name already exists")  
                check = true
            }else if(contact.phone_number == phone_number){
                sendMessage(res,200,"Phone number already exists")  
                check = true
            }
        })
        if(!check){
            contacts.push(req.body)
            sendMessage(res,200,{message: "Book successfully added!", contacts })
        }

    })

    app.post('/search/:id',(req,res) => {
        const search_results = []
        if(contacts.length == 0){
            sendMessage(res,200,"Cannot search an empty phone book") 
        }else{
        contacts.forEach(contact => {
            if(contact.first_name == req.params.id){
                search_results.push(contact)
            }else if(contact.last_name == req.params.id){
                search_results.push(contact)
            }else if(contact.phone_number == req.params.id){
                search_results.push(contact)
            }
        })
    }
    if(search_results.length == 0){
        sendMessage(res,401,"No search results")
    }else{
        sendMessage(res,200,search_results)
    }
})

app.delete('/remove/:id', (req,res) => {
    id = req.params.id
    if(contacts.length == 0){
        sendMessage(res,200,"Empty phone book") 
    }else{
    contacts.forEach((contact, index) => {
        if(contact.first_name == id || contact.last_name == id || contact.phone_number == id){
            // delete contacts[index]
            contacts.splice(index, 1)
            sendMessage(res,401,"Contact removed")
        }else{
            sendMessage(res,401,"Contact does not exist")
        }
    })
}
})

    const port = process.env.port || 3000

    app.listen(port, () =>{
        console.log(`Server running on port ${port}`);
    });
    
    module.exports = app