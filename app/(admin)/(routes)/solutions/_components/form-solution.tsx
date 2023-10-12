'use client';

import { useRouter } from 'next/navigation';
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
import { Problem } from '@/interfaces/problem';
import { Editor } from '@/components/editor';

const createSolutionSchema = z.object({
	title: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	description: z.string({ required_error: 'La descripcion es requerida' }).min(3, {
		message: 'La descripcion debe tener al menos 3 caracteres.',
	}),
	type: z.enum(['Software', 'Hardware', 'Otros']),
	problem: z.string({ required_error: 'El problema es requerido' }).min(3, {
		message: 'El problema debe tener al menos 3 caracteres.',
	}),
});

interface FormSolutionProps {
	initialData: Solution | null;
	problems: Problem[];
}

export const FormSolution = ({ initialData, problems }: FormSolutionProps) => {
	const router = useRouter();

	const { data: session } = useSession();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createSolutionSchema>>({
		resolver: zodResolver(createSolutionSchema),
		defaultValues: { ...initialData, problem: initialData?.problem._id } || {
			title: '',
			description: '',
			type: 'Software',
			problem: '',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createSolutionSchema>) => {
		if (initialData) {
			try {
				await axios.patch(`/solutions/${initialData._id}`, values, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					description: 'Operación exitosa',
					title: 'Exito',
				});
				router.refresh();
				router.push('/solutions');
			} catch {
				toast({
					title: 'Error',
					description: 'Error al realizar la operación',
					variant: 'destructive',
				});
			}
		} else {
			try {
				await axios.post('/solutions', values, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/solutions');
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
			await axios.delete(`/solutions/${initialData?._id}`, {
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});
			toast({
				title: 'Exito',
				description: 'Operación exitosa',
			});
			router.refresh();
			router.push('/solutions');
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
						name='problem'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Problema</FormLabel>
								<Select
									disabled={isSubmitting}
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
										{problems.length === 0 ? (
											<>
												<SelectItem value={'1'} key={1}>
													No hay problemas
												</SelectItem>
											</>
										) : (
											<>
												{problems.map((problem) => (
													<SelectItem value={problem._id} key={problem._id}>
														{problem.title}
													</SelectItem>
												))}
											</>
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='title'
						control={form.control}
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
						name='type'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo</FormLabel>
								<Select
									disabled={isSubmitting}
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
										{['Software', 'Hardware', 'Otros'].map((row) => (
											<SelectItem value={row} key={row}>
												{row}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='description'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descripcion</FormLabel>
								<FormControl>
									<Editor disabled={isSubmitting} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isSubmitting || isDeleting || problems.length === 0} type='submit'>
					Guardar
				</Button>
			</form>
		</Form>
	);
};
