import { Problem } from '@/interfaces/problem';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';

interface NotificationModalProps {
	children: React.ReactNode;
	notifications: Problem[];
}

export const NotificationModal = ({ children, notifications }: NotificationModalProps) => {
	const router = useRouter();

	const onNavigate = (id: string) => {
		router.push(`/problems/show/${id}`);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='space-y-4'>
					<DialogTitle>Problemas Pendientes</DialogTitle>
					<Separator />
					<DialogDescription>
						{notifications.length === 0 ? (
							<div>
								<p className='text-center text-sm'>No hay problemas pendientes</p>
							</div>
						) : (
							notifications.map((notification, i) => {
								return (
									<div
										onClick={() => onNavigate(notification._id)}
										key={notification._id}
										className='flex gap-2 justify-between items-center'
									>
										<span className='text-sm line-clamp-1'>
											{i + 1}. {notification.title}
										</span>
										<Button variant={'secondary'} size={'icon'}>
											<span className='text-sm'>Ver</span>
										</Button>
									</div>
								);
							})
						)}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
