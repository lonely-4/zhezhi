export type FeatureIcon = "spine" | "talk" | "seal" | "people";

export type Person = {
  name: string;
  role: string;
};

export type Feature = {
  id: string;
  title: string;
  /** Punctuation that belongs to the sentence, kept outside the chip. */
  suffix: string;
  kicker: string;
  icon: FeatureIcon;
  body: string;
  people?: Person[];
};

export type TextPiece = { type: "text"; text: string };
export type FeaturePiece = { type: "feature"; id: string };
export type LinkPiece = { type: "link"; href: string; text: string };
export type Piece = TextPiece | FeaturePiece | LinkPiece;

export const ui = {
  mark: "Zhezhi",
  use: "Self · Team · Studio",
  hint: "Scroll. The type fills one line at a time.",
  note: "A sample. Replace the sentences and cards in content/essay.ts.",
};

export const features: Record<string, Feature> = {
  spine: {
    id: "spine",
    title: "spine",
    suffix: ".",
    kicker: "Product",
    icon: "spine",
    body: "Excerpts, notes, and decisions, folded along time. Not a second knowledge base.",
  },
  talk: {
    id: "talk",
    title: "thread",
    suffix: ",",
    kicker: "Product",
    icon: "talk",
    body: "Comments grow on the original passage. The subject stays beside the sentence it came from.",
  },
  seal: {
    id: "seal",
    title: "seal",
    suffix: ".",
    kicker: "Product",
    icon: "seal",
    body: "Publishing is a crease you can unfold. Who, when, and why stay on the crease.",
  },
  people: {
    id: "people",
    title: "four",
    suffix: ".",
    kicker: "Studio",
    icon: "people",
    body: "Design, words, engineering, and one person whose job is to say no.",
    people: [
      { name: "Lin Ke", role: "Design" },
      { name: "Zhou Yu", role: "Words" },
      { name: "Chen Ning", role: "Engineering" },
      { name: "Song Chi", role: "Says no" },
    ],
  },
};

export const paragraphs: Piece[][] = [
  [
    {
      type: "text",
      text: "We are Zhezhi. Four people in Shanghai, making software for anyone who needs to think a thing through.",
    },
  ],
  [
    {
      type: "text",
      text: "Most tools assume you are in a hurry. We assume you want to finish. One less explanation, one less choice, and the rest of the time goes back to the work.",
    },
  ],
  [
    {
      type: "text",
      text: "So the features do not sit under a heading. They stay inside the sentence, and thicken only when you reach them.",
    },
  ],
  [
    { type: "text", text: "A study carried all the way through settles into the " },
    { type: "feature", id: "spine" },
    { type: "text", text: " The next day you can still follow the crease back. Discussion stays in the " },
    { type: "feature", id: "talk" },
    { type: "text", text: " so one remark does not need a new channel. The version you hand over is the " },
    { type: "feature", id: "seal" },
    { type: "text", text: " The decision lands on a sentence, and the version is pinned there too." },
  ],
  [
    {
      type: "text",
      text: "Three things share one quiet timeline. No dashboard, no red dots, and no one reminding you that you have not opened it in three days.",
    },
  ],
  [
    { type: "text", text: "At the desk are " },
    { type: "feature", id: "people" },
    {
      type: "text",
      text: " Two things a year, finished so someone else can continue, then the next.",
    },
  ],
  [
    { type: "text", text: "If you want a product folded thinner, write to " },
    {
      type: "link",
      href: "mailto:studio@zhezhi.studio",
      text: "studio@zhezhi.studio",
    },
    { type: "text", text: "." },
  ],
];
