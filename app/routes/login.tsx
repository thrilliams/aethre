// TODO: refactor to match other form patterns

import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, MetaFunction, TypedResponse, json } from '@remix-run/node';
import { useActionData, useSubmit } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { getFormData } from 'remix-params-helper';
import { z } from 'zod';
import { ContentWrapper } from '~/components/ContentWrapper';
import { Button } from '~/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { hashPassword } from '~/util/auth/hashPassword';
import { logIn } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const meta: MetaFunction = () => {
	return [{ title: 'login | the aethre' }];
};

// used in Navbar to disable "log in"/"sign up" buttons while on this page
export const handle = {
	disableAuth: true,
	hideBreadcrumb: true
};

const LoginForm = z.object({
	email: z.string(),
	password: z.string()
});

type LoginForm = z.infer<typeof LoginForm>;

export const action = async ({
	request
}: ActionFunctionArgs): Promise<TypedResponse<{ email?: string; password?: string }>> => {
	const formData = await getFormData(request, LoginForm);

	// if form parsing failed, error
	if (!formData.success) return json(formData.errors);

	// if it succeeded, extract form data
	const { email, password } = formData.data;

	// find the first user with the provided email
	// (email is a unique field so there will only ever be one or zero matching entries)
	const user = await prisma.user.findFirst({
		where: { email },
		include: { auth: true }
	});

	// if we didn't find a user, report the error to the page
	if (user === null) return json({ email: 'email address not recognized' });

	// hash the password
	const passwordHash = await hashPassword(password);
	// if the password was incorrect, report the error to the page
	if (passwordHash !== user.auth?.passwordHash) return json({ password: 'incorrect password' });

	// helper function that respects search params by default
	return logIn(request, user);
};

export default function Login() {
	const errors = useActionData<typeof action>();

	const form = useForm<LoginForm>({
		resolver: zodResolver(LoginForm, {}, { raw: true })
	});

	const submit = useSubmit();
	function onSubmit(values: z.input<typeof LoginForm>) {
		submit(values, { method: 'POST' });
	}

	return (
		<ContentWrapper variant="centerVertical" size="sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 items-center"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>email</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage>{errors?.email}</FormMessage>
							</FormItem>
						)}
					></FormField>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage>{errors?.password}</FormMessage>
							</FormItem>
						)}
					></FormField>
					<Button type="submit">log in</Button>
				</form>
			</Form>
		</ContentWrapper>
	);
}
