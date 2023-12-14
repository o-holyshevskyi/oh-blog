import { parseISO, formatDuration } from 'date-fns';
import { enUS as en, uk } from 'date-fns/locale';
import { useLocale } from 'next-intl';

const locales: { [key: string]: Locale } = { en, uk }

export default function DateDifference({ 
    dateFromString, 
    dateToString
} : { 
    dateFromString: string; 
    dateToString: string;
    className?: string 
}) {
    const locale = useLocale();
    const dateFrom = parseISO(dateFromString);
    const dateTo = parseISO(dateToString);

    const years = dateTo.getFullYear() - dateFrom.getFullYear();
    const months = dateTo.getMonth() - dateFrom.getMonth();

    const result = formatDuration(
        { years, months },
        {locale: locales[locale]}
    )

    return (
        <div>
            {result}
        </div>
    ) 
}
