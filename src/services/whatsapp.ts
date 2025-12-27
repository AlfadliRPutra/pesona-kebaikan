import { prisma } from "@/lib/prisma";

const WA_NOTIFY_API = "https://wanotify.depatidigital.com/public/wa/v1";
// Note: In a real app, this should be an env var, but using the provided secret for now
const WA_SECRET = "f26e0cd1dfc11fa22b245461c00cf2f9b4882fdb78eee102d5c5a2fb570557b4";

export async function sendWhatsAppMessage(to: string, message: string) {
  try {
    const notifyKey = await prisma.notifyKey.findUnique({
      where: { key: "whatsapp_client_id" },
    });

    if (!notifyKey || !notifyKey.value) {
      throw new Error("WhatsApp Client ID belum dikonfigurasi.");
    }

    const clientId = notifyKey.value;
    const url = `${WA_NOTIFY_API}/${clientId}/send`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Secret-Key": WA_SECRET,
      },
      body: JSON.stringify({
        to,
        message,
        priority: "high",
        secret: WA_SECRET,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengirim pesan WhatsApp");
    }

    return { success: true, data };
  } catch (error) {
    console.error("WhatsApp Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" };
  }
}
