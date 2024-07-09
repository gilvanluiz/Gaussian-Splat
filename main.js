const rooms = [
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/entity-classvaluation-1/4869-regal-dr--bonita-springs--fl-34134--usa/no-unit/26/primary/above-grade/level-1/clones/pool/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/entity-classvaluation-1/15295-burnaby-dr--naples--fl-34110--usa/no-unit/26/primary/above-grade/level-1/clones/living-room/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/26/584-banyan-blvd--naples--fl-34102--usa/no-unit/primary/above-grade/level-1/clones/garage/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/26/602-banyan-blvd--naples--fl-34102--usa/no-unit/secondary/detached-garage/above-grade/level-1/clones/room/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/26/584-banyan-blvd--naples--fl-34102--usa/no-unit/primary/above-grade/level-1/clones/club-room/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/26/584-banyan-blvd--naples--fl-34102--usa/no-unit/primary/above-grade/level-2/clones/lounge---loft/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/27/365-5th-ave-s--naples--fl-34102--usa/301/primary/above-grade/level-1/clones/livingroomnew/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/no-entity/26/3396-crayton-rd--naples--fl-34103--usa/no-unit/primary/above-grade/level-1/clones/living-room/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/entity-classvaluation-1/15295-burnaby-dr--naples--fl-34110--usa/no-unit/26/primary/above-grade/level-1/clones/living-room/model/iteration_30000.splat',
    'https://link.storjshare.io/raw/jvxxeyhejguiei247jpxmx4vluua/neuron-dev-datastore/instaplan-master/no-super-entity/entity-classvaluation-1/584-banyan-blvd--naples--fl-34102--usa/no-unit/26/primary/above-grade/level-1/clones/living-room/model/iteration_30000.splat',
];

//Parameters for each rooms
//This is just the orientation of each of them for now
const params = [
    {
        up: [-1, 0, -0.1],
    },
    {
        up: [-1, 0, -0.4],
    },
    {
        up: [-1, 0, -0.0],
    },
    {
        up: [-1, 0, -0.0],
    },
    {
        up: [-1, 0, -0.0],
    },
    {
        up: [-1, 0, -0.2],
    },
    {
        up: [-1, 0, -0.2],
    },
    {
        up: [-1, 0, -0.8],
    },
    {
        up: [-1, 0, -0.4],
    },
    {
        up: [-1, 0, -0.4],
    },
];

const keysPressed = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};

const current = {
    room: 0,
};

let controlsOpen = false;
// let cameraUp = new THREE.Vector3();
let cameraUp = new THREE.Vector3();

const controlButtons = document.querySelectorAll('.control-button');
const buttonArray = [];

controlButtons.forEach((button, i) => {
    if (i < 5) button.style.display = 'none';
    buttonArray.push(button);
});

buttonArray[0].addEventListener('pointerdown', resetPosition);
buttonArray[1].addEventListener('pointerdown', () => {
    verticalCtrl(0);
});
buttonArray[2].addEventListener('pointerdown', () => {
    verticalCtrl(1);
});
buttonArray[3].addEventListener('pointerdown', () => {
    rotateCtrl(0);
});
buttonArray[4].addEventListener('pointerdown', () => {
    rotateCtrl(1);
});
buttonArray[5].addEventListener('pointerdown', toggleControls);

function verticalCtrl(side) {
    if (side === 0) {
        viewer.camera.position.x -= 0.1;
        viewer.controls.target.x -= 0.1;
    }

    if (side === 1) {
        viewer.camera.position.x += 0.1;
        viewer.controls.target.x += 0.1;
    }
}



let cameraPos = [
    0.16875, 3.29878, -0.92870
]

let controlsTarget = [
    0.16875, 3.29878, -0.92871
]


function resetPosition() {
    if (current.room === 0) {
        viewer.camera.position.set(-.64963, 4.70684, -2.33749);
        viewer.controls.target.set(-.64963, 3.29878, -0.92871);
        viewer.camera.rotation.set(12, -22, 30)
    } else {
        viewer.camera.position.set(0.5, 0, 0);
        viewer.controls.target.set(0.16875, 3.29878, -0.92871);
    }
    viewer.camera.up.set(cameraUp.x, cameraUp.y, cameraUp.z);
}

function rotateCtrl(side) {
    const tempMatrixLeft = new Matrix4();
    const tempMatrixRight = new Matrix4();
    const forward = new THREE.Vector3();

    forward.set(0, 0, -1);
    forward.transformDirection(viewer.camera.matrixWorld);
    tempMatrixLeft.makeRotationAxis(forward, Math.PI / 128);
    tempMatrixRight.makeRotationAxis(forward, -Math.PI / 128);

    if (side === 0) viewer.camera.up.transformDirection(tempMatrixRight);
    if (side === 1) viewer.camera.up.transformDirection(tempMatrixLeft);
}

function toggleControls() {
    if (!controlsOpen) {
        controlsOpen = true;
        buttonArray.forEach((button, i) => {
            if (i < 5) {
                button.style.display = 'initial';
            }
        });
    } else {
        controlsOpen = false;
        buttonArray.forEach((button, i) => {
            if (i < 5) {
                button.style.display = 'none';
            }
        });
    }
}

let viewer = new Viewer({
    cameraUp: [-1, 0, 0],
    initialCameraPosition: [0, 0, 1],
    initialCameraLookAt: [0, 0, 0],
    sceneRevealMode: 1,
    gpuAcceleratedSort: true,
    enableSIMDInSort: true,
    // useBuiltInControls: false

});

