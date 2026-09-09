import dbConnect from './mongodb';
import Portfolio from '@/models/Portfolio';

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  availability: boolean;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
  featured: boolean;
}

export interface Social {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  social: Social;
  resume: string;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    await dbConnect();
    let portfolio = await Portfolio.findOne({});

    if (!portfolio) {
      console.log('No portfolio data found in DB, creating empty default...');
      const defaultData: PortfolioData = {
        profile: { name: '', role: '', tagline: '', description: '', image: '', availability: true },
        projects: [],
        social: { email: '', github: '', linkedin: '', location: '' },
        resume: ''
      };

      portfolio = new Portfolio(defaultData);
      await portfolio.save();
    }

    // Convert mongoose document to standard object
    const data = portfolio.toObject() as any;
    return {
      profile: data.profile,
      projects: data.projects,
      social: data.social,
      resume: data.resume || ''
    };
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    // Return default empty state if db read fails
    return {
      profile: { name: '', role: '', tagline: '', description: '', image: '', availability: true },
      projects: [],
      social: { email: '', github: '', linkedin: '', location: '' },
      resume: ''
    };
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    await dbConnect();
    let portfolio = await Portfolio.findOne({});
    
    if (!portfolio) {
      portfolio = new Portfolio(data);
    } else {
      portfolio.profile = data.profile;
      portfolio.projects = data.projects as any;
      portfolio.social = data.social;
      portfolio.resume = data.resume;
    }
    
    await portfolio.save();
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
}
