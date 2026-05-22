const focusItems = [
  "Playwright UI automation",
  "GraphQL contract coverage",
  "MQTT and WebSocket validation",
  "Appium mobile regression",
  "Dockerized CI gates",
  "AI-assisted failure triage"
];

const focusNode = document.querySelector("#typed-focus");
let focusIndex = 0;
let charIndex = 0;
let deleting = false;

function typeFocus() {
  if (!focusNode) return;
  const word = focusItems[focusIndex];
  focusNode.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex += 1;
    window.setTimeout(typeFocus, 58);
    return;
  }

  if (!deleting && charIndex === word.length) {
    deleting = true;
    window.setTimeout(typeFocus, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeFocus, 28);
    return;
  }

  deleting = false;
  focusIndex = (focusIndex + 1) % focusItems.length;
  window.setTimeout(typeFocus, 180);
}

typeFocus();

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const decimals = Number(element.dataset.decimals || 0);
  const duration = 1400;
  const start = performance.now();
  element.textContent = "0";

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    element.textContent = decimals
      ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(value).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      element.textContent = decimals
        ? target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : target.toLocaleString();
    }
  }

  requestAnimationFrame(frame);
}

const metricObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      metricObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll("[data-count]").forEach(element => metricObserver.observe(element));

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const tags = card.dataset.tags || "";
      const visible = filter === "all" || tags.split(" ").includes(filter);
      card.classList.toggle("hidden", !visible);
    });
  });
});

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", event => {
    const id = anchor.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
