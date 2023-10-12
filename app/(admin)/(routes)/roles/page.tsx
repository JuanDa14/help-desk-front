import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getRoles() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/roles', { cache: 'no-cache' });
	const roles = await res.json();
	return roles;
}

const RolePage = async () => {
	const roles = await getRoles();

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Roles</h3>
				<Button>
					<Link href='/roles/create'>Crear Rol</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={roles} />
			</div>
		</div>
	);
};

export default RolePage;
