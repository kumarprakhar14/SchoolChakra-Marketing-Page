import { ThemeProvider, TenantProvider, UIProvider, useTheme } from './contexts';
import { RouterProvider, useRouter } from './router';
import { Navbar, Footer, PilotModal } from './components/sections';
import { useGoogleFonts } from './hooks';
import {
  HomePage,
  FeaturesPage,
  SolutionsPage,
  PricingPage,
  SecurityPage,
  DemoPage,
  GettingStartedPage,
  PilotProgramPage,
  ContactPage,
  AboutPage,
  ResourcesPage,
  ChangelogPage,
  HelpPage,
  NotFoundPage,
} from './pages';

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

function RouteView() {
  const { pathname } = useRouter();

  switch (pathname) {
    case '/':
      return <HomePage />;
    case '/features':
      return <FeaturesPage />;
    case '/solutions':
      return <SolutionsPage />;
    case '/pricing':
      return <PricingPage />;
    case '/security':
      return <SecurityPage />;
    case '/demo':
      return <DemoPage />;
    case '/getting-started':
      return <GettingStartedPage />;
    case '/pilot-program':
      return <PilotProgramPage />;
    case '/contact':
      return <ContactPage />;
    case '/about':
      return <AboutPage />;
    case '/resources':
      return <ResourcesPage />;
    case '/changelog':
      return <ChangelogPage />;
    case '/help':
      return <HelpPage />;
    default:
      return <NotFoundPage />;
  }
}

function PageShell() {
  useGoogleFonts();

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased relative overflow-x-clip flex flex-col">
      <AtmosphericWash />

      <Navbar />
      <main className="flex-1">
        <RouteView />
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
          <RouterProvider>
            <PageShell />
          </RouterProvider>
        </UIProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}
