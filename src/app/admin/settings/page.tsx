import { auth } from "@/auth";
import { getNotifyKey, updateNotifyKey } from "@/actions/settings";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/auth/login");
  }

  // Fetch existing key (e.g., 'whatsapp_client_id')
  const notifyKey = await getNotifyKey("whatsapp_client_id");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pengaturan Sistem</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Notifikasi WhatsApp</h2>
        <p className="text-sm text-gray-500 mb-6">
          Konfigurasi Client ID untuk layanan notifikasi WhatsApp gateway.
        </p>
        
        <SettingsForm 
          initialKey="whatsapp_client_id"
          initialValue={notifyKey?.value || ""}
          initialName={notifyKey?.name || "WhatsApp Gateway Client ID"}
        />
      </div>
    </div>
  );
}
