"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Image from "next/image";

export default function SimpleAppBar() {
	const [searchValue, setSearchValue] = React.useState("");

	return (
		<AppBar
			position="sticky"
			elevation={0}
			color="transparent"
			sx={{
				top: 0,
				zIndex: 1200,
				bgcolor: "transparent",
				color: "#ffffff",
				backdropFilter: "none",
				WebkitBackdropFilter: "none",
				borderBottom: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ px: 2, minHeight: 64, gap: 1.5, color: "#ffffff" }}>
				<Box
					sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}
				>
					<Box
						sx={{
							width: 100,
							height: 40,
							borderRadius: 2.5,
							overflow: "hidden",
							position: "relative",
						}}
					>
						<Image
							src="/brand/logo.png"
							alt="PK"
							fill
							sizes="100px"
							priority
							style={{ objectFit: "contain" }}
						/>
					</Box>
				</Box>

				<Box sx={{ flex: 1, px: 0.5 }}>
					<TextField
						size="small"
						placeholder="Cari donasi…"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						fullWidth
						sx={{
							"& .MuiOutlinedInput-root": {
								height: 40,
								borderRadius: 12,
								bgcolor: "rgba(255,255,255,0.15)",
								"& fieldset": { border: "1px solid rgba(255,255,255,0.30)" },
								"&:hover fieldset": { borderColor: "rgba(97,206,112,0.65)" },
								"&.Mui-focused fieldset": { borderColor: "#61ce70" },
								backdropFilter: "blur(8px)",
							},
							"& input": { fontSize: 13, color: "#ffffff" },
							"& .MuiInputBase-input::placeholder": {
								color: "rgba(255,255,255,0.75)",
								opacity: 1,
							},
						}}
						InputProps={{
							startAdornment: (
								<Box
									sx={{
										pl: 1.25,
										pr: 0.75,
										color: "rgba(255,255,255,0.90)",
										fontSize: 16,
									}}
								>
									🔎
								</Box>
							),
						}}
					/>
				</Box>

				<IconButton
					sx={{
						width: 40,
						height: 40,
						borderRadius: 12,
						border: "1px solid rgba(255,255,255,0.18)",
						bgcolor: "rgba(255,255,255,0.10)",
						backdropFilter: "blur(10px)",
					}}
				>
					<Badge badgeContent={3} color="error">
						<NotificationsIcon sx={{ color: "#ffffff" }} />
					</Badge>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
