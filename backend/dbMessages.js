const mongoose= require("mongoose")

const schema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
})

module.exports= mongoose.model('message',schema)