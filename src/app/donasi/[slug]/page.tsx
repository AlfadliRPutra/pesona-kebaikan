"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Box,
	Typography,
	Button,
	LinearProgress,
	Avatar,
	IconButton,
	Tabs,
	Tab,
	Divider,
	Paper,
	Stack,
	Container,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Slide,
	Chip,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Snackbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// Social Icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Utils
function formatIDR(amount: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// Mock Data
const CAMPAIGN_DATA = {
	id: "tanam-harapan-difabel",
	type: "medis", // "medis" or "lainnya"
	title: "Tanam Harapan untuk Para Petani Difabel!",
	images: [
		"https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=70",
		"https://images.unsplash.com/photo-1504159506876-6333528c8473?auto=format&fit=crop&w=1200&q=70",
		"https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=1200&q=70",
	],
	category: "Bantuan Medis & Kesehatan",
	location: "Kab. Bandung, Jawa Barat",
	organizer: {
		id: "collab-for-change",
		name: "CollabForChange",
		avatar: "https://i.pravatar.cc/150?u=collab",
		verified: true,
		type: "Yayasan",
	},
	beneficiary: {
		name: "Pak Asep",
		condition: "Tuna Daksa",
	},
	// Specific for Medis
	medicalInfo: {
		patientName: "Pak Asep",
		disease: "Kanker Tulang (Osteosarcoma)",
		medicalDocs: true, // Dokumen medis terlampir
		receiver: {
			name: "Ibu Siti (Istri)",
			relation: "Keluarga Satu KK",
			bank: "BRI - 1234xxxxxx",
		},
		hospital: "RS Hasan Sadikin, Bandung",
	},
	stats: {
		collected: 483580004,
		target: 800000000,
		donorCount: 4521,
		daysLeft: 86,
	},
	story: `
    <p>Pak Asep (45 tahun) adalah seorang petani difabel yang gigih. Meski kehilangan satu kakinya akibat kecelakaan 10 tahun lalu, semangatnya untuk menghidupi keluarga tak pernah surut.</p>
    <br/>
    <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=60" alt="Pak Asep di ladang" style="width: 100%; border-radius: 8px; margin: 16px 0;" />
    <br/>
    <p>Namun, kini ujian berat kembali datang. Pak Asep didiagnosis menderita kanker tulang yang menggerogoti sisa kakinya. Ia membutuhkan biaya besar untuk operasi dan pengobatan intensif.</p>
    <br/>
    <p>"Saya ingin sembuh, saya ingin kembali ke ladang untuk anak-anak," ujar Pak Asep dengan mata berkaca-kaca.</p>
    <br/>
    <div style="position: relative; width: 100%; padding-bottom: 56.25%; background-color: #000; border-radius: 8px; margin: 16px 0; display: flex; align-items: center; justify-content: center;">
      <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold;">[Video Simulasi: Kisah Pak Asep]</span>
    </div>
    <br/>
    <p>Mari bantu wujudkan kesembuhan Pak Asep. Donasi Anda akan digunakan untuk:</p>
    <ul>
      <li>Biaya operasi amputasi dan kemoterapi</li>
      <li>Pembelian kaki palsu</li>
      <li>Biaya operasional selama pengobatan</li>
    </ul>
    <p>Kebaikan Anda adalah harapan bagi mereka.</p>
  `,
	withdrawals: [
		{
			date: "15 Jan 2026",
			amount: 5500000,
			usage: "Pembelian obat kemoterapi siklus 1",
		},
		{
			date: "02 Jan 2026",
			amount: 2000000,
			usage: "Biaya transportasi dan akomodasi RS",
		},
	],
	updates: [
		{
			date: "18 Des 2025",
			title: "Kabar dari Rumah Sakit",
			content:
				"Alhamdulillah, Pak Asep sudah menjalani pemeriksaan awal. Dokter menyarankan untuk segera dilakukan tindakan operasi bulan depan.",
		},
	],
	donors: [
		{
			id: "d1",
			name: "Hamba Allah",
			avatar: null,
			amount: 100000,
			time: "2 menit yang lalu",
			message: "Semoga berkah dan bermanfaat bagi Pak Asep sekeluarga.",
		},
		{
			id: "d2",
			name: "Budi Santoso",
			avatar: "https://i.pravatar.cc/150?u=budi",
			amount: 50000,
			time: "5 menit yang lalu",
			message: "Tetap semangat Pak!",
		},
		{
			id: "d3",
			name: "Siti Aminah",
			avatar: null,
			amount: 250000,
			time: "10 menit yang lalu",
			message: "",
		},
		{
			id: "d4",
			name: "Rizky Ramadhan",
			avatar: "https://i.pravatar.cc/150?u=rizky",
			amount: 500000,
			time: "1 jam yang lalu",
			message: "Semoga lekas sembuh pak Asep.",
		},
		{
			id: "d5",
			name: "Anonim",
			avatar: null,
			amount: 20000,
			time: "2 jam yang lalu",
			message: "",
		},
		// Mock more donors for "See All"
		...Array.from({ length: 15 }).map((_, i) => ({
			id: `dm${i}`,
			name: `Donatur #${i + 6}`,
			avatar: null,
			amount: (i + 1) * 10000,
			time: `${i + 3} jam yang lalu`,
			message: i % 3 === 0 ? "Semoga bermanfaat" : "",
		})),
	],
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`campaign-tabpanel-${index}`}
			aria-labelledby={`campaign-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
}

export default function CampaignDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const router = useRouter();
	const [tabValue, setTabValue] = React.useState(0);
	const [showFullStory, setShowFullStory] = React.useState(false);

	// Modals State
	const [openMedicalModal, setOpenMedicalModal] = React.useState(false);
	const [openDonorsModal, setOpenDonorsModal] = React.useState(false);
	const [openShareModal, setOpenShareModal] = React.useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);

	// Image Carousel State
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const carouselRef = React.useRef<HTMLDivElement>(null);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const data = CAMPAIGN_DATA; // Mock
	const progress = Math.min(
		100,
		Math.round((data.stats.collected / data.stats.target) * 100)
	);

	const isMedis = data.type === "medis";

	// Handle Image Scroll
	const handleScroll = () => {
		if (carouselRef.current) {
			const scrollLeft = carouselRef.current.scrollLeft;
			const width = carouselRef.current.clientWidth;
			const index = Math.round(scrollLeft / width);
			setCurrentImageIndex(index);
		}
	};

	const scrollToImage = (index: number) => {
		if (carouselRef.current) {
			const width = carouselRef.current.clientWidth;
			carouselRef.current.scrollTo({
				left: width * index,
				behavior: "smooth",
			});
		}
	};

	// Share Logic
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	const shareText = `Bantu ${data.title} di Pesona Kebaikan`;

	const handleShareAction = (platform: string) => {
		let url = "";
		switch (platform) {
			case "whatsapp":
				url = `https://wa.me/?text=${encodeURIComponent(
					shareText + " " + shareUrl
				)}`;
				break;
			case "facebook":
				url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
					shareUrl
				)}`;
				break;
			case "twitter":
				url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
					shareText
				)}&url=${encodeURIComponent(shareUrl)}`;
				break;
			case "instagram":
				navigator.clipboard.writeText(shareUrl);
				setSnackbarOpen(true);
				window.open("https://www.instagram.com/", "_blank");
				setOpenShareModal(false);
				return;
			case "copy":
				navigator.clipboard.writeText(shareUrl);
				setSnackbarOpen(true);
				setOpenShareModal(false);
				return;
			default:
				break;
		}
		if (url) {
			window.open(url, "_blank");
			setOpenShareModal(false);
		}
	};

	return (
		<Box
			sx={{
				// Add extra padding at bottom for sticky footer
				// Using CSS variable for nav height + extra space for our own sticky footer
				pb: "calc(var(--bottom-nav-h, 56px) + 120px)",
				bgcolor: "#fff",
				minHeight: "100vh",
			}}
		>
			{/* Mobile Header (Floating) */}
			<Box
				sx={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 1100,
					display: "flex",
					justifyContent: "space-between",
					p: 2,
					background:
						"linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
					pointerEvents: "none",
				}}
			>
				<IconButton
					onClick={() => router.back()}
					sx={{
						color: "white",
						bgcolor: "rgba(0,0,0,0.3)",
						pointerEvents: "auto",
						"&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
					}}
				>
					<ArrowBackIcon />
				</IconButton>
			</Box>

			{/* Hero Image Carousel */}
			<Box
				sx={{
					position: "relative",
					width: "100%",
					aspectRatio: { xs: "4/3", sm: "16/9", md: "21/9" },
					bgcolor: "#f1f5f9",
				}}
			>
				<Box
					ref={carouselRef}
					onScroll={handleScroll}
					sx={{
						display: "flex",
						overflowX: "auto",
						scrollSnapType: "x mandatory",
						width: "100%",
						height: "100%",
						"&::-webkit-scrollbar": { display: "none" },
					}}
				>
					{data.images.map((img, index) => (
						<Box
							key={index}
							sx={{
								minWidth: "100%",
								height: "100%",
								scrollSnapAlign: "start",
								position: "relative",
							}}
						>
							<Image
								src={img}
								alt={`${data.title} - ${index + 1}`}
								fill
								style={{ objectFit: "cover" }}
								priority={index === 0}
							/>
						</Box>
					))}
				</Box>
				{/* Indicators */}
				{data.images.length > 1 && (
					<Box
						sx={{
							position: "absolute",
							bottom: 32, // Lifted up to not be covered by the rounded card
							left: 0,
							right: 0,
							display: "flex",
							justifyContent: "center",
							gap: 1,
							zIndex: 10,
						}}
					>
						{data.images.map((_, index) => (
							<Box
								key={index}
								onClick={() => scrollToImage(index)}
								sx={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									bgcolor:
										currentImageIndex === index
											? "white"
											: "rgba(255,255,255,0.5)",
									cursor: "pointer",
									boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
								}}
							/>
						))}
					</Box>
				)}
			</Box>

			<Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 } }}>
				<Box
					sx={{
						px: 2,
						py: 3,
						mt: { xs: 0, sm: -4 },
						position: "relative",
						bgcolor: "white",
						borderRadius: { xs: 0, sm: "16px 16px 0 0" },
						boxShadow: { xs: "none", sm: "0 -4px 20px rgba(0,0,0,0.05)" },
					}}
				>
					{/* Title & Category */}
					<Box sx={{ mb: 2 }}>
						<Typography
							variant="h1"
							sx={{
								fontSize: { xs: 20, sm: 24 },
								fontWeight: 800,
								lineHeight: 1.4,
								color: "#0f172a",
								mb: 1,
							}}
						>
							{data.title}
						</Typography>
						{isMedis && (
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								<MedicalServicesOutlinedIcon
									sx={{ fontSize: 16, color: "#e11d48" }}
								/>
								<Typography
									sx={{ fontSize: 12, color: "#e11d48", fontWeight: 600 }}
								>
									Bantuan Medis & Kesehatan
								</Typography>
							</Box>
						)}
					</Box>

					{/* Progress Stats */}
					<Box sx={{ mb: 3 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-end",
								mb: 1,
							}}
						>
							<Box>
								<Typography
									sx={{ fontSize: 20, fontWeight: 800, color: "#61ce70" }}
								>
									{formatIDR(data.stats.collected)}
								</Typography>
								<Typography
									sx={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}
								>
									terkumpul dari {formatIDR(data.stats.target)}
								</Typography>
							</Box>
							<Box sx={{ textAlign: "right" }}>
								<Typography
									sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
								>
									{data.stats.daysLeft}
								</Typography>
								<Typography sx={{ fontSize: 12, color: "#64748b" }}>
									hari lagi
								</Typography>
							</Box>
						</Box>
						<LinearProgress
							variant="determinate"
							value={progress}
							sx={{
								height: 8,
								borderRadius: 4,
								bgcolor: "#f1f5f9",
								"& .MuiLinearProgress-bar": {
									bgcolor: "#61ce70",
									borderRadius: 4,
								},
							}}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: 1,
								alignItems: "center",
							}}
						>
							<Typography sx={{ fontSize: 12, color: "#64748b" }}>
								<span style={{ fontWeight: 700, color: "#0f172a" }}>
									{data.stats.donorCount}
								</span>{" "}
								Donatur
							</Typography>
						</Box>
					</Box>

					<Divider sx={{ my: 3 }} />

					{/* Organizer & Beneficiary Info */}
					<Stack spacing={2.5}>
						{/* Penggalang Dana - Clickable */}
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-start",
								gap: 2,
								cursor: "pointer",
								"&:hover": { bgcolor: "#f8fafc", borderRadius: 2, mx: -1, p: 1 },
							}}
							onClick={() =>
								router.push(`/sahabat-baik/${data.organizer.id}`)
							}
						>
							<Avatar
								src={data.organizer.avatar}
								sx={{ width: 48, height: 48, border: "2px solid #f1f5f9" }}
							/>
							<Box sx={{ flex: 1 }}>
								<Typography sx={{ fontSize: 12, color: "#64748b", mb: 0.5 }}>
									Penggalang Dana
								</Typography>
								<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
									<Typography sx={{ fontWeight: 700, fontSize: 14 }}>
										{data.organizer.name}
									</Typography>
									{data.organizer.verified && (
										<VerifiedUserIcon sx={{ fontSize: 16, color: "#3b82f6" }} />
									)}
								</Box>
								<Typography sx={{ fontSize: 12, color: "#64748b" }}>
									Identitas terverifikasi
								</Typography>
							</Box>
							<NavigateNextIcon sx={{ color: "#cbd5e1" }} />
						</Box>

						{/* Detail Pasien / Penerima Manfaat (Khusus Medis) */}
						{isMedis && data.medicalInfo ? (
							<>
								<Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
									<Avatar
										sx={{
											width: 48,
											height: 48,
											bgcolor: "#ecfdf5",
											color: "#15803d",
											fontSize: 20,
											fontWeight: 700,
										}}
									>
										<MedicalServicesOutlinedIcon />
									</Avatar>
									<Box sx={{ flex: 1 }}>
										<Typography
											sx={{ fontSize: 12, color: "#64748b", mb: 0.5 }}
										>
											Penerima Manfaat
										</Typography>
										<Typography sx={{ fontWeight: 700, fontSize: 14 }}>
											{data.medicalInfo.patientName}
										</Typography>
										<Typography sx={{ fontSize: 12, color: "#64748b" }}>
											{data.medicalInfo.disease}
										</Typography>
										<Typography
											sx={{ fontSize: 12, color: "#64748b", mt: 0.5 }}
										>
											Dirawat di: {data.medicalInfo.hospital}
										</Typography>
									</Box>
								</Box>

								{/* Clickable Medical Info Box */}
								<Box
									onClick={() => setOpenMedicalModal(true)}
									sx={{
										p: 2,
										bgcolor: "#f8fafc",
										borderRadius: 2,
										border: "1px dashed #cbd5e1",
										cursor: "pointer",
										transition: "all 0.2s",
										"&:hover": {
											borderColor: "#61ce70",
											bgcolor: "#f0fdf4",
										},
									}}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 1,
										}}
									>
										<AccountBalanceWalletOutlinedIcon
											sx={{ fontSize: 18, color: "#64748b" }}
										/>
										<Typography
											sx={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}
										>
											Informasi Lengkap Penerima & Medis
										</Typography>
									</Box>
									<Typography sx={{ fontSize: 14, fontWeight: 700, mb: 0.5 }}>
										{data.medicalInfo.receiver.name} (
										{data.medicalInfo.receiver.relation})
									</Typography>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography sx={{ fontSize: 12, color: "#64748b" }}>
											Klik untuk melihat detail medis
										</Typography>
										<NavigateNextIcon sx={{ fontSize: 16, color: "#64748b" }} />
									</Box>
								</Box>
							</>
						) : (
							// Non-Medis (General)
							<Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
								<Avatar
									sx={{
										width: 48,
										height: 48,
										bgcolor: "#ecfdf5",
										color: "#15803d",
										fontSize: 20,
										fontWeight: 700,
									}}
								>
									{data.beneficiary.name.charAt(0)}
								</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography sx={{ fontSize: 12, color: "#64748b", mb: 0.5 }}>
										Penerima Manfaat
									</Typography>
									<Typography sx={{ fontWeight: 700, fontSize: 14 }}>
										{data.beneficiary.name}
									</Typography>
									<Typography sx={{ fontSize: 12, color: "#64748b" }}>
										{data.beneficiary.condition}
									</Typography>
								</Box>
							</Box>
						)}
					</Stack>

					<Divider sx={{ my: 3 }} />

					{/* Tabs */}
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							variant="fullWidth"
							sx={{
								"& .MuiTab-root": {
									textTransform: "none",
									fontWeight: 600,
									fontSize: 14,
								},
								"& .Mui-selected": { color: "#61ce70" },
								"& .MuiTabs-indicator": { bgcolor: "#61ce70" },
							}}
						>
							<Tab label="Cerita" />
							<Tab label="Kabar Terbaru" />
						</Tabs>
					</Box>

					{/* Tab: Cerita */}
					<CustomTabPanel value={tabValue} index={0}>
						<Box
							sx={{
								position: "relative",
							}}
						>
							<Box
								sx={{
									color: "#334155",
									lineHeight: 1.8,
									fontSize: 15,
									maxHeight: showFullStory ? "none" : 300,
									overflow: "hidden",
									"& p": { mb: 2 },
									"& ul": { mb: 2, pl: 2 },
									"& li": { mb: 0.5 },
									"& img": {
										maxWidth: "100%",
										height: "auto",
										borderRadius: 2,
										display: "block",
									},
								}}
								dangerouslySetInnerHTML={{ __html: data.story }}
							/>
							{!showFullStory && (
								<Box
									sx={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: 120,
										background:
											"linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%)",
										pointerEvents: "none",
									}}
								/>
							)}
						</Box>

						{/* Button Moved Outside of Relative Box for better placement */}
						{!showFullStory && (
							<Button
								fullWidth
								onClick={() => setShowFullStory(true)}
								sx={{
									mt: 1,
									color: "#61ce70",
									fontWeight: 700,
									textTransform: "none",
									borderColor: "#61ce70",
								}}
								variant="outlined"
							>
								Baca Selengkapnya
							</Button>
						)}
					</CustomTabPanel>

					{/* Tab: Kabar Terbaru + Pencairan Dana */}
					<CustomTabPanel value={tabValue} index={1}>
						{/* Informasi Pencairan Dana */}
						{data.withdrawals && data.withdrawals.length > 0 && (
							<Box sx={{ mb: 4 }}>
								<Box
									sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
								>
									<ReceiptLongOutlinedIcon sx={{ color: "#0f172a" }} />
									<Typography sx={{ fontWeight: 700, fontSize: 16 }}>
										Riwayat Pencairan Dana
									</Typography>
								</Box>
								<Stack spacing={2}>
									{data.withdrawals.map((wd, idx) => (
										<Paper
											key={idx}
											variant="outlined"
											sx={{
												p: 2,
												borderRadius: 2,
												bgcolor: "#f8fafc",
												border: "1px solid #e2e8f0",
											}}
										>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													mb: 1,
												}}
											>
												<Typography
													sx={{
														fontSize: 12,
														color: "#64748b",
														fontWeight: 500,
													}}
												>
													{wd.date}
												</Typography>
												<Typography
													sx={{
														fontSize: 14,
														fontWeight: 700,
														color: "#0f172a",
													}}
												>
													{formatIDR(wd.amount)}
												</Typography>
											</Box>
											<Typography sx={{ fontSize: 13, color: "#334155" }}>
												{wd.usage}
											</Typography>
										</Paper>
									))}
								</Stack>
								<Divider sx={{ my: 3 }} />
							</Box>
						)}

						{/* Updates */}
						<Box sx={{ mb: 2 }}>
							<Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2 }}>
								Update Terkini
							</Typography>
							{data.updates.map((update, idx) => (
								<Box
									key={idx}
									sx={{
										pl: 2,
										borderLeft: "2px solid #e2e8f0",
										position: "relative",
										pb: 4,
										"&:last-child": { pb: 0 },
									}}
								>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: "50%",
											bgcolor: "#61ce70",
											position: "absolute",
											left: -7,
											top: 0,
											border: "2px solid white",
										}}
									/>
									<Typography
										sx={{
											fontSize: 12,
											color: "#64748b",
											mb: 0.5,
											fontWeight: 500,
										}}
									>
										{update.date}
									</Typography>
									<Typography
										sx={{
											fontSize: 16,
											fontWeight: 700,
											color: "#0f172a",
											mb: 1,
										}}
									>
										{update.title}
									</Typography>
									<Typography
										sx={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}
									>
										{update.content}
									</Typography>
								</Box>
							))}
						</Box>
					</CustomTabPanel>

					<Divider sx={{ my: 4 }} />

					{/* Donatur Section (Moved Out of Tabs) */}
					<Box id="donatur-section">
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Typography sx={{ fontSize: 18, fontWeight: 800 }}>
								Donatur ({data.stats.donorCount})
							</Typography>
						</Box>

						<Stack spacing={2}>
							{data.donors.slice(0, 5).map((donor) => (
								<Box
									key={donor.id}
									sx={{
										display: "flex",
										gap: 2,
										pb: 2,
										borderBottom: "1px solid #f1f5f9",
										"&:last-child": { borderBottom: "none" },
									}}
								>
									<Avatar
										src={donor.avatar || undefined}
										sx={{
											width: 40,
											height: 40,
											bgcolor: donor.avatar ? "transparent" : "#e2e8f0",
											fontSize: 14,
											color: "#64748b",
										}}
									>
										{!donor.avatar && donor.name.charAt(0)}
									</Avatar>
									<Box sx={{ flex: 1 }}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 0.5,
											}}
										>
											<Typography sx={{ fontWeight: 600, fontSize: 14 }}>
												{donor.name}
											</Typography>
											<Typography sx={{ fontSize: 12, color: "#64748b" }}>
												{donor.time}
											</Typography>
										</Box>
										<Typography
											sx={{
												fontSize: 13,
												color: "#0f172a",
												mb: 0.5,
												fontWeight: 500,
											}}
										>
											Berdonasi{" "}
											<span style={{ color: "#61ce70" }}>
												{formatIDR(donor.amount)}
											</span>
										</Typography>
										{donor.message && (
											<Typography
												sx={{
													fontSize: 13,
													color: "#64748b",
													fontStyle: "italic",
													bgcolor: "#f8fafc",
													p: 1,
													borderRadius: 1,
													mt: 0.5,
													display: "inline-block",
												}}
											>
												"{donor.message}"
											</Typography>
										)}
									</Box>
								</Box>
							))}
						</Stack>
						<Button
							fullWidth
							variant="outlined"
							onClick={() => setOpenDonorsModal(true)}
							sx={{ mt: 2, color: "#64748b", borderColor: "#cbd5e1" }}
						>
							Lihat Semua Donatur
						</Button>
					</Box>
				</Box>
			</Container>

			{/* Sticky Footer Action */}
			<Container
				maxWidth="md"
				sx={{
					position: "fixed",
					bottom: "var(--bottom-nav-h, 56px)",
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: 1000,
					px: { xs: 0, sm: 2 },
				}}
			>
				<Paper
					elevation={4}
					sx={{
						p: 2,
						borderRadius: "16px 16px 0 0",
					}}
				>
					{/* 50-50 Split Buttons */}
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							variant="outlined"
							onClick={() => setOpenShareModal(true)}
							sx={{
								flex: 1,
								height: 48,
								borderRadius: 2,
								borderColor: "#61ce70",
								color: "#61ce70",
								fontWeight: 700,
								"&:hover": { bgcolor: "#f0fdf4", borderColor: "#61ce70" },
							}}
							startIcon={<ShareIcon />}
						>
							Bagikan
						</Button>
						<Button
							fullWidth
							variant="contained"
							size="large"
							startIcon={<VolunteerActivismIcon />}
							sx={{
								flex: 1,
								bgcolor: "#e11d48",
								color: "white",
								fontWeight: 700,
								height: 48,
								borderRadius: 2,
								"&:hover": { bgcolor: "#be123c" },
								boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)",
							}}
						>
							Donasi
						</Button>
					</Box>
				</Paper>
			</Container>

			{/* Modal: Informasi Medis & Penerima */}
			<Dialog
				open={openMedicalModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setOpenMedicalModal(false)}
				fullWidth
				maxWidth="xs"
				PaperProps={{
					sx: {
						borderRadius: 2,
						m: 2,
						maxHeight: "80vh",
					},
				}}
			>
				<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
					<Typography sx={{ fontWeight: 700, fontSize: 16 }}>Informasi Medis</Typography>
					<IconButton onClick={() => setOpenMedicalModal(false)} size="small">
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers sx={{ p: 2 }}>
					<Stack spacing={3}>
						{/* Patient */}
						<Box>
							<Typography sx={{ fontSize: 12, color: "#64748b", mb: 1, fontWeight: 600 }}>
								PASIEN / PENERIMA MANFAAT
							</Typography>
							<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
								<Avatar sx={{ bgcolor: "#ecfdf5", color: "#15803d" }}>
									<MedicalServicesOutlinedIcon />
								</Avatar>
								<Box>
									<Typography sx={{ fontWeight: 700 }}>{data.medicalInfo.patientName}</Typography>
									<Typography sx={{ fontSize: 13, color: "#334155" }}>
										Diagnosa: {data.medicalInfo.disease}
									</Typography>
									<Typography sx={{ fontSize: 13, color: "#334155" }}>
										RS: {data.medicalInfo.hospital}
									</Typography>
								</Box>
							</Box>
						</Box>

						<Divider />

						{/* Documents */}
						<Box>
							<Typography sx={{ fontSize: 12, color: "#64748b", mb: 1, fontWeight: 600 }}>
								VERIFIKASI MEDIS
							</Typography>
							{data.medicalInfo.medicalDocs ? (
								<Chip 
									icon={<DescriptionOutlinedIcon />} 
									label="Dokumen Medis Terlampir" 
									color="success" 
									variant="outlined"
									size="small"
									sx={{ fontWeight: 600 }}
								/>
							) : (
								<Typography sx={{ fontSize: 13, color: "#64748b" }}>Tidak ada dokumen</Typography>
							)}
						</Box>

						<Divider />

						{/* Receiver */}
						<Box>
							<Typography sx={{ fontSize: 12, color: "#64748b", mb: 1, fontWeight: 600 }}>
								PENERIMA DANA
							</Typography>
							<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
								<Avatar sx={{ bgcolor: "#eff6ff", color: "#2563eb" }}>
									<AccountBalanceWalletOutlinedIcon />
								</Avatar>
								<Box>
									<Typography sx={{ fontWeight: 700 }}>{data.medicalInfo.receiver.name}</Typography>
									<Typography sx={{ fontSize: 13, color: "#334155" }}>
										Hubungan: {data.medicalInfo.receiver.relation}
									</Typography>
									<Typography sx={{ fontSize: 13, color: "#334155" }}>
										Rekening: {data.medicalInfo.receiver.bank}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button fullWidth variant="outlined" onClick={() => setOpenMedicalModal(false)}>
						Tutup
					</Button>
				</DialogActions>
			</Dialog>

			{/* Modal: Semua Donatur */}
			<Dialog
				open={openDonorsModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setOpenDonorsModal(false)}
				fullScreen
			>
				<Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: "1px solid #f1f5f9" }}>
					<IconButton edge="start" color="inherit" onClick={() => setOpenDonorsModal(false)} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1, fontWeight: 700, fontSize: 16 }}>
						Semua Donatur
					</Typography>
				</Box>
				<DialogContent sx={{ p: 0 }}>
					<Box sx={{ p: 2 }}>
						<Stack spacing={2}>
							{data.donors.map((donor) => (
								<Box
									key={donor.id}
									sx={{
										display: "flex",
										gap: 2,
										pb: 2,
										borderBottom: "1px solid #f1f5f9",
										"&:last-child": { borderBottom: "none" },
									}}
								>
									<Avatar
										src={donor.avatar || undefined}
										sx={{
											width: 40,
											height: 40,
											bgcolor: donor.avatar ? "transparent" : "#e2e8f0",
											fontSize: 14,
											color: "#64748b",
										}}
									>
										{!donor.avatar && donor.name.charAt(0)}
									</Avatar>
									<Box sx={{ flex: 1 }}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 0.5,
											}}
										>
											<Typography sx={{ fontWeight: 600, fontSize: 14 }}>
												{donor.name}
											</Typography>
											<Typography sx={{ fontSize: 12, color: "#64748b" }}>
												{donor.time}
											</Typography>
										</Box>
										<Typography
											sx={{
												fontSize: 13,
												color: "#0f172a",
												mb: 0.5,
												fontWeight: 500,
											}}
										>
											Berdonasi{" "}
											<span style={{ color: "#61ce70" }}>
												{formatIDR(donor.amount)}
											</span>
										</Typography>
										{donor.message && (
											<Typography
												sx={{
													fontSize: 13,
													color: "#64748b",
													fontStyle: "italic",
													bgcolor: "#f8fafc",
													p: 1,
													borderRadius: 1,
													mt: 0.5,
													display: "inline-block",
												}}
											>
												"{donor.message}"
											</Typography>
										)}
									</Box>
								</Box>
							))}
						</Stack>
					</Box>
				</DialogContent>
			</Dialog>

			{/* Modal: Share Actions */}
			<Dialog
				open={openShareModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setOpenShareModal(false)}
				fullWidth
				maxWidth="xs"
				PaperProps={{
					sx: {
						position: 'absolute',
						bottom: 0,
						m: 0,
						width: '100%',
						borderRadius: "16px 16px 0 0",
						maxHeight: "80vh",
					},
				}}
			>
				<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
					<Typography sx={{ fontWeight: 700, fontSize: 16 }}>Bagikan Kebaikan</Typography>
					<IconButton onClick={() => setOpenShareModal(false)} size="small">
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ p: 0 }}>
					<List sx={{ py: 0 }}>
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleShareAction("whatsapp")}>
								<ListItemIcon>
									<WhatsAppIcon sx={{ color: "#25D366" }} />
								</ListItemIcon>
								<ListItemText primary="WhatsApp" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleShareAction("facebook")}>
								<ListItemIcon>
									<FacebookIcon sx={{ color: "#1877F2" }} />
								</ListItemIcon>
								<ListItemText primary="Facebook" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleShareAction("twitter")}>
								<ListItemIcon>
									<TwitterIcon sx={{ color: "#000000" }} />
								</ListItemIcon>
								<ListItemText primary="X (Twitter)" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleShareAction("instagram")}>
								<ListItemIcon>
									<InstagramIcon sx={{ color: "#E1306C" }} />
								</ListItemIcon>
								<ListItemText primary="Instagram" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleShareAction("copy")}>
								<ListItemIcon>
									<ContentCopyIcon sx={{ color: "#64748b" }} />
								</ListItemIcon>
								<ListItemText primary="Salin Tautan" />
							</ListItemButton>
						</ListItem>
					</List>
				</DialogContent>
			</Dialog>

			{/* Snackbar Copied */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={() => setSnackbarOpen(false)}
				message="Tautan berhasil disalin"
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				ContentProps={{
					sx: {
						bgcolor: "#334155",
						color: "white",
						borderRadius: 2,
						mb: 8,
					}
				}}
			/>
		</Box>
	);
}
