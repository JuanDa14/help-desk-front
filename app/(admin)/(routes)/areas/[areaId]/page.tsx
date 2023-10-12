import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormArea } from '../_components/form-area';

async function getArea(id: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/areas/' + id, { cache: 'no-cache' });
	const area = await res.json();
	return area;
}

const CreateAreaPage = async ({ params }: { params: { areaId: string } }) => {
	const area = await getArea(params.areaId);

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Area</h3>
				<Button>
					<Link href='/areas'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormArea initialData={area} />
			</div>
		</div>
	);
};

export default CreateAreaPage;
