import mongoose, { Schema, model, models } from 'mongoose';

export interface IUpload extends mongoose.Document {
  filename: string;
  contentType: string;
  data: string; // Base64 string
  createdAt: Date;
}

const UploadSchema = new Schema<IUpload>({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: String, required: true },
}, { timestamps: true });

const Upload = models.Upload || model<IUpload>('Upload', UploadSchema);

export default Upload;
