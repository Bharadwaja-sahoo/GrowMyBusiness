// ========= Page preloader: wait for every image to load, then reveal the page & start AOS =========
(function pageLoader() {
    "use strict";

    const loader = document.getElementById("page-loader");
    const images = Array.from(document.images); // all <img> elements currently in the DOM
    let loadedCount = 0;
    const totalCount = images.length;
    let finished = false;

    function finishLoading() {
        if (finished) return;
        finished = true;

        document.documentElement.classList.remove("is-loading");

        if (loader) {
            loader.classList.add("loader-hidden");
            // Remove the loader from the DOM once its fade-out transition ends
            loader.addEventListener("transitionend", () => loader.remove(), { once: true });
        }

        // Start AOS only after the loader is gone, so animations trigger correctly
        if (typeof AOS !== "undefined") {
            AOS.init({
                once: true,
                duration: 1500,
            });
        }
    }

    function markOneLoaded() {
        loadedCount++;
        if (loadedCount >= totalCount) {
            finishLoading();
        }
    }

    if (totalCount === 0) {
        // No images on the page — nothing to wait for
        finishLoading();
    } else {
        images.forEach((img) => {
            if (img.complete) {
                // Already loaded (e.g. cached)
                markOneLoaded();
            } else {
                img.addEventListener("load", markOneLoaded, { once: true });
                img.addEventListener("error", markOneLoaded, { once: true }); // don't let a broken image hang the loader
            }
        });
    }

    // Safety net: never let the loader stay up forever (e.g. a very slow/stalled image)
    window.setTimeout(finishLoading, 8000);
})();


// right-sidebar
function open_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
        sidepanel.style.left = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function close_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
        sidepanel.style.left = "-355px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

let slid = document.getElementById("slid-btn");
if (slid) {
    slid.onclick = () => {
        let dropdwon = document.getElementById("slid-drop");
        dropdwon.classList.toggle("aside-dropdwon");
    }
}


// ========= 1.3 > Logoipsum

$('.logo_ipsum_slider').slick({
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    slidesToShow: 4,
    cssEase: 'linear',
    responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
    ]
});


const planhover = document.querySelectorAll('.plan-card');
planhover.forEach((hoverplan) => {
    hoverplan.addEventListener('mouseenter', () => {
        if (hoverplan.classList.contains('plan-hover')) {
            hoverplan.classList.remove('plan-hover')
        } else {
            hoverplan.classList.add('plan-hover')
        }
    })
})
planhover.forEach((hoverplan) => {
    hoverplan.addEventListener('mouseleave', () => {
        hoverplan.classList.remove('plan-hover')
        AtivePlan = document.getElementById("hhh")
        if (AtivePlan) {
            AtivePlan.classList.add('plan-hover')
        }
    });
});







// 1.14. Talk section ===  form Submit massage
// PASTE your Google Apps Script Web App URL here (see setup guide provided with these files)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiGzmIMmAZ_xJgcyRqK9jsK1hrYbeJN0bmldrRHCSZ1vmKKaBCkrnUiTtqtB7X7WvH/exec";

const aboutFor = document.getElementById('Subscribe-massage');
const aboutMessag = document.getElementById('Succes-box');
if (aboutFor !== null) {
    aboutFor.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitBtn = aboutFor.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
        }

        const formData = new FormData(aboutFor);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Apps Script doesn't send CORS headers back; no-cors lets the request through
        })
            .then(() => {
                aboutMessag.innerHTML = 'Form Submit Successfully!';
                aboutMessag.style.display = 'block';
                aboutFor.reset();
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                aboutMessag.innerHTML = 'Something went wrong. Please call us instead.';
                aboutMessag.style.display = 'block';
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
                setTimeout(() => {
                    aboutMessag.style.display = 'none';
                }, 3500);
            });
    });
}


// 1.15. Subscribe section === Subscribe successfully massage
const aboutFor2 = document.getElementById('Subscribe-massage2');
const aboutMessag2 = document.getElementById('Succes-box2');
if (aboutFor2 !== null) {
    aboutFor2.addEventListener('submit', (event) => {
        event.preventDefault();
        aboutMessag2.innerHTML = 'Subscribed Successfully!';
        aboutMessag2.style.display = 'block';
        aboutFor2.reset();
        setTimeout(() => {
            aboutMessag2.style.display = 'none';
        }, 3000);
    });
}



// Instagram-style swipe dots for the Before/After image carousels (mobile)
document.querySelectorAll('.before-after-img').forEach((track) => {
    const boxes = track.querySelectorAll('.img-box');
    if (boxes.length < 2) return;

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'swipe-dots';
    boxes.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsWrap.appendChild(dot);
    });
    track.insertAdjacentElement('afterend', dotsWrap);

    const dots = dotsWrap.querySelectorAll('span');
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const index = Math.round(track.scrollLeft / track.clientWidth);
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }, 50);
    }, { passive: true });
});


