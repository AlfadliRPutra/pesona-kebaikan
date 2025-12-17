import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const myDonations = [
	{
		id: "INV-20251217-001",
		campaign: "Bantu Korban Banjir Sumut, Aceh & Sumbar",
		amount: 50000,
		date: "17 Des 2025",
		status: "Berhasil",
		paymentMethod: "GoPay",
	},
	{
		id: "INV-20251210-023",
		campaign: "Selamatkan Ratusan Anabul Korban Banjir",
		amount: 25000,
		date: "10 Des 2025",
		status: "Berhasil",
		paymentMethod: "OVO",
	},
	{
		id: "INV-20251201-104",
		campaign: "Bantu Biaya Berobat Anak Kecil yang Sakit",
		amount: 100000,
		date: "01 Des 2025",
		status: "Pending",
		paymentMethod: "BCA Virtual Account",
	},
];

export default function MyDonationPage() {
	return (
		<Box sx={{ px: 2.5, pt: 2.5, pb: 4 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: 3,
				}}
			>
				<Typography sx={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
					Donasi Saya
				</Typography>
			</Box>

			{/* Summary Card */}
			<Card
				variant="outlined"
				sx={{
					mb: 3,
					borderRadius: 3,
					bgcolor: "#61ce70",
					border: "none",
					boxShadow: "0 10px 20px rgba(97,206,112,0.25)",
					color: "#fff",
				}}
			>
				<CardContent sx={{ p: 2.5 }}>
					<Typography sx={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>
						Total Kebaikanmu
					</Typography>
					<Typography sx={{ fontSize: 28, fontWeight: 900, mt: 0.5 }}>
						Rp 175.000
					</Typography>
					<Box sx={{ mt: 2, display: "flex", gap: 1 }}>
						<Chip
							label="3x Donasi"
							size="small"
							sx={{
								bgcolor: "rgba(255,255,255,0.2)",
								color: "#fff",
								fontWeight: 700,
								border: "none",
							}}
						/>
						<Chip
							label="Member Basic"
							size="small"
							sx={{
								bgcolor: "rgba(255,255,255,0.2)",
								color: "#fff",
								fontWeight: 700,
								border: "none",
							}}
						/>
					</Box>
				</CardContent>
			</Card>

			<Typography
				sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a", mb: 2 }}
			>
				Riwayat Terbaru
			</Typography>

			<Stack spacing={2}>
				{myDonations.map((item) => (
					<Card
						key={item.id}
						variant="outlined"
						sx={{
							borderRadius: 3,
							borderColor: "rgba(0,0,0,0.06)",
							bgcolor: "#fff",
							transition: "all 0.2s ease",
							"&:hover": { borderColor: "rgba(0,0,0,0.12)" },
						}}
					>
						<CardContent sx={{ p: 2 }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									mb: 1.5,
								}}
							>
								<Box sx={{ flex: 1, mr: 1.5 }}>
									<Typography
										sx={{
											fontSize: 14,
											fontWeight: 800,
											color: "#0f172a",
											lineHeight: 1.4,
										}}
									>
										{item.campaign}
									</Typography>
									<Typography
										sx={{
											fontSize: 11,
											color: "rgba(15,23,42,.5)",
											mt: 0.5,
											fontWeight: 600,
										}}
									>
										{item.date} • {item.id}
									</Typography>
								</Box>
								<Chip
									label={item.status}
									size="small"
									color={item.status === "Berhasil" ? "success" : "warning"}
									variant={item.status === "Berhasil" ? "filled" : "outlined"}
									sx={{
										height: 22,
										fontSize: 10,
										fontWeight: 800,
										borderRadius: 1.5,
									}}
								/>
							</Box>

							<Divider sx={{ my: 1.5, borderStyle: "dashed" }} />

							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Box>
									<Typography
										sx={{ fontSize: 11, color: "rgba(15,23,42,.6)", mb: 0.2 }}
									>
										Jumlah Donasi
									</Typography>
									<Typography
										sx={{ fontSize: 15, fontWeight: 900, color: "#61ce70" }}
									>
										Rp {item.amount.toLocaleString("id-ID")}
									</Typography>
								</Box>
								<Button
									variant="outlined"
									size="small"
									sx={{
										textTransform: "none",
										borderRadius: 2,
										fontSize: 12,
										fontWeight: 700,
										py: 0.5,
										color: "rgba(15,23,42,.7)",
										borderColor: "rgba(15,23,42,.15)",
										"&:hover": {
											borderColor: "rgba(15,23,42,.3)",
											bgcolor: "transparent",
										},
									}}
								>
									Detail
								</Button>
							</Box>
						</CardContent>
					</Card>
				))}
			</Stack>
		</Box>
	);
}
