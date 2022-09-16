import React, { PropsWithChildren } from 'react';
import { Footer } from './footer';
import * as styles from './navbarAndFooter.module.scss';
import { Navbar } from './navbar';
import { PageProps } from 'gatsby';

type HeaderAndFooterProps = {
	header?: boolean;
} & Pick<PageProps, 'location'>;

export const HeaderAndFooter = ({
	header = true,
	children,
	location
}: PropsWithChildren<HeaderAndFooterProps>) => (
	<div className={styles.headerAndFooter}>
		{header ? <Navbar location={location} /> : null}
		<div className={styles.content}>{children}</div>
		<Footer />
	</div>
);
