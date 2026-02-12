"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { sendTestWhatsapp } from "@/actions/test-wa";

export default function TestWAPage() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("Halo dari WA Notify");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await sendTestWhatsapp(to, message);
      setResult(response);
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Test WhatsApp API
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Nomor Tujuan (Contoh: 08xxxxxxxxxx)"
              fullWidth
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="081234567890"
            />

            <TextField
              label="Pesan"
              fullWidth
              required
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !to || !message}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </Button>
          </Stack>
        </form>

        {result && (
          <Box sx={{ mt: 3 }}>
            {result.success ? (
              <Alert severity="success">
                Berhasil mengirim pesan!
                <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </Alert>
            ) : (
              <Alert severity="error">
                Gagal mengirim pesan: {result.error}
                {result.details && (
                  <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                )}
              </Alert>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
