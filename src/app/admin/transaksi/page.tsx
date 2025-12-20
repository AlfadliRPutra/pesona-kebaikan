"use client";

import * as React from "react";
import Link from "next/link";
import {
	Box,
	Paper,
	Typography,
	Stack,
	Chip,
	Button,
	IconButton,
	TextField,
	InputAdornment,
	MenuItem,
	Select,
	FormControl,
	Pagination,
	Divider,
	useTheme,
	Tooltip,
	Skeleton,
	Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";

const PAGE_SIZE = 10;

type TxStatus = "paid" | "pending" | "failed" | "refunded";
type PayMethod = "qris" | "va_bca" | "va_bri" | "gopay" | "manual";

type TxRow = {
	id: string;
	createdAt: string; // "19 Des 2025 10:21"
	campaignId: string;
	campaignTitle: string;
	donorName: string;
	amount: number;
	method: PayMethod;
	status: TxStatus;
	refCode: string;
};

const MOCK: TxRow[] = Array.from({ length: 47 }).map((_, i) => {
	const idx = i + 1;
	const statusPool: TxStatus[] = ["paid", "pending", "failed", "refunded"];
	const methodPool: PayMethod[] = [
		"qris",
		"va_bca",
		"va_bri",
		"gopay",
		"manual",
	];
	const status = statusPool[idx % statusPool.length];
	const method = methodPool[idx % methodPool.length];

	return {
		id: `trx-${String(idx).padStart(4, "0")}`,
		createdAt: `19 Des 2025 ${String(8 + (idx % 10)).padStart(2, "0")}:${String(
			(idx * 7) % 60
		).padStart(2, "0")}`,
		campaignId: `cmp-${String((idx % 12) + 1).padStart(3, "0")}`,
		campaignTitle:
			idx % 3 === 0
				? "Bantu Abi Melawan Kanker Hati"
				: idx % 3 === 1
				? "Bangun Kembali Masjid Terdampak Bencana"
				: "Bantu Biaya Sekolah Anak",
		donorName: idx % 5 === 0 ? "Anonim" : `Donatur ${idx}`,
		amount:
			status === "failed" ? 0 : 10000 * ((idx % 20) + 1) + (idx % 3) * 5000,
		method,
		status,
		refCode: `PK-${Date.now().toString().slice(-6)}-${idx}`,
	};
});

function idr(n: number) {
	if (!n) return "Rp0";
	const s = Math.round(n).toString();
	return "Rp" + s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function clamp1() {
	return {
		display: "-webkit-box",
		WebkitLineClamp: 1,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	};
}

function matchQuery(q: string, row: TxRow) {
	if (!q) return true;
	const s = q.toLowerCase();
	return (
		row.id.toLowerCase().includes(s) ||
		row.campaignTitle.toLowerCase().includes(s) ||
		row.campaignId.toLowerCase().includes(s) ||
		row.donorName.toLowerCase().includes(s) ||
		row.refCode.toLowerCase().includes(s)
	);
}

function statusMeta(status: TxStatus) {
	switch (status) {
		case "paid":
			return {
				label: "Berhasil",
				icon: <CheckCircleRoundedIcon fontSize="small" />,
				tone: "success" as const,
			};
		case "pending":
			return {
				label: "Pending",
				icon: <HourglassBottomRoundedIcon fontSize="small" />,
				tone: "warning" as const,
			};
		case "failed":
			return {
				label: "Gagal",
				icon: <ErrorRoundedIcon fontSize="small" />,
				tone: "error" as const,
			};
		case "refunded":
			return {
				label: "Refund",
				icon: <ReplayRoundedIcon fontSize="small" />,
				tone: "info" as const,
			};
	}
}

function methodLabel(m: PayMethod) {
	switch (m) {
		case "qris":
			return "QRIS";
		case "va_bca":
			return "VA BCA";
		case "va_bri":
			return "VA BRI";
		case "gopay":
			return "GoPay";
		case "manual":
			return "Manual";
	}
}

function Surface({ children, sx }: { children: React.ReactNode; sx?: any }) {
	const t = useTheme();
	return (
		<Paper
			elevation={0}
			sx={{
				width: "100%",
				borderRadius: 3,
				overflow: "hidden",
				bgcolor: alpha(t.palette.background.paper, 0.86),
				backdropFilter: "blur(14px) saturate(140%)",
				border: "1px solid",
				borderColor: alpha(t.palette.divider, 0.08), // halus, bukan border solid
				boxShadow: `0 10px 28px ${alpha("#000", 0.06)}`,
				...sx,
			}}
		>
			{children}
		</Paper>
	);
}

export default function AdminTransaksiPage() {
	const theme = useTheme();

	const [rows, setRows] = React.useState<TxRow[]>([]);
	const [loading, setLoading] = React.useState(true);

	const [q, setQ] = React.useState("");
	const [status, setStatus] = React.useState<"all" | TxStatus>("all");
	const [method, setMethod] = React.useState<"all" | PayMethod>("all");

	const [page, setPage] = React.useState(1);

	React.useEffect(() => {
		const t = setTimeout(() => {
			setRows(MOCK);
			setLoading(false);
		}, 350);
		return () => clearTimeout(t);
	}, []);

	const filtered = React.useMemo(() => {
		let base = rows.filter((r) => matchQuery(q, r));
		if (status !== "all") base = base.filter((r) => r.status === status);
		if (method !== "all") base = base.filter((r) => r.method === method);
		return base;
	}, [rows, q, status, method]);

	React.useEffect(() => setPage(1), [q, status, method]);

	const paginated = React.useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filtered.slice(start, start + PAGE_SIZE);
	}, [filtered, page]);

	// ===== Summary (dummy dari filtered/rows) =====
	const sum = React.useMemo(() => {
		const allPaid = rows.filter((r) => r.status === "paid");
		const todayPaid = allPaid
			.slice(0, 8)
			.reduce((a, b) => a + (b.amount || 0), 0); // dummy
		const monthPaid = allPaid.reduce((a, b) => a + (b.amount || 0), 0);
		
		const pendingRows = rows.filter((r) => r.status === "pending");
		const pending = pendingRows.reduce((a, b) => a + (b.amount || 0), 0);
		const pendingCount = pendingRows.length;

		const refundedCount = rows.filter((r) => r.status === "refunded").length;

		return { todayPaid, monthPaid, pendingCount, refundedCount, paid: monthPaid, pending };
	}, [rows]);

	const onRefresh = () => {
		setLoading(true);
		setTimeout(() => {
			setRows(MOCK);
			setLoading(false);
		}, 300);
	};

	return (
		<Box sx={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
			{/* Header */}
			<Stack
				direction={{ xs: "column", md: "row" }}
				spacing={1.25}
				alignItems={{ md: "center" }}
				justifyContent="space-between"
				sx={{ mb: 1.5 }}
			>
				<Box sx={{ minWidth: 0 }}>
					<Typography
						sx={{ fontSize: 16, fontWeight: 1000, letterSpacing: "-0.02em" }}
					>
						Transaksi Donasi
					</Typography>
					<Typography sx={{ mt: 0.3, fontSize: 12, color: "text.secondary" }}>
						Monitor pembayaran donasi (validasi → tercatat → siap pencairan).
					</Typography>
				</Box>

				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					sx={{ flexWrap: "wrap" }}
				>
					<Tooltip title="Refresh">
						<IconButton
							onClick={onRefresh}
							size="small"
							sx={{
								width: 34,
								height: 34,
								borderRadius: 2,
								bgcolor: alpha(theme.palette.action.hover, 0.06),
								"&:hover": { bgcolor: alpha(theme.palette.action.hover, 0.12) },
							}}
						>
							<RefreshRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip>

					<Button
						component={Link}
						href="/admin/pencairan"
						variant="contained"
						startIcon={<PaidRoundedIcon />}
						sx={{
							borderRadius: 999,
							textTransform: "none",
							fontWeight: 900,
							boxShadow: "none",
							py: 0.85,
						}}
					>
						Ke Pencairan
					</Button>
				</Stack>
			</Stack>

			{/* Summary cards (compact) */}
			<Grid container spacing={1.5} sx={{ mb: 1.5 }}>
				<Grid size={{ xs: 12, md: 4 }}>
					<Surface sx={{ p: 1.5 }}>
						<Stack direction="row" spacing={1.2} alignItems="center">
							<Box
								sx={{
									width: 40,
									height: 40,
									borderRadius: 999,
									bgcolor: alpha(theme.palette.success.main, 0.1),
									color: theme.palette.success.main,
									display: "grid",
									placeItems: "center",
								}}
							>
								<CheckCircleRoundedIcon />
							</Box>
							<Box>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary", fontWeight: 700 }}
								>
									Total Terbayar
								</Typography>
								<Typography sx={{ mt: 0.2, fontSize: 16, fontWeight: 1000 }}>
									{idr(sum.paid)}
								</Typography>
							</Box>
						</Stack>
					</Surface>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Surface sx={{ p: 1.5 }}>
						<Stack direction="row" spacing={1.2} alignItems="center">
							<Box
								sx={{
									width: 40,
									height: 40,
									borderRadius: 999,
									bgcolor: alpha(theme.palette.info.main, 0.1),
									color: theme.palette.info.main,
									display: "grid",
									placeItems: "center",
								}}
							>
								<PaidRoundedIcon />
							</Box>
							<Box>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary", fontWeight: 700 }}
								>
									Bulan Ini
								</Typography>
								<Typography sx={{ mt: 0.2, fontSize: 16, fontWeight: 1000 }}>
									{idr(sum.monthPaid)}
								</Typography>
							</Box>
						</Stack>
					</Surface>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Surface sx={{ p: 1.5 }}>
						<Stack direction="row" spacing={1.2} alignItems="center">
							<Box
								sx={{
									width: 40,
									height: 40,
									borderRadius: 999,
									bgcolor: alpha(theme.palette.warning.main, 0.1),
									color: theme.palette.warning.main,
									display: "grid",
									placeItems: "center",
								}}
							>
								<HourglassBottomRoundedIcon />
							</Box>
							<Box>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary", fontWeight: 700 }}
								>
									Menunggu Pembayaran
								</Typography>
								<Typography sx={{ mt: 0.2, fontSize: 16, fontWeight: 1000 }}>
									{idr(sum.pending)}
								</Typography>
							</Box>
						</Stack>
					</Surface>
				</Grid>
			</Grid>

			{/* Filters */}
			<Surface sx={{ p: 1.5, mb: 1.5 }}>
				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={1}
					alignItems={{ md: "center" }}
				>
					<TextField
						size="small"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Cari ID transaksi / campaign / donatur / ref…"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchRoundedIcon fontSize="small" />
								</InputAdornment>
							),
						}}
						sx={{
							flex: 1,
							"& .MuiOutlinedInput-root": {
								borderRadius: 2.25,
								bgcolor: alpha(theme.palette.background.default, 0.35),
								"& fieldset": { borderColor: "transparent" }, // no outline
								"&:hover fieldset": { borderColor: "transparent" },
								"&.Mui-focused fieldset": { borderColor: "transparent" },
							},
							"& .MuiInputBase-input": { fontSize: 13 },
						}}
					/>

					<FormControl size="small" sx={{ minWidth: 160 }}>
						<Select
							value={status}
							onChange={(e) => setStatus(e.target.value as any)}
							displayEmpty
							sx={{
								borderRadius: 2.25,
								bgcolor: alpha(theme.palette.background.default, 0.35),
								"& fieldset": { borderColor: "transparent" },
								"&:hover fieldset": { borderColor: "transparent" },
								"&.Mui-focused fieldset": { borderColor: "transparent" },
								"& .MuiSelect-select": { fontSize: 13, py: 1.05 },
							}}
						>
							<MenuItem value="all">Semua Status</MenuItem>
							<MenuItem value="paid">Berhasil</MenuItem>
							<MenuItem value="pending">Pending</MenuItem>
							<MenuItem value="failed">Gagal</MenuItem>
							<MenuItem value="refunded">Refund</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 160 }}>
						<Select
							value={method}
							onChange={(e) => setMethod(e.target.value as any)}
							displayEmpty
							sx={{
								borderRadius: 2.25,
								bgcolor: alpha(theme.palette.background.default, 0.35),
								"& fieldset": { borderColor: "transparent" },
								"&:hover fieldset": { borderColor: "transparent" },
								"&.Mui-focused fieldset": { borderColor: "transparent" },
								"& .MuiSelect-select": { fontSize: 13, py: 1.05 },
							}}
						>
							<MenuItem value="all">Semua Metode</MenuItem>
							<MenuItem value="qris">QRIS</MenuItem>
							<MenuItem value="va_bca">VA BCA</MenuItem>
							<MenuItem value="va_bri">VA BRI</MenuItem>
							<MenuItem value="gopay">GoPay</MenuItem>
							<MenuItem value="manual">Manual</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Surface>

			{/* List */}
			<Surface sx={{ p: 0 }}>
				<Box sx={{ p: 1.5 }}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography sx={{ fontSize: 13, fontWeight: 1000 }}>
							Hasil ({filtered.length.toLocaleString("id-ID")})
						</Typography>
						<Typography sx={{ fontSize: 12, color: "text.secondary" }}>
							Page size: {PAGE_SIZE}
						</Typography>
					</Stack>
				</Box>

				<Divider sx={{ borderColor: alpha(theme.palette.divider, 0.08) }} />

				<Box sx={{ p: 1.5 }}>
					<Stack spacing={1}>
						{loading
							? Array.from({ length: 6 }).map((_, i) => (
									<Box
										key={i}
										sx={{
											p: 1.25,
											borderRadius: 2.5,
											bgcolor: alpha(theme.palette.background.default, 0.35),
										}}
									>
										<Stack direction="row" spacing={1} alignItems="center">
											<Skeleton variant="rounded" width={40} height={40} />
											<Box sx={{ flex: 1 }}>
												<Skeleton width="50%" />
												<Skeleton width="80%" />
											</Box>
											<Skeleton variant="rounded" width={90} height={24} />
										</Stack>
									</Box>
							  ))
							: paginated.map((row) => <TxRowCard key={row.id} row={row} />)}
					</Stack>
				</Box>

				<Box sx={{ px: 1.5, pb: 1.5 }}>
					<Pagination
						count={Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
						page={page}
						onChange={(_, p) => setPage(p)}
						shape="rounded"
						size="small"
						sx={{
							"& .MuiPaginationItem-root": {
								borderRadius: 999,
								fontWeight: 900,
							},
						}}
					/>
				</Box>
			</Surface>
		</Box>
	);
}

