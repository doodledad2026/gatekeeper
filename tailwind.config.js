/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        paper: 'var(--color-paper)',
        'paper-alt': 'var(--color-paper-alt)',
        panel: 'var(--color-panel)',
        line: 'var(--color-line)',
        signal: 'var(--color-signal)',
        'signal-soft': 'var(--color-signal-soft)',
        navy: 'var(--color-navy)',
        'risk-low': 'var(--color-risk-low)',
        'risk-medium': 'var(--color-risk-medium)',
        'risk-high': 'var(--color-risk-high)',
        'risk-critical': 'var(--color-risk-critical)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
    },
  },
};
