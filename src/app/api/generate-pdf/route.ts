import { NextRequest, NextResponse } from 'next/server';
import { getResultById } from '@/lib/db';
import { generatePdf } from '@/lib/pdf/pdfGenerator';
import { buildPsychometricTemplate } from '@/lib/pdf/psychometricTemplate';
import { buildAptitudeTemplate } from '@/lib/pdf/aptitudeTemplate';
import { buildInsightSummaryTemplate } from '@/lib/pdf/insightTemplate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function generatePdfResponse(type: string, resultId: string, candidateName?: string) {
  try {
    if (!type || !resultId) {
      return NextResponse.json({ error: 'Missing type or resultId' }, { status: 400 });
    }

    const result = await getResultById(resultId);
    if (!result || !result.report) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    const report = result.report as any;
    const name = candidateName || report.candidate_info?.name || 'Candidate';
    const date = new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    let html = '';
    let filename = '';

    if (type === 'psychometric') {
      if (!('career_orientation_summary' in report)) {
        return NextResponse.json({ error: 'Not a psychometric report' }, { status: 400 });
      }
      html = await buildPsychometricTemplate(report, name, date);
      filename = `psychometric-report-${resultId}.pdf`;
    } else if (type === 'aptitude') {
      if (!('aptitude_summary' in report)) {
        return NextResponse.json({ error: 'Not an aptitude report' }, { status: 400 });
      }
      html = await buildAptitudeTemplate(report, name, date);
      filename = `aptitude-report-${resultId}.pdf`;
    } else if (type === 'insight') {
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
      filename = `insight-summary-${resultId}.pdf`;
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const pdfBuffer = await generatePdf(html);
    const body = new Uint8Array(pdfBuffer);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('PDF Generation Error:', err);
    return NextResponse.json(
      { error: 'PDF generation failed', detail: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, resultId, candidateName } = await req.json();
    return await generatePdfResponse(type, resultId, candidateName);
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resultId = searchParams.get('id');
  const type = searchParams.get('type');

  if (!resultId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const result = await getResultById(resultId);
  if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const finalType = type || (result.test_type === 'combined' ? 'insight' : result.test_type);

  return await generatePdfResponse(finalType || 'psychometric', resultId);
}
