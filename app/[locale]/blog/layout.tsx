import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function BlogLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	unstable_setRequestLocale(locale);

	return (
		<>
			{/* @ts-ignore Async Server Component */}
			<Navbar locale={locale} />
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="w-full px-4 md:max-w-6xl">
					{children}
				</div>
			</section>
			<Footer />
		</>
	);
}
