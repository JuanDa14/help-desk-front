'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Trash } from 'lucide-react';
import { User } from '@/interfaces/user';
import { Role } from '@/interfaces/role';

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
import { Separator } from '@/components/ui/separator';
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
import { Area } from '@/interfaces/area';

const createUserSchema = z.object({
	name: z.string({ required_error: 'El nombre es requerido' }).min(3, {
		message: 'El nombre debe tener al menos 3 caracteres.',
	}),
	username: z.string({ required_error: 'El nombre de usuario es requerido' }),
	password: z.string({ required_error: 'La contraseña es requerido' }).min(6, {
		message: 'La contraseña debe tener al menos 6 caracteres.',
	}),
	role: z
		.string({ required_error: 'El rol es requerido' })
		.min(1, { message: 'El rol es requerido.' }),
	area: z
		.string({ required_error: 'El area es requerido' })
		.min(1, { message: 'El area es requerido.' }),
	address: z
		.string({ required_error: 'La dirección es requerida' })
		.min(3, { message: 'La dirección debe tener al menos 3 caracteres.' }),
	state: z.enum(['Activo', 'Inactivo']),
});

const updateUserSchema = createUserSchema.omit({ password: true }).extend({
	password: z.string().optional(),
});

interface FormUserProps {
	initialData: User | null;
	roles: Role[];
	areas: Area[];
}

export const FormUser = ({ initialData, roles, areas }: FormUserProps) => {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(initialData ? updateUserSchema : createUserSchema),
		defaultValues: {
			...initialData,
			password: '',
			role: initialData?.role._id,
			state: initialData?.state ? 'Activo' : 'Inactivo',
			area: initialData?.area._id,
		} || {
			name: '',
			username: '',
			password: '',
			role: roles[0]._id,
			area: areas[0]._id,
			address: '',
			state: 'Activo',
		},
	});

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
		if (initialData) {
			try {
				const valuesUpdated = { ...values, state: values.state === 'Activo' ? true : false };
				await axios.patch(`/users/${initialData._id}`, valuesUpdated);
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/users');
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
				await axios.post('/users', res);
				toast({
					title: 'Exito',
					description: 'Operación exitosa',
				});
				router.refresh();
				router.push('/users');
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
			await axios.delete(`/users/${initialData?._id}`);
			toast({
				title: 'Exito',
				description: 'Operación exitosa',
			});
			router.refresh();
			router.push('/users');
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3'>
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
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre de usuario</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='usuario...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contraseña</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										type='password'
										placeholder='contraseña...'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='role'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rol</FormLabel>
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
												placeholder='Seleccione un rol'
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{roles.map((role) => (
											<SelectItem value={role._id} key={role._id}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='area'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Area</FormLabel>
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
										{areas.map((area) => (
											<SelectItem value={area._id} key={area._id}>
												{area.name}
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
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Direccion</FormLabel>
								<FormControl>
									<Input disabled={isSubmitting} placeholder='direccion...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
												placeholder='Seleccione un estado'
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

				<Button disabled={isSubmitting || isDeleting} type='submit'>
					Guardar
				</Button>
			</form>
		</Form>
	);
};
