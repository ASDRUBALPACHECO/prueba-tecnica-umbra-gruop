import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import './ModelViewer3D.css';

interface ModelViewer3DProps {
  selectedResidenceCategory?: string;
  onSelectTypology?: (typologyId: string) => void;
}

export type Residence3DKey = 'overview' | 'garden' | 'ocean' | 'penthouse' | 'estate';
type RenderMode = 'studio' | 'blueprint';
type LightingMood = 'golden_hour' | 'twilight';

interface Residence3DInfo {
  id: Residence3DKey;
  label: string;
  name: string;
  badge: string;
  dimensions: string;
  price: string;
  features: string[];
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  typologyCategory: string;
}

export const RESIDENCES_3D: Record<Residence3DKey, Residence3DInfo> = {
  overview: {
    id: 'overview',
    label: 'Complejo General',
    name: 'Masterplan Complejo Ohana',
    badge: 'Vista de Conjunto',
    dimensions: '18 Residencias Exclusivas · 4.5 Hectáreas',
    price: 'Desde $1.85M hasta $5.20M USD',
    features: [
      'Masterplan completo escalonado de 6 niveles frente al mar',
      'Acceso privado directo a 280 metros lineales de playa virgen',
      'Club privado, solárium central y paisajismo biofílico perimetral'
    ],
    cameraPos: [16, 11, 17],
    targetPos: [0, 3.2, 0],
    typologyCategory: 'all',
  },
  garden: {
    id: 'garden',
    label: 'Garden Villa',
    name: 'Garden Villa Alborada',
    badge: 'Planta Baja Privada',
    dimensions: '350 m² Interiores · 120 m² Jardín',
    price: 'Desde $1.85M USD',
    features: [
      'Jardín botánico privado con palmeras autóctonas y solárium de teca',
      'Piscina plunge balinesa climatizada con cascada de recirculación',
      'Ventanales corredizos retráctiles y acceso directo a la arena'
    ],
    cameraPos: [9.0, 4.2, 9.2],
    targetPos: [0, 1.3, 0],
    typologyCategory: 'garden',
  },
  ocean: {
    id: 'ocean',
    label: 'Oceanfront Suite',
    name: 'Oceanfront Coral Residence',
    badge: 'Nivel 3 Panorámico',
    dimensions: '360 m² Cubiertos · 80 m² Terraza Volada',
    price: 'Desde $2.40M USD',
    features: [
      'Terraza perimetral voladiza continua de 28 metros lineales',
      'Jacuzzi termal exterior de piedra volcánica integrado en esquina',
      'Celosías móviles brise-soleil en champagne y vidrio ultraclaro'
    ],
    cameraPos: [9.8, 4.8, 9.8],
    targetPos: [0, 1.6, 0],
    typologyCategory: 'ocean',
  },
  penthouse: {
    id: 'penthouse',
    label: 'Sky Penthouse',
    name: 'Sky Penthouse Mirador',
    badge: 'Rooftop Dúplex Corona',
    dimensions: '480 m² Cubiertos · 200 m² Solárium',
    price: 'Desde $3.95M USD',
    features: [
      'Piscina infinity flotante en cubierta de 14 metros con borde de cristal',
      'Dúplex a doble altura (6.8 m) con pérgola bioclimática y comedor exterior',
      'Solárium panorámico 360° con vistas al océano y a la bahía'
    ],
    cameraPos: [9.2, 5.8, 9.6],
    targetPos: [0, 2.0, 0],
    typologyCategory: 'penthouse',
  },
  estate: {
    id: 'estate',
    label: 'Cliffside Estate',
    name: 'Cliffside Signature Estate',
    badge: 'Villa en Acantilado',
    dimensions: '540 m² Construidos · 280 m² Terraza Acantilado',
    price: 'Desde $5.20M USD',
    features: [
      'Villa independiente unifamiliar anclada sobre acantilado rocoso escarpado',
      'Piscina en voladizo estructural de 18 metros suspendida hacia el mar abierto',
      'Terraza zen privada con brasero central de bioetanol y lounge exterior'
    ],
    cameraPos: [11.0, 6.0, 11.2],
    targetPos: [0, 1.8, 0],
    typologyCategory: 'estate',
  },
};

