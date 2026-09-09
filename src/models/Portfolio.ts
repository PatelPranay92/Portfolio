import mongoose, { Schema, model, models } from 'mongoose';

export interface IProfile {
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  availability: boolean;
}

export interface IProject {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
  featured: boolean;
}

export interface ISocial {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface IPortfolio extends mongoose.Document {
  profile: IProfile;
  projects: IProject[];
  social: ISocial;
  resume: string;
}

const ProfileSchema = new Schema<IProfile>({
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  tagline: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  availability: { type: Boolean, default: true },
});

const ProjectSchema = new Schema<IProject>({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  tags: { type: [String], default: [] },
  liveUrl: { type: String, default: '' },
  codeUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
});

const SocialSchema = new Schema<ISocial>({
  email: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  location: { type: String, default: '' },
});

const PortfolioSchema = new Schema<IPortfolio>({
  profile: { type: ProfileSchema, default: () => ({}) },
  projects: { type: [ProjectSchema], default: [] },
  social: { type: SocialSchema, default: () => ({}) },
  resume: { type: String, default: '' },
}, { timestamps: true });

const Portfolio = models.Portfolio || model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
