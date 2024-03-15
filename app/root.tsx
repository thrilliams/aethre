import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData
} from '@remix-run/react';
import { NavbarFooterWrapper } from './components/navbarAndFooter/NavbarFooterWrapper';
import { Toaster } from './components/ui/sonner';
import { Authentication } from './util/auth/authenticationContext';
import { getUser } from './util/auth/sessions';

import styles from './tailwind.css';
import { prisma } from './util/prisma.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await getUser(request);
	return user;
};

export default function App() {
	const user = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Authentication.Provider value={user}>
					<NavbarFooterWrapper>
						<Outlet />
					</NavbarFooterWrapper>
				</Authentication.Provider>
				<Toaster />

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
