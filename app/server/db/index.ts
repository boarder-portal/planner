import mongoose from 'mongoose';

// TODO: move to env
mongoose.connect('mongodb://localhost:27017/planner');

export default mongoose;
