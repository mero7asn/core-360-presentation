import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOSSIER_FILES, PROJECT_METADATA } from '../config/presentation.config';
import { soundFX } from '../utils/sound';
import {
  Folder,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  BookOpen,
  ChevronRight,
  Layers,
  Bell,
  Eye,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ReceptionSceneProps {
  onOpenFile: (fileId: string) => void;
  onProceedToFloors: () => void;
  onBackToDoor: () => void;
}

export function ReceptionScene({
  onOpenFile,
  onProceedToFloors,
  onBackToDoor
}: ReceptionSceneProps) {
  // Two physical camera viewpoints: 'lobby' (standing in atrium) and 'desk_closeup' (looking directly on the desk surface)
  const [cameraMode, setCameraMode] = useState<'lobby' | 'desk_closeup'>('lobby');
  const [hoveredFileId, setHoveredFileId] = useState<string | null>(null);
  const [isElevatorTransition, setIsElevatorTransition] = useState(false);
  const [bellRung, setBellRung] = useState(false);

  const handleApproachDesk = () => {
    soundFX.playTransition();
    setCameraMode('desk_closeup');
  };

  const handleStepBackToLobby = () => {
    soundFX.playTransition();
    setCameraMode('lobby');
  };

  const openFileWithSound = (fileId: string) => {
    soundFX.playClick();
    onOpenFile(fileId);
  };

  const handleRingBell = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBellRung(true);
    soundFX.playDeskBell();
    setTimeout(() => setBellRung(false), 500);
  };

  const handleNextClick = () => {
    setIsElevatorTransition(true);
    soundFX.playTransition();
    setTimeout(() => {
      soundFX.playDoorOpen();
    }, 500);
    setTimeout(() => {
      onProceedToFloors();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Dynamic Background Image depending on camera mode */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          key={cameraMode}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src={cameraMode === 'lobby' ? '/reception_desk_scene.jpg' : '/reception_desk_closeup.jpg'}
          alt={cameraMode === 'lobby' ? 'Reception Lobby Atrium' : 'Reception Desk Surface Close-up'}
          className="w-full h-full object-cover"
          style={{
            filter: cameraMode === 'lobby' 
              ? 'brightness(0.72) contrast(1.15) saturate(1.15)' 
              : 'brightness(0.85) contrast(1.15) saturate(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
      </div>

      {/* Graphic Elevator Transition Overlay */}
      <AnimatePresence>
        {isElevatorTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-2xl"
          >
            <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl text-center space-y-4 max-w-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
                <Layers className="w-9 h-9 animate-bounce" />
              </div>
              <div className="text-2xl font-black text-white">ELEVATOR CONCOURSE</div>
              <div className="text-xs font-mono text-amber-300">
                TRANSITIONING TO DEPARTMENT FLOORS (1 TO 6)...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport UI */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                if (cameraMode === 'desk_closeup') {
                  handleStepBackToLobby();
                } else {
                  onBackToDoor();
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{cameraMode === 'desk_closeup' ? 'Step Back to Reception Lobby' : 'Back to Building Door'}</span>
            </button>

            <div className="w-px h-6 bg-slate-800 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black tracking-wider text-white">
                  {PROJECT_METADATA.projectName} · {cameraMode === 'lobby' ? 'RECEPTION LOBBY' : 'RECEPTION DESK CLOSE-UP'}
                </div>
                <div className="text-[10px] font-mono text-amber-300/80">
                  {cameraMode === 'lobby' ? 'SCENE 2A · ATRIUM VIEW' : 'SCENE 2B · CONFIDENTIAL DESK FOLDERS'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cameraMode === 'desk_closeup' ? (
              <button
                onClick={handleStepBackToLobby}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
                <span>View Reception Lobby</span>
              </button>
            ) : (
              <button
                onClick={handleApproachDesk}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom In to Reception Desk</span>
              </button>
            )}

            {/* Brass Bell Button */}
            <button
              onClick={handleRingBell}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                bellRung
                  ? 'bg-amber-400 text-slate-950 border-white scale-110 shadow-lg shadow-amber-400/50'
                  : 'bg-slate-900/90 text-amber-300 border-amber-500/40 hover:bg-slate-800'
              }`}
              title="Ring Reception Desk Bell"
            >
              <Bell className={`w-4 h-4 ${bellRung ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
              <span className="hidden sm:inline">Ring Bell</span>
            </button>

            <button
              onClick={handleNextClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Next: Elevator to Floors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* VIEW 1: RECEPTION LOBBY (Standing in the Entrance Atrium) */}
        {cameraMode === 'lobby' && (
          <main className="flex-1 flex flex-col items-center justify-between px-6 sm:px-12 py-8 max-w-5xl mx-auto w-full text-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Welcome inside the headquarters of Core 360 ERP</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                Reception Desk
              </h1>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
                Welcome inside the headquarters of <strong className="text-amber-400 font-bold">Core 360 ERP</strong>. The receptionist counter ahead holds the project dossiers. Click on the reception desk to take a closer look.
              </p>
            </div>

            {/* Interactive Glowing Reception Desk Callout Card */}
            <motion.div
              onClick={handleApproachDesk}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/10 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-amber-400 cursor-pointer max-w-xl w-full backdrop-blur-md group transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-black text-white">RECEPTION COUNTER & DESK</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400 text-slate-950">
                  4 FOLDERS ON DESK
                </span>
              </div>

              <p className="text-xs text-slate-300 text-left mb-4 font-light">
                Click here to approach the desk and view the 4 leather-bound project dossiers: Introduction, Problem Definition, Solution, and Architecture.
              </p>

              <div className="py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md">
                <span>Click to View Reception Desk Surface</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={onBackToDoor}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Building Entrance</span>
              </button>

              <button
                onClick={handleApproachDesk}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Approach Reception Desk</span>
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextClick}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Take Elevator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        )}

        {/* VIEW 2: CLOSER LOOK AT THE DESK (Desk Surface POV with 4 Folders) */}
        {cameraMode === 'desk_closeup' && (
          <main className="flex-1 flex flex-col items-center justify-between px-6 sm:px-12 py-6 max-w-6xl mx-auto w-full">
            {/* Header Description */}
            <div className="text-center max-w-3xl mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase mb-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Looking at the Reception Desk Surface · Click Any Folder to Open</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Executive Desk Folders
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                4 physical leather dossiers are placed on the counter. Click on any file to open the slide viewer; close it anytime to return to the desk.
              </p>
            </div>

            {/* PHYSICAL RECEPTION DESK SURFACE (Looking at Desk POV) */}
            <div className="w-full relative rounded-3xl bg-gradient-to-b from-[#1c1815]/95 via-[#13100e]/95 to-[#0b0908]/98 border-t-4 border-amber-500/70 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
              {/* Brass Engraved Nameplate */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-amber-900/40 mb-6 gap-3">
                <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#784e27] via-[#b45309] to-[#784e27] text-amber-100 border border-amber-300/40 shadow-md font-mono text-xs font-black tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-200" />
                  <span>CORE 360 ERP · HEADQUARTERS ARCHIVES</span>
                </div>
                <div className="text-xs font-mono text-amber-400/90 font-bold hidden sm:block">
                  4 PHYSICAL LEATHER-BOUND SPECIFICATION DOSSIERS
                </div>
              </div>

              {/* 4 Leather-Bound Physical Dossier Folders on Desk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                {DOSSIER_FILES.map((file) => {
                  const isHovered = hoveredFileId === file.id;
                  return (
                    <motion.div
                      key={file.id}
                      onMouseEnter={() => setHoveredFileId(file.id)}
                      onMouseLeave={() => setHoveredFileId(null)}
                      onClick={() => openFileWithSound(file.id)}
                      whileHover={{ y: -12, scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`leather-portfolio relative p-6 rounded-2xl text-left cursor-pointer transition-all duration-300 ${
                        isHovered ? 'anim-pulse-gold scale-105' : ''
                      }`}
                    >
                      {/* Metal Brass Corner Accents */}
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 rounded-tr" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 rounded-bl" />

                      {/* Leather Folder Top Tab & Embossed Gold Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
                          <Folder className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black bg-amber-400 text-slate-950 shadow-md">
                          FILE 0{file.fileNumber}
                        </span>
                      </div>

                      <div className="text-[10px] uppercase font-mono text-amber-400 font-bold mb-1 tracking-wider">
                        {file.badge}
                      </div>

                      <h3 className="text-base font-black text-white mb-2 leading-tight">
                        {file.fileNumber}- {file.title}
                      </h3>

                      <p className="text-xs text-amber-100/80 leading-relaxed line-clamp-3 mb-5 font-light">
                        {file.summary}
                      </p>

                      <div className="pt-3 border-t border-amber-900/60 flex items-center justify-between text-xs font-bold text-amber-400">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>Open Physical Dossier</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <button
                onClick={handleStepBackToLobby}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold cursor-pointer transition-all shadow-md"
              >
                <ZoomOut className="w-4 h-4" />
                <span>Step Back: Reception Lobby</span>
              </button>

              <button
                onClick={handleNextClick}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Next: Elevator to Department Floors (1–6)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="flex items-center justify-between px-8 py-3.5 border-t border-slate-800/80 text-[11px] font-mono text-slate-400/80 bg-slate-950/80 backdrop-blur-xl shrink-0">
          <div>CORE 360 ERP · RECEPTION DESK ARCHIVE</div>
          <div className="text-amber-300 font-semibold">
            {cameraMode === 'lobby' 
              ? 'CLICK THE RECEPTION DESK TO INSPECT FILES' 
              : 'CLICK ANY LEATHER DOSSIER TO READ • CLICK STEP BACK TO RETURN TO LOBBY'}
          </div>
        </footer>
      </div>
    </div>
  );
}
