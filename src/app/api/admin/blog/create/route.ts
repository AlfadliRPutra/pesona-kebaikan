import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JSDOM } from "jsdom";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, categoryId, headerImage, content, createdById } = body;

    // Validasi
    if (!title || !categoryId || !headerImage || !content || !createdById) {
      return NextResponse.json({ success: false, error: "Semua field wajib diisi" }, { status: 400 });
    }

    // Parse gallery dari konten (ambil semua <img> dan <iframe>)
    const dom = new JSDOM(content);
    const imgs = Array.from(dom.window.document.querySelectorAll("img"))
      .map((img) => {
        const el = img as HTMLImageElement;
        return {
          type: "image" as const,
          url: el.getAttribute("src")?.replace(/^\//, "") || "",
        };
      })
      .filter((m) => m.url);
    const iframes = Array.from(dom.window.document.querySelectorAll("iframe"))
      .map((el) => {
        const iframe = el as HTMLIFrameElement;
        return {
          type: "video" as const,
          url: iframe.getAttribute("src") || "",
        };
      })
      .filter((m) => m.url);

    const gallery: { type: "image" | "video"; url: string }[] = [...imgs, ...iframes];

    // Simpan Blog
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        // Perbaikan: headerImage harus diisi lewat 'headerImage' field jika ada di model,
        // Jika tidak ada di model, hapus baris ini!
        // Jika field di model Blog adalah 'headerImage', biarkan.
        // Jika field di model Blog adalah 'image' atau lain, ganti sesuai schema.
        headerImage, // <-- pastikan field ini ada di schema.prisma Blog!
        category: { connect: { id: categoryId } },
        createdBy: { connect: { id: createdById } },
        gallery: {
          create: gallery.map((m) => ({
            type: m.type,
            url: m.url,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, id: blog.id });
  } catch (e: any) {
    // Jika error: Unknown argument `headerImage`, berarti field di schema Blog bukan 'headerImage'
    // Solusi: cek dan pastikan di schema.prisma model Blog ada:
    // headerImage String?
    return NextResponse.json({ success: false, error: e.message || "Terjadi kesalahan" }, { status: 500 });
  }
}
