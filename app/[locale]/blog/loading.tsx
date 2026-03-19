export default function BlogListingLoading() {
	return (
		<div className="w-full animate-pulse">
			{/* Title + search skeleton */}
			<div className="flex items-center gap-4">
				<div className="h-8 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-48" />
				<div className="h-8 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-40" />
			</div>

			{/* Tag filter skeleton */}
			<div className="flex flex-wrap gap-2 mt-8">
				{[1,2,3,4,5].map(i => (
					<div key={i} className="h-7 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-20" />
				))}
			</div>

			{/* Post count skeleton */}
			<div className="mt-8 mb-6">
				<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-28" />
			</div>

			{/* Card grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{[1,2,3,4].map(i => (
					<div key={i} className="border border-warmgray/20 dark:border-warmgray/5 rounded-sm overflow-hidden">
						<div className="aspect-[16/9] bg-warmgray/15 dark:bg-warmgray/10" />
						<div className="p-5 space-y-3">
							<div className="flex items-center gap-3">
								<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-24" />
								<div className="w-1 h-1 rounded-full bg-warmgray/20" />
								<div className="h-3 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-16" />
							</div>
							<div className="h-5 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-3/4" />
							<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-full" />
							<div className="h-4 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-2/3" />
							<div className="flex gap-1.5">
								<div className="h-5 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-14" />
								<div className="h-5 bg-warmgray/15 dark:bg-warmgray/10 rounded-sm w-16" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
