'use client';

import { useLocale,  } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { localeNames, locales } from "../i18nconfig";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";

export default function LanguageSwitch() {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([locale]));

    const handleSelectionChange = (selection: any) => {
        const selectedText = selection.anchorKey;
        const selectedKeys = new Set([selectedText]);
        setSelectedKeys(selectedKeys);
        
        router.push(pathName, { locale: selectedText });
    };

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Icon icon="ion:language" fontSize={24} className="text-default-500 cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu 
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
            >
                {locales.map((loc) => (
                    <DropdownItem key={loc}>
                        {localeNames[loc]}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}