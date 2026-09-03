import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

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

export function getPortfolioData(): PortfolioData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as PortfolioData;
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    // Return default empty state if file read fails
    return {
      profile: { name: '', role: '', tagline: '', description: '', image: '', availability: true },
      projects: [],
      social: { email: '', github: '', linkedin: '', location: '' },
      resume: ''
    };
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
}
