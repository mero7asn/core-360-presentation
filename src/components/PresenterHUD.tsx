import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Maximize, 
  Home, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Search
} from 'lucide-react';
import { PRESENTATION_FLOW, DEPARTMENTS_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface PresenterHUDProps {
  isPresentationMode: boolean;
  currentStepIndex: number;
  showNotes: boolean;
  isMuted: boolean;
  onTogglePresentationMode: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onToggleNotes: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onOpenSearch: () => void;
  onResetToLobby: () => void;
}

export function PresenterHUD({
  isPresentationMode,
  currentStepIndex,
  showNotes,
  isMuted,
  onTogglePresentationMode,
  onNextStep,
  onPrevStep,
  onToggleNotes,
  onToggleMute,
  onToggleFullscreen,
  onOpenSearch,
  onResetToLobby
}: PresenterHUDProps) {
  const currentStep = PRESENTATION_FLOW[currentStepIndex] || PRESENTATION_FLOW[0];
  const currentDept = currentStep.departmentId ? DEPARTMENTS_CONFIG.find(d => d.id === currentStep.departmentId) : null;

  return (
    <>
      {/* Floating Bottom Executive Control Deck */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl pointer-events-auto text-slate-200">
          {/* Home / Lobby Trigger */}
          <button
            onClick={() => {
              soundFX.playClick();
              onResetToLobby();
            }}
            title="Reset to Reception (Key: 1)"
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1" />

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onTogglePresentationMode();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isPresentationMode
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPresentationMode ? 'Presentation Active' : 'Guided Flow'}</span>
          </button>

          {/* Presentation Navigation Controls */}
          {isPresentationMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onPrevStep();
                }}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 cursor-pointer"
                title="Previous Scene (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 text-xs font-mono font-bold text-amber-400">
                {currentStepIndex + 1} / {PRESENTATION_FLOW.length}
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onNextStep();
                }}
                disabled={currentStepIndex === PRESENTATION_FLOW.length - 1}
                className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 cursor-pointer"
                title="Next Scene (Right Arrow or Space)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="w-px h-6 bg-slate-800 mx-1" />

          {/* Presenter Notes Button */}
          {currentDept && (
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleNotes();
              }}
              title="Toggle Presenter Notes"
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                showNotes ? 'bg-amber-950 text-amber-400 border border-amber-500/40' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
            </button>
          )}

          {/* Global Search Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenSearch();
            }}
            title="Instant Search (Ctrl+K)"
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mute Sound Button */}
          <button
            onClick={() => {
              onToggleMute();
              soundFX.playClick();
            }}
            title={isMuted ? "Unmute Audio FX" : "Mute Audio FX"}
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={() => {
              soundFX.playClick();
              onToggleFullscreen();
            }}
            title="Fullscreen Presentation (Key: F)"
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Presenter Notes Drawer Panel */}
      {showNotes && currentDept && (
        <div className="fixed top-20 right-6 z-40 w-80 p-5 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl text-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              CONFIDENTIAL PRESENTER NOTES
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {currentDept.code}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            {currentDept.presenterNotes.map((note, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">›</span>
                <p className="leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
