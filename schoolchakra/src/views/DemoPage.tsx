import { ArrowRight, MonitorPlay } from 'lucide-react';
import { Link } from '../router';
import { Button } from '../components/ui';
import {
  CTASection,
  PageHero,
  PilotTriggerButton,
  SectionHeader,
} from '../components/shared';
import { DemoWorkspaceProvider } from '../components/demo/DemoWorkspaceContext';
import { DemoCanvasIsland } from '../components/demo/DemoCanvasIsland';
import { DemoRoleExplorer } from '../components/demo/DemoRoleExplorer';

export function DemoPage() {
  return (
    <DemoWorkspaceProvider>
      <PageHero
        eyebrow="INTERACTIVE PRODUCT DEMO"
        eyebrowIcon={<MonitorPlay className="w-3.5 h-3.5" />}
        title={
          <>
            See how your school could work with{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              SchoolChakra.
            </span>
          </>
        }
        description="Explore the different workspaces and experience how everyday school operations come together."
        actions={
          <>
            <PilotTriggerButton
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Apply for Founding Pilot
            </PilotTriggerButton>
            <Link to="/features">
              <Button variant="outline" size="lg">
                View All Features
              </Button>
            </Link>
          </>
        }
      >
        {/* Section 1: Interactive Demo Canvas (Primary Focus) */}
        <div id="interactive-demo-canvas" className="max-w-7xl mx-auto">
          <div className="p-2 sm:p-3 bg-slate-100/90 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.10)]">
            <DemoCanvasIsland />
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">
            Sample school data shown for demonstration. Switch tenants, brand themes, and modules in the top bar and sidebar.
          </p>
        </div>
      </PageHero>

      {/* Section 2: What to Explore */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="WHAT TO EXPLORE"
            title="Explore all four customer-facing roles"
            description="Inspect Administrator and Accounts views directly in the interactive canvas above, or preview Teacher and Student workspaces below."
            align="center"
          />

          <DemoRoleExplorer />
        </div>
      </section>

      <CTASection
        eyebrow="PRIVATE SCHOOL WALKTHROUGH"
        title="Ready to bring SchoolChakra to your school?"
        description="Apply for the Founding Pilot to get a private walkthrough configured with your school's branding."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="Contact Team"
        secondaryTo="/contact"
        surface="white"
      />
    </DemoWorkspaceProvider>
  );
}
