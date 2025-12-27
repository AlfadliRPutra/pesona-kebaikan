import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JSDOM } from "jsdom";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, categoryId, headerImage, content } = body;

    /* ======================
       HARDCODE USER (AMAN BUAT DEV)
       GANTI NANTI KALO AUTH SUDAH ADA
    ====================== */
    const user = await prisma.user.findFirst({
      where: { role: "ADMIN" }, // atau email tertentu
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User tidak ditemukan" },
        { status: 400 }
      );
    }

    /* ======================
       VALIDASI
    ====================== */
    if (!title || !categoryId || !content) {
      return NextResponse.json(
        { success: false, error: "Field wajib diisi" },
        { status: 400 }
      );
    }

    /* ======================
       PARSE GALLERY
    ====================== */
    const dom = new JSDOM(content);

    const images = Array.from(dom.window.document.querySelectorAll("img")).map(
      (img) => ({
        type: "image" as const,
        url: (img as HTMLImageElement).getAttribute("src") || "",
      })
    );

    const videos = Array.from(
      dom.window.document.querySelectorAll("iframe")
    ).map((iframe) => ({
      type: "video" as const,
      url: (iframe as HTMLIFrameElement).getAttribute("src") || "",
    }));

    const gallery = [...images, ...videos].filter((m) => m.url);

    /* ======================
       CREATE BLOG
    ====================== */
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        headerImage: headerImage || null,
        category: { connect: { id: categoryId } },
        createdBy: { connect: { id: user.id } }, // ✅ FIX ERROR
        gallery: gallery.length
          ? {
              create: gallery.map((m) => ({
                type: m.type,
                url: m.url,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json({ success: true, data: blog });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
