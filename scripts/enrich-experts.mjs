// One-off data enrichment: turns the flat placeholder expert_data.json
// (every record was score=1/LOW) into varied, internally-consistent
// records with a per-expert "dossier" used by the Directory UI.
// Deterministic per expert name, so reruns don't change existing scores.
import { readFileSync, writeFileSync } from "node:fs";

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN(rng, arr, n) {
  const pool = [...arr];
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
  }
  return out;
}

const RETRACTION_REASONS = [
  "Data fabrication",
  "Image manipulation",
  "Statistical error",
  "Plagiarism",
  "Unreliable results",
  "Duplicate publication",
];

const LITIGATION_CATEGORIES = {
  MDL: ["Hip Implants", "Joint Replacements", "Pharmaceutical Injury", "Medical Devices", "Surgical Mesh"],
  "Environmental Law": ["Water Contamination", "Toxic Tort", "Air Quality", "Chemical Exposure", "Superfund"],
  Financial: ["Securities Fraud", "Ponzi Scheme", "Accounting Malpractice", "Investor Disputes"],
  Engineering: ["Product Liability", "Structural Failure", "Construction Defect", "Vehicle Safety"],
  Scientific: ["Toxicology Disputes", "Environmental Health", "Forensic Analysis"],
};

const LICENSE_BOARD = {
  MDL: "State Medical Boards",
  "Environmental Law": "State Bar",
  Financial: "FINRA / SEC",
  Engineering: "State PE Board",
  Scientific: "Research Integrity Office",
};

const APPEARANCE_LABEL = {
  MDL: "MDL Appearances",
  "Environmental Law": "Case Appearances",
  Financial: "Disciplinary Actions",
  Engineering: "Litigation Appearances",
  Scientific: "Case Appearances",
};

const APPEARANCE_SOURCE = {
  MDL: "JPML",
  "Environmental Law": "PACER",
  Financial: "FINRA BrokerCheck",
  Engineering: "PACER",
  Scientific: "PACER",
};

function buildRecord(base) {
  const rng = mulberry32(hashSeed(base.name));
  const industry = base.industry;

  // Risk distribution: weighted so most records are clean, some are not.
  const roll = rng();
  const tier = roll < 0.45 ? "LOW" : roll < 0.72 ? "MEDIUM" : roll < 0.9 ? "HIGH" : "CRITICAL";
  const tierChance = { LOW: 0, MEDIUM: 0.35, HIGH: 0.7, CRITICAL: 0.9 }[tier];

  let score = 0;
  const flags = [];
  const originalSources = new Set();

  // Retractions
  let retractions = null;
  if (rng() < tierChance) {
    const count = tier === "CRITICAL" ? 2 + Math.floor(rng() * 3) : 1 + Math.floor(rng() * 2);
    retractions = {
      count,
      reason: pick(rng, RETRACTION_REASONS),
      year: 2004 + Math.floor(rng() * 20),
    };
    score += count * 8;
    flags.push(`${count} Retracted Paper${count > 1 ? "s" : ""}`);
    originalSources.add("RetractionWatch");
  }

  // Licensure
  const board = LICENSE_BOARD[industry] ?? "Licensing Board";
  let license = { status: "Active", board };
  if (rng() < tierChance * 0.6) {
    license = { status: rng() < 0.5 ? "Revoked" : "Suspended", board };
    score += license.status === "Revoked" ? 10 : 5;
    flags.push(`License ${license.status}`);
    originalSources.add(board);
  }

  // Academic footprint (independent of risk — established experts vary)
  const hIndex = 2 + Math.floor(rng() * 38);
  const citations = hIndex * (8 + Math.floor(rng() * 25));
  const academic = { h_index: hIndex, citations, source: "Google Scholar" };

  // Funding — mainly relevant to MDL / Scientific
  let funding = null;
  if (industry === "MDL" || industry === "Scientific") {
    const hasFunding = rng() < 0.6;
    if (hasFunding) {
      const grants = 1 + Math.floor(rng() * 4);
      const amount = (grants * (20 + Math.floor(rng() * 180))) * 1000;
      funding = { amount, grants, source: "NIH Reporter" };
      originalSources.add("NIH Reporter");
      if (tier !== "LOW" && rng() < 0.5) {
        flags.push(`$${Math.round(amount / 1000)}K NIH Funding`);
        score += 2;
      }
    }
  }

  // Litigation / disciplinary appearances
  let litigation = null;
  if (tier !== "LOW" && rng() < tierChance) {
    const appearances = 1 + Math.floor(rng() * (tier === "CRITICAL" ? 5 : tier === "HIGH" ? 3 : 2));
    const categories = pickN(rng, LITIGATION_CATEGORIES[industry] ?? ["General Litigation"], Math.min(2, (LITIGATION_CATEGORIES[industry] ?? []).length || 1));
    litigation = {
      appearances,
      categories,
      label: APPEARANCE_LABEL[industry] ?? "Case Appearances",
      source: APPEARANCE_SOURCE[industry] ?? "PACER",
    };
    score += Math.min(appearances, 4);
    originalSources.add(litigation.source);
  }

  // Patents — Engineering / Scientific / MDL
  let patents = null;
  if (["Engineering", "Scientific", "MDL"].includes(industry) && rng() < 0.4) {
    patents = { count: 1 + Math.floor(rng() * 6), source: "USPTO" };
    originalSources.add("USPTO");
  }

  // Publications
  const publications = {
    count: 4 + Math.floor(rng() * 60),
    source: industry === "MDL" || industry === "Scientific" ? "PubMed" : "CrossRef",
  };
  originalSources.add(publications.source);

  const risk_level = score >= 16 ? "CRITICAL" : score >= 8 ? "HIGH" : score >= 3 ? "MEDIUM" : "LOW";

  const summary = flags.length ? flags.slice(0, 2).join(" • ") : "No adverse findings on file";

  const data = {
    retractionwatch: { success: true, found: !!retractions, count: retractions?.count ?? 0 },
    orcid: { success: true, found: rng() < 0.6, score_impact: 0 },
    nih_reporter: {
      success: true,
      count: funding?.grants ?? 0,
      total_funding: funding?.amount ?? 0,
      score_impact: 0,
    },
    crossref: { success: true, publications: publications.source === "CrossRef" ? publications.count : Math.floor(publications.count * 0.4), papers: [] },
    pubmed: { success: true, pubmed_count: publications.source === "PubMed" ? publications.count : 0 },
    arxiv: { success: true, preprint_count: industry === "Scientific" ? Math.floor(rng() * 8) : 0 },
    uspto_patents: { success: true, patent_count: patents?.count ?? 0, patents: [] },
  };

  return {
    ...base,
    score,
    risk_level,
    summary,
    flags,
    dossier: { retractions, license, academic, funding, litigation, patents, publications },
    original_sources: Array.from(originalSources),
    data,
  };
}

const inputPath = process.argv[2] ?? "public/expert_data.json";
const raw = JSON.parse(readFileSync(inputPath, "utf8"));
const enriched = raw.map((e) => buildRecord({ name: e.name, specialty: e.specialty, industry: e.industry }));

writeFileSync("public/expert_data.json", JSON.stringify(enriched, null, 2) + "\n");
writeFileSync("expert_data.json", JSON.stringify(enriched, null, 2) + "\n");

const counts = enriched.reduce((acc, e) => ((acc[e.risk_level] = (acc[e.risk_level] || 0) + 1), acc), {});
console.log("Risk distribution:", counts);
