/* =========================================================
   AUREVIA — LUXURY SPACES
   FUTURE LUXURY INTERIOR WEBSITE
   Main JavaScript — main.js
   ========================================================= */

"use strict";

/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initNavbar();
    initMobileMenu();
    initRevealAnimations();
    initProjectFilters();
    initFAQ();
    initSmoothScroll();
    initImageReveal();
    initCursor();
    initForm();
    initActiveNavigation();
    initParallax();

});


/* =========================================================
   02. PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader = document.querySelector(".preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 700);

    });

}


/* =========================================================
   03. NAVBAR SCROLL EFFECT
   ========================================================= */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const updateNavbar = () => {

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/* =========================================================
   04. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!toggle || !mobileMenu) return;

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    function toggleMenu() {

        const isOpen =
            mobileMenu.classList.toggle("active");

        toggle.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }

    toggle.addEventListener(
        "click",
        toggleMenu
    );

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove("active");
                toggle.classList.remove("active");
                document.body.classList.remove("menu-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   05. REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {

        elements.forEach(el => {
            el.classList.add("active");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    elements.forEach(el => {
        observer.observe(el);
    });

}


/* =========================================================
   06. PROJECT FILTER
   ========================================================= */

function initProjectFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter ||
                    button.getAttribute("data-filter");

                buttons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                cards.forEach(card => {

                    const category =
                        card.dataset.category ||
                        card.getAttribute("data-category");

                    const show =
                        filter === "all" ||
                        filter === category;

                    if (show) {

                        card.style.display = "";

                        requestAnimationFrame(() => {

                            card.style.opacity = "1";
                            card.style.transform =
                                "scale(1)";

                        });

                    } else {

                        card.style.opacity = "0";
                        card.style.transform =
                            "scale(.96)";

                        setTimeout(() => {

                            card.style.display =
                                "none";

                        }, 300);

                    }

                });

            }
        );

    });

}


/* =========================================================
   07. FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const items =
        document.querySelectorAll(
            ".faq-item"
        );

    if (!items.length) return;

    items.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );

        if (!question || !answer) return;

        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains("active");

                /* Close all other FAQs */

                items.forEach(otherItem => {

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    otherItem.classList.remove(
                        "active"
                    );

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight =
                            null;
                    }

                });

                /* Open selected FAQ */

                if (!isActive) {

                    item.classList.add("active");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });

}


/* =========================================================
   08. SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                const navbar =
                    document.querySelector(
                        ".navbar"
                    );

                const offset =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });

}


/* =========================================================
   09. IMAGE REVEAL
   ========================================================= */

function initImageReveal() {

    const images =
        document.querySelectorAll(
            ".image-reveal"
        );

    if (!images.length) return;

    images.forEach(container => {

        const image =
            container.querySelector("img");

        if (!image) {
            container.classList.add("loaded");
            return;
        }

        if (image.complete) {

            container.classList.add(
                "loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    container.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });

}


/* =========================================================
   10. FUTURISTIC CURSOR
   ========================================================= */

function initCursor() {

    /*
       Disable custom cursor on touch devices.
    */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    const dot =
        document.createElement("div");

    const outline =
        document.createElement("div");

    dot.className = "cursor-dot";
    outline.className = "cursor-outline";

    document.body.appendChild(dot);
    document.body.appendChild(outline);

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        },
        { passive: true }
    );

    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.15;

        outlineY +=
            (mouseY - outlineY) * 0.15;

        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();

    const hoverElements =
        document.querySelectorAll(
            "a, button, .project-card, .service-card"
        );

    hoverElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                outline.classList.add(
                    "hover"
                );
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                outline.classList.remove(
                    "hover"
                );
            }
        );

    });

}


/* =========================================================
   11. CONTACT FORM
   ========================================================= */

function initForm() {

    const form =
        document.querySelector(
            ".project-form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const submitButton =
                form.querySelector(
                    ".form-submit"
                );

            const originalText =
                submitButton
                    ? submitButton.innerText
                    : "";

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerText =
                    "SENDING...";

            }

            /*
               Demo delay.

               Later this can be connected
               to WhatsApp, EmailJS,
               Formspree, Firebase,
               PHP backend or another API.
            */

            setTimeout(() => {

                showFormMessage(
                    form,
                    "Thank you. Your project enquiry has been received."
                );

                form.reset();

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerText =
                        originalText ||
                        "SEND ENQUIRY";

                }

            }, 1200);

        }
    );

}


