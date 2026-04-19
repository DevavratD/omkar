// ─── Chart Builder (Server-Side) ─────────────────────────────────────────────
//
// Generates Chart.js charts as base64 PNG strings for embedding in PDF HTML.
// Uses the `canvas` package which provides a Node.js Canvas implementation.

import { createCanvas } from 'canvas';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

const COLORS = {
  primary: '#2563eb',
  green:   '#16a34a',
  orange:  '#f59e0b',
  purple:  '#7c3aed',
  grey:    '#6b7280',
  red:     '#dc2626',
  teal:    '#0d9488',
};

// ─── Horizontal Bar Chart ─────────────────────────────────────────────────────

export function buildHorizontalBarChart(
  labels: string[],
  values: number[],
  colors: string[],
  title?: string
): string {
  const width = 700;
  const height = Math.max(300, labels.length * 48 + 80);
  const canvas = createCanvas(width, height) as any;

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      animation: false as any,
      plugins: {
        legend: { display: false },
        title: {
          display: !!title,
          text: title,
          font: { size: 13, weight: 'bold' },
          color: '#1e293b',
          padding: { bottom: 16 },
        },
      },
      scales: {
        x: {
          min: 0,
          max: 100,
          ticks: { font: { size: 10 }, color: '#475569' },
          grid: { color: '#f1f5f9' },
        },
        y: {
          ticks: { font: { size: 11 }, color: '#1e293b' },
          grid: { display: false },
        },
      },
    },
  };

  const chart = new Chart(canvas, config);
  const dataUrl = canvas.toDataURL('image/png');
  chart.destroy();
  return dataUrl;
}

// ─── Vertical Bar Chart ───────────────────────────────────────────────────────

export function buildVerticalBarChart(
  labels: string[],
  values: number[],
  colors: string[],
  title?: string
): string {
  const width = 600;
  const height = 320;
  const canvas = createCanvas(width, height) as any;

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: false,
      animation: false as any,
      plugins: {
        legend: { display: false },
        title: {
          display: !!title,
          text: title,
          font: { size: 13, weight: 'bold' },
          color: '#1e293b',
          padding: { bottom: 16 },
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { font: { size: 10 }, color: '#475569' },
          grid: { color: '#f1f5f9' },
        },
        x: {
          ticks: { font: { size: 10 }, color: '#1e293b', maxRotation: 30 },
          grid: { display: false },
        },
      },
    },
  };

  const chart = new Chart(canvas, config);
  const dataUrl = canvas.toDataURL('image/png');
  chart.destroy();
  return dataUrl;
}

// ─── Radar Chart ─────────────────────────────────────────────────────────────

export function buildRadarChart(
  labels: string[],
  values: number[],
  title?: string
): string {
  const width = 440;
  const height = 400;
  const canvas = createCanvas(width, height) as any;

  const config: ChartConfiguration = {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: 'rgba(37,99,235,0.15)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4,
      }],
    },
    options: {
      responsive: false,
      animation: false as any,
      plugins: {
        legend: { display: false },
        title: {
          display: !!title,
          text: title,
          font: { size: 13, weight: 'bold' },
          color: '#1e293b',
          padding: { bottom: 12 },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { font: { size: 9 }, color: '#94a3b8', stepSize: 25 },
          pointLabels: { font: { size: 11 }, color: '#1e293b' },
          grid: { color: '#e2e8f0' },
          angleLines: { color: '#e2e8f0' },
        },
      },
    },
  };

  const chart = new Chart(canvas, config);
  const dataUrl = canvas.toDataURL('image/png');
  chart.destroy();
  return dataUrl;
}

// ─── Color Assignment Helpers ─────────────────────────────────────────────────

export function scoreColors(values: number[]): string[] {
  return values.map(v => {
    if (v >= 75) return COLORS.green;
    if (v >= 55) return COLORS.primary;
    if (v >= 40) return COLORS.orange;
    return COLORS.red;
  });
}

export const PALETTE = [
  COLORS.primary, COLORS.green, COLORS.orange, COLORS.purple,
  COLORS.teal, COLORS.grey, COLORS.red,
];
