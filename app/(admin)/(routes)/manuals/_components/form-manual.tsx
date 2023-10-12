'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
// import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useState } from 'react';
import { axios } from '@/lib/axios';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { Solution } from '@/interfaces/solution';
import { Editor } from '@/components/editor';
import { Manual } from '@/interfaces/manual';

const createManualSchema = z.object({
	title: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	description: z.string({ required_error: 'La descripcion es requerida' }).min(3, {
		message: 'La descripcion debe tener al menos 3 caracteres.',
	}),
	description_solution: z.string({ required_error: 'La solucion es requerida' }).min(50, {
		message: 'La solucion debe tener al menos 3 caracteres.',
	}),
	solution: z.string({ required_error: 'La solucion es requerida' }).min(1, {
		message: 'La solucion es requerida.',
	}),
});

interface FormManualProps {
	initialData: Manual | null;
	solutions: Solution[];
}

export const FormManual = ({ initialData, solutions }: FormManualProps) => {
	const router = useRouter();

	const params = useSearchParams();
	const solutionId = params.get('solutionId')?.toString();

	const { data: session } = useSession();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createManualSchema>>({
		resolver: zodResolver(createManualSchema),
		defaultValues: initialData
			? { ...initialData, solution: initialData?.solution._id }
			: {
					title: '',
					description: '',
					description_solution: '',
					solution: params ? solutionId : solutions[0]._id,
			  },
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createManualSchema>) => {
		if (initialData) {
			try {
				await axios.patch(`/manuals/${initialData._id}`, values, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					description: 'Operación exitosa',
					title: 'Exito',
				});
				router.refresh();
				router.push('/manuals');
			} catch {
				toast({
					title: 'Error',
					description: 'Error al realizar la operación',
					variant: 'destructive',
				});
			}
		} else {
			try {
				await axios.post('/manuals', values, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/manuals');
			} catch {
				toast({
					title: 'Error',
					description: 'Error al realizar la operación',
					variant: 'destructive',
				});
			}
		}
	};

	const onDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/manuals/${initialData?._id}`, {
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});
			toast({
				title: 'Exito',
				description: 'Operación exitosa',
			});
			router.refresh();
			router.push('/manuals');
		} catch {
			toast({
				title: 'Error',
				description: 'Error al realizar la operación',
				variant: 'destructive',
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='grid grid-cols-1 gap-x-4 gap-y-3'>
					<FormField
						name='solution'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Solucion</FormLabel>
								<Select
									disabled={isSubmitting || !!solutionId}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='bg-background'>
											<SelectValue
												defaultValue={field.value}
												placeholder='Seleccione...'
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{solutions.map((solution) => (
											<SelectItem value={solution._id} key={solution._id}>
												{solution.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Titulo</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='titulo...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Desc. Manual</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='descripcion...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='description_solution'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Desc. Solucion</FormLabel>
								<FormControl>
									<Editor {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isSubmitting || isDeleting} type='submit'>
					Guardar
				</Button>
			</form>
		</Form>
	);
};
