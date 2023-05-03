console.log('init script.js');
const ax = document.querySelector('.ax');
const ay = document.querySelector('.ay');
const az = document.querySelector('.az');
const gx = document.querySelector('.gx');
const gy = document.querySelector('.gy');
const gz = document.querySelector('.gz');

console.log(ax);

if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
            gx.innerHTML = event.alpha; // alpha: rotation around z-axis
            gy.innerHTML = event.gamma; // gamma: left to right
            gz.innerHTML = event.beta; // beta: front back motion


        },
        true
    );
}


ax.innerHTML = 'test';