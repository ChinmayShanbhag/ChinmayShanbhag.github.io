import projects from "@/content/projects.json" assert { type: "json" };
import profile from "@/content/profile.json" assert { type: "json" };
import experience from "@/content/experience.json" assert { type: "json" };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  impact: string;
  tech: string[];
  metrics: Record<string, number>;
  images: string[];
  links?: Record<string, string>;
};

export function getProjects(): Project[] {
  return projects as unknown as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export type Profile = typeof profile;

export function getProfile(): Profile {
  return profile as Profile;
}

export type Experience = {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
};

export function getExperience(): Experience[] {
  return experience as unknown as Experience[];
}
