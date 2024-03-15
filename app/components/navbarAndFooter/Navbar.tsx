import { useLocation, useMatches } from '@remix-run/react';
import { anyMatches } from '~/util/anyMatches';
import { User } from '@prisma/client';
import Breadcrumbs from './Breadcrumbs';
import { SiteLink } from '../SiteLink';

interface NavbarProps {
	user: User | null;
}

export function Navbar({ user }: NavbarProps) {
	const location = useLocation();
	const authSearchParams =
		location.pathname !== '/'
			? `?to=${encodeURIComponent(location.pathname + location.search)}`
			: '';

	const projectSearchParams =
		location.pathname === '/projects' || location.pathname === '/projects/manage'
			? location.search
			: '';

	const disableAuth = anyMatches('disableAuth');

	return (
		<div>
			<div className="flex justify-between py-2 px-4">
				<Breadcrumbs />
				<div className="flex gap-4">
					{user ? (
						<>
							<span>
								hey <span className="underline decoration-dotted">{user.name}</span>
								!
							</span>
							<SiteLink
								href={`/projects/manage${projectSearchParams}`}
								className="text-black"
								disabled={location.pathname === '/projects/manage'}
							>
								manage projects
							</SiteLink>
							<SiteLink href={`/logout${authSearchParams}`} className="text-black">
								log out
							</SiteLink>
						</>
					) : (
						<>
							<SiteLink
								href={`/login${authSearchParams}`}
								className="text-black"
								disabled={disableAuth}
							>
								log in
							</SiteLink>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
