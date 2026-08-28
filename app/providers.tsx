"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "@lyket/react";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<Provider apiKey="pt_bba987e10756cbf0553dbf418bbfe9">
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</Provider>
		</NextUIProvider>
	);
}
