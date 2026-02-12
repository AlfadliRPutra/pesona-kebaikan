"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FundraiserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          onClick={() => router.back()}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "white",
            color: "text.primary",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            position: "absolute",
            left: 16,
            top: 24,
            zIndex: 10,
            "&:hover": { bgcolor: "#f8fafc" },
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            width: "100%",
            textAlign: "center",
          }}
        >
          Fundraiser
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            bgcolor: "rgba(11,169,118,0.12)",
            display: "grid",
            placeItems: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: 56 }}>📣</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ayo ikut berkontribusi pada penggalangan dana ini dengan menjadi fundraiser
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2, fontWeight: 800, py: 1.25, mb: 1.5 }}
        >
          Jadi fundraiser
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ fontWeight: 800 }}
        >
          Undang fundraiser
        </Button>
      </Paper>
    </Container>
  );
}
