import { DEPARTMENTS_CONFIG, PRESENTATION_DATA_MODE } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface WholeOrgExperienceProps {
  onBackToPresentation: () => void;
  onProceedToOutro?: () => void;
}

export function WholeOrgExperience({ onBackToPresentation }: WholeOrgExperienceProps) {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src="/erp_exterior_hq_1787220368979.jpg"
          alt="Corporate HQ"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.2) saturate(1.1)' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#030712]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 shrink-0">
          <button
            onClick={() => {
              soundFX.playClick();
              onBackToPresentation();
            }}
            className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer hover:bg-white/5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            Back
          </button>

          <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] font-mono-tight text-cyan-300/70 tracking-wider uppercase">
              {PRESENTATION_DATA_MODE === 'live' ? 'Live ERP Data Connected' : 'Organization Overview · Demo Data'}
            </span>
          </div>
        </header>

        {/* Center climax content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
          <div className="max-w-4xl text-center">
            <div className="anim-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] font-mono-tight tracking-wider uppercase mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              <span className="text-gradient-gold">The Unified Vision</span>
            </div>

            <h1 className="anim-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
              <span className="text-white">ONE ORGANIZATION.</span>
              <br />
              <span className="text-gradient">ONE SYSTEM.</span>
            </h1>

            <p className="anim-fade-in-up delay-200 text-base sm:text-lg text-slate-400/80 font-light leading-relaxed max-w-xl mx-auto mb-12">
              From the warehouse floor to the boardroom,{' '}
              <span className="text-white font-medium">SUPER ERP</span>{' '}
              eliminates silos and synchronizes every department into a single source of truth.
            </p>

            {/* Department cards grid */}
            <div className="anim-fade-in-up delay-300 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {DEPARTMENTS_CONFIG.map((dept, i) => (
                <div
                  key={dept.id}
                  className="glass-card rounded-xl overflow-hidden text-left group"
                  style={{ animationDelay: `${300 + i * 80}ms` }}
                >
                  {/* Mini room image */}
                  <div className="h-24 relative overflow-hidden">
                    <img
                      src={dept.realisticRoomImage}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <div className="text-[9px] font-mono-tight text-slate-500 uppercase">{dept.code}</div>
                      <div className="text-xs font-bold text-white truncate">{dept.name.split('&')[0]}</div>
                    </div>
                  </div>

                  {/* KPI */}
                  <div className="p-3">
                    <div className="text-lg font-black font-mono-tight" style={{ color: dept.accentColor }}>
                      {dept.hero.statValue}
                    </div>
                    <div className="text-[9px] font-mono-tight text-slate-500 uppercase">
                      {dept.hero.statHeadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Unified metrics banner */}
            <div className="anim-fade-in-up delay-500 mt-8 glass-card rounded-2xl p-5 max-w-3xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Departments Connected', value: '6', color: 'text-cyan-400' },
                  { label: 'Consolidated Revenue', value: '$34.8M', color: 'text-emerald-400' },
                  { label: 'Workforce', value: '1,480', color: 'text-purple-400' },
                  { label: 'System Uptime', value: '99.998%', color: 'text-amber-400' },
                ].map((m, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-xl sm:text-2xl font-black font-mono-tight ${m.color}`}>
                      {m.value}
                    </div>
                    <div className="text-[9px] font-mono-tight text-slate-500 uppercase tracking-wider">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 px-8 pb-6">
          <div className="max-w-3xl mx-auto glass rounded-xl px-4 py-2.5 flex items-center justify-between text-[10px] font-mono-tight text-slate-500/60">
            <span>SUPER ERP ENTERPRISE PLATFORM v7.4</span>
            <span>{PRESENTATION_DATA_MODE === 'live' ? 'LIVE SUITES SYNCHRONIZED' : 'PRESENTATION METRICS · DEMO DATA'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
