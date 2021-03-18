/**
 *  HINT: EMAIL IS VALIDATED DOWN HERE
 *  AS WELL AS THE PASSWORD.
 */

// Variables
const btnEnter = document.querySelector('#enter');
const form = document.querySelector('#logForm');
const lid = document.querySelector('.lid');
const banner = document.querySelector('.banner');

const email = document.querySelector('#email');
const password = document.querySelector('#password');

// Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', openApp);

    // Validate inputs
    email.addEventListener('blur', validateForm);
    password.addEventListener('blur', validateForm);

    // Enter
    form.addEventListener('submit', enter);

    // Blink
    document.addEventListener('click', eyeWink);

    // Password watching
    password.addEventListener('focus', stopBlinking);

    // Screen width
    document.addEventListener('click', screenWidth);

    // Close banner
    banner.addEventListener('click', closeBanner);
}

// FUNCTIONS

// When DOM is loaded
function openApp() {
    btnEnter.disabled = true;
    btnEnter.textContent = 'Not yet';
    btnEnter.classList.add('openEnter');
}

// Validate email and password
function validateForm(e) {
    const error = document.querySelector('p.error');
    // Check if there is nothing on the inputs
    if (e.target.value.length > 0) {
        if (error) {
            error.remove();
        }
        e.target.classList.remove('openEnter');
        lid.classList.remove('noSee');
        lid.classList.add('blinkMedium');
    } else {
        e.target.classList.add('openEnter');
        lid.classList.remove('noSee');
        lid.classList.add('blinkMedium');
        showError("C'mon, write something");
    }
    // Validate THE ONLY VALID email
    if (e.target.type === 'email') {
        if (email.value === 'rick@deckard.com') {
            if (error) {
                error.remove();
            }
            e.target.classList.remove('openEnter');
        } else {
            e.target.classList.add('openEnter');
            showError("That's not the droid I'm looking for");
        }
    }
    // Check if email and password are correct
    if (email.value === 'rick@deckard.com' && password.value === 'r2d2') {
        btnEnter.disabled = false;
        btnEnter.classList.remove('openEnter');
        btnEnter.classList.add('validatedEnter');
        btnEnter.textContent = 'Enter';
        lid.classList.remove('noSee');
        lid.classList.remove('blinkMedium');
    } else {
        console.log('Not yet');
    }
}
// Show error messages
function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        form.appendChild(errorMessage);
    }
}
// Action when click on enter
function enter(e) {
    e.preventDefault();
    form.style.display = 'none';
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('showFirst');

    setTimeout(() => {
        spinner.style.display = 'none';

        const result = document.querySelector('.result');
        result.classList.remove('showThen');
    }, 1800);
}

// BLINKING
// Set the interval as a variable
const blinking = setInterval(eyeWink, 3000);
// Execute the interval for the winking
function eyeWink() {
    setTimeout(() => {
        lid.classList.remove('blinkMedium');
        lid.classList.add('blinkClose');
        if (lid.classList.contains('noSee')) {
            lid.classList.remove('blinkClose');
        }
    }, 2000);
    setTimeout(() => {
        lid.classList.remove('blinkClose');
        lid.classList.add('blinkMedium');
        if (lid.classList.contains('noSee')) {
            lid.classList.remove('blinkMedium');
        }
    }, 2500);
}
// Stop the interval for the password writing
function stopBlinking() {
    clearInterval(blinking);
    lid.classList.remove('blinkMedium');
    lid.classList.add('noSee');
}

// Close banner
function closeBanner() {
    banner.style.display = 'none';
}

// LAST HINT, if you play with responsive you can see the answer
function screenWidth() {
    if (screen.width < 450) {
        email.placeholder = 'rick@deckard.com';
        password.placeholder = 'r2d2';
    }
}

// EYE TRACKING FUNCTION
document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball() {
    let eye = document.querySelectorAll('.eye');
    eye.forEach(function (eye) {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = `rotate(${rot}deg)`;
    });
}
