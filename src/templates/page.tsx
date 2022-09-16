import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import { GiRollingEnergy } from 'react-icons/gi';
import { HeaderAndFooter } from '../components/navbarAndFooter';
import { Content, RichText } from '../components/richText';
import { head } from '../lib/head';
import * as styles from './page.module.scss';

interface PageContext {
	slug: string;
}

export default function Page({
	data,
	pageContext,
	location
}: PageProps<Queries.PageQuery, PageContext>) {
	const apiContent = data.contentfulPage?.content as unknown as Content;

	return (
		<HeaderAndFooter header={pageContext.slug !== 'index'} location={location}>
			<div className={pageContext.slug === 'index' ? styles.splash : ''}>
				<main>
					{pageContext.slug === 'index' ? (
						<h1>
							<GiRollingEnergy size={50} /> {data.contentfulPage?.title}
						</h1>
					) : (
						<h1>{data.contentfulPage?.title}</h1>
					)}
					<RichText data={apiContent} />
				</main>
			</div>
		</HeaderAndFooter>
	);
}

export const Head = ({ pageContext, data }: PageProps<Queries.PageQuery, PageContext>) =>
	pageContext.slug === 'index' ? head() : head(data.contentfulPage?.title!);

export const query = graphql`
	query Page($slug: String!) {
		contentfulPage(slug: { eq: $slug }) {
			title
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
					... on ContentfulTag {
						contentful_id
						slug
						name
						description
						__typename
					}
					... on ContentfulPage {
						contentful_id
						title
						slug
						__typename
					}
				}
			}
		}
	}
`;
