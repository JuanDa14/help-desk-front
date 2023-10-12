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
import { Role } from '@/interfaces/role';
import { Textarea } from '@/components/ui/textarea';

const createRoleSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	description: z.string({ required_error: 'La descripcion es requerida' }),
	state: z.enum(['Activo', 'Inactivo']),
});

interface FormRoleProps {
	initialData: Role | null;
}

export const FormRole = ({ initialData }: FormRoleProps) => {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createRoleSchema>>({
		resolver: zodResolver(createRoleSchema),
		defaultValues: {
			...initialData,
			state: initialData?.state ? 'Activo' : 'Inactivo',
		} || {
			name: '',
			description: '',
			state: 'Activo',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createRoleSchema>) => {
		if (initialData) {
			try {
				const valuesUpdated = { ...values, state: values.state === 'Activo' ? true : false };
				await axios.patch(`/roles/${initialData._id}`, valuesUpdated);
				toast({
					description: 'Operación exitosa',
					title: 'Exito',
				});
				router.refresh();
				router.push('/roles');
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
				await axios.post('/roles', res);
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/roles');
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
			await axios.delete(`/roles/${initialData?._id}`);
			toast({
				title: 'Exito',
				description: 'Operación exitosa',
			});
			router.refresh();
			router.push('/roles');
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
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='nombre...' {...field} />
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
								<FormLabel>Descripcion</FormLabel>
								<FormControl>
									<Textarea disabled={isSubmitting} placeholder='descripcion...' {...field} />
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
											{['Activo', 'Inactivo'].map((row) => (
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
