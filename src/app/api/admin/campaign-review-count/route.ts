import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const count = await prisma.campaign.count({
			where: { status: "PENDING" },
		});

		return NextResponse.json({ count });
	} catch (error) {
		console.error("Campaign review count error:", error);
		return NextResponse.json({ count: 0 }, { status: 500 });
	}
}

