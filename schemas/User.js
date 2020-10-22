import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true, trim: true },
  age: Number,
  picture: {
    type: String,
    default: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
  },
});

userSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

export default mongoose.model('User', userSchema);
