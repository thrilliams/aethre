import React from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { PageThumbnail } from '../components/pageThumbnail';
import { head } from '../lib/head';
import { HeaderAndFooter } from '../components/navbarAndFooter';

export default function Tags({ location }: PageProps) {
	const data: Queries.AllPagesQuery = useStaticQuery(graphql`
		query AllPages {
			allContentfulPage {
				nodes {
					slug
					title
				}
			}
		}
	`);

	return (
		<HeaderAndFooter location={location}>
			<main>
				<h1>Pages</h1>
				<div>
					{data.allContentfulPage!.nodes.map((e) => (
						<PageThumbnail key={e.slug} data={e} />
					))}
				</div>
			</main>
		</HeaderAndFooter>
	);
}

export const Head = () => head('Pages');
