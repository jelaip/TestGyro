console.log('init script.js');
const ax = document.querySelector('.ax');
const ay = document.querySelector('.ay');
const az = document.querySelector('.az');
const gx = document.querySelector('.gx');
const gy = document.querySelector('.gy');
const gz = document.querySelector('.gz');

if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
            gx.innerHTML = event.alpha;
            gy.innerHTML = event.gamma;
            gz.innerHTML = event.beta;
        },
        true
    );
}

if (window.DeviceMotionEvent) {
    window.addEventListener(
        "devicemotion",
        (event) => {
            ax.innerHTML = event.acceleration.x;
            ay.innerHTML = event.acceleration.y;
            az.innerHTML = event.acceleration.z;
        },
        true
    );
}