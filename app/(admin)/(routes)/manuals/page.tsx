import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

async function getManuals(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/manuals', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const manuals = await res.json();
	return manuals;
}

const Manual = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const manuals = await getManuals(session.accessToken);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Manuales</h3>
				<Button>
					<Link href='/manuals/create'>Nuevo Manual</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={manuals} />
			</div>
		</div>
	);
};

export default Manual;
