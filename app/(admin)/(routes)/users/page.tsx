import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getUsers() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', { cache: 'no-cache' });
	const users = await res.json();
	return users;
}

const UserPage = async () => {
	const users = await getUsers();

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Usuarios</h3>
				<Button>
					<Link href='/users/create'>Crear usuario</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={users} />
			</div>
		</div>
	);
};

export default UserPage;
