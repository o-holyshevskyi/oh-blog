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
			<main className="relative z-10">
				<section className="section-padding">
					<div className="section-container">
						{children}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
