import { Building2, ChevronRight } from 'lucide-react';
import { DEPARTMENTS_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface ReceptionDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDepartment: (deptId: string) => void;
}

export function ReceptionDirectory({ isOpen, onClose, onSelectDepartment }: ReceptionDirectoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-6 z-30 w-84 max-h-[75vh] overflow-y-auto p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            RECEPTION DIRECTORY
          </h3>
          <p className="text-[11px] text-slate-400">Headquarters Floor Index</p>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
        >
          Close
        </button>
      </div>

      <div className="space-y-3">
        {DEPARTMENTS_CONFIG.map((dept) => (
          <button
            key={dept.id}
            onClick={() => {
              soundFX.playClick();
              onSelectDepartment(dept.id);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/30">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {dept.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Floor {dept.floor} • Room {dept.roomNumber}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
