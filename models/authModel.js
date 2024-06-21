const{model,Schema} = require('mongoose')

const authSchema = new Schema({
    name :{
        type:  String,
        require: true
    },
    email :{
        type:  String,
        require: true
    },
    
    password :{
        type:  String,
        select : false,
        require: true
    },
    role :{
        type:  String,
        require: true
    },
    image :{
        type:  String,
        default: ""
    },
    category :{
        type:  String,
        require: true
    },

},{timestamps:true})
module.exports = model('authors', authSchema)
