import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.blogCategory.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ categories });
  } catch (e: any) {
    return NextResponse.json({ categories: [], error: e.message || "Terjadi kesalahan" }, { status: 500 });
  }
}
