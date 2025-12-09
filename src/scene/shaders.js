export const galaxyVertexShader = `
uniform float uTime;
uniform float uSize;
attribute float flow;
attribute vec3 customColor;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vColor = customColor;
    vec3 pos = position;

    // Rotate the galaxy over time
    float angle = uTime * 0.1 * (1.0 - length(pos) * 0.1);
    float s = sin(angle);
    float c = cos(angle);
    
    // Simple rotation around Y axis
    // vec3 rotatedPos = vec3(
    //     pos.x * c - pos.z * s,
    //     pos.y,
    //     pos.x * s + pos.z * c
    // );

    // Add some organic flow/wave movement
    pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.1 * flow;
    pos.x += cos(pos.y * 2.0 + uTime * 0.5) * 0.1 * flow;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = uSize * (10.0 / -mvPosition.z);
    
    // Fade out based on distance or other factors if needed
    vAlpha = 1.0; 
}
`;

export const galaxyFragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    // Soft circle particle
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    vec3 color = vColor * strength;
    
    if (strength < 0.01) discard;

    gl_FragColor = vec4(color, vAlpha * strength); // Additive blending usually looks best
}
`;
