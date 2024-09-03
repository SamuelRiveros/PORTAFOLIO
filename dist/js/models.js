// models.js

document.addEventListener('DOMContentLoaded', () => {
    // Verifica si GLTFLoader está disponible
    if (!THREE.GLTFLoader) {
        console.error('GLTFLoader no está disponible. Asegúrate de incluir el script de GLTFLoader.');
        return;
    }

    const canvasLeft = document.getElementById('eye-left');
    const canvasRight = document.getElementById('eye-right');
    canvasLeft.width = canvasRight.width = 100; // Ajusta al tamaño de tu ojo
    canvasLeft.height = canvasRight.height = 100; // Ajusta al tamaño de tu ojo

    const rendererLeft = new THREE.WebGLRenderer({ canvas: canvasLeft });
    const rendererRight = new THREE.WebGLRenderer({ canvas: canvasRight });
    rendererLeft.setSize(100, 100); // Ajusta al tamaño de tu ojo
    rendererRight.setSize(100, 100); // Ajusta al tamaño de tu ojo

    const sceneLeft = new THREE.Scene();
    const sceneRight = new THREE.Scene();

    const cameraLeft = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const cameraRight = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    cameraLeft.position.z = 5;
    cameraRight.position.z = 5;

    const loader = new THREE.GLTFLoader();

    loader.load('./assets/eye.glb', function (gltf) {
        const eyeMeshLeft = gltf.scene.clone();
        const eyeMeshRight = gltf.scene.clone();

        sceneLeft.add(eyeMeshLeft);
        sceneRight.add(eyeMeshRight);

        function updateEyes(event) {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            eyeMeshLeft.lookAt(mouseX * 10, mouseY * 10, 5); // Ajusta los valores si es necesario
            eyeMeshRight.lookAt(mouseX * 10, mouseY * 10, 5); // Ajusta los valores si es necesario

            rendererLeft.render(sceneLeft, cameraLeft);
            rendererRight.render(sceneRight, cameraRight);
        }

        document.addEventListener('mousemove', updateEyes);
        updateEyes({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }); // Inicializa la vista de los ojos en el centro
    });
});
