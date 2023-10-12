import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormSolution } from '../_components/form-solution';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { ProblemState } from '@/interfaces/problem';

async function getProblems(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL +'/problems/state/' + ProblemState.Pendiente, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const problems = await res.json();
	return problems;
}

const CreateSolutionPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const problems = await getProblems(session.accessToken);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Solucion</h3>
				<Button>
					<Link href='/problems'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormSolution problems={problems} initialData={null} />
			</div>
		</div>
	);
};

export default CreateSolutionPage;
