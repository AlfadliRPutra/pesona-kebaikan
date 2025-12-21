"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCampaignsWithFunds() {
	const campaigns = await prisma.campaign.findMany({
		where: {
			status: "ACTIVE",
		},
		include: {
			donations: {
				where: {
					status: {
						in: ["PAID", "paid", "SETTLED", "COMPLETED", "ACTIVE"], // Added COMPLETED as it is used in seed
					},
				},
				select: {
					amount: true,
				},
			},
			withdrawals: {
				where: {
					status: {
						in: ["PENDING", "APPROVED", "COMPLETED"],
					},
				},
				select: {
					amount: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return campaigns.map((c) => {
		const collected = c.donations.reduce(
			(acc, curr) => acc + Number(curr.amount),
			0
		);
		const withdrawn = c.withdrawals.reduce(
			(acc, curr) => acc + Number(curr.amount),
			0
		);
		return {
			id: c.id,
			title: c.title,
			collected,
			withdrawn,
			available: collected - withdrawn,
		};
	});
}

export async function getWithdrawals() {
	const withdrawals = await prisma.withdrawal.findMany({
		include: {
			campaign: {
				select: {
					title: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return withdrawals.map((w) => ({
		id: w.id,
		amount: Number(w.amount),
		status: w.status,
		bankName: w.bankName,
		bankAccount: w.bankAccount,
		accountHolder: w.accountHolder,
		createdAt: w.createdAt.toLocaleString("id-ID", {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}),
		campaignTitle: w.campaign.title,
		campaignId: w.campaignId,
		proofUrl: w.proofUrl,
	}));
}

export async function createWithdrawal(data: {
	campaignId: string;
	amount: number;
	bankName: string;
	bankAccount: string;
	accountHolder: string;
	notes?: string;
}) {
	await prisma.withdrawal.create({
		data: {
			campaignId: data.campaignId,
			amount: data.amount,
			bankName: data.bankName,
			bankAccount: data.bankAccount,
			accountHolder: data.accountHolder,
			notes: data.notes,
			status: "PENDING",
		},
	});

	revalidatePath("/admin/pencairan");
}

export async function updateWithdrawalStatus(
	id: string,
	status: "APPROVED" | "REJECTED" | "COMPLETED",
	proofUrl?: string
) {
	await prisma.withdrawal.update({
		where: { id },
		data: {
			status,
			proofUrl,
		},
	});

	revalidatePath("/admin/pencairan");
}
