"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useTheme } from "next-themes";
import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import {
  LuCornerDownLeft,
  LuFileText,
  LuFolder,
  LuLayers,
  LuMail,
  LuRocket,
  LuSearch,
  LuSend,
  LuSunMoon,
  LuUser,
  LuX,
} from "react-icons/lu";
import { SiGithub, SiX } from "react-icons/si";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { playClick } from "@/lib/sound";

export type IconKey =
  | "about"
  | "stack"
  | "projects"
  | "github"
  | "connect"
  | "email"
  | "resume"
  | "theme"
  | "project"
  | "x"
  | "linkedin";

export type CommandAction =
  | { type: "scroll"; hash: string }
  | { type: "open"; href: string }
  | { type: "mailto"; href: string }
  | { type: "theme" };

export type Command = {
  id: string;
  label: string;
  group: string;
  icon: IconKey;
  keywords?: string;
  shortcut?: string;
  action: CommandAction;
};

const icons: Record<IconKey, IconType> = {
  about: LuUser,
  stack: LuLayers,
  projects: LuFolder,
  github: SiGithub,
  connect: LuSend,
  email: LuMail,
  resume: LuFileText,
  theme: LuSunMoon,
  project: LuRocket,
  x: SiX,
  linkedin: FaLinkedin,
};

const hints: Record<CommandAction["type"], string> = {
  scroll: "Go to section",
  open: "Open link",
  mailto: "Send email",
  theme: "Toggle theme",
};

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const subscribe = () => () => {};
const useModifierLabel = () =>
  useSyncExternalStore(
    subscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );

export function CommandPalette({ commands }: { commands: Command[] }) {
  const { resolvedTheme, setTheme } = useTheme();
  const modifier = useModifierLabel();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const { ordered, groups } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? commands.filter((c) =>
          `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q),
        )
      : commands;
    const names = [...new Set(matches.map((c) => c.group))];
    const ordered = names.flatMap((name) =>
      matches.filter((c) => c.group === name),
    );
    let index = 0;
    const groups = names.map((name) => ({
      name,
      items: ordered
        .filter((c) => c.group === name)
        .map((command) => ({ command, index: index++ })),
    }));
    return { ordered, groups };
  }, [commands, query]);

  const openPalette = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const run = useCallback(
    (command: Command) => {
      setOpen(false);
      const { action } = command;
      if (action.type === "scroll") {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        document
          .querySelector(action.hash)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", action.hash);
      } else if (action.type === "open") {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else if (action.type === "mailto") {
        window.location.href = action.href;
      } else {
        playClick();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    },
    [resolvedTheme, setTheme],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key?.toLowerCase();
      if (!key) return;

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        if (open) setOpen(false);
        else openPalette();
        return;
      }

      if (
        open ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.repeat ||
        isEditable(event.target)
      ) {
        return;
      }
      const command = commands.find((c) => c.shortcut === key);
      if (command) {
        event.preventDefault();
        run(command);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, commands, run, openPalette]);

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const count = ordered.length;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (count ? (i + 1) % count : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (count ? (i - 1 + count) % count : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = ordered[active];
      if (command) run(command);
    }
  }

  const current = ordered[active];

  return (
    <>
      <Tooltip label={`Search · ${modifier} K`} align="end">
        <button
          type="button"
          onClick={openPalette}
          aria-label="Search"
          aria-keyshortcuts="Control+K Meta+K"
          className="inline-flex size-9 items-center justify-center border border-rule transition-colors hover:border-ink"
        >
          <LuSearch className="size-4" aria-hidden />
        </button>
      </Tooltip>

      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
        className="mx-auto mb-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] border border-rule bg-bg p-0 text-ink backdrop:bg-black/60"
      >
        <div className="flex items-center gap-3 border-b border-rule pl-4 pr-2">
          <LuSearch className="size-4 shrink-0" aria-hidden />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={current ? `command-${current.id}` : undefined}
            placeholder="Type a command or search…"
            spellCheck={false}
            autoComplete="off"
            className="h-12 flex-1 bg-transparent outline-none placeholder:italic placeholder:text-ink"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex size-8 items-center justify-center transition-colors hover:bg-surface"
          >
            <LuX className="size-4" aria-hidden />
          </button>
        </div>

        <ul
          ref={listRef}
          id="command-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-80 overflow-y-auto py-2"
        >
          {groups.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm">
              No results for “{query}”
            </li>
          ) : (
            groups.map((group) => (
              <li key={group.name} role="presentation">
                <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wider">
                  {group.name}
                </p>
                <ul role="group" aria-label={group.name}>
                  {group.items.map(({ command, index }) => {
                    const Icon = icons[command.icon];
                    const isActive = index === active;
                    return (
                      <li
                        key={command.id}
                        id={`command-${command.id}`}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => {
                          if (!isActive) setActive(index);
                        }}
                        onClick={() => run(command)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 border-l-2 px-4 py-2.5 text-sm",
                          isActive ? "border-ink bg-surface" : "border-transparent",
                        )}
                      >
                        <Icon className="size-4 shrink-0" aria-hidden />
                        <span>{command.label}</span>
                        {command.shortcut ? (
                          <kbd className="ml-auto border border-rule px-1.5 text-xs font-medium uppercase">
                            {command.shortcut}
                          </kbd>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center justify-end gap-5 border-t border-rule px-4 py-3 text-xs">
          <span className="inline-flex items-center gap-2">
            {current ? hints[current.action.type] : "Go to page"}
            <kbd className="inline-flex size-5 items-center justify-center border border-rule">
              <LuCornerDownLeft className="size-3" aria-hidden />
            </kbd>
          </span>
          <span className="inline-flex items-center gap-2">
            Exit
            <kbd className="border border-rule px-1.5 font-medium">Esc</kbd>
          </span>
        </div>
      </dialog>
    </>
  );
}