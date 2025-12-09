import { createSystem } from '@iwsdk/core';
import { Galaxy, DetailViewComponent } from './components.js';

export class GalaxySystem extends createSystem({
    galaxy: { required: [Galaxy] },
    detailView: { required: [DetailViewComponent] }
}) {
    init() {
        this.startTime = Date.now();
    }

    update() {
        const time = (Date.now() - this.startTime) / 1000;

        // Update Galaxy
        this.queries.galaxy.entities.forEach((entity) => {
            const mesh = entity.object3D;
            if (mesh.material && mesh.material.uniforms) {
                mesh.material.uniforms.uTime.value = time;
            }
        });

        // Handle Transition Logic
        let dist = 100;
        if (this.player && this.player.head) {
            dist = this.player.head.position.length();
        }

        // Update Detail View
        this.queries.detailView.entities.forEach((entity) => {
            const group = entity.object3D;

            // Transition Logic
            if (dist < 2.0) {
                group.visible = true;

                // Animation
                group.traverse(child => {
                    if (child.userData.bgType === 'disk') {
                        child.rotation.z = time * 0.5;
                    }
                    if (child.userData.bgType === 'glow') {
                        const scale = 1 + Math.sin(time * 2.0) * 0.05;
                        child.scale.set(8 * scale, 8 * scale, 1);
                    }
                });

            } else {
                group.visible = false;
            }
        });
    }
}
