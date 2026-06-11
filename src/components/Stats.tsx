import React from 'react';
import { LOCALES } from '../translations';

interface StatsProps {
  currentLang: string;
}

export const Stats: React.FC<StatsProps> = ({ currentLang }) => {
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  return (
    <div className="stats" id="telemetry-stats-grid">
      <div className="stat-card">
        <div className="stat-lbl" id="stat-gpu-lbl">
          {dict['stat-gpu-lbl'] || 'MOTOR GPU'}
        </div>
        <div className="stat-val">Vulkan SDK / llama.cpp</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-lbl" id="stat-vram-lbl">
          {dict['stat-vram-lbl'] || 'VRAM'}
        </div>
        <div className="stat-val">8GB Polaris (AMD RX 580)</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-lbl" id="stat-cpu-lbl">
          {dict['stat-cpu-lbl'] || 'CPU RENDER'}
        </div>
        <div className="stat-val">Intel Xeon E5-2690v3</div>
      </div>
      
      <div className="stat-card active-node">
        <div className="stat-lbl" id="stat-status-lbl">
          {dict['stat-status-lbl'] || 'STATUS'}
        </div>
        <div className="stat-val" id="stat-status-val">
          {dict['stat-status-val'] || 'Produção'}
        </div>
      </div>
    </div>
  );
};