// hover animation of > 1.5. Case-Study section
const hoveredDivs = document.querySelectorAll('.p-query');
let larg;
hoveredDivs.forEach((hoveredDiv) => {
    hoveredDiv.addEventListener('mouseenter', () => {
        larg = document.getElementById('Case-Study-col')
        larg.classList.remove('p-width')
        hoveredDiv.classList.add('p-active');
        let overlay = document.getElementById("over");
        overlay.classList.remove('over-h');

    });

    hoveredDiv.addEventListener('mouseleave', () => {
        hoveredDiv.classList.remove('p-active');
        larg = document.getElementById('Case-Study-col')
        larg.classList.add('p-width')
        let overlay = document.getElementById("over");
        overlay.classList.add('over-h');
    });
});





// ========= 1.3 > Logoipsum

$('.Gallery_Slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    cssEase: 'linear',
    responsive: [{
            breakpoint: 1800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            }
        },
        {
            breakpoint: 1441,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 541,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
    ]
});








$('.Professionals_Slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 2,
    cssEase: 'linear',
    responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            }
        },
        {
            breakpoint: 820,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 540,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
    ]
});




const changeImageElements = document.querySelectorAll(".Change_image");

changeImageElements.forEach((element, index) => {
    element.addEventListener("mouseenter", () => {
        element.style.transition = 'all 0.3s ease';
        switch (index) {
            case 2:
                element.src = 'assets/images/team_slider/Team-1A.webp';
                break;
            case 3:
                element.src = 'assets/images/team_slider/Team-2A.webp';
                break;
            case 4:
                element.src = 'assets/images/team_slider/Team-5A.webp';
                break;
            case 5:
                element.src = 'assets/images/team_slider/Team-1A.webp';
                break;
        }
    });

    element.addEventListener("mouseleave", () => {
        switch (index) {
            case 2:
                element.src = 'assets/images/team_slider/Team-1.webp';
                break;
            case 3:
                element.src = 'assets/images/team_slider/Team-2.webp';
                break;
            case 4:
                element.src = 'assets/images/team_slider/Team-5.webp';
                break;
            case 5:
                element.src = 'assets/images/team_slider/Team-1.webp';
                break;
        }

    });
});






const changeImageElementsTeam = document.querySelectorAll(".Change_image_team");

changeImageElementsTeam.forEach((element, index) => {
    element.addEventListener("mouseenter", () => {
        element.style.transition = 'all 0.3s ease';
        switch (index) {
            case 0:
                element.src = 'assets/images/team/Team-1A.webp';
                break;
            case 1:
                element.src = 'assets/images/team/Team-2A.webp';
                break;
            case 2:
                element.src = 'assets/images/team/Team-3A.webp';
                break;
            case 3:
                element.src = 'assets/images/team/Team-4A.webp';
                break;
            case 4:
                element.src = 'assets/images/team/Team-5A.webp';
                break;
            case 5:
                element.src = 'assets/images/team/Team-6A.webp';
                break;

        }
    });

    element.addEventListener("mouseleave", () => {
        switch (index) {
            case 0:
                element.src = 'assets/images/team/Team-1.webp';
                break;
            case 1:
                element.src = 'assets/images/team/Team-2.webp';
                break;
            case 2:
                element.src = 'assets/images/team/Team-3.webp';
                break;
            case 3:
                element.src = 'assets/images/team/Team-4.webp';
                break;
            case 4:
                element.src = 'assets/images/team/Team-5.webp';
                break;
            case 5:
                element.src = 'assets/images/team/Team-6.webp';
                break;
        }

    });
});





const changeImageElementsLogo = document.querySelectorAll(".logo_change");

changeImageElementsLogo.forEach((element, index) => {
    element.addEventListener("mouseenter", () => {
        element.style.transition = 'all 0.3s ease';
        switch (index) {
            case 0:
                element.src = 'assets/images/logoipsum/logoipsum1.svg';
                break;
            case 1:
                element.src = 'assets/images/logoipsum/logoipsum2.svg';
                break;
            case 2:
                element.src = 'assets/images/logoipsum/logoipsum3.svg';
                break;
            case 3:
                element.src = 'assets/images/logoipsum/logoipsum4.svg';
                break;
            case 4:
                element.src = 'assets/images/logoipsum/logoipsum5.svg';
                break;

        }
    });

    element.addEventListener("mouseleave", () => {
        switch (index) {
            case 0:
                element.src = 'assets/images/logoipsum/logoipsum_Dark_1.svg';
                break;
            case 1:
                element.src = 'assets/images/logoipsum/logoipsum_Dark_2.svg';
                break;
            case 2:
                element.src = 'assets/images/logoipsum/logoipsum_Dark_3.svg';
                break;
            case 3:
                element.src = 'assets/images/logoipsum/logoipsum_Dark_4.svg';
                break;
            case 4:
                element.src = 'assets/images/logoipsum/logoipsum_Dark_5.svg';
                break;
        }
    });
});