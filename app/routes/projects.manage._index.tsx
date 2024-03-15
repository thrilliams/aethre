import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSearchParams } from 'remix-params-helper';
import { ContentWrapper } from '~/components/ContentWrapper';
import { ProjectSearch } from '~/components/projects/search/ProjectSearch';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';
import { SearchProjectOptions, searchProjects } from '~/util/searchProjects';

export const meta: MetaFunction = () => {
	return [{ title: 'manage projects | the aethre' }];
};

export const handle = {
	hideBreadcrumb: true
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const params = getSearchParams(request, SearchProjectOptions);

	if (!params.success)
		throw json(params.errors, {
			status: 400,
			statusText: 'invalid request'
		});

	const user = await getUserOrError(request);

	const [projects, predicate] = await searchProjects(params.data, user);

	// used for displaying page info to the user
	const count = await prisma.project.count({ where: predicate });

	return [projects, count] as const;
};

export default function ManageProjectSearchResults() {
	const [projects, numProjects] = useLoaderData<typeof loader>();

	return (
		<ContentWrapper>
			<ProjectSearch projects={projects} totalProjects={numProjects} managing />
		</ContentWrapper>
	);
}
