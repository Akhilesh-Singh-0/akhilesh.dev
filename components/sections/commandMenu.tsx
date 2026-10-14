import {
  CommandPalette,
  type Command,
  type IconKey,
} from "@/components/features/commandPalette";
import { projects } from "@/content/projects";
import { site, type SocialKey } from "@/content/site";

const navIcons: Record<string, IconKey> = {
  "#about": "about",
  "#stack": "stack",
  "#projects": "projects",
  "#github": "github",
  "#connect": "connect",
};

const socialIcons: Record<SocialKey, IconKey> = {
  github: "github",
  x: "x",
  linkedin: "linkedin",
};

function withShortcuts(commands: Command[]): Command[] {
  const used = new Set(["k"]);
  return commands.map((command) => {
    const letter = [...command.label.toLowerCase()].find(
      (ch) => /[a-z]/.test(ch) && !used.has(ch),
    );
    if (!letter) return command;
    used.add(letter);
    return { ...command, shortcut: letter };
  });
}

export function CommandMenu() {
  const keyed: Command[] = [
    ...site.nav.map((item) => ({
      id: `nav-${item.href.slice(1)}`,
      label: item.label,
      group: "Navigation",
      icon: navIcons[item.href] ?? "about",
      action: { type: "scroll" as const, hash: item.href },
    })),
    {
      id: "link-email",
      label: "Email me",
      group: "Links",
      icon: "email",
      keywords: "contact mail",
      action: { type: "mailto", href: `mailto:${site.email}` },
    },
    ...(site.resume
      ? [
          {
            id: "link-resume",
            label: "Resume",
            group: "Links",
            icon: "resume" as const,
            keywords: "cv",
            action: { type: "open" as const, href: site.resume },
          },
        ]
      : []),
    {
      id: "pref-theme",
      label: "Toggle theme",
      group: "Preferences",
      icon: "theme",
      keywords: "dark light mode",
      action: { type: "theme" },
    },
  ];
  const withKeys = withShortcuts(keyed);

  const projectCommands: Command[] = projects.map((project) => ({
    id: `project-${project.slug}`,
    label: project.name,
    group: "Projects",
    icon: "project",
    keywords: project.tagline,
    action: project.links.live
      ? { type: "open", href: project.links.live }
      : project.links.repo
        ? { type: "open", href: project.links.repo }
        : { type: "scroll", hash: "#projects" },
  }));

  const socialCommands: Command[] = site.social.map((social) => ({
    id: `link-${social.key}`,
    label: social.label,
    group: "Links",
    icon: socialIcons[social.key],
    action: { type: "open", href: social.href },
  }));

  const commands: Command[] = [
    ...withKeys.filter((c) => c.group === "Navigation"),
    ...projectCommands,
    ...withKeys.filter((c) => c.group === "Links"),
    ...socialCommands,
    ...withKeys.filter((c) => c.group === "Preferences"),
  ];

  return <CommandPalette commands={commands} />;
}