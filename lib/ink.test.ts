import assert from "node:assert/strict";
import test from "node:test";
import { charInk, groupLines, lineProgress, nextOpen } from "./ink.ts";

test("characters fill left to right", () => {
  const count = 8;
  const early = Array.from({ length: count }, (_, index) =>
    charInk(0.2, index, count),
  );
  assert.ok(early[0] > early[1]);
  assert.ok(early[1] > early[2]);
  assert.equal(early[7], 0);

  const done = Array.from({ length: count }, (_, index) =>
    charInk(1, index, count),
  );
  assert.ok(done.every((ink) => ink === 1));

  const fresh = Array.from({ length: count }, (_, index) =>
    charInk(0, index, count),
  );
  assert.ok(fresh.every((ink) => ink === 0));
});

test("upper lines are further along than lower lines", () => {
  const vh = 800;
  assert.ok(lineProgress(100, vh) > lineProgress(500, vh));
  assert.equal(lineProgress(0, vh), 1);
  assert.equal(lineProgress(vh, vh), 0);
});

test("lines group by vertical position, then read left to right", () => {
  const lines = groupLines(
    [
      { id: "b", x: 40, y: 20 },
      { id: "a", x: 10, y: 20 },
      { id: "c", x: 8, y: 80 },
    ],
    8,
  );
  assert.deepEqual(
    lines.map((line) => line.map((item) => item.id)),
    [["a", "b"], ["c"]],
  );
});

test("cards open late and stay open until the word falls back into the dim band", () => {
  assert.equal(nextOpen(false, 0.5), false);
  assert.equal(nextOpen(false, 0.8), true);
  assert.equal(nextOpen(true, 0.2), true);
  assert.equal(nextOpen(true, 0.02), false);
});
