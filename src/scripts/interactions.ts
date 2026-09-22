// Site-wide progressive enhancement: scroll-reveal for `.reveal`
// elements and the back-to-top control. No framework needed.

export function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
}

export function initBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const toggle = () => {
    button.classList.toggle("opacity-0", window.scrollY < 640);
    button.classList.toggle("pointer-events-none", window.scrollY < 640);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
