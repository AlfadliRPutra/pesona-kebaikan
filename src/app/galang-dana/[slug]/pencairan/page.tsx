import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import WithdrawalList from "./client";

export default async function PencairanPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const session = await auth();
	if (!session?.user?.id) {
		redirect("/auth/login");
	}

	const { slug } = await params;

	const campaign = await prisma.campaign.findFirst({
		where: {
			OR: [{ slug }, { id: slug }],
		},
		include: {
			donations: {
				where: {
					status: {
						in: ["PAID", "paid", "SETTLED", "COMPLETED", "ACTIVE"],
					},
				},
				select: {
					amount: true,
				},
			},
			withdrawals: {
				orderBy: { createdAt: "desc" },
			},
			updates: {
				orderBy: { createdAt: "desc" },
				include: { media: true },
			},
		},
	});

	if (!campaign) {
		notFound();
	}

	// Verify ownership
	if (
		campaign.createdById !== session.user.id &&
		session.user.role !== "ADMIN"
	) {
		redirect("/galang-dana");
	}

	// Calculate finances
	const collected = campaign.donations.reduce(
		(acc, d) => acc + Number(d.amount),
		0
	);

	const campaignData = {
		id: campaign.id,
		slug: campaign.slug,
		title: campaign.title,
		collected,
	};

	// Convert Decimal to number for Client Component
	const withdrawals = campaign.withdrawals.map((w) => ({
		...w,
		amount: Number(w.amount),
	}));

	const updates = campaign.updates.map((u) => ({
		...u,
		amount: u.amount ? Number(u.amount) : null,
	}));

	return (
		<WithdrawalList
			campaign={campaignData}
			withdrawals={withdrawals}
			updates={updates}
		/>
	);
}
