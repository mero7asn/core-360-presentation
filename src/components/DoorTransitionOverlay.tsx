import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundFX } from '../utils/sound';
import type { DepartmentConfig } from '../config/presentation.config';
import { PROJECT_METADATA } from '../config/presentation.config';

interface DoorTransitionOverlayProps {
  department: DepartmentConfig;
  isOpen: boolean;
  onTransitionComplete: () => void;
}

export function DoorTransitionOverlay({ department, isOpen, onTransitionComplete }: DoorTransitionOverlayProps) {
  const [stage, setStage] = useState<'approaching' | 'scanning' | 'unlocking' | 'opening' | 'entering'>('approaching');

  useEffect(() => {
    if (!isOpen) return;

    soundFX.playTransition();

    const t1 = setTimeout(() => {
      setStage('scanning');
      soundFX.playClick();
    }, 400);

    const t2 = setTimeout(() => {
      setStage('unlocking');
      soundFX.playDoorOpen();
    }, 1100);

    const t3 = setTimeout(() => {
      setStage('opening');
    }, 1700);

    const t4 = setTimeout(() => {
      setStage('entering');
    }, 2400);

    const t5 = setTimeout(() => {
      onTransitionComplete();
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      setStage('approaching');
    };
  }, [isOpen, onTransitionComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden bg-slate-950/80 backdrop-blur-md"
      >
        {/* Left Heavy Sliding Security Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: stage === 'opening' || stage === 'entering' ? '-100%' : '0%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 border-r-2 border-amber-500/40 shadow-2xl flex items-center justify-end pr-12"
        >
          {/* Mechanical Door Texture Lines */}
          <div className="space-y-4 opacity-40">
            <div className="w-48 h-1 bg-amber-500/30 rounded-full" />
            <div className="w-64 h-1 bg-amber-500/30 rounded-full" />
            <div className="w-32 h-1 bg-amber-500/30 rounded-full" />
          </div>
        </motion.div>

        {/* Right Heavy Sliding Security Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: stage === 'opening' || stage === 'entering' ? '100%' : '0%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-950 via-slate-900 to-slate-800 border-l-2 border-amber-500/40 shadow-2xl flex items-center justify-start pl-12"
        >
          {/* Mechanical Door Texture Lines */}
          <div className="space-y-4 opacity-40">
            <div className="w-48 h-1 bg-amber-500/30 rounded-full" />
            <div className="w-64 h-1 bg-amber-500/30 rounded-full" />
            <div className="w-32 h-1 bg-amber-500/30 rounded-full" />
          </div>
        </motion.div>

        {/* Central High-Tech Portal Scanner & Telemetry Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: stage === 'entering' ? 2.5 : 1, opacity: stage === 'entering' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 p-8 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl shadow-amber-950/80 max-w-md w-full text-center backdrop-blur-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border bg-amber-950/60 text-amber-400 border-amber-500/30">
            <span>Floor {department.floor}</span>
            <span>•</span>
            <span>Room {department.roomNumber}</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            {department.name}
          </h2>
          <p className="text-xs text-slate-400 font-mono mb-6">
            SEC-PORTAL::{department.code} // AUTHORIZED ACCESS
          </p>

          {/* Access Status Indicator */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            {stage === 'approaching' && (
              <div className="flex items-center gap-3 text-amber-400">
                <LogIn className="w-6 h-6 animate-pulse" />
                <span className="text-sm font-medium tracking-wide">Approaching Department Portal...</span>
              </div>
            )}

            {stage === 'scanning' && (
              <div className="flex flex-col items-center gap-2 text-amber-400">
                <Lock className="w-6 h-6 animate-bounce" />
                <span className="text-sm font-medium tracking-wide">Verifying Biometric & Role Permissions...</span>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-amber-400"
                  />
                </div>
              </div>
            )}

            {(stage === 'unlocking' || stage === 'opening' || stage === 'entering') && (
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wide">Access Granted. Entering Presentation...</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>READY STATE: OK</span>
            <span className="flex items-center gap-1 text-amber-400 font-sans font-medium">
              {PROJECT_METADATA.projectName} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
