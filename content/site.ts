type NavItem = { label: string; href: string };

export type SocialKey = "github" | "linkedin" | "x";
type Social = { key: SocialKey; label: string; href: string };

type Site = {
  name: string;
  role: string;
  headline: string;
  availability?: string;
  location: string;
  timeZone: string;
  avatar?: string; // path under /public
  github: string; // GitHub username
  email: string;
  resume?: string; // path under /public; the button is hidden when unset
  social: Social[];
  nav: NavItem[];
};

const github = "Akhilesh-Singh-0";

export const site: Site = {
  name: "Akhilesh Singh",
  role: "Backend & Systems Engineer",
  headline: "Building Beacon, open-source observability for AI agents.",
  availability: "Open to work",
  location: "India",
  timeZone: "Asia/Kolkata",
  avatar: "/avatar.png",
  github,
  email: "singhakhilesh19468@gmail.com",
  resume: "/resume.pdf",
  social: [
    { key: "github", label: "GitHub", href: `https://github.com/${github}` },
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