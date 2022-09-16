import { PageProps } from 'gatsby';
import * as React from 'react';
import { HeaderAndFooter } from '../components/navbarAndFooter';
import { PageThumbnail } from '../components/pageThumbnail';
import { head } from '../lib/head';
import * as styles from '../templates/page.module.scss';

const NotFoundPage = ({ location }: PageProps) => (
	<HeaderAndFooter location={location} header={false}>
		<div className={styles.splash}>
			<main>
				<h1>Page not found</h1>
				<p>Sorry 😔, we couldn’t find what you were looking for.</p>
				<PageThumbnail
					data={{
						slug: '/',
						title: 'Back to home'
					}}
				/>
			</main>
		</div>
	</HeaderAndFooter>
);

export default NotFoundPage;

export const Head = () => head('Not found');
