import { RiGithubFill } from 'react-icons/ri';
import { Button } from '../ui/button';

export function Footer() {
	return (
		<div>
			<hr className="w-full max-w-xl mx-auto" />
			<div className="p-2 flex justify-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<a href="https://github.com/thrilliams" target="_blank">
						<RiGithubFill size={24} />
					</a>
				</Button>
			</div>
		</div>
	);
}
