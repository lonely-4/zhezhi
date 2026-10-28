export type FeatureIcon = "spine" | "talk" | "seal" | "people";

export type Person = {
  name: string;
  role: string;
};

export type Feature = {
  id: string;
  title: string;
  /** Punctuation that belongs to the sentence, kept inside the word so the card can open around it. */
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
  mark: "折纸",
  use: "自我 · 团队 · 工作室",
  hint: "向下滚动，字会沿着阅读的方向亮起来",
  note: "示例介绍。把 content/essay.ts 里的句子和卡片换成你的。",
};

export const features: Record<string, Feature> = {
  spine: {
    id: "spine",
    title: "页脊",
    suffix: "。",
    kicker: "产品",
    icon: "spine",
    body: "摘录、批注和决定，按时间折在一起，不另做一套知识库。",
  },
  talk: {
    id: "talk",
    title: "对谈",
    suffix: "，",
    kicker: "产品",
    icon: "talk",
    body: "评论贴着原文生长。主语留在原来的那段话旁边。",
  },
  seal: {
    id: "seal",
    title: "定稿",
    suffix: "。",
    kicker: "产品",
    icon: "seal",
    body: "发布是一道可回退的折痕。谁、何时、为何，都留在折痕上。",
  },
  people: {
    id: "people",
    title: "四人",
    suffix: "。",
    kicker: "工作室",
    icon: "people",
    body: "设计、文字、工程，再加上一个负责说不的人。",
    people: [
      { name: "林可", role: "设计" },
      { name: "周屿", role: "文字" },
      { name: "陈宁", role: "工程" },
      { name: "宋迟", role: "负责说不" },
    ],
  },
};

export const paragraphs: Piece[][] = [
  [
    {
      type: "text",
      text: "我们是折纸。四个人，在上海，给那些需要把事情想清楚的人做软件。",
    },
  ],
  [
    {
      type: "text",
      text: "多数工具默认你正在赶路。我们默认你想把一件事做完。少一句说明，少一次选择，剩下的时间还给工作本身。",
    },
  ],
  [
    {
      type: "text",
      text: "所以特点不安放在标题下面。它们就待在句子里，读到的时候，才自己厚起来。",
    },
  ],
  [
    { type: "text", text: "一次研究做到最后，会落进" },
    { type: "feature", id: "spine" },
    { type: "text", text: "第二天还能顺着折痕翻回去。讨论留在" },
    { type: "feature", id: "talk" },
    { type: "text", text: "不必为了追一句，再新开一个频道。要交出去的那一版，叫" },
    { type: "feature", id: "seal" },
    { type: "text", text: "决定落在哪一句，版本就钉在哪一句。" },
  ],
  [
    {
      type: "text",
      text: "三件事共用一条安静的时间线。没有仪表盘，没有红点，也没有人提醒你已经三天没有打开。",
    },
  ],
  [
    { type: "text", text: "桌边坐着的是" },
    { type: "feature", id: "people" },
    {
      type: "text",
      text: "一年只做两件，做到别人可以接着用，再开始下一件。",
    },
  ],
  [
    { type: "text", text: "如果你也想把一件产品折得更薄，写信到 " },
    {
      type: "link",
      href: "mailto:studio@zhezhi.studio",
      text: "studio@zhezhi.studio",
    },
    { type: "text", text: "。" },
  ],
];
