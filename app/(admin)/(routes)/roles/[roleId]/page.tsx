import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormRole } from '../_components/form-role';

async function getRole(id: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/roles/' + id, { cache: 'no-cache' });
	const rol = await res.json();
	return rol;
}

const CreateRolPage = async ({ params }: { params: { roleId: string } }) => {
	const rol = await getRole(params.roleId);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Rol</h3>
				<Button>
					<Link href='/roles'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormRole initialData={rol} />
			</div>
		</div>
	);
};

export default CreateRolPage;
