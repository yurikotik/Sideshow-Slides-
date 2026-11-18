(() => {
  const pages = Array.from(document.querySelectorAll(".page"));
  const indicator = document.getElementById("pageIndicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsRoot = document.getElementById("dots");
  const total = pages.length;
  let current = 0;
  let animating = false;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderDots() {
    dotsRoot.innerHTML = "";
    pages.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dot";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", `Go to page ${i + 1}`);
      btn.setAttribute("aria-selected", i === current ? "true" : "false");
      btn.addEventListener("click", () => goTo(i));
      dotsRoot.appendChild(btn);
    });
  }

  function updateUI() {
    indicator.textContent = `${pad(current + 1)} / ${pad(total)}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    dotsRoot.querySelectorAll(".dot").forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  function paint(from, to) {
    pages.forEach((page, i) => {
      page.classList.remove("active", "flipped", "ahead");
      if (i === to) {
        page.classList.add("active");
      } else if (i < to) {
        page.classList.add("flipped");
      } else {
        page.classList.add("ahead");
      }

      // Restart staggered animations on the destination page
      if (i === to) {
        page.querySelectorAll(".anim").forEach((el) => {
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "";
        });
      }
    });
    current = to;
    updateUI();
  }

  function goTo(index) {
    if (animating || index === current || index < 0 || index >= total) return;
    animating = true;
    paint(current, index);
    window.setTimeout(() => {
      animating = false;
    }, 500);
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1);
    }
  });

  // Touch swipe
  let touchX = null;
  document.getElementById("stage").addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  document.getElementById("stage").addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      touchX = null;
      if (Math.abs(dx) < 48) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  renderDots();
  paint(0, 0);
})();
