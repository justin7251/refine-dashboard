import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    propertyType: {type: String, required: true},
    squareFootage: {type: Number, required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    parking: {type: Number, required: true},
    location: {type: String, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

});

const PropertyModel = mongoose.model('Property', PropertySchema);

export default PropertyModel;