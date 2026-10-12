type NavItem = { label: string; href: string };

type Site = {
  name: string;
  role: string;
  headline: string;
  availability?: string;
  location: string;
  timeZone: string;
  avatar?: string; // path under /public
  nav: NavItem[];
};

export const site: Site = {
  name: "Akhilesh Singh",
  role: "Backend & Systems Engineer",
  headline: "Building Beacon, open-source observability for AI agents.",
  availability: "Open to work",
  location: "India",
  timeZone: "Asia/Kolkata",
  avatar: "/avatar.png",
  nav: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
  ],
};