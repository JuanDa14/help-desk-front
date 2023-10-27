import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { FileCheck, FileWarning, FilesIcon, Folder, List, Users2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getUsers(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const users = await res.json();
	return users;
}

async function getRoles(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/roles', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const roles = await res.json();
	return roles;
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
async function getAreas(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/areas', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const areas = await res.json();
	return areas;
}

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

const RootPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect('/login');
	}

	const [users, roles, areas, problems, manuals, solutions] = await Promise.all([
		getUsers(session.accessToken),
		getRoles(session.accessToken),
		getAreas(session.accessToken),
		getProblems(session.accessToken),
		getManuals(session.accessToken),
		getSolutions(session.accessToken),
	]);

	const cardList = [
		{
			label: 'Usuarios',
			value: users.length,
			Icon: Users2,
			private: true,
		},
		{
			label: 'Roles',
			value: roles.length,
			Icon: List,
			private: true,
		},
		{
			label: 'Áreas',
			value: areas.length,
			Icon: Folder,
			private: true,
		},
		{
			label: 'Problemas',
			value: problems.length,
			Icon: FileWarning,
			private: false,
		},
		{
			label: 'Soluciones',
			value: solutions.length,
			Icon: FileCheck,
			private: false,
		},
		{
			label: 'Manuales',
			value: manuals.length,
			Icon: FilesIcon,
			private: false,
		},
	];

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6'>
			{cardList.map((card, i) => (
				<Card
					key={i}
					className={cn(
						card.private ? (session.user.role.name === 'ADMINISTRADOR' ? '' : 'hidden') : ''
					)}
				>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total {card.label}</CardTitle>
						<card.Icon />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{card.value}</div>
						<p className='text-xs text-muted-foreground'>Registrados en el sistema</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default RootPage;
