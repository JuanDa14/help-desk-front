import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { FileCheck, FileWarning, FilesIcon, Folder, List, Users2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { BarGraphic } from '../_components/bar-graphic';
import { RecentProblems } from '../_components/recent-problems';

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

async function getDashboard(access_token: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/dashboard', {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const dashboard = await res.json();
	return dashboard;
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

	const [dashboard, users, roles, areas, problems, manuals, solutions] = await Promise.all([
		getDashboard(session.accessToken),
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
		<div className='p-6'>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{cardList.map((card, i) => (
					<Card
						key={i}
						className={cn(
							card.private
								? session.user.role.name === 'ADMINISTRADOR'
									? ''
									: 'hidden'
								: ''
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
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-5'>
				<Card className='w-full col-span-1 lg:col-span-4'>
					<CardHeader>
						<CardTitle>Grafico de barras problemas por mes</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>
						<BarGraphic data={dashboard.charts.problemsByMonth} />
					</CardContent>
				</Card>
				<Card className='w-full col-span-1 lg:col-span-3'>
					<CardHeader>
						<CardTitle>Problemas recientes</CardTitle>
						<CardDescription>Ultimos 5 problemos registrados</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentProblems problems={dashboard.lastProblems} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RootPage;
