import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormManual } from '../_components/form-manual';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getManual(id: string, access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/manuals/' + id, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const problem = await res.json();
	return problem;
}

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

const CreateManualPage = async ({ params }: { params: { manualId: string } }) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const [solutions, problem] = await Promise.all([
		getSolutions(session.accessToken),
		getManual(params.manualId, session.accessToken),
	]);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Manual</h3>
				<Button>
					<Link href='/manuals'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormManual initialData={problem} solutions={solutions} />
			</div>
		</div>
	);
};

export default CreateManualPage;
