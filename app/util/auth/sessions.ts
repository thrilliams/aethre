import { createCookie, redirect } from '@remix-run/node';
import { createPrismaSessionStorage } from './createPrismaSessionStorage';
import { User } from '@prisma/client';
import { prisma } from '../prisma.server';

interface SessionData {
	userId: string;
}

// if we wanted to persist messages between pages, this is one of the ways to do it
// however, we usually want to destroySession() on logout, which would conflict with this
interface SessionFlashData {}

const sessionCookie = createCookie('__session', {
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 28, // one month
	path: '/',
	sameSite: 'lax',
	secrets: ['s3cret1'],
	secure: true
});

export const { getSession, commitSession, destroySession } = createPrismaSessionStorage<
	SessionData,
	SessionFlashData
>({ cookie: sessionCookie });

export const getUser = async (request: Request): Promise<User | null> => {
	const session = await getSession(request.headers.get('Cookie'));

	if (!session.has('userId')) return null;

	const user = await prisma.user.findFirst({
		where: { id: session.get('userId') }
	});

	if (user === null) return null;

	return user;
};

export const getUserOrError = async (
	request: Request,
	error: any = new Response(null, {
		status: 401,
		statusText: 'you need to be signed in to do that'
	})
): Promise<User> => {
	const user = await getUser(request);
	if (user === null) throw error;
	return user;
};

const redirectWithCookieAndDefaultPath = (
	request: Request,
	cookie: string,
	defaultPath: string,
	ignoreTo: boolean
) => {
	// if a redirect is specified in search params, redirect there
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get('to');

	// otherwise, redirect to the home page
	return redirect(ignoreTo ? defaultPath : redirectTo || defaultPath, {
		headers: { 'Set-Cookie': cookie }
	});
};

export const logIn = async (request: Request, user: User) => {
	const session = await getSession(request.headers.get('Cookie'));
	session.set('userId', user.id);

	return redirectWithCookieAndDefaultPath(request, await commitSession(session), '/', false);
};

export const logOut = async (request: Request) => {
	const session = await getSession(request.headers.get('Cookie'));

	return redirectWithCookieAndDefaultPath(request, await destroySession(session), '/', false);
};
