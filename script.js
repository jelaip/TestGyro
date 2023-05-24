console.log('init script.js');
const ax = document.querySelector('.ax');
const ay = document.querySelector('.ay');
const az = document.querySelector('.az');
const gx = document.querySelector('.gx');
const gy = document.querySelector('.gy');
const gz = document.querySelector('.gz');
const sliderA = document.querySelector('#sliderA');
const sliderG = document.querySelector('#sliderG');
//const sliderPA = document.querySelector('#sliderPA');
//const sliderPG = document.querySelector('#sliderPG');

let maxPointsA = 100
let maxPointsG = 100

let nbpointsAcc = sliderA.value;
let nbpointsGyr = sliderG.value;
let xValuesAcc = [];
let yValuesAcc = [];
let zValuesAcc = [];
let xValuesGyr = [];
let yValuesGyr = [];
let zValuesGyr = [];

let secondeAcc = [];
let secondeGyr = [];

let xValuesAccTemp = [];
let yValuesAccTemp = [];
let zValuesAccTemp = [];
let xValuesGyrTemp = [];
let yValuesGyrTemp = [];
let zValuesGyrTemp = [];

let cleanTabGyr = () => {
    xValuesGyrTemp = [];
    yValuesGyrTemp = [];
    zValuesGyrTemp = [];
}

let cleanTabAcc = () => {
        xValuesAccTemp = [];
        yValuesAccTemp = [];
        zValuesAccTemp = [];
    }
    /*
    sliderPA.addEventListener('change', (e) => {
        maxPointsA = e.target.value;
    });

    sliderPG.addEventListener('change', (e) => {
        maxPointsG = e.target.value;
    });*/


sliderA.addEventListener('change', (e) => {
    nbpointsAcc = e.target.value;
    cleanTabAcc();
    console.log(nbpointsAcc);
});

sliderG.addEventListener('change', (e) => {
    nbpointsGyr = e.target.value;
    cleanTabGyr();
    console.log(nbpointsGyr);
});

// get seconde of the day
let getSeconde = () => {
    let date = new Date();
    let seconde = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours();
    return seconde + minute * 60 + heure * 3600;
}


if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
            //gx.innerHTML = event.alpha;
            //gy.innerHTML = event.gamma;
            //gz.innerHTML = event.beta;
            xValuesGyrTemp.push(event.alpha);
            yValuesGyrTemp.push(event.gamma);
            zValuesGyrTemp.push(event.beta);
            if (xValuesGyrTemp.length == nbpointsGyr) {
                //moyenne de xValuesGyrTemp
                let moyenneX = 0;
                let moyenneY = 0;
                let moyenneZ = 0;
                for (let i = 0; i < nbpointsGyr; i++) {
                    moyenneX += xValuesGyrTemp[i];
                    moyenneY += yValuesGyrTemp[i];
                    moyenneZ += zValuesGyrTemp[i];
                }
                moyenneX /= nbpointsGyr;
                moyenneY /= nbpointsGyr;
                moyenneZ /= nbpointsGyr;
                gx.innerHTML = moyenneX;
                gy.innerHTML = moyenneY;
                gz.innerHTML = moyenneZ;
                secondeGyr = getSeconde();
                xValuesGyr.push(moyenneX);
                yValuesGyr.push(moyenneY);
                zValuesGyr.push(moyenneZ);
                cleanTabGyr();
            }
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
            xValuesAccTemp.push(event.acceleration.x);
            yValuesAccTemp.push(event.acceleration.y);
            zValuesAccTemp.push(event.acceleration.z);
            if (xValuesAccTemp.length == nbpointsAcc) {
                //moyenne de xValuesAccTemp
                let moyenneX = 0;
                let moyenneY = 0;
                let moyenneZ = 0;
                for (let i = 0; i < nbpointsAcc; i++) {
                    moyenneX += xValuesAccTemp[i];
                    moyenneY += yValuesAccTemp[i];
                    moyenneZ += zValuesAccTemp[i];
                }
                moyenneX /= nbpointsAcc;
                moyenneY /= nbpointsAcc;
                moyenneZ /= nbpointsAcc;
                secondeAcc = getSeconde();
                xValuesAcc.push(moyenneX);
                yValuesAcc.push(moyenneY);
                zValuesAcc.push(moyenneZ);
                cleanTabAcc();
                while (xValuesAcc.length > maxPointsA) {
                    xValuesAcc.shift();
                    yValuesAcc.shift();
                    zValuesAcc.shift();
                    secondeAcc.shift();
                }

                new Chart("chartAccel", {
                    type: "line",
                    data: {
                        labels: secondeAcc,
                        datasets: [{
                            data: xValuesAcc,
                            borderColor: "red",
                            fill: false
                        }, {
                            data: yValuesAcc,
                            borderColor: "green",
                            fill: false
                        }, {
                            data: zValuesAcc,
                            borderColor: "blue",
                            fill: false
                        }]
                    },
                    options: {
                        legend: { display: false }
                    }
                });
            }
        },
        true
    );
}