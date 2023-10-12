'use client';

import { Problem, ProblemState } from '@/interfaces/problem';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Preview } from '../preview';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface ShowProblemModalProps {
	children: React.ReactNode;
	problem: Problem;
}

export const ShowProblemModal = ({ children, problem }: ShowProblemModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='space-y-4'>
					<DialogTitle>{problem.title}</DialogTitle>
					<Separator />
					<div className='flex flex-col gap-x-2 gap-y-2 item justify-center'>
						<span className='text-sm font-medium'>
							Registrado por: <span className='font-normal'>{problem.user.name}</span>
						</span>
						<span className='text-sm font-medium'>
							Problema de tipo:
							<span className='font-normal'> {problem.type}</span>
						</span>
						<span className='text-sm font-medium'>
							Estado:{' '}
							<Badge
								className={cn(
									'text-xs',
									problem.state === ProblemState['En proceso'] && 'bg-gray-500',
									problem.state === ProblemState.Pendiente && 'bg-orange-500',
									problem.state === ProblemState.Resuelto && 'bg-emerald-500'
								)}
							>
								{problem.state}
							</Badge>
						</span>
						<div className='flex flex-col justify-center items-start border p-2 rounded-sm mt-2'>
							<Preview value={problem.description} />
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
