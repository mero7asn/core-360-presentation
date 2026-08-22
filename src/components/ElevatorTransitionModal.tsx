import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/sound';
import {
  ArrowUp,
  Layers,
  ChevronRight,
  Shield,
  Sparkles,
  Users
} from 'lucide-react';

interface ElevatorTransitionModalProps {
  isOpen: boolean;
  fromFloorLabel: string;
  toFloorNumber: number;
  toDepartmentName: string;
  toDepartmentRoom?: string;
  onArrived: () => void;
}

export function ElevatorTransitionModal({
  isOpen,
  fromFloorLabel,
  toFloorNumber,
  toDepartmentName,
  toDepartmentRoom,
  onArrived
}: ElevatorTransitionModalProps) {
  const [currentDisplayFloor, setCurrentDisplayFloor] = useState<number | string>(fromFloorLabel);
  const [isDoorsOpening, setIsDoorsOpening] = useState(false);
  const [phase, setPhase] = useState<'ascending' | 'arriving' | 'opening'>('ascending');

  useEffect(() => {
    if (!isOpen) return;

    soundFX.playTransition();

    const timer1 = setTimeout(() => {
      soundFX.playClick();
      setCurrentDisplayFloor(`▲ 0${toFloorNumber}`);
      setPhase('arriving');
    }, 600);

    const timer2 = setTimeout(() => {
      soundFX.playDoorOpen();
      setIsDoorsOpening(true);
      setPhase('opening');
    }, 1300);

    const timer3 = setTimeout(() => {
      onArrived();
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsDoorsOpening(false);
      setPhase('ascending');
    };
  }, [isOpen, toFloorNumber, onArrived]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none font-sans"
        style={{ background: 'linear-gradient(180deg, #030712 0%, #0c0a06 50%, #030712 100%)' }}
      >
        {/* Photorealistic Elevator Cabin Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            animate={isDoorsOpening 
              ? { scale: 1.15, opacity: 0.15, filter: 'brightness(1.2) blur(4px)' } 
              : { scale: 1.02, opacity: 1, filter: 'brightness(0.6) contrast(1.15) saturate(1.1)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            src="/elevator_concourse_interior.jpg"
            alt="Elevator Cabin Interior"
            className="w-full h-full object-cover"
          />
          {/* Orange-toned overlay matching site theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#0c0a06]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 via-transparent to-orange-950/20" />
        </div>

        {/* Sliding Steel Elevator Doors (split-open animation) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex overflow-hidden">
          <motion.div
            initial={{ x: '0%' }}
            animate={isDoorsOpening ? { x: '-105%' } : { x: '0%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d08] via-[#1a1610] to-[#0f0d08]" />
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-400/60 via-orange-500/80 to-orange-400/60" />
            {/* Brushed metal texture lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`l-${i}`}
                className="absolute right-0 left-0 h-px bg-orange-800/15"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ x: '0%' }}
            animate={isDoorsOpening ? { x: '105%' } : { x: '0%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f0d08] via-[#1a1610] to-[#0f0d08]" />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-400/60 via-orange-500/80 to-orange-400/60" />
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`r-${i}`}
                className="absolute right-0 left-0 h-px bg-orange-800/15"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </motion.div>
        </div>

        {/* === CENTER ELEVATOR HUD === */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative z-20 flex flex-col items-center max-w-md w-full px-6 text-center"
        >
          {/* Cabin Panel Card */}
          <div className="w-full rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(249,115,22,0.25)] border border-orange-500/50">
            {/* Top Status Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#0c0a06]/95 border-b border-orange-900/60">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                <Layers className="w-4 h-4 animate-pulse" />
                <span>CORE 360 EXPRESS ELEVATOR</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-[10px] font-mono font-black text-orange-300">
                <span className={`w-2 h-2 rounded-full ${phase === 'opening' ? 'bg-emerald-400' : 'bg-orange-400'} animate-ping`} />
                <span>
                  {phase === 'ascending' && 'ASCENDING...'}
                  {phase === 'arriving' && 'ARRIVING'}
                  {phase === 'opening' && 'DOORS OPENING'}
                </span>
              </div>
            </div>

            {/* Main Floor Display Area */}
            <div className="px-6 py-8 bg-gradient-to-b from-[#0c0a06]/98 via-[#100e08]/95 to-[#0c0a06]/98">
              {/* Floor Counter Display */}
              <div className="mb-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400/80 mb-2">
                  FROM: {fromFloorLabel} · CURRENT: {currentDisplayFloor}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={phase === 'ascending' ? { y: [-4, 4, -4] } : { y: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <ArrowUp className={`w-10 h-10 ${phase === 'opening' ? 'text-emerald-400' : 'text-orange-400'}`} />
                  </motion.div>
                  <span className="text-6xl sm:text-7xl font-black font-mono bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                    0{toFloorNumber}
                  </span>
                </div>
                <div className="text-xs font-mono text-orange-300/70 mt-1 tracking-widest">
                  FLOOR 0{toFloorNumber} OF 6
                </div>
              </div>

              {/* Animated Floor Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5, 6].map((floor) => (
                  <motion.div
                    key={floor}
                    animate={{
                      scale: floor === toFloorNumber ? 1.4 : 1,
                      backgroundColor: floor <= toFloorNumber
                        ? (floor === toFloorNumber ? '#FB9600' : '#c2410c')
                        : '#1e293b'
                    }}
                    transition={{ duration: 0.3, delay: floor * 0.08 }}
                    className="w-3 h-3 rounded-full border border-orange-500/40"
                  />
                ))}
              </div>

              {/* Destination Department Card */}
              <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-800/50 text-left space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-bold text-orange-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Destination Suite {toDepartmentRoom ? `· Room ${toDepartmentRoom}` : ''}</span>
                </div>
                <div className="text-base font-black text-white leading-tight">
                  {toDepartmentName}
                </div>
                <div className="text-xs text-orange-200/70 font-light flex items-center gap-1.5 pt-0.5">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span>Entering office suite · employees working · wall pinboard</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="px-6 py-4 bg-[#0c0a06]/95 border-t border-orange-900/60">
              <button
                onClick={() => {
                  soundFX.playDoorOpen();
                  onArrived();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 hover:from-orange-400 hover:via-amber-300 hover:to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
              >
                <span>{phase === 'opening' ? 'Stepping Into Office Suite...' : 'Open Doors Now →'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Brand Tag */}
          <div className="mt-5 text-xs font-mono text-orange-400/60 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400/50" />
            <span>CORE 360 ERP · VERTICAL TRANSIT SYSTEM</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
