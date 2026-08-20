import { FLOORS_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface FloorSelectorProps {
  activeFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
}

export function FloorSelector({ activeFloor, onSelectFloor }: FloorSelectorProps) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 font-sans select-none">
      <div className="text-[10px] font-mono uppercase text-amber-400/80 font-bold px-1 mb-1 tracking-widest">
        Elevator Levels
      </div>

      <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
        {FLOORS_CONFIG.slice().reverse().map((fl) => {
          const isSelected = activeFloor === fl.floorNumber;
          return (
            <button
              key={fl.floorNumber}
              onClick={() => {
                soundFX.playClick();
                onSelectFloor(isSelected ? null : fl.floorNumber);
              }}
              className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] opacity-75">
                  {fl.floorNumber === 6 ? 'PH' : `0${fl.floorNumber}`}
                </span>
                <span>{fl.tag}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