viewer
    .addSplatScene(rooms[0], {
        splatAlphaRemovalThreshold: 20,
        showLoadingUI: true,
        position: [0, 0, 0],
        rotation: [0, 0.080, -0.01, .65],
        scale: [1.5, 1.5, 1.5],
        progressiveLoad: true,
    })
    .then(() => {
        onLoad(0);
        viewer.start();
    });

//Reset on room changing
document.getElementById('roomSelect').addEventListener('change', changeRoom);

function changeRoom() {
    const select = this.value;

    viewer.dispose();
    viewer = new Viewer({
        cameraUp: params[select[4]].up,
        initialCameraPosition: [0, -4, 0],
        initialCameraLookAt: [0, 0, 0],
        sceneRevealMode: 1,
    });

    viewer
        .addSplatScene(rooms[select[4]], {
            splatAlphaRemovalThreshold: 20,
            showLoadingUI: true,
            position: [0, 1, 0],
            rotation: [0, 0, 0, 1],
            scale: [1.5, 1.5, 1.5],
            progressiveLoad: true,
        })
        .then(() => {
            onLoad(select[4]);
            viewer.start();
        });
}

function onLoad(n) {
    viewer.controls.enablePan = true;
    viewer.controls.enableZoom = false;
    // viewer.controls.stopListenToKeyEvents();



    viewer.camera.fov = 60;
    cameraUp.set(viewer.camera.up.x, viewer.camera.up.y, viewer.camera.up.z);

    viewer.camera.position.set(-.64963, 4.70684, -2.33749);
    viewer.controls.target.set(-.64963, 3.29878, -0.92871);


}







//Camera control
let joySensX = 1;
let joySensY = 1;

function moveCamera() {
    let moveDistance = 0.1;

    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();

    if (viewer) {
        viewer.camera.getWorldDirection(direction);
        right.copy(direction).cross(viewer.camera.up);

        const currentPosition = viewer.camera.position.clone();
        const movement = new THREE.Vector3();

        if (keysPressed.forward) {
            movement.addScaledVector(direction, moveDistance * joySensY);
        }
        if (keysPressed.backward) {
            movement.addScaledVector(direction, -moveDistance * joySensY);
        }
        if (keysPressed.left) {
            movement.addScaledVector(right, -moveDistance * joySensX);
        }
        if (keysPressed.right) {
            movement.addScaledVector(right, moveDistance * joySensX);
        }

        movement.x = 0 // making the x value fixed
        const newPosition = currentPosition.clone().add(movement);


        viewer.camera.position.copy(newPosition);


        viewer.controls.target.add(movement);



    }
    requestAnimationFrame(moveCamera);
}

moveCamera();
//KeyPressing


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':

            keysPressed.forward = true;
            break;
        case 'ArrowDown':

            keysPressed.backward = true;
            break;
        case 'ArrowLeft':

            keysPressed.left = true;
            break;
        case 'ArrowRight':

            keysPressed.right = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':

            keysPressed.forward = false;
            break;
        case 'ArrowDown':

            keysPressed.backward = false;
            break;
        case 'ArrowLeft':

            keysPressed.left = false;
            break;
        case 'ArrowRight':

            keysPressed.right = false;
            break;
    }
});

//Joystick copy

let joystickCenterX, joystickCenterY;
let joystickRadius = 75; // Half of joystick-container size (150px)
let moveX = 0,
    moveY = 0;
let down = false;

const joystick = document.getElementById('joystick');

joystick.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const rect = joystick.getBoundingClientRect();
    joystickCenterX = rect.left + rect.width / 2;
    joystickCenterY = rect.top + rect.height / 2;
    down = true;
    updateMovement(e.clientX, e.clientY);
});

joystick.addEventListener('mousemove', (e) => {
    if (!down) return;
    e.preventDefault();
    updateMovement(e.clientX, e.clientY);
});

joystick.addEventListener('mouseup', (e) => {
    e.preventDefault();
    stopMovement();
});

joystick.addEventListener('mouseleave', (e) => {
    if (down) {
        stopMovement();
    }
});

joystick.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = joystick.getBoundingClientRect();
    joystickCenterX = rect.left + rect.width / 2;
    joystickCenterY = rect.top + rect.height / 2;
    down = true;
    updateMovement(e.touches[0].clientX, e.touches[0].clientY);
});

joystick.addEventListener('touchmove', (e) => {
    if (!down) return;
    e.preventDefault();
    updateMovement(e.touches[0].clientX, e.touches[0].clientY);
});

joystick.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopMovement();
});

function updateMovement(clientX, clientY) {
    let dx = clientX - joystickCenterX;
    let dy = clientY - joystickCenterY;
    let distance = Math.hypot(dx, dy);

    if (distance > joystickRadius) {
        let angle = Math.atan2(dy, dx);
        dx = joystickRadius * Math.cos(angle);
        dy = joystickRadius * Math.sin(angle);
    }

    joystick.style.transform = `translate(${dx}px, ${dy}px)`;
    if (dy < -10) {
        keysPressed.forward = true;
        keysPressed.backward = false;
    }
    if (dy > 10) {
        keysPressed.backward = true;
        keysPressed.forward = false;
    }
    if (dx > 10) {
        keysPressed.left = false;
        keysPressed.right = true;
    }
    if (dx < -10) {
        keysPressed.right = false;
        keysPressed.left = true;
    }

    joySensX = Math.abs(dx / 30);
    joySensY = Math.abs(dy / 30);

    moveX = (dx / joystickRadius) * 0.1;
    moveY = (dy / joystickRadius) * 0.1;
}

function stopMovement() {
    joySensX = 1;
    joySensY = 1;
    down = false;
    moveX = 0;
    moveY = 0;
    joystick.style.transform = `translate(0px, 0px)`;
    keysPressed.forward =
        keysPressed.backward =
        keysPressed.left =
        keysPressed.right =
        false;
}



