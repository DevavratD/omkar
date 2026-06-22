import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { getResultById } from '../src/lib/db';
import { generatePdf } from '../src/lib/pdf/pdfGenerator';
import { buildAptitudeTemplate } from '../src/lib/pdf/aptitudeTemplate';
import { buildPsychometricTemplate } from '../src/lib/pdf/psychometricTemplate';
import { buildInsightSummaryTemplate } from '../src/lib/pdf/insightTemplate';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function run() {
  console.log('Fetching a mock result from Supabase/SQLite to test PDF generation...');
  
  // We can fetch a known result or just query the first available result
  const { getAllResults } = require('../src/lib/db');
  const results = await getAllResults();
  if (!results || results.length === 0) {
    console.error('No results found in the database to test PDF generation.');
    return;
  }
  
  const result = results[0];
  console.log(`Using result ID: ${result.id}, Type: ${result.test_type}`);
  
  const report = result.report as any;
  if (!report) {
    console.error('The selected result does not contain a report field.');
    return;
  }

  const name = report.candidate_info?.name || 'Test Candidate';
  const date = new Date().toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  let html = '';
  if (result.test_type === 'aptitude') {
    html = await buildAptitudeTemplate(report, name, date);
  } else if (result.test_type === 'psychometric') {
    html = await buildPsychometricTemplate(report, name, date);
  } else {
    // insight/combined
    const psychReport = report.psychometric_report || report;
    const aptReport = report.aptitude_report;
    const gapAnalysis = report.gap_analysis || [];
    const psychDomains = psychReport?.top_career_domains || [];
    const aptDomains = aptReport?.aptitude_aligned_domains || [];
    
    html = buildInsightSummaryTemplate({
      candidateName: name,
      date,
      primaryGapInsight: psychReport?.primary_gap_insight || null,
      contradictionNote: psychReport?.contradiction_note || null,
      gapAnalysis,
      psychDomains,
      aptDomains,
      cohort: report.cohort,
    });
  }

  console.log('Generating PDF buffer using Puppeteer...');
  const pdfBuffer = await generatePdf(html);
  
  const outputPath = path.join(__dirname, '../test-output.pdf');
  fs.writeFileSync(outputPath, pdfBuffer);
  console.log(`✅ PDF generated successfully and saved to: ${outputPath}`);
  console.log(`File size: ${pdfBuffer.length} bytes`);
}

run().catch(err => {
  console.error('❌ PDF generation failed:', err);
});
