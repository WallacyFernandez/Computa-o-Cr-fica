import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubes = [];
const m = 10;
const n = 10;
const deltaX = 1;
const side = 1;
let offsetx = ((m - 1) * (deltaX + side)) / 2.0;
let offsety = ((m - 1) * (deltaX + side)) / 2;


function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}


for (let p = 0; p < n; p++) {
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            const geometry = new THREE.BoxGeometry(side, side, side);
            const material = new THREE.MeshBasicMaterial({ color: getRandomColor(), wireframe: true });
            const cube = new THREE.Mesh(geometry, material);
        
            cube.position.x = i * (side + deltaX) - offsetx;
            cube.position.y = j * (side + deltaX) - offsety;
            cube.position.z = -p * (side + deltaX) - offsety;
            scene.add(cube);
            cubes.push(cube);
        }
    }
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.00;
    });

    for (var cube of cubes) {
        cube.position.z += 0.1;
        if (cube.position.z > camera.position.z)
            cube.position.z = -10;
    }

    renderer.render(scene, camera);
}

animate();
