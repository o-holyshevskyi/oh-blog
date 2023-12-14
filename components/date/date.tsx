import { parseISO, format } from 'date-fns';
import { enUS as en, uk } from 'date-fns/locale';
import { useLocale } from 'next-intl';

const locales: { [key: string]: Locale } = { en, uk }

export default function Date({ dateString, className, formatDate }: { dateString: string; className?: string; formatDate?: string }) {
    const locale = useLocale();
    const date = parseISO(dateString);

    return <time className={className ?? ''} dateTime={dateString}>{format(date, formatDate ? formatDate : 'LLL yyyy', {
        locale: locales[locale]
    })}</time>;
}
