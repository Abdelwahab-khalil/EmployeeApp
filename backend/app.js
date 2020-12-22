const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
require('./Employee')


app.use(bodyParser.json())

const Employee = mongoose.model("employee")
app.use(express.static(path.join(__dirname, 'build')))

const mongoUri = "// Votre lien mongodbAtlas"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo ")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})

app.get('/',(req,res)=>{
    
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
    
})


app.post('/send-data',(req,res)=>{
     const employee = new Employee({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         picture:req.body.picture,
         salary:req.body.salary,
         position:req.body.position,
         city:req.body.city

     })
     employee.save()
     .then(data=>{
         console.log(data)
         res.send(data)
     }).catch(err=>{
         console.log(err)
     })
     
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
        city:req.body.city
    }).then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(port,()=>{
    console.log("server running On "+port)
})
