import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { TagThumbnail } from '../components/tagThumbnail';
import { head } from '../lib/head';
import { HeaderAndFooter } from '../components/headerAndFooter';
import { LinkHelper } from '../components/linkHelper';

export default function Tags() {
	const data: Queries.AllTagsQuery = useStaticQuery(graphql`
		query AllTags {
			allContentfulTag {
				nodes {
					slug
					name
					description
				}
			}
		}
	`);

	return (
		<HeaderAndFooter>
			<main>
				<h1>Tags</h1>
				<p>
					<i>
						You can also browse <LinkHelper href="/projects">all projects</LinkHelper>.
					</i>
				</p>
				<div>
					{data.allContentfulTag!.nodes.map((e) => (
						<TagThumbnail key={e.slug} data={e} />
					))}
				</div>
			</main>
		</HeaderAndFooter>
	);
}

export const Head = () => head('Tags');