// Generador de texturas procedimentales arquitectónicas en Canvas
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#7a5435';
  ctx.fillRect(0, 0, 512, 512);

  const plankW = 24;
  for (let x = 0; x < 512; x += plankW) {
    const b = (Math.random() - 0.5) * 18;
    ctx.fillStyle = `rgb(${122 + b}, ${84 + b * 0.8}, ${53 + b * 0.6})`;
    ctx.fillRect(x + 1, 0, plankW - 2, 512);

    ctx.fillStyle = 'rgba(50, 30, 15, 0.08)';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x + Math.random() * (plankW - 4) + 2, 0, 1.5, 512);
    }

    ctx.fillStyle = '#2d1a0d';
    ctx.fillRect(x, 0, 1.5, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#e5e1d8';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  ctx.strokeStyle = 'rgba(165, 160, 150, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  selectedResidenceCategory,
  onSelectTypology,
}) => {
  const { content } = useLanguage();
  const m3dText = content.model3d;

  const mountRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeResidence, setActiveResidence] = useState<Residence3DKey>('overview');
  const [renderMode, setRenderMode] = useState<RenderMode>('studio');
  const [lightingMood, setLightingMood] = useState<LightingMood>('golden_hour');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(!shouldReduceMotion);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // CRITICAL FIX FOR ROTATION PAUSE: Ref directly checked in requestAnimationFrame loop
  const isAutoRotatingRef = useRef<boolean>(!shouldReduceMotion);
  isAutoRotatingRef.current = isAutoRotating;

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  const lightsRef = useRef<{
    sun: THREE.DirectionalLight;
    ambient: THREE.AmbientLight;
    seaFill: THREE.DirectionalLight;
    pools: THREE.PointLight[];
    accent: THREE.PointLight;
  } | null>(null);

  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Camera interpolation targets
  const cameraTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(...RESIDENCES_3D.overview.cameraPos));
  const controlsLookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3(...RESIDENCES_3D.overview.targetPos));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(...RESIDENCES_3D.overview.targetPos));

  // User Orbit interaction state
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphericalCoords = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 24,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.1,
  });

  // Toggle Auto-Rotate with instant ref update
  const toggleAutoRotate = () => {
    const nextVal = !isAutoRotatingRef.current;
    isAutoRotatingRef.current = nextVal;
    setIsAutoRotating(nextVal);
  };

  // Sync external category changes (e.g. from Tipologias)
  useEffect(() => {
    if (selectedResidenceCategory && selectedResidenceCategory in RESIDENCES_3D) {
      handleSelectResidence(selectedResidenceCategory as Residence3DKey);
    }
  }, [selectedResidenceCategory]);

  // Master Three.js Lifecycle Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c141d);
    scene.fog = new THREE.FogExp2(0x0c141d, 0.022);

    // 2. Camera
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 140);
    camera.position.set(...RESIDENCES_3D.overview.cameraPos);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffeed6, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffdfa4, 2.9);
    sunLight.position.set(24, 26, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -18;
    sunLight.shadow.camera.right = 18;
    sunLight.shadow.camera.top = 18;
    sunLight.shadow.camera.bottom = -18;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const seaFillLight = new THREE.DirectionalLight(0x56a4c2, 1.25);
    seaFillLight.position.set(-18, 10, -15);
    scene.add(seaFillLight);

    const poolLight1 = new THREE.PointLight(0x18e0d0, 2.5, 9);
    poolLight1.position.set(3.4, 9.2, 1.8);
    scene.add(poolLight1);

    const poolLight2 = new THREE.PointLight(0x18e0d0, 2.0, 7);
    poolLight2.position.set(4.2, 1.2, 3.8);
    scene.add(poolLight2);

    const accentLight = new THREE.PointLight(0xffa844, 2.6, 12);
    accentLight.position.set(0, 4.8, 3.5);
    scene.add(accentLight);

    lightsRef.current = {
      sun: sunLight,
      ambient: ambientLight,
      seaFill: seaFillLight,
      pools: [poolLight1, poolLight2],
      accent: accentLight,
    };

    // 5. Materials Store
    const woodTexture = createWoodTexture();
    const concreteTexture = createConcreteTexture();

    const mats: { [key: string]: THREE.Material } = {
      concrete: new THREE.MeshStandardMaterial({ map: concreteTexture, roughness: 0.65, metalness: 0.05 }),
      limestone: new THREE.MeshStandardMaterial({ color: 0xdfd8cb, roughness: 0.78, metalness: 0.02 }),
      woodDeck: new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.45, metalness: 0.1 }),
      champagneMetal: new THREE.MeshStandardMaterial({ color: 0xc4b189, roughness: 0.22, metalness: 0.88 }),
      darkAluminum: new THREE.MeshStandardMaterial({ color: 0x1e242b, roughness: 0.35, metalness: 0.7 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x4d8ba6,
        transparent: true,
        opacity: 0.48,
        roughness: 0.06,
        metalness: 0.15,
        transmission: 0.75,
        ior: 1.52,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x0fa8b8,
        roughness: 0.1,
        metalness: 0.65,
        transparent: true,
        opacity: 0.85,
      }),
      sand: new THREE.MeshStandardMaterial({ color: 0x1b2734, roughness: 0.95, metalness: 0.0 }),
      wetSand: new THREE.MeshStandardMaterial({ color: 0x111c26, roughness: 0.35, metalness: 0.1 }),
      warmInteriorGlow: new THREE.MeshBasicMaterial({ color: 0xffd39b }),
      fireGlow: new THREE.MeshBasicMaterial({ color: 0xff7722 }),
      cushionFabric: new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.85, metalness: 0.0 }),
      foliage: new THREE.MeshStandardMaterial({ color: 0x224933, roughness: 0.7, flatShading: true }),
      rockBasalt: new THREE.MeshStandardMaterial({ color: 0x242a30, roughness: 0.95, metalness: 0.05 }),
      wireframe: new THREE.MeshBasicMaterial({ color: 0x4fb3d4, wireframe: true }),
    };
    materialsRef.current = mats;

    // 6. Root Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Ambient Floating Sea Breeze Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = Math.random() * 18 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 36;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffe2b8,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Build initial overview complex
    buildResidenceModel('overview', modelGroup, mats, waterMeshRef);

    // Initial Spherical Coordinates
    const initialPos = new THREE.Vector3(...RESIDENCES_3D.overview.cameraPos);
    sphericalCoords.current.radius = initialPos.length();
    sphericalCoords.current.theta = Math.atan2(initialPos.x, initialPos.z);
    sphericalCoords.current.phi = Math.acos(Math.max(-1, Math.min(1, initialPos.y / sphericalCoords.current.radius)));

    setIsLoading(false);

    // 7. Orbit Interaction Handlers
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;

      sphericalCoords.current.theta -= deltaX * 0.007;
      sphericalCoords.current.phi = Math.max(
        0.18,
        Math.min(Math.PI / 2.08, sphericalCoords.current.phi - deltaY * 0.007)
      );

      previousMousePosition.current = { x: clientX, y: clientY };

      const r = sphericalCoords.current.radius;
      const th = sphericalCoords.current.theta;
      const ph = sphericalCoords.current.phi;

      cameraTargetPos.current.set(
        r * Math.sin(ph) * Math.sin(th) + controlsLookAtTarget.current.x,
        r * Math.cos(ph) + controlsLookAtTarget.current.y,
        r * Math.sin(ph) * Math.cos(th) + controlsLookAtTarget.current.z
      );
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.02;
      sphericalCoords.current.radius = Math.max(7.5, Math.min(32, sphericalCoords.current.radius + zoomDelta));

      const r = sphericalCoords.current.radius;
      const th = sphericalCoords.current.theta;
      const ph = sphericalCoords.current.phi;

      cameraTargetPos.current.set(
        r * Math.sin(ph) * Math.sin(th) + controlsLookAtTarget.current.x,
        r * Math.cos(ph) + controlsLookAtTarget.current.y,
        r * Math.sin(ph) * Math.cos(th) + controlsLookAtTarget.current.z
      );
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop with STRICT Ref check for Auto-Rotate
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ondulación marina sutil
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = 0.06 + Math.sin(elapsedTime * 1.4) * 0.035;
      }

      // Deriva suave de partículas
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.008;
          if (positions[i] > 20) positions[i] = 0.5;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // CRITICAL FIX: Only increment angle if isAutoRotatingRef.current is TRUE and user is not dragging!
      if (isAutoRotatingRef.current && !isDragging.current) {
        sphericalCoords.current.theta += 0.0028;
        const r = sphericalCoords.current.radius;
        const th = sphericalCoords.current.theta;
        const ph = sphericalCoords.current.phi;

        cameraTargetPos.current.set(
          r * Math.sin(ph) * Math.sin(th) + controlsLookAtTarget.current.x,
          r * Math.cos(ph) + controlsLookAtTarget.current.y,
          r * Math.sin(ph) * Math.cos(th) + controlsLookAtTarget.current.z
        );
      }

      // Smooth camera glide
      camera.position.lerp(cameraTargetPos.current, 0.065);
      currentLookAt.current.lerp(controlsLookAtTarget.current, 0.07);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Handle switching between distinct residence models
  const handleSelectResidence = (key: Residence3DKey) => {
    setActiveResidence(key);
    // Pause auto-rotation on deliberate interaction
    isAutoRotatingRef.current = false;
    setIsAutoRotating(false);

    const group = modelGroupRef.current;
    const mats = materialsRef.current;
    if (group && mats) {
      // Clear previous residence meshes
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
      }
      // Rebuild the specific 3D model
      buildResidenceModel(key, group, mats, waterMeshRef);
      // Reapply render mode
      applyRenderMode(renderMode, group, mats);
    }

    // Set camera target coordinates
    const info = RESIDENCES_3D[key];
    cameraTargetPos.current.set(...info.cameraPos);
    controlsLookAtTarget.current.set(...info.targetPos);

    const dx = info.cameraPos[0] - info.targetPos[0];
    const dy = info.cameraPos[1] - info.targetPos[1];
    const dz = info.cameraPos[2] - info.targetPos[2];
    const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
    sphericalCoords.current.radius = r;
    sphericalCoords.current.theta = Math.atan2(dx, dz);
    sphericalCoords.current.phi = Math.acos(Math.max(-1, Math.min(1, dy / r)));
  };

  // Render Mode Toggle (Studio vs Blueprint)
  useEffect(() => {
    const group = modelGroupRef.current;
    const mats = materialsRef.current;
    const scene = sceneRef.current;
    if (!group || !mats || !scene) return;

    applyRenderMode(renderMode, group, mats);

    if (renderMode === 'blueprint') {
      scene.background = new THREE.Color(0x06111a);
      if (scene.fog) scene.fog.color = new THREE.Color(0x06111a);
    } else {
      scene.background = new THREE.Color(lightingMood === 'golden_hour' ? 0x0c141d : 0x070c12);
      if (scene.fog) scene.fog.color = new THREE.Color(lightingMood === 'golden_hour' ? 0x0c141d : 0x070c12);
    }
  }, [renderMode, lightingMood]);

  // Lighting Mood Toggle
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights) return;

    if (lightingMood === 'golden_hour') {
      lights.sun.intensity = 2.9;
      lights.sun.color.setHex(0xffdfa4);
      lights.ambient.intensity = 0.95;
      lights.ambient.color.setHex(0xffeed6);
      lights.pools.forEach((p) => (p.intensity = 2.2));
      lights.accent.intensity = 2.6;
    } else {
      lights.sun.intensity = 0.75;
      lights.sun.color.setHex(0xff7744);
      lights.ambient.intensity = 0.45;
      lights.ambient.color.setHex(0x3a4b64);
      lights.pools.forEach((p) => (p.intensity = 4.8));
      lights.accent.intensity = 4.5;
    }
  }, [lightingMood]);

  const staticInfo = RESIDENCES_3D[activeResidence];
  const localizedResidence = m3dText?.residences?.[activeResidence];
  const currentInfo = {
    ...staticInfo,
    label: localizedResidence?.label || staticInfo.label,
    name: localizedResidence?.name || staticInfo.name,
    badge: localizedResidence?.badge || staticInfo.badge,
    dimensions: localizedResidence?.dimensions || staticInfo.dimensions,
    price: localizedResidence?.price || staticInfo.price,
    features: localizedResidence?.features || staticInfo.features,
  };

  return (
    <section id="maqueta-3d" className="model-viewer-section">
      <div className="model-viewer-container">
        {/* Encabezado dinámico traducido */}
        <div className="model-viewer-header">
          <h2 className="model-viewer-title">{m3dText.title}</h2>
          <p className="model-viewer-description">
            {m3dText.description}
          </p>
        </div>

        {/* Lienzo WebGL 3D */}
        <div className="model-viewer-canvas-wrapper">
          <div ref={mountRef} className="model-viewer-canvas" />

          {/* Spinner de Carga */}
          {isLoading && (
            <div className="model-viewer-loading">
              <div className="model-viewer-spinner" />
              <span>{m3dText.loading}</span>
            </div>
          )}

          {/* Barra Superior de Herramientas HUD */}
          <div className="model-viewer-hud-top">
            <div className="model-viewer-badge">
              <span className="model-viewer-pulse-dot" />
              <span>{m3dText.badge}</span>
            </div>

            <div className="model-viewer-actions">
              {/* Selector de Iluminación: CONSERVADO EN MODELADO 3D SEGÚN INDICACIÓN */}
              <button
                type="button"
                onClick={() => setLightingMood(lightingMood === 'golden_hour' ? 'twilight' : 'golden_hour')}
                className={`hud-button ${lightingMood === 'twilight' ? 'hud-button-active' : ''}`}
                title={lightingMood === 'golden_hour' ? m3dText.lightingGolden : m3dText.lightingTwilight}
                aria-label="Alternar modo de iluminación"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {lightingMood === 'golden_hour' ? 'wb_sunny' : 'nightlight'}
                </span>
                <span>{lightingMood === 'golden_hour' ? m3dText.lightingGolden : m3dText.lightingTwilight}</span>
              </button>

              {/* Botón Auto-rotación con pausa funcional */}
              <button
                type="button"
                onClick={toggleAutoRotate}
                className={`hud-button ${isAutoRotating ? 'hud-button-active' : ''}`}
                title={isAutoRotating ? m3dText.pauseRotate : m3dText.autoRotate}
                aria-label="Alternar rotación automática"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isAutoRotating ? 'pause' : '360'}
                </span>
                <span>{isAutoRotating ? m3dText.pauseRotate : m3dText.autoRotate}</span>
              </button>

              {/* Selector de Modo: Estudio vs Blueprint CAD */}
              <div className="hud-mode-toggle">
                <button
                  type="button"
                  onClick={() => setRenderMode('studio')}
                  className={`hud-toggle-opt ${renderMode === 'studio' ? 'hud-toggle-opt-active' : ''}`}
                >
                  {m3dText.modeStudio}
                </button>
                <button
                  type="button"
                  onClick={() => setRenderMode('blueprint')}
                  className={`hud-toggle-opt ${renderMode === 'blueprint' ? 'hud-toggle-opt-active' : ''}`}
                >
                  {m3dText.modeBlueprint}
                </button>
              </div>

              {/* Reset Cam */}
              <button
                type="button"
                onClick={() => handleSelectResidence(activeResidence)}
                className="hud-button"
                title={m3dText.resetView}
                aria-label="Restablecer cámara"
              >
                <span className="material-symbols-outlined text-[16px]">center_focus_strong</span>
              </button>
            </div>
          </div>

          {/* Selector de Cada Residencia en la base */}
          <div className="model-viewer-levels-nav">
            {(Object.keys(RESIDENCES_3D) as Residence3DKey[]).map((key) => {
              const res = RESIDENCES_3D[key];
              const localizedLabel = m3dText?.residences?.[key]?.label || res.label;
              const isSelected = activeResidence === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectResidence(key)}
                  className={`level-nav-pill ${isSelected ? 'level-nav-pill-active' : ''}`}
                >
                  <span className="level-nav-indicator" />
                  <span>{localizedLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Tarjeta de Información Arquitectónica Flotante */}
          <motion.div
            key={activeResidence}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="model-viewer-info-card"
          >
            <div className="info-card-header">
              <span className="info-card-elevation">{currentInfo.badge}</span>
              <h3 className="info-card-title">{currentInfo.name}</h3>
              <span className="info-card-dimensions">{currentInfo.dimensions}</span>
            </div>

            <ul className="info-card-features">
              {currentInfo.features.map((feat, i) => (
                <li key={i} className="info-card-feature-item">
                  <span className="info-card-bullet" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="info-card-footer-row">
              <span className="info-card-price">{currentInfo.price}</span>
              {currentInfo.typologyCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => {
                    const targetElem = document.getElementById('tipologias');
                    if (targetElem) {
                      targetElem.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (onSelectTypology) {
                      onSelectTypology(currentInfo.typologyCategory);
                    }
                  }}
                  className="info-card-cta"
                >
                  <span>{m3dText.viewCatalogBtn}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Leyenda de interacción táctil */}
          <div className="model-viewer-gesture-tip">
            <span className="material-symbols-outlined text-[14px]">touch_app</span>
            <span>{m3dText.gestureTip}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   CONSTRUCTORES DE MODELADO 3D INDIVIDUAL PARA CADA RESIDENCIA
   ========================================================================= */

function applyRenderMode(mode: RenderMode, group: THREE.Group, mats: { [key: string]: THREE.Material }) {
  const wireframeMat = mats.wireframe;
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh && !(obj.geometry instanceof THREE.PlaneGeometry && obj.material === mats.water)) {
      if (mode === 'blueprint') {
        if (!obj.userData.originalMaterial) {
          obj.userData.originalMaterial = obj.material;
        }
        obj.material = wireframeMat;
      } else {
        if (obj.userData.originalMaterial) {
          obj.material = obj.userData.originalMaterial;
        }
      }
    }
  });
}

function buildResidenceModel(
  key: Residence3DKey,
  group: THREE.Group,
  mats: { [key: string]: THREE.Material },
  waterRef: React.MutableRefObject<THREE.Mesh | null>
) {
  const add = (mesh: THREE.Mesh, cast = true, receive = true) => {
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    group.add(mesh);
    return mesh;
  };

  const createWindow = (x: number, y: number, z: number, w: number, h: number, segs = 3) => {
    const ft = 0.08;
    const fd = 0.12;

    const topF = new THREE.Mesh(new THREE.BoxGeometry(w, ft, fd), mats.darkAluminum);
    topF.position.set(x, y + h / 2 - ft / 2, z);
    add(topF);

    const btmF = new THREE.Mesh(new THREE.BoxGeometry(w, ft, fd), mats.darkAluminum);
    btmF.position.set(x, y - h / 2 + ft / 2, z);
    add(btmF);

    const segW = w / segs;
    for (let i = 0; i <= segs; i++) {
      const mul = new THREE.Mesh(new THREE.BoxGeometry(ft, h, fd), mats.darkAluminum);
      mul.position.set(x - w / 2 + i * segW, y, z);
      add(mul);
    }

    const glass = new THREE.Mesh(new THREE.BoxGeometry(w - 0.05, h - 0.05, 0.02), mats.glass);
    glass.position.set(x, y, z);
    add(glass, false, false);
  };

  const createRailing = (x: number, y: number, z: number, w: number) => {
    const railGlass = new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, 0.04), mats.glass);
    railGlass.position.set(x, y + 0.4, z);
    add(railGlass, false, false);

    const handrail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, 0.08), mats.champagneMetal);
    handrail.position.set(x, y + 0.82, z);
    add(handrail);
  };

  const createLounger = (x: number, y: number, z: number, rotY = 0) => {
    const subGroup = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 0.7), mats.woodDeck);
    base.position.y = 0.08;
    base.castShadow = true;
    subGroup.add(base);

    const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.08, 0.66), mats.cushionFabric);
    cushion.position.y = 0.18;
    cushion.castShadow = true;
    subGroup.add(cushion);

    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.58), mats.cushionFabric);
    pillow.position.set(0.65, 0.23, 0);
    pillow.rotation.z = -0.15;
    subGroup.add(pillow);

    subGroup.position.set(x, y, z);
    subGroup.rotation.y = rotY;
    group.add(subGroup);
  };

  const createPalm = (x: number, z: number, hScale = 1.0, tiltZ = 0.1) => {
    const palm = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.2 * tiltZ, 1.5 * hScale, 0),
      new THREE.Vector3(0.7 * tiltZ, 3.2 * hScale, 0.1),
      new THREE.Vector3(1.1 * tiltZ, 4.8 * hScale, 0.2),
    ]);
    const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 14, 0.16, 8, false), mats.sand);
    trunk.castShadow = true;
    palm.add(trunk);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const leafCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.1 * tiltZ, 4.8 * hScale, 0.2),
        new THREE.Vector3(1.1 * tiltZ + Math.cos(angle) * 1.2, 4.8 * hScale + 0.4, 0.2 + Math.sin(angle) * 1.2),
        new THREE.Vector3(1.1 * tiltZ + Math.cos(angle) * 2.1, 4.8 * hScale - 0.5, 0.2 + Math.sin(angle) * 2.1),
      ]);
      const leaf = new THREE.Mesh(new THREE.TubeGeometry(leafCurve, 8, 0.07, 4, false), mats.foliage);
      leaf.castShadow = true;
      palm.add(leaf);
    }
    palm.position.set(x, 0.3, z);
    group.add(palm);
  };

  // Base común de Océano y Arena
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(42, 22, 32, 32), mats.water);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, 0.06, 13.5);
  ocean.receiveShadow = true;
  group.add(ocean);
  waterRef.current = ocean;

  const ground = new THREE.Mesh(new THREE.CylinderGeometry(18, 20, 1.2, 40), mats.sand);
  ground.position.y = -0.6;
  ground.receiveShadow = true;
  group.add(ground);

  /* -------------------------------------------------------------
     CASO 1: OVERVIEW (COMPLEJO COMPLETO)
     ------------------------------------------------------------- */
  if (key === 'overview') {
    const plinth = add(new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.85, 14.5), mats.limestone));
    plinth.position.set(0, 0.42, 0);

    // L1 Deck & Core
    const l1Deck = add(new THREE.Mesh(new THREE.BoxGeometry(15, 0.38, 12.5), mats.woodDeck));
    l1Deck.position.set(0, 0.95, 0.6);
    const l1Core = add(new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.45, 7.6), mats.concrete));
    l1Core.position.set(-0.6, 2.2, -0.6);
    createWindow(-0.6, 2.2, 3.22, 9.2, 2.3, 4);

    // L1 Plunge pool
    add(new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.55, 2.8), mats.limestone)).position.set(4.4, 1.1, 4.0);
    add(new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.48, 2.3), mats.water)).position.set(4.4, 1.15, 4.0);
    createLounger(1.5, 1.15, 4.2, 0.1);

    // L2 & L3 Suites
    add(new THREE.Mesh(new THREE.BoxGeometry(15.6, 0.48, 11.2), mats.concrete)).position.set(0.6, 3.55, 0.6);
    add(new THREE.Mesh(new THREE.BoxGeometry(10.4, 2.45, 7.2), mats.concrete)).position.set(0.8, 4.85, -0.6);
    createWindow(0.8, 4.85, 2.95, 9.8, 2.3, 4);
    createRailing(0.6, 3.8, 6.0, 15.2);

    add(new THREE.Mesh(new THREE.BoxGeometry(15.0, 0.48, 10.8), mats.concrete)).position.set(0.3, 6.25, 0.3);
    add(new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.4, 6.8), mats.concrete)).position.set(0.5, 7.55, -0.8);
    createWindow(0.5, 7.55, 2.55, 9.2, 2.25, 4);
    createRailing(0.3, 6.5, 5.55, 14.6);

    for (let bx = -3.2; bx <= 3.2; bx += 1.1) {
      add(new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.4, 0.7), mats.champagneMetal)).position.set(bx + 0.5, 7.55, 2.92);
    }

    // Penthouse Rooftop Corona
    add(new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.52, 10.0), mats.concrete)).position.set(-0.3, 8.9, -0.2);
    add(new THREE.Mesh(new THREE.BoxGeometry(8.0, 2.55, 5.8), mats.concrete)).position.set(-1.1, 10.25, -1.2);
    createWindow(-1.1, 10.25, 1.65, 7.6, 2.3, 3);
    createRailing(-1.8, 9.15, 3.8, 8.0);

    add(new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.22, 6.4), mats.champagneMetal)).position.set(-1.1, 11.65, -1.0);
    add(new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.85, 3.4), mats.limestone)).position.set(3.5, 9.2, 1.9);
    add(new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.75, 2.9), mats.water)).position.set(3.5, 9.3, 1.9);
    add(new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.72, 0.08), mats.glass)).position.set(3.5, 9.3, 3.56);
    createLounger(3.4, 9.7, -1.5, Math.PI / 2);

    createPalm(-7.8, 3.8, 1.05, 0.15);
    createPalm(-8.8, 1.8, 0.9, -0.12);
    createPalm(7.8, -3.5, 1.1, -0.15);
  }

  /* -------------------------------------------------------------
     CASO 2: GARDEN VILLA ALBORADA (MODELADO INDIVIDUAL DETALLADO)
     ------------------------------------------------------------- */
  else if (key === 'garden') {
    // Podio amplio de jardín botánico
    const gardenPodium = add(new THREE.Mesh(new THREE.BoxGeometry(17, 0.6, 15), mats.limestone));
    gardenPodium.position.set(0, 0.3, 0);

    // Deck de teca extendido
    const deck = add(new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.3, 13.5), mats.woodDeck));
    deck.position.set(0, 0.75, 0.5);

    // Villa baja de techos altos (3.40 m)
    const pavilion = add(new THREE.Mesh(new THREE.BoxGeometry(11, 3.4, 8), mats.concrete));
    pavilion.position.set(-1, 2.45, -1.5);

    // Techo voladizo con alero de madera
    const roofOverhang = add(new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 11), mats.concrete));
    roofOverhang.position.set(-0.5, 4.25, -0.5);

    // Gran ventanal de fachada corrida
    createWindow(-0.8, 2.4, 2.52, 10.5, 3.0, 4);

    // Luz interior cálida de la suite
    const interiorSuite = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 0.1), mats.warmInteriorGlow);
    interiorSuite.position.set(-1, 2.4, 1.0);
    group.add(interiorSuite);

    // Piscina plunge balinesa con pared de cascada
    const plungeBox = add(new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.8, 3.6), mats.limestone));
    plungeBox.position.set(4.5, 1.0, 3.2);

    const plungeW = add(new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 3.0), mats.water));
    plungeW.position.set(4.5, 1.1, 3.2);

    // Muro de cascada en piedra natural
    const cascadeWall = add(new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.6, 0.4), mats.limestone));
    cascadeWall.position.set(4.5, 1.7, 1.5);

    // Pasarela de madera conectando al jardín
    createLounger(1.2, 0.9, 4.0, 0.1);
    createLounger(-1.2, 0.9, 4.0, -0.08);

    // Palmeras envolventes del jardín botánico privado
    createPalm(-6.5, 3.5, 1.15, 0.2);
    createPalm(-7.5, -2.0, 1.0, -0.15);
    createPalm(6.5, -3.5, 1.1, 0.12);
  }

  /* -------------------------------------------------------------
     CASO 3: OCEANFRONT CORAL RESIDENCE (MODELADO INDIVIDUAL DETALLADO)
     ------------------------------------------------------------- */
  else if (key === 'ocean') {
    // Estructura de soporte voladizo inferior
    const cantileverSupport = add(new THREE.Mesh(new THREE.BoxGeometry(10, 1.8, 7), mats.limestone));
    cantileverSupport.position.set(0, 0.9, -1.0);

    // Losa volada masiva sobre el mar
    const oceanSlab = add(new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.55, 11), mats.concrete));
    oceanSlab.position.set(0, 2.0, 1.0);

    // Núcleo habitable
    const oceanCore = add(new THREE.Mesh(new THREE.BoxGeometry(11.5, 3.0, 7), mats.concrete));
    oceanCore.position.set(0, 3.65, -0.8);

    // Losa de techo con lamas de celosía
    const ceilingSlab = add(new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.45, 11), mats.concrete));
    ceilingSlab.position.set(0, 5.3, 1.0);

    // Fachada corrida de cristal con barandillas
    createWindow(0, 3.65, 2.7, 11.2, 2.8, 4);
    createRailing(0, 2.3, 6.3, 16.2);

    // Jacuzzi termal de piedra volcánica en la esquina volada
    const jacuzzi = add(new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.5, 0.9, 20), mats.rockBasalt));
    jacuzzi.position.set(5.5, 2.6, 4.2);

    const jacuzziWater = add(new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.3, 0.85, 20), mats.water));
    jacuzziWater.position.set(5.5, 2.7, 4.2);

    // Celosías Brise-Soleil en champagne
    for (let x = -4.5; x <= -1.0; x += 0.9) {
      const louv = add(new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.0, 0.8), mats.champagneMetal));
      louv.position.set(x, 3.65, 2.9);
    }

    // Salón lounge exterior en terraza
    createLounger(1.5, 2.3, 4.5, 0.05);
    createLounger(-1.5, 2.3, 4.5, -0.05);
  }

  /* -------------------------------------------------------------
     CASO 4: SKY PENTHOUSE MIRADOR (MODELADO INDIVIDUAL DETALLADO)
     ------------------------------------------------------------- */
  else if (key === 'penthouse') {
    // Nivel 1 Dúplex
    const lowerSlab = add(new THREE.Mesh(new THREE.BoxGeometry(15, 0.5, 10.5), mats.concrete));
    lowerSlab.position.set(0, 1.2, 0);

    const lowerLiving = add(new THREE.Mesh(new THREE.BoxGeometry(9.5, 3.2, 6.5), mats.concrete));
    lowerLiving.position.set(-1.0, 2.9, -1.0);

    createWindow(-1.0, 2.9, 2.26, 9.0, 3.0, 3);
    createRailing(-1.0, 1.45, 5.0, 14.5);

    // Nivel 2 Dúplex / Rooftop
    const upperSlab = add(new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 10), mats.concrete));
    upperSlab.position.set(0, 4.65, 0);

    const upperSuite = add(new THREE.Mesh(new THREE.BoxGeometry(7, 2.6, 5), mats.concrete));
    upperSuite.position.set(-2.0, 6.1, -1.5);
    createWindow(-2.0, 6.1, 1.02, 6.6, 2.4, 2);

    // Pérgola bioclimática superior
    const pergola = add(new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.2, 5.5), mats.champagneMetal));
    pergola.position.set(-2.0, 7.5, -1.2);

    for (const [px, pz] of [[-5.5, 1.4], [1.5, 1.4], [-5.5, -3.8], [1.5, -3.8]]) {
      add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.6, 8), mats.champagneMetal)).position.set(px, 6.1, pz);
    }

    // Piscina Infinity Volada en Azotea (14m de voladizo)
    const infPoolBox = add(new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.9, 3.8), mats.limestone));
    infPoolBox.position.set(4.0, 4.9, 2.2);

    const infPoolW = add(new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.8, 3.2), mats.water));
    infPoolW.position.set(4.0, 5.0, 2.2);

    // Borde de cristal frontal
    const glassEdge = add(new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.78, 0.08), mats.glass));
    glassEdge.position.set(4.0, 5.0, 4.12);

    createLounger(3.8, 5.2, -1.8, Math.PI / 2);
  }

  /* -------------------------------------------------------------
     CASO 5: CLIFFSIDE SIGNATURE ESTATE (MODELADO INDIVIDUAL DETALLADO)
     ------------------------------------------------------------- */
  else if (key === 'estate') {
    // Acantilado de roca basáltica escarpada
    const rockBase1 = add(new THREE.Mesh(new THREE.DodecahedronGeometry(4.5, 1), mats.rockBasalt));
    rockBase1.position.set(-2.5, 1.0, -1.5);
    rockBase1.scale.set(1.6, 0.9, 1.4);

    const rockBase2 = add(new THREE.Mesh(new THREE.DodecahedronGeometry(4.0, 1), mats.rockBasalt));
    rockBase2.position.set(3.5, 0.8, 0.5);
    rockBase2.scale.set(1.4, 0.8, 1.3);

    // Villa unifamiliar asimétrica contemporánea
    const estateMainSlab = add(new THREE.Mesh(new THREE.BoxGeometry(15, 0.55, 9.5), mats.concrete));
    estateMainSlab.position.set(-0.5, 2.8, 0);

    const estateCore = add(new THREE.Mesh(new THREE.BoxGeometry(8.5, 3.2, 6.2), mats.concrete));
    estateCore.position.set(-2.5, 4.5, -0.8);

    createWindow(-2.5, 4.5, 2.32, 8.0, 3.0, 3);
    createRailing(-2.5, 3.1, 4.5, 10.0);

    // Techo volado asimétrico
    const estateRoof = add(new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 8), mats.concrete));
    estateRoof.position.set(-1.0, 6.2, 0);

    // Piscina en voladizo estructural de 18 metros sobre el vacío
    const cantileverPoolBox = add(new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.1, 3.4), mats.limestone));
    cantileverPoolBox.position.set(4.5, 2.7, 1.5);

    const cantileverPoolW = add(new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.95, 2.8), mats.water));
    cantileverPoolW.position.set(4.5, 2.8, 1.5);

    // Cristal transparente en el extremo del acantilado
    const poolTipGlass = add(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 2.8), mats.glass));
    poolTipGlass.position.set(7.76, 2.8, 1.5);

    // Brasero de bioetanol en la terraza
    const fireBowl = add(new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.5, 0.4, 16), mats.darkAluminum));
    fireBowl.position.set(-4.5, 3.25, 2.5);

    const fireGlow = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), mats.fireGlow);
    fireGlow.position.set(-4.5, 3.45, 2.5);
    group.add(fireGlow);

    createLounger(1.5, 3.1, 2.2, 0.15);
  }
}
