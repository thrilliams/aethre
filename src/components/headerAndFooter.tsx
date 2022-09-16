import React, { PropsWithChildren } from 'react';
import { Footer } from './footer';
import * as styles from './headerAndFooter.module.scss';
import { Navbar } from './navbar';

interface HeaderAndFooterProps {
	header?: boolean;
}

export const HeaderAndFooter = ({
	header = true,
	children
}: PropsWithChildren<HeaderAndFooterProps>) => (
	<div className={styles.headerAndFooter}>
		{header ? <Navbar /> : null}
		<div className={styles.content}>{children}</div>
		<Footer />
	</div>
);
