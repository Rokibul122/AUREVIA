/* =========================================================
   AUREVIA ∞ — UNLIMITED EDITION
   MAIN JAVASCRIPT ENGINE
========================================================= */

"use strict";


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTouch =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("loaded");

    document.body.classList.add("page-ready");

  }, prefersReducedMotion ? 300 : 1900);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {

  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

}

window.addEventListener(
  "scroll",
  updateNavbar,
  { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.querySelector(".menu-btn");

const mobileMenu =
  document.querySelector(".mobile-menu");

const mobileLinks =
  document.querySelectorAll(".mobile-menu a");


function toggleMenu() {

  if (!menuButton || !mobileMenu) return;

  menuButton.classList.toggle("active");

  mobileMenu.classList.toggle("open");

  document.body.classList.toggle(
    "menu-open"
  );

}


if (menuButton) {

  menuButton.addEventListener(
    "click",
    toggleMenu
  );

}


mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    menuButton?.classList.remove("active");

    mobileMenu?.classList.remove("open");

    document.body.classList.remove(
      "menu-open"
    );

  });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    menuButton?.classList.remove("active");

    mobileMenu?.classList.remove("open");

    document.body.classList.remove(
      "menu-open"
    );

  }

});


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener("click", event => {

    const targetId =
      anchor.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) return;

    const target =
      document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const offset =
      navbar?.offsetHeight || 0;

    const position =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({

      top: position,

      behavior:
        prefersReducedMotion
          ? "auto"
          : "smooth"

    });

  });

});


/* =========================================================
   REVEAL ENGINE
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );

const animatedBlocks =
  document.querySelectorAll(
    ".project-card, .service-item, .process-step, .number-card"
  );


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach(
    element =>
      revealObserver.observe(element)
  );


  animatedBlocks.forEach(
    element =>
      revealObserver.observe(element)
  );

} else {

  revealElements.forEach(
    element =>
      element.classList.add("visible")
  );

  animatedBlocks.forEach(
    element =>
      element.classList.add("visible")
  );

}


/* =========================================================
   STAGGER ANIMATIONS
========================================================= */

if (!prefersReducedMotion) {

  const groups = [
    ".project-card",
    ".service-item",
    ".process-step",
    ".number-card"
  ];

  groups.forEach(selector => {

    document
      .querySelectorAll(selector)
      .forEach((element, index) => {

        element.style.transitionDelay =
          `${Math.min(index * 0.08, 0.5)}s`;

      });

  });

}


/* =========================================================
   COUNTERS
========================================================= */

const counters =
  document.querySelectorAll(
    "[data-counter]"
  );


function animateCounter(element) {

  const target =
    Number(
      element.getAttribute(
        "data-counter"
      )
    );

  if (!Number.isFinite(target))
    return;

  if (prefersReducedMotion) {

    element.textContent =
      target;

    return;

  }

  const duration = 1800;

  const startTime =
    performance.now();


  function update(currentTime) {

    const elapsed =
      currentTime - startTime;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );

    const eased =
      1 -
      Math.pow(
        1 - progress,
        4
      );

    const value =
      Math.floor(
        eased * target
      );

    element.textContent =
      value;

    if (progress < 1) {

      requestAnimationFrame(update);

    } else {

      element.textContent =
        target;

    }

  }

  requestAnimationFrame(update);

}


if ("IntersectionObserver" in window) {

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;

          animateCounter(
            entry.target
          );

          counterObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.7
      }
    );


  counters.forEach(
    counter =>
      counterObserver.observe(counter)
  );

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

if (!isTouch) {

  const cursorDot =
    document.querySelector(
      ".cursor-dot"
    );

  const cursorRing =
    document.querySelector(
      ".cursor-ring"
    );


  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;


  window.addEventListener(
    "mousemove",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (cursorDot) {

        cursorDot.style.left =
          `${mouseX}px`;

        cursorDot.style.top =
          `${mouseY}px`;

      }

    },
    { passive: true }
  );


  function cursorLoop() {

    ringX +=
      (mouseX - ringX) * 0.16;

    ringY +=
      (mouseY - ringY) * 0.16;


    if (cursorRing) {

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

    }


    requestAnimationFrame(
      cursorLoop
    );

  }

  cursorLoop();


  const interactive =
    document.querySelectorAll(
      "a, button, input, textarea, .project-card"
    );


  interactive.forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {
        cursorRing?.classList.add(
          "active"
        );
      }
    );


    element.addEventListener(
      "mouseleave",
      () => {
        cursorRing?.classList.remove(
          "active"
        );
      }
    );

  });

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (!isTouch && !prefersReducedMotion) {

  const magneticElements =
    document.querySelectorAll(
      ".nav-cta, .explore-btn, .submit-btn, .whatsapp"
    );


  magneticElements.forEach(element => {

    element.addEventListener(
      "mousemove",
      event => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        element.style.transform =
          `translate(${x * 0.08}px, ${y * 0.08}px)`;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform =
          "";

      }
    );

  });

}