function TxRowCard({ row }: { row: TxRow }) {
	const t = useTheme();
	const meta = statusMeta(row.status);

	const toneColor =
		meta.tone === "success"
			? t.palette.success.main
			: meta.tone === "warning"
			? t.palette.warning.main
			: meta.tone === "error"
			? t.palette.error.main
			: t.palette.info.main;

	return (
		<Box
			sx={{
				p: 1.25,
				borderRadius: 2.5,
				bgcolor: alpha(t.palette.background.default, 0.35),
				border: "1px solid",
				borderColor: alpha(t.palette.divider, 0.08), // halus
				transition: "background-color .15s ease",
				"&:hover": { bgcolor: alpha(t.palette.background.default, 0.5) },
			}}
		>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				spacing={1.25}
				alignItems={{ sm: "center" }}
			>
				{/* Left: status + id */}
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					sx={{ minWidth: 0 }}
				>
					<Box
						sx={{
							width: 36,
							height: 36,
							borderRadius: 2.25,
							display: "grid",
							placeItems: "center",
							bgcolor: alpha(toneColor, 0.12),
							color: toneColor,
							flex: "0 0 auto",
						}}
					>
						{meta.icon}
					</Box>

					<Box sx={{ minWidth: 0 }}>
						<Typography sx={{ fontSize: 12.5, fontWeight: 1000 }}>
							{row.id} • {idr(row.amount)}
						</Typography>
						<Typography
							sx={{ fontSize: 12, color: "text.secondary", ...clamp1() }}
						>
							{row.createdAt} • {methodLabel(row.method)} • {row.refCode}
						</Typography>
					</Box>
				</Stack>

				<Box sx={{ flex: 1, minWidth: 0 }} />

				{/* Middle: campaign + donor */}
				<Box sx={{ minWidth: 0, maxWidth: { sm: 520 }, flex: 1 }}>
					<Typography sx={{ fontSize: 12.5, fontWeight: 1000, ...clamp1() }}>
						{row.campaignTitle}
					</Typography>
					<Typography
						sx={{ fontSize: 12, color: "text.secondary", ...clamp1() }}
					>
						By {row.donorName} •{" "}
						<span style={{ fontWeight: 900 }}>{row.campaignId}</span>
					</Typography>
				</Box>

				{/* Right: chips + actions */}
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					sx={{ flex: "0 0 auto" }}
				>
					<Chip
						label={meta.label}
						size="small"
						icon={meta.icon as any}
						sx={{
							height: 26,
							borderRadius: 999,
							fontWeight: 1000,
							bgcolor: alpha(toneColor, 0.12),
							color: toneColor,
							border: "0px solid transparent",
							"& .MuiChip-icon": { color: toneColor },
						}}
					/>

					<Button
						component={Link}
						href={`/admin/campaign/${row.campaignId}`}
						size="small"
						variant="text"
						endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
						sx={{
							borderRadius: 999,
							textTransform: "none",
							fontWeight: 1000,
							px: 1.25,
							bgcolor: alpha(t.palette.action.hover, 0.06),
							"&:hover": { bgcolor: alpha(t.palette.action.hover, 0.12) },
						}}
					>
						Campaign
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}
