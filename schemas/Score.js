import mongoose from 'mongoose';
const { Schema } = mongoose;

const scoreSchema = Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  sessionId: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  createdDate: { type: Date, default: Date.now() },
  win: { type: Boolean, default: false },
  lose: { type: Boolean, default: false },
  draw: { type: Boolean, default: false },
});

export default mongoose.model('Score', scoreSchema);
