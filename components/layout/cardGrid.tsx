"use client";

import { Children, useState } from "react";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { Band } from "@/components/layout/band";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type CardGridProps = {
  children: React.ReactNode;
  initial?: number;
  moreLabel?: string;
  lessLabel?: string;
};

const COLUMNS = 2;

export function CardGrid({
  children,
  initial = 4,
  moreLabel = "Show all",
  lessLabel = "Show fewer",
}: CardGridProps) {
  const items = Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, initial);

  const rows: (typeof items)[] = [];
  for (let i = 0; i < shown.length; i += COLUMNS) {
    rows.push(shown.slice(i, i + COLUMNS));
  }

  return (
    <>
      {rows.map((row, r) => (
        <Band key={r} innerClassName="grid sm:grid-cols-2">
          {row.map((item, c) => (
            <div
              key={c}
              className={cn(
                "flex p-4 sm:p-5 [&>article]:flex-1",
                row.length === COLUMNS &&
                  c === 0 &&
                  "border-b border-rule sm:border-b-0 sm:border-r",
              )}
            >
              {item}
            </div>
          ))}
        </Band>
      ))}

      {items.length > initial ? (
        <Band innerClassName="flex justify-center px-6 py-5">
          <Button variant="secondary" onClick={() => setExpanded((e) => !e)}>
            {expanded ? lessLabel : moreLabel}
            {expanded ? (
              <LuArrowUp className="size-4" aria-hidden />
            ) : (
              <LuArrowDown className="size-4" aria-hidden />
            )}
          </Button>
        </Band>
      ) : null}
    </>
  );
}