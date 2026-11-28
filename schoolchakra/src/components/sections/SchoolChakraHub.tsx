'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../contexts';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface SchoolChakraHubProps {
  className?: string;
  style?: React.CSSProperties;
  viewBox?: string;
}

export function SchoolChakraHub({
  className = '',
  style,
  viewBox = '35 75 570 405',
}: SchoolChakraHubProps) {
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [animStatus, setAnimStatus] = useState<'idle' | 'playing' | 'done'>('idle');
  const effectiveStatus = prefersReducedMotion ? 'done' : animStatus;

  useEffect(() => {
    if (effectiveStatus === 'done') return;

    const el = svgRef.current;
    if (!el) return;

    // Trigger animation when the SVG is 70% into the viewport
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: () => {
        const height = el.getBoundingClientRect().height;
        return `top+=${Math.min(height * 0.7, window.innerHeight * 0.7)}px bottom`;
      },
      once: true,
      onEnter: () => {
        setAnimStatus('playing');
      },
    });

    return () => {
      trigger.kill();
    };
  }, [effectiveStatus]);

  useEffect(() => {
    if (effectiveStatus === 'playing') {
      const timer = setTimeout(() => {
        setAnimStatus('done');
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [effectiveStatus]);

  const stateClass =
    effectiveStatus === 'idle'
      ? 'sc-state-idle'
      : effectiveStatus === 'playing'
      ? 'sc-state-playing'
      : 'sc-state-done';

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className={`sc-root ${stateClass} ${className}`.trim()}
      viewBox={viewBox}
      role="img"
      aria-label="SchoolChakra replaces scattered school tools"
      style={{
        ...((theme?.hex ? { '--sc-primary': theme.hex } : {}) as React.CSSProperties),
        ...style,
      }}
    >
      <title>SchoolChakra replaces scattered school tools</title>
      <desc>
        Five disconnected tools (paper registers, Excel fee sheets, a wall timetable, chat-group notices and separate user lists)
        flow into one SchoolChakra dashboard, which then shows attendance, fees, timetable, users and notices in sync.
      </desc>
      <style>{`
.sc-root{--_p:var(--sc-primary,#2563eb);--_s:var(--sc-surface,#ffffff);--_b:var(--sc-border,#e2e8f0);--_i:var(--sc-ink,#0f172a);--_m:var(--sc-muted,#64748b);--_ok:var(--sc-success,#16a34a);--_dg:var(--sc-danger,#ef4444);display:block;width:100%;height:auto;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
.sc-panel{fill:var(--_s);stroke:var(--_b)}
.sc-shadow{filter:drop-shadow(0 10px 24px rgba(15,23,42,.10))}
.sc-tile,.sc-chip{fill:#eff6ff;stroke:#bfdbfe;stroke-width:1}
.sc-track{fill:#dbe4f0}
.sc-div{fill:var(--_b)}
.sc-cellbase{fill:#dbe4f0}
.sc-cellon{fill:var(--_p)}
.sc-pfill{fill:var(--_p)}
.sc-okfill{fill:var(--_ok)}
.sc-dgfill{fill:var(--_dg)}
.sc-pill{fill:var(--_s);stroke:var(--_b)}
.sc-lab{font-size:8.5px;font-weight:600;letter-spacing:.06em;fill:var(--_m)}
.sc-val{font-size:20px;font-weight:700;fill:var(--_i);font-variant-numeric:tabular-nums}
.sc-pendtxt{font-size:20px;font-weight:700;fill:var(--_m)}
.sc-note{font-size:13px;font-weight:700;fill:var(--_i)}
.sc-sm{font-size:8.5px;fill:var(--_m)}
.sc-brand{font-size:11px;font-weight:700;fill:var(--_i)}
.sc-role{font-size:10px;font-weight:600;fill:var(--_i)}
.sc-tag{font-size:9.5px;font-weight:500;fill:var(--_m);text-anchor:middle}
.sc-cap{font-size:12px;font-weight:600;fill:var(--_i)}
.sc-capE{font-size:14px;font-weight:700;fill:var(--_p)}
.sc-ln{fill:none;stroke:var(--_p);stroke-width:1.3;opacity:0}
.sc-dot{fill:none;stroke:var(--_p);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:2 98;opacity:0}
.sc-hl{fill:var(--_p);fill-opacity:.07;stroke:var(--_p);stroke-width:1.6}
.sc-glow{fill:none;stroke:var(--_p);stroke-width:6;stroke-opacity:.16}
.sc-pulse{fill:none;stroke:var(--_p);stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center}
.sc-cam{transform-origin:0 0;transform:translate(320px,277.5px) scale(1.35) translate(-320px,-225px)}
.sc-fly0,.sc-fly1,.sc-fly2,.sc-fly3,.sc-fly4{opacity:0}
.sc-bar{transform-box:fill-box;transform-origin:left center;transform:scaleX(.9)}
.sc-hl-att,.sc-hl-fee,.sc-hl-tt,.sc-hl-usr,.sc-hl-not{opacity:0}
.sc-pend-att,.sc-pend-fee,.sc-pend-usr{opacity:0}
.sc-live-att,.sc-live-fee,.sc-live-usr{opacity:1}
.sc-sending{opacity:0}
.sc-sent{opacity:1}
.sc-clash{opacity:1}
.sc-chk{opacity:1}
.sc-cap-A,.sc-cap-B,.sc-cap-C,.sc-cap-D{opacity:0}
.sc-cap-E{opacity:1}
.sc-role-0{opacity:1}
.sc-role-1,.sc-role-2,.sc-role-3{opacity:0}
/* Reduced motion: show the final, zoomed state with no animation */

/* Idle State: waiting offscreen before reaching 70% in viewport */
.sc-state-idle .sc-cam{transform:translate(320px,277.5px) scale(1) translate(-320px,-277.5px)}
.sc-state-idle .sc-fly0,.sc-state-idle .sc-fly1,.sc-state-idle .sc-fly2,.sc-state-idle .sc-fly3,.sc-state-idle .sc-fly4{opacity:1;transform:translate(0px,0px) scale(1)}
.sc-state-idle .sc-live-att,.sc-state-idle .sc-live-fee,.sc-state-idle .sc-live-usr{opacity:0}
.sc-state-idle .sc-pend-att,.sc-state-idle .sc-pend-fee,.sc-state-idle .sc-pend-usr{opacity:1}
.sc-state-idle .sc-bar{transform:scaleX(0)}
.sc-state-idle .sc-sent{opacity:0}
.sc-state-idle .sc-chk{opacity:0}
.sc-state-idle .sc-clash{opacity:0}
.sc-state-idle .sc-sending{opacity:0}
.sc-state-idle .sc-cellon{opacity:0}
.sc-state-idle .sc-cap-E{opacity:0}
.sc-state-idle .sc-cap-A{opacity:1}

@media (prefers-reduced-motion: reduce){
  .sc-cam{transform:translate(320px,277.5px) scale(1.35) translate(-320px,-225px)}
}

@media (prefers-reduced-motion: no-preference){
@keyframes sc-cam{0%,47%{transform:translate(320px,277.5px) scale(1) translate(-320px,-277.5px)}58%,100%{transform:translate(320px,277.5px) scale(1.35) translate(-320px,-225px)}}
  @keyframes sc-fly0{0%{opacity:0;transform:translate(0px,0px) scale(1)}2.5%{opacity:1;transform:translate(0px,0px) scale(1)}25%{opacity:1;transform:translate(0px,0px) scale(1);animation-timing-function:cubic-bezier(.55,0,.8,.45)}31.25%{opacity:1;transform:translate(197.2px,82.5px) scale(.6)}33.33%,100%{opacity:0;transform:translate(232.0px,97.0px) scale(.25)}}
  @keyframes sc-dr0{0%{transform:translate(0px,0px) rotate(-4deg)}35%{transform:translate(5px,-4px) rotate(0deg)}70%{transform:translate(-3.0px,-3.2px) rotate(-8deg)}100%{transform:translate(0px,0px) rotate(-4deg)}}
  @keyframes sc-dot0{0%{opacity:0;stroke-dashoffset:0}25%{opacity:0;stroke-dashoffset:0}25.83%{opacity:1;stroke-dashoffset:0}32.5%{opacity:1;stroke-dashoffset:-98}33.33%,100%{opacity:0;stroke-dashoffset:-98}}
  @keyframes sc-fly1{0%{opacity:0;transform:translate(0px,0px) scale(1)}2.5%{opacity:1;transform:translate(0px,0px) scale(1)}28.33%{opacity:1;transform:translate(0px,0px) scale(1);animation-timing-function:cubic-bezier(.55,0,.8,.45)}34.58%{opacity:1;transform:translate(-197.2px,82.5px) scale(.6)}36.67%,100%{opacity:0;transform:translate(-232.0px,97.0px) scale(.25)}}
  @keyframes sc-dr1{0%{transform:translate(0px,0px) rotate(3deg)}35%{transform:translate(-4px,5px) rotate(0deg)}70%{transform:translate(2.4px,4.0px) rotate(6deg)}100%{transform:translate(0px,0px) rotate(3deg)}}
  @keyframes sc-dot1{0%{opacity:0;stroke-dashoffset:0}28.33%{opacity:0;stroke-dashoffset:0}29.17%{opacity:1;stroke-dashoffset:0}35.83%{opacity:1;stroke-dashoffset:-98}36.67%,100%{opacity:0;stroke-dashoffset:-98}}
  @keyframes sc-fly2{0%{opacity:0;transform:translate(0px,0px) scale(1)}2.5%{opacity:1;transform:translate(0px,0px) scale(1)}31.67%{opacity:1;transform:translate(0px,0px) scale(1);animation-timing-function:cubic-bezier(.55,0,.8,.45)}37.92%{opacity:1;transform:translate(197.2px,-63.8px) scale(.6)}40%,100%{opacity:0;transform:translate(232.0px,-75.0px) scale(.25)}}
  @keyframes sc-dr2{0%{transform:translate(0px,0px) rotate(2deg)}35%{transform:translate(4px,4px) rotate(4deg)}70%{transform:translate(-2.4px,3.2px) rotate(0deg)}100%{transform:translate(0px,0px) rotate(2deg)}}
  @keyframes sc-dot2{0%{opacity:0;stroke-dashoffset:0}31.67%{opacity:0;stroke-dashoffset:0}32.5%{opacity:1;stroke-dashoffset:0}39.17%{opacity:1;stroke-dashoffset:-98}40%,100%{opacity:0;stroke-dashoffset:-98}}
  @keyframes sc-fly3{0%{opacity:0;transform:translate(0px,0px) scale(1)}2.5%{opacity:1;transform:translate(0px,0px) scale(1)}35%{opacity:1;transform:translate(0px,0px) scale(1);animation-timing-function:cubic-bezier(.55,0,.8,.45)}41.25%{opacity:1;transform:translate(-197.2px,-63.8px) scale(.6)}43.33%,100%{opacity:0;transform:translate(-232.0px,-75.0px) scale(.25)}}
  @keyframes sc-dr3{0%{transform:translate(0px,0px) rotate(-3deg)}35%{transform:translate(-5px,-3px) rotate(-5deg)}70%{transform:translate(3.0px,-2.4px) rotate(-1deg)}100%{transform:translate(0px,0px) rotate(-3deg)}}
  @keyframes sc-dot3{0%{opacity:0;stroke-dashoffset:0}35%{opacity:0;stroke-dashoffset:0}35.83%{opacity:1;stroke-dashoffset:0}42.5%{opacity:1;stroke-dashoffset:-98}43.33%,100%{opacity:0;stroke-dashoffset:-98}}
  @keyframes sc-fly4{0%{opacity:0;transform:translate(0px,0px) scale(1)}2.5%{opacity:1;transform:translate(0px,0px) scale(1)}38.33%{opacity:1;transform:translate(0px,0px) scale(1);animation-timing-function:cubic-bezier(.55,0,.8,.45)}44.58%{opacity:1;transform:translate(0.0px,-158.9px) scale(.6)}46.67%,100%{opacity:0;transform:translate(0.0px,-187.0px) scale(.25)}}
  @keyframes sc-dr4{0%{transform:translate(0px,0px) rotate(1deg)}35%{transform:translate(3px,-5px) rotate(4deg)}70%{transform:translate(-1.8px,-4.0px) rotate(-2deg)}100%{transform:translate(0px,0px) rotate(1deg)}}
  @keyframes sc-dot4{0%{opacity:0;stroke-dashoffset:0}38.33%{opacity:0;stroke-dashoffset:0}39.17%{opacity:1;stroke-dashoffset:0}45.83%{opacity:1;stroke-dashoffset:-98}46.67%,100%{opacity:0;stroke-dashoffset:-98}}
  @keyframes sc-lines{0%{opacity:0}18.33%{opacity:0}24.17%{opacity:.45}47.5%{opacity:.45}53.33%,100%{opacity:0}}
  @keyframes sc-pend-att{0%{opacity:0}2.5%{opacity:1}32.92%{opacity:1}33.33%,100%{opacity:0}}
  @keyframes sc-live-att{0%{opacity:0}33.33%{opacity:0}35.42%,100%{opacity:1}}
  @keyframes sc-pend-fee{0%{opacity:0}2.5%{opacity:1}36.25%{opacity:1}36.67%,100%{opacity:0}}
  @keyframes sc-live-fee{0%{opacity:0}36.67%{opacity:0}38.75%,100%{opacity:1}}
  @keyframes sc-pend-usr{0%{opacity:0}2.5%{opacity:1}46.25%{opacity:1}46.67%,100%{opacity:0}}
  @keyframes sc-live-usr{0%{opacity:0}46.67%{opacity:0}48.75%,100%{opacity:1}}
  @keyframes sc-bar{0%{transform:scaleX(0)}33.33%{transform:scaleX(0)}38.33%,100%{transform:scaleX(.9)}}
  @keyframes sc-cell0{0%{opacity:0}40.83%{opacity:0}42.08%,100%{opacity:0.35}}
  @keyframes sc-cell1{0%{opacity:0}41.25%{opacity:0}42.5%,100%{opacity:0.74}}
  @keyframes sc-cell2{0%{opacity:0}41.67%{opacity:0}42.92%,100%{opacity:0.48}}
  @keyframes sc-cell3{0%{opacity:0}42.08%{opacity:0}43.33%,100%{opacity:0.87}}
  @keyframes sc-cell4{0%{opacity:0}42.5%{opacity:0}43.75%,100%{opacity:0.61}}
  @keyframes sc-cell5{0%{opacity:0}42.92%{opacity:0}44.17%,100%{opacity:0.35}}
  @keyframes sc-cell6{0%{opacity:0}43.33%{opacity:0}44.58%,100%{opacity:0.74}}
  @keyframes sc-cell7{0%{opacity:0}43.75%{opacity:0}45%,100%{opacity:0.48}}
  @keyframes sc-cell8{0%{opacity:0}44.17%{opacity:0}45.42%,100%{opacity:0.87}}
  @keyframes sc-cell9{0%{opacity:0}44.58%{opacity:0}45.83%,100%{opacity:0.61}}
  @keyframes sc-clash{0%{opacity:0}46.67%{opacity:0}48.75%,100%{opacity:1}}
  @keyframes sc-sending{0%{opacity:0}43.75%{opacity:0}45%{opacity:1}52.08%{opacity:1}53.33%,100%{opacity:0}}
  @keyframes sc-sent{0%{opacity:0}52.5%{opacity:0}54.17%,100%{opacity:1}}
  @keyframes sc-hl-att{0%{opacity:0}32.92%{opacity:0}33.92%{opacity:1}40.83%{opacity:0}79.17%{opacity:0}80.17%{opacity:1}82.08%,100%{opacity:0}}
  @keyframes sc-hl-fee{0%{opacity:0}36.25%{opacity:0}37.25%{opacity:1}43.33%{opacity:0}80.42%{opacity:0}81.42%{opacity:1}83.33%,100%{opacity:0}}
  @keyframes sc-hl-tt{0%{opacity:0}39.58%{opacity:0}40.58%{opacity:1}47.5%{opacity:0}81.67%{opacity:0}82.67%{opacity:1}84.58%,100%{opacity:0}}
  @keyframes sc-hl-usr{0%{opacity:0}46.25%{opacity:0}47.25%{opacity:1}53.33%{opacity:0}82.92%{opacity:0}83.92%{opacity:1}85.83%,100%{opacity:0}}
  @keyframes sc-hl-not{0%{opacity:0}42.92%{opacity:0}43.92%{opacity:1}52.5%{opacity:0}84.17%{opacity:0}85.17%{opacity:1}87.08%,100%{opacity:0}}
  @keyframes sc-cap-A{0%{opacity:0}2.5%{opacity:1}23.33%{opacity:1}25.83%,100%{opacity:0}}
  @keyframes sc-cap-B{0%{opacity:0}25.83%{opacity:0}28.33%{opacity:1}42.5%{opacity:1}45%,100%{opacity:0}}
  @keyframes sc-cap-C{0%{opacity:0}45%{opacity:0}47.5%{opacity:1}59.17%{opacity:1}61.67%,100%{opacity:0}}
  @keyframes sc-cap-D{0%{opacity:0}61.67%{opacity:0}64.17%{opacity:1}75.83%{opacity:1}78.33%,100%{opacity:0}}
  @keyframes sc-cap-E{0%{opacity:0}78.33%{opacity:0}80.83%,100%{opacity:1}}
  @keyframes sc-role-0{0%{opacity:0}50%{opacity:0}52.5%{opacity:1}57.5%{opacity:1}60%{opacity:0}87.5%{opacity:0}90%,100%{opacity:1}}
  @keyframes sc-role-1{0%{opacity:0}60%{opacity:0}62.5%{opacity:1}67.5%{opacity:1}70%,100%{opacity:0}}
  @keyframes sc-role-2{0%{opacity:0}70%{opacity:0}72.5%{opacity:1}77.5%{opacity:1}80%,100%{opacity:0}}
  @keyframes sc-role-3{0%{opacity:0}80%{opacity:0}82.5%{opacity:1}87.5%{opacity:1}90%,100%{opacity:0}}
  @keyframes sc-chk{0%{opacity:0}81.67%{opacity:0}83.75%,100%{opacity:1}}
  @keyframes sc-pulse{0%{opacity:0;transform:scale(1)}77.5%{opacity:0;transform:scale(1)}78.75%{opacity:.7;transform:scale(1)}90%,100%{opacity:0;transform:scale(1.1)}}
}

/* Playing State: plays once when 70% scrolled into viewport */
.sc-state-playing .sc-cam{animation:sc-cam 12s cubic-bezier(.45,0,.2,1) 1 forwards}
.sc-state-playing .sc-fly0{animation:sc-fly0 12s ease-in-out 1 forwards}
.sc-state-playing .sc-dr0{animation:sc-dr0 3.4s ease-in-out infinite}
.sc-state-playing .sc-dot0{animation:sc-dot0 12s ease-in-out 1 forwards}
.sc-state-playing .sc-fly1{animation:sc-fly1 12s ease-in-out 1 forwards}
.sc-state-playing .sc-dr1{animation:sc-dr1 3.9s ease-in-out infinite}
.sc-state-playing .sc-dot1{animation:sc-dot1 12s ease-in-out 1 forwards}
.sc-state-playing .sc-fly2{animation:sc-fly2 12s ease-in-out 1 forwards}
.sc-state-playing .sc-dr2{animation:sc-dr2 3.6s ease-in-out infinite}
.sc-state-playing .sc-dot2{animation:sc-dot2 12s ease-in-out 1 forwards}
.sc-state-playing .sc-fly3{animation:sc-fly3 12s ease-in-out 1 forwards}
.sc-state-playing .sc-dr3{animation:sc-dr3 4.2s ease-in-out infinite}
.sc-state-playing .sc-dot3{animation:sc-dot3 12s ease-in-out 1 forwards}
.sc-state-playing .sc-fly4{animation:sc-fly4 12s ease-in-out 1 forwards}
.sc-state-playing .sc-dr4{animation:sc-dr4 3.7s ease-in-out infinite}
.sc-state-playing .sc-dot4{animation:sc-dot4 12s ease-in-out 1 forwards}
.sc-state-playing .sc-lines{animation:sc-lines 12s ease-in-out 1 forwards}
.sc-state-playing .sc-pend-att{animation:sc-pend-att 12s ease-in-out 1 forwards}
.sc-state-playing .sc-live-att{animation:sc-live-att 12s ease-in-out 1 forwards}
.sc-state-playing .sc-pend-fee{animation:sc-pend-fee 12s ease-in-out 1 forwards}
.sc-state-playing .sc-live-fee{animation:sc-live-fee 12s ease-in-out 1 forwards}
.sc-state-playing .sc-pend-usr{animation:sc-pend-usr 12s ease-in-out 1 forwards}
.sc-state-playing .sc-live-usr{animation:sc-live-usr 12s ease-in-out 1 forwards}
.sc-state-playing .sc-bar{animation:sc-bar 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell0{animation:sc-cell0 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell1{animation:sc-cell1 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell2{animation:sc-cell2 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell3{animation:sc-cell3 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell4{animation:sc-cell4 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell5{animation:sc-cell5 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell6{animation:sc-cell6 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell7{animation:sc-cell7 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell8{animation:sc-cell8 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cell9{animation:sc-cell9 12s ease-in-out 1 forwards}
.sc-state-playing .sc-clash{animation:sc-clash 12s ease-in-out 1 forwards}
.sc-state-playing .sc-sending{animation:sc-sending 12s ease-in-out 1 forwards}
.sc-state-playing .sc-sent{animation:sc-sent 12s ease-in-out 1 forwards}
.sc-state-playing .sc-hl-att{animation:sc-hl-att 12s ease-in-out 1 forwards}
.sc-state-playing .sc-hl-fee{animation:sc-hl-fee 12s ease-in-out 1 forwards}
.sc-state-playing .sc-hl-tt{animation:sc-hl-tt 12s ease-in-out 1 forwards}
.sc-state-playing .sc-hl-usr{animation:sc-hl-usr 12s ease-in-out 1 forwards}
.sc-state-playing .sc-hl-not{animation:sc-hl-not 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cap-A{animation:sc-cap-A 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cap-B{animation:sc-cap-B 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cap-C{animation:sc-cap-C 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cap-D{animation:sc-cap-D 12s ease-in-out 1 forwards}
.sc-state-playing .sc-cap-E{animation:sc-cap-E 12s ease-in-out 1 forwards}
.sc-state-playing .sc-role-0{animation:sc-role-0 12s ease-in-out 1 forwards}
.sc-state-playing .sc-role-1{animation:sc-role-1 12s ease-in-out 1 forwards}
.sc-state-playing .sc-role-2{animation:sc-role-2 12s ease-in-out 1 forwards}
.sc-state-playing .sc-role-3{animation:sc-role-3 12s ease-in-out 1 forwards}
.sc-state-playing .sc-chk{animation:sc-chk 12s ease-in-out 1 forwards}
.sc-state-playing .sc-pulse{animation:sc-pulse 12s ease-in-out 1 forwards}

/* Done State: Frozen at final values */
.sc-state-done .sc-cam{transform:translate(320px,277.5px) scale(1.35) translate(-320px,-225px)}
.sc-state-done .sc-live-att,.sc-state-done .sc-live-fee,.sc-state-done .sc-live-usr{opacity:1}
.sc-state-done .sc-pend-att,.sc-state-done .sc-pend-fee,.sc-state-done .sc-pend-usr{opacity:0}
.sc-state-done .sc-fly0,.sc-state-done .sc-fly1,.sc-state-done .sc-fly2,.sc-state-done .sc-fly3,.sc-state-done .sc-fly4{opacity:0}
.sc-state-done .sc-bar{transform:scaleX(.9)}
.sc-state-done .sc-sent{opacity:1}
.sc-state-done .sc-chk{opacity:1}
.sc-state-done .sc-clash{opacity:1}
.sc-state-done .sc-sending{opacity:0}
.sc-state-done .sc-cellon{opacity:0.6}
.sc-state-done .sc-cap-E{opacity:1}
.sc-state-done .sc-role-0{opacity:1}

`}</style>
      <g className="sc-cam">
<path className="sc-ln sc-lines" d="M88 128 Q184.6 222.9 320 225" />
<path className="sc-dot sc-dot0" d="M88 128 Q184.6 222.9 320 225" pathLength="100" />
<path className="sc-ln sc-lines" d="M552 128 Q455.4 222.9 320 225" />
<path className="sc-dot sc-dot1" d="M552 128 Q455.4 222.9 320 225" pathLength="100" />
<path className="sc-ln sc-lines" d="M88 300 Q219.0 308.9 320 225" />
<path className="sc-dot sc-dot2" d="M88 300 Q219.0 308.9 320 225" pathLength="100" />
<path className="sc-ln sc-lines" d="M552 300 Q421.0 308.9 320 225" />
<path className="sc-dot sc-dot3" d="M552 300 Q421.0 308.9 320 225" pathLength="100" />
<path className="sc-ln sc-lines" d="M320 412 Q357.4 318.5 320 225" />
<path className="sc-dot sc-dot4" d="M320 412 Q357.4 318.5 320 225" pathLength="100" />
<rect className="sc-panel sc-shadow" x="150" y="100" width="340" height="250" rx="18" />
<image href="/App_logo_light.png" x="164" y="111" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
<text className="sc-brand" x="190" y="125">SchoolChakra</text>
<rect className="sc-chip" x="368" y="110" width="108" height="22" rx="11" />
<g className="sc-role-0"><circle className="sc-pfill" cx="381" cy="121" r="3" /><text className="sc-role" x="390" y="125">Principal</text></g>
<g className="sc-role-1"><circle className="sc-pfill" cx="381" cy="121" r="3" /><text className="sc-role" x="390" y="125">Teacher</text></g>
<g className="sc-role-2"><circle className="sc-pfill" cx="381" cy="121" r="3" /><text className="sc-role" x="390" y="125">Accounts</text></g>
<g className="sc-role-3"><circle className="sc-pfill" cx="381" cy="121" r="3" /><text className="sc-role" x="390" y="125">Student</text></g>
<rect className="sc-div" x="164" y="144" width="312" height="1" />
<rect className="sc-tile" x="164" y="154" width="98" height="86" rx="10" />
<rect className="sc-tile" x="271" y="154" width="98" height="86" rx="10" />
<rect className="sc-tile" x="378" y="154" width="98" height="86" rx="10" />
<rect className="sc-tile" x="164" y="248" width="151" height="70" rx="10" />
<rect className="sc-tile" x="324" y="248" width="152" height="70" rx="10" />
<text className="sc-lab" x="174" y="172">ATTENDANCE</text>
<text className="sc-pendtxt sc-pend-att" x="174" y="202">—</text>
<text className="sc-val sc-live-att" x="174" y="202">97.8%</text>
<rect className="sc-track" x="174" y="216" width="78" height="4" rx="2" />
<rect className="sc-pfill sc-bar" x="174" y="216" width="78" height="4" rx="2" />
<text className="sc-sm" x="174" y="232">Present today</text>
<text className="sc-lab" x="281" y="172">FEES COLLECTED</text>
<text className="sc-pendtxt sc-pend-fee" x="281" y="202">—</text>
<text className="sc-val sc-live-fee" x="281" y="202">₹56.0L</text>
<text className="sc-sm" x="281" y="232">via UPI &amp; cash</text>
<text className="sc-lab" x="388" y="172">TIMETABLE</text>
<rect className="sc-cellbase" x="388" y="180" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell0" x="388" y="180" width="11" height="9" rx="2" opacity="0.35" />
<rect className="sc-cellbase" x="402" y="180" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell1" x="402" y="180" width="11" height="9" rx="2" opacity="0.74" />
<rect className="sc-cellbase" x="416" y="180" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell2" x="416" y="180" width="11" height="9" rx="2" opacity="0.48" />
<rect className="sc-cellbase" x="430" y="180" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell3" x="430" y="180" width="11" height="9" rx="2" opacity="0.87" />
<rect className="sc-cellbase" x="444" y="180" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell4" x="444" y="180" width="11" height="9" rx="2" opacity="0.61" />
<rect className="sc-cellbase" x="388" y="192" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell5" x="388" y="192" width="11" height="9" rx="2" opacity="0.35" />
<rect className="sc-cellbase" x="402" y="192" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell6" x="402" y="192" width="11" height="9" rx="2" opacity="0.74" />
<rect className="sc-cellbase" x="416" y="192" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell7" x="416" y="192" width="11" height="9" rx="2" opacity="0.48" />
<rect className="sc-cellbase" x="430" y="192" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell8" x="430" y="192" width="11" height="9" rx="2" opacity="0.87" />
<rect className="sc-cellbase" x="444" y="192" width="11" height="9" rx="2" />
<rect className="sc-cellon sc-cell9" x="444" y="192" width="11" height="9" rx="2" opacity="0.61" />
<g className="sc-clash"><circle className="sc-okfill" cx="391" cy="214" r="2.6" /><text className="sc-sm" x="398" y="217">0 clashes</text></g>
<text className="sc-lab" x="176" y="266">USERS</text>
<text className="sc-pendtxt sc-pend-usr" x="176" y="292">—</text>
<text className="sc-val sc-live-usr" x="176" y="292">960</text>
<text className="sc-sm" x="176" y="308">4 roles · Workspaces</text>
<text className="sc-lab" x="336" y="266">NOTICES</text>
<text className="sc-note sc-sending" x="336" y="294">Sending to 8-B…</text>
<g className="sc-sent"><circle className="sc-okfill" cx="344" cy="289" r="7" /><path d="M340.5 289.3l2.6 2.6 4.6-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><text className="sc-note" x="356" y="293">12 delivered</text></g>
<text className="sc-sm" x="336" y="308">By class, role &amp; section</text>
<g className="sc-hl-att"><rect className="sc-glow" x="163" y="153" width="100" height="88" rx="11" /><rect className="sc-hl" x="164" y="154" width="98" height="86" rx="10" /></g>
<g className="sc-hl-fee"><rect className="sc-glow" x="270" y="153" width="100" height="88" rx="11" /><rect className="sc-hl" x="271" y="154" width="98" height="86" rx="10" /></g>
<g className="sc-hl-tt"><rect className="sc-glow" x="377" y="153" width="100" height="88" rx="11" /><rect className="sc-hl" x="378" y="154" width="98" height="86" rx="10" /></g>
<g className="sc-hl-usr"><rect className="sc-glow" x="163" y="247" width="153" height="72" rx="11" /><rect className="sc-hl" x="164" y="248" width="151" height="70" rx="10" /></g>
<g className="sc-hl-not"><rect className="sc-glow" x="323" y="247" width="154" height="72" rx="11" /><rect className="sc-hl" x="324" y="248" width="152" height="70" rx="10" /></g>
<circle className="sc-okfill" cx="168" cy="334" r="3" />
<text className="sc-sm" x="177" y="338" style={{ fontWeight: '600' }}>All modules in sync · one source of truth</text>
<g className="sc-chk"><circle className="sc-okfill" cx="462" cy="334" r="7" /><path d="M458.5 334.3l2.6 2.6 4.6-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g>
<rect className="sc-pulse" x="150" y="100" width="340" height="250" rx="18" />
<g transform="translate(88 128)"><g className="sc-fly0"><g className="sc-dr0"><rect x="-34" y="-30" width="68" height="56" rx="4" fill="#fffbeb" stroke="#d6c9a0" /><rect x="-34" y="-30" width="8" height="56" rx="3" fill="#e5d9b0" /><rect x="-19" y="-24" width="38" height="3" rx="1.5" fill="#cbb98a" /><line x1="-20" y1="-14.0" x2="30" y2="-14.0" stroke="#e2d8bb" strokeWidth=".8" /><path d="M-18.2 -15.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M-8.7 -15.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.8 -15.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12.5" cy="-15.0" r="3.4" fill="none" stroke="#ef4444" strokeWidth="1" /><path d="M10.7 -16.8l3.6 3.6" stroke="#ef4444" strokeWidth=".9" /><path d="M19.8 -15.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><line x1="-20" y1="-5.5" x2="30" y2="-5.5" stroke="#e2d8bb" strokeWidth=".8" /><path d="M-8.7 -6.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.8 -6.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.3 -6.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.8 -6.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><line x1="-20" y1="3.0" x2="30" y2="3.0" stroke="#e2d8bb" strokeWidth=".8" /><circle cx="-16.0" cy="2.0" r="3.4" fill="none" stroke="#ef4444" strokeWidth="1" /><path d="M-17.8 0.2l3.6 3.6" stroke="#ef4444" strokeWidth=".9" /><path d="M-8.7 2.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.3 2.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.8 2.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><line x1="-20" y1="11.5" x2="30" y2="11.5" stroke="#e2d8bb" strokeWidth=".8" /><path d="M-18.2 10.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M-8.7 10.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><circle cx="3.0" cy="10.5" r="3.4" fill="none" stroke="#ef4444" strokeWidth="1" /><path d="M1.2 8.7l3.6 3.6" stroke="#ef4444" strokeWidth=".9" /><path d="M10.3 10.5l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><line x1="-20" y1="20.0" x2="30" y2="20.0" stroke="#e2d8bb" strokeWidth=".8" /><path d="M-18.2 19.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M-8.7 19.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.8 19.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.3 19.0l1.6 1.8 3-3.6" fill="none" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><circle cx="22.0" cy="19.0" r="3.4" fill="none" stroke="#ef4444" strokeWidth="1" /><path d="M20.2 17.2l3.6 3.6" stroke="#ef4444" strokeWidth=".9" /><text className="sc-tag" x="0" y="44">Paper registers</text></g></g></g>
<g transform="translate(552 128)"><g className="sc-fly1"><g className="sc-dr1"><rect x="-34" y="-30" width="68" height="56" rx="4" fill="#fff" stroke="#cbd5e1" /><path d="M-34 -30h68v10h-68z" fill="#16a34a" /><text x="-26" y="-22.5" fontSize="5.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">A</text><text x="-9" y="-22.5" fontSize="5.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">B</text><text x="8" y="-22.5" fontSize="5.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">C</text><text x="25" y="-22.5" fontSize="5.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">D</text><line x1="-34" y1="-20.0" x2="34" y2="-20.0" stroke="#e2e8f0" strokeWidth=".8" /><line x1="-34" y1="-11.5" x2="34" y2="-11.5" stroke="#e2e8f0" strokeWidth=".8" /><line x1="-34" y1="-3.0" x2="34" y2="-3.0" stroke="#e2e8f0" strokeWidth=".8" /><line x1="-34" y1="5.5" x2="34" y2="5.5" stroke="#e2e8f0" strokeWidth=".8" /><line x1="-34" y1="14.0" x2="34" y2="14.0" stroke="#e2e8f0" strokeWidth=".8" /><line x1="-17" y1="-20" x2="-17" y2="22" stroke="#e2e8f0" strokeWidth=".8" /><line x1="0" y1="-20" x2="0" y2="22" stroke="#e2e8f0" strokeWidth=".8" /><line x1="17" y1="-20" x2="17" y2="22" stroke="#e2e8f0" strokeWidth=".8" /><rect x="-16" y="-11.5" width="14" height="6.5" fill="#dcfce7" /><rect x="1" y="-11.5" width="16" height="7.5" fill="#fecaca" /><text x="9" y="-6.3" fontSize="5" fontWeight="700" fill="#b91c1c" textAnchor="middle" fontFamily="Arial,sans-serif">#REF!</text><rect x="-16" y="-3" width="14" height="6" fill="#fef9c3" /><rect x="1" y="5.5" width="14" height="6" fill="#dcfce7" /><rect x="-16" y="14" width="14" height="6" fill="#fee2e2" /><path d="M24 12l6 10h-12z" fill="#f59e0b" /><text x="24" y="20.5" fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">!</text><text className="sc-tag" x="0" y="44">Excel fee sheets</text></g></g></g>
<g transform="translate(88 300)"><g className="sc-fly2"><g className="sc-dr2"><rect x="-34" y="-30" width="68" height="56" rx="4" fill="#fff" stroke="#cbd5e1" /><rect x="-31" y="-18.0" width="3" height="1.4" rx=".7" fill="#cbd5e1" /><rect x="-31" y="-7.5" width="3" height="1.4" rx=".7" fill="#cbd5e1" /><rect x="-31" y="3.0" width="3" height="1.4" rx=".7" fill="#cbd5e1" /><rect x="-31" y="13.5" width="3" height="1.4" rx=".7" fill="#cbd5e1" /><line x1="-26.0" y1="-22" x2="-26.0" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-12.5" y1="-22" x2="-12.5" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="1.0" y1="-22" x2="1.0" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="14.5" y1="-22" x2="14.5" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="28.0" y1="-22" x2="28.0" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-26" y1="-22.0" x2="28.0" y2="-22.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-26" y1="-11.5" x2="28.0" y2="-11.5" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-26" y1="-1.0" x2="28.0" y2="-1.0" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-26" y1="9.5" x2="28.0" y2="9.5" stroke="#e5ebf3" strokeWidth=".8" /><line x1="-26" y1="20.0" x2="28.0" y2="20.0" stroke="#e5ebf3" strokeWidth=".8" /><rect x="-25.2" y="-21.2" width="11.9" height="19.4" rx="1.5" fill="#bfdbfe" /><rect x="-11.7" y="-10.7" width="11.9" height="19.4" rx="1.5" fill="#bbf7d0" /><rect x="1.8" y="-21.2" width="11.9" height="19.4" rx="1.5" fill="#e9d5ff" /><rect x="15.3" y="-0.2" width="11.9" height="19.4" rx="1.5" fill="#fde68a" /><text className="sc-tag" x="0" y="44">Wall timetable</text></g></g></g>
<g transform="translate(552 300)"><g className="sc-fly3"><g className="sc-dr3"><rect x="-6" y="-28" width="38" height="12" rx="6" fill="#e2e8f0" /><rect x="-1" y="-24.5" width="26" height="2.2" rx="1.1" fill="#cbd5e1" /><rect x="-30" y="-10" width="44" height="13" rx="6.5" fill="#bbf7d0" stroke="#86efac" /><rect x="-24" y="-6" width="28" height="2.4" rx="1.2" fill="#86a99a" /><rect x="-14" y="8" width="40" height="12" rx="6" fill="#fff" stroke="#cbd5e1" /><rect x="-8" y="12" width="26" height="2.2" rx="1.1" fill="#cbd5e1" /><circle cx="28" cy="-26" r="8" fill="#ef4444" /><text x="28" y="-23.2" fontSize="6.2" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial,sans-serif">99+</text><text className="sc-tag" x="0" y="44">Chat-group notices</text></g></g></g>
<g transform="translate(320 412)"><g className="sc-fly4"><g className="sc-dr4"><rect x="-30" y="-27" width="46" height="18" rx="4" fill="#fff" stroke="#cbd5e1" /><circle cx="-23" cy="-18" r="4" fill="#fca5a5" /><rect x="-16" y="-21" width="26" height="3" rx="1.5" fill="#cbd5e1" /><rect x="-16" y="-15.5" width="18" height="2.5" rx="1.2" fill="#e2e8f0" /><rect x="-14" y="-4" width="46" height="18" rx="4" fill="#fff" stroke="#cbd5e1" /><circle cx="-7" cy="5" r="4" fill="#93c5fd" /><rect x="0" y="2" width="26" height="3" rx="1.5" fill="#cbd5e1" /><rect x="0" y="6.5" width="18" height="2.5" rx="1.2" fill="none" stroke="#94a3b8" strokeDasharray="1.5 1.2" /><rect x="-26" y="16" width="46" height="13" rx="4" fill="none" stroke="#94a3b8" strokeDasharray="2 1.5" /><text x="-3" y="25.5" fontSize="8" fontWeight="700" fill="#94a3b8" textAnchor="middle" fontFamily="Arial,sans-serif">?</text><text className="sc-tag" x="0" y="44">Separate user lists</text></g></g></g>
      </g>
    </svg>
  );
}
