import gsap from "gsap";

/**
 * Resolution-scene payoff: water surface ripples in, strider settles on top
 * without breaking it — visualizes surface tension from notes-p-06.png.
 */
// Wrapped in gsap.context() so the returned revert() fully undoes the animation
// (not just stops it) — required because React.StrictMode double-invokes this
// effect in dev; see moleculeTimeline.ts for the full explanation. Also ensures
// the infinite yoyo tween below is torn down on unmount instead of leaking.
export function playStriderReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(container.querySelector("#strider_1_surface"), { opacity: 0, scaleX: 0.8, duration: 0.8 })
      .from(container.querySelector("#strider_1_bug"), { opacity: 0, y: -30, duration: 0.6 }, "-=0.2")
      .to(container.querySelector("#strider_1_bug"), {
        y: "+=4",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
  }, container);

  return () => ctx.revert();
}
