// Client-side search/filter for the live expert directory.
// Fetches /expert_data.json at runtime so the record set can be
// refreshed independently of the Astro build.

type SourceResult = { success?: boolean };

type Expert = {
  name: string;
  specialty: string;
  industry: string;
  score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  data: Record<string, SourceResult>;
};

const SOURCES: { key: string; label: string }[] = [
  { key: "retractionwatch", label: "RetractionWatch" },
  { key: "orcid", label: "ORCID" },
  { key: "nih_reporter", label: "NIH Reporter" },
  { key: "crossref", label: "CrossRef" },
  { key: "pubmed", label: "PubMed" },
  { key: "arxiv", label: "arXiv" },
  { key: "uspto_patents", label: "USPTO Patents" },
];

const RISK_STYLES: Record<Expert["risk_level"], string> = {
  LOW: "text-risk-low border-risk-low/40",
  MEDIUM: "text-risk-medium border-risk-medium/40",
  HIGH: "text-risk-high border-risk-high/40",
  CRITICAL: "text-risk-critical border-risk-critical/40",
};

const CHEVRON_SVG =
  '<svg class="size-4 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>';

function debounce<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function verifiedCount(data: Expert["data"]) {
  return SOURCES.filter((s) => data[s.key]?.success !== false).length;
}

function buildRow(expert: Expert): HTMLElement {
  const details = document.createElement("details");
  details.className = "group border-b border-line";

  const summary = document.createElement("summary");
  summary.className =
    "flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-4 [&::-webkit-details-marker]:hidden";

  const badge = document.createElement("span");
  badge.className = `border px-2 py-1 font-mono text-[11px] tracking-wider uppercase ${RISK_STYLES[expert.risk_level]}`;
  badge.textContent = `[ ${expert.risk_level} ]`;

  const nameBlock = document.createElement("div");
  nameBlock.className = "min-w-0 flex-1";
  const name = document.createElement("p");
  name.className = "truncate font-display font-bold";
  name.textContent = expert.name;
  const specialty = document.createElement("p");
  specialty.className = "truncate font-mono text-xs text-ink-soft";
  specialty.textContent = expert.specialty;
  nameBlock.append(name, specialty);

  const industry = document.createElement("span");
  industry.className = "hidden font-mono text-xs tracking-wide text-ink-soft uppercase sm:block";
  industry.textContent = expert.industry;

  const score = document.createElement("span");
  score.className = "font-mono text-sm tabular-nums text-ink-soft";
  score.textContent = `SCORE ${expert.score}`;

  const chevronWrap = document.createElement("span");
  chevronWrap.innerHTML = CHEVRON_SVG;

  summary.append(badge, nameBlock, industry, score, chevronWrap.firstElementChild as Node);

  const panel = document.createElement("div");
  panel.className = "grid grid-cols-1 gap-1 pb-5 sm:grid-cols-2";
  SOURCES.forEach((source) => {
    const ok = expert.data[source.key]?.success !== false;
    const row = document.createElement("div");
    row.className = "flex items-center justify-between border-b border-line/60 py-1.5 text-xs";
    const label = document.createElement("span");
    label.className = "text-ink-soft";
    label.textContent = source.label;
    const status = document.createElement("span");
    status.className = `font-mono uppercase ${ok ? "text-risk-low" : "text-ink-soft"}`;
    status.textContent = ok ? "Verified" : "Pending";
    row.append(label, status);
    panel.append(row);
  });

  details.append(summary, panel);
  return details;
}

export function initDirectory() {
  const searchInput = document.getElementById("directory-search") as HTMLInputElement | null;
  const industrySelect = document.getElementById("directory-industry") as HTMLSelectElement | null;
  const riskSelect = document.getElementById("directory-risk") as HTMLSelectElement | null;
  const results = document.getElementById("directory-results");
  const count = document.getElementById("directory-count");

  if (!searchInput || !industrySelect || !riskSelect || !results || !count) return;

  let experts: Expert[] = [];

  function render() {
    if (!results || !count) return;
    const term = searchInput!.value.trim().toLowerCase();
    const industry = industrySelect!.value;
    const risk = riskSelect!.value;

    const filtered = experts.filter((e) => {
      const matchesTerm =
        !term || e.name.toLowerCase().includes(term) || e.specialty.toLowerCase().includes(term);
      const matchesIndustry = !industry || e.industry === industry;
      const matchesRisk = !risk || e.risk_level === risk;
      return matchesTerm && matchesIndustry && matchesRisk;
    });

    count.textContent = `${filtered.length} of ${experts.length} records — ${filtered.reduce(
      (sum, e) => sum + verifiedCount(e.data),
      0
    )} source hits`;

    results.replaceChildren();
    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.className = "border-b border-line py-10 text-center text-sm text-ink-soft";
      empty.textContent = "No records match those filters.";
      results.append(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach((expert) => fragment.append(buildRow(expert)));
    results.append(fragment);
  }

  fetch("/expert_data.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: Expert[]) => {
      experts = data;
      render();
    })
    .catch(() => {
      if (!results || !count) return;
      count.textContent = "Unable to load records";
      results.replaceChildren();
      const error = document.createElement("p");
      error.className = "border-b border-line py-10 text-center text-sm text-ink-soft";
      error.textContent = "expert_data.json could not be loaded.";
      results.append(error);
    });

  searchInput.addEventListener("input", debounce(render, 150));
  industrySelect.addEventListener("change", render);
  riskSelect.addEventListener("change", render);
}
