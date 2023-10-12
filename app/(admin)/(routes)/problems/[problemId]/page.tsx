import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormProblem } from '../_components/form-problem';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getProblem(id: string, access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/problems/' + id, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const problem = await res.json();
	return problem;
}

const CreateProblemPage = async ({ params }: { params: { problemId: string } }) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const problem = await getProblem(params.problemId, session.accessToken);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Problema</h3>
				<Button>
					<Link href='/problems'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormProblem initialData={problem} />
			</div>
		</div>
	);
};

export default CreateProblemPage;
