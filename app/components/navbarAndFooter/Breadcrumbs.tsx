import { useMatches } from '@remix-run/react';
import { Fragment } from 'react';
import { SiteLink } from '../SiteLink';

interface BreadcrumbHandle {
	hideBreadcrumb?: boolean;
}

export default function Breadcrumbs() {
	const matches = useMatches().filter(
		(match) => !(match.handle as BreadcrumbHandle)?.hideBreadcrumb
	);

	return (
		<p className="flex gap-2">
			<SiteLink href="/" className="text-black">
				the aethre
			</SiteLink>
			{matches.slice(1).map((match, index) => (
				<Fragment key={match.id}>
					{'>'}
					<SiteLink
						href={match.pathname}
						className="text-black"
						disabled={index === matches.length - 2}
					>
						{match.pathname.split('/').at(-1)}
					</SiteLink>
				</Fragment>
			))}
		</p>
	);
}
