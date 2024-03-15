import { MetaFunction, useLoaderData } from '@remix-run/react';
import { ContentWrapper } from '~/components/ContentWrapper';
import { SiteLink } from '~/components/SiteLink';
import { SplashUser } from '~/components/SplashUser';
import { prisma } from '~/util/prisma.server';

export const meta: MetaFunction = () => {
	return [{ title: 'the aethre' }];
};

export const handle = {
	hideBreadcrumb: true
};

export const loader = async () => {
	const users = await prisma.user.findMany({
		include: {
			projects: {
				take: 10,
				where: {
					splash: { not: undefined },
					published: true
				}
			}
		}
	});

	return users;
};

export default function Index() {
	const users = useLoaderData<typeof loader>();

	return (
		<ContentWrapper className="space-y-16" variant="centerVertical">
			<div>
				{users.map((user) => (
					<SplashUser user={user} key={user.id} doCycle />
				))}
			</div>
			<div className="flex justify-center text-sm gap-4">
				<p>
					<SiteLink href="/projects">more projects</SiteLink>
				</p>
				<p>
					<SiteLink href="/contact">get in touch</SiteLink>
				</p>
			</div>
		</ContentWrapper>
	);
}
