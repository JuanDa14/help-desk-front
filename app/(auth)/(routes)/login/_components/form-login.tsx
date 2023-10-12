'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
const formSchema = z.object({
	username: z.string({ required_error: 'Requerido' }).min(2, {
		message: 'El nombre de usuario debe tener al menos 2 caracteres',
	}),
	password: z.string({ required_error: 'Requerido' }).min(8, {
		message: 'La contraseña debe tener al menos 8 caracteres',
	}),
});

export const FormLogin = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: 'password',
			username: 'admin',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await signIn('credentials', {
			username: values.username,
			password: values.password,
			redirect: true,
			callbackUrl: '/',
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de usuario</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									{...field}
									placeholder='nombre de usuario...'
								/>
							</FormControl>
							<FormDescription className='text-xs'>
								El nombre de usuario debe tener al menos 2 caracteres
							</FormDescription>
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
									disabled={form.formState.isSubmitting}
									type='password'
									{...field}
									placeholder='contra...'
								/>
							</FormControl>
							<FormDescription className='text-xs'>
								La contraseña debe tener al menos 8 caracteres
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={form.formState.isSubmitting} className='w-full'>
					Ingresar
				</Button>
			</form>
		</Form>
	);
};
