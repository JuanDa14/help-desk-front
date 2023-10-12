'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Problem } from '@/interfaces/problem';

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
import { Editor } from '@/components/editor';

const createProblemSchema = z.object({
	title: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	description: z.string({ required_error: 'La descripcion es requerida' }).min(3, {
		message: 'La descripcion debe tener al menos 3 caracteres.',
	}),
	type: z.enum(['Software', 'Hardware', 'Otros']),
	state: z.enum(['Pendiente', 'En proceso', 'Resuelto']),
});

interface FormProblemProps {
	initialData: Problem | null;
}

export const FormProblem = ({ initialData }: FormProblemProps) => {
	const router = useRouter();

	const { data: session } = useSession();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createProblemSchema>>({
		resolver: zodResolver(createProblemSchema),
		defaultValues: initialData || {
			title: '',
			description: '',
			type: 'Software',
			state: 'En proceso',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createProblemSchema>) => {
		if (initialData) {
			try {
				await axios.patch(`/problems/${initialData._id}`, values, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					description: 'Operación exitosa',
					title: 'Exito',
				});
				router.refresh();
				router.push('/problems');
			} catch {
				toast({
					title: 'Error',
					description: 'Error al realizar la operación',
					variant: 'destructive',
				});
			}
		} else {
			try {
				const { state, ...res } = values;
				await axios.post('/problems', res, {
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				});
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/problems');
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
			await axios.delete(`/problems/${initialData?._id}`, {
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});
			toast({
				title: 'Exito',
				description: 'Operación exitosa',
			});
			router.refresh();
			router.push('/problems');
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
						control={form.control}
						name='description'
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
					{initialData && (
						<FormField
							name='state'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estado</FormLabel>
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
											{['Pendiente', 'En proceso', 'Resuelto'].map((row) => (
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
					)}
				</div>

				<Button disabled={isSubmitting || isDeleting} type='submit'>
					Guardar
				</Button>
			</form>
		</Form>
	);
};
