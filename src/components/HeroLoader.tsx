import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/sound';
import { PROJECT_METADATA } from '../config/presentation.config';
import { Shield, ArrowRight, UserCheck, ChevronRight } from 'lucide-react';

interface HeroLoaderProps {
  onEnter: () => void;
}

export function HeroLoader({ onEnter }: HeroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsReady(true);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 22 + 8;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    setIsTransitioning(true);
    soundFX.playTransition();
    setTimeout(() => {
      soundFX.playDoorOpen();
    }, 450);
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-slate-950 select-none font-sans">
      {/* 3D Moving High-Tech Glass Building Entrance Background */}
      <motion.div
        animate={isTransitioning ? { scale: 1.8, filter: 'brightness(2) blur(8px)' } : { scale: 1.05 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src="/building_entrance_doors.jpg"
          alt="Core 360 ERP Headquarters Entrance"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) contrast(1.15) saturate(1.2)' }}
        />
      </motion.div>

      {/* Cinematic Overlays & Ambient Light Beams */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/70 via-transparent to-[#030712]/70 pointer-events-none" />

      {/* Speed Lines & Graphic Movement Effect on Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center bg-cyan-500/15 backdrop-blur-sm"
          >
            {/* Speed Warp Burst */}
            <div className="w-full h-full flex items-center justify-center animate-ping opacity-60">
              <div className="w-[600px] h-[600px] rounded-full border-4 border-cyan-400" />
            </div>
            <div className="absolute text-center text-white font-mono font-bold text-sm tracking-[0.3em] uppercase animate-pulse">
              ENTERING MAIN RECEPTION LOBBY...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glass Door Overlay HUD */}
      <motion.div
        animate={isTransitioning ? { opacity: 0, y: -40, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col h-full justify-between p-6 sm:p-10 overflow-y-auto"
      >
        {/* Top Header Credentials */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 border border-amber-300/40">
              <span className="text-slate-950 font-black text-xl tracking-tighter">360</span>
            </div>
            <div>
              <div className="text-lg font-black tracking-wider text-white">
                {PROJECT_METADATA.projectName}
              </div>
              <div className="text-xs text-amber-300/90 font-mono font-semibold">
                Track: {PROJECT_METADATA.trackName} ({PROJECT_METADATA.diplomaDuration})
              </div>
            </div>
          </div>

          {/* Supervisor & Track Head Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-left">
              <div className="text-[10px] uppercase font-mono text-slate-400">Supervisor</div>
              <div className="text-sm font-bold text-amber-300">{PROJECT_METADATA.supervisor}</div>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-left">
              <div className="text-[10px] uppercase font-mono text-slate-400">Track Head</div>
              <div className="text-sm font-bold text-amber-300">{PROJECT_METADATA.trackHead}</div>
            </div>
            <div className="glass rounded-full px-3.5 py-1.5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-300">LIVE INSTANCE</span>
            </div>
          </div>
        </header>

        {/* Center Portal Section */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full text-center py-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-3">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              CORE 360
            </span>
            <br />
            <span className="text-white">ERP SYSTEM</span>
          </h1>

          {/* Presented By Section with exact team members */}
          <div className="w-full max-w-4xl mb-8">
            <div className="text-xs uppercase font-mono tracking-[0.2em] text-amber-400/90 font-bold mb-3 flex items-center justify-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Presented By:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {PROJECT_METADATA.team.map((member, index) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-slate-900/85 border border-slate-800 hover:border-amber-500/60 backdrop-blur-xl transition-all duration-300 shadow-xl group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs font-mono group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {index + 1}
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                      {member.name}
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-400 leading-tight">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse Button: Move inside building into Reception */}
          <div className="w-full max-w-sm">
            {!isReady ? (
              <div className="space-y-2.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>INITIALIZING GRAPHIC 3D ENTRANCE</span>
                  <span className="text-amber-400 font-bold">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleEnterClick}
                disabled={isTransitioning}
                className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 shadow-2xl"
              >
                <span>Enter Building</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            )}
          </div>
        </main>

        {/* Bottom Bar */}
        <footer className="flex items-center justify-between text-[11px] font-mono text-slate-400/80 pt-4 border-t border-white/10 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>CORE 360 ERP SYSTEM · 2026</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <span>CLICK NEXT OR PRESS SPACE TO MOVE INSIDE RECEPTION</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
