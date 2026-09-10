/* =========================================================
   AUREVIA — LUXURY SPACES
   Main JavaScript
========================================================= */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar = document.getElementById("navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       PROJECT FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove(
                        "filtered-out"
                    );

                } else {

                    card.classList.add(
                        "filtered-out"
                    );

                }

            });

        });

    });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.setAttribute(
            "aria-expanded",
            "false"
        );

        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /* Close other FAQ items */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove(
                        "active"
                    );

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight =
                            null;
                    }

                    if (otherQuestion) {
                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }

            });


            /* Toggle current item */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
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
                                "#" + currentId
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

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("name")
                    ?.value
                    .trim();

                const phone =
                    document.getElementById("phone")
                    ?.value
                    .trim();


                if (!name || !phone) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please enter your name and phone number.";

                    }

                    return;

                }


                /*
                   Current form is frontend-only.
                   WhatsApp enquiry is opened below.
                */

                const property =
                    document.getElementById(
                        "property"
                    )?.value || "";

                const area =
                    document.getElementById(
                        "area"
                    )?.value || "";

                const service =
                    document.getElementById(
                        "service"
                    )?.value || "";

                const message =
                    document.getElementById(
                        "message"
                    )?.value || "";


                const whatsappText =

                    "Hello AUREVIA,%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +

                    "%0APhone: " +
                    encodeURIComponent(phone) +

                    "%0AProperty: " +
                    encodeURIComponent(property) +

                    "%0AArea: " +
                    encodeURIComponent(area) +

                    "%0AService: " +
                    encodeURIComponent(service) +

                    "%0AMessage: " +
                    encodeURIComponent(message);


                const whatsappURL =
                    "https://wa.me/917585093412?text=" +
                    whatsappText;


                if (formMessage) {

                    formMessage.textContent =
                        "Opening WhatsApp enquiry...";

                }


                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener"
                    );

                }, 400);

            }
        );

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );

    const featuredImage =
        document.querySelector(
            ".featured-image img"
        );


    if (
        window.matchMedia(
            "(prefers-reduced-motion: no-preference)"
        ).matches
    ) {

        let ticking = false;

        const updateParallax = () => {

            const scrollY =
                window.pageYOffset;

            if (heroBackground) {

                const hero =
                    document.querySelector(".hero");

                if (hero) {

                    const rect =
                        hero.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top < window.innerHeight
                    ) {

                        heroBackground.style.transform =
                            `translateY(${scrollY * 0.12}px) scale(1.04)`;

                    }

                }

            }


            if (featuredImage) {

                const section =
                    featuredImage.closest(
                        ".featured"
                    );

                if (section) {

                    const rect =
                        section.getBoundingClientRect();

                    if (
                        rect.bottom > 0 &&
                        rect.top < window.innerHeight
                    ) {

                        const offset =
                            (window.innerHeight / 2 -
                            (rect.top + rect.height / 2))
                            * 0.08;

                        featuredImage.style.transform =
                            `translateY(${offset}px) scale(1.04)`;

                    }

                }

            }

            ticking = false;

        };


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


    /* =====================================================
       IMAGE ERROR PROTECTION
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.35";

            }
        );

    });


    /* =====================================================
       DYNAMIC YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    if (menuToggle) {

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c AUREVIA ",
        "background:#c8a96b;color:#080808;padding:8px 14px;font-weight:bold;"
    );

    console.log(
        "Architecture of Tomorrow. Living for Today."
    );

});
