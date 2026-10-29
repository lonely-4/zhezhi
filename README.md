# Zhezhi

A quick concept demo of an effect, built with Cursor Agent.

A scrolling page for introducing yourself, a team, or a studio.

The type starts as a dark gray, nearly lost in the background. As you scroll, it fills one line at a time, left to right. When the reading reaches a feature, that word thickens into a flat card inside the sentence, then the sentence goes on. The card lives in the prose, not in a row under a heading.

This page is written for a fictional studio, Zhezhi. To use your own introduction, edit [`content/essay.ts`](content/essay.ts):

- `paragraphs` is the body, one array per paragraph
- drop `{ type: "feature", id: "..." }` into a sentence
- `features` holds the card title, punctuation, icon, note, and an optional list of people

Icons are `spine`, `talk`, `seal`, and `people`, drawn in `components/icons.tsx`.

## Run locally

```bash
npm install
npm run dev
```

开发服务器在 [http://127.0.0.1:4317](http://127.0.0.1:4317)。

The font files only include the characters currently in use. After you change the copy, subset them again:

```bash
node scripts/subset-fonts.mjs
```

The page respects “reduce motion”: the text is fully readable and the cards stay open.
