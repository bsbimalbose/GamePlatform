import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  description: String,
  type: {
    type: String,
    enum: ['Multi-player', 'SIngle-Player'],
    required: true,
  },
  picture: {
    type: String,
    default: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
  },
  author: String,
});

export default mongoose.model('Game', gameSchema);
