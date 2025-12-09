import * as THREE from 'three';

export function createDetailViewMesh() {
    const group = new THREE.Group();

    // Black Hole Accretion Disk
    const geometry = new THREE.TorusGeometry(3, 1, 64, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        side: THREE.DoubleSide
    });

    const disk = new THREE.Mesh(geometry, material);
    disk.rotation.x = Math.PI / 2;
    disk.scale.set(0.1, 0.1, 0.1);
    disk.userData.bgType = 'disk'; // Tag for animation if needed
    group.add(disk);

    // Event Horizon (Sphere)
    const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(sphereGeo, sphereMat);
    blackHole.scale.set(0.1, 0.1, 0.1);
    group.add(blackHole);

    // Glow Sprite
    const spriteMaterial = new THREE.SpriteMaterial({
        map: createGlowTexture(),
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Sprite(spriteMaterial);
    glow.scale.set(8, 8, 1);
    glow.userData.bgType = 'glow';
    group.add(glow);

    group.visible = false; // Initially hidden
    return group;
}

function createGlowTexture() {
    // In SDK, creating canvas might be fine if DOM is available (WebXR)
    if (typeof document === 'undefined') return new THREE.Texture();

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 150, 50, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 100, 50, 0.5)');
    gradient.addColorStop(0.5, 'rgba(100, 0, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
}
