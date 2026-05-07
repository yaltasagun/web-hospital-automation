import { useState, useEffect } from 'react';

const DARK_VARS = {
  '--bg0': '#060910', '--bg1': '#0c1220', '--bg2': '#111827',
  '--bg3': '#1a2338', '--bg4': '#1f2d44',
  '--text0': '#f0f6ff', '--text1': '#94a3b8', '--text2': '#4b607a',
  '--border':  'rgba(99,144,255,0.08)',
  '--border2': 'rgba(99,144,255,0.16)',
};

const LIGHT_VARS = {
  '--bg0': '#f0f4f8', '--bg1': '#ffffff', '--bg2': '#f0f4f8',
  '--bg3': '#e2e8f0', '--bg4': '#cbd5e1',
  '--text0': '#0f172a', '--text1': '#475569', '--text2': '#94a3b8',
  '--border':  'rgba(0,0,0,0.07)',
  '--border2': 'rgba(0,0,0,0.12)',
};

/**
 * Manages dark / light theme switching via CSS custom properties.
 * Returns [theme, setTheme] where theme is 'Dark' | 'Light'.
 */
export default function useTheme(initial = 'Dark') {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    const vars = theme === 'Light' ? LIGHT_VARS : DARK_VARS;
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
  }, [theme]);

  return [theme, setTheme];
}
