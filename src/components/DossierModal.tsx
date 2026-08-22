import { DOSSIER_FILES } from '../config/presentation.config';
import { soundFX } from '../utils/sound';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface DossierModalProps {
  activeFileId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileId: string) => void;
  onProceedToFloors: () => void;
}

export function DossierModal({
  activeFileId,
  isOpen,
  onClose,
  onSelectFile,
  onProceedToFloors
}: DossierModalProps) {
  const currentFile = DOSSIER_FILES.find(f => f.id === activeFileId) || DOSSIER_FILES[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300 font-sans select-none">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0b0f19] border border-slate-700/80 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden text-slate-100">
        {/* Leather-Bound Top Document Header & File Tabs */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 gap-3 shrink-0">
          {/* File Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {DOSSIER_FILES.map((file) => {
              const isSelected = currentFile.id === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectFile(file.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
                  }`}
                >
                  <span className="font-mono">📁 File {file.fileNumber}:</span>
                  <span>{file.title.split(' ')[0]} {file.title.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Dossier (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossier Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Document Header Title & Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40">
                  📁 {currentFile.id === 'intro' ? 'SECTION 01 · ERP OVERVIEW' : `DOSSIER #${currentFile.fileNumber} · ${currentFile.badge}`}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentFile.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {currentFile.subtitle}
              </p>
            </div>

            {/* Quick Metrics */}
            {currentFile.metrics && (
              <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                {currentFile.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-left sm:text-right min-w-[130px]">
                    <div className="text-xs sm:text-sm font-black text-amber-400">{m.value}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Executive Summary Quote Callout */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/20 text-sm text-slate-300 leading-relaxed backdrop-blur-md">
            <span className="text-amber-400 font-bold mr-2">📌 Executive Brief:</span>
            {currentFile.summary}
          </div>

          {/* Dynamic Sections Based on Dossier File */}
          <div className="space-y-6">
            {currentFile.sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800/60">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{sec.title}</span>
                </h3>

                {sec.content && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {sec.content}
                  </div>
                )}

                {sec.items && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/40 transition-all space-y-2 backdrop-blur-md shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            {currentFile.id === 'problems' ? (
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                            ) : currentFile.id === 'architecture' ? (
                              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span>{item.title}</span>
                          </h4>
                          {item.highlight && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700 shrink-0">
                              {item.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Architecture Special Tech Stack Table for File 4 */}
          {currentFile.id === 'architecture' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Technology Matrix</span>
              </h3>
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/90 text-slate-300 uppercase font-mono text-[11px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Tier</th>
                      <th className="p-3.5">Technology</th>
                      <th className="p-3.5">Engineering Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-white">Frontend</td>
                      <td className="p-3.5 font-mono text-cyan-400">React 18 + TypeScript + Tailwind + Lucide</td>
                      <td className="p-3.5">High-density responsive UI, dark glassmorphism, 3D Canvas scenes</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-white">Backend API</td>
                      <td className="p-3.5 font-mono text-emerald-400">Node.js + Express REST API</td>
                      <td className="p-3.5">Modular controllers, middleware pipelines, and validation handlers</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-white">Database</td>
                      <td className="p-3.5 font-mono text-purple-400">MongoDB + Mongoose</td>
                      <td className="p-3.5">Indexed schemas, document population, and atomic transactions</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-white">Security & Auth</td>
                      <td className="p-3.5 font-mono text-amber-400">JWT + Bcrypt + RBAC + Helmet</td>
                      <td className="p-3.5">Granular role permissions, password hashing, and rate limiting</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-white">DevOps & Infra</td>
                      <td className="p-3.5 font-mono text-blue-400">Docker + GitHub Actions CI/CD</td>
                      <td className="p-3.5">Automated linting, test suites, and containerized deployments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Dossier Footer with Next Steps */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 border-t border-slate-800 gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>
              {currentFile.id === 'intro' ? 'SECTION 01 • ERP OVERVIEW' : `FILE ${currentFile.fileNumber} OF ${DOSSIER_FILES.length} · COMPLETE SPECIFICATION`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
            >
              Return to Reception Desk
            </button>

            <button
              onClick={() => {
                soundFX.playTransition();
                onProceedToFloors();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Explore ERP Modules (1–6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
