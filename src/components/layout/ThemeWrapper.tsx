"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "@/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ThemeWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	// Simple dark mode detection
	// Note: For production, consider next-themes or cookies to avoid hydration mismatch
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() => (prefersDarkMode ? darkTheme : lightTheme),
		[prefersDarkMode]
	);

	// Prevent hydration mismatch by rendering only after mount
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null; // or a loading spinner / default light theme structure
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
