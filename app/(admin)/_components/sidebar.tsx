'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import { Users, Folder, List, Layout, FolderCheck, FilesIcon, FileWarning } from 'lucide-react';

import { cn } from '@/lib/utils';

const routes = [
	{
		icon: Layout,
		href: '/',
		label: 'Dashboard',
		private: false,
	},
	{
		icon: Users,
		href: '/users',
		label: 'Usuarios',
		private: true,
	},
	{
		icon: List,
		href: '/roles',
		label: 'Roles',
		private: true,
	},
	{
		icon: Folder,
		href: '/areas',
		label: 'Areas',
		private: true,
	},
	{
		icon: FileWarning,
		href: '/problems',
		label: 'Problemas',
		private: true,
	},
	{
		icon: FolderCheck,
		href: '/solutions',
		label: 'Soluciones',
		private: true,
	},
	{
		icon: FilesIcon,
		href: '/manuals',
		label: 'Manuales',
		private: true,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();

	const onNavigate = (url: string) => {
		return router.push(url);
	};

	return (
		<div className='space-y-4 w-56 flex flex-col h-full text-primary bg-secondary'>
			<div className='p-3 w-full justify-center'>
				<div className='space-y-2'>
					{routes.map((route) => (
						<div
							onClick={() => onNavigate(route.href)}
							className={cn(
								'text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
								pathname === route.href && 'bg-primary/10 text-primary'
							)}
							key={route.href}
						>
							<div className='w-full flex gap-x-2 items-center flex-1'>
								<route.icon className='h-5 w-5' />
								{route.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
