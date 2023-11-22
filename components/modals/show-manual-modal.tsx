'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Preview } from '../preview';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Manual } from '@/interfaces/manual';

interface ShowManualModalProps {
	children: React.ReactNode;
	manual: Manual;
}

export const ShowManualModal = ({ children, manual }: ShowManualModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='space-y-4'>
					<DialogTitle className='line-clamp-1'>{manual.title}</DialogTitle>
					<Separator />
					<div className='flex flex-col gap-x-2 gap-y-2 item justify-center'>
						<p className='text-sm font-medium'>
							Desc. Manual:
							<span className='font-normal'> {manual.description}</span>
						</p>
						<div className='flex flex-col justify-center items-start border p-2 rounded-sm mt-2'>
							<Preview
								value={manual.description_solution}
								className='w-full h-64 overflow-y-auto'
							/>
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
