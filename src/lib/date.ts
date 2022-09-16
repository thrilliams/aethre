import { format } from 'date-fns';

export const reformatDate = (date: string, formatString?: string) =>
	format(new Date(date), formatString || 'MMMM do, yyyy');
