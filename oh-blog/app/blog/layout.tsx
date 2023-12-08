export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="w-full px-4 md:max-w-6xl">
				{children}
			</div>
		</section>
	);
}
