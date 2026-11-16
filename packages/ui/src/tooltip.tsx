"use client";
import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

const HasProvider = React.createContext(false);

/** Shared timing for all tooltips: short open delay, instant when moving between triggers. */
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <HasProvider.Provider value={true}>
      <RadixTooltip.Provider delayDuration={400} skipDelayDuration={300}>
        {children}
      </RadixTooltip.Provider>
    </HasProvider.Provider>
  );
}

export function Tooltip({
  content,
  shortcut,
  children,
}: {
  content: React.ReactNode;
  shortcut?: string;
  children: React.ReactElement;
}) {
  // a native <dialog> sits in the browser's top layer, above any z-index, so render the tooltip inside it
  const [dialog, setDialog] = React.useState<HTMLElement | null>(null);

  const tooltip = (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger
        asChild
        ref={(el) => setDialog(el?.closest("dialog") ?? null)}
      >
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal container={dialog ?? undefined}>
        <RadixTooltip.Content
          side="top"
          sideOffset={6}
          collisionPadding={8}
          className="z-50 flex items-center gap-2 rounded bg-black px-2 py-[5px] font-mono text-[0.7rem] leading-none font-normal text-white shadow-md select-none"
        >
          {content}
          {shortcut && (
            <kbd className="font-mono text-slate-400">{shortcut}</kbd>
          )}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );

  // works without a TooltipProvider too (e.g. plugin components rendered on their own)
  return React.useContext(HasProvider) ? (
    tooltip
  ) : (
    <TooltipProvider>{tooltip}</TooltipProvider>
  );
}
