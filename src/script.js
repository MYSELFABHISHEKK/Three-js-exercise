import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

let HearthMeshData;

let datSet = [
    { stave: 'H1S01', value: 10 }, { stave: 'H1S02', value: 15 }, { stave: 'H1S03', value: 25 }, { stave: 'H1S04', value: 35 },
    { stave: 'H1S05', value: 40 }, { stave: 'H1S06', value: 45 }, { stave: 'H1S07', value: 55 }, { stave: 'H1S08', value: 60 },
    { stave: 'H1S09', value: 65 }, { stave: 'H1S10', value: 75 }, { stave: 'H1S11', value: 80 }, { stave: 'H1S12', value: 85 },
    { stave: 'H1S13', value: 10 }, { stave: 'H1S14', value: 35 }, { stave: 'H1S15', value: 55 }, { stave: 'H1S16', value: 75 },
    { stave: 'H1S17', value: 15 }, { stave: 'H1S18', value: 40 }, { stave: 'H1S19', value: 60 }, { stave: 'H1S20', value: 80 },
    { stave: 'H1S21', value: 25 }, { stave: 'H1S22', value: 45 }, { stave: 'H1S23', value: 65 }, { stave: 'H1S24', value: 85 },
    { stave: 'H1S25', value: 10 }, { stave: 'H1S26', value: 15 }, { stave: 'H1S27', value: 25 }, { stave: 'H1S28', value: 35 },
    { stave: 'H1S29', value: 40 }, { stave: 'H1S30', value: 45 }, { stave: 'H1S31', value: 55 }, { stave: 'H1S32', value: 60 },
    { stave: 'H1S33', value: 65 }, { stave: 'H1S34', value: 75 }, { stave: 'H1S35', value: 80 }, { stave: 'H1S36', value: 85 },
    { stave: 'H1S37', value: 10 }, { stave: 'H1S38', value: 35 }, { stave: 'H1S39', value: 55 }, { stave: 'H1S40', value: 75 },
    { stave: 'H1S41', value: 15 }, { stave: 'H1S42', value: 40 }, { stave: 'H1S43', value: 60 }, { stave: 'H1S44', value: 80 },
    { stave: 'H1S45', value: 25 }, { stave: 'H1S46', value: 45 }, { stave: 'H1S47', value: 65 }, { stave: 'H1S48', value: 85 },
    { stave: 'H2S01', value: 10 }, { stave: 'H2S02', value: 15 }, { stave: 'H2S03', value: 25 }, { stave: 'H2S04', value: 35 },
    { stave: 'H2S05', value: 40 }, { stave: 'H2S06', value: 45 }, { stave: 'H2S07', value: 55 }, { stave: 'H2S08', value: 60 },
    { stave: 'H2S09', value: 65 }, { stave: 'H2S10', value: 75 }, { stave: 'H2S11', value: 80 }, { stave: 'H2S12', value: 85 },
    { stave: 'H2S13', value: 10 }, { stave: 'H2S14', value: 35 }, { stave: 'H2S15', value: 55 }, { stave: 'H2S16', value: 75 },
    { stave: 'H2S17', value: 15 }, { stave: 'H2S18', value: 40 }, { stave: 'H2S19', value: 60 }, { stave: 'H2S20', value: 80 },
    { stave: 'H2S21', value: 25 }, { stave: 'H2S22', value: 45 }, { stave: 'H2S23', value: 65 }, { stave: 'H2S24', value: 85 },
    { stave: 'H2S25', value: 10 }, { stave: 'H2S26', value: 15 }, { stave: 'H2S27', value: 25 }, { stave: 'H2S28', value: 35 },
    { stave: 'H2S29', value: 40 }, { stave: 'H2S30', value: 45 }, { stave: 'H2S31', value: 55 }, { stave: 'H2S32', value: 60 },
    { stave: 'H2S33', value: 65 }, { stave: 'H2S34', value: 75 }, { stave: 'H2S35', value: 80 }, { stave: 'H2S36', value: 85 },
    { stave: 'H2S37', value: 10 }, { stave: 'H2S38', value: 35 }, { stave: 'H2S39', value: 55 }, { stave: 'H2S40', value: 75 },
    { stave: 'H2S41', value: 15 }, { stave: 'H2S42', value: 40 }, { stave: 'H2S43', value: 60 }, { stave: 'H2S44', value: 80 },
    { stave: 'H2S45', value: 25 }, { stave: 'H2S46', value: 45 }, { stave: 'H2S47', value: 65 }, { stave: 'H2S48', value: 85 },
    { stave: 'H1S04', value: 40 }, { stave: 'H1S16', value: 56 }, { stave: 'H1S15', value: 60 }, { stave: 'H1S14', value: 54 },
    { stave: 'H1S13', value: 42 }, { stave: 'H1S12', value: 68 }, { stave: 'H1S11', value: 46 }, { stave: 'H1S10', value: 67 },
];

function UpdateStaveMaterials(HearthMesh) {
    HearthMeshData = HearthMesh;
    let allObjects = HearthMeshData.children;
    if (HearthMeshData) {
        for (let i = 0; i < datSet.length; i++) {
            for (let j = 1; j < allObjects.length; j++) {
                if (datSet[i]['stave'] === allObjects[j]['name']) {
                    if (datSet[i]['value'] <= 50) {
                        allObjects[j]['material'].color.setHex(0xff0000);
                    } else if (datSet[i]['value'] > 50 && datSet[i]['value'] <= 80) {
                        allObjects[j]['material'].color.setHex(0x00ff00);
                    } else if (datSet[i]['value'] > 80) {
                        allObjects[j]['material'].color.setHex(0x0000ff);
                    }
                }
            }
        }
    }
}

let canvas = document.querySelector('canvas.webgl');

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

let scene = new THREE.Scene();
scene.background = new THREE.Color('white');

let light1 = new THREE.DirectionalLight(0x404040, 1);
light1.position.set(0, 25, 25);
scene.add(light1);

let light2 = new THREE.DirectionalLight(

0x404040, 1);
light2.position.set(0, 25, -25);
scene.add(light2);

let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100000);
camera.position.z = 30;
scene.add(camera);

let controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const gltfLoader = new GLTFLoader().setPath('/models/');

async function loadedModel() {
    const gltf = await gltfLoader.loadAsync('BlastFurnaceR.gltf');
    gltf.scene.scale.set(1, 1, 1);
    UpdateStaveMaterials(gltf.scene);
    scene.add(gltf.scene);
}

loadedModel();

let renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 100;

let tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
