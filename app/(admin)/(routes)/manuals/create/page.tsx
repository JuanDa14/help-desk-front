import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormManual } from '../_components/form-manual';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

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

const CreateProblemPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const solutions = await getSolutions(session.accessToken);

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
				<FormManual initialData={null} solutions={solutions} />
			</div>
		</div>
	);
};

export default CreateProblemPage;
