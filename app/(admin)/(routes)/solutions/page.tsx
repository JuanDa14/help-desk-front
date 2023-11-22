import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { ProblemState } from '@/interfaces/problem';
import { ProtectedAreaComponent } from '@/components/protected-area-component';

async function getSolutions(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/solutions', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const solutions = await res.json();
	return solutions;
}

const SolutionPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const solutions = await getSolutions(session.accessToken);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Soluciones</h3>
				<ProtectedAreaComponent areas={'TECNOLOGÍA DE LA INFORMACIÓN'}>
					<Button>
						<Link href='/solutions/create'>Registrar Solucion</Link>
					</Button>
				</ProtectedAreaComponent>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={solutions} />
			</div>
		</div>
	);
};

export default SolutionPage;
