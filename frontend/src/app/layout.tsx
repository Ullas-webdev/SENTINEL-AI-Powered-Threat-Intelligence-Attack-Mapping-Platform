import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentinel AI | Enterprise Threat Platform",
  description: "Advanced AI-Powered Threat Intelligence & Attack Mapping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {/* Premium Background Mesh */}
        <div className="bg-mesh">
          <div className="bg-blob top-0 left-0" />
          <div className="bg-blob-2" />
        </div>

        <div className="flex min-h-screen">
          <Sidebar />
          
          <main className="flex-1 relative flex flex-col min-w-0">
            {/* Top Toolbar / Header */}
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 glass-panel sticky top-0 z-40 bg-transparent">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Global Threat Matrix : Active
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-white uppercase tracking-tighter">System Health</span>
                  <span className="text-[10px] text-emerald-400 font-mono">STABLE - 99.9% UPTIME</span>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400">
                    JD
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 p-10 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>

            <footer className="h-16 border-t border-white/5 flex items-center justify-between px-10 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] bg-transparent">
              <div>&copy; 2026 Sentinel threat intel. all rights reserved.</div>
              <div className="flex gap-10">
                <span>Core Node: US-EAST-1</span>
                <span>Encryption: AES-256-GCM</span>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
