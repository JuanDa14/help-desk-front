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

interface NotificationModalProps {
	children: React.ReactNode;
	notifications: Problem[];
}

export const NotificationModal = ({ children, notifications }: NotificationModalProps) => {
	const router = useRouter();

	const onNavigate = (id: string) => {
		router.push(`/problems/${id}`);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Problemas Pendientes</DialogTitle>
					<DialogDescription>
						{notifications.map((notification, i) => {
							return (
								<div key={i} className='flex gap-x-2 justify-between items-center'>
									<span className='text-sm font-medium'>
										{i + 1}. {notification.title}
									</span>
								</div>
							);
						})}
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
