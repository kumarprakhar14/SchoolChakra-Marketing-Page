import {
  Hero,
  Problem,
  RoleSwitcher,
  BentoGrid,
  Architecture,
  FAQ,
  Pilot,
} from '../components/sections';

export function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <RoleSwitcher />
      <BentoGrid />
      <Architecture />
      <FAQ />
      <Pilot />
    </>
  );
}
