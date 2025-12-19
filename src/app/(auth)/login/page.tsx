"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Typography, Paper, Stack, Link as MuiLink, Button, TextField, Alert } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result?.ok) {
        setError("Email atau password salah");
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Terjadi kesalahan saat login");
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
          Masuk ke dashboard admin
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
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
          <Button variant="contained" fullWidth type="submit" disabled={loading}>
            {loading ? "Masuk..." : "Masuk"}
          </Button>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="caption" color="textSecondary">
            Belum punya akun? <MuiLink href="/register">Daftar di sini</MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
