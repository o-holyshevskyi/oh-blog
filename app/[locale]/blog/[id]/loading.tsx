export default function BlogPostLoading() {
	return (
		<div className="w-full animate-pulse">
			{/* Reading progress bar placeholder */}
			<div className="fixed top-0 left-0 right-0 h-[2px] bg-warmgray/20 z-[60]" />

			{/* Title skeleton */}
			<div className="mb-10">
				<div className="h-10 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-3/4 mb-4" />
				<div className="h-10 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-1/2 mb-4" />
				<div className="flex items-center gap-4 mt-4">
					<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-28" />
					<div className="w-1 h-1 rounded-full bg-warmgray/20" />
					<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-20" />
					<div className="w-1 h-1 rounded-full bg-warmgray/20" />
					<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-16" />
				</div>
			</div>

			{/* Cover image skeleton */}
			<div className="w-full aspect-[2/1] bg-warmgray/15 dark:bg-warmgray/10 rounded-sm mb-10" />

			{/* Content + TOC skeleton */}
			<div className="flex gap-10">
				{/* Content area */}
				<div className="flex-1 min-w-0 space-y-4">
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-11/12" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-4/5" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
					<div className="h-8 mt-6 mb-2" />
					<div className="h-6 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-2/5 mb-3" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-10/12" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-3/4" />
					<div className="h-8 mt-6 mb-2" />
					<div className="h-6 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-1/3 mb-3" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-5/6" />
					<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
				</div>

				{/* TOC sidebar skeleton (desktop only) */}
				<div className="hidden lg:block w-64 shrink-0">
					<div className="space-y-3">
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-24 mb-4" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-40 ml-3" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-36 ml-3" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-32 ml-6" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-44 ml-3" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-28 ml-3" />
						<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-36 ml-6" />
					</div>
				</div>
			</div>
		</div>
	);
}
