/* =========================================
   GOODLUCK WEBSITE JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");

    const nav = document.getElementById("nav");

    const navLinks = document.querySelectorAll(".nav-link");


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", function () {

            nav.classList.toggle("open");

        });


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

            });

        });

    }


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    const header = document.getElementById("header");


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections = document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 180;


        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            const sectionId = section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        '.nav-link[href="#' + sectionId + '"]'
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }


    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .skill-category, .portfolio-card, .feature, .why-item, .contact-item"
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.10
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    const submitButton =
        document.getElementById("submitButton");

    const submitText =
        document.getElementById("submitText");

    const submitArrow =
        document.getElementById("submitArrow");

    const replyTo =
        document.getElementById("replyTo");


    if (contactForm) {


        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                formStatus.className = "form-status";

                formStatus.textContent = "";


                const emailInput =
                    document.getElementById("email");


                if (replyTo && emailInput) {

                    replyTo.value = emailInput.value;

                }


                submitButton.classList.add("loading");

                submitText.textContent = "Sending...";

                submitArrow.textContent = "•";


                const formData =
                    new FormData(contactForm);


                const data =
                    Object.fromEntries(formData.entries());


                try {


                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(data)
                            }
                        );


                    const result =
                        await response.json();


                    if (response.ok && result.success) {


                        formStatus.className =
                            "form-status success";


                        formStatus.textContent =
                            "Thank you! Your message has been sent successfully. I will get back to you as soon as possible.";


                        contactForm.reset();


                    } else {


                        throw new Error(
                            "Message could not be sent."
                        );

                    }


                } catch (error) {


                    formStatus.className =
                        "form-status error";


                    formStatus.textContent =
                        "The message could not be sent right now. Please contact me directly through email or WhatsApp.";


                }


                submitButton.classList.remove("loading");

                submitText.textContent =
                    "Send Message";

                submitArrow.textContent =
                    "→";


            }
        );

    }


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
    ===================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!nav || !menuToggle) {

                return;

            }


            const clickedInsideNav =
                nav.contains(event.target);


            const clickedMenu =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenu
            ) {

                nav.classList.remove("open");

            }

        }
    );


});