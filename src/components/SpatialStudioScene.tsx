import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SpatialStudioScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Detect software WebGL per Three.js skill guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    // 3-Point Studio Lighting Rig (Warm Key, Cool Fill, Electric Blue Rim)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xb8c9ff, 0x050508, 0.85);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xb8c9ff, 2.4, 28);
    rimLight.position.set(-7, -3, 4);
    scene.add(rimLight);

    // Composite Multi-Part Architectural Studio Rig (THREE.Group on left flank so right side stays clear for Portrait)
    const studioGroup = new THREE.Group();
    studioGroup.position.set(-4.6, 0.2, -2.5);
    scene.add(studioGroup);

    const wireframeMat = new THREE.MeshStandardMaterial({
      color: 0xb8c9ff,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });

    const solidMetallicMat = new THREE.MeshStandardMaterial({
      color: 0x161822,
      metalness: 0.9,
      roughness: 0.45,
      transparent: true,
      opacity: 0.4,
    });

    const accentRingMat = new THREE.MeshStandardMaterial({
      color: 0xb8c9ff,
      metalness: 0.7,
      roughness: 0.25,
      transparent: true,
      opacity: 0.28,
    });

    // Part 1: Outer Architectural Gimbal Ring
    const outerRingGeo = new THREE.TorusGeometry(3.4, 0.018, 16, 96);
    const outerRing = new THREE.Mesh(outerRingGeo, accentRingMat);
    outerRing.rotation.x = Math.PI * 0.28;
    studioGroup.add(outerRing);

    // Part 2: Secondary Orthogonal Meridian Ring
    const innerRingGeo = new THREE.TorusGeometry(2.55, 0.014, 16, 80);
    const innerRing = new THREE.Mesh(innerRingGeo, wireframeMat);
    innerRing.rotation.y = Math.PI * 0.35;
    studioGroup.add(innerRing);

    // Part 3: Faceted Geodesic Core Frame
    const coreGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const coreMesh = new THREE.Mesh(coreGeo, wireframeMat);
    studioGroup.add(coreMesh);

    // Part 4: Inner Solid Dark Sculpture Core
    const innerSolidGeo = new THREE.OctahedronGeometry(0.95, 0);
    const innerSolidMesh = new THREE.Mesh(innerSolidGeo, solidMetallicMat);
    studioGroup.add(innerSolidMesh);

    // Part 5: Subtle Spatial Grid Lattice Nodes (InstancedMesh > 20 nodes)
    const nodeGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xb8c9ff,
      transparent: true,
      opacity: 0.25,
    });
    const nodeCount = 36;
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const dummyMatrix = new THREE.Matrix4();
    const dummyPos = new THREE.Vector3();

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 4.2 + (i % 3) * 0.9;
      dummyPos.set(
        Math.cos(angle) * radius,
        ((i % 5) - 2) * 1.4,
        Math.sin(angle) * radius - 2
      );
      dummyMatrix.makeTranslation(dummyPos.x, dummyPos.y, dummyPos.z);
      instancedNodes.setMatrixAt(i, dummyMatrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    studioGroup.add(instancedNodes);

    // Pointer & Scroll state for smooth damped kinematics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let targetScrollProgress = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let currentScroll = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollProgress = Math.max(
        0,
        Math.min(1, window.scrollY / maxScroll)
      );
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();

    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || !gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);

      currentRotX = THREE.MathUtils.damp(
        currentRotX,
        targetMouseY * 0.35,
        4,
        delta
      );
      currentRotY = THREE.MathUtils.damp(
        currentRotY,
        targetMouseX * 0.45,
        4,
        delta
      );
      currentScroll = THREE.MathUtils.damp(
        currentScroll,
        targetScrollProgress,
        5,
        delta
      );

      studioGroup.rotation.x = currentRotX + currentScroll * Math.PI * 0.85;
      studioGroup.rotation.y =
        currentRotY + currentScroll * Math.PI * 1.65 + clock.elapsedTime * 0.06;

      outerRing.rotation.z = -currentScroll * Math.PI * 1.2;
      innerRing.rotation.x = currentScroll * Math.PI * 1.4;
      innerSolidMesh.rotation.y = -clock.elapsedTime * 0.15;

      // Subtle vertical camera drift synchronized with scroll
      camera.position.y = THREE.MathUtils.lerp(0.4, -1.2, currentScroll);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      outerRingGeo.dispose();
      innerRingGeo.dispose();
      coreGeo.dispose();
      innerSolidGeo.dispose();
      nodeGeo.dispose();
      wireframeMat.dispose();
      solidMetallicMat.dispose();
      accentRingMat.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden opacity-75"
    />
  );
};
