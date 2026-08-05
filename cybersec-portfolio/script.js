document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================
       1. Mobile Menu Toggle
       ============================================== */
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navLinksList = document.querySelector(".nav-links");
    const navIcon = mobileToggle.querySelector("i");

    mobileToggle.addEventListener("click", () => {
        navLinksList.classList.toggle("menu-open");
        if (navLinksList.classList.contains("menu-open")) {
            navIcon.classList.remove("fa-bars");
            navIcon.classList.add("fa-xmark");
        } else {
            navIcon.classList.remove("fa-xmark");
            navIcon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinksList.classList.contains("menu-open")) {
                navLinksList.classList.remove("menu-open");
                navIcon.classList.remove("fa-xmark");
                navIcon.classList.add("fa-bars");
            }
        });
    });

    /* ==============================================
       2. Sticky Navbar & Active Link Update
       ============================================== */
    const header = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll(".nav-links ol li a");

    window.addEventListener("scroll", () => {
        // Add shadow/shrink to navbar on scroll
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Scroll spy section active link highlight
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for navbar height
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

    /* ==============================================
       3. Typewriter Effect
       ============================================== */
    const typewriterElement = document.getElementById("typewriter");
    const phrases = [
        "Analyzing Logs...",
        "Hunting Vulnerabilities...",
        "Securing Networks...",
        "Detecting Threats..."
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = "";
    let isDeleting = false;

    function typeEffect() {
        currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2; // Delete faster
        }

        // If word is completely typed out
        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        }
        // If word is completely deleted
        else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect only if the element exists
    if (typewriterElement) {
        setTimeout(typeEffect, 1000); // Initial delay
    }

    /* ==============================================
       4. Scroll Reveal Animations (Intersection Observer)
       ============================================== */
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom of viewport
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==============================================
       5. Project Filtering
       ============================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCategories = document.querySelectorAll(".project-category");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update button styles
            filterButtons.forEach(b => {
                b.classList.remove("btn-primary", "active");
                b.classList.add("btn-outline");
            });
            btn.classList.add("btn-primary", "active");
            btn.classList.remove("btn-outline");

            const filterValue = btn.getAttribute("data-filter");

            projectCategories.forEach(category => {
                const group = category.getAttribute("data-group");

                if (filterValue === "all" || group === filterValue) {
                    category.style.display = "block";
                } else {
                    category.style.display = "none";
                }
            });
        });
    });

});
