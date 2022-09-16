import { CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby';
import { resolve } from 'path';

export async function createPages({ graphql, actions: { createPage } }: CreatePagesArgs) {
	// actual page creation
	const projectQuery = (await graphql(`
		query GetProjects {
			allContentfulProject {
				nodes {
					slug
				}
			}
		}
	`)) as { data: Queries.GetProjectsQuery };
	const projectTemplate = resolve('src/templates/project.tsx');
	for (const { slug } of projectQuery.data.allContentfulProject.nodes) {
		createPage({
			path: `/projects/${slug}`,
			component: projectTemplate,
			context: { slug: slug }
		});
	}

	const tagQuery = (await graphql(`
		query GetTags {
			allContentfulTag {
				nodes {
					slug
				}
			}
		}
	`)) as { data: Queries.GetTagsQuery };
	const tagTemplate = resolve('src/templates/tag.tsx');
	for (const { slug } of tagQuery.data.allContentfulTag.nodes) {
		createPage({
			path: `/tags/${slug}`,
			component: tagTemplate,
			context: { slug }
		});
	}

	const projectCountQuery = (await graphql(`
		query ProjectCount {
			allContentfulProject {
				totalCount
			}
		}
	`)) as { data: Queries.ProjectCountQuery };
	const projectsTemplate = resolve('src/templates/projectsPage.tsx');
	createPage({
		path: `/projects`,
		component: projectsTemplate,
		context: { skip: 0, slug: 1 }
	});
	for (let i = 0; i < projectCountQuery.data.allContentfulProject.totalCount / 10; i++) {
		createPage({
			path: `/projects/page/${i + 1}`,
			component: projectsTemplate,
			context: { skip: i * 10, slug: i + 1 }
		});
	}

	const pageQuery = (await graphql(`
		query GetPages {
			allContentfulPage {
				nodes {
					slug
				}
			}
		}
	`)) as { data: Queries.GetPagesQuery };
	const pageTemplate = resolve('src/templates/page.tsx');
	for (const { slug } of pageQuery.data.allContentfulPage.nodes) {
		createPage({
			path: slug === 'index' ? '/' : `/${slug}`,
			component: pageTemplate,
			context: { slug }
		});
	}
}

// fixes a verbose, meaningless warning during build
// https://stackoverflow.com/questions/63124432
export function onCreateWebpackConfig({ actions, getConfig }: CreateWebpackConfigArgs) {
	const config = getConfig();
	const miniCssExtractPlugin = config.plugins.find(
		(plugin: any) => plugin.constructor.name === 'MiniCssExtractPlugin'
	);
	if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true;
	actions.replaceWebpackConfig(config);
}
