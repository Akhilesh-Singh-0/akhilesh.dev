type NavItem = {
  label: string;
  href: string;
};

export type SocialKey = "github" | "linkedin" | "x";

type Social = {
  key: SocialKey;
  label: string;
  href: string;
};

type Site = {
  name: string;
  role: string;
  headline: string;
  beaconUrl?: string;
  availability?: string;
  location: string;
  timeZone: string;
  avatar?: string;
  github: string;
  email: string;
  resume?: string;
  banner?: {
    dark: string;
    light: string;
  };
  social: Social[];
  nav: NavItem[];
};

const github = "Akhilesh-Singh-0";

export const site: Site = {
  name: "Akhilesh Singh",
  role: "Full Stack Developer",
  headline: "Building Beacon",
  beaconUrl: "https://beacon-web-mu.vercel.app",
  availability: "Open to work",
  location: "India",
  timeZone: "Asia/Kolkata",
  avatar: "/avatar.png",
  github,
  email: "singhakhilesh19468@gmail.com",
  resume: "/resume.pdf",
  banner: {
    dark: "/banner-dark.mp4",
    light: "/banner-light.mp4",
  },
  social: [
    {
      key: "github",
      label: "GitHub",
      href: `https://github.com/${github}`,
    },
    {
      key: "x",
      label: "X (Twitter)",
      href: "https://x.com/singh_akhil2272",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/akhilesh-singh-dev",
    },
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "GitHub", href: "#github" },
    { label: "Connect", href: "#connect" },
  ],
};