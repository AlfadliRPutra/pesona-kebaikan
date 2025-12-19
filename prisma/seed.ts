import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "../src/generated/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
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

  // Create User
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

  // Seed FAQs
  const faqs = [
    {
      question: "Bagaimana cara berdonasi di Pesona Kebaikan?",
      answer: "1. Pilih campaign penggalangan dana yang ingin Anda bantu.\n2. Klik tombol 'Donasi Sekarang'.\n3. Masukkan nominal donasi yang diinginkan.\n4. Pilih metode pembayaran (Transfer Bank, E-Wallet, atau QRIS).\n5. Selesaikan pembayaran sesuai instruksi. Anda akan mendapatkan notifikasi via email/WhatsApp setelah donasi berhasil.",
      category: "Donasi"
    },
    {
      question: "Apa saja metode pembayaran yang tersedia?",
      answer: "Kami menyediakan berbagai metode pembayaran untuk kemudahan Anda:\n\n- Transfer Bank (BCA, Mandiri, BRI, BNI)\n- E-Wallet (GoPay, OVO, DANA, ShopeePay)\n- QRIS (Scan QR Code)\n- Kartu Kredit (Visa/Mastercard)",
      category: "Pembayaran"
    },
    {
      question: "Apakah ada potongan biaya administrasi?",
      answer: "Untuk menjaga keberlangsungan operasional platform dan biaya verifikasi campaign, kami mengenakan biaya administrasi sebesar 5% dari total donasi. \n\nKhusus untuk kategori Zakat dan Bencana Alam, biaya administrasi adalah 0% (Gratis).",
      category: "Biaya"
    },
    {
      question: "Apakah saya perlu mendaftar akun untuk berdonasi?",
      answer: "Tidak, Anda dapat berdonasi sebagai donatur tamu (anonim) tanpa perlu mendaftar. Namun, kami menyarankan Anda untuk mendaftar agar dapat memantau riwayat donasi dan mendapatkan update perkembangan dari campaign yang Anda bantu.",
      category: "Akun"
    },
    {
      question: "Bagaimana jika saya salah mentransfer nominal donasi?",
      answer: "Jangan khawatir. Silakan hubungi tim Customer Success kami melalui WhatsApp atau Email dengan melampirkan bukti transfer. Kami akan membantu memverifikasi dan menyesuaikan donasi Anda secara manual dalam waktu 1x24 jam kerja.",
      category: "Kendala"
    },
    {
      question: "Bagaimana prosedur pencairan dana oleh penggalang dana?",
      answer: "Pencairan dana dilakukan secara transparan dan akuntabel. Penggalang dana harus mengajukan permohonan pencairan dengan melampirkan rencana penggunaan dana dan bukti pendukung. Tim verifikasi kami akan mereview dalam 1-3 hari kerja sebelum dana disalurkan.",
      category: "Pencairan"
    }
  ];

  console.log("Seeding FAQs...");
  for (const faq of faqs) {
    const exists = await prisma.faq.findFirst({
      where: { question: faq.question }
    });
    
    if (!exists) {
      await prisma.faq.create({ data: faq });
    }
  }

  console.log({ admin, user, faqsSeeded: true });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
