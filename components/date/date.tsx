import { parseISO, format } from 'date-fns';
import { enUS as en, uk } from 'date-fns/locale';

const locales: { [key: string]: Locale } = { en, uk }

export default function Date({ 
    dateString,
    locale,
    className, 
    formatDate 
}: { 
    dateString: string;
    locale: string; 
    className?: string; 
    formatDate?: string 
}) {
    const date = parseISO(dateString);

    return <time className={className ?? ''} dateTime={dateString}>{format(date, formatDate ? formatDate : 'LLL yyyy', {
        locale: locales[locale]
    })}</time>;
}
