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

const menus = [
	{ label: "Donasi", path: "/", icon: <VolunteerActivismIcon /> },
	{ label: "Blog", path: "/blog", icon: <ArticleIcon /> },
	{ label: "Donasi Saya", path: "/donasi-saya", icon: <ReceiptLongIcon /> },
	{ label: "Galang Dana", path: "/galang-dana", icon: <CampaignIcon /> },
	{ label: "Profil", path: "/profil", icon: <PersonIcon /> },
];

// matcher active yang aman (biar "/" gak nyolong semua route)
function isActive(pathname: string, path: string) {
	if (path === "/") return pathname === "/";
	return pathname === path || pathname.startsWith(path + "/");
}

export default function SimpleBottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	const currentIndex = React.useMemo(() => {
		const idx = menus.findIndex((m) => isActive(pathname, m.path));
		return idx === -1 ? 0 : idx;
	}, [pathname]);

	return (
		<Paper
			elevation={0}
			sx={{
				position: "fixed",
				left: "50%",
				transform: "translateX(-50%)",
				bottom: 0,
				width: "100%",
				maxWidth: 420, // sesuaikan sama frame mobile kalian
				zIndex: 1300,
				borderTop: "1px solid rgba(0,0,0,0.08)",
				borderTopLeftRadius: 16,
				borderTopRightRadius: 16,
				overflow: "hidden",
				pb: "env(safe-area-inset-bottom)", // aman buat iOS notch
				bgcolor: "rgba(255,255,255,0.92)",
				backdropFilter: "blur(10px)",
			}}
		>
			<BottomNavigation
				showLabels
				value={currentIndex}
				onChange={(_, newValue) => router.push(menus[newValue].path)}
				sx={{
					height: 68,
					"& .MuiBottomNavigationAction-root": {
						minWidth: 0,
						px: 1,
					},
					"& .MuiBottomNavigationAction-label": {
						fontSize: 11,
						marginTop: "2px",
					},
					"& .Mui-selected": {
						color: "#61ce70",
					},
				}}
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
