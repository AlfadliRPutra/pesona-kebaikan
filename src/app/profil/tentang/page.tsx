"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupsIcon from "@mui/icons-material/Groups";

export default function AboutPage() {
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
					Tentang Kami
				</Typography>
			</Box>

			{/* Hero Section */}
			<Paper
				elevation={0}
				sx={{
					p: 3,
					mb: 4,
					borderRadius: 4,
					background: "linear-gradient(135deg, #61ce70 0%, #16a34a 100%)",
					color: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Box
					sx={{
						width: 60,
						height: 60,
						borderRadius: "50%",
						bgcolor: "rgba(255,255,255,0.2)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 2,
					}}
				>
					<FavoriteIcon sx={{ fontSize: 32 }} />
				</Box>
				<Typography sx={{ fontWeight: 800, fontSize: 22, mb: 1 }}>
					Pesona Kebaikan
				</Typography>
				<Typography sx={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6 }}>
					Jembatan kebaikan untuk jutaan harapan. Kami percaya bahwa setiap
					orang berhak mendapatkan kesempatan untuk kehidupan yang lebih baik.
				</Typography>
			</Paper>

			{/* Mission Section */}
			<Box sx={{ mb: 4 }}>
				<Typography
					sx={{
						fontSize: 18,
						fontWeight: 800,
						color: "#0f172a",
						mb: 2,
					}}
				>
					Misi Kami
				</Typography>
				<Typography
					sx={{
						fontSize: 14,
						color: "rgba(15,23,42,0.7)",
						lineHeight: 1.8,
						mb: 2,
					}}
				>
					Pesona Kebaikan hadir untuk menghubungkan #OrangBaik dengan mereka yang
					membutuhkan bantuan. Kami memfasilitasi penggalangan dana untuk
					berbagai tujuan sosial, mulai dari bantuan medis, pendidikan, bencana
					alam, hingga pemberdayaan masyarakat.
				</Typography>
				<Typography
					sx={{
						fontSize: 14,
						color: "rgba(15,23,42,0.7)",
						lineHeight: 1.8,
					}}
				>
					Dengan teknologi yang transparan dan mudah diakses, kami ingin
					menciptakan ekosistem gotong royong digital yang aman dan terpercaya
					di Indonesia.
				</Typography>
			</Box>

			<Divider sx={{ mb: 4 }} />

			{/* Values */}
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 800,
					color: "#0f172a",
					mb: 2,
				}}
			>
				Nilai Utama
			</Typography>

			<Box sx={{ display: "grid", gap: 2 }}>
				<Paper
					elevation={0}
					variant="outlined"
					sx={{ p: 2, borderRadius: 3, display: "flex", gap: 2 }}
				>
					<Box sx={{ color: "#61ce70" }}>
						<HandshakeIcon />
					</Box>
					<Box>
						<Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5 }}>
							Transparansi
						</Typography>
						<Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.6)" }}>
							Setiap rupiah donasi tercatat dan dilaporkan secara terbuka.
						</Typography>
					</Box>
				</Paper>

				<Paper
					elevation={0}
					variant="outlined"
					sx={{ p: 2, borderRadius: 3, display: "flex", gap: 2 }}
				>
					<Box sx={{ color: "#61ce70" }}>
						<GroupsIcon />
					</Box>
					<Box>
						<Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5 }}>
							Gotong Royong
						</Typography>
						<Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.6)" }}>
							Kekuatan kebersamaan untuk menyelesaikan masalah sosial.
						</Typography>
					</Box>
				</Paper>
			</Box>

			<Box sx={{ mt: 4, textAlign: "center" }}>
				<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.4)" }}>
					Versi Aplikasi 1.0.0
				</Typography>
				<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.4)" }}>
					© 2024 Pesona Kebaikan. All rights reserved.
				</Typography>
			</Box>
		</Box>
	);
}
