import { useState, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { DEPARTMENTS_CONFIG } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDepartment: (deptId: string) => void;
  onSelectFloor: (floorNum: number) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onSelectDepartment }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDepts = DEPARTMENTS_CONFIG.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.code.toLowerCase().includes(query.toLowerCase()) ||
      d.features.some(f => f.title.toLowerCase().includes(query.toLowerCase()) || f.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))) ||
      d.kpis.some(k => k.label.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Search ERP modules, features (e.g. Payroll, Invoices, Stock), KPIs or floors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-slate-500 font-sans"
          />
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-2 py-1">
            Department Suites
          </div>

          {filteredDepts.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                soundFX.playClick();
                onSelectDepartment(d.id);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {d.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    Floor {d.floor} • Room {d.roomNumber}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {d.hero.subtitle}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </button>
          ))}

          {filteredDepts.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching modules or features found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Press ESC to close</span>
          <span>Navigation: Quick Jump Mode</span>
        </div>
      </div>
    </div>
  );
}
