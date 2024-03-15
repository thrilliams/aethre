import * as React from 'react';

import { CalendarDays } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { formatPrettyDate } from '~/util/formatDate';

interface DatePickerProps {
	value?: Date;
	onChange?: (date?: Date) => void;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
	({ value, onChange }, ref) => {
		const [dateState, setDateState] = React.useState<Date>();

		let date = value || dateState;
		let setDate = onChange || setDateState;

		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
						ref={ref}
					>
						<CalendarDays className="mr-2 h-4 w-4" />
						{date ? formatPrettyDate(date) : <span>pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
				</PopoverContent>
			</Popover>
		);
	}
);
