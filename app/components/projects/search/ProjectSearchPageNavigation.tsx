import { useLocation } from '@remix-run/react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '~/components/ui/pagination';

interface ProjectSearchPageNavigationProps {
	numProjects: number;
	totalProjects: number;
	currentPage: number;
	numPages: number;
	perPage: number;
}

export function ProjectSearchPageNavigation({
	currentPage,
	numProjects,
	totalProjects,
	numPages,
	perPage
}: ProjectSearchPageNavigationProps) {
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const pageUrl = (page: number) => {
		const newParams = new URLSearchParams(params);
		newParams.set('page', String(page));
		return `${location.pathname}?${newParams}`;
	};

	const previousEllipsis = currentPage > 2;
	const previousEnabled = currentPage > 1;
	const nextEnabled = currentPage < numPages;
	const nextEllipsis = currentPage < numPages - 1;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem className="basis-0">
					<PaginationPrevious to={pageUrl(currentPage - 1)} disabled={!previousEnabled} />
				</PaginationItem>

				{previousEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{previousEnabled && (
					<PaginationItem>
						<PaginationLink to={pageUrl(currentPage - 1)}>
							{currentPage - 1}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationLink to="#" isActive disabled>
						{currentPage}
					</PaginationLink>
				</PaginationItem>

				{nextEnabled && (
					<PaginationItem>
						<PaginationLink to={pageUrl(currentPage + 1)}>
							{currentPage + 1}
						</PaginationLink>
					</PaginationItem>
				)}

				{nextEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem className="basis-0">
					<PaginationNext to={pageUrl(currentPage + 1)} disabled={!nextEnabled} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
