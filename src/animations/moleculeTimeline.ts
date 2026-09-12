import gsap from "gsap";

/**
 * Water molecule reveal: O drifts in, H atoms settle, bonds draw.
 * Targets group ids from src/diagrams/molecule.svg — keep ids in sync.
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev, and a bare tl.kill() would freeze elements mid-tween instead
// of restoring their pre-animation state, leaving the second run animating
// from the killed tween's stuck values.
export function playMoleculeReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(container.querySelector("#molecule_1_oxygen"), { opacity: 0, scale: 0.6, duration: 0.6 })
      .from(
        [container.querySelector("#molecule_1_hydrogen_1"), container.querySelector("#molecule_1_hydrogen_2")],
        { opacity: 0, x: (i: number) => (i === 0 ? -40 : 40), duration: 0.6, stagger: 0.15 },
        "-=0.2"
      )
      // Free-tier substitute for the paid DrawSVGPlugin: animate stroke-dashoffset for a
      // hand-drawn "draw-on" feel.
      .fromTo(
        container.querySelectorAll<SVGLineElement>("#molecule_1_bonds line"),
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
