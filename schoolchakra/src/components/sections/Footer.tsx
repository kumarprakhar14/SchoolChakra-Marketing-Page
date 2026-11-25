import { useTheme } from '../../contexts';
import { useUI } from '../../contexts';

export function Footer() {
  const { theme } = useTheme();
  const { openPilotModal } = useUI();

  return (
    <footer className="border-t border-slate-200 bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: theme.hex }}
          >
            S
          </div>
          <span className="font-bold text-slate-900">SchoolChakra</span>
          <span>• School ERP for fees, attendance, and timetables.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2.5">
          <a href="#roles" className="hover:text-slate-900">For Every Role</a>
          <a href="#bento" className="hover:text-slate-900">CSV &amp; UPI Workflows</a>
          <button onClick={openPilotModal} className="hover:text-slate-900 cursor-pointer">Apply for the Founding Pilot</button>
          <span className="font-mono text-slate-400">© 2026 SchoolChakra</span>
        </div>
      </div>
    </footer>
  );
}