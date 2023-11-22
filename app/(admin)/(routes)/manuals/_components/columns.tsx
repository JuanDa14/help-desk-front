'use client';

import Link from 'next/link';
import { ArrowUpDown, Eye, EyeIcon, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Manual } from '@/interfaces/manual';
import { Preview } from '@/components/preview';
import { ShowManualModal } from '@/components/modals/show-manual-modal';
import { ProtectedAreaComponent } from '@/components/protected-area-component';

export const columns: ColumnDef<Manual>[] = [
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
		cell: ({ row }) => {
			return (
				<span className='text-xs font-medium capitalize line-clamp-1'>
					{row.original.title}
				</span>
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
					Descripción
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <p className='text-xs line-clamp-1'>{row.original.description}</p>;
		},
	},
	{
		accessorKey: 'solution',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Solución asociada
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<span className='text-xs font-medium capitalize'>{row.original.solution.title}</span>
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
					<ProtectedAreaComponent areas={'TECNOLOGÍA DE LA INFORMACIÓN'}>
						<Link href={`/manuals/${_id}`}>
							<Button size={'icon'} type='button'>
								<Pencil className='w-4 h-4' />
							</Button>
						</Link>
					</ProtectedAreaComponent>
					<ShowManualModal manual={row.original}>
						<Button size={'icon'}>
							<EyeIcon className='w-4 h-4' />
						</Button>
					</ShowManualModal>
				</div>
			);
		},
	},
];
