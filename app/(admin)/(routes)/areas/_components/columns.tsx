'use client';

import Link from 'next/link';
import { ArrowUpDown, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Area } from '@/interfaces/area';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Area>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Nombre
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='text-xs capitalize font-medium'>{row.getValue('name')}</span>
		),
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
		cell: ({ row }) => <span className='text-xs capitalize'>{row.original.description}</span>,
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
				<Badge className={cn('text-xs', row.original.state ? 'bg-green-700' : 'bg-red-700')}>
					{row.getValue('state') ? 'Activo' : 'Inactivo'}
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
					<Link href={`/areas/${_id}`}>
						<Button size={'icon'} type='button'>
							<Pencil className='w-4 h-4' />
						</Button>
					</Link>
				</div>
			);
		},
	},
];
