import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FLOORS_CONFIG, DEPARTMENTS_CONFIG } from '../config/presentation.config';

interface BuildingProps {
  activeFloor: number | null;
  activeDepartmentId: string | null;
  hoveredDepartmentId: string | null;
  isWholeOrgMode: boolean;
  onSelectDepartment: (deptId: string) => void;
  onHoverDepartment: (deptId: string | null) => void;
}

// -------------------------------------------------------------
// REALISTIC ARCHITECTURAL OFFICE PROPS (PBR / BIM GRADE)
// -------------------------------------------------------------

// Potted Ficus / Tropical Architectural Office Plant with Ceramic Planter
function ArchitecturalPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Matte White Cylindrical Ceramic Pot */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.5, 18]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
        <meshStandardMaterial color="#291a10" roughness={0.9} />
      </mesh>
      {/* Architectural Foliage Leaves */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#15803d" roughness={0.6} />
      </mesh>
      <mesh position={[0.12, 0.95, 0.08]} castShadow>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>
      <mesh position={[-0.1, 0.88, -0.08]} castShadow>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Ultra-Detailed Modern Office Workstation (Desk, Laptop, Screen, Lamp, Chair, Person, Coffee Mug)
function DetailedWorkstation({
  position,
  rotation = 0,
  accentColor,
}: {
  position: [number, number, number];
  rotation?: number;
  accentColor: string;
}) {
  const accent = new THREE.Color(accentColor);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Premium Oak Wood Desk Tabletop */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.04, 0.85]} />
        <meshStandardMaterial color="#d4b996" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Desk Underframe & Cable Tray */}
      <mesh position={[0, 0.67, 0]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.65]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Modern White Powder-Coated T-Loop Steel Legs */}
      <mesh position={[-0.72, 0.35, 0]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.75]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0.72, 0.35, 0]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.75]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Acoustic Fabric Privacy Divider Screen */}
      <mesh position={[0, 0.95, -0.4]} castShadow>
        <boxGeometry args={[1.65, 0.42, 0.03]} />
        <meshStandardMaterial color="#475569" roughness={0.85} />
      </mesh>

      {/* Dual Curved Ultrawide Display Monitors */}
      <group position={[0, 0.74, -0.15]}>
        {/* Monitor Heavy Aluminum Stand */}
        <mesh position={[0, 0.18, -0.15]}>
          <cylinderGeometry args={[0.02, 0.02, 0.36, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.36, -0.15]}>
          <boxGeometry args={[0.08, 0.06, 0.08]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Left Monitor */}
        <mesh position={[-0.42, 0.78, -0.18]} castShadow>
          <boxGeometry args={[0.7, 0.42, 0.03]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[-0.42, 0.78, -0.16]}>
          <planeGeometry args={[0.64, 0.36]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        {/* Right Monitor */}
        <mesh position={[0.42, 0.78, -0.18]} castShadow>
          <boxGeometry args={[0.7, 0.42, 0.03]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0.42, 0.78, -0.16]}>
          <planeGeometry args={[0.64, 0.36]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>

      {/* Premium Mechanical Keyboard */}
      <mesh position={[0, 0.72, 0.12]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.2]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Ergonomic Mouse */}
      <mesh position={[0.45, 0.72, 0.15]}>
        <capsuleGeometry args={[0.04, 0.08, 8, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Premium Coffee Mug */}
      <mesh position={[-0.65, 0.73, -0.1]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.1, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Task LED Desk Lamp */}
      <mesh position={[0.7, 0.75, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.86, -0.32]}>
        <boxGeometry args={[0.12, 0.04, 0.08]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Executive Boardroom Table with 3D curved leather chairs
function ExecutiveBoardroom({ color }: { color: string }) {
  return (
    <group>
      {/* Massive Marble Boardroom Table */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.08, 1.5]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Table Pedestal Base */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* High-Back Leather Executive Chairs */}
      {[[-1.2, 0, 0.9], [1.2, 0, 0.9], [-1.2, 0, -0.9], [1.2, 0, -0.9], [0, 0, 1.2]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Seat */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.9, -0.22]} castShadow>
            <boxGeometry args={[0.5, 0.6, 0.06]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-0.28, 0.65, 0]}>
            <boxGeometry args={[0.06, 0.08, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0.28, 0.65, 0]}>
            <boxGeometry args={[0.06, 0.08, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Chrome Base */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.05} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// AutoCAD / BIM Grade Department Office Suite
function DepartmentRoomNode({
  dept,
  isActive,
  isHovered,
  isDimmed,
  isWholeOrgMode,
  onClick,
  onPointerOver,
  onPointerOut
}: {
  dept: (typeof DEPARTMENTS_CONFIG)[0];
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  isWholeOrgMode: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const color = new THREE.Color(dept.accentColor);

  useFrame((state) => {
    if (glowMeshRef.current) {
      const scale = isHovered || isActive ? 1.03 + Math.sin(state.clock.elapsedTime * 4) * 0.02 : 1.0;
      glowMeshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      position={new THREE.Vector3(...dept.position3D)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onPointerOver();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onPointerOut();
      }}
    >
      {/* 1. Realistic Floor: Natural White Oak Wood Parquet / Luxury Vinyl Tile */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.08, 4.0]} />
        <meshStandardMaterial
          color={isHovered || isActive ? "#1e293b" : "#131b2a"}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* 2. Soft Contemporary Wool Area Rug */}
      <mesh position={[0, 0.105, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.01, 3.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* 3. Perimeter Architectural Walls with Black Metal Baseboards */}
      {/* Rear Acoustic Slat Wall */}
      <mesh position={[0, 1.35, -1.95]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 2.6, 0.1]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.7}
          roughness={0.4}
          wireframe={isWholeOrgMode}
          transparent={isDimmed}
          opacity={isDimmed ? 0.3 : 1.0}
        />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-2.55, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.6, 4.0]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.7}
          roughness={0.4}
          wireframe={isWholeOrgMode}
          transparent={isDimmed}
          opacity={isDimmed ? 0.3 : 1.0}
        />
      </mesh>
      {/* Right Wall */}
      <mesh position={[2.55, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.6, 4.0]} />
        <meshStandardMaterial
          color="#0b1120"
          metalness={0.7}
          roughness={0.4}
          wireframe={isWholeOrgMode}
          transparent={isDimmed}
          opacity={isDimmed ? 0.3 : 1.0}
        />
      </mesh>

      {/* 4. Floor-to-Ceiling Architectural Glass Facade with Black Steel Mullions */}
      {/* Left Glass Panel */}
      <mesh position={[-1.3, 1.35, 1.95]}>
        <boxGeometry args={[2.35, 2.58, 0.04]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.88}
          opacity={isHovered || isActive ? 0.45 : 0.2}
          transparent={true}
          roughness={0.08}
          metalness={0.9}
        />
      </mesh>
      {/* Right Glass Panel */}
      <mesh position={[1.5, 1.35, 1.95]}>
        <boxGeometry args={[1.95, 2.58, 0.04]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.88}
          opacity={isHovered || isActive ? 0.45 : 0.2}
          transparent={true}
          roughness={0.08}
          metalness={0.9}
        />
      </mesh>
      {/* Black Anodized Aluminum Mullion Frames */}
      <mesh position={[-2.5, 1.35, 1.96]}>
        <boxGeometry args={[0.06, 2.6, 0.06]} />
        <meshStandardMaterial color="#020617" metalness={0.9} />
      </mesh>
      <mesh position={[-0.1, 1.35, 1.96]}>
        <boxGeometry args={[0.06, 2.6, 0.06]} />
        <meshStandardMaterial color="#020617" metalness={0.9} />
      </mesh>
      <mesh position={[0.5, 1.35, 1.96]}>
        <boxGeometry args={[0.06, 2.6, 0.06]} />
        <meshStandardMaterial color="#020617" metalness={0.9} />
      </mesh>
      <mesh position={[2.5, 1.35, 1.96]}>
        <boxGeometry args={[0.06, 2.6, 0.06]} />
        <meshStandardMaterial color="#020617" metalness={0.9} />
      </mesh>

      {/* 5. Realistic Office Furniture & Equipment Layout */}
      {dept.id === 'executive' ? (
        <ExecutiveBoardroom color={dept.accentColor} />
      ) : (
        <group>
          {/* Dual Pod Workstations */}
          <DetailedWorkstation
            position={[-1.1, 0, -0.6]}
            accentColor={dept.accentColor}
          />
          <DetailedWorkstation
            position={[1.1, 0, -0.6]}
            accentColor={dept.accentColor}
          />
          {/* Front Collaborative Station */}
          <DetailedWorkstation
            position={[-0.6, 0, 0.9]}
            rotation={Math.PI / 6}
            accentColor={dept.accentColor}
          />
          {/* Tropical Office Plant in Corner */}
          <ArchitecturalPlant position={[2.0, 0, 1.3]} />
        </group>
      )}

      {/* 6. Wall-Mounted 85" Ultra-HD Live Department Dashboard Screen */}
      <group position={[0, 1.6, -1.88]}>
        <mesh castShadow>
          <boxGeometry args={[2.4, 1.2, 0.04]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.32, 1.12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* 7. Overhead Recessed Architectural LED Lighting Grid (3500K Clean White) */}
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[3.8, 0.04, 0.12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHovered || isActive ? 2.0 : 1.0}
        />
      </mesh>
      <mesh position={[-1.4, 2.6, 0]}>
        <boxGeometry args={[0.08, 0.04, 2.8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHovered || isActive ? 1.6 : 0.8}
        />
      </mesh>
      <mesh position={[1.4, 2.6, 0]}>
        <boxGeometry args={[0.08, 0.04, 2.8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHovered || isActive ? 1.6 : 0.8}
        />
      </mesh>

      {/* 8. Department Doorway with High-Tech Cyan / Accent Status Frame */}
      <mesh position={[0.2, 1.18, 1.96]}>
        <boxGeometry args={[0.55, 2.3, 0.04]} />
        <meshStandardMaterial
          color={isHovered || isActive ? "#ffffff" : color}
          emissive={color}
          emissiveIntensity={isHovered || isActive ? 1.4 : 0.5}
        />
      </mesh>

      {/* 9. Luminous Hover / Selection Outline */}
      {(isHovered || isActive) && (
        <mesh ref={glowMeshRef} position={[0, 1.35, 0]}>
          <boxGeometry args={[5.4, 2.7, 4.2]} />
          <meshBasicMaterial
            color={color}
            wireframe={true}
            transparent={true}
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// CINEMATIC DATA STREAM CURVES (Whole Org Mode)
// -------------------------------------------------------------
function DataStreamCurve({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const curve = useMemo(() => {
    const mid = [(start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 2, (start[2] + end[2]) / 2];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(32), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }), [color]);

  return (
    <primitive object={new THREE.Line(geometry, lineMaterial)} />
  );
}

// -------------------------------------------------------------
// MASTER 3D CORPORATE HEADQUARTERS ARCHITECTURAL TOWER
// -------------------------------------------------------------
export function Building({
  activeFloor,
  activeDepartmentId,
  hoveredDepartmentId,
  isWholeOrgMode,
  onSelectDepartment,
  onHoverDepartment
}: BuildingProps) {
  const elevatorRef = useRef<THREE.Mesh>(null);

  // Smooth glass observation elevator animation
  useFrame((state) => {
    if (elevatorRef.current) {
      const height = (Math.sin(state.clock.elapsedTime * 0.8) + 1) * 8.5 + 1.0;
      elevatorRef.current.position.y = height;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* 1. Ground Plaza & Foundation Landscape */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[19, 20, 0.6, 64]} />
        <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Plaza Concentric Neon Guidance Rings */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[12, 12.15, 64]} />
        <meshBasicMaterial color="#00f2fe" opacity={0.6} transparent={true} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[16.5, 16.65, 64]} />
        <meshBasicMaterial color="#3b82f6" opacity={0.35} transparent={true} />
      </mesh>

      {/* 2. Structural Steel Columns (4 Corner Columns Running the Tower Height) */}
      {[
        [-8.0, -8.0],
        [8.0, -8.0],
        [-8.0, 8.0],
        [8.0, 8.0]
      ].map(([x, z], idx) => (
        <mesh key={`col-${idx}`} position={[x, 10.5, z]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 22, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}

      {/* 3. Central Glass Elevator Core & Data Spine */}
      <mesh position={[0, 10.5, 0]} castShadow>
        <boxGeometry args={[3.4, 22, 3.4]} />
        <meshPhysicalMaterial
          color="#030712"
          metalness={0.95}
          roughness={0.1}
          transmission={0.5}
          transparent={true}
          opacity={isWholeOrgMode ? 0.3 : 0.8}
          wireframe={isWholeOrgMode}
        />
      </mesh>

      {/* Glowing Neon Data Spine inside Core */}
      <mesh position={[0, 10.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 21.8, 16]} />
        <meshBasicMaterial color="#00f2fe" transparent={true} opacity={0.85} />
      </mesh>

      {/* Illuminated Glass Observation Elevator Cabin */}
      <mesh ref={elevatorRef} position={[0, 2, 1.9]} castShadow>
        <boxGeometry args={[1.5, 1.9, 1.3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00f2fe"
          emissiveIntensity={0.9}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* 4. Floor Plates with Architectural Edge Beams & Acoustic Ceilings */}
      {FLOORS_CONFIG.map((fl) => {
        const isFloorActive = activeFloor === fl.floorNumber || isWholeOrgMode;
        const isFloorDimmed = activeFloor !== null && activeFloor !== fl.floorNumber && !isWholeOrgMode;

        return (
          <group key={fl.floorNumber} position={[0, fl.altitude, 0]}>
            {/* Structural Post-Tensioned Concrete Floor Slab */}
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[17.5, 0.38, 17.5]} />
              <meshStandardMaterial
                color={isFloorActive ? "#0f172a" : "#070d18"}
                emissive={isFloorActive ? "#00f2fe" : "#000000"}
                emissiveIntensity={isFloorActive ? 0.12 : 0}
                metalness={0.85}
                roughness={0.25}
                transparent={true}
                opacity={isFloorDimmed ? 0.25 : 0.95}
                wireframe={isWholeOrgMode}
              />
            </mesh>

            {/* Glowing Architectural Edge Beam */}
            <mesh position={[0, 0, 8.76]}>
              <boxGeometry args={[17.5, 0.08, 0.04]} />
              <meshBasicMaterial
                color={isFloorActive ? "#00f2fe" : "#1e3a8a"}
                transparent={true}
                opacity={isFloorActive ? 0.95 : 0.3}
              />
            </mesh>

            {/* Ceiling Acoustic Tile Grid with Recessed Spotlights */}
            <mesh position={[0, 3.8, 0]}>
              <boxGeometry args={[17.5, 0.16, 17.5]} />
              <meshStandardMaterial
                color="#060b14"
                metalness={0.9}
                roughness={0.3}
                transparent={true}
                opacity={isFloorDimmed ? 0.15 : 0.8}
                wireframe={isWholeOrgMode}
              />
            </mesh>
          </group>
        );
      })}

      {/* 5. Render All Department Office Suites */}
      {DEPARTMENTS_CONFIG.map((dept) => {
        const isActive = activeDepartmentId === dept.id;
        const isHovered = hoveredDepartmentId === dept.id;
        const isDimmed = activeFloor !== null && activeFloor !== dept.floor && !isWholeOrgMode;

        return (
          <DepartmentRoomNode
            key={dept.id}
            dept={dept}
            isActive={isActive}
            isHovered={isHovered}
            isDimmed={isDimmed}
            isWholeOrgMode={isWholeOrgMode}
            onClick={() => onSelectDepartment(dept.id)}
            onPointerOver={() => onHoverDepartment(dept.id)}
            onPointerOut={() => onHoverDepartment(null)}
          />
        );
      })}

      {/* 6. Whole Organization Mode Data Stream Pulse Connectors */}
      {isWholeOrgMode && (
        <group>
          <DataStreamCurve start={[-3.5, 9.0 + 1.2, 1.2]} end={[3.5, 4.5 + 1.2, 1.2]} color="#10b981" />
          <DataStreamCurve start={[3.5, 4.5 + 1.2, 1.2]} end={[3.5, 0 + 1.2, 1.2]} color="#a855f7" />
          <DataStreamCurve start={[3.5, 0 + 1.2, 1.2]} end={[-3.5, 13.5 + 1.2, 1.2]} color="#FB9600" />
          <DataStreamCurve start={[-3.5, 13.5 + 1.2, 1.2]} end={[3.5, 9.0 + 1.2, 1.2]} color="#06b6d4" />
          <DataStreamCurve start={[-3.5, 9.0 + 1.2, 1.2]} end={[0, 18.0 + 1.2, 1.2]} color="#3b82f6" />
          <DataStreamCurve start={[3.5, 9.0 + 1.2, 1.2]} end={[0, 18.0 + 1.2, 1.2]} color="#eab308" />
        </group>
      )}

      {/* 7. Penthouse Architectural Crown & Glass Sky-Atrium */}
      <mesh position={[0, 20.8, 0]}>
        <coneGeometry args={[5.8, 3.4, 4]} />
        <meshPhysicalMaterial
          color="#0f172a"
          emissive="#FB9600"
          emissiveIntensity={isWholeOrgMode ? 0.8 : 0.3}
          metalness={0.95}
          roughness={0.1}
          transparent={true}
          opacity={0.88}
          wireframe={isWholeOrgMode}
        />
      </mesh>
    </group>
  );
}
