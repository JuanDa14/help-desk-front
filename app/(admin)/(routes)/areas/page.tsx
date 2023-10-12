import { Separator } from '@/components/ui/separator';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getAreas() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/areas', { cache: 'no-cache' });
	const areas = await res.json();
	return areas;
}

const AreaPage = async () => {
	const areas = await getAreas();

	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-4xl font-medium'>Areas</h3>
				<Button>
					<Link href='/areas/create'>Crear Area</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<DataTable columns={columns} data={areas} />
			</div>
		</div>
	);
};

export default AreaPage;
