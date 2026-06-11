import React, { useState } from 'react';
import { LOCALES } from '../translations';

interface GuerrillaPanelProps {
  currentLang: string;
  onShowToast: (text: string) => void;
}

export const GuerrillaPanel: React.FC<GuerrillaPanelProps> = ({ currentLang, onShowToast }) => {
  const [qrOpen, setQrOpen] = useState(false);
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  // Handle copy url
  const handleCopyLink = () => {
    const shareUrl = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        const labels: Record<string, string> = {
          'pt-BR': 'LINK COPIADO!',
          'en': 'LINK COPIED!',
          'es': '¡ENLACE COPIADO!',
          'fr': 'LIEN COPIÉ!',
          'ar': 'تم نسخ الرابط!'
        };
        onShowToast(labels[currentLang] || labels['pt-BR']);
      })
      .catch(() => {
        // Fallback
        const temp = document.createElement('input');
        temp.value = shareUrl;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        
        const labels: Record<string, string> = {
          'pt-BR': 'LINK COPIADO!',
          'en': 'LINK COPIED!',
          'es': '¡ENLACE COPIADO!',
          'fr': 'LIEN COPIÉ!',
          'ar': 'تم نسخ الرابط!'
        };
        onShowToast(labels[currentLang] || labels['pt-BR']);
      });
  };

  // Handle local HTML export
  const handleDownloadOffline = () => {
    const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RX580_IA_LOCAL_MASTER_UNIFICADA_2026.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const labels: Record<string, string> = {
      'pt-BR': 'GUIA SALVO OFFLINE! (.HTML)',
      'en': 'GUIDE SAVED OFFLINE! (.HTML)',
      'es': '¡GUÍA GUARDADA OFFLINE!',
      'fr': 'GUIDE BIEN SAUVEGARDÉ!',
      'ar': 'تم حفظ الدليل!'
    };
    onShowToast(labels[currentLang] || labels['pt-BR']);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : 'https://setup-ia-local-rx580-vulkan.web.app';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="guerrilla-panel" id="guerrilla-distribution">
      <div className="guerrilla-header">
        <span className="guerrilla-title">
          {dict['share-guerrilla-title'] || 'Guerrilha & Distribuição Livre SOTA'}
        </span>
        <p className="guerrilla-desc text-xs text-slate-400 mt-1">
          {dict['share-guerrilla-desc'] || 'Este conhecimento pertence à humanidade. Burle a obsolescência planejada e ajude a democratizar a Inteligência Artificial local offline.'}
        </p>
      </div>

      <div className="guerrilla-grid">
        <button className="g-btn" onClick={handleCopyLink} id="g-btn-copy">
          <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span>{dict['btn-copy-link'] || 'Copiar Link Autônomo'}</span>
        </button>

        <button className="g-btn" onClick={handleDownloadOffline} id="g-btn-html">
          <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span>{dict['btn-offline-html'] || 'Baixar Guia Offline (.HTML) 💾'}</span>
        </button>

        <button className="g-btn" onClick={handlePrint} id="g-btn-pdf">
          <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>{dict['btn-pdf-print'] || 'Gerar PDF / Imprimir 🖨️'}</span>
        </button>

        <button className="g-btn" onClick={() => setQrOpen(!qrOpen)} id="g-btn-qr">
          <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span>{dict['btn-qr-code'] || 'QR Code p/ Workshops 📱'}</span>
        </button>
      </div>

      <div className={`qr-container ${qrOpen ? 'open' : ''}`} id="qr-code-container">
        {qrOpen && (
          <>
            <img src={qrUrl} width="160" height="160" alt="Workshops QR Code Link" referrerPolicy="no-referrer" />
            <p className="qr-text" id="qr-code-text">
              {dict['qr-code-text'] || 'Escaneie para abrir o guia instantaneamente em dispositivos móveis durante laboratórios presenciais.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
