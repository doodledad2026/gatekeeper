#!/bin/bash

# ============================================================================
# GATEKEEPER — AUTOMATED DEPLOYMENT (Astro -> Vercel)
# ============================================================================
# 1. Installs Node dependencies
# 2. Optionally refreshes expert data from the Python backend
# 3. Deploys to Vercel (Vercel builds the Astro site remotely)
# ============================================================================

set -e

echo ""
echo "==> Gatekeeper deployment"
echo ""

if ! command -v node &> /dev/null; then
  echo "Node.js is required but not installed. Install from https://nodejs.org/"
  exit 1
fi
echo "Node.js found: $(node --version)"

echo ""
echo "==> Installing dependencies"
npm install

if command -v python3 &> /dev/null; then
  echo ""
  read -p "Refresh expert_data.json from live APIs before deploying? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    pip3 install --quiet requests
    python3 gatekeeper_backend_enhanced.py
    cp expert_data.json public/expert_data.json
    echo "Copied refreshed data into public/expert_data.json"
  fi
else
  echo "Python 3 not found — skipping data refresh, using existing public/expert_data.json"
fi

echo ""
echo "==> Deploying to Vercel"

if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel --quiet
fi

vercel --prod

echo ""
echo "Done. Your live URL is printed above."
echo ""
