"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GavelIcon from "@mui/icons-material/Gavel";

export default function TermsPage() {
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
					Syarat & Ketentuan
				</Typography>
			</Box>

			{/* Intro Banner */}
			<Paper
				elevation={0}
				sx={{
					p: 2,
					mb: 3,
					borderRadius: 3,
					bgcolor: "#f1f5f9",
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<GavelIcon sx={{ color: "#64748b" }} />
				<Typography sx={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
					Harap membaca syarat dan ketentuan ini dengan saksama sebelum
					menggunakan platform Pesona Kebaikan.
				</Typography>
			</Paper>

			{/* Content */}
			<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
				<Box>
					<Typography
						sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 1 }}
					>
						1. Pendahuluan
					</Typography>
					<Typography
						sx={{ fontSize: 14, color: "rgba(15,23,42,0.7)", lineHeight: 1.8 }}
					>
						Selamat datang di Pesona Kebaikan. Syarat dan Ketentuan ini
						mengatur penggunaan Anda atas situs web dan layanan kami. Dengan
						mengakses atau menggunakan layanan kami, Anda setuju untuk terikat
						oleh ketentuan ini.
					</Typography>
				</Box>

				<Box>
					<Typography
						sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 1 }}
					>
						2. Definisi
					</Typography>
					<Typography
						component="div"
						sx={{ fontSize: 14, color: "rgba(15,23,42,0.7)", lineHeight: 1.8 }}
					>
						<ul>
							<li>
								<strong>Platform:</strong> Situs web Pesona Kebaikan.
							</li>
							<li>
								<strong>Pengguna:</strong> Pihak yang mengakses Platform,
								termasuk Donatur dan Penggalang Dana.
							</li>
							<li>
								<strong>Donatur:</strong> Pengguna yang memberikan donasi.
							</li>
							<li>
								<strong>Penggalang Dana (Campaigner):</strong> Pengguna yang
								membuat halaman galang dana.
							</li>
						</ul>
					</Typography>
				</Box>

				<Box>
					<Typography
						sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 1 }}
					>
						3. Ketentuan Donasi
					</Typography>
					<Typography
						sx={{ fontSize: 14, color: "rgba(15,23,42,0.7)", lineHeight: 1.8 }}
					>
						Donatur memahami bahwa Pesona Kebaikan hanya memfasilitasi
						penyaluran donasi. Tanggung jawab penggunaan dana sepenuhnya berada
						pada Penggalang Dana. Pesona Kebaikan berhak memotong biaya
						administrasi sesuai ketentuan yang berlaku (5% untuk operasional).
					</Typography>
				</Box>

				<Box>
					<Typography
						sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 1 }}
					>
						4. Larangan
					</Typography>
					<Typography
						sx={{ fontSize: 14, color: "rgba(15,23,42,0.7)", lineHeight: 1.8 }}
					>
						Pengguna dilarang memuat konten yang mengandung unsur SARA,
						pornografi, ujaran kebencian, berita bohong (hoax), atau materi
						lain yang melanggar hukum di Indonesia. Kami berhak menghapus
						konten atau memblokir akun yang melanggar ketentuan ini.
					</Typography>
				</Box>

				<Box>
					<Typography
						sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 1 }}
					>
						5. Perubahan Ketentuan
					</Typography>
					<Typography
						sx={{ fontSize: 14, color: "rgba(15,23,42,0.7)", lineHeight: 1.8 }}
					>
						Kami dapat mengubah Syarat dan Ketentuan ini sewaktu-waktu.
						Perubahan akan efektif segera setelah diposting di Platform.
						Penggunaan berkelanjutan atas layanan setelah perubahan tersebut
						merupakan persetujuan Anda terhadap ketentuan baru.
					</Typography>
				</Box>
			</Box>

			<Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
				<Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.5)" }}>
					Terakhir diperbarui: 19 Desember 2025
				</Typography>
			</Box>
		</Box>
	);
}
