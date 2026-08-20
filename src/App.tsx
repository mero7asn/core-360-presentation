import { useState, useEffect, useCallback } from 'react';
import { HeroLoader } from './components/HeroLoader';
import { ReceptionScene } from './components/ReceptionScene';
import { DossierModal } from './components/DossierModal';
import { BuildingExplorer } from './components/BuildingExplorer';
import { DepartmentStage } from './components/DepartmentStage';
import { WholeOrgExperience } from './components/WholeOrgExperience';
import { OutroScene } from './components/OutroScene';
import { LiveERPModal } from './components/LiveERPModal';
import { ElevatorTransitionModal } from './components/ElevatorTransitionModal';
import { PresenterHUD } from './components/PresenterHUD';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import {
  DEPARTMENTS_CONFIG,
  PRESENTATION_FLOW
} from './config/presentation.config';
import { soundFX } from './utils/sound';

type AppView = 'hero' | 'reception' | 'building' | 'department' | 'whole_org' | 'outro';
type PresentationMode = 'presentation' | 'explore';
type CameraScene = 'EXTERIOR' | 'RECEPTION' | 'LOBBY' | 'ROOM_APPROACH' | 'ROOM_PRESENTATION' | 'COMMAND_CENTER' | 'ROOFTOP';

export default function App() {
  const [view, setView] = useState<AppView>('hero');
  const [activeDepartmentId, setActiveDepartmentId] = useState<string | null>(null);
  const [pendingDepartmentId, setPendingDepartmentId] = useState<string | null>(null);
  const [isDoorTransitioning, setIsDoorTransitioning] = useState<boolean>(false);
  const [isLiveErpModalOpen, setIsLiveErpModalOpen] = useState<boolean>(false);
  const [activeDossierFileId, setActiveDossierFileId] = useState<string | null>(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<PresentationMode>('presentation');
  const [cameraScene, setCameraScene] = useState<CameraScene>('EXTERIOR');
  const [showNotes, setShowNotes] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const activeDepartment = activeDepartmentId
    ? DEPARTMENTS_CONFIG.find(d => d.id === activeDepartmentId) || null
    : null;

  const pendingDepartment = pendingDepartmentId
    ? DEPARTMENTS_CONFIG.find(d => d.id === pendingDepartmentId) || null
    : null;

  // Scene 1 -> Scene 2: Entrance to Reception Desk
  const handleEnterBuilding = useCallback(() => {
    soundFX.playTransition();
    setView('reception');
    setCameraScene('RECEPTION');
    setCurrentStepIndex(1);
  }, [setView, setCameraScene, setCurrentStepIndex]);

  // Open Dossier File in Reception Desk
  const handleOpenDossierFile = useCallback((fileId: string) => {
    setActiveDossierFileId(fileId);
    setIsDossierModalOpen(true);
  }, [setActiveDossierFileId, setIsDossierModalOpen]);

  // Proceed from Reception to Department Floors
  const handleProceedToFloors = useCallback(() => {
    soundFX.playTransition();
    setIsDossierModalOpen(false);
    setView('building');
    setCameraScene('LOBBY');
    setCurrentStepIndex(2);
  }, [setIsDossierModalOpen, setView, setCameraScene, setCurrentStepIndex]);

  // Select a specific department floor
  const handleSelectDepartment = useCallback((deptId: string) => {
    const dept = DEPARTMENTS_CONFIG.find(d => d.id === deptId);
    if (!dept) return;

    setPendingDepartmentId(deptId);
    setIsDoorTransitioning(true);
    setCameraScene('ROOM_APPROACH');
    const flowIndex = PRESENTATION_FLOW.findIndex(step => step.departmentId === deptId);
    if (flowIndex >= 0) setCurrentStepIndex(flowIndex);
  }, [setPendingDepartmentId, setIsDoorTransitioning, setCameraScene, setCurrentStepIndex]);

  // Door transition completion
  const handleDoorTransitionComplete = useCallback(() => {
    setIsDoorTransitioning(false);
    if (pendingDepartmentId) {
      setActiveDepartmentId(pendingDepartmentId);
      setView('department');
      setCameraScene('ROOM_PRESENTATION');
      setPendingDepartmentId(null);
    }
  }, [pendingDepartmentId, setActiveDepartmentId, setView, setCameraScene, setIsDoorTransitioning, setPendingDepartmentId]);

  // Back from Department to Floor Directory
  const handleBackToBuilding = useCallback(() => {
    soundFX.playClick();
    setView('building');
    setActiveDepartmentId(null);
    setCameraScene('LOBBY');
  }, [setView, setActiveDepartmentId, setCameraScene]);

  // Back to Reception Desk from Building Explorer
  const handleBackToReception = useCallback(() => {
    soundFX.playClick();
    setView('reception');
    setActiveDepartmentId(null);
    setCameraScene('RECEPTION');
    setCurrentStepIndex(1);
  }, [setView, setActiveDepartmentId, setCameraScene, setCurrentStepIndex]);

  // Trigger Whole Organization Synthesis
  const handleWholeOrg = useCallback(() => {
    soundFX.playClimax();
    setView('whole_org');
    setCameraScene('COMMAND_CENTER');
    const wholeOrgIndex = PRESENTATION_FLOW.findIndex(step => step.id === 'whole_org');
    if (wholeOrgIndex >= 0) setCurrentStepIndex(wholeOrgIndex);
  }, [setView, setCameraScene, setCurrentStepIndex]);

  // Back from Whole Org
  const handleBackFromWholeOrg = useCallback(() => {
    soundFX.playClick();
    setView('building');
    setCameraScene('LOBBY');
  }, [setView, setCameraScene]);

  // Proceed to Outro Scene
  const handleProceedToOutro = useCallback(() => {
    soundFX.playClimax();
    setView('outro');
    setCameraScene('ROOFTOP');
    const outroIndex = PRESENTATION_FLOW.findIndex(step => step.id === 'outro');
    if (outroIndex >= 0) setCurrentStepIndex(outroIndex);
  }, [setView, setCameraScene, setCurrentStepIndex]);

  // Replay presentation from Scene 1
  const handleReplay = useCallback(() => {
    soundFX.playTransition();
    setView('hero');
    setActiveDepartmentId(null);
    setPendingDepartmentId(null);
    setCameraScene('EXTERIOR');
    setCurrentStepIndex(0);
  }, [setView, setActiveDepartmentId, setPendingDepartmentId, setCameraScene, setCurrentStepIndex]);

  // Step-by-step navigation in guided presentation mode
  const navigateStep = useCallback((idx: number) => {
    if (idx < 0 || idx >= PRESENTATION_FLOW.length) return;
    setCurrentStepIndex(idx);
    const step = PRESENTATION_FLOW[idx];

    if (step.id === 'hero') {
      setView('hero');
      setCameraScene('EXTERIOR');
    } else if (step.id === 'reception') {
      setView('reception');
      setActiveDepartmentId(null);
      setCameraScene('RECEPTION');
    } else if (step.id === 'whole_org') {
      handleWholeOrg();
    } else if (step.id === 'outro') {
      handleProceedToOutro();
    } else if (step.departmentId) {
      handleSelectDepartment(step.departmentId);
    }
  }, [setCurrentStepIndex, setView, setCameraScene, setActiveDepartmentId, handleWholeOrg, handleProceedToOutro, handleSelectDepartment]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  }, []);

  const resetToLobby = useCallback(() => {
    setIsLiveErpModalOpen(false);
    setActiveDepartmentId(null);
    setPendingDepartmentId(null);
    setIsDoorTransitioning(false);
    setIsDossierModalOpen(false);
    setActiveDossierFileId(null);
    setCurrentStepIndex(1);
    setView('reception');
    setCameraScene('RECEPTION');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (isDossierModalOpen) setIsDossierModalOpen(false);
        else if (isLiveErpModalOpen) setIsLiveErpModalOpen(false);
        else if (view === 'department') handleBackToBuilding();
        else if (view === 'whole_org') handleBackFromWholeOrg();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'p' || e.key === 'P') {
        setPresentationMode('presentation');
      } else if (e.key === 'e' || e.key === 'E') {
        setPresentationMode('explore');
      } else if (e.key === 'h' || e.key === 'H') {
        resetToLobby();
      } else if (/^[1-9]$/.test(e.key)) {
        const targetStep = Number(e.key) - 1;
        if (targetStep < PRESENTATION_FLOW.length) {
          navigateStep(targetStep);
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        navigateStep(currentStepIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateStep(currentStepIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    view,
    isLiveErpModalOpen,
    isDossierModalOpen,
    isSearchOpen,
    currentStepIndex,
    handleBackToBuilding,
    handleBackFromWholeOrg,
    navigateStep,
    resetToLobby,
    toggleFullscreen,
    setIsSearchOpen,
    setIsDossierModalOpen,
    setIsLiveErpModalOpen,
    setPresentationMode
  ]);

  return (
    <div
      className="relative w-screen h-screen bg-[#030712] text-slate-100 overflow-hidden select-none font-sans"
      data-camera-scene={cameraScene}
      data-presentation-mode={presentationMode}
    >
      {/* Scene 1: Building Entrance */}
      {view === 'hero' && (
        <HeroLoader onEnter={handleEnterBuilding} />
      )}

      {/* Scene 2: Reception Desk & Dossiers */}
      {view === 'reception' && (
        <ReceptionScene
          onOpenFile={handleOpenDossierFile}
          onProceedToFloors={handleProceedToFloors}
          onBackToDoor={handleReplay}
        />
      )}

      {/* Scene 3: Building & Floor Directory */}
      {view === 'building' && (
        <BuildingExplorer
          onSelectDepartment={handleSelectDepartment}
          onWholeOrg={handleWholeOrg}
          onBackToReception={handleBackToReception}
        />
      )}

      {/* Scene 3: Specific Department Stage */}
      {view === 'department' && activeDepartment && (
        <DepartmentStage
          department={activeDepartment}
          onBackToBuilding={handleBackToBuilding}
          onOpenLiveErpModal={() => setIsLiveErpModalOpen(true)}
          onTriggerWholeOrg={handleWholeOrg}
          onNextDepartment={() => {
            const curIdx = DEPARTMENTS_CONFIG.findIndex(d => d.id === activeDepartment.id);
            if (curIdx < DEPARTMENTS_CONFIG.length - 1) {
              handleSelectDepartment(DEPARTMENTS_CONFIG[curIdx + 1].id);
            } else {
              handleWholeOrg();
            }
          }}
          onPrevDepartment={() => {
            const curIdx = DEPARTMENTS_CONFIG.findIndex(d => d.id === activeDepartment.id);
            if (curIdx > 0) {
              handleSelectDepartment(DEPARTMENTS_CONFIG[curIdx - 1].id);
            } else {
              handleBackToReception();
            }
          }}
        />
      )}

      {/* Whole Organization Synthesis */}
      {view === 'whole_org' && (
        <WholeOrgExperience
          onBackToPresentation={handleBackFromWholeOrg}
          onProceedToOutro={handleProceedToOutro}
        />
      )}

      {/* Scene 4: Outro & Acknowledgements */}
      {view === 'outro' && (
        <OutroScene
          onReplay={handleReplay}
          onSelectDepartment={handleSelectDepartment}
          onOpenLiveErpModal={() => setIsLiveErpModalOpen(true)}
        />
      )}

      {/* Elevator Concourse Transition Modal */}
      {pendingDepartment && (
        <ElevatorTransitionModal
          isOpen={isDoorTransitioning}
          fromFloorLabel={activeDepartment ? `0${activeDepartment.floor}` : 'LOBBY'}
          toFloorNumber={pendingDepartment.floor}
          toDepartmentName={pendingDepartment.name}
          toDepartmentRoom={pendingDepartment.roomNumber}
          onArrived={handleDoorTransitionComplete}
        />
      )}

      {/* Dossier Document Viewer Modal */}
      <DossierModal
        activeFileId={activeDossierFileId}
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        onSelectFile={setActiveDossierFileId}
        onProceedToFloors={handleProceedToFloors}
      />

      {/* Live ERP Browser Modal */}
      <LiveERPModal
        department={activeDepartment}
        isOpen={isLiveErpModalOpen}
        onClose={() => setIsLiveErpModalOpen(false)}
      />

      {/* Bottom Presenter HUD Deck */}
      {view !== 'hero' && !isDoorTransitioning && (
        <PresenterHUD
          isPresentationMode={presentationMode === 'presentation'}
          currentStepIndex={currentStepIndex}
          showNotes={showNotes}
          isMuted={isMuted}
          onTogglePresentationMode={() =>
            setPresentationMode(presentationMode === 'presentation' ? 'explore' : 'presentation')
          }
          onNextStep={() => navigateStep(currentStepIndex + 1)}
          onPrevStep={() => navigateStep(currentStepIndex - 1)}
          onToggleNotes={() => setShowNotes(!showNotes)}
          onToggleMute={() => {
            const nextMuted = !isMuted;
            setIsMuted(nextMuted);
            soundFX.setMuted(nextMuted);
          }}
          onToggleFullscreen={toggleFullscreen}
          onOpenSearch={() => setIsSearchOpen(true)}
          onResetToLobby={resetToLobby}
        />
      )}

      {/* Instant Search Palette (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDepartment={handleSelectDepartment}
        onSelectFloor={() => {
          setIsSearchOpen(false);
          setView('building');
          setCameraScene('LOBBY');
        }}
      />
    </div>
  );
}
