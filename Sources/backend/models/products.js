import mongoose from "mongoose";
const schema = mongoose.Schema({
    name: { type: String, require: true },
    model :{ type: String, require: true,  },
    voltage :{ type: String, require: false },
    colorTemperature :{ type: String, require: false },
    size :{ type: String, require: false },
    weight :{ type: String, require: false },
    // image: { type: Array, require: true },
    image : [{
        _id :  { type: String, require: true },
        url : { type: String, require: true },
    }],
    content: { type: String, require: false },
    nameCategory: { type: String, require: false },
    description: { type: String, require: false },
    idCategory: { type: String, require: true },
    nameBrand: { type: String, require: false },
    idBrand: { type: String, require: true },
    price :{ type: String, require: true },
});

export default  mongoose.model('products', schema);