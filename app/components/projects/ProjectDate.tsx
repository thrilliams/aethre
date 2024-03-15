import { isAfter, isBefore } from 'date-fns';
import { formatPrettyDate, formatToNow } from '~/util/formatDate';
import { Jsonify } from '~/util/jsonify';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '~/components/ui/tooltip';
import { Button } from '~/components/ui/button';
import { RichProject } from './ProjectDisplay';

interface ProjectDateProps {
	project: RichProject;
}

export function ProjectDate({ project }: ProjectDateProps) {
	const weekMs = 1000 * 60 * 60 * 24 * 7;
	// if true, display full date. if false, display relative to now
	const displayLonghand = isBefore(project.updatedAt, Date.now() - weekMs);
	const prettyUpdatedDate = formatPrettyDate(project.updatedAt);

	return (
		<>
			{formatPrettyDate(project.createdAt)}
			{isAfter(project.updatedAt, project.createdAt) && (
				<>
					{' '}
					(updated{' '}
					{displayLonghand ? (
						prettyUpdatedDate
					) : (
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<span className="underline decoration-dotted">
										{formatToNow(project.updatedAt)}
									</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>{prettyUpdatedDate}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					)
				</>
			)}
		</>
	);
}
