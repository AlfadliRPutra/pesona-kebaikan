"use server";

import { prisma } from "@/lib/prisma";

export async function sendTestWhatsapp(to: string, message: string) {
  try {
    // 1. Ambil clientId dari database
    const notifyKey = await prisma.notifyKey.findUnique({
      where: { key: "whatsapp_client_id" },
    });

    if (!notifyKey || !notifyKey.value) {
      return { 
        success: false, 
        error: "Client ID WhatsApp belum dikonfigurasi di pengaturan." 
      };
    }

    const clientId = notifyKey.value;
    const url = `https://wanotify.depatidigital.com/public/wa/v1/${clientId}/send`;
    const secret = "f26e0cd1dfc11fa22b245461c00cf2f9b4882fdb78eee102d5c5a2fb570557b4";

    // 2. Kirim request ke API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Secret-Key": secret, // Opsi 1: Lewat Header
      },
      body: JSON.stringify({
        to: to,
        message: message,
        priority: "high",
        secret: secret, // Opsi 2: Lewat Body (sesuai instruksi, bisa salah satu atau keduanya)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || "Gagal mengirim pesan WhatsApp",
        details: data 
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Error sending WhatsApp:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Terjadi kesalahan internal" 
    };
  }
}
