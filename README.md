# VR Galaxy 🌌

A WebXR experience providing an immersive visualization of a galaxy, built with the **Meta Horizon Immersive Web SDK (@iwsdk)** and **Three.js**.

## Features

-   **Immersive Galaxy Visualization**: Explore a procedurally generated galaxy environment in VR.
-   **Spatial Audio System**: Dynamic background music system that cycles through tracks with playlist logic.
-   **Interactive Detail Views**: Inspect celestial objects up close.
-   **Meta Quest 3 Optimizations**: Designed for the Meta Quest 3 with hand tracking support.

## Quick Start

### Prerequisites
-   Node.js (v20+ recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Start-Hack/webxr_galaxy.git
    cd webxr_galaxy
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Run the local development server:

```bash
npm run dev
```

Open the provided URL (usually `https://localhost:8081` or similar) in your browser. For VR testing on Quest 3, ensure you are using HTTPS (Vite handles this with `vite-plugin-mkcert`).

## Deployment

This project is configured for deployment to **GitHub Pages**.

### Deploying Updates

To build and deploy the latest version of the application:

```bash
npm run deploy
```

This command will:
1.  Run `npm run build` to compile the application into the `dist/` directory.
2.  Push the contents of `dist/` to the `gh-pages` branch on GitHub.

### Important: GitHub Pages Settings
Ensure your repository settings are correct:
1.  Go to **Settings** > **Pages** in your GitHub repository.
2.  Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3.  Set **Branch** to `gh-pages` / `(root)`.
4.  Click **Save**.

## Project Structure

-   `src/`: Source code modules.
    -   `src/scene/`: Galaxy mesh and environment components.
    -   `src/systems/`: ECS Systems (e.g., `MusicSystem.js`).
    -   `src/index.js`: Main entry point and World initialization.
-   `ui/`: User Interface configurations (`.uikitml`).
-   `public/`: Static assets (audio, models, textures).
-   `vite.config.js`: Vite configuration with IWSDK plugins.

## Tech Stack

-   [Meta Horizon Immersive Web SDK](https://developers.meta.com/horizon/documentation/web/sdk-overview)
-   [Three.js](https://threejs.org/)
-   [Vite](https://vitejs.dev/)
