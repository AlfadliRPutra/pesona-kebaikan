"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import { alpha, useTheme } from "@mui/material/styles";

const menus = [
	{ label: "Donasi", path: "/", icon: <VolunteerActivismIcon /> },
	{ label: "Blog", path: "/blog", icon: <ArticleIcon /> },
	{ label: "Donasi Saya", path: "/donasi-saya", icon: <ReceiptLongIcon /> },
	{ label: "Galang Dana", path: "/galang-dana", icon: <CampaignIcon /> },
	{ label: "Profil", path: "/profil", icon: <PersonIcon /> },
];

function isActive(pathname: string, path: string) {
	if (path === "/") return pathname === "/";
	return pathname === path || pathname.startsWith(path + "/");
}

export default function SimpleBottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();
	const theme = useTheme();

	const currentIndex = React.useMemo(() => {
		const idx = menus.findIndex((m) => isActive(pathname, m.path));
		return idx === -1 ? 0 : idx;
	}, [pathname]);

	return (
		<Paper
			elevation={0}
			className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[480px] z-[1300] overflow-hidden pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
			sx={{
				borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
				borderTopLeftRadius: 18,
				borderTopRightRadius: 18,
				bgcolor: alpha(theme.palette.background.paper, 0.92),
			}}
		>
			<BottomNavigation
				showLabels
				value={currentIndex}
				onChange={(_, newValue) => router.push(menus[newValue].path)}
				className="bottom-nav"
			>
				{menus.map((menu) => (
					<BottomNavigationAction
						key={menu.path}
						label={menu.label}
						icon={menu.icon}
					/>
				))}
			</BottomNavigation>
		</Paper>
	);
}
