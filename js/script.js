/*
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(
            this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
);
*/

//
//  Class Helper Function
//

function getDocumentWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getDocumentHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientWidth;
}

//
//  Navbar Solid Class Trigger
//
let navbarSolidClassName = "navbar--wrapper__solid"
let navbarScrollYTrigger = 200;

if( window.scrollY > 200 ) {
    let navbar = document.getElementById("navbar");
    navbar.classList.add( navbarSolidClassName );
}

window.addEventListener('scroll', triggerNavbarSolidClass);

function triggerNavbarSolidClass() {

    let navbar = document.getElementById("navbar");

    if( window.scrollY > navbarScrollYTrigger 
        && !navbar.classList.contains( navbarSolidClassName ) ) {
            navbar.classList.add( navbarSolidClassName );
    } else if( window.scrollY <= navbarScrollYTrigger 
        && navbar.classList.contains( navbarSolidClassName ) ) {
            navbar.classList.remove( navbarSolidClassName );
    }

}

//
//  Background canvas helper
//

function resizeCanvasToWindow(el) {
    padding = 500;
    bgCanvas.width = getDocumentWidth() + padding;
    bgCanvas.height = getDocumentHeight() + padding;
}

function resizeBgCanvasToWindow() {
    let bgCanvas = document.getElementById("canvas");
    resizeCanvasToWindow(bgCanvas);
}

//
//  Background canvas
//

let bgCanvasId = "bg-canvas";

let bgCanvas = document.getElementById( bgCanvasId );
resizeCanvasToWindow(bgCanvas);

window.addEventListener('resize', resizeBgCanvasToWindow);

// let bgContext = bgCanvas.getContext("2d");
// bgContext.fillStyle = "rgba(150, 219, 255, 0.5)";
// bgContext.beginPath();
// bgContext.arc( 500, 200, 20, 0, Math.PI * 2, true);
// bgContext.closePath();
// bgContext.fill();