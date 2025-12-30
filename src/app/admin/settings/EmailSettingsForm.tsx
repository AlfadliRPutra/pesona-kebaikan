"use client";

import { useState } from "react";
import { updateNotifyKeys } from "@/actions/settings";
import { Button, TextField, Alert, CircularProgress, Stack, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface EmailSettingsFormProps {
  initialSettings: {
    email_sender: string;
    email_app_password: string;
    email_verification_subject: string;
    email_verification_content: string;
  };
}

export default function EmailSettingsForm({ initialSettings }: EmailSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (key: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const updates = [
      { key: "email_sender", value: settings.email_sender, name: "Email Sender Address" },
      { key: "email_app_password", value: settings.email_app_password, name: "Email App Password" },
      { key: "email_verification_subject", value: settings.email_verification_subject, name: "Email Verification Subject" },
      { key: "email_verification_content", value: settings.email_verification_content, name: "Email Verification Content Template" },
    ];

    const res = await updateNotifyKeys(updates);

    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: "Pengaturan email berhasil disimpan" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {message && (
          <Alert severity={message.type} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Pengirim (From)"
          variant="outlined"
          value={settings.email_sender}
          onChange={handleChange("email_sender")}
          placeholder="e.g. no-reply@example.com"
          helperText="Alamat email yang akan muncul sebagai pengirim."
          disabled={loading}
        />

        <TextField
          fullWidth
          label="App Password (SMTP)"
          variant="outlined"
          value={settings.email_app_password}
          onChange={handleChange("email_app_password")}
          type="password"
          placeholder="App Password Gmail"
          helperText="Password aplikasi untuk autentikasi SMTP (bukan password login biasa)."
          disabled={loading}
        />

        <TextField
          fullWidth
          label="Subjek Email Verifikasi"
          variant="outlined"
          value={settings.email_verification_subject}
          onChange={handleChange("email_verification_subject")}
          placeholder="e.g. Kode Verifikasi Email - Pesona Kebaikan"
          disabled={loading}
        />

        <TextField
          fullWidth
          label="Template Isi Email (HTML)"
          variant="outlined"
          value={settings.email_verification_content}
          onChange={handleChange("email_verification_content")}
          multiline
          minRows={6}
          placeholder="<div>...</div>"
          helperText="Gunakan {{token}} sebagai placeholder untuk kode OTP."
          disabled={loading}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Pengaturan Email"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
