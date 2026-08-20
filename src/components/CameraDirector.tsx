import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DEPARTMENTS_CONFIG, FLOORS_CONFIG } from '../config/presentation.config';

export type CameraMode = 
  | 'EXTERIOR' 
  | 'LOBBY' 
  | 'FLOOR' 
  | 'ROOM_APPROACH' 
  | 'WHOLE_ORG' 
  | 'FREE_EXPLORE';

interface CameraDirectorProps {
  mode: CameraMode;
  activeFloor: number | null;
  activeDepartmentId: string | null;
  targetFocus: [number, number, number] | null;
}

export function CameraDirector({ mode, activeFloor, activeDepartmentId, targetFocus }: CameraDirectorProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 8, 0));
  const targetPos = useRef(new THREE.Vector3(0, 14, 28));
  const targetLook = useRef(new THREE.Vector3(0, 8, 0));

  useEffect(() => {
    switch (mode) {
      case 'EXTERIOR':
        targetPos.current.set(0, 14, 32);
        targetLook.current.set(0, 9, 0);
        break;

      case 'LOBBY':
        targetPos.current.set(0, 1.8, 12);
        targetLook.current.set(0, 1.2, 0);
        break;

      case 'FLOOR':
        if (activeFloor !== null) {
          const floor = FLOORS_CONFIG.find(f => f.floorNumber === activeFloor);
          const y = floor ? floor.altitude + 2 : 6;
          targetPos.current.set(0, y + 4.5, 18);
          targetLook.current.set(0, y, 0);
        }
        break;

      case 'ROOM_APPROACH':
        if (activeDepartmentId) {
          const dept = DEPARTMENTS_CONFIG.find(d => d.id === activeDepartmentId);
          if (dept) {
            const [x, y, z] = dept.position3D;
            targetPos.current.set(x * 1.2, y + 2.0, z + 6.5);
            targetLook.current.set(x, y + 1.2, z);
          }
        }
        break;

      case 'WHOLE_ORG':
        targetPos.current.set(16, 26, 34);
        targetLook.current.set(0, 10, 0);
        break;

      case 'FREE_EXPLORE':
        if (targetFocus) {
          targetLook.current.set(...targetFocus);
        }
        break;
    }
  }, [mode, activeFloor, activeDepartmentId, targetFocus]);

  useFrame((_, delta) => {
    const smoothFactor = Math.min(delta * 2.8, 0.1);
    camera.position.lerp(targetPos.current, smoothFactor);
    currentLookAt.current.lerp(targetLook.current, smoothFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
