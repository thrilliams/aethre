import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { PageThumbnail } from '../components/pageThumbnail';
import { head } from '../lib/head';
import { HeaderAndFooter } from '../components/headerAndFooter';

export default function Tags() {
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
		<HeaderAndFooter>
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
