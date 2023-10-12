import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormRole } from '../_components/form-role';

const CreateRolePage = async () => {
	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Rol</h3>
				<Button>
					<Link href='/roles'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormRole initialData={null} />
			</div>
		</div>
	);
};

export default CreateRolePage;
