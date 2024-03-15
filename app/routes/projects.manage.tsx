import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { TagContext } from '~/components/projects/TagSelector';
import { getUser } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

// this loader runs on every page load at /projects/manage/* so we can safely not redirect on
// those pages (we should still check auth in case someone is being nefarious)
export const loader = async ({ request }: LoaderFunctionArgs) => {
	// if the user isn't authenticated, put them back at the main projects page
	const user = await getUser(request);
	if (user === null) return redirect('/projects');

	// we also load all extant tags for project management
	const tags = await prisma.tag.findMany();
	return tags;
};

// lets project manager edit tags without excessive fetching or loading
export default function ProjectsWrapper() {
	const tags = useLoaderData<typeof loader>();
	const extantTagState = useState(tags);

	return (
		<TagContext.Provider value={extantTagState}>
			<Outlet />
		</TagContext.Provider>
	);
}
