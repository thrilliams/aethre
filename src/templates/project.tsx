import React from 'react';

import { graphql, HeadProps, PageProps } from 'gatsby';

import { LinkHelper } from '../components/linkHelper';
import { reformatDate } from '../lib/date';
import { head } from '../lib/head';

import * as styles from './project.module.scss';
import { HeaderAndFooter } from '../components/navbarAndFooter';
import { Content, RichText } from '../components/richText';

export default function Project({ data, location }: PageProps<Queries.ProjectQuery>) {
	const project = data.contentfulProject!;

	// this is stupid
	// maybe typescript is bad, actually
	const apiContent = project.content as unknown as Content;

	return (
		<HeaderAndFooter location={location}>
			<main className={styles.project}>
				<h1>{project.title}</h1>
				<h3>{reformatDate(project.date!)}</h3>
				<i>{project.summary?.summary} </i>
				<p>
					Tags:{' '}
					{project.tags
						?.map((tag) => (
							<LinkHelper key={tag?.slug} href={`/tags/${tag?.slug}`}>
								{tag?.name}
							</LinkHelper>
						))
						.reduce((acc, x) =>
							acc === null ? (
								x
							) : (
								<>
									{acc}, {x}
								</>
							)
						)}
				</p>
				<RichText data={apiContent} />
				{project.repository ? (
					<p className={styles.repo}>
						<span>
							View this project's source code on{' '}
							<LinkHelper href={project.repository!}>GitHub</LinkHelper>.
						</span>
					</p>
				) : null}
			</main>
		</HeaderAndFooter>
	);
}

export const Head = ({ data: { contentfulProject: project } }: HeadProps<Queries.ProjectQuery>) =>
	head(project?.title!, project?.summary?.summary!);

export const query = graphql`
	query Project($slug: String!) {
		contentfulProject(slug: { eq: $slug }) {
			title
			date
			summary {
				summary
			}
			content {
				raw
				references {
					... on ContentfulAsset {
						contentful_id
						title
						description
						gatsbyImageData(width: 1200)
						__typename
					}
					... on ContentfulProject {
						contentful_id
						slug
						title
						date
						summary {
							summary
						}
						__typename
					}
					# ... on ContentfulTag {
					# 	contentful_id
					# 	slug
					# 	name
					# 	description
					# 	__typename
					# }
					# ... on ContentfulPage {
					# 	contentful_id
					# 	title
					# 	slug
					# 	__typename
					# }
				}
			}
			repository
			tags {
				slug
				name
			}
		}
	}
`;
