import { Project, User } from '@prisma/client';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Jsonify } from '~/util/jsonify';
import { SiteLink } from './SiteLink';
import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(() => res(), ms));

interface SplashUserProps {
	user: Jsonify<User & { projects: Project[] }>;
	doCycle?: boolean;
	transitionDuration?: number;
	cycleInterval?: number;
}

export const SplashUser = ({
	user,
	doCycle,
	transitionDuration = 500,
	cycleInterval = 5_000
}: SplashUserProps) => {
	const [projectsActive, setProjectsActive] = useState(true);
	const projectsRef = useRef<HTMLHeadingElement>(null);

	// start at a random point through the projects
	const [offset, setOffset] = useState(Math.floor(Math.random() * user.projects.length));

	// helper for turning an arbitrary number into a project
	const nthProject = (n: number) => user.projects[n % user.projects.length];

	const cycle = async () => {
		// hacky, but keeps projects from rotating while the user hovers over them
		while (projectsRef.current?.matches(':hover')) await sleep(500);
		// otherwise, hide the projects
		setProjectsActive(false);
		// let the transition complete
		await sleep(transitionDuration);
		// rotate projects
		setOffset(offset + 2);
		// then transition them back in
		setProjectsActive(true);
	};

	useEffect(() => {
		if (doCycle) {
			const id = setInterval(cycle, cycleInterval);
			return () => clearInterval(id);
		}
	});

	return (
		<div className="space-y-2 text-lg">
			<h1 className="text-center">hi! i'm {user.name}.</h1>
			<h2
				className={classNames(
					'flex gap-4 justify-center items-center transition-all',
					`duration-[${transitionDuration}ms]`,
					projectsActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
				)}
				ref={projectsRef}
			>
				<div className="flex gap-4 items-center">
					<span>i</span>
					<Button className="text-lg font-normal" variant="outline" asChild>
						<Link to={`/projects/${nthProject(offset).slug}`} prefetch="intent">
							{nthProject(offset).splash}
						</Link>
					</Button>
				</div>
				<div className="flex gap-4 items-center">
					<span>and</span>
					<Button className="text-lg font-normal" variant="outline" asChild>
						<Link to={`/projects/${nthProject(offset + 1).slug}`} prefetch="intent">
							{nthProject(offset + 1).splash}
						</Link>
					</Button>
				</div>
			</h2>
		</div>
	);
};
