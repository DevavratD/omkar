import { getAllResults } from '@/lib/db';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let typedResults: any[] = [];
  try {
    typedResults = await getAllResults();
  } catch (err) {
    console.error('Error fetching admin results:', err);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
      <AdminClient typedResults={typedResults} />
    </div>
  );
}
