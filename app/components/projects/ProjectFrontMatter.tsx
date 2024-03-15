import { Link } from '@remix-run/react';
import { cva } from 'class-variance-authority';
import { EyeOff, Pencil } from 'lucide-react';
import { SiteLink } from '~/components/SiteLink';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { ProjectDate } from './ProjectDate';
import { RichProject } from './ProjectDisplay';
import { TagComponent } from './TagComponent';

const frontMatter = cva('', {
	variants: {
		variant: {
			default: '',
			bordered: 'p-4 rounded-md border'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

interface ProjectFrontMatterProps {
	// this almost does nothing, but Dates are serialized as strings, so its best to be safe
	project: RichProject;
	thumbnail?: boolean;
	managing?: boolean;
}

export function ProjectFrontMatter({ project, thumbnail, managing }: ProjectFrontMatterProps) {
	const TitleComponent = thumbnail ? 'h1' : 'h2';
	const SummaryComponent = thumbnail ? 'h2' : 'h3';

	return (
		<div className={frontMatter({ variant: thumbnail ? 'bordered' : 'default' })}>
			<div className="w-full">
				<div className="flex gap-4 float-right ml-2 mb-2">
					{!project.published && (
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										className="cursor-auto opacity-50"
									>
										<EyeOff size="1rem" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>this project is not published</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{managing && (
						<Button variant="outline" size="icon" className="h-full" asChild>
							<Link to={`/projects/manage/${project.id}`}>
								<Pencil size="1rem" />
							</Link>
						</Button>
					)}
				</div>

				<TitleComponent className="text-lg">
					{thumbnail ? (
						<SiteLink href={`/projects/${project.slug}`}>{project.title}</SiteLink>
					) : (
						project.title
					)}
				</TitleComponent>
				<SummaryComponent className="italic">{project.summary}</SummaryComponent>
				<div className="mt-2 text-sm flex items-center gap-2">
					{project.tags.length > 0 ? (
						<>
							tagged with
							{project.tags.map((tag) => (
								<TagComponent tag={tag} link={!thumbnail} key={tag.slug} />
							))}
						</>
					) : (
						<i>this project is untagged</i>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-2 text-sm">
				<h3>{project.author.name}</h3>
				<h3>
					<ProjectDate project={project} />
				</h3>
			</div>
		</div>
	);
}
