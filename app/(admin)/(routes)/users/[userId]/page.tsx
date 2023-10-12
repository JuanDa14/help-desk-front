import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormUser } from '../_components/form-user';

async function getRoles() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/roles', { cache: 'no-cache' });
	const roles = await res.json();
	return roles;
}

async function getUser(id: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, { cache: 'no-cache' });
	const user = await res.json();
	return user;
}

async function getAreas() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/areas', { cache: 'no-cache' });
	const roles = await res.json();
	return roles;
}

const CreateUserPage = async ({ params }: { params: { userId: string } }) => {
	const [roles, user, areas] = await Promise.all([getRoles(), getUser(params.userId), getAreas()]);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Usuario</h3>
				<Button>
					<Link href='/users'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormUser roles={roles} initialData={user} areas={areas} />
			</div>
		</div>
	);
};
export default CreateUserPage;
