class Portfolio {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.querySelector("#theme-toggle");
        this.themeIcon = this.themeToggle.querySelector(".theme-icon");
        this.yearElement = document.querySelector("#current-year");
        this.projectGrid = document.querySelector("#projects-grid");

        this.initialize();
    }

    initialize() {
        this.loadTheme();
        this.updateYear();
        this.setupThemeToggle();
        this.renderProjects();
        this.setupRevealAnimations();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {
            this.body.classList.add("light-theme");
        }

        this.updateThemeButton();
    }

    setupThemeToggle() {
        this.themeToggle.addEventListener("click", () => {
            this.body.classList.toggle("light-theme");

            const theme = this.body.classList.contains("light-theme")
                ? "light"
                : "dark";

            localStorage.setItem("portfolio-theme", theme);

            this.updateThemeButton();
        });
    }

    updateThemeButton() {
        const isLight = this.body.classList.contains("light-theme");

        this.themeIcon.textContent = isLight ? "☾" : "☀";

        this.themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }

    updateYear() {
        this.yearElement.textContent = new Date().getFullYear();
    }

    setupRevealAnimations() {
        this.revealElements = document.querySelectorAll(".reveal");

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            this.revealElements.forEach((element) => {
                element.classList.add("visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12
            }
        );

        this.revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    renderProjects() {

        this.projectGrid.innerHTML = projects
            .map(project => {

                const tags = project.tags
                    .map(tag => `
                        <li class="tag">
                            ${tag}
                        </li>
                    `)
                    .join("");

                const version = project.version
                    ? `
                        <span class="version">
                            v${project.version}
                        </span>
                    `
                    : "";

                const status = project.status
                    ? `
                        <span class="featured-badge">
                            ${project.status}
                        </span>
                    `
                    : "";

                const preview = project.image
                    ? `
                        <img
                            class="project-image"
                            src="${project.image}"
                            alt="${project.title} screenshot"
                            loading="lazy"
                        >
                    `
                    : `
                        <span class="project-symbol">
                            ${project.symbol}
                        </span>
                    `;

                const githubLink = project.github
                    ? `
                        <a
                            class="project-link"
                            href="${project.github}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub Repo ↗
                        </a>
                    `
                    : "";

                const demoLink = project.demo
                    ? `
                        <a
                            class="project-link"
                            href="${project.demo}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo ↗
                        </a>
                    `
                    : "";

                return `
                    <article class="panel project-card reveal">

                        <div class="project-preview">
                            ${preview}
                        </div>

                        <div class="project-body">

                            <div class="project-top">

                                <h3 class="project-title">
                                    ${project.title}
                                </h3>

                                ${version}

                                ${status}

                            </div>

                            <p class="project-description">
                                ${project.description}
                            </p>

                            <ul
                                class="tag-list"
                                aria-label="Technologies used"
                            >
                                ${tags}
                            </ul>

                            <div class="project-links">
                                ${demoLink}
                                ${githubLink}
                            </div>

                        </div>

                    </article>
                `;
            })
            .join("") + `
                    <article class="panel project-card reveal">

                        <div class="project-preview">
                            <span class="project-symbol">
                                📑
                            </span>
                        </div>

                        <div class="project-body">

                            <div class="project-top">

                                <h3 class="project-title">
                                    Other Projects
                                </h3>

                            </div>

                            <p class="project-description">
                                View my other project repositories.
                            </p>

                            <div class="project-links">
                                <a
                                    class="project-link"
                                    href="https://github.com/Cheze-Burgur?tab=repositories"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Go to my repositories ↗
                                </a>
                            </div>

                        </div>

                    </article>
                `;
    }

}

const projects = [
    {
        title: "BatPU Emulator",
        version: "1.6",
        description: "A browser-based CPU emulator with an assembler, register and memory displays, I/O devices, and debugging controls.",

        image: "https://github.com/Cheze-Burgur/BatPU-Emulator---Web-Port/raw/main/images/readme/readme-main.png",
        symbol: "CPU",

        tags: [
            "HTML",
            "CSS",
            "JavaScript",
            "Assembly"
        ],

        github:
            "https://github.com/Cheze-Burgur/BatPU-Emulator---Web-Port",

        demo: "https://cheze-burgur.github.io/BatPU-Emulator---Web-Port/",

        featured: true,
        status: "Featured"
    },

    {
        title: "Chess",
        description: "A custom online chess board.",

        symbol: "♟️",

        tags: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/Cheze-Burgur/Chess",

        demo: "https://cheze-burgur.github.io/Chess/",

        featured: false,
        status: "WIP"
    },

    {
        title: "Collab",
        description: "GD collab I'm hosting. Currently in the building phase. ID: Unreleased.",

        symbol: "ΔΔΔ",

        tags: [
            "gmd"
        ],

        github: "https://github.com/Cheze-Burgur/collab",

        featured: false,
        status: "WIP"
    }
];

new Portfolio();
