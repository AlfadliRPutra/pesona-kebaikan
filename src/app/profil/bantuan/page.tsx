"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function HelpCenterPage() {
	const router = useRouter();
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const faqs = [
		{
			id: "panel1",
			question: "Bagaimana cara berdonasi di Pesona Kebaikan?",
			answer:
				"Pilih campaign yang ingin Anda bantu, klik tombol 'Donasi Sekarang', masukkan nominal donasi, pilih metode pembayaran, dan ikuti instruksi pembayaran yang muncul.",
		},
		{
			id: "panel2",
			question: "Apakah donasi saya dikenakan biaya administrasi?",
			answer:
				"Untuk operasional platform, kami mengenakan biaya administrasi kecil sebesar 5% dari total donasi (kecuali kategori Zakat dan Bencana Alam 0%). Biaya ini digunakan untuk pemeliharaan sistem dan verifikasi campaign.",
		},
		{
			id: "panel3",
			question: "Bagaimana cara memverifikasi akun saya?",
			answer:
				"Masuk ke menu Profil, pilih 'Verifikasi Akun', dan ikuti 3 langkah mudah: Upload Foto KTP, Verifikasi Email, dan Verifikasi WhatsApp.",
		},
		{
			id: "panel4",
			question: "Apakah donasi saya aman?",
			answer:
				"Tentu saja. Pesona Kebaikan menggunakan sistem keamanan enkripsi SSL dan bekerja sama dengan payment gateway terpercaya. Kami juga melakukan verifikasi ketat terhadap setiap penggalang dana.",
		},
		{
			id: "panel5",
			question: "Bagaimana cara mencairkan dana donasi?",
			answer:
				"Pencairan dana hanya dapat dilakukan oleh penggalang dana yang telah terverifikasi. Masuk ke menu 'Galang Dana Saya', pilih campaign, dan ajukan pencairan dana. Proses verifikasi pencairan memakan waktu 1-3 hari kerja.",
		},
	];

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
					Pusat Bantuan
				</Typography>
			</Box>

			{/* Search */}
			<Paper
				elevation={0}
				sx={{
					p: 2,
					mb: 4,
					borderRadius: 4,
					bgcolor: "#61ce70",
					color: "white",
					textAlign: "center",
				}}
			>
				<HelpOutlineIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
				<Typography sx={{ fontWeight: 800, fontSize: 18, mb: 0.5 }}>
					Halo, ada yang bisa kami bantu?
				</Typography>
				<Typography sx={{ fontSize: 13, mb: 2, opacity: 0.9 }}>
					Temukan jawaban untuk pertanyaan Anda disini
				</Typography>
				<TextField
					fullWidth
					placeholder="Cari topik bantuan..."
					variant="outlined"
					size="small"
					sx={{
						bgcolor: "white",
						borderRadius: 2,
						"& .MuiOutlinedInput-root": {
							borderRadius: 2,
							"& fieldset": { border: "none" },
						},
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon sx={{ color: "rgba(0,0,0,0.4)" }} />
							</InputAdornment>
						),
					}}
				/>
			</Paper>

			{/* FAQ List */}
			<Typography
				sx={{
					fontSize: 16,
					fontWeight: 800,
					color: "#0f172a",
					mb: 2,
				}}
			>
				Pertanyaan Sering Diajukan
			</Typography>

			<Box>
				{faqs.map((faq) => (
					<Accordion
						key={faq.id}
						expanded={expanded === faq.id}
						onChange={handleChange(faq.id)}
						elevation={0}
						sx={{
							mb: 1,
							border: "1px solid rgba(0,0,0,0.08)",
							borderRadius: "12px !important",
							"&:before": { display: "none" },
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`${faq.id}-content`}
							id={`${faq.id}-header`}
						>
							<Typography sx={{ fontWeight: 600, fontSize: 14 }}>
								{faq.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.7)" }}>
								{faq.answer}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Box>
	);
}
