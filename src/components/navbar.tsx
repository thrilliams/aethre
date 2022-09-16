import React from 'react';
import { LinkHelper } from './linkHelper';
import { GiRollingEnergy } from 'react-icons/gi';

import * as styles from './navbar.module.scss';
import { PageProps } from 'gatsby';

type LocationProp = Pick<PageProps, 'location'>;

const PathBreakdown = ({ location }: LocationProp) => {
	const links: JSX.Element[] = [];
	links.push(
		<LinkHelper href="/">
			<GiRollingEnergy size={40} />
			The Aethre
		</LinkHelper>
	);
	if (location.pathname !== '/') {
		for (const part of location.pathname.split('/').slice(1)) {
			const previous = links.at(-1)!;
			const newUrl = `${previous.props.href}${part}/`;
			links.push(<LinkHelper href={newUrl}>{part}</LinkHelper>);
		}
	}
	links[links.length - 1] = <span>{links.at(-1)?.props.children}</span>;
	return (
		<span>
			{links.reduce((acc, x) =>
				acc === null ? (
					x
				) : (
					<>
						{acc} / {x}
					</>
				)
			)}
		</span>
	);
};

export const Navbar = ({ location }: LocationProp) => (
	<div className={styles.navbar}>
		<div>
			<PathBreakdown location={location} />
		</div>
	</div>
);
