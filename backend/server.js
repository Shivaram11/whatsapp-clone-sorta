//importing
const express= require('express')
const mongoose= require("mongoose")
const  Messages  = require('./dbMessages')
const Pusher = require("pusher");
const cors = require("cors")

//app config
const app= express()
const port =process.env.PORT||9000

const pusher = new Pusher({
  appId: "1216716",
  key: "0440dbd8eb3b5825e51d",
  secret: "b72f159819ab06df5e4c",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});



//middleware
app.use(express.json())

app.use(cors())


//dbconfig
const connectionUrl=`mongodb+srv://user:kegzPdmfo70fuqBq@cluster0.barrt.mongodb.net/whatsappdb?retryWrites=true&w=majority`
mongoose.connect(connectionUrl,{
    useNewUrlParser: true
})

const db=mongoose.connection

db.once("open",()=>{
    console.log("connected")
    const messageCollection=db.collection('messages')
    const changeStream=messageCollection.watch()
    changeStream.on('change',(change)=>{
        console.log(change )
        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument
            pusher.trigger('messages','inserted',messageDetails)
        }else{
            console.log("error da setha payale")
        }


    })
})

//routes

app.get("/",(req,res)=>{
    res.status(200).send("hey")
})
app.get("/messages/sync",(req,res)=>{
    
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
}
)
app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(port,()=>{
    console.log(`listening on ${port}`)
})
// kegzPdmfo70fuqBq
// mongodb+srv:
//user:<password>@cluster0.barrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority