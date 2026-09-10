"use strict";

/* =========================================
   AUREVIA ∞
   NEXT GENERATION EXPERIENCE ENGINE
========================================= */


/* -------------------------
   CONFIG
------------------------- */

window.AUREVIA_CONFIG = {

    AI_ENDPOINT: "",

    phone: "917585093412",

    email: "monirulislam9932714@gmali.com"

};


/* -------------------------
   LOADER
------------------------- */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader")
            ?.classList.add("hide");

    }, 1000);

});


/* -------------------------
   YEAR
------------------------- */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* -------------------------
   CURSOR
------------------------- */

const cursor = document.querySelector(".cursor");

if (cursor && window.matchMedia("(pointer:fine)").matches) {

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    window.addEventListener("mousemove", e => {

        mx = e.clientX;
        my = e.clientY;

    });

    function cursorLoop(){

        cx += (mx - cx) * .16;
        cy += (my - cy) * .16;

        cursor.style.left = cx + "px";
        cursor.style.top = cy + "px";

        requestAnimationFrame(cursorLoop);

    }

    cursorLoop();

    document.querySelectorAll("a,button,.project,.material-card")
        .forEach(el => {

            el.addEventListener("mouseenter", () =>
                cursor.classList.add("active")
            );

            el.addEventListener("mouseleave", () =>
                cursor.classList.remove("active")
            );

        });

}


/* -------------------------
   MAGNETIC BUTTONS
------------------------- */

if (window.matchMedia("(pointer:fine)").matches) {

    document.querySelectorAll(".magnetic").forEach(button => {

        button.addEventListener("mousemove", e => {

            const r = button.getBoundingClientRect();

            const x =
                e.clientX - r.left - r.width / 2;

            const y =
                e.clientY - r.top - r.height / 2;

            button.style.transform =
                `translate(${x * .16}px,${y * .16}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}


/* -------------------------
   SMOOTH ANCHORS
------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

        const target =
            document.querySelector(link.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior:"smooth"
        });

    });

});


/* =========================================
   HERO WEBGL
========================================= */

function createHeroWorld(){

    const canvas =
        document.getElementById("heroCanvas");

    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();

    scene.fog =
        new THREE.FogExp2(0x050505,.025);

    const camera =
        new THREE.PerspectiveCamera(
            55,
            innerWidth / innerHeight,
            .1,
            100
        );

    camera.position.z = 7;

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias:true,
            alpha:true,
            powerPreference:"high-performance"
        });

    renderer.setPixelRatio(
        Math.min(devicePixelRatio,1.5)
    );

    renderer.setSize(
        innerWidth,
        innerHeight
    );

    /* PARTICLES */

    const count =
        innerWidth < 700 ? 450 : 1100;

    const positions =
        new Float32Array(count * 3);

    for(let i=0;i<count;i++){

        positions[i*3] =
            (Math.random()-.5)*14;

        positions[i*3+1] =
            (Math.random()-.5)*8;

        positions[i*3+2] =
            (Math.random()-.5)*10;

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
            color:0xc9aa70,
            size:.025,
            transparent:true,
            opacity:.65,
            blending:THREE.AdditiveBlending
        });

    const particles =
        new THREE.Points(
            geometry,
            material
        );

    scene.add(particles);


    /* ARCHITECTURAL GRID */

    const grid =
        new THREE.GridHelper(
            30,
            30,
            0x6f5b39,
            0x171717
        );

    grid.position.y = -2;

    grid.material.transparent = true;
    grid.material.opacity = .22;

    scene.add(grid);


    /* CENTRAL ARCH */

    const archGroup =
        new THREE.Group();

    const archMaterial =
        new THREE.MeshBasicMaterial({
            color:0xc9aa70,
            wireframe:true,
            transparent:true,
            opacity:.16
        });

    for(let i=0;i<5;i++){

        const geo =
            new THREE.BoxGeometry(
                3 + i*.6,
                4 + i*.5,
                .12
            );

        const mesh =
            new THREE.Mesh(
                geo,
                archMaterial
            );

        mesh.position.z =
            -i*.55;

        archGroup.add(mesh);

    }

    scene.add(archGroup);


    /* MOUSE */

    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", e => {

        targetX =
            (e.clientX / innerWidth - .5);

        targetY =
            (e.clientY / innerHeight - .5);

    });


    function animate(){

        requestAnimationFrame(animate);

        particles.rotation.y += .00025;
        particles.rotation.x += .00008;

        archGroup.rotation.y +=
            (targetX*.25 - archGroup.rotation.y)
            * .015;

        archGroup.rotation.x +=
            (-targetY*.15 - archGroup.rotation.x)
            * .015;

        camera.position.x +=
            (targetX*.8 - camera.position.x)
            * .025;

        camera.position.y +=
            (-targetY*.5 - camera.position.y)
            * .025;

        renderer.render(
            scene,
            camera
        );

    }

    animate();


    window.addEventListener("resize",() => {

        camera.aspect =
            innerWidth / innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            innerWidth,
            innerHeight
        );

    });

}

createHeroWorld();


/* =========================================
   3D ROOM ENGINE
========================================= */

function createRoom(){

    const canvas =
        document.getElementById("roomCanvas");

    if (!canvas || !window.THREE) return;


    const scene =
        new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth /
            canvas.clientHeight,
            .1,
            100
        );

    camera.position.set(
        7,
        4.8,
        8
    );


    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias:true,
            alpha:true,
            powerPreference:"high-performance"
        });

    renderer.setPixelRatio(
        Math.min(devicePixelRatio,1.5)
    );

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
    );


    /* LIGHT */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.1
        );

    scene.add(ambient);

    const keyLight =
        new THREE.DirectionalLight(
            0xffd8a0,
            3
        );

    keyLight.position.set(
        4,
        8,
        3
    );

    scene.add(keyLight);


    /* ROOM */

    const room =
        new THREE.Group();

    scene.add(room);


    let materialType = "marble";
    let roomType = "living";
    let lightType = "warm";


    function getMaterial(){

        const settings = {

            marble:{
                color:0xc8c1b3,
                roughness:.25,
                metalness:.05
            },

            wood:{
                color:0x704b2d,
                roughness:.7,
                metalness:0
            },

            stone:{
                color:0x303030,
                roughness:.8,
                metalness:0
            },

            metal:{
                color:0x555555,
                roughness:.2,
                metalness:.85
            }

        };

        return new THREE.MeshStandardMaterial(
            settings[materialType]
        );

    }


    function buildRoom(){

        room.clear();


        /* FLOOR */

        const floor =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    10,.25,8
                ),
                getMaterial()
            );

        floor.position.y = -1;

        room.add(floor);


        /* BACK WALL */

        const back =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    10,6,.25
                ),
                new THREE.MeshStandardMaterial({
                    color:0x151515,
                    roughness:.9
                })
            );

        back.position.set(
            0,2,-4
        );

        room.add(back);


        /* LEFT WALL */

        const left =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    .25,6,8
                ),
                new THREE.MeshStandardMaterial({
                    color:0x111111,
                    roughness:.9
                })
            );

        left.position.set(
            -5,2,0
        );

        room.add(left);


        /* CEILING BEAMS */

        for(let i=-3;i<=3;i+=2){

            const beam =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        .15,5.8,.15
                    ),
                    new THREE.MeshBasicMaterial({
                        color:0xc9aa70
                    })
                );

            beam.position.set(
                i,
                2,
                -3.8
            );

            room.add(beam);

        }


        /* WINDOW */

        const windowFrame =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    3.5,
                    3,
                    .08
                ),
                new THREE.MeshBasicMaterial({
                    color:0x9f8251,
                    wireframe:true
                })
            );

        windowFrame.position.set(
            2,
            1.6,
            -3.82
        );

        room.add(windowFrame);


        /* FURNITURE */

        if(roomType === "living"){

            createSofa(0,-.15,1);

            createTable(
                0,-.5,-1
            );

        }

        if(roomType === "bedroom"){

            createBed(
                0,-.15,0
            );

            createTable(
                -2,-.5,-1.5
            );

        }

        if(roomType === "kitchen"){

            createKitchen();

        }

    }


    function createSofa(x,y,z){

        const material =
            new THREE.MeshStandardMaterial({
                color:0x252525,
                roughness:.75
            });

        const base =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    3.5,.5,1.2
                ),
                material
            );

        base.position.set(
            x,y,z
        );

        room.add(base);


        for(let i=-1.3;i<=1.3;i+=1.3){

            const back =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        1.1,
                        1.4,
                        .5
                    ),
                    material
                );

            back.position.set(
                i,
                .55,
                z-.35
            );

            room.add(back);

        }

    }


    function createBed(x,y,z){

        const bed =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    4,.5,5
                ),
                new THREE.MeshStandardMaterial({
                    color:0x292929,
                    roughness:.8
                })
            );

        bed.position.set(
            x,y,z
        );

        room.add(bed);


        const head =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    4,2,.25
                ),
                new THREE.MeshStandardMaterial({
                    color:0x181818
                })
            );

        head.position.set(
            x,.7,z-2.3
        );

        room.add(head);

    }


    function createTable(x,y,z){

        const top =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .9,.9,.15,32
                ),
                getMaterial()
            );

        top.position.set(
            x,y,z
        );

        room.add(top);


        const leg =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .08,.08,1.2,12
                ),
                new THREE.MeshStandardMaterial({
                    color:0x171717,
                    metalness:.8
                })
            );

        leg.position.set(
            x,y-.6,z
        );

        room.add(leg);

    }


    function createKitchen(){

        for(let i=-2;i<=2;i+=1){

            const cabinet =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        .9,1.5,.8
                    ),
                    getMaterial()
                );

            cabinet.position.set(
                i*1.1,
                -.25,
                -2.5
            );

            room.add(cabinet);

        }

    }


    buildRoom();


    /* CAMERA INTERACTION */

    let drag = false;
    let previousX = 0;

    canvas.addEventListener(
        "pointerdown",
        e => {

            drag = true;
            previousX = e.clientX;

        }
    );

    window.addEventListener(
        "pointerup",
        () => drag = false
    );

    canvas.addEventListener(
        "pointermove",
        e => {

            if(!drag) return;

            const delta =
                e.clientX - previousX;

            room.rotation.y +=
                delta * .006;

            previousX = e.clientX;

        }
    );


    canvas.addEventListener(
        "wheel",
        e => {

            camera.position.z +=
                e.deltaY * .004;

            camera.position.z =
                Math.max(
                    5,
                    Math.min(
                        12,
                        camera.position.z
                    )
                );

        }
    );


    /* CONTROLS */

    document.querySelectorAll("[data-room]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll("[data-room]")
                        .forEach(b =>
                            b.classList.remove("active")
                        );

                    button.classList.add("active");

                    roomType =
                        button.dataset.room;

                    document.getElementById(
                        "roomName"
                    ).textContent =
                        button.textContent +
                        " / SIGNATURE";

                    buildRoom();

                }
            );

        });


    document.querySelectorAll("[data-material]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll("[data-material]")
                        .forEach(b =>
                            b.classList.remove("active")
                        );

                    button.classList.add("active");

                    materialType =
                        button.dataset.material;

                    buildRoom();

                }
            );

        });


    document.querySelectorAll("[data-light]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll("[data-light]")
                        .forEach(b =>
                            b.classList.remove("active")
                        );

                    button.classList.add("active");

                    lightType =
                        button.dataset.light;


                    const settings = {

                        warm:{
                            color:0xffd29a,
                            intensity:3
                        },

                        day:{
                            color:0xddeaff,
                            intensity:4
                        },

                        cinematic:{
                            color:0xc9aa70,
                            intensity:1.7
                        }

                    };

                    keyLight.color.setHex(
                        settings[lightType].color
                    );

                    keyLight.intensity =
                        settings[lightType].intensity;


                    document.getElementById(
                        "environmentStatus"
                    ).textContent =
                        "SIGNATURE / " +
                        button.textContent;

                }
            );

        });


    /* LOOP */

    function animate(){

        requestAnimationFrame(animate);

        room.rotation.y *= .995;

        renderer.render(
            scene,
            camera
        );

    }

    animate();


    window.addEventListener(
        "resize",
        () => {

            const width =
                canvas.clientWidth;

            const height =
                canvas.clientHeight;

            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();

            renderer.setSize(
                width,
                height,
                false
            );

        }
    );

}

createRoom();


/* =========================================
   AUREVIA DESIGN ENGINE
========================================= */

let projectType = "Residence";
let designStyle = "Modern Luxury";


document.querySelectorAll(".ai-option")
    .forEach(button => {

        button.addEventListener("click",() => {

            document
                .querySelectorAll(".ai-option")
                .forEach(b =>
                    b.classList.remove("active")
                );

            button.classList.add("active");

            projectType =
                button.dataset.value;

        });

    });


document.querySelectorAll(".style-option")
    .forEach(button => {

        button.addEventListener("click",() => {

            document
                .querySelectorAll(".style-option")
                .forEach(b =>
                    b.classList.remove("active")
                );

            button.classList.add("active");

            designStyle =
                button.dataset.value;

        });

    });


document.getElementById("generateDesign")
    ?.addEventListener("click", async () => {

        const area =
            Number(
                document.getElementById("areaInput").value
            ) || 1200;

        const budget =
            document.getElementById("budgetInput").value;


        /* Future real AI API */

        if(window.AUREVIA_CONFIG.AI_ENDPOINT){

            try{

                const response =
                    await fetch(
                        window.AUREVIA_CONFIG.AI_ENDPOINT,
                        {
                            method:"POST",
                            headers:{
                                "Content-Type":
                                    "application/json"
                            },
                            body:JSON.stringify({
                                projectType,
                                designStyle,
                                area,
                                budget
                            })
                        }
                    );

                const data =
                    await response.json();

                renderDesign(data);

                return;

            }catch(error){

                console.warn(
                    "AI endpoint unavailable."
                );

            }

        }


        /* LOCAL DESIGN INTELLIGENCE */

        const result =
            generateLocalConcept(
                projectType,
                designStyle,
                area,
                budget
            );

        renderDesign(result);

    });


function generateLocalConcept(
    project,
    style,
    area,
    budget
){

    let scale =
        area > 1800
            ? "GRAND"
            : area > 1000
            ? "SIGNATURE"
            : "COMPACT";

    let palette =
        style === "Dark Luxury"
            ? "Charcoal / Smoked Oak / Brass"
            : style === "Minimal"
            ? "Warm White / Natural Oak / Stone"
            : style === "Futuristic"
            ? "Graphite / Metal / Soft White"
            : "Ivory / Walnut / Champagne";


    let features = {

        "Modern Luxury":[
            "Large-format stone surfaces",
            "Warm architectural lighting",
            "Fluted wood detailing",
            "Concealed storage",
            "Statement furniture"
        ],

        "Minimal":[
            "Clean architectural lines",
            "Neutral material palette",
            "Integrated storage",
            "Soft indirect lighting",
            "Low visual clutter"
        ],

        "Dark Luxury":[
            "Dark stone surfaces",
            "Smoked wood",
            "Brushed brass accents",
            "Layered ambient lighting",
            "Monolithic furniture"
        ],

        "Futuristic":[
            "Seamless surfaces",
            "Metallic detailing",
            "Linear lighting",
            "Smart storage",
            "Sculptural furniture"
        ]

    };


    return {

        title:
            scale + " " +
            style.toUpperCase(),

        description:
            `A ${style.toLowerCase()} direction
            designed for a ${area} sq ft
            ${project.toLowerCase()} project.
            The concept focuses on spatial clarity,
            premium materials and atmospheric lighting.`,

        palette,

        features:
            features[style] || features["Modern Luxury"],

        budget:
            budget === "custom"
                ? "PREMIUM / CUSTOM"
                : "₹" + budget + " LAKH"

    };

}


function renderDesign(data){

    const container =
        document.getElementById(
            "resultContent"
        );

    container.innerHTML = `

        <div class="generated">

            <p class="small-label">
                CONCEPT DIRECTION
            </p>

            <h3>
                ${data.title}
            </h3>

            <p>
                ${data.description}
            </p>

            <ul>

                <li>
                    PALETTE —
                    ${data.palette}
                </li>

                <li>
                    BUDGET —
                    ${data.budget}
                </li>

                ${data.features.map(
                    feature =>
                    `<li>+ ${feature}</li>`
                ).join("")}

            </ul>

        </div>

    `;

}


/* =========================================
   GSAP CINEMATIC MOTION
========================================= */

if(window.gsap){

    gsap.registerPlugin(
        ScrollTrigger
    );


    gsap.utils.toArray(
        ".manifesto h2,.designer h2,.project-intro h2,.material-heading h2,.process h2,.contact h2"
    ).forEach(title => {

        gsap.from(title,{

            y:100,
            opacity:0,

            scrollTrigger:{
                trigger:title,
                start:"top 85%",
                end:"top 45%",
                scrub:1
            }

        });

    });


    gsap.utils.toArray(
        ".project,.material-card,.process-list>div"
    ).forEach(item => {

        gsap.from(item,{

            y:70,
            opacity:0,

            scrollTrigger:{
                trigger:item,
                start:"top 90%"
            },

            duration:1.2,
            ease:"power4.out"

        });

    });


    gsap.to(".hero-content",{

        y:-120,

        scrollTrigger:{
            trigger:".hero",
            start:"top top",
            end:"bottom top",
            scrub:true
        }

    });

}


/* =========================================
   VISIBILITY PERFORMANCE
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        document.body.classList.toggle(
            "page-hidden",
            document.hidden
        );

    }
);


/* =========================================
   BRAND
========================================= */

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

       AUREVIA ∞

   ARCHITECTURE OF TOMORROW.
   LIVING FOR TODAY.

   NEXT-GENERATION EXPERIENCE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
