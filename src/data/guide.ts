// Sidebar structure for the /guide/ section. Add a page by adding an
// entry here and a matching file in src/pages/guide/.
export type GuideLink = { label: string; href: string };
export type GuideGroup = { label: string; children: GuideLink[] };

export const guideNav: (GuideLink | GuideGroup)[] = [
  { label: "What is Gatekeeper", href: "/guide/what-is-gatekeeper/" },
  { label: "Why Use It", href: "/guide/why-use-it/" },
  { label: "How To Use", href: "/guide/how-to-use/" },
  {
    label: "Resources",
    children: [
      { label: "Scoring System", href: "/guide/scoring-system/" },
      { label: "Data Sources", href: "/guide/data-sources/" },
      { label: "FAQ", href: "/guide/faq/" },
    ],
  },
];

export function isGuideGroup(item: GuideLink | GuideGroup): item is GuideGroup {
  return "children" in item;
}
