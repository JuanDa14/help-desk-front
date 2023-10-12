import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormSolution } from '../_components/form-solution';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Solution } from '@/interfaces/solution';
import { ProblemState } from '@/interfaces/problem';

async function getSolution(id: string, access_token: string): Promise<Solution> {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/solutions/' + id, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const solution = await res.json();
	return solution;
}

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

const CreateSolutionPage = async ({ params }: { params: { solutionId: string } }) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const [solution, problems] = await Promise.all([
		getSolution(params.solutionId, session.accessToken),
		getProblems(session.accessToken),
	]);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Problema</h3>
				<Button>
					<Link href='/solutions'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormSolution initialData={solution} problems={problems} />
			</div>
		</div>
	);
};

export default CreateSolutionPage;
