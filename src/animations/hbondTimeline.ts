import gsap from "gsap";

/**
 * Hydrogen-bond formation: three molecules settle, dashed bonds fade in with
 * a subtle pulse (mirrors the purple annotation arrow in biology-notes-03.png).
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev; see moleculeTimeline.ts for the full explanation.
export function playHbondReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(
      [
        container.querySelector("#hbond_1_molecule_a"),
        container.querySelector("#hbond_1_molecule_b"),
        container.querySelector("#hbond_1_molecule_c"),
      ],
      { opacity: 0, y: -20, duration: 0.5, stagger: 0.15 }
    ).from(
      container.querySelectorAll("#hbond_1_dashes line"),
      { opacity: 0, duration: 0.4, stagger: 0.15 },
      "-=0.2"
    );
  }, container);

  return () => ctx.revert();
}