/* =========================================================
   12. FORM SUCCESS MESSAGE
   ========================================================= */

function showFormMessage(
    form,
    message
) {

    let messageBox =
        form.querySelector(
            ".form-message"
        );

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "form-message";

        messageBox.style.marginTop =
            "18px";

        messageBox.style.padding =
            "15px";

        messageBox.style.border =
            "1px solid rgba(214,180,106,.3)";

        messageBox.style.color =
            "#d6b46a";

        messageBox.style.fontSize =
            "12px";

        messageBox.style.letterSpacing =
            ".08em";

        form.appendChild(
            messageBox
        );

    }

    messageBox.textContent =
        message;

    setTimeout(() => {

        messageBox.style.opacity =
            "0";

        setTimeout(() => {

            messageBox.remove();

        }, 500);

    }, 5000);

}


/* =========================================================
   13. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    if (!sections.length || !navLinks.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            href ===
                            `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });

}


/* =========================================================
   14. HERO PARALLAX
   ========================================================= */

function initParallax() {

    const heroBg =
        document.querySelector(
            ".hero-bg"
        );

    const featuredBg =
        document.querySelector(
            ".featured-bg"
        );

    if (!heroBg && !featuredBg) {
        return;
    }

    /*
       Avoid heavy parallax on mobile.
    */

    if (
        window.matchMedia(
            "(max-width: 768px)"
        ).matches
    ) {
        return;
    }

    let ticking = false;

    function updateParallax() {

        const scrollY =
            window.scrollY;

        if (heroBg) {

            const heroOffset =
                Math.min(
                    scrollY * 0.18,
                    180
                );

            heroBg.style.transform =
                `translateY(${heroOffset}px) scale(1.04)`;

        }

        if (featuredBg) {

            const rect =
                featuredBg
                    .parentElement
                    .getBoundingClientRect();

            const offset =
                rect.top * -0.08;

            featuredBg.style.transform =
                `translateY(${offset}px) scale(1.04)`;

        }

        ticking = false;

    }

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   15. BUTTON RIPPLE EFFECT
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".btn"
            );

        if (!button) return;

        const ripple =
            document.createElement(
                "span"
            );

        ripple.className =
            "button-ripple";

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(
                rect.width,
                rect.height
            );

        ripple.style.width =
            `${size}px`;

        ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
            `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 700);

    }
);


/* =========================================================
   16. RIPPLE CSS INJECTION
   ========================================================= */

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `

.btn {
    position: relative;
    overflow: hidden;
}

.button-ripple {
    position: absolute;

    border-radius: 50%;

    background:
        rgba(255,255,255,.28);

    transform: scale(0);

    animation:
        buttonRipple .7s ease-out;

    pointer-events: none;

    z-index: 1;
}

@keyframes buttonRipple {

    to {
        transform: scale(2.5);
        opacity: 0;
    }

}

`;

document.head.appendChild(
    rippleStyle
);


/* =========================================================
   17. PROJECT CARD TILT
   ========================================================= */

function initProjectTilt() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.01)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}

initProjectTilt();


/* =========================================================
   18. DYNAMIC YEAR
   ========================================================= */

function initYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent =
            currentYear;
    });

}

initYear();


/* =========================================================
   19. WHATSAPP HELPER
   ========================================================= */

function openWhatsApp(
    phone,
    message
) {

    const encodedMessage =
        encodeURIComponent(
            message ||
            "Hello AUREVIA, I would like to discuss an interior design project."
        );

    const url =
        `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   20. GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener(
    "error",
    error => {

        console.warn(
            "AUREVIA UI Error:",
            error.message
        );

    }
);


/* =========================================================
   21. PAGE LOADED
   ========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

console.log(
    "%c AUREVIA ",
    "font-size:24px;font-weight:bold;color:#d6b46a;"
);

console.log(
    "%c Architecture of Tomorrow. Living for Today. ",
    "font-size:12px;color:#999;"
);