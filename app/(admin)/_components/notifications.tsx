'use client';

import { NotificationModal } from '@/components/modals/notification-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Problem } from '@/interfaces/problem';
import { Mail } from 'lucide-react';

export const Notifications = ({ notifications }: { notifications: Problem[] }) => {
	return (
		<div className='relative'>
			<NotificationModal notifications={notifications}>
				<Button variant='ghost' size={'icon'}>
					<Mail />
					{notifications.length > 0 && (
						<Badge className='rounded-full text-xs py-1 px-2 absolute -top-1 right-0'>
							{notifications.length}
						</Badge>
					)}
				</Button>
			</NotificationModal>
		</div>
	);
};
