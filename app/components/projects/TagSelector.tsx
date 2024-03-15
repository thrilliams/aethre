import { zodResolver } from '@hookform/resolvers/zod';
import type { Tag } from '@prisma/client';
import { useCommandState } from 'cmdk';
import { Plus } from 'lucide-react';
import {
	Dispatch,
	FormEvent,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { useForm } from 'react-hook-form';
import { UpsertTagParams, submitUpsertTag } from '~/routes/projects.manage.tags.upsert';
import { Badge } from '../ui/badge';
import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '../ui/command';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { TagComponent } from './TagComponent';
import { Button } from '../ui/button';
import { useSubmit } from '@remix-run/react';

// tag context is a react state so that we can refresh it when new tags are created
type ReactState<T> = [T, Dispatch<SetStateAction<T>>];
export const TagContext = createContext<ReactState<Tag[]>>([[], () => {}]);

interface TagSelectorProps {
	slugs?: string[];
	onSlugsChange: (tags: string[]) => void;
}

export function TagSelector({ slugs = [], onSlugsChange }: TagSelectorProps) {
	// tag selection stuff
	const [extantTags, setExtantTags] = useContext(TagContext);
	const tags = slugs.map((slug) => extantTags.find((tag) => tag.slug === slug));

	const [dialogOpen, setDialogOpen] = useState(false);

	function CommandListEmpty() {
		const form = useForm<UpsertTagParams>({
			resolver: zodResolver(UpsertTagParams)
		});

		const search = useCommandState(({ search }) => search);

		// update form values as user types in searchbar
		useEffect(() => {
			form.reset({
				name: search,
				slug: search.split(' ').join('-')
			});
		}, [search]);

		const submit = useSubmit();
		function onSubmit() {
			const values = form.getValues();
			submitUpsertTag(submit, values);

			setDialogOpen(false);
			onSlugsChange([...slugs, values.slug!]);
			setExtantTags([...extantTags, values as Tag]);
		}

		const createDialog =
			search.length > 0 ? (
				<div className="flex justify-center">
					<Form {...form}>
						<form onSubmit={(event) => event.preventDefault()} className="space-y-2">
							<div className="flex gap-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<Input {...field} placeholder="name" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="slug"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<Input
													{...field}
													placeholder="slug"
													className="font-mono"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button className="mx-auto" onClick={onSubmit}>
								create tag
							</Button>
						</form>
					</Form>
				</div>
			) : (
				<i>start typing to see results</i>
			);

		return extantTags.length > 0 ? (
			<CommandEmpty>{createDialog}</CommandEmpty>
		) : (
			<div className="py-6 text-center text-sm">{createDialog}</div>
		);
	}

	return (
		<div className="flex gap-4 flex-wrap min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
			{tags.length > 0 ? (
				tags.map(
					(tag, index) =>
						tag && (
							<TagComponent
								tag={tag}
								key={tag.slug}
								onRemove={() => onSlugsChange(slugs.toSpliced(index, 1))}
								variant="default"
							/>
						)
				)
			) : (
				<i>none yet</i>
			)}

			<Badge
				variant="secondary"
				className="cursor-pointer"
				onClick={() => setDialogOpen(true)}
			>
				<Plus className="mr-1" size="0.8rem" /> add tag
			</Badge>

			<CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<CommandInput placeholder="enter a tag or create a new one" />
				<CommandList>
					<CommandListEmpty />

					{extantTags.length > 0 && <CommandSeparator />}

					{extantTags.map((extantTag) => (
						<CommandItem
							key={extantTag.slug}
							onSelect={() => onSlugsChange([...slugs, extantTag.slug])}
							disabled={slugs.includes(extantTag.slug)}
						>
							{extantTag.name}
						</CommandItem>
					))}
				</CommandList>
			</CommandDialog>
		</div>
	);
}
