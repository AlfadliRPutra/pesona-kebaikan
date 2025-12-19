"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DownloadIcon from "@mui/icons-material/Download";

export default function AccountabilityPage() {
	const router = useRouter();

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
					Akuntabilitas
				</Typography>
			</Box>

			{/* Trust Badge */}
			<Paper
				elevation={0}
				sx={{
					p: 3,
					mb: 4,
					borderRadius: 4,
					background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
					color: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<VerifiedUserIcon sx={{ fontSize: 48, mb: 2, color: "#61ce70" }} />
				<Typography sx={{ fontWeight: 800, fontSize: 20, mb: 1 }}>
					Terpercaya & Transparan
				</Typography>
				<Typography sx={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6 }}>
					Pesona Kebaikan berkomitmen untuk menjaga amanah donatur dengan
					standar transparansi dan akuntabilitas tertinggi.
				</Typography>
			</Paper>

			{/* Pillars */}
			<Grid container spacing={2} sx={{ mb: 4 }}>
				<Grid item xs={6}>
					<Paper
						elevation={0}
						variant="outlined"
						sx={{
							p: 2,
							height: "100%",
							borderRadius: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<AssessmentIcon sx={{ fontSize: 32, color: "#61ce70", mb: 1 }} />
						<Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5 }}>
							Audit Berkala
						</Typography>
						<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.6)" }}>
							Laporan keuangan diaudit oleh Kantor Akuntan Publik independen.
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper
						elevation={0}
						variant="outlined"
						sx={{
							p: 2,
							height: "100%",
							borderRadius: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<AccountBalanceIcon sx={{ fontSize: 32, color: "#61ce70", mb: 1 }} />
						<Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5 }}>
							Izin Resmi
						</Typography>
						<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.6)" }}>
							Berizin resmi dari Kementerian Sosial Republik Indonesia.
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			{/* Annual Reports */}
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 800,
					color: "#0f172a",
					mb: 2,
				}}
			>
				Laporan Tahunan
			</Typography>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				{[2024, 2023, 2022].map((year) => (
					<Paper
						key={year}
						elevation={0}
						variant="outlined"
						sx={{
							p: 2,
							borderRadius: 3,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box>
							<Typography sx={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>
								Laporan Tahunan {year}
							</Typography>
							<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.6)" }}>
								PDF • 2.4 MB
							</Typography>
						</Box>
						<IconButton sx={{ color: "#61ce70" }}>
							<DownloadIcon />
						</IconButton>
					</Paper>
				))}
			</Box>
		</Box>
	);
}
