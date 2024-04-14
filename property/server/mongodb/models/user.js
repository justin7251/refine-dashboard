import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;