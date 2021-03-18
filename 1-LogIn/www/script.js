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

    //Password watching
    password.addEventListener('click', stopBlinking);
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
    } else {
        e.target.classList.add('openEnter');
        lid.classList.remove('noSee');
        mostrarError("You're boring me..");
    }

    if (e.target.type === 'email') {
        if (email.value === 'rick@deckard.com') {
            if (error) {
                error.remove();
            }
            e.target.classList.remove('openEnter');
        } else {
            e.target.classList.add('openEnter');
            mostrarError("That's not the droid I'm looking for.");
        }
    }

    if (email.value === 'rick@deckard.com' && password.value === 'r2d2') {
        btnEnter.disabled = false;
        btnEnter.classList.remove('openEnter');
        btnEnter.classList.add('validatedEnter');
        btnEnter.textContent = 'Enter';
        lid.classList.remove('noSee');
    } else {
        console.log('Not yet');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        form.appendChild(mensajeError);
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

        formulario.insertBefore(result, spinner);
    }, 1800);
}

const blinking = setInterval(eyeWink, 2000);

function eyeWink() {
    setTimeout(() => {
        lid.classList.remove('blinkMedium');
        lid.classList.add('blinkClose');
    }, 1200);
    setTimeout(() => {
        lid.classList.remove('blinkClose');
        lid.classList.add('blinkMedium');
    }, 1800);
}

function stopBlinking() {
    clearInterval(blinking);
    lid.classList.add('noSee');
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
