import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PROJECT_METADATA, OUTRO_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';
import {
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Heart,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface OutroSceneProps {
  onReplay: () => void;
  onSelectDepartment?: (deptId: string) => void;
  onOpenLiveErpModal: () => void;
}

export function OutroScene({
  onReplay,
  onOpenLiveErpModal
}: OutroSceneProps) {
  const [isQaOpen, setIsQaOpen] = useState(false);
  const [expandedQaIndex, setExpandedQaIndex] = useState<number | null>(0);

  useEffect(() => {
    soundFX.playClimax();
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Photorealistic Penthouse Rooftop Skyline Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/rooftop_terrace_city.jpg"
          alt="Penthouse Rooftop Terrace Skyline"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) contrast(1.1) saturate(1.15)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20" />
      </div>

      {/* Main Outro Stage */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black tracking-wider text-white">
                {PROJECT_METADATA.projectName} · CLOSING & ACKNOWLEDGEMENTS
              </div>
              <div className="text-[11px] font-mono text-amber-300/80">
                SCENE 4 · ROOFTOP PENTHOUSE TERRACE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                setIsQaOpen(!isQaOpen);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isQaOpen
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{isQaOpen ? 'Close Q&A Session' : 'Open Q&A Discussion'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenLiveErpModal();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LAUNCH LIVE ERP</span>
            </button>
          </div>
        </header>

        {/* Center Penthouse Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-10 max-w-5xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase mb-4 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Capstone Presentation · Complete</span>
          </div>

          {/* LARGE IMPRESSIVE "THANKS" TITLE */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-2 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              THANK YOU!
            </span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {OUTRO_CONFIG.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-light leading-relaxed mb-8">
            {OUTRO_CONFIG.closingStatement}
          </p>

          {/* Interactive Q&A Mode Panel if Active */}
          {isQaOpen ? (
            <div className="w-full text-left p-6 rounded-3xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-2xl mb-8 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-black text-white">
                    Executive Architecture & Defense Q&A Session
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">4 CORE DEFENSE TOPICS</span>
              </div>

              <div className="space-y-2.5">
                {OUTRO_CONFIG.qaTopics.map((qa, i) => {
                  const isExpanded = expandedQaIndex === i;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all cursor-pointer"
                      onClick={() => setExpandedQaIndex(isExpanded ? null : i)}
                    >
                      <div className="flex items-center justify-between font-bold text-sm text-slate-200">
                        <span>{qa.q}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                      {isExpanded && (
                        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed pt-2 border-t border-slate-800/60 font-light">
                          {qa.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Acknowledgements & Team Grid */
            <div className="space-y-6 w-full mb-8">
              {/* Supervisor & ITI Faculty Acknowledgements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {OUTRO_CONFIG.specialThanks.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Presentation Team Grid */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl text-left">
                <div className="text-xs font-mono uppercase text-amber-400 tracking-wider font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Presented By Core 360 ERP Team:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {PROJECT_METADATA.team.map((mem, index) => (
                    <div
                      key={mem.id}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="text-xs font-bold text-white truncate">{mem.name}</div>
                      </div>
                      <div className="text-[11px] font-medium text-amber-300">{mem.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Navigation Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                soundFX.playTransition();
                onReplay();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-200 hover:text-white transition-all text-xs font-bold shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Replay from Building Door</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setIsQaOpen(!isQaOpen);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white transition-all text-xs font-bold shadow-lg cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>{isQaOpen ? 'Close Q&A Discussion' : 'Open Q&A Discussion'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenLiveErpModal();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live ERP Platform</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between px-8 py-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400/80 bg-slate-950/80 backdrop-blur-xl shrink-0">
          <div>{PROJECT_METADATA.projectName} · AI SOFTWARE DEVELOPMENT (9 MONTHS DIPLOMA)</div>
          <div className="text-amber-400 font-bold">THANK YOU FOR YOUR ATTENDANCE</div>
        </footer>
      </div>
    </div>
  );
}
