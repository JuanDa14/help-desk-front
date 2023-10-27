import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

async function getProblems(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/problems', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const problems = await res.json();

	return problems;
}

const ProblemPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const problems = await getProblems(session.accessToken);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Problemas</h3>
				<Button>
					<Link href='/problems/create'>Registrar Problema</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={problems} />
			</div>
		</div>
	);
};

export default ProblemPage;
