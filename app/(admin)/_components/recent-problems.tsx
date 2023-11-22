'use client';

import { Badge } from '@/components/ui/badge';
import { Problem, ProblemState } from '@/interfaces/problem';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface RecentProblemsProps {
	problems: Problem[];
}

export function RecentProblems({ problems }: RecentProblemsProps) {
	return (
		<div className='space-y-8 w-full'>
			{problems.map((problem) => (
				<div key={problem._id} className='flex items-center justify-between'>
					<div className='ml-4 space-y-1'>
						<p className='text-sm font-medium leading-none line-clamp-1'>
							Titulo: {problem.title}
						</p>
						<p className='text-sm text-muted-foreground'>
							Fecha de registro: {format(new Date(problem.createdAt), 'dd/MM/yyyy')}
						</p>
						<p className='text-sm text-muted-foreground'>
							Tipo: <span>{problem.type}</span>
						</p>
					</div>
					<div className='ml-auto font-medium'>
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
				</div>
			))}
		</div>
	);
}
