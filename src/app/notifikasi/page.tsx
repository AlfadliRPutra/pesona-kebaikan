"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CampaignIcon from "@mui/icons-material/Campaign";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useRouter } from "next/navigation";

export default function NotificationPage() {
	const router = useRouter();
	const [tabValue, setTabValue] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	// Mock Data
	const kabarItems = [
		{
			id: 1,
			title: "Donasi Pak Asep Mencapai 50%",
			desc: "Terima kasih atas partisipasi Anda. Campaign kini sudah setengah jalan!",
			time: "2 jam lalu",
			read: false,
		},
		{
			id: 2,
			title: "Bantuan Sekolah Pelosok",
			desc: "Penyaluran dana tahap 1 telah dilakukan. Cek update terbaru.",
			time: "1 hari lalu",
			read: true,
		},
		{
			id: 3,
			title: "Update Pembangunan Masjid",
			desc: "Fondasi telah selesai dibangun. Lanjutkan dukunganmu!",
			time: "2 hari lalu",
			read: true,
		},
		{
			id: 4,
			title: "Donasi Al-Quran Tersalurkan",
			desc: "Sebanyak 100 Al-Quran telah diterima oleh santri di Desa Suka Maju.",
			time: "1 minggu lalu",
			read: true,
		},
	];

	const pesanItems = [
		{
			id: 1,
			title: "Admin Pesona Kebaikan",
			desc: "Selamat datang di Pesona Kebaikan! Lengkapi profil Anda untuk kemudahan berdonasi.",
			time: "Baru saja",
			read: false,
		},
		{
			id: 2,
			title: "Verifikasi Akun",
			desc: "Mohon unggah KTP untuk verifikasi akun penggalang dana.",
			time: "3 hari lalu",
			read: true,
		},
		{
			id: 3,
			title: "Pencairan Dana Disetujui",
			desc: "Pengajuan pencairan dana untuk Campaign #123 telah disetujui.",
			time: "4 hari lalu",
			read: true,
		},
	];

	return (
		<Box sx={{ pb: 10 }}>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					p: 2,
					bgcolor: "background.paper",
					borderBottom: "1px solid",
					borderColor: "divider",
				}}
			>
				<IconButton onClick={() => router.back()} edge="start" size="small">
					<ArrowBackIcon />
				</IconButton>
				<Typography variant="h6" fontWeight={700} sx={{ fontSize: 18 }}>
					Notifikasi
				</Typography>
			</Box>

			{/* Tabs */}
			<Box sx={{ bgcolor: "background.paper" }}>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					variant="fullWidth"
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						"& .MuiTab-root": {
							textTransform: "none",
							fontWeight: 700,
							fontSize: 14,
							minHeight: 48,
						},
						"& .Mui-selected": { color: "#61ce70" },
						"& .MuiTabs-indicator": { bgcolor: "#61ce70" },
					}}
				>
					<Tab label="Kabar" />
					<Tab label="Pesan" />
				</Tabs>
			</Box>

			{/* Content */}
			<Box>
				{tabValue === 0 && (
					<List disablePadding>
						{kabarItems.map((item) => (
							<React.Fragment key={item.id}>
								<ListItemButton
									alignItems="flex-start"
									sx={{
										bgcolor: item.read ? "transparent" : "rgba(97, 206, 112, 0.05)",
									}}
								>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: "#f0fdf4", color: "#16a34a" }}>
											<CampaignIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography
												sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
											>
												{item.title}
											</Typography>
										}
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													sx={{
														display: "block",
														fontSize: 13,
														color: "#64748b",
														mt: 0.5,
														mb: 0.5,
														lineHeight: 1.5,
													}}
												>
													{item.desc}
												</Typography>
												<Typography
													component="span"
													variant="caption"
													sx={{ fontSize: 11, color: "#94a3b8" }}
												>
													{item.time}
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItemButton>
								<Divider component="li" />
							</React.Fragment>
						))}
					</List>
				)}
				{tabValue === 1 && (
					<List disablePadding>
						{pesanItems.map((item) => (
							<React.Fragment key={item.id}>
								<ListItemButton
									alignItems="flex-start"
									sx={{
										bgcolor: item.read ? "transparent" : "rgba(37, 99, 235, 0.05)",
									}}
								>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: "#eff6ff", color: "#2563eb" }}>
											<AdminPanelSettingsIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography
												sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
											>
												{item.title}
											</Typography>
										}
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													sx={{
														display: "block",
														fontSize: 13,
														color: "#64748b",
														mt: 0.5,
														mb: 0.5,
														lineHeight: 1.5,
													}}
												>
													{item.desc}
												</Typography>
												<Typography
													component="span"
													variant="caption"
													sx={{ fontSize: 11, color: "#94a3b8" }}
												>
													{item.time}
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItemButton>
								<Divider component="li" />
							</React.Fragment>
						))}
					</List>
				)}
			</Box>
		</Box>
	);
}
