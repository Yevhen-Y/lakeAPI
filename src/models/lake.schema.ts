import * as mongoose from 'mongoose';

const LakeSchema = new mongoose.Schema({
    name: String,
    type: String,
    salmon: Number,
    tuna: Number
});

const LakeModel = mongoose.model('Lake', LakeSchema);
export { LakeModel }