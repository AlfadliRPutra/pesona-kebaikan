"use client";

import React from "react";
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
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Divider,
	Pagination,
	Tooltip,
	Skeleton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Alert,
} from "@mui/material";
import { alpha, useTheme, SxProps, Theme } from "@mui/material/styles";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

import {
	getWithdrawals,
	getCampaignsWithFunds,
	createWithdrawal,
	updateWithdrawalStatus,
} from "@/actions/pencairan";

const PAGE_SIZE = 10;

type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";

type WithdrawalRow = {
	id: string;
	amount: number;
	status: WithdrawalStatus;
	bankName: string;
	bankAccount: string;
	accountHolder: string;
	createdAt: string;
	campaignTitle: string;
	campaignId: string;
	proofUrl?: string | null;
};

type CampaignFund = {
	id: string;
	title: string;
	collected: number;
	withdrawn: number;
	available: number;
};

function idr(n: number) {
	if (!n) return "Rp0";
	const s = Math.round(n).toString();
	return "Rp" + s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function statusMeta(status: WithdrawalStatus) {
	switch (status) {
		case "COMPLETED":
			return {
				label: "Selesai",
				icon: <CheckCircleRoundedIcon fontSize="small" />,
				tone: "success" as const,
			};
		case "APPROVED":
			return {
				label: "Disetujui",
				icon: <CheckCircleRoundedIcon fontSize="small" />,
				tone: "info" as const,
			};
		case "PENDING":
			return {
				label: "Menunggu",
				icon: <HourglassBottomRoundedIcon fontSize="small" />,
				tone: "warning" as const,
			};
		case "REJECTED":
			return {
				label: "Ditolak",
				icon: <ErrorRoundedIcon fontSize="small" />,
				tone: "error" as const,
			};
	}
}

function Surface({
	children,
	sx,
	...props
}: { children: React.ReactNode; sx?: SxProps<Theme> } & Omit<
	React.ComponentProps<typeof Paper>,
	"sx"
>) {
	const theme = useTheme();
	const baseSx = {
		borderRadius: 3,
		borderColor: alpha(theme.palette.divider, 0.6),
		bgcolor: alpha(
			theme.palette.background.default,
			theme.palette.mode === "dark" ? 0.4 : 0.8
		),
		backdropFilter: "blur(12px)",
		boxShadow: theme.shadows[1],
	};
	const sxProp: SxProps<Theme> = Array.isArray(sx)
		? [baseSx, ...sx]
		: [baseSx, sx];
	return (
		<Paper
			variant="outlined"
			sx={sxProp}
			{...props}
		>
			{children}
		</Paper>
	);
}

function WithdrawalCard({
	row,
	onUpdateStatus,
}: {
	row: WithdrawalRow;
	onUpdateStatus: (id: string, status: Exclude<WithdrawalStatus, "PENDING">) => void;
}) {
	const meta = statusMeta(row.status);

	return (
		<Surface sx={{ p: 2 }}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				spacing={2}
				alignItems={{ xs: "start", sm: "center" }}
			>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: 2.5,
						display: "grid",
						placeItems: "center",
						bgcolor: alpha(
							meta.tone === "success"
								? "#22c55e"
								: meta.tone === "warning"
								? "#f59e0b"
								: meta.tone === "info"
								? "#3b82f6"
								: "#ef4444",
							0.12
						),
						color:
							meta.tone === "success"
								? "#22c55e"
								: meta.tone === "warning"
								? "#f59e0b"
								: meta.tone === "info"
								? "#3b82f6"
								: "#ef4444",
					}}
				>
					{meta.icon}
				</Box>

				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Stack
						direction="row"
						alignItems="center"
						spacing={1}
						flexWrap="wrap"
						sx={{ mb: 0.5 }}
					>
						<Typography sx={{ fontSize: 16, fontWeight: 1000 }}>
							{idr(row.amount)}
						</Typography>
						<Chip
							label={meta.label}
							size="small"
							color={meta.tone}
							sx={{ fontWeight: 800, height: 20 }}
						/>
					</Stack>
					<Typography
						sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}
						noWrap
					>
						{row.campaignTitle}
					</Typography>
					<Typography sx={{ fontSize: 12, color: "text.secondary" }}>
						{row.bankName} • {row.bankAccount} a.n {row.accountHolder}
					</Typography>
					<Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.5 }}>
						{row.createdAt}
					</Typography>
				</Box>

				{row.status === "PENDING" && (
					<Stack direction="row" spacing={1}>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={() => onUpdateStatus(row.id, "REJECTED")}
						>
							Tolak
						</Button>
						<Button
							variant="contained"
							size="small"
							onClick={() => onUpdateStatus(row.id, "APPROVED")}
						>
							Setujui
						</Button>
					</Stack>
				)}
				{row.status === "APPROVED" && (
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={() => onUpdateStatus(row.id, "COMPLETED")}
					>
						Selesai Transfer
					</Button>
				)}
			</Stack>
		</Surface>
	);
}

