import gsap from "gsap";

/**
 * Nucleotide reveal: the sugar settles first, phosphate and base drift in from either side,
 * bonds draw on last. Mirrors moleculeTimeline.ts's water-molecule assembly.
 * Targets group ids from src/diagrams/nucleotide.svg — keep ids in sync.
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev; see moleculeTimeline.ts for the full explanation.
export function playNucleotideReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(container.querySelector("#nucleotide_1_sugar"), { opacity: 0, scale: 0.6, duration: 0.6 })
      .from(
        [container.querySelector("#nucleotide_1_phosphate"), container.querySelector("#nucleotide_1_base")],
        { opacity: 0, x: (i: number) => (i === 0 ? -40 : 40), duration: 0.6, stagger: 0.15 },
        "-=0.2"
      )
      .fromTo(
        container.querySelectorAll<SVGLineElement>("#nucleotide_1_bonds line"),
        { strokeDasharray: bondLineLength, strokeDashoffset: bondLineLength },
        { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: "power1.inOut" },
        "-=0.3"
      );
  }, container);

  return () => ctx.revert();
}

// jsdom (unit tests) doesn't implement SVG geometry methods, and a real browser throws
// "non-rendered element" when the line is detached or hidden — which happens during
// gsap.context().revert() on unmount, i.e. every time the player navigates away.
// Either way, 0 is a safe length: the line simply appears without the draw-on effect.
function bondLineLength(_i: number, target: SVGLineElement): number {
  try {
    if (typeof target.getTotalLength !== "function" || !target.isConnected) return 0;
    return target.getTotalLength();
  } catch {
    return 0;
  }
}