/* =========================================================
   PROJECT IMAGE TILT
========================================================= */

if (!isTouch && !prefersReducedMotion) {

  document
    .querySelectorAll(".project-card")
    .forEach(card => {

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


          const rotateY =
            ((x / rect.width) - 0.5) * 3;

          const rotateX =
            ((y / rect.height) - 0.5) * -3;


          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(0)`;

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


/* =========================================================
   PARALLAX HERO
========================================================= */

const hero =
  document.querySelector(".hero");

const heroContent =
  document.querySelector(".hero-content");

const heroOrbit =
  document.querySelector(".hero-orbit");


if (
  hero &&
  !prefersReducedMotion
) {

  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;

      if (scroll > window.innerHeight)
        return;


      if (heroContent) {

        heroContent.style.transform =
          `translateY(${scroll * 0.16}px)`;

        heroContent.style.opacity =
          Math.max(
            0,
            1 - scroll /
            (window.innerHeight * 0.8)
          );

      }


      if (heroOrbit) {

        heroOrbit.style.transform =
          `translateY(calc(-50% + ${scroll * 0.08}px))
           rotate(${scroll * 0.025}deg)`;

      }

    },
    { passive: true }
  );

}


/* =========================================================
   CINEMATIC BACKGROUND PARALLAX
========================================================= */

const cinematic =
  document.querySelector(
    ".cinematic"
  );

const cinematicBg =
  document.querySelector(
    ".cinematic-bg"
  );


if (
  cinematic &&
  cinematicBg &&
  !prefersReducedMotion
) {

  window.addEventListener(
    "scroll",
    () => {

      const rect =
        cinematic.getBoundingClientRect();

      const viewport =
        window.innerHeight;

      if (
        rect.bottom < 0 ||
        rect.top > viewport
      ) return;


      const progress =
        (viewport - rect.top) /
        (viewport + rect.height);


      const movement =
        (progress - 0.5) * 70;


      cinematicBg.style.transform =
        `translateY(${movement}px)
         scale(1.08)`;

    },
    { passive: true }
  );

}


/* =========================================================
   GSAP ENGINE
========================================================= */

if (
  typeof gsap !== "undefined" &&
  !prefersReducedMotion
) {

  gsap.registerPlugin(
    ScrollTrigger
  );


  /* HERO INTRO */

  gsap.fromTo(
    ".hero-eyebrow",
    {
      opacity: 0,
      y: 25
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: 2,
      ease: "power4.out"
    }
  );


  gsap.fromTo(
    ".hero-title .line",
    {
      opacity: 0,
      y: 100
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
      delay: 2.05,
      stagger: .12,
      ease: "power4.out"
    }
  );


  gsap.fromTo(
    ".hero-bottom",
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: 2.5,
      ease: "power4.out"
    }
  );


  /* MANIFESTO */

  gsap.from(
    ".manifesto h2",
    {
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 75%"
      },

      y: 90,
      opacity: 0,

      duration: 1.3,

      stagger: .18,

      ease: "power4.out"
    }
  );


  /* SERVICES */

  gsap.from(
    ".service-item",
    {
      scrollTrigger: {
        trigger: ".service-list",
        start: "top 80%"
      },

      x: -50,

      opacity: 0,

      duration: 1,

      stagger: .1,

      ease: "power4.out"
    }
  );


  /* PROCESS */

  gsap.from(
    ".process-step",
    {
      scrollTrigger: {
        trigger: ".process-line",
        start: "top 80%"
      },

      y: 50,

      opacity: 0,

      duration: .9,

      stagger: .12,

      ease: "power4.out"
    }
  );


  /* CONTACT */

  gsap.from(
    ".contact-content h2",
    {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 75%"
      },

      y: 80,

      opacity: 0,

      duration: 1.4,

      ease: "power4.out"
    }
  );

}


/* =========================================================
   CONTACT → WHATSAPP
========================================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "name"
        )?.value.trim() || "";


      const phone =
        document.getElementById(
          "phone"
        )?.value.trim() || "";


      const project =
        document.getElementById(
          "project"
        )?.value.trim() || "";


      const message =
        document.getElementById(
          "message"
        )?.value.trim() || "";


      if (!name || !phone) {

        alert(
          "Please enter your name and phone number."
        );

        return;

      }


      const whatsappMessage =
`Hello AUREVIA,

I would like to discuss an interior project.

Name: ${name}
Phone: ${phone}
Project Type: ${project || "Not specified"}

Project Details:
${message || "I would like to discuss my project."}

Thank you.`;


      const url =
        "https://wa.me/917585093412?text=" +
        encodeURIComponent(
          whatsappMessage
        );


      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================================================
   IMAGE PROTECTION
========================================================= */

document
  .querySelectorAll("img")
  .forEach(img => {

    img.addEventListener(
      "error",
      () => {

        img.style.display =
          "none";

        if (
          img.parentElement
        ) {

          img.parentElement.style
            .background =
            "linear-gradient(135deg,#111,#050505)";

        }

      }
    );

  });


/* =========================================================
   YEAR
========================================================= */

const year =
  document.getElementById(
    "year"
  );

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   THREE.JS — AUREVIA 3D ATMOSPHERE
========================================================= */

function initAurevia3D() {

  if (
    typeof THREE === "undefined" ||
    prefersReducedMotion
  ) {
    return;
  }


  const canvas =
    document.getElementById(
      "aureviaCanvas"
    );


  if (!canvas) return;


  try {

    const scene =
      new THREE.Scene();


    scene.fog =
      new THREE.FogExp2(
        0x070707,
        0.055
      );


    const camera =
      new THREE.PerspectiveCamera(
        45,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
      );


    camera.position.z =
      7;


    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        1.7
      )
    );


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    /* =============================================
       ARCHITECTURAL PARTICLES
    ============================================= */

    const particleCount =
      window.innerWidth < 700
        ? 700
        : 1500;


    const positions =
      new Float32Array(
        particleCount * 3
      );


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      positions[i * 3] =
        (Math.random() - .5) * 15;

      positions[i * 3 + 1] =
        (Math.random() - .5) * 9;

      positions[i * 3 + 2] =
        (Math.random() - .5) * 8;

    }


    const geometry =
      new THREE.BufferGeometry();


    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );


    const material =
      new THREE.PointsMaterial({

        color: 0xc8aa72,

        size:
          window.innerWidth < 700
            ? 0.018
            : 0.025,

        transparent: true,

        opacity: .42,

        depthWrite: false

      });


    const particles =
      new THREE.Points(
        geometry,
        material
      );


    scene.add(particles);


    /* =============================================
       ARCHITECTURAL WIREFRAME
    ============================================= */

    const group =
      new THREE.Group();


    const lineMaterial =
      new THREE.LineBasicMaterial({
        color: 0xc8aa72,
        transparent: true,
        opacity: .13
      });


    for (
      let i = -4;
      i <= 4;
      i++
    ) {

      const points = [

        new THREE.Vector3(
          i * .65,
          -2.5,
          -2
        ),

        new THREE.Vector3(
          i * .65,
          2.5,
          -2
        )

      ];


      const lineGeometry =
        new THREE.BufferGeometry()
          .setFromPoints(points);


      group.add(
        new THREE.Line(
          lineGeometry,
          lineMaterial
        )
      );

    }


    for (
      let i = -4;
      i <= 4;
      i++
    ) {

      const points = [

        new THREE.Vector3(
          -3,
          i * .55,
          -2
        ),

        new THREE.Vector3(
          3,
          i * .55,
          -2
        )

      ];


      const lineGeometry =
        new THREE.BufferGeometry()
          .setFromPoints(points);


      group.add(
        new THREE.Line(
          lineGeometry,
          lineMaterial
        )
      );

    }


    group.rotation.x =
      -0.15;


    scene.add(group);


    /* =============================================
       MOUSE INTERACTION
    ============================================= */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    if (!isTouch) {

      window.addEventListener(
        "mousemove",
        event => {

          targetX =
            (event.clientX /
              window.innerWidth -
              .5) * 0.7;


          targetY =
            (event.clientY /
              window.innerHeight -
              .5) * 0.5;

        },
        { passive: true }
      );

    }


    /* =============================================
       ANIMATION
    ============================================= */

    const clock =
      new THREE.Clock();


    function animate() {

      requestAnimationFrame(
        animate
      );


      const elapsed =
        clock.getElapsedTime();


      particles.rotation.y =
        elapsed * 0.015;


      particles.rotation.x =
        Math.sin(elapsed * .15) * .02;


      group.rotation.y +=
        0.0008;


      currentX +=
        (targetX - currentX) *
        .025;


      currentY +=
        (targetY - currentY) *
        .025;


      camera.position.x =
        currentX;


      camera.position.y =
        -currentY;


      camera.lookAt(
        0,
        0,
        0
      );


      renderer.render(
        scene,
        camera
      );

    }


    animate();


    /* =============================================
       RESIZE
    ============================================= */

    window.addEventListener(
      "resize",
      () => {

        camera.aspect =
          window.innerWidth /
          window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            1.7
          )
        );


        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

      }
    );


  } catch (error) {

    console.warn(
      "AUREVIA 3D engine unavailable:",
      error
    );

    canvas.style.display =
      "none";

  }

}


initAurevia3D();


/* =========================================================
   PERFORMANCE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      document.body
        .classList.add(
          "page-hidden"
        );

    } else {

      document.body
        .classList.remove(
          "page-hidden"
        );

    }

  }
);


/* =========================================================
   BRAND CONSOLE
========================================================= */

console.log(
  "%c AUREVIA ∞ ",
  "font-size:24px;font-weight:300;color:#c8aa72;"
);

console.log(
  "%c ARCHITECTURE OF TOMORROW. LIVING FOR TODAY. ",
  "font-size:11px;color:#999;"
);

console.log(
  "%c UNLIMITED EDITION ENGINE INITIALIZED.",
  "font-size:10px;color:#777;"
);
