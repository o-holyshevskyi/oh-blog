import AboutAccordion from "@/components/about/about-accordion";
import DownloadCv from "@/components/about/download-cv/download-cv";
import { title } from "@/components/primitives";

export function generateMetadata() {
	return { title: 'About' };
}

export default function AboutPage() {
	return (
		<div>
			<section className="flex justify-center">
				<p className={title({ color: "blue", size: 'md' })}>A</p>
				<p className={title({ size: 'md' })}>bout</p>
			</section>
			<section className="mt-5 mb-5 text-center">
				<p>
					As a Test Automation Engineer I possess a strong passion for both technology and serving my clients. My unwavering energy and dedication to ensuring the best experience for my customers is reflected in my work as a skilled professional who designs, develops and executes automated tests to enhance software quality. With a focus on delivering top-notch results, I am a valuable asset to any team.
				</p>
			</section>
			<AboutAccordion />
			<DownloadCv />
		</div>
	);
}
