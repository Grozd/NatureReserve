const {Schema, model} = require('mongoose');

const schema = new Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    content: {type: String, required: true}
})

export default model('Product',schema)