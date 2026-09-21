/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* =========================================
   FERMER LE MENU APRÈS UN CLIC
========================================= */

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

    });

});


/* =========================================
   NAVIGATION ACTIVE
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    let currentSection = "accueil";

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================
   MODE CLAIR / MODE SOMBRE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const root =
    document.documentElement;


/*
   Appliquer le thème
*/

function applyTheme(isDark) {

    root.classList.toggle(
        "dark",
        isDark
    );


    if (!themeToggle) {
        return;
    }


    themeToggle.classList.toggle(
        "dark",
        isDark
    );


    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );


    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Activer le mode clair"
            : "Activer le mode sombre"
    );

}


/*
   Charger le thème sauvegardé
*/

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    applyTheme(
        savedTheme === "dark"
    );


    /*
       Changement du thème
    */

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                !root.classList.contains("dark");


            applyTheme(isDark);


            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =========================================
   ANIMATION TITRE ACCUEIL
========================================= */

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {

    const firstName = "Enzo";
    const lastName = "Rabet.";

    heroTitle.innerHTML = `
        <span class="typing-line first-line"></span><br>
        <span class="typing-line last-line"></span>
    `;

    const firstLine =
        heroTitle.querySelector(".first-line");

    const lastLine =
        heroTitle.querySelector(".last-line");


    let firstIndex = 0;
    let secondIndex = 0;


    function createCursor() {

        const cursor =
            document.createElement("span");

        cursor.className =
            "typing-cursor";

        cursor.textContent = "|";

        return cursor;

    }


    let cursor =
        createCursor();

    firstLine.appendChild(cursor);


    function typeFirstName() {

        if (firstIndex < firstName.length) {

            cursor.remove();

            firstLine.textContent +=
                firstName[firstIndex];

            firstIndex++;

            firstLine.appendChild(cursor);

            setTimeout(
                typeFirstName,
                220
            );

        } else {

            setTimeout(
                moveCursorToLastName,
                300
            );

        }

    }


    function moveCursorToLastName() {

        cursor.remove();

        lastLine.appendChild(cursor);

        typeLastName();

    }


    function typeLastName() {

        if (secondIndex < lastName.length) {

            cursor.remove();

            lastLine.textContent +=
                lastName[secondIndex];

            secondIndex++;

            lastLine.appendChild(cursor);

            setTimeout(
                typeLastName,
                220
            );

        } else {

            setTimeout(
                blinkBeforeErase,
                2500
            );

        }

    }


    function blinkBeforeErase() {

        cursor.classList.add(
            "typing-cursor-slow"
        );

        setTimeout(
            eraseText,
            1800
        );

    }


    function eraseText() {

        cursor.classList.remove(
            "typing-cursor-slow"
        );


        const eraseInterval =
            setInterval(() => {

                if (secondIndex > 0) {

                    cursor.remove();

                    secondIndex--;

                    lastLine.textContent =
                        lastName.substring(
                            0,
                            secondIndex
                        );

                    lastLine.appendChild(
                        cursor
                    );

                } else if (firstIndex > 0) {

                    cursor.remove();

                    firstIndex--;

                    firstLine.textContent =
                        firstName.substring(
                            0,
                            firstIndex
                        );

                    firstLine.appendChild(
                        cursor
                    );

                } else {

                    clearInterval(
                        eraseInterval
                    );

                    cursor.remove();

                    firstLine.appendChild(
                        cursor
                    );

                    setTimeout(
                        typeFirstName,
                        1000
                    );

                }

            }, 120);

    }


    typeFirstName();

}
/* =========================================
   CONTACT — BULLES FLOTTANTES
========================================= */

const floatingContactArea =
    document.querySelector(".contact-socials");

const floatingContactBubbles =
    document.querySelectorAll(".contact-links .contact-card");


if (
    floatingContactArea &&
    floatingContactBubbles.length
) {

    const bubbles = [];


    /*
       Création des données physiques
       de chaque bulle.
    */

    floatingContactBubbles.forEach(
        (bubble, index) => {

            const bubbleData = {

                element: bubble,

                x: 0,
                y: 0,

                vx: 0,
                vy: 0,

                targetVx: 0,
                targetVy: 0,

                radius: 29,

                hover: false,

                seed: index * 1.37

            };


            bubbles.push(bubbleData);

        }
    );


    /*
       Calcule les dimensions disponibles.
    */

    function getAreaSize() {

        const rect =
            floatingContactArea.getBoundingClientRect();

        return {

            width: rect.width,

            height:
                floatingContactArea.offsetHeight

        };

    }


    /*
       Positionnement initial.
       On répartit les bulles dans la zone
       sans qu'elles commencent les unes
       sur les autres.
    */

    function initializeBubbles() {

        const area =
            getAreaSize();


        const padding = 10;


        bubbles.forEach(
            (bubble, index) => {

                const maxX =
                    Math.max(
                        0,
                        area.width -
                        bubble.radius * 2 -
                        padding * 2
                    );


                const maxY =
                    Math.max(
                        0,
                        area.height -
                        bubble.radius * 2 -
                        padding * 2 -
                        30
                    );


                /*
                   Positions de départ différentes
                   pour chaque réseau.
                */

                const positions = [

                    [0.10, 0.18],

                    [0.72, 0.10],

                    [0.42, 0.48],

                    [0.12, 0.68],

                    [0.76, 0.67]

                ];


                const position =
                    positions[
                        index % positions.length
                    ];


                bubble.x =
                    padding +
                    maxX * position[0];


                bubble.y =
                    30 +
                    padding +
                    maxY * position[1];


                /*
                   Petites vitesses initiales.
                */

                bubble.vx =
                    index % 2 === 0
                        ? 0.12
                        : -0.10;


                bubble.vy =
                    index % 2 === 0
                        ? -0.08
                        : 0.10;


                bubble.targetVx =
                    bubble.vx;


                bubble.targetVy =
                    bubble.vy;


                updateBubblePosition(
                    bubble
                );

            }
        );

    }


    /*
       Applique la position à l'écran.
    */

    function updateBubblePosition(
        bubble
    ) {

        bubble.element.style.transform =
            `translate3d(
                ${bubble.x}px,
                ${bubble.y}px,
                0
            )`;

    }


    /*
       Vérifie les limites de la zone.
    */

    function keepInsideArea(
        bubble,
        area
    ) {

        const minX = 0;

        const minY = 30;

        const maxX =
            area.width -
            bubble.radius * 2;

        const maxY =
            area.height -
            bubble.radius * 2;


        if (bubble.x <= minX) {

            bubble.x = minX;

            bubble.vx =
                Math.abs(bubble.vx);

        }


        if (bubble.x >= maxX) {

            bubble.x = maxX;

            bubble.vx =
                -Math.abs(bubble.vx);

        }


        if (bubble.y <= minY) {

            bubble.y = minY;

            bubble.vy =
                Math.abs(bubble.vy);

        }


        if (bubble.y >= maxY) {

            bubble.y = maxY;

            bubble.vy =
                -Math.abs(bubble.vy);

        }

    }


    /*
       Les bulles ne doivent pas se traverser.
       On applique une petite répulsion
       lorsqu'elles sont trop proches.
    */

    function preventBubbleOverlap() {

        const minimumDistance = 62;


        for (
            let i = 0;
            i < bubbles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < bubbles.length;
                j++
            ) {

                const a = bubbles[i];

                const b = bubbles[j];


                const dx =
                    b.x - a.x;

                const dy =
                    b.y - a.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance > 0 &&
                    distance < minimumDistance
                ) {

                    const push =
                        (
                            minimumDistance -
                            distance
                        ) * 0.018;


                    const nx =
                        dx / distance;

                    const ny =
                        dy / distance;


                    a.vx -=
                        nx * push;

                    a.vy -=
                        ny * push;


                    b.vx +=
                        nx * push;

                    b.vy +=
                        ny * push;

                }

            }

        }

    }


    /*
       Animation principale.
    */

    function animateBubbles() {

        const area =
            getAreaSize();


        bubbles.forEach(
            bubble => {

                /*
                   Les vitesses changent très doucement.
                   Cela donne un mouvement organique.
                */

                const time =
                    performance.now() / 3000;


                bubble.targetVx +=
                    Math.sin(
                        time +
                        bubble.seed
                    ) * 0.002;


                bubble.targetVy +=
                    Math.cos(
                        time * 0.9 +
                        bubble.seed
                    ) * 0.002;


                /*
                   Limite la vitesse.
                */

                const maxSpeed =
                    bubble.hover
                        ? 0.30
                        : 0.18;


                bubble.targetVx =
                    Math.max(
                        -maxSpeed,
                        Math.min(
                            maxSpeed,
                            bubble.targetVx
                        )
                    );


                bubble.targetVy =
                    Math.max(
                        -maxSpeed,
                        Math.min(
                            maxSpeed,
                            bubble.targetVy
                        )
                    );


                /*
                   Transition très douce vers
                   la nouvelle direction.
                */

                bubble.vx +=
                    (
                        bubble.targetVx -
                        bubble.vx
                    ) * 0.012;


                bubble.vy +=
                    (
                        bubble.targetVy -
                        bubble.vy
                    ) * 0.012;


                bubble.x +=
                    bubble.vx;


                bubble.y +=
                    bubble.vy;


                keepInsideArea(
                    bubble,
                    area
                );

            }
        );


        preventBubbleOverlap();


        bubbles.forEach(
            bubble => {

                updateBubblePosition(
                    bubble
                );

            }
        );


        requestAnimationFrame(
            animateBubbles
        );

    }


    /*
       Interaction souris :
       une très légère réaction au passage
       de la souris sur une bulle.
    */

    bubbles.forEach(
        bubble => {

            bubble.element.addEventListener(
                "mouseenter",
                () => {

                    bubble.hover = true;


                    /*
                       Petit mouvement de réaction.
                    */

                    bubble.targetVx +=
                        (
                            Math.random() - 0.5
                        ) * 0.12;


                    bubble.targetVy +=
                        (
                            Math.random() - 0.5
                        ) * 0.12;

                }
            );


            bubble.element.addEventListener(
                "mouseleave",
                () => {

                    bubble.hover = false;

                }
            );

        }
    );


    /*
       Recalcul lors d'un changement
       de taille de fenêtre.
    */

    window.addEventListener(
        "resize",
        () => {

            initializeBubbles();

        }
    );


    /*
       Lancement.
    */

    initializeBubbles();

    animateBubbles();

}
/* =========================================
   BARRE DE PROGRESSION DU SCROLL
========================================= */

const scrollProgressBar =
    document.querySelector(
        ".scroll-progress-bar"
    );


function updateScrollProgress() {

    if (!scrollProgressBar) {
        return;
    }


    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    scrollProgressBar.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateScrollProgress
);
/* =========================================
   ANIMATIONS D'APPARITION AU SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(
        `
        .section-title,
        .about-text,
        .highlight,
        .skill-card,
        .project-card,
        .stage-card,
        .objective-card,
        .contact-card
        `
    );


revealElements.forEach(
    (element, index) => {

        element.classList.add(
            "reveal"
        );


        /*
           Petit décalage entre les éléments
           d'une même zone.
        */

        element.style.transitionDelay =
            `${(index % 3) * 80}ms`;

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        /*
                           L'animation ne se
                           rejoue pas inutilement.
                        */

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);
/* =========================================
   TIMELINE ANIMÉE
========================================= */

const timelines =
    document.querySelectorAll(
        ".parcours-timeline"
    );


const timelineObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const timeline =
                            entry.target;


                        /*
                           Animation de la ligne.
                        */

                        timeline.classList.add(
                            "timeline-visible"
                        );


                        /*
                           Animation progressive
                           des éléments.
                        */

                        const timelineItems =
                            timeline.querySelectorAll(
                                ".parcours-item"
                            );


                        timelineItems.forEach(
                            (
                                item,
                                index
                            ) => {

                                setTimeout(
                                    () => {

                                        item.classList.add(
                                            "timeline-item-visible"
                                        );

                                    },
                                    250 +
                                    index * 220
                                );

                            }
                        );


                        timelineObserver.unobserve(
                            timeline
                        );

                    }

                }
            );

        },
        {
            threshold: 0.25
        }
    );


timelines.forEach(
    timeline => {

        timelineObserver.observe(
            timeline
        );

    }
);
/* =========================================
   TERMINAL ANIMÉ
========================================= */

const terminal =
    document.querySelector(
        ".terminal"
    );


let terminalHasPlayed =
    false;


function typeTerminalText(
    element,
    text,
    speed
) {

    return new Promise(
        resolve => {

            let index = 0;


            function type() {

                if (
                    index < text.length
                ) {

                    element.textContent +=
                        text.charAt(
                            index
                        );


                    index++;


                    setTimeout(
                        type,
                        speed
                    );

                } else {

                    resolve();

                }

            }


            type();

        }
    );

}


async function startTerminalAnimation() {

    if (
        terminalHasPlayed
    ) {
        return;
    }


    terminalHasPlayed =
        true;


    const commands =
        terminal.querySelectorAll(
            ".terminal-command"
        );


    const results =
        terminal.querySelectorAll(
            ".terminal-result"
        );


    /*
       On vide les commandes
       avant de commencer.
    */

    commands.forEach(
        command => {

            command.textContent = "";

        }
    );


    /*
       On cache les résultats.
    */

    results.forEach(
        result => {

            result.classList.remove(
                "terminal-result-visible"
            );

        }
    );


    /*
       Animation commande
       puis résultat.
    */

    for (
        let i = 0;
        i < commands.length;
        i++
    ) {

        const command =
            commands[i];


        const result =
            results[i];


        const text =
            command.dataset.text;


        await typeTerminalText(
            command,
            text,
            65
        );


        await new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    250
                );

            }
        );


        result.textContent =
            result.dataset.result;


        result.classList.add(
            "terminal-result-visible"
        );


        await new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    300
                );

            }
        );

    }

}
/* Déclenchement du terminal */

if (terminal) {

    const terminalObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            startTerminalAnimation();

                            terminalObserver.unobserve(
                                terminal
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    terminalObserver.observe(
        terminal
    );

}