import React from 'react';
import { LinkHelper } from './linkHelper';
import { GiRollingEnergy } from 'react-icons/gi';

import * as styles from './navbar.module.scss';

const PathBreakdown = () => {
	const loc = new URL(location.href);
	const links: JSX.Element[] = [];
	links.push(
		<LinkHelper href="/">
			<GiRollingEnergy size={40} />
			The Aethre
		</LinkHelper>
	);
	if (loc.pathname !== '/') {
		for (const part of loc.pathname.split('/').slice(1)) {
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

export const Navbar = () => (
	<div className={styles.navbar}>
		<div>
			<PathBreakdown />
		</div>
	</div>
);
