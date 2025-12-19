"use client";

import { auth } from "@/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Paper, Stack, Link as MuiLink, Button, TextField, Alert } from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registrasi gagal");
      }

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
        py: 2,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 1 }}>
          Pesona Kebaikan
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Daftar akun admin
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField name="name" label="Nama" fullWidth size="small" value={formData.name} onChange={handleChange} />
          <TextField name="email" label="Email" type="email" fullWidth size="small" required value={formData.email} onChange={handleChange} />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            size="small"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            label="Konfirmasi Password"
            type="password"
            fullWidth
            size="small"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="contained" fullWidth type="submit" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar"}
          </Button>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="caption" color="textSecondary">
            Sudah punya akun? <MuiLink href="/login">Masuk di sini</MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
