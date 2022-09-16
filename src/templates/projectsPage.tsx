import React from 'react';
import { graphql, HeadProps, PageProps } from 'gatsby';
import { ProjectThumbnail } from '../components/projectThumbnail';
import { head } from '../lib/head';

import * as style from './projectsPage.module.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { LinkHelper } from '../components/linkHelper';
import { HeaderAndFooter } from '../components/headerAndFooter';

interface PageContext {
	skip: number;
	slug: number;
}

export default function Projects({
	data,
	pageContext
}: PageProps<Queries.AllProjectsQuery, PageContext>) {
	const prevPageExists = pageContext.skip > 0;
	const nextPageExists = data.allContentfulProject.totalCount > pageContext.skip + 10;
	return (
		<HeaderAndFooter>
			<main className={style.projectsPage}>
				<h1>Projects{pageContext.slug !== 1 ? <>, page {pageContext.slug}</> : null}</h1>
				<p>
					<i>
						You can also browse projects <LinkHelper href="/tags">by tag</LinkHelper>.
					</i>
				</p>
				<div>
					{data.allContentfulProject!.nodes.map((e) => (
						<ProjectThumbnail key={e.slug} data={e} />
					))}
				</div>
				<div className={style.controls}>
					{prevPageExists ? (
						<LinkHelper
							href={`/projects/page/${pageContext.slug - 1}`}
							className={style.prev}
						>
							<FaArrowLeft />
						</LinkHelper>
					) : null}
					{nextPageExists ? (
						<LinkHelper
							href={`/projects/page/${pageContext.slug + 1}`}
							className={style.next}
						>
							<FaArrowRight />
						</LinkHelper>
					) : null}
				</div>
			</main>
		</HeaderAndFooter>
	);
}

export const Head = ({ pageContext }: HeadProps<Queries.AllProjectsQuery, PageContext>) =>
	head(pageContext.slug > 1 ? `Projects, page ${pageContext.slug}` : 'Projects');

export const query = graphql`
	query AllProjects($skip: Int!) {
		allContentfulProject(limit: 10, skip: $skip, sort: { fields: date, order: DESC }) {
			totalCount
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
