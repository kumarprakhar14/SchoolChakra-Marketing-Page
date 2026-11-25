import { ThemeProvider, TenantProvider, UIProvider, useTheme } from './contexts';
import {
  Navbar,
  Hero,
  Problem,
  RoleSwitcher,
  BentoGrid,
  Architecture,
  FAQ,
  Pilot,
  Footer,
  PilotModal,
} from './components/sections';
import { useGoogleFonts } from './hooks';

function AtmosphericWash() {
  const { theme } = useTheme();

  return (
    <div
      className="pointer-events-none absolute top-0 inset-x-0 h-[720px] transition-colors duration-700"
      style={{
        background: `radial-gradient(65% 55% at 50% 0%, ${theme.lightBg} 0%, rgba(255, 255, 255, 0) 100%)`,
      }}
    />
  );
}

function PageShell() {
  useGoogleFonts();

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased relative overflow-x-clip">
      <AtmosphericWash />

      <Navbar />
      <main>
        <Hero />
        <Problem />
        <RoleSwitcher />
        <BentoGrid />
        <Architecture />
        <FAQ />
        <Pilot />
      </main>
      <Footer />
      <PilotModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <UIProvider>
          <PageShell />
        </UIProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}
