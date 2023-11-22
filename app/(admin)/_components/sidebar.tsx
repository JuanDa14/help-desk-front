'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Users, Folder, List, FolderCheck, FileWarning, FolderArchive, Home } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ProtectedComponent } from '@/components/protected-component';
import { useSession } from 'next-auth/react';

const routes = [
	{
		icon: Home,
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
		private: false,
	},
	{
		icon: FolderCheck,
		href: '/solutions',
		label: 'Soluciones',
		private: false,
	},
	{
		icon: FolderArchive,
		href: '/manuals',
		label: 'Manuales',
		private: false,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const { data: session } = useSession();
	const router = useRouter();

	const onNavigate = (url: string) => {
		return router.push(url);
	};

	return (
		<div className='space-y-4 w-56 flex flex-col h-full bg-secondary'>
			<div className='p-3 w-full justify-center'>
				<div className='space-y-2'>
					{routes.map((route) => (
						<div key={route.href}>
							{route.private ? (
								<ProtectedComponent roles={'ADMINISTRADOR'}>
									<div
										onClick={() => onNavigate(route.href)}
										className={cn(
											'text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 hover:text-primary rounded-lg transition',
											pathname === route.href && 'bg-primary/10 text-primary',
											pathname?.startsWith(`${route.href}/`) &&
												'bg-primary/10 text-primary'
										)}
									>
										<div className='w-full flex gap-x-2 items-center flex-1'>
											<route.icon className='h-5 w-5' />
											{route.label}
										</div>
									</div>
								</ProtectedComponent>
							) : (
								<div
									onClick={() => onNavigate(route.href)}
									className={cn(
										'text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 hover:text-primary rounded-lg transition',
										pathname === route.href && 'bg-primary/10 text-primary',
										pathname?.startsWith(`${route.href}/`) && 'bg-primary/10 text-primary'
									)}
								>
									<div className='w-full flex gap-x-2 items-center flex-1'>
										<route.icon className='h-5 w-5' />
										{route.label}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
