'use client';

import Link from 'next/link';
import { ArrowUpDown, Eye, EyeIcon, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Problem, ProblemState } from '@/interfaces/problem';
import { Preview } from '@/components/preview';
import { ShowProblemModal } from '@/components/modals/show-problem-modal';

export const columns: ColumnDef<Problem>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Título
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},

	{
		accessorKey: 'description',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Desc. Problema
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <Preview value={row.original.description} />;
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Tipo
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'state',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Estado
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<Badge
					className={cn(
						'text-xs',
						row.original.state === ProblemState['En proceso'] && 'bg-gray-500',
						row.original.state === ProblemState.Pendiente && 'bg-orange-500',
						row.original.state === ProblemState.Resuelto && 'bg-emerald-500'
					)}
				>
					{row.original.state}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => {
			const { _id } = row.original;
			return (
				<div className='flex items-center justify-center gap-x-2'>
					{row.original.state !== ProblemState.Resuelto && (
						<Link href={`/problems/${_id}`}>
							<Button size={'icon'} type='button'>
								<Pencil className='w-4 h-4' />
							</Button>
						</Link>
					)}
					<ShowProblemModal problem={row.original}>
						<Button size={'icon'} type='button'>
							<EyeIcon className='w-4 h-4' />
						</Button>
					</ShowProblemModal>
				</div>
			);
		},
	},
];
