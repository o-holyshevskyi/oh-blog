import { redirect } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
	unstable_setRequestLocale(locale);
	redirect('/#about');
}
