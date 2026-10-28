export const DIM = [62, 58, 52] as const;
export const LIT = [243, 238, 230] as const;
export const NIB = [255, 252, 246] as const;

export const OPEN_AT = 0.72;
export const CLOSE_AT = 0.08;

export function clamp01(value: number) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/** How far a line has been read. 0 when it enters the lower band, 1 as it reaches the upper band. */
export function lineProgress(lineY: number, viewportHeight: number) {
  const zoneStart = viewportHeight * 0.8;
  const zoneEnd = viewportHeight * 0.36;
  const span = zoneStart - zoneEnd;
  if (span <= 0) return 1;
  return clamp01((zoneStart - lineY) / span);
}

/**
 * Ink for one character in a line.
 * `progress` moves a reading head left to right; `softness` is the width of the wet edge, in characters.
 */
export function charInk(
  progress: number,
  index: number,
  count: number,
  softness = 1.65,
) {
  if (count <= 1) return clamp01(progress);
  const head = progress * (count - 1 + softness);
  return clamp01((head - index) / softness);
}

function channel(ink: number, index: number) {
  const edge = ink > 0 && ink < 1 ? Math.sin(ink * Math.PI) : 0;
  const base = DIM[index] + (LIT[index] - DIM[index]) * ink;
  return Math.round(base + (NIB[index] - base) * edge * 0.9);
}

export function inkColor(ink: number) {
  return `rgb(${channel(ink, 0)} ${channel(ink, 1)} ${channel(ink, 2)})`;
}

export const DIM_COLOR = inkColor(0);
export const LIT_COLOR = inkColor(1);

export type InkItem = {
  x: number;
  y: number;
};

export function groupLines<T extends InkItem>(items: T[], tolerance: number) {
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);
  const lines: T[][] = [];

  for (const item of sorted) {
    const last = lines[lines.length - 1];
    if (!last || Math.abs(item.y - last[0].y) > tolerance) {
      lines.push([item]);
    } else {
      last.push(item);
    }
  }

  for (const line of lines) {
    line.sort((a, b) => a.x - b.x);
  }

  return lines;
}

export function nextOpen(wasOpen: boolean, ink: number) {
  if (wasOpen) return ink >= CLOSE_AT;
  return ink >= OPEN_AT;
}
