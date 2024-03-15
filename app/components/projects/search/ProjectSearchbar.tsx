// TODO: refactor to match other form patterns

import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmit } from '@remix-run/react';
import classNames from 'classnames';
import { ChevronLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/components/ui/select';
import { SearchProjectOptions } from '~/util/searchProjects';

export function ProjectSearchbar() {
	const form = useForm<SearchProjectOptions>({
		resolver: zodResolver(SearchProjectOptions, {}, { raw: true }),
		defaultValues: {
			query: '',
			page: 1,
			perPage: 10,
			orderBy: 'createdAt',
			direction: 'desc'
		}
	});

	const submit = useSubmit();
	function onSubmit(values: z.input<typeof SearchProjectOptions>) {
		submit(values);
	}

	const [showSearchOptions, setShowSearchOptions] = useState(false);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<div className="flex gap-4 z-10">
					<Button type="submit" variant="outline" size="icon">
						<Search size="1rem" />
					</Button>

					<FormField
						control={form.control}
						name="query"
						render={({ field }) => (
							<FormItem className="grow">
								<FormControl>
									<Input
										type="search"
										placeholder="search projects..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>

					<Button
						variant="outline"
						size="icon"
						onClick={(event) => {
							setShowSearchOptions(!showSearchOptions);
							// without this, the form resubmits every time options are toggled
							event.preventDefault();
							return false;
						}}
					>
						<ChevronLeft
							size="1rem"
							className={classNames(
								'transition-all',
								showSearchOptions
									? '-rotate-90 stroke-black'
									: 'rotate-0 stroke-gray-400'
							)}
						/>
					</Button>
				</div>

				{showSearchOptions && (
					<div className="space-y-4">
						<div className="flex justify-between gap-4">
							<FormField
								control={form.control}
								name="orderBy"
								render={({ field }) => (
									<FormItem className="basis-full">
										<FormLabel className="text-xs font-normal">
											sort by
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="property" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="title">title</SelectItem>
												<SelectItem value="createdAt">
													date published
												</SelectItem>
												<SelectItem value="updatedAt">
													date updated
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage className="text-xs" />
									</FormItem>
								)}
							></FormField>

							<FormField
								control={form.control}
								name="direction"
								render={({ field }) => (
									<FormItem className="basis-full">
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormLabel className="text-xs font-normal">
												direction
											</FormLabel>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="order" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="asc">ascending</SelectItem>
												<SelectItem value="desc">descending</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage className="text-xs" />
									</FormItem>
								)}
							></FormField>

							<FormField
								control={form.control}
								name="perPage"
								render={({ field }) => (
									<FormItem className="basis-full">
										<FormLabel className="text-xs font-normal">
											results per page
										</FormLabel>
										<FormControl>
											<Input
												className="spinner-none"
												type="number"
												{...field}
											/>
										</FormControl>

										<FormMessage className="text-xs" />
									</FormItem>
								)}
							></FormField>
						</div>
					</div>
				)}
			</form>
		</Form>
	);
}
