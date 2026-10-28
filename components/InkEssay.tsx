"use client";

import { useLayoutEffect, useRef } from "react";
import {
  features,
  paragraphs,
  ui,
  type Feature,
  type Piece,
} from "@/content/essay";
import {
  charInk,
  DIM_COLOR,
  groupLines,
  lineProgress,
  LIT_COLOR,
  nextOpen,
} from "@/lib/ink";
import { FeatureIcon } from "./icons";

type InkNode = HTMLElement & { _feature?: string };

function Glyphs({
  text,
  featureId,
  className,
}: {
  text: string;
  featureId?: string;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <span className={className}>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-ink=""
          data-feature={featureId}
          className="glyph"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <span
      className="feature"
      data-feature-root={feature.id}
      data-open="false"
      aria-expanded="false"
    >
      <span className="feature-top">
        <span className="icon-slot">
          <FeatureIcon name={feature.icon} />
        </span>
        <Glyphs
          className="feature-title"
          text={`${feature.title}${feature.suffix}`}
          featureId={feature.id}
        />
      </span>
      <span className="feature-more">
        <span className="feature-more-inner">
          <span className="kicker">{feature.kicker}</span>
          <span className="feature-body">{feature.body}</span>
          {feature.people ? (
            <ul className="people">
              {feature.people.map((person) => (
                <li key={person.name}>
                  <span className="person-name">{person.name}</span>
                  <span className="person-role">{person.role}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </span>
      </span>
    </span>
  );
}

function renderPiece(piece: Piece, index: number) {
  if (piece.type === "text") {
    return <Glyphs key={index} text={piece.text} />;
  }
  if (piece.type === "link") {
    return (
      <a key={index} className="mail" href={piece.href}>
        <Glyphs text={piece.text} />
      </a>
    );
  }
  const feature = features[piece.id];
  return <FeatureCard key={feature.id} feature={feature} />;
}

export function InkEssay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let followUntil = 0;
    let frame = 0;

    const paint = (allowToggle: boolean) => {
      const glyphs = Array.from(
        root.querySelectorAll<InkNode>("[data-ink]"),
      );
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-feature-root]"),
      );
      const reduced = motion.matches;

      if (reduced) {
        for (const glyph of glyphs) {
          glyph.style.color = LIT_COLOR;
          glyph.style.backgroundImage = "";
          glyph.style.backgroundClip = "";
          glyph.style.webkitBackgroundClip = "";
        }
        for (const card of cards) {
          card.dataset.open = "true";
          card.setAttribute("aria-expanded", "true");
        }
        root.dataset.scrolled = "true";
        return false;
      }

      const viewportHeight = window.innerHeight;
      const measured = glyphs.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          x: rect.left,
          y: rect.top,
          h: rect.height,
          feature: el.dataset.feature,
        };
      });
      const tolerance = Math.max(
        8,
        (measured.find((item) => item.h > 0)?.h ?? 24) * 0.45,
      );
      const lines = groupLines(measured, tolerance);
      const totals = new Map<string, { sum: number; count: number }>();

      for (const line of lines) {
        const progress = lineProgress(line[0].y, viewportHeight);
        line.forEach((item, index) => {
          const ink = charInk(progress, index, line.length);
          applyInk(item.el, ink);
          if (!item.feature) return;
          const bucket = totals.get(item.feature) ?? { sum: 0, count: 0 };
          bucket.sum += ink;
          bucket.count += 1;
          totals.set(item.feature, bucket);
        });
      }

      root.dataset.scrolled = window.scrollY > 28 ? "true" : "false";
      if (!allowToggle) return false;

      let changed = false;
      for (const card of cards) {
        const id = card.dataset.featureRoot;
        if (!id) continue;
        const bucket = totals.get(id);
        const ink = bucket && bucket.count > 0 ? bucket.sum / bucket.count : 0;
        const wasOpen = card.dataset.open === "true";
        const open = nextOpen(wasOpen, ink);
        if (open === wasOpen) continue;
        card.dataset.open = open ? "true" : "false";
        card.setAttribute("aria-expanded", open ? "true" : "false");
        changed = true;
      }
      return changed;
    };

    const update = (allowToggle: boolean) => {
      const changed = paint(allowToggle);
      if (!changed) return;
      paint(false);
      followUntil = performance.now() + 920;
      if (!frame) frame = requestAnimationFrame(follow);
    };

    const follow = () => {
      frame = 0;
      paint(false);
      if (performance.now() < followUntil) {
        frame = requestAnimationFrame(follow);
      }
    };

    let queued = false;
    const requestUpdate = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update(true);
      });
    };

    update(true);
    const onMotion = () => update(true);
    motion.addEventListener("change", onMotion);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(root);

    return () => {
      motion.removeEventListener("change", onMotion);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="page-root" data-scrolled="false">
      <header className="topbar">
        <span className="mark">{ui.mark}</span>
        <span className="use">{ui.use}</span>
      </header>

      <main className="sheet">
        <article className="essay">
          <p className="sr-only">
            向下滚动时，正文会从左到右、从上到下逐渐显现。读到特点时，这个词会展开成一张卡片。
          </p>
          {paragraphs.map((pieces, index) => (
            <div className="stanza" key={index}>
              {pieces.map(renderPiece)}
            </div>
          ))}
        </article>
        <p className="template-note">{ui.note}</p>
      </main>

      <p className="hint">{ui.hint}</p>
      <Grain />
    </div>
  );
}

function applyInk(el: HTMLElement, ink: number) {
  if (ink <= 0.02) {
    el.style.color = DIM_COLOR;
    el.style.backgroundImage = "";
    el.style.backgroundClip = "";
    el.style.webkitBackgroundClip = "";
    return;
  }
  if (ink >= 0.98) {
    el.style.color = LIT_COLOR;
    el.style.backgroundImage = "";
    el.style.backgroundClip = "";
    el.style.webkitBackgroundClip = "";
    return;
  }

  const pct = Math.round(ink * 1000) / 10;
  const edge = 7;
  const start = Math.max(0, pct - edge);
  const end = Math.min(100, pct + edge);
  el.style.color = "transparent";
  el.style.backgroundImage = `linear-gradient(90deg, ${LIT_COLOR} ${start}%, ${DIM_COLOR} ${end}%)`;
  el.style.backgroundClip = "text";
  el.style.webkitBackgroundClip = "text";
}

function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
