import { Project, Tag, User } from '@prisma/client';
import { useContext } from 'react';
import { Remark } from 'react-remark';
import { Separator } from '~/components/ui/separator';
import { Authentication } from '~/util/auth/authenticationContext';
import { Jsonify } from '~/util/jsonify';
import { SiteLink } from '../SiteLink';
import { ProjectFrontMatter } from './ProjectFrontMatter';
import ProjectSource from './ProjectSource';
import classNames from 'classnames';

export type RichProject = Jsonify<Project & { author: User; tags: Tag[] }>;

interface ProjectDisplayProps {
	// this almost does nothing, but Dates are serialized as strings, so its best to be safe
	project: RichProject;
	managing?: boolean;
	dialog?: boolean;
}

export function ProjectDisplay({ project, managing, dialog }: ProjectDisplayProps) {
	const user = useContext(Authentication);

	return (
		<div className={classNames('space-y-4 w-full', !dialog && 'mx-4 mt-8 mb-16')}>
			<ProjectFrontMatter
				project={project}
				managing={managing === undefined ? user?.id === project.authorId : managing}
			/>
			<Separator />
			<Remark
				rehypeReactOptions={{
					components: {
						a: (props: any) => <SiteLink className="text-blue-500" {...props} />
					}
				}}
			>
				{project.content}
			</Remark>
			<ProjectSource project={project} />
		</div>
	);
}
