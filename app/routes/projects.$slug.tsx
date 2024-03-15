import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';
import { ProjectDisplay } from '~/components/projects/ProjectDisplay';
import { ContentWrapper } from '~/components/ContentWrapper';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `${data?.title || 'unknown project'} | the aethre` }];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	// saves us some repitition later
	const notFoundResponse = new Response(null, {
		status: 404,
		statusText: 'project not found'
	});

	const slug = params.slug;

	// if an invalid slug was passed, not found
	if (slug === undefined || slug === '') throw notFoundResponse;

	// get the project with the slug matching the one in the request
	const project = await prisma.project.findFirst({
		where: { slug },
		include: { author: true, tags: true }
	});

	// if no project was found, not found
	if (project === null) throw notFoundResponse;

	// we need the user's auth state to decide whether to show them unpublished projects
	const currentUser = await getUser(request);

	// if the project is unpublished and the current user is not the author, not found
	if (!project.published && project.authorId !== currentUser?.id) throw notFoundResponse;

	// otherwise, the project is real and can be shown
	return project;
};

export default function ProjectPage() {
	const project = useLoaderData<typeof loader>();

	return (
		<ContentWrapper>
			<ProjectDisplay project={project} />
		</ContentWrapper>
	);
}
