// Variables
const btnEnter = document.querySelector('#enter');
const form = document.querySelector('#logForm');
const lid = document.querySelector('.lid');

const email = document.querySelector('#email');
const password = document.querySelector('#password');

// Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', openApp);

    // Form inputs
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
}

// Functions
function openApp() {
    btnEnter.disabled = true;
    btnEnter.textContent = 'Not yet';
    btnEnter.classList.add('openEnter');
}

function validateForm(e) {
    const error = document.querySelector('p.error');
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
        showError("You're boring me..");
    }

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

function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        form.appendChild(errorMessage);
    }
}

function enter(e) {
    e.preventDefault();
    form.style.display = 'none';
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('showFirst');

    setTimeout(() => {
        spinner.style.display = 'none';

        const result = document.querySelector('.result');
        result.classList.remove('showThen');

        // formulario.insertBefore(result, spinner);
    }, 1800);
}

const blinking = setInterval(eyeWink, 3000);

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

function stopBlinking() {
    clearInterval(blinking);
    lid.classList.remove('blinkMedium');
    lid.classList.add('noSee');
}

function screenWidth() {
    if (screen.width < 450) {
        console.log('Hola');
        email.placeholder = 'rick@deckard.com';
        password.placeholder = 'r2d2';
    }
}

// EYE TRACKING
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
