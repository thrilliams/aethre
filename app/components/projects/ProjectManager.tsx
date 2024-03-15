import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useSubmit } from '@remix-run/react';
import classNames from 'classnames';
import { Eye, EyeOff, Fullscreen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { submitDeleteProject } from '~/routes/projects.manage.delete';
import { UpdateProjectParams, submitUpdateProject } from '~/routes/projects.manage.update';
import { generateDirtyValues } from '~/util/generateDirtyValues';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/datepicker';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Toggle } from '../ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ProjectDisplay, RichProject } from './ProjectDisplay';
import { TagSelector } from './TagSelector';

interface ProjectManagerProps {
	project: RichProject;
}

export function ProjectManager({ project }: ProjectManagerProps) {
	const navigation = useNavigation();

	const generateDefaultValues = () => ({
		...project,
		// we need to coerce the dates to placate the resolver
		createdAt: new Date(project.createdAt),
		updatedAt: new Date(project.updatedAt),
		// potentially suspect
		summary: project.summary.trim(),
		splash: project.splash?.trim() || null,
		// map tags to slugs and handle the weird stuff on the server side
		tags: project.tags.map((tag) => tag.slug)
	});

	const form = useForm<UpdateProjectParams>({
		resolver: zodResolver(UpdateProjectParams),
		defaultValues: generateDefaultValues()
	});

	const submit = useSubmit();
	async function onSubmit() {
		const values = generateDirtyValues(form);

		// reset the form to maintain isDirty consistency
		form.reset({
			...generateDefaultValues(),
			...values
		});

		// this is really hacky, ideally we would use native remix stuff rather than fetching
		const response = await submitUpdateProject(submit, { id: project.id, ...values });
		const result = await response.json();

		if (result.success) toast('changes saved');
	}

	function generatePreviewProject() {
		const previewProject = structuredClone(project);
		const formValues = form.getValues();
		for (const [key, modified] of Object.entries(form.formState.dirtyFields)) {
			if (!modified) continue;
			Object.assign(previewProject, { [key]: formValues[key as keyof UpdateProjectParams] });
		}
		return previewProject;
	}

	return (
		<Form {...form}>
			<form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input {...field} placeholder="title" className="text-lg" />
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
										value={field.value || ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="published"
						render={({ field }) => {
							const Icon = field.value ? Eye : EyeOff;

							return (
								<FormItem className="space-y-0">
									<TooltipProvider>
										<Tooltip>
											<FormControl>
												<TooltipTrigger asChild>
													<Toggle
														size="icon"
														pressed={field.value}
														onPressedChange={(value) =>
															field.onChange(value)
														}
														// fix TooltipTrigger[asChild]
														// breaking Toggle coloring
														className={classNames(
															field.value &&
																'bg-accent text-accent-foreground'
														)}
													>
														<Icon size="1rem" />
													</Toggle>
												</TooltipTrigger>
											</FormControl>
											<TooltipContent>
												<p>toggle visibility</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</FormItem>
							);
						}}
					/>

					<Dialog>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<DialogTrigger asChild>
										<Button size="icon">
											<Fullscreen size="1rem" />
										</Button>
									</DialogTrigger>
								</TooltipTrigger>
								<TooltipContent>
									<p>preview project</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<DialogContent className="p-4 w-max max-h-[66vh] overflow-y-scroll scrollbar-none">
							<ProjectDisplay
								project={generatePreviewProject()}
								managing={false}
								dialog
							/>
						</DialogContent>
					</Dialog>
				</div>

				<FormField
					control={form.control}
					name="summary"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Textarea {...field} placeholder="summary" className="italic" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="createdAt"
						render={({ field }) => (
							<FormItem className="w-full flex flex-col">
								<FormLabel className="font-normal">created on</FormLabel>
								<FormControl>
									<DatePicker {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="updatedAt"
						render={({ field }) => (
							<FormItem className="w-full flex flex-col">
								<FormLabel className="font-normal">updated on</FormLabel>
								<FormControl>
									<DatePicker {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<FormLabel className="font-normal">project tags</FormLabel>
							<FormControl>
								<TagSelector slugs={field.value} onSlugsChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator className="my-4" />

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea {...field} placeholder="project content (in markdown)" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator className="my-4" />

				<FormField
					control={form.control}
					name="splash"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<FormControl>
								<Input
									{...field}
									placeholder="splash text"
									value={field.value || ''}
								/>
							</FormControl>
							<FormDescription>
								"i'm {project.author.name} and i {field.value || '[splash text]'}{' '}
								..."
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="sourceType"
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-40">
											<SelectValue placeholder="source type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="NONE">no source type</SelectItem>
										<SelectItem value="GITHUB">github</SelectItem>
									</SelectContent>
								</Select>

								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="sourceUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										{...field}
										placeholder="source url"
										value={field.value || ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-center mt-4 gap-6">
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={!form.formState.isDirty || navigation.state !== 'idle'}
					>
						save changes
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="destructive">delete project</Button>
						</DialogTrigger>
						<DialogContent className="w-max">
							<div className="flex flex-col gap-4 items-center">
								<p>
									really delete project?
									<br />(<i>this action cannot be undone</i>)
								</p>

								<p>
									yes,
									<DialogClose asChild>
										<Button
											className="ml-2"
											variant="destructive"
											size="xs"
											onClick={() =>
												submitDeleteProject(
													submit,
													{ id: project.id },
													true
												)
											}
										>
											really delete project
										</Button>
									</DialogClose>
								</p>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</form>
		</Form>
	);
}
