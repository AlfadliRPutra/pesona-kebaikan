"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const categories = [
	{ value: "bencana", label: "Bencana Alam" },
	{ value: "medis", label: "Bantuan Medis & Kesehatan" },
	{ value: "pendidikan", label: "Pendidikan & Beasiswa" },
	{ value: "yatim", label: "Panti Asuhan & Yatim" },
	{ value: "masjid", label: "Pembangunan Masjid" },
	{ value: "lainnya", label: "Lainnya" },
];

export default function FundraiserPage() {
	const [category, setCategory] = React.useState("");

	return (
		<Box sx={{ px: 2.5, pt: 2.5, pb: 6 }}>
			<Box sx={{ mb: 3 }}>
				<Typography sx={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
					Mulai Galang Dana
				</Typography>
				<Typography sx={{ fontSize: 13, color: "rgba(15,23,42,.6)", mt: 0.5 }}>
					Ceritakan kisahmu dan ajak orang baik berdonasi.
				</Typography>
			</Box>

			<Card
				variant="outlined"
				sx={{
					borderRadius: 3,
					borderColor: "rgba(0,0,0,0.08)",
					bgcolor: "#fff",
					boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
				}}
			>
				<CardContent sx={{ p: 2.5 }}>
					<Stack spacing={2.5}>
						<Box>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 700,
									color: "#0f172a",
									mb: 1,
								}}
							>
								Kategori Galang Dana
							</Typography>
							<TextField
								select
								fullWidth
								size="small"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder="Pilih kategori"
								InputProps={{
									sx: { borderRadius: 2, fontSize: 14 },
								}}
							>
								{categories.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Box>

						<Box>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 700,
									color: "#0f172a",
									mb: 1,
								}}
							>
								Target Donasi
							</Typography>
							<TextField
								fullWidth
								size="small"
								placeholder="0"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Typography
												sx={{
													fontSize: 14,
													fontWeight: 700,
													color: "#0f172a",
												}}
											>
												Rp
											</Typography>
										</InputAdornment>
									),
									sx: { borderRadius: 2, fontSize: 14, fontWeight: 700 },
								}}
							/>
						</Box>

						<Box>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 700,
									color: "#0f172a",
									mb: 1,
								}}
							>
								Judul Galang Dana
							</Typography>
							<TextField
								fullWidth
								size="small"
								placeholder="Contoh: Bantu Renovasi Sekolah..."
								InputProps={{
									sx: { borderRadius: 2, fontSize: 14 },
								}}
							/>
						</Box>

						<Box>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 700,
									color: "#0f172a",
									mb: 1,
								}}
							>
								Cerita Lengkap
							</Typography>
							<TextField
								fullWidth
								multiline
								minRows={4}
								placeholder="Tuliskan cerita lengkap, alasan menggalang dana, dan rencana penggunaan dana..."
								InputProps={{
									sx: { borderRadius: 2, fontSize: 14 },
								}}
							/>
						</Box>

						<Box>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 700,
									color: "#0f172a",
									mb: 1,
								}}
							>
								Foto Utama
							</Typography>
							<Button
								variant="outlined"
								fullWidth
								component="label"
								startIcon={<CloudUploadIcon />}
								sx={{
									height: 100,
									borderStyle: "dashed",
									borderWidth: 2,
									borderRadius: 3,
									borderColor: "rgba(0,0,0,0.15)",
									color: "rgba(15,23,42,.6)",
									textTransform: "none",
									flexDirection: "column",
									gap: 1,
									"&:hover": {
										borderStyle: "dashed",
										borderWidth: 2,
										bgcolor: "rgba(0,0,0,0.02)",
									},
								}}
							>
								Upload Foto
								<input type="file" hidden accept="image/*" />
							</Button>
						</Box>

						<Button
							variant="contained"
							fullWidth
							size="large"
							sx={{
								mt: 2,
								borderRadius: 3,
								textTransform: "none",
								fontWeight: 800,
								fontSize: 15,
								boxShadow: "0 10px 20px rgba(97,206,112,0.25)",
							}}
						>
							Buat Galang Dana
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
}
