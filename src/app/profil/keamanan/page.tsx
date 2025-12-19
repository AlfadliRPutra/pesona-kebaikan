"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HistoryIcon from "@mui/icons-material/History";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

export default function SecurityPage() {
	const router = useRouter();

	// State for Change Password Modal
	const [openPassword, setOpenPassword] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState({
		current: false,
		new: false,
		confirm: false,
	});

	// State for 2FA
	const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

	const handleTogglePassword = (field: "current" | "new" | "confirm") => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	return (
		<Box sx={{ px: 2, pt: 2.5, pb: 6 }}>
			{/* Header */}
			<Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
				<IconButton
					onClick={() => router.back()}
					edge="start"
					sx={{ color: "#0f172a" }}
				>
					<ArrowBackIcon />
				</IconButton>
				<Typography sx={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
					Keamanan & Password
				</Typography>
			</Box>

			{/* Security Status Banner */}
			<Paper
				elevation={0}
				sx={{
					p: 2,
					mb: 3,
					borderRadius: 4,
					bgcolor: "#ecfdf5",
					border: "1px solid #bbf7d0",
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Box
					sx={{
						width: 40,
						height: 40,
						borderRadius: "50%",
						bgcolor: "#ffffff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#166534",
					}}
				>
					<LockIcon />
				</Box>
				<Box>
					<Typography sx={{ fontWeight: 800, fontSize: 14, color: "#166534" }}>
						Akun Anda Aman
					</Typography>
					<Typography sx={{ fontSize: 12, color: "#15803d" }}>
						Tidak ada aktivitas mencurigakan terdeteksi
					</Typography>
				</Box>
			</Paper>

			{/* Main Options */}
			<Paper
				elevation={0}
				variant="outlined"
				sx={{
					mb: 3,
					borderRadius: 4,
					bgcolor: "#fff",
					borderColor: "rgba(0,0,0,0.08)",
					overflow: "hidden",
				}}
			>
				<List disablePadding>
					{/* Ganti Password */}
					<ListItemButton
						onClick={() => setOpenPassword(true)}
						sx={{ py: 2 }}
					>
						<ListItemIcon sx={{ minWidth: 40, color: "#61ce70" }}>
							<KeyIcon />
						</ListItemIcon>
						<ListItemText
							primary="Ganti Password"
							secondary="Perbarui password anda secara berkala"
							primaryTypographyProps={{
								fontSize: 14,
								fontWeight: 700,
								color: "#0f172a",
								mb: 0.5,
							}}
							secondaryTypographyProps={{ fontSize: 12 }}
						/>
						<ChevronRightIcon sx={{ color: "rgba(15,23,42,0.3)" }} />
					</ListItemButton>

					<Divider />

					{/* 2FA */}
					<ListItemButton sx={{ py: 2 }}>
						<ListItemIcon sx={{ minWidth: 40, color: "#61ce70" }}>
							<SmartphoneIcon />
						</ListItemIcon>
						<ListItemText
							primary="Autentikasi Dua Faktor"
							secondary="Tambahkan lapisan keamanan ekstra"
							primaryTypographyProps={{
								fontSize: 14,
								fontWeight: 700,
								color: "#0f172a",
								mb: 0.5,
							}}
							secondaryTypographyProps={{ fontSize: 12 }}
						/>
						<Switch
							checked={twoFactorEnabled}
							onChange={(e) => setTwoFactorEnabled(e.target.checked)}
							color="success"
						/>
					</ListItemButton>
				</List>
			</Paper>

			{/* Login Activity */}
			<Typography
				sx={{
					fontSize: 13,
					fontWeight: 800,
					color: "rgba(15,23,42,0.5)",
					mb: 1.5,
					ml: 1,
					textTransform: "uppercase",
					letterSpacing: 0.5,
				}}
			>
				Aktivitas Login
			</Typography>
			<Paper
				elevation={0}
				variant="outlined"
				sx={{
					borderRadius: 4,
					bgcolor: "#fff",
					borderColor: "rgba(0,0,0,0.08)",
					overflow: "hidden",
				}}
			>
				<List disablePadding>
					<ListItemButton sx={{ py: 2 }}>
						<ListItemIcon sx={{ minWidth: 40, color: "rgba(15,23,42,0.6)" }}>
							<SmartphoneIcon />
						</ListItemIcon>
						<ListItemText
							primary="iPhone 13 Pro"
							secondary="Jakarta, Indonesia • Saat ini"
							primaryTypographyProps={{
								fontSize: 14,
								fontWeight: 600,
								color: "#0f172a",
							}}
							secondaryTypographyProps={{ fontSize: 12, color: "#166534" }}
						/>
					</ListItemButton>
					<Divider component="li" />
					<ListItemButton sx={{ py: 2 }}>
						<ListItemIcon sx={{ minWidth: 40, color: "rgba(15,23,42,0.6)" }}>
							<HistoryIcon />
						</ListItemIcon>
						<ListItemText
							primary="Chrome pada Windows"
							secondary="Surabaya, Indonesia • 2 hari yang lalu"
							primaryTypographyProps={{
								fontSize: 14,
								fontWeight: 600,
								color: "#0f172a",
							}}
							secondaryTypographyProps={{ fontSize: 12 }}
						/>
					</ListItemButton>
				</List>
			</Paper>

			{/* Change Password Dialog */}
			<Dialog
				open={openPassword}
				onClose={() => setOpenPassword(false)}
				fullWidth
				maxWidth="sm"
				PaperProps={{ sx: { borderRadius: 3 } }}
			>
				<DialogTitle sx={{ fontWeight: 800, fontSize: 18 }}>
					Ganti Password
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2} sx={{ mt: 1 }}>
						<TextField
							label="Password Saat Ini"
							type={showPassword.current ? "text" : "password"}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => handleTogglePassword("current")}
											edge="end"
										>
											{showPassword.current ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							label="Password Baru"
							type={showPassword.new ? "text" : "password"}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => handleTogglePassword("new")}
											edge="end"
										>
											{showPassword.new ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							label="Konfirmasi Password Baru"
							type={showPassword.confirm ? "text" : "password"}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => handleTogglePassword("confirm")}
											edge="end"
										>
											{showPassword.confirm ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Alert severity="info" sx={{ fontSize: 12 }}>
							Password harus terdiri dari minimal 8 karakter, mengandung huruf
							besar, kecil, dan angka.
						</Alert>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button
						onClick={() => setOpenPassword(false)}
						sx={{ color: "rgba(15,23,42,0.6)", fontWeight: 600 }}
					>
						Batal
					</Button>
					<Button
						variant="contained"
						onClick={() => setOpenPassword(false)}
						sx={{
							bgcolor: "#61ce70",
							color: "white",
							fontWeight: 700,
							boxShadow: "none",
							"&:hover": { bgcolor: "#16a34a", boxShadow: "none" },
						}}
					>
						Simpan Password
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
