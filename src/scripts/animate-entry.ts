import { animate, stagger, inView } from "motion";

interface AnimateEntryOptions {
  /** Selector for container to observe */
  container: string;
  /** How much of the container must be visible (0-1) */
  amount?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay between each element in seconds */
  staggerDelay?: number;
  /** Y offset to animate from */
  y?: number;
}

export function animateEntry({
  container,
  amount = 0.3,
  duration = 0.6,
  staggerDelay = 0.15,
  y = 50,
}: AnimateEntryOptions) {
  const containers = [...document.querySelectorAll<HTMLElement>(container)];
  if (!containers.length) return;

  for (const root of containers) {
    const elements = [
      ...(root.matches("[data-animate-entry]") ? [root] : []),
      ...root.querySelectorAll<HTMLElement>("[data-animate-entry]"),
    ];
    if (!elements.length) continue;

    inView(
      root,
      () => {
        if (root.dataset.entryAnimated === "true") return;
        root.dataset.entryAnimated = "true";

        animate(
          elements,
          { opacity: [0, 1], y: [y, 0] },
          {
            ease: [0.215, 0.61, 0.355, 1] as const,
            duration,
            delay: stagger(staggerDelay),
          },
        );
      },
      { amount },
    );
  }
}
