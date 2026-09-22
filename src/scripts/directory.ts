// Client-side search/filter for the live expert directory.
// Fetches /expert_data.json at runtime so the record set can be
// refreshed independently of the Astro build.

type Retractions = { count: number; reason: string; year: number } | null;
type License = { status: "Active" | "Suspended" | "Revoked"; board: string };
type Academic = { h_index: number; citations: number; source: string };
type Funding = { amount: number; grants: number; source: string } | null;
type Litigation = { appearances: number; categories: string[]; label: string; source: string } | null;
type Patents = { count: number; source: string } | null;
type Publications = { count: number; source: string };

type Expert = {
  name: string;
  specialty: string;
  industry: string;
  score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  summary: string;
  flags: string[];
  original_sources: string[];
  dossier: {
    retractions: Retractions;
    license: License;
    academic: Academic;
    funding: Funding;
    litigation: Litigation;
    patents: Patents;
    publications: Publications;
  };
};

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

function money(n: number) {
  return n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
}

type DossierRow = { label: string; detail: string; source: string; tone: "critical" | "medium" | "neutral" };

function buildDossierRows(d: Expert["dossier"]): DossierRow[] {
  const rows: DossierRow[] = [];

  if (d.retractions) {
    rows.push({
      label: `${d.retractions.count} RETRACTION${d.retractions.count > 1 ? "S" : ""}`,
      detail: `${d.retractions.reason} (${d.retractions.year})`,
      source: "RetractionWatch",
      tone: "critical",
    });
  }

  rows.push({
    label: "H-INDEX " + d.academic.h_index,
    detail: `${d.academic.citations.toLocaleString()} citations`,
    source: d.academic.source,
    tone: "neutral",
  });

  rows.push({
    label: d.license.status === "Active" ? "LICENSE ACTIVE" : `LICENSE ${d.license.status.toUpperCase()}`,
    detail: d.license.board,
    source: d.license.board,
    tone: d.license.status === "Active" ? "neutral" : "critical",
  });

  if (d.funding) {
    rows.push({
      label: `${money(d.funding.amount)} FUNDING`,
      detail: `${d.funding.grants} grant${d.funding.grants > 1 ? "s" : ""}`,
      source: d.funding.source,
      tone: "medium",
    });
  }

  if (d.litigation) {
    rows.push({
      label: `${d.litigation.label.toUpperCase()}: ${d.litigation.appearances}`,
      detail: d.litigation.categories.join(", "),
      source: d.litigation.source,
      tone: "medium",
    });
  }

  if (d.patents) {
    rows.push({
      label: `${d.patents.count} PATENT${d.patents.count > 1 ? "S" : ""}`,
      detail: "Inventorship on file",
      source: d.patents.source,
      tone: "neutral",
    });
  }

  rows.push({
    label: `${d.publications.count} PUBLICATIONS`,
    detail: "Indexed record",
    source: d.publications.source,
    tone: "neutral",
  });

  return rows;
}

const TONE_CLASS: Record<DossierRow["tone"], string> = {
  critical: "text-risk-critical",
  medium: "text-signal",
  neutral: "text-ink",
};

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
  const summaryTone: Record<Expert["risk_level"], string> = {
    LOW: "text-ink-soft",
    MEDIUM: "text-risk-medium",
    HIGH: "text-risk-high",
    CRITICAL: "text-risk-critical",
  };
  const summaryLine = document.createElement("p");
  summaryLine.className = `mt-1 truncate text-xs ${expert.flags.length ? summaryTone[expert.risk_level] : "text-ink-soft"}`;
  summaryLine.textContent = expert.summary;
  nameBlock.append(name, specialty, summaryLine);

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
  panel.className = "pb-5";

  const panelHead = document.createElement("h4");
  panelHead.className = "mb-2 font-mono text-[11px] tracking-widest text-ink-soft uppercase";
  panelHead.textContent = "Data sources (8 free tools)";
  panel.append(panelHead);

  const grid = document.createElement("div");
  grid.className = "border-t border-line";
  buildDossierRows(expert.dossier).forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-line/60 py-2 text-xs";

    const left = document.createElement("span");
    left.className = `font-mono font-semibold ${TONE_CLASS[row.tone]}`;
    left.textContent = row.label;

    const mid = document.createElement("span");
    mid.className = "flex-1 text-ink-soft";
    mid.textContent = row.detail;

    const right = document.createElement("span");
    right.className = "font-mono text-[11px] text-ink-soft/70 uppercase";
    right.textContent = row.source;

    rowEl.append(left, mid, right);
    grid.append(rowEl);
  });
  panel.append(grid);

  const sourcesLine = document.createElement("p");
  sourcesLine.className = "mt-3 text-xs text-ink-soft";
  const sourcesLabel = document.createElement("span");
  sourcesLabel.className = "font-semibold text-ink";
  sourcesLabel.textContent = "Original sources: ";
  sourcesLine.append(sourcesLabel, document.createTextNode(expert.original_sources.join(", ")));
  panel.append(sourcesLine);

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

    const flagged = filtered.filter((e) => e.flags.length > 0).length;
    count.textContent = `${filtered.length} of ${experts.length} records — ${flagged} with findings`;

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
