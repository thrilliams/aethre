import { Link } from 'gatsby';
import React from 'react';
import { PropsWithChildren } from 'react';
import * as styles from './linkHelper.module.scss';

interface LinkProps {
	href: string;
	[key: string]: any;
}

export function LinkHelper({ href, children, ...props }: PropsWithChildren<LinkProps>) {
	if (href === '/index') href = '/';
	const intrasite = href.startsWith('/');

	return intrasite ? (
		<Link
			to={href}
			target="_self"
			className={props.className ? `${styles.link} ${props.className}` : styles.link}
			{...props}
		>
			{children}
		</Link>
	) : (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={props.className ? `${styles.link} ${props.className}` : styles.link}
			{...props}
		>
			{children}
		</a>
	);
}
