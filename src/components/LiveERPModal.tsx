import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import type { DepartmentConfig } from '../config/presentation.config';
import { ERP_BASE_URL, PRESENTATION_DATA_MODE } from '../config/presentation.config';
import { soundFX } from '../utils/sound';

interface LiveERPModalProps {
  department: DepartmentConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveERPModal({ department, isOpen, onClose }: LiveERPModalProps) {
  const [connectingState, setConnectingState] = useState<'handshake' | 'session' | 'live'>('handshake');
  const [activeTab, setActiveTab] = useState<'preview' | 'deeplink' | 'api'>('preview');

  useEffect(() => {
    if (!isOpen) return;

    const t1 = setTimeout(() => setConnectingState('session'), 600);
    const t2 = setTimeout(() => setConnectingState('live'), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      setConnectingState('handshake');
    };
  }, [isOpen]);

  if (!isOpen || !department) return null;

  const configuredUrl = ERP_BASE_URL || department.liveErp.url;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="w-full max-w-5xl h-[85vh] bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        >
          {/* Header Bar */}
          <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono text-slate-300 ml-2 font-bold">
                SUPER ERP LIVE INSTANCE GATEWAY
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-500/30">
                {department.liveErp.moduleName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={configuredUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
              >
                <span>Launch in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-Header Tabs */}
          <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'preview' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Direct ERP Preview (Iframe/Sandbox)
              </button>
              <button
                onClick={() => setActiveTab('deeplink')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'deeplink' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Deep-Link URI Schema
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'api' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Telemetry API Stream
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{PRESENTATION_DATA_MODE === 'live' ? 'ERP CONNECTION CONFIGURED' : 'DEMO GATEWAY READY'}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
            {connectingState !== 'live' ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
                <div className="text-center">
                  <h3 className="text-base font-bold text-white">
                    {connectingState === 'handshake'
                      ? 'Preparing gateway to the configured ERP...'
                      : 'Authenticating Executive Presentation Token...'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    TARGET: {department.liveErp.url}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'preview' && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-slate-800 rounded-xl bg-slate-900/40 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
                      <ExternalLink className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">
                      {PRESENTATION_DATA_MODE === 'live' ? 'Live ERP Module Ready' : 'ERP Module Presentation Gateway'}
                    </h3>

                    <p className="text-sm text-slate-300 max-w-lg mb-6">
                      Click below to leave the presentation layer and open the configured <strong className="text-cyan-400">{department.name}</strong> ERP suite.
                    </p>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs text-slate-300 max-w-lg w-full mb-6 space-y-1">
                      <div className="text-slate-500">// Direct Single-Sign-On Route</div>
                      <div className="text-cyan-400 break-all">{configuredUrl}{department.liveErp.deepLinkRoute}</div>
                      <div className="text-slate-500 mt-2">// Context Record Payload</div>
                      <div className="text-amber-400">SESSION_CONTEXT: {department.liveErp.demoRecordId}</div>
                    </div>

                    <a
                      href={configuredUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transform hover:scale-105 transition-all"
                    >
                      <span>{PRESENTATION_DATA_MODE === 'live' ? 'LAUNCH LIVE ERP SUITE' : 'OPEN CONFIGURED ERP URL'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {activeTab === 'deeplink' && (
                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-bold text-slate-300 mb-2">Deep-Link URL Scheme Architecture</div>
                      <pre className="p-4 rounded-lg bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto">
                        {`// Executive Deep Link Schema
{
  "protocol": "supererp://",
  "endpoint": "${department.liveErp.deepLinkRoute}",
  "department": "${department.id}",
  "targetRecord": "${department.liveErp.demoRecordId}",
  "authStrategy": "OIDC_SAML_EXECUTIVE_DELEGATE",
  "timestamp": "${new Date().toISOString()}"
}`}
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-bold text-slate-300 mb-2">Live REST/GraphQL Telemetry Query</div>
                      <pre className="p-4 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto">
                        {`query GetDepartmentExecutiveKPIs {
  department(code: "${department.code}") {
    name
    activeLedgers
    realTimeKpis {
      headlineMetric: "${department.hero.statValue}"
      variance: "${department.hero.statChange}"
      status: "SYNCHRONIZED"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Bottom Status Info */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                {PRESENTATION_DATA_MODE === 'live' ? 'ERP Connection Configured' : 'Presentation Data · Demo'}
              </span>
              <span>TOKEN EXPIRES IN 59:40</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
