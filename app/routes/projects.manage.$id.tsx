import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ContentWrapper } from '~/components/ContentWrapper';
import { ProjectManager } from '~/components/projects/ProjectManager';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `managing ${data?.title || 'unknown project'} | the aethre` }];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	// we only use 404s here because hypothetically someone could gain information by measuring
	// differences in status codes
	const notFoundResponse = new Response(null, {
		status: 404,
		statusText: 'project not found'
	});

	const id = params.id;
	if (id === undefined || id === '') throw notFoundResponse;

	const project = await prisma.project.findFirst({
		where: { id },
		include: { author: true, tags: true }
	});

	if (project === null) throw notFoundResponse;

	const currentUser = await getUserOrError(request);
	if (project.authorId !== currentUser.id) throw notFoundResponse;

	return project;
};

export default function ManageProject() {
	const project = useLoaderData<typeof loader>();

	return (
		<ContentWrapper>
			<ProjectManager project={project} />
		</ContentWrapper>
	);
}
