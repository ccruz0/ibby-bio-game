import gsap from "gsap";

/**
 * Eukaryotic cell reveal: membrane appears first, then nucleus, then organelles (mitochondria, ER, Golgi),
 * then ribosomes. Mirrors nucleotideTimeline.ts pattern.
 * Targets group ids from src/diagrams/eukaryotic-cell.svg — keep ids in sync.
 */
export function playCellReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Membrane appears first
    tl.from(container.querySelector("#eukaryotic_cell_membrane"), {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    });

    // Cytoplasm fades in
    tl.from(
      container.querySelector("#eukaryotic_cell_cytoplasm"),
      { opacity: 0, duration: 0.3 },
      "-=0.2"
    );

    // Nucleus (largest organelle, appears next)
    tl.from(
      container.querySelector("#eukaryotic_cell_nucleus"),
      { opacity: 0, scale: 0.6, duration: 0.6 },
      "-=0.1"
    );

    // Mitochondria (scattered throughout)
    tl.from(
      [
        container.querySelector("#eukaryotic_cell_mitochondria_1"),
        container.querySelector("#eukaryotic_cell_mitochondria_2"),
      ],
      { opacity: 0, scale: 0.5, duration: 0.4, stagger: 0.15 },
      "-=0.2"
    );

    // Endoplasmic reticulum (wiggly network)
    tl.from(container.querySelector("#eukaryotic_cell_endoplasm_reticulum"), {
      opacity: 0,
      duration: 0.4,
    });

    // Golgi apparatus
    tl.from(
      container.querySelector("#eukaryotic_cell_golgi"),
      { opacity: 0, scale: 0.6, duration: 0.3, ease: "back.out" },
      "-=0.2"
    );

    // Ribosomes (small, appear last)
    tl.from(
      [
        container.querySelector("#eukaryotic_cell_ribosome_1"),
        container.querySelector("#eukaryotic_cell_ribosome_2"),
        container.querySelector("#eukaryotic_cell_ribosome_3"),
      ],
      { opacity: 0, duration: 0.3, stagger: 0.08 },
      "-=0.1"
    );
  }, container);

  return () => ctx.revert();
}

/**
 * Prokaryotic cell reveal: cell wall first, then membrane, then nucleoid, then ribosomes.
 * Targets group ids from src/diagrams/prokaryote-cell.svg.
 */
export function playProkaryoteReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Cell wall appears first
    tl.from(container.querySelector("#prokaryotic_cell_cell_wall"), {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    });

    // Cell membrane
    tl.from(
      container.querySelector("#prokaryotic_cell_cell_membrane"),
      { opacity: 0, duration: 0.3 },
      "-=0.2"
    );

    // Cytoplasm
    tl.from(
      container.querySelector("#prokaryotic_cell_cytoplasm"),
      { opacity: 0, duration: 0.3 },
      "-=0.1"
    );

    // Nucleoid (region of DNA)
    tl.from(container.querySelector("#prokaryotic_cell_nucleoid"), {
      opacity: 0,
      scale: 0.6,
      duration: 0.5,
    });

    // Ribosomes (appear last)
    tl.from(
      [
        container.querySelector("#prokaryotic_cell_ribosome_1"),
        container.querySelector("#prokaryotic_cell_ribosome_2"),
        container.querySelector("#prokaryotic_cell_ribosome_3"),
        container.querySelector("#prokaryotic_cell_ribosome_4"),
      ],
      { opacity: 0, duration: 0.3, stagger: 0.1 },
      "-=0.2"
    );

    // Pili (optional, fades in at the end)
    tl.from(container.querySelector("#prokaryotic_cell_pili"), {
      opacity: 0,
      duration: 0.3,
    });
  }, container);

  return () => ctx.revert();
}

/**
 * Cell compartments reveal: each compartment fades in and scales up.
 * Used for scenario/resolution scenes.
 */
export function playCellCompartmentsReveal(container: HTMLElement | SVGElement): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Main cell membrane
    tl.from(
      container.querySelectorAll("ellipse[rx='270']"),
      { opacity: 0, scale: 0.9, duration: 0.5 },
      0
    );

    // Compartments appear in sequence
    tl.from(
      [
        container.querySelector("#nucleus_comp"),
        container.querySelector("#er_comp"),
        container.querySelector("#mitochondria_comp"),
        container.querySelector("#golgi_comp"),
      ],
      { opacity: 0, scale: 0.5, duration: 0.4, stagger: 0.15, ease: "back.out" },
      "-=0.2"
    );

    // Benefit text appears at the end
    tl.from(
      container.querySelector("rect[fill='#f0f7ff']"),
      { opacity: 0, y: 20, duration: 0.4 },
      "-=0.1"
    );
  }, container);

  return () => ctx.revert();
}
