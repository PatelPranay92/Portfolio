import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
