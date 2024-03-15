import { ContentWrapper } from '~/components/ContentWrapper';
import { SiteLink } from '~/components/SiteLink';

export default function Contact() {
	return (
		<ContentWrapper variant="centerVertical">
			<div className="flex flex-col gap-4 max-w-md mx-auto">
				<p>if you want to talk, i do too!</p>
				<p>
					my email address is juniper (at) (this domain), and i'm also on discord
					@linearcurve.
				</p>
				<p>
					my business hours are never and always, but if i don't respond to an email, i'm
					usually more responsive on discord.
				</p>
				<p className="text-center">
					<SiteLink href="/">return home</SiteLink>
				</p>
			</div>
		</ContentWrapper>
	);
}
