document.addEventListener("DOMContentLoaded", () => {
  // Aggiorna l'anno nel footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Scorrimento morbido per i link di navigazione
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Barra di avanzamento dello scroll
  const progressBar = document.querySelector(".scroll-progress");

  const sections = document.querySelectorAll("main section[id]");

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Evidenzia la sezione corrente nel menu
    let currentId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Effetto di comparsa morbida per le sezioni
  const revealElements = document.querySelectorAll(
    ".hero-text, .section, .story-block, .info-card, .note-box"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealElements.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  } else {
    // Fallback per browser vecchi: mostra subito tutto
    revealElements.forEach((el) => {
      el.classList.add("reveal-visible");
    });
  }
});

