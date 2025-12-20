import React from "react";
import { auth } from "@/auth";
import DashboardClient from "./DashboardClient";

export default async function AdminPage() {
	const session = await auth();

	// ====== DUMMY DATA (ganti dari DB) ======
	const kpi = {
		campaignTotal: 1248,
		campaignDraft: 210,
		campaignReview: 86,
		campaignActive: 712,
		campaignRejected: 34,
		campaignEnded: 206,

		donationToday: 8420000,
		donationMonth: 184200000,
		payoutPending: 12,
		payoutMonth: 74200000,

		usersTotal: 3910,
	};

	// progres alur (contoh: bagian “review queue” diselesaikan)
	const reviewSolvedRate = Math.min(
		100,
		Math.round(
			((kpi.campaignReview ? 42 : 0) / (kpi.campaignReview || 1)) * 100
		)
	);

	const recentQueue = [
		{
			id: "cmp-001",
			title: "Bantu Abi Melawan Kanker Hati",
			meta: "Masuk review • 19 Des 2025",
		},
		{
			id: "cmp-002",
			title: "Bangun Kembali Masjid Terdampak Bencana",
			meta: "Dokumen kurang • 19 Des 2025",
		},
		{
			id: "cmp-007",
			title: "Bantu Biaya Sekolah Anak",
			meta: "Menunggu verifikasi • 18 Des 2025",
		},
	];

	return (
		<DashboardClient
			session={session}
			kpi={kpi}
			reviewSolvedRate={reviewSolvedRate}
			recentQueue={recentQueue}
		/>
	);
}
