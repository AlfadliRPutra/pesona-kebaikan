"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getAdminTransactions() {
	try {
		const session = await auth();
		if (!session?.user || session.user.role !== "ADMIN") {
			// Uncomment this in production to enforce admin access
			// return { success: false, error: "Unauthorized" };
		}

		const donations = await prisma.donation.findMany({
			include: {
				campaign: {
					select: {
						title: true,
					},
				},
				user: {
					select: {
						name: true,
						email: true,
						phone: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const mappedDonations = donations.map((d) => {
			let method = "manual";
			if (d.paymentMethod === "EWALLET") method = "gopay"; // Default mapping
			else if (d.paymentMethod === "VIRTUAL_ACCOUNT") method = "va_bca";
			else if (d.paymentMethod === "TRANSFER") method = "manual";
			else if (d.paymentMethod === "CARD") method = "qris"; // Approx mapping

			let status = "paid";
			if (d.status === "FAILED" || d.status === "Gagal") status = "failed";
			else if (d.status === "REFUNDED") status = "refunded";
			// Dev mode: Treat PENDING as PAID

			return {
				id: d.id,
				createdAt: d.createdAt.toLocaleString("id-ID", {
					day: "numeric",
					month: "short",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				}),
				campaignId: d.campaignId,
				campaignTitle: d.campaign.title,
				donorName: d.donorName,
				donorPhone: d.donorPhone || "-",
				donorEmail: d.user?.email || "-", // Keep for backward compat or display logic
				message: d.message || "-",
				isAnonymous: d.isAnonymous,
				amount: Number(d.amount),
				method: method,
				status: status,
				refCode: d.id.substring(0, 8).toUpperCase(), // Use first 8 chars of ID as ref
				account: d.user
					? {
							name: d.user.name || "No Name",
							email: d.user.email,
							phone: d.user.phone || "-",
					  }
					: null,
			};
		});

		return { success: true, data: mappedDonations };
	} catch (error) {
		console.error("Error fetching admin transactions:", error);
		return { success: false, error: "Gagal mengambil data transaksi" };
	}
}

export async function getCampaignTransactions(campaignId: string) {
	try {
		const session = await auth();
		if (!session?.user || session.user.role !== "ADMIN") {
			// Uncomment this in production to enforce admin access
			// return { success: false, error: "Unauthorized" };
		}

		const donations = await prisma.donation.findMany({
			where: { campaignId },
			include: {
				campaign: {
					select: {
						title: true,
					},
				},
				user: {
					select: {
						name: true,
						email: true,
						phone: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const mappedDonations = donations.map((d) => {
			let method = "manual";
			if (d.paymentMethod === "EWALLET") method = "gopay";
			else if (d.paymentMethod === "VIRTUAL_ACCOUNT") method = "va_bca";
			else if (d.paymentMethod === "TRANSFER") method = "manual";
			else if (d.paymentMethod === "CARD") method = "qris";

			let status = "paid";
			if (d.status === "FAILED" || d.status === "Gagal") status = "failed";
			else if (d.status === "REFUNDED") status = "refunded";

			return {
				id: d.id,
				createdAt: d.createdAt.toLocaleString("id-ID", {
					day: "numeric",
					month: "short",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				}),
				campaignId: d.campaignId,
				campaignTitle: d.campaign.title,
				donorName: d.donorName,
				donorPhone: d.donorPhone || "-",
				donorEmail: d.user?.email || "-",
				message: d.message || "-",
				isAnonymous: d.isAnonymous,
				amount: Number(d.amount),
				method: method,
				status: status,
				refCode: d.id.substring(0, 8).toUpperCase(),
				account: d.user
					? {
							name: d.user.name || "No Name",
							email: d.user.email,
							phone: d.user.phone || "-",
					  }
					: null,
			};
		});

		return { success: true, data: mappedDonations };
	} catch (error) {
		console.error("Error fetching campaign transactions:", error);
		return { success: false, error: "Gagal mengambil data transaksi campaign" };
	}
}
