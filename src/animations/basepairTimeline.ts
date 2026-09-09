import gsap from "gsap";

/**
 * Complementary base-pair reveal: the A-T and G-C pairs settle in, then their hydrogen-bond
 * dashes fade in. Mirrors hbondTimeline.ts's water hydrogen-bond formation.
 * Targets group ids from src/diagrams/basepair.svg — keep ids in sync.
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev; see moleculeTimeline.ts for the full explanation.
export function playBasepairReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(
      [container.querySelector("#basepair_1_pair_at"), container.querySelector("#basepair_1_pair_gc")],
      { opacity: 0, y: -20, duration: 0.5, stagger: 0.15 }
    ).from(
      container.querySelectorAll("#basepair_1_dashes line"),
      { opacity: 0, duration: 0.4, stagger: 0.1 },
      "-=0.2"
    );
  }, container);

  return () => ctx.revert();
}
