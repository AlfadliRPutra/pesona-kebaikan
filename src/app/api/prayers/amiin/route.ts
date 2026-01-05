import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const donationId = body?.donationId as string | undefined;
    if (!donationId) {
      return NextResponse.json(
        { success: false, error: "donationId wajib diisi" },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      select: { id: true },
    });
    if (!donation) {
      return NextResponse.json(
        { success: false, error: "Donasi tidak ditemukan" },
        { status: 404 }
      );
    }

    const updated = await (prisma as any).donation.update({
      where: { id: donationId },
      data: { amiinCount: { increment: 1 } },
      select: { amiinCount: true },
    });

    return NextResponse.json({
      success: true,
      count: updated?.amiinCount ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