export default function PencairanPage() {
	const [withdrawals, setWithdrawals] = React.useState<WithdrawalRow[]>([]);
	const [campaigns, setCampaigns] = React.useState<CampaignFund[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [query, setQuery] = React.useState("");
	const [page, setPage] = React.useState(1);
	const [dialogOpen, setDialogOpen] = React.useState(false);

	// Form state
	const [selectedCampaign, setSelectedCampaign] = React.useState<string>("");
	const [amount, setAmount] = React.useState<string>("");
	const [bankName, setBankName] = React.useState("");
	const [bankAccount, setBankAccount] = React.useState("");
	const [accountHolder, setAccountHolder] = React.useState("");
	const [notes, setNotes] = React.useState("");
	const [submitting, setSubmitting] = React.useState(false);

	const fetchData = React.useCallback(async () => {
		setLoading(true);
		try {
			const [w, c] = await Promise.all([
				getWithdrawals(),
				getCampaignsWithFunds(),
			]);
			setWithdrawals(w as any);
			setCampaigns(c);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleCreate = async () => {
		if (
			!selectedCampaign ||
			!amount ||
			!bankName ||
			!bankAccount ||
			!accountHolder
		)
			return;

		setSubmitting(true);
		try {
			await createWithdrawal({
				campaignId: selectedCampaign,
				amount: Number(amount),
				bankName,
				bankAccount,
				accountHolder,
				notes,
			});
			setDialogOpen(false);
			// Reset form
			setSelectedCampaign("");
			setAmount("");
			setBankName("");
			setBankAccount("");
			setAccountHolder("");
			setNotes("");

			fetchData();
		} catch (e) {
			console.error(e);
			alert("Gagal membuat pencairan");
		} finally {
			setSubmitting(false);
		}
	};

	const handleUpdateStatus = async (
		id: string,
		status: Exclude<WithdrawalStatus, "PENDING">
	) => {
		if (!confirm(`Ubah status menjadi ${status}?`)) return;
		try {
			await updateWithdrawalStatus(id, status);
			fetchData();
		} catch (e) {
			console.error(e);
			alert("Gagal update status");
		}
	};

	const filtered = withdrawals.filter((w) => {
		if (!query) return true;
		const s = query.toLowerCase();
		return (
			w.campaignTitle.toLowerCase().includes(s) ||
			w.accountHolder.toLowerCase().includes(s) ||
			w.bankName.toLowerCase().includes(s)
		);
	});

	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

	const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign);

	return (
		<Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "start", sm: "center" }}
				justifyContent="space-between"
				spacing={2}
				sx={{ mb: 4 }}
			>
				<Box>
					<Typography sx={{ fontSize: 24, fontWeight: 1000, mb: 0.5 }}>
						Pencairan Dana
					</Typography>
					<Typography sx={{ color: "text.secondary" }}>
						Kelola penyaluran donasi ke penerima manfaat
					</Typography>
				</Box>
				<Button
					variant="contained"
					startIcon={<AddRoundedIcon />}
					onClick={() => setDialogOpen(true)}
					sx={{ borderRadius: 999, fontWeight: 800, px: 3 }}
				>
					Buat Pencairan
				</Button>
			</Stack>

			<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
				<TextField
					placeholder="Cari pencairan..."
					size="small"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchRoundedIcon fontSize="small" />
							</InputAdornment>
						),
						sx: { borderRadius: 3, bgcolor: "background.paper" },
					}}
					sx={{ flex: 1 }}
				/>
				<Button
					variant="outlined"
					startIcon={<RefreshRoundedIcon />}
					onClick={fetchData}
					sx={{ borderRadius: 3 }}
				>
					Refresh
				</Button>
			</Stack>

			{loading ? (
				<Stack spacing={2}>
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} height={100} variant="rounded" />
					))}
				</Stack>
			) : (
				<Stack spacing={2}>
					{paginated.map((row) => (
						<WithdrawalCard
							key={row.id}
							row={row}
							onUpdateStatus={handleUpdateStatus}
						/>
					))}
					{paginated.length === 0 && (
						<Surface sx={{ p: 4, textAlign: "center" }}>
							<Typography sx={{ color: "text.secondary" }}>
								Belum ada data pencairan
							</Typography>
						</Surface>
					)}
				</Stack>
			)}

			{totalPages > 1 && (
				<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, p) => setPage(p)}
						color="primary"
						shape="rounded"
					/>
				</Box>
			)}

			{/* Create Dialog */}
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				maxWidth="sm"
				fullWidth
				PaperProps={{ sx: { borderRadius: 3 } }}
			>
				<DialogTitle>Buat Pencairan Baru</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={3} sx={{ pt: 1 }}>
						<FormControl fullWidth size="small">
							<InputLabel>Pilih Campaign</InputLabel>
							<Select
								value={selectedCampaign}
								label="Pilih Campaign"
								onChange={(e) => setSelectedCampaign(e.target.value)}
							>
								{campaigns.map((c) => (
									<MenuItem key={c.id} value={c.id}>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Typography variant="body2" fontWeight={600}>
												{c.title}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												Tersedia: {idr(c.available)}
											</Typography>
										</Box>
									</MenuItem>
								))}
							</Select>
						</FormControl>

						{selectedCampaignData && (
							<Surface sx={{ p: 2, bgcolor: alpha("#000", 0.02) }}>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="body2">Dana Terkumpul</Typography>
									<Typography variant="body2" fontWeight={700}>
										{idr(selectedCampaignData.collected)}
									</Typography>
								</Stack>
								<Stack
									direction="row"
									justifyContent="space-between"
									sx={{ mt: 1 }}
								>
									<Typography variant="body2">Sudah Dicairkan</Typography>
									<Typography
										variant="body2"
										fontWeight={700}
										color="error.main"
									>
										- {idr(selectedCampaignData.withdrawn)}
									</Typography>
								</Stack>
								<Divider sx={{ my: 1 }} />
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="body2" fontWeight={700}>
										Tersedia
									</Typography>
									<Typography
										variant="body2"
										fontWeight={900}
										color="success.main"
									>
										{idr(selectedCampaignData.available)}
									</Typography>
								</Stack>
							</Surface>
						)}

						<TextField
							label="Jumlah Pencairan"
							type="number"
							fullWidth
							size="small"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">Rp</InputAdornment>
								),
							}}
							error={
								selectedCampaignData
									? Number(amount) > selectedCampaignData.available
									: false
							}
							helperText={
								selectedCampaignData &&
								Number(amount) > selectedCampaignData.available
									? "Melebihi dana tersedia"
									: ""
							}
						/>

						<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
							Informasi Rekening Tujuan
						</Typography>

						<Box
							sx={{
								display: "grid",
								gap: 2,
								gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
							}}
						>
							<Box>
								<TextField
									label="Nama Bank"
									fullWidth
									size="small"
									value={bankName}
									onChange={(e) => setBankName(e.target.value)}
									placeholder="Contoh: BCA"
								/>
							</Box>
							<Box>
								<TextField
									label="Nomor Rekening"
									fullWidth
									size="small"
									value={bankAccount}
									onChange={(e) => setBankAccount(e.target.value)}
								/>
							</Box>
							<Box sx={{ gridColumn: "1 / -1" }}>
								<TextField
									label="Nama Pemilik Rekening"
									fullWidth
									size="small"
									value={accountHolder}
									onChange={(e) => setAccountHolder(e.target.value)}
								/>
							</Box>
						</Box>

						<TextField
							label="Catatan / Keterangan"
							fullWidth
							multiline
							rows={3}
							size="small"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ p: 2.5 }}>
					<Button
						onClick={() => setDialogOpen(false)}
						sx={{ borderRadius: 999 }}
					>
						Batal
					</Button>
					<Button
						variant="contained"
						onClick={handleCreate}
						disabled={
							submitting ||
							!selectedCampaign ||
							!amount ||
							!bankName ||
							!bankAccount ||
							!accountHolder ||
							(selectedCampaignData
								? Number(amount) > selectedCampaignData.available
								: false)
						}
						sx={{ borderRadius: 999, px: 3 }}
					>
						{submitting ? "Memproses..." : "Buat Pencairan"}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
