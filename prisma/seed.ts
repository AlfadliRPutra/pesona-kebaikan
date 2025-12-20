import "dotenv/config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role, BlogMediaType } from "@/generated/prisma/enums";

async function upsertPageContent(params: { key: string; title: string; content: string; data?: any }) {
  return prisma.pageContent.upsert({
    where: { key: params.key },
    update: {
      title: params.title,
      content: params.content,
      data: params.data ?? undefined,
    },
    create: {
      key: params.key,
      title: params.title,
      content: params.content,
      data: params.data ?? undefined,
    },
  });
}

async function upsertBlogCategory(name: string) {
  return prisma.blogCategory.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function ensureBlogByTitle(params: {
  title: string;
  content: string;
  categoryId?: string | null;
  createdById: string;
  gallery?: Array<{
    type: BlogMediaType;
    url: string;
    isThumbnail?: boolean;
  }>;
}) {
  const existing = await prisma.blog.findFirst({
    where: { title: params.title, createdById: params.createdById },
    include: { gallery: true },
  });

  if (existing) return existing;

  return prisma.blog.create({
    data: {
      title: params.title,
      content: params.content,
      categoryId: params.categoryId ?? null,
      createdById: params.createdById,
      gallery: params.gallery?.length
        ? {
            create: params.gallery.map((m) => ({
              type: m.type,
              url: m.url,
              isThumbnail: m.isThumbnail ?? false,
            })),
          }
        : undefined,
    },
  });
}

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // ============
  // USERS
  // ============
  const admin = await prisma.user.upsert({
    where: { email: "admin@pesonakebaikan.id" },
    update: { role: Role.ADMIN },
    create: {
      email: "admin@pesonakebaikan.id",
      name: "Super Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@pesonakebaikan.id" },
    update: { role: Role.USER },
    create: {
      email: "user@pesonakebaikan.id",
      name: "Normal User",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  // ============
  // FAQs
  // ============
  const faqs = [
    {
      question: "Bagaimana cara berdonasi di Pesona Kebaikan?",
      answer:
        "1. Pilih campaign penggalangan dana yang ingin Anda bantu.\n2. Klik tombol 'Donasi Sekarang'.\n3. Masukkan nominal donasi yang diinginkan.\n4. Pilih metode pembayaran (Transfer Bank, E-Wallet, atau QRIS).\n5. Selesaikan pembayaran sesuai instruksi. Anda akan mendapatkan notifikasi via email/WhatsApp setelah donasi berhasil.",
      category: "Donasi",
    },
    {
      question: "Apa saja metode pembayaran yang tersedia?",
      answer:
        "Kami menyediakan berbagai metode pembayaran untuk kemudahan Anda:\n\n- Transfer Bank (BCA, Mandiri, BRI, BNI)\n- E-Wallet (GoPay, OVO, DANA, ShopeePay)\n- QRIS (Scan QR Code)\n- Kartu Kredit (Visa/Mastercard)",
      category: "Pembayaran",
    },
    {
      question: "Apakah ada potongan biaya administrasi?",
      answer:
        "Untuk menjaga keberlangsungan operasional platform dan biaya verifikasi campaign, kami mengenakan biaya administrasi sebesar 5% dari total donasi.\n\nKhusus untuk kategori Zakat dan Bencana Alam, biaya administrasi adalah 0% (Gratis).",
      category: "Biaya",
    },
    {
      question: "Apakah saya perlu mendaftar akun untuk berdonasi?",
      answer:
        "Tidak, Anda dapat berdonasi sebagai donatur tamu (anonim) tanpa perlu mendaftar. Namun, kami menyarankan Anda untuk mendaftar agar dapat memantau riwayat donasi dan mendapatkan update perkembangan dari campaign yang Anda bantu.",
      category: "Akun",
    },
    {
      question: "Bagaimana jika saya salah mentransfer nominal donasi?",
      answer:
        "Jangan khawatir. Silakan hubungi tim Customer Success kami melalui WhatsApp atau Email dengan melampirkan bukti transfer. Kami akan membantu memverifikasi dan menyesuaikan donasi Anda secara manual dalam waktu 1x24 jam kerja.",
      category: "Kendala",
    },
    {
      question: "Bagaimana prosedur pencairan dana oleh penggalang dana?",
      answer:
        "Pencairan dana dilakukan secara transparan dan akuntabel. Penggalang dana harus mengajukan permohonan pencairan dengan melampirkan rencana penggunaan dana dan bukti pendukung. Tim verifikasi kami akan mereview dalam 1-3 hari kerja sebelum dana disalurkan.",
      category: "Pencairan",
    },
  ];

  console.log("Seeding FAQs...");
  for (const faq of faqs) {
    const exists = await prisma.faq.findFirst({
      where: { question: faq.question },
    });

    if (!exists) {
      await prisma.faq.create({ data: faq });
    }
  }

  // ============
  // PAGE CONTENT (idempotent via unique key)
  // ============
  console.log("Seeding PageContent...");
  await upsertPageContent({
    key: "about",
    title: "Tentang Pesona Kebaikan",
    content:
      "Pesona Kebaikan adalah platform donasi yang membantu mempertemukan donatur dengan campaign yang terverifikasi.\n\nKami fokus pada transparansi, kemudahan berdonasi, dan pelaporan penggunaan dana.",
    data: {
      banner: "",
      highlight: ["Verifikasi penggalang dana", "Transparansi & laporan", "Kemudahan pembayaran"],
    },
  });

  await upsertPageContent({
    key: "terms",
    title: "Syarat & Ketentuan",
    content:
      "Dengan menggunakan layanan Pesona Kebaikan, Anda menyetujui syarat & ketentuan yang berlaku.\n\n1) Donasi bersifat sukarela.\n2) Penggalang dana wajib melengkapi dokumen verifikasi.\n3) Platform dapat melakukan peninjauan dan pembatasan pada campaign yang melanggar kebijakan.",
    data: { lastUpdated: new Date().toISOString() },
  });

  await upsertPageContent({
    key: "privacy",
    title: "Kebijakan Privasi",
    content:
      "Kami menghargai privasi Anda. Data pribadi digunakan untuk keperluan layanan, keamanan akun, dan komunikasi terkait donasi.\n\nKami tidak menjual data pengguna kepada pihak ketiga.",
    data: { lastUpdated: new Date().toISOString() },
  });

  await upsertPageContent({
    key: "accountability",
    title: "Akuntabilitas",
    content:
      "Kami mendorong pelaporan berkala dari penggalang dana dan menyediakan kanal pengaduan.\n\nSetiap pencairan dana dapat ditinjau dan diverifikasi sesuai kebijakan platform.",
    data: {
      contact: {
        email: "support@pesonakebaikan.id",
        whatsapp: "",
      },
    },
  });

  // ============
  // BLOG CATEGORY + SAMPLE BLOG
  // ============
  console.log("Seeding BlogCategory...");
  const catEdukasi = await upsertBlogCategory("Edukasi");
  const catUpdate = await upsertBlogCategory("Update");
  const catKisah = await upsertBlogCategory("Kisah Baik");

  console.log("Seeding Blogs...");
  await ensureBlogByTitle({
    title: "Kenapa Transparansi Itu Penting Dalam Donasi",
    content:
      "Transparansi adalah fondasi kepercayaan.\n\nDi Pesona Kebaikan, kami mendorong pelaporan, dokumentasi penggunaan dana, serta update berkala agar donatur merasa tenang dan yakin.",
    categoryId: catEdukasi.id,
    createdById: admin.id,
    gallery: [
      {
        type: BlogMediaType.image,
        url: "https://picsum.photos/1200/800?random=11",
        isThumbnail: true,
      },
      {
        type: BlogMediaType.image,
        url: "https://picsum.photos/1200/800?random=12",
      },
    ],
  });

  await ensureBlogByTitle({
    title: "Update Platform: Fitur Riwayat Donasi & Notifikasi",
    content:
      "Kami menambahkan riwayat donasi dan notifikasi agar donatur bisa memantau kontribusinya dengan lebih mudah.\n\nSelanjutnya kami akan mengembangkan fitur laporan pencairan dan progress campaign yang lebih detail.",
    categoryId: catUpdate.id,
    createdById: admin.id,
    gallery: [
      {
        type: BlogMediaType.image,
        url: "https://picsum.photos/1200/800?random=21",
        isThumbnail: true,
      },
    ],
  });

  await ensureBlogByTitle({
    title: "Kisah Baik: Donasi Kecil, Dampak Besar",
    content:
      "Terkadang, donasi kecil yang konsisten punya dampak luar biasa.\n\nTerima kasih sudah menjadi bagian dari kebaikan yang terus berjalan.",
    categoryId: catKisah.id,
    createdById: admin.id,
    gallery: [
      {
        type: BlogMediaType.image,
        url: "https://picsum.photos/1200/800?random=31",
        isThumbnail: true,
      },
    ],
  });

  console.log("✅ Seed selesai:", {
    adminEmail: admin.email,
    userEmail: user.email,
    seededFaqs: faqs.length,
    seededPageContent: 4,
    seededCategories: 3,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
