'use client';

import Link from 'next/link';
import { ArrowUpDown, Files, FolderArchive, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Solution } from '@/interfaces/solution';
import { Preview } from '@/components/preview';
import { format } from 'date-fns';

export const columns: ColumnDef<Solution>[] = [
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
		cell: ({ row }) => (
			<span className='text-xs font-medium capitalize'>{row.original.title}</span>
		),
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Fecha de registro
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<span className='text-sm'>
					{format(new Date(row.original.createdAt), 'dd-MM-yyyy')}
				</span>
			);
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
		accessorKey: 'problem',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Problema asociado
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='text-xs font-medium capitalize'>{row.original.problem.title}</span>
		),
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: ({ row }) => {
			const { _id } = row.original;
			return (
				<div className='flex items-center justify-center gap-x-2'>
					<Link href={`/solutions/${_id}`}>
						<Button size={'icon'} type='button'>
							<Pencil className='w-4 h-4' />
						</Button>
					</Link>
					<Link href={`/manuals/create?solutionId=${_id}`}>
						<Button size={'icon'} type='button' title='Crear Manual'>
							<FolderArchive className='w-4 h-4' />
						</Button>
					</Link>
				</div>
			);
		},
	},
];
