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
import { format } from 'date-fns';

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
					<DialogTitle className='capitalize'>{problem.title}</DialogTitle>
					<Separator />
					<div className=' space-y-2'>
						<p>
							Registrado por: <span>{problem.user.name}</span>
						</p>
						<p>
							Fecha de registro:{' '}
							<span>{format(new Date(problem.createdAt), 'dd-MM-yyyy')}</span>
						</p>
						<p>
							Tipo de problema:
							<span> {problem.type}</span>
						</p>
						<div className='flex items-center gap-2'>
							<p>Estado: </p>
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
						</div>
						<div>
							<p>Desc. del problema</p>
							<div className='flex flex-col justify-center items-start border p-2 rounded-sm mt-2'>
								<Preview value={problem.description} />
							</div>
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
