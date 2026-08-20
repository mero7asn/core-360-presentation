import { useState } from 'react';
import {
  Building2,
  ArrowRight,
  Sparkles,
  Layers,
  DoorOpen,
  MapPin,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { DEPARTMENTS_CONFIG, FLOORS_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface BuildingExplorerProps {
  onSelectDepartment: (deptId: string) => void;
  onWholeOrg: () => void;
  onBackToReception?: () => void;
}

export function BuildingExplorer({
  onSelectDepartment,
  onWholeOrg,
  onBackToReception
}: BuildingExplorerProps) {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [hoveredDeptId, setHoveredDeptId] = useState<string | null>(null);

  const currentFloorConfig = FLOORS_CONFIG.find(f => f.floorNumber === selectedFloor) || FLOORS_CONFIG[0];
  const floorDepts = DEPARTMENTS_CONFIG.filter(d => d.floor === selectedFloor);
  const activeDeptForHero = hoveredDeptId
    ? DEPARTMENTS_CONFIG.find(d => d.id === hoveredDeptId) || floorDepts[0]
    : floorDepts[0] || DEPARTMENTS_CONFIG[0];

  const enterDepartment = (deptId: string) => {
    soundFX.playDoorOpen();
    onSelectDepartment(deptId);
  };

  return (
    <div className="walkthrough fixed inset-0 overflow-hidden bg-[#0c0e14] text-slate-100 font-sans select-none">
      <div className="walkthrough__backdrop" aria-hidden="true">
        <img src="/erp_exterior_hq_1787220368979.jpg" alt="" />
        <div className="walkthrough__grain" />
      </div>

      <header className="walkthrough__header">
        <div className="flex items-center gap-3">
          <div className="walkthrough__mark">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-black tracking-[0.16em] text-white">CORE 360 ERP HQ</div>
            <div className="text-[10px] font-mono tracking-widest text-amber-300/80">
              ELEVATOR CONCOURSE · 6 DEPARTMENT SUITES
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onBackToReception && (
            <button
              onClick={() => {
                soundFX.playClick();
                onBackToReception();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-500 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span>Reception Dossiers</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFX.playClimax();
              onWholeOrg();
            }}
            className="walkthrough__command"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ORGANIZATION VIEW</span>
          </button>
        </div>
      </header>

      <main className="walkthrough__body">
        <aside className="walkthrough__directory">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-amber-300/90 mb-4">
            <Layers className="w-4 h-4" /> Floor elevator directory
          </div>

          <div className="walkthrough__floors">
            {FLOORS_CONFIG.slice().reverse().map((floor) => {
              const isSelected = selectedFloor === floor.floorNumber;
              return (
                <button
                  key={floor.floorNumber}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedFloor(floor.floorNumber);
                    setHoveredDeptId(DEPARTMENTS_CONFIG.find(d => d.floor === floor.floorNumber)?.id || null);
                  }}
                  className={`walkthrough__floor ${isSelected ? 'is-active' : ''}`}
                >
                  <span className="walkthrough__floor-number">
                    {floor.floorNumber === 6 ? 'PH' : `0${floor.floorNumber}`}
                  </span>
                  <span className="text-left">
                    <strong>{floor.name}</strong>
                    <small>{floor.subtitle}</small>
                  </span>
                  {isSelected && <ChevronRight className="w-4 h-4 ml-auto text-amber-300" />}
                </button>
              );
            })}
          </div>

          <div className="walkthrough__location">
            <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              <b>{currentFloorConfig.name}</b>
              {currentFloorConfig.description}
            </span>
          </div>
        </aside>

        <section className="walkthrough__scene">
          <div className="walkthrough__scene-copy">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-200/80 mb-2">
              Level 0{selectedFloor} · {currentFloorConfig.tag}
            </div>
            <h1>
              Choose a suite.<br />
              <em>Step into live operations.</em>
            </h1>
            <p>{currentFloorConfig.subtitle}. Select the department doorway to enter the workspace.</p>
          </div>

          <div
            className="walkthrough__hallway"
            style={{ backgroundImage: `url(${activeDeptForHero?.realisticRoomImage || '/erp_exterior_hq_1787220368979.jpg'})` }}
          >
            <div className="walkthrough__hallway-wash" />
            <div className="walkthrough__perspective-line line-one" />
            <div className="walkthrough__perspective-line line-two" />
            <div className="walkthrough__hall-label">
              <DoorOpen className="w-4 h-4" /> {currentFloorConfig.name} · Room {activeDeptForHero?.roomNumber || '100'}
            </div>

            <div className="walkthrough__doors">
              {floorDepts.map((dept) => (
                <button
                  key={dept.id}
                  className={`walkthrough__door ${hoveredDeptId === dept.id ? 'is-selected' : ''}`}
                  onMouseEnter={() => setHoveredDeptId(dept.id)}
                  onFocus={() => setHoveredDeptId(dept.id)}
                  onClick={() => enterDepartment(dept.id)}
                >
                  <span className="walkthrough__door-glass">
                    <img src={dept.realisticRoomImage} alt="" />
                    <span />
                  </span>
                  <span className="walkthrough__door-frame" />
                  <span className="walkthrough__door-copy">
                    <b>{dept.name}</b>
                    <small>ROOM {dept.roomNumber} · {dept.code}</small>
                    <strong>
                      <DoorOpen className="w-3.5 h-3.5" /> Enter suite
                    </strong>
                  </span>
                </button>
              ))}
            </div>

            <div className="walkthrough__floor-mark">
              {selectedFloor === 6 ? 'PENTHOUSE COMMAND' : `FLOOR 0${selectedFloor}`}
            </div>
          </div>
        </section>

        {activeDeptForHero && (
          <aside className="walkthrough__preview">
            <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-amber-200/80">
              Selected suite
            </div>
            <div className="walkthrough__preview-image">
              <img src={activeDeptForHero.realisticRoomImage} alt={`${activeDeptForHero.name} interior`} />
              <span>ROOM {activeDeptForHero.roomNumber}</span>
            </div>
            <div className="text-xs font-mono text-amber-300">{activeDeptForHero.code}</div>
            <h2>{activeDeptForHero.name}</h2>
            <p>{activeDeptForHero.hero.overview}</p>
            <div className="walkthrough__preview-stat">
              <b>{activeDeptForHero.hero.statValue}</b>
              <span>{activeDeptForHero.hero.statHeadline}</span>
            </div>
            <button
              className="walkthrough__enter"
              onClick={() => enterDepartment(activeDeptForHero.id)}
            >
              <span>Open this suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </aside>
        )}
      </main>
    </div>
  );
}
