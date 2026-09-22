// Static site copy. Edit this file to change section content —
// nothing else in src/components needs to change.
import experts from "../../public/expert_data.json";

export type Expert = {
  name: string;
  specialty: string;
  industry: string;
  score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  data: Record<string, { success?: boolean }>;
};

export const allExperts = experts as Expert[];

export const siteStats = {
  totalExperts: allExperts.length,
  industries: 5,
  dataSources: 8,
};

export const industries = [
  {
    code: "01",
    name: "MDL / Medical",
    count: allExperts.filter((e) => e.industry === "MDL").length,
    description: "Publications, retractions, NIH funding, and clinical credentials.",
  },
  {
    code: "02",
    name: "Environmental Law",
    count: allExperts.filter((e) => e.industry === "Environmental Law").length,
    description: "Bar status, litigation history, and regulatory filings.",
  },
  {
    code: "03",
    name: "Financial",
    count: allExperts.filter((e) => e.industry === "Financial").length,
    description: "Certifications, disciplinary records, and published research.",
  },
  {
    code: "04",
    name: "Engineering",
    count: allExperts.filter((e) => e.industry === "Engineering").length,
    description: "Patents, licensure, and peer-reviewed publications.",
  },
  {
    code: "05",
    name: "Scientific",
    count: allExperts.filter((e) => e.industry === "Scientific").length,
    description: "ORCID history, grant funding, and preprint activity.",
  },
];

export const dataSources = [
  { name: "RetractionWatch", detail: "Retracted publications", key: "retractionwatch" },
  { name: "ORCID", detail: "50M+ researcher records", key: "orcid" },
  { name: "NIH Reporter", detail: "$40B+ tracked annually", key: "nih_reporter" },
  { name: "CrossRef", detail: "100M+ publication records", key: "crossref" },
  { name: "PubMed", detail: "30M+ medical papers", key: "pubmed" },
  { name: "arXiv", detail: "2M+ preprints", key: "arxiv" },
  { name: "USPTO Patents", detail: "10M+ patent records", key: "uspto_patents" },
  { name: "State Bar Registries", detail: "Attorney credential checks", key: "state_bar" },
];

export const indexEntries = [
  {
    code: "01",
    icon: "search",
    title: "Real-time search & filter",
    description: "Query by name or specialty, then narrow by industry or risk level instantly.",
  },
  {
    code: "02",
    icon: "alert",
    title: "Risk scoring",
    description: "Every record carries a computed score and a LOW / MEDIUM / HIGH / CRITICAL rating.",
  },
  {
    code: "03",
    icon: "link",
    title: "Source-level verification",
    description: "See exactly which of the 8 public registries confirmed each credential.",
  },
  {
    code: "04",
    icon: "device",
    title: "Built for the field",
    description: "A fast, legible record view on a phone in a deposition room, not just a desktop.",
  },
];

export const deploySteps = [
  {
    code: "01",
    title: "Automated",
    description: "One script fetches live data and deploys to Vercel.",
    command: "chmod +x deploy.sh\n./deploy.sh",
  },
  {
    code: "02",
    title: "Manual",
    description: "Fetch data yourself, then build and publish.",
    command: "python3 gatekeeper_backend_enhanced.py\nnpm run build\nvercel --prod",
  },
  {
    code: "03",
    title: "Git-connected",
    description: "Push to GitHub and import the repo for auto-deploys on every commit.",
    command: "git push origin main\n# import the repo at vercel.com/new",
  },
];
