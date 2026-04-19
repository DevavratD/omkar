import { getResultData } from '@/app/actions/submit-assessment';
import MasterReport from '@/components/report/MasterReport';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ReportPrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getResultData(id);

  if (!result || !result.report) {
    notFound();
  }

  // Define candidate information mapped from the DB entity if available, else derive from mock
  const user = {
    name: 'Candidate Profile', // Typically extracted from user session or linked entity
    date: new Date().toLocaleDateString()
  };

  return <MasterReport report={result.report} user={user} resultId={id} />;
}
