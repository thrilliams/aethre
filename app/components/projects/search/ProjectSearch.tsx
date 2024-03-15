import { Link, useLocation } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { RichProject } from '../ProjectDisplay';
import { ProjectFrontMatter } from '../ProjectFrontMatter';
import { ProjectSearchPageNavigation } from './ProjectSearchPageNavigation';
import { ProjectSearchbar } from './ProjectSearchbar';

interface ProjectSearchProps {
	projects: RichProject[];
	totalProjects: number;
	managing?: boolean;
}

export function ProjectSearch({ projects, totalProjects, managing }: ProjectSearchProps) {
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const currentPage = Number(params.get('page')) || 1;
	const perPage = Number(params.get('perPage')) || 10;
	const numPages = Math.ceil(totalProjects / perPage);

	return (
		<>
			<ProjectSearchbar />

			{managing && (
				<div className="flex justify-center">
					<Button asChild>
						<Link to="/projects/manage/create">create project</Link>
					</Button>
				</div>
			)}

			{projects.map((project) => (
				<ProjectFrontMatter
					project={project}
					key={project.id}
					managing={managing}
					thumbnail
				/>
			))}

			{projects.length !== 0 ? (
				<ProjectSearchPageNavigation
					numProjects={projects.length}
					totalProjects={totalProjects}
					currentPage={currentPage}
					numPages={numPages}
					perPage={perPage}
				/>
			) : (
				<span className="italic mx-auto text-gray-400">there's nothing here...</span>
			)}
		</>
	);
}
