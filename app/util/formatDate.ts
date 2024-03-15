import { format, formatDistanceToNow, isBefore, parse } from 'date-fns';

// https://date-fns.org/v3.3.1/docs/format
export const formatPrettyDate = (date: Date | number | string) =>
	format(date, 'do MMMM, y').toLowerCase();

export const formatInputDate = (date: Date | number | string) => format(date, 'y-MM-dd');
export const parseInputDate = (date: string) => parse(date, 'y-MM-dd', new Date());

export const formatInputDatetime = (date: Date | number | string) =>
	format(date, "y-MM-dd'T'HH:mm:ss");
export const parseInputDatetime = (date: string) => parse(date, "y-MM-dd'T'HH:mm:ss", new Date());

export const formatToNow = (date: Date | number | string) => {
	// if the date is at least a week old, return the default formatting
	const weekMs = 1000 * 60 * 60 * 24 * 7;
	if (isBefore(date, Date.now() - weekMs)) return formatPrettyDate(date);

	// otherwise, return the date formatted relative to now
	return `${formatDistanceToNow(date).toLowerCase()} ago`;
};
