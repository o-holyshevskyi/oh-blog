'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { localeNames, locales } from "../i18nconfig";

export default function LanguageSwitch() {
    //const locale = useLocale();
    //const router = useRouter();
    //const pathName = usePathname();

    const switchLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //router.push(pathName, { locale: e.target.value });
    };

    return (
        <div>
            <select
                //value={locale}
                onChange={switchLocale}
            >
                {locales.map((loc) => (
                    <option key={loc} value={loc}>
                        {localeNames[loc]}
                    </option>
                ))}
            </select>
        </div>
    );
}