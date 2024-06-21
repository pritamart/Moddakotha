const{model,Schema} = require('mongoose')

const galler_schema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "authors",
      },    
    url :{
        type:  String,
        require: true
    },

},{timestamps:true})
module.exports = model('images', galler_schema)
