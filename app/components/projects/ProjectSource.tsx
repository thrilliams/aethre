import { SourceType } from '@prisma/client';
import { Button } from '../ui/button';
import { RichProject } from './ProjectDisplay';

interface ProjectDateProps {
	project: RichProject;
}

export default function ProjectDate({ project }: ProjectDateProps) {
	if (project.sourceUrl === null) return null;

	return (
		<div className="flex justify-center">
			<Button variant="outline" asChild>
				<a href={project.sourceUrl} target="_blank" className="gap-1">
					{project.sourceType === SourceType.NONE && <>view project</>}
					{project.sourceType === SourceType.GITHUB && <>view source on github</>}
				</a>
			</Button>
		</div>
	);
}
