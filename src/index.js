import {
  AssetType,
  SessionMode,
  AssetManager,
  World,
  AudioSource,
  PlaybackMode,
  LocomotionEnvironment,
  EnvironmentType,
  Vector3
} from '@iwsdk/core';

import { GalaxySystem } from './scene/GalaxySystem.js';
import { MusicSystem } from './systems/MusicSystem.js';
import { createGalaxyMesh } from './scene/GalaxyFactory.js';
import { createDetailViewMesh } from './scene/DetailViewFactory.js';
import { Galaxy, DetailViewComponent } from './scene/components.js';

const assets = {
  backgroundSound1: {
    url: './background_sound/feel_galaxy_1.mp3',
    type: AssetType.Audio,
    priority: 'background'
  },
  backgroundSound2: {
    url: './background_sound/feel_galaxy_2.mp3',
    type: AssetType.Audio,
    priority: 'background'
  },
  backgroundSound3: {
    url: './background_sound/nebula_drift_1.mp3',
    type: AssetType.Audio,
    priority: 'background'
  },
  backgroundSound4: {
    url: './background_sound/nebula_drift_2.mp3',
    type: AssetType.Audio,
    priority: 'background'
  }
};

World.create(document.getElementById('scene-container'), {
  assets,
  xr: {
    sessionMode: SessionMode.ImmersiveVR,
    offer: 'always',
    features: { handTracking: true, layers: true }
  },
  features: { locomotion: true, grabbing: true, physics: false, sceneUnderstanding: false }
}).then((world) => {
  const { camera } = world;

  // Set initial position
  camera.position.set(0, 1.6, 5);

  // Register Systems
  world.registerSystem(GalaxySystem);
  world.registerSystem(MusicSystem);

  // Create Galaxy Entity
  const galaxyMesh = createGalaxyMesh();
  const galaxyEntity = world.createTransformEntity(galaxyMesh);
  galaxyEntity.addComponent(Galaxy);

  // Create Detail View Entity
  const detailMesh = createDetailViewMesh();
  const detailEntity = world.createTransformEntity(detailMesh);
  detailEntity.addComponent(DetailViewComponent);

  // Audio Entity (Managed by MusicSystem)
  // We create it with an initial dummy AudioSource so the System finds it,
  // or let the System create it?
  // The system query requires AudioSource. So we add it with the first track.
  const audioEntity = world.createTransformEntity();
  audioEntity.addComponent(AudioSource, {
    src: assets.backgroundSound1.url,
    loop: false,
    autoPlay: true,
    volume: 0.5
  });

  // Create a minimal floor/environment if needed, or just black space.
  // Galaxy app usually implies open space.
  // But Locomotion usually needs a floor or collider?
  // If we want "Fly" locomotion, we might not need a floor.
  // Standard Locomotion might be "Teleport" which needs a NavMesh or Collider.
  // If SDK default locomotion is teleport, we need a floor.
  // I'll add an invisible floor for teleportation if needed.
  // Or if "locomotion: true" provides stick movement (smooth).
  // I'll assume standard stick movement is available or teleport.
  // Let's add a large invisible floor plane just in case.
  // Actually, let's skip the floor for now to keep it purely space-like.
});
