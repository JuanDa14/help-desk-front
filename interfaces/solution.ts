import { Problem } from './problem';

export enum SolutionType {
	'Software' = 'Software',
	'Hardware' = 'Hardware',
	'Otros' = 'Otros',
}

export interface Solution {
	_id: string;
	title: string;
	description: string;
	type: SolutionType;
	manual: string;
	problem: Problem;
	createdAt: string;
	updatedAt: string;
}
