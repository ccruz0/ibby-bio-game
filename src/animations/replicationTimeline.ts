import gsap from "gsap";

/**
 * Resolution-scene payoff: the parent double helix opens at the replication fork, then both
 * daughter helices settle in — visualizes semi-conservative replication from Figure 13 of
 * "IB Biology A1.2 Nucleic Acids". Mirrors striderTimeline.ts's resolution-scene role.
 * Targets group ids from src/diagrams/replication.svg — keep ids in sync.
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev; see moleculeTimeline.ts for the full explanation.
export function playReplicationReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(container.querySelector("#replication_1_parent"), {
      opacity: 0,
      scaleY: 0.7,
      transformOrigin: "50% 0%",
      duration: 0.6,
    }).from(
      [container.querySelector("#replication_1_daughter_left"), container.querySelector("#replication_1_daughter_right")],
      { opacity: 0, y: -20, duration: 0.6, stagger: 0.2 },
      "-=0.2"
    );
  }, container);

  return () => ctx.revert();
}
