import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error caught by AIVisionsLab ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0C0E] text-[#94a3b8] font-mono flex items-center justify-center p-6 relative">
          <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none z-0" />
          
          <div className="max-w-xl w-full bg-[#0E0F12]/95 border border-red-500/30 p-8 rounded-lg relative z-10 shadow-[0_0_24px_rgba(239,68,68,0.1)]">
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-4 mb-6">
              <div className="p-2 bg-red-500/10 rounded">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div>
                <h1 className="font-sans font-black text-white text-lg tracking-tight uppercase">
                  Runtime Security Protection Intercepted An Exception
                </h1>
                <p className="text-[10px] text-red-400 font-bold tracking-[1px] uppercase mt-0.5">
                  CORE_RECOVERY_ENG_STAGE_30_ACTIVE
                </p>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 font-sans">
              An unexpected client-side scripting error occurred during your laboratory session. The stability guardrails successfully isolated the issue to prevent complete browser collapse.
            </p>

            <div className="bg-[#050506] border border-red-500/10 rounded p-4 font-mono text-[11px] text-red-300 leading-normal overflow-x-auto mb-6">
              <div className="text-[9px] text-red-500 uppercase font-bold tracking-[1px] border-b border-red-500/5 pb-2 mb-2">
                SYSTEM ERROR DUMP:
              </div>
              <p className="font-bold">Message: {this.state.error?.toString()}</p>
              {this.state.errorInfo && (
                <pre className="mt-2 text-[10px] text-red-400/85 whitespace-pre">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 bg-red-600/15 border border-red-500/30 hover:bg-red-600 text-white hover:text-white px-5 py-2.5 rounded text-xs font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.05)] hover:shadow-[0_0_16px_rgba(239,68,68,0.25)]"
              >
                <RefreshCw size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
                REBOOT CORE RECOVERY (HYDRATE)
              </button>
              <button
                onClick={() => { window.location.hash = ""; window.location.href = window.location.origin; }}
                className="flex items-center justify-center bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] text-white px-5 py-2.5 rounded text-xs font-bold transition-all cursor-pointer"
              >
                RETURN TO SYSTEM ROOT
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
