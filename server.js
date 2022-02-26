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
                sendMessage(res,200,{message:"Phone number already exists"})  
                check = true
            }
        })
        if(!check){
            contacts.push(req.body)
            sendMessage(res,200,{message: "Book successfully added!", contacts })
        }

    })

    app.get('/search/:id',(req,res) => {
        const search_results = []
        if(contacts.length == 0){
            sendMessage(res,400,"Cannot search an empty phone book") 
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
        sendMessage(res,401,{message:"No search results"})
    }else{
        sendMessage(res,200,{message: "Contact found", search_results })
    }
})

app.delete('/remove/:id', (req,res) => {
    id = req.params.id
    if(contacts.length == 0){
        sendMessage(res,200,"Empty phone book") 
    }else{
    contacts.forEach((contact, index) => {
        if(contact.phone_number == id){
            // delete contacts[index]
            contacts.splice(index, 1)
            sendMessage(res,200,{message:"Contact removed"})
        }else{
            sendMessage(res,401,{message:"Contact does not exist"})
        }
    })
}
})

app.put('/update/:id', (req,res) => {
    number = req.params.id
    const {first_name,last_name, phone_number} = req.body
    if(first_name == undefined || last_name == undefined || phone_number == undefined){
        sendMessage(res,500,"Please enter the contact details")
    }
    if(typeof(first_name)!= "string" || typeof(last_name)!= "string"){
        sendMessage(res,500,"Please provide a valid name")
    }
    if(contacts.length == 0){
        sendMessage(res,200,{message:"Empty phone book"}) 
    }else{
    contacts.forEach(contact => {
        if(contact.phone_number == number){
        if(contact.first_name == first_name && contact.last_name == last_name){
            sendMessage(res,200,"Name already exists")  
            check = true
        }else if(contact.phone_number == phone_number){
            sendMessage(res,200,{message:"Phone number exists"})  
        } else{
            contact.first_name = first_name
            contact.last_name = last_name
            contact.phone_number = phone_number
            sendMessage(res,200,{message:"Contact editted", contact})  
        }    
        }else{
            sendMessage(res,200,{message:"Phone number does not exist"})  
        }
    
    })
}
})

    const port = process.env.port || 3000

    app.listen(port, () =>{
        console.log(`Server running on port ${port}`);
    });
    
    module.exports = app