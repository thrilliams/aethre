import React from 'react';
import { graphql, HeadProps, PageProps } from 'gatsby';
import { ProjectThumbnail } from '../components/projectThumbnail';
import { head } from '../lib/head';
import { HeaderAndFooter } from '../components/navbarAndFooter';

// TODO: tag inheritance

export default function Tag({ data, location }: PageProps<Queries.ProjectsAndTagQuery>) {
	const tag = data.contentfulTag!;

	return (
		<HeaderAndFooter location={location}>
			<main>
				<h1>{tag.name}</h1>
				<h3>{tag.description}</h3>
				<div>
					{data.allContentfulProject!.nodes.map((e) => (
						<ProjectThumbnail key={e.slug} data={e} />
					))}
				</div>
			</main>
		</HeaderAndFooter>
	);
}

export const Head = ({ data: { contentfulTag: tag } }: HeadProps<Queries.ProjectsAndTagQuery>) =>
	head(`Projects tagged ${tag?.name}`, tag?.description!);

export const query = graphql`
	query ProjectsAndTag($slug: String!) {
		contentfulTag(slug: { eq: $slug }) {
			name
			description
		}
		allContentfulProject(
			filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
			sort: { fields: date, order: DESC }
		) {
			nodes {
				slug
				title
				date
				summary {
					summary
				}
			}
		}
	}
`;
