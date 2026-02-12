"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createFundraiser, checkFundraiserSlug } from "@/actions/fundraiser";

export default function CreateFundraiserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [target, setTarget] = React.useState<number>(0);
  const [slug, setSlug] = React.useState("");
  const [slugChecking, setSlugChecking] = React.useState(false);
  const [slugAvailable, setSlugAvailable] = React.useState<boolean | null>(
    null
  );
  const [slugNormalized, setSlugNormalized] = React.useState("");
  const slugCheckRef = React.useRef<NodeJS.Timeout | null>(null);
  const [createdSlug, setCreatedSlug] = React.useState<string | null>(null);
  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    type: "success" | "error";
  }>({
    open: false,
    msg: "",
    type: "success",
  });

  const router = useRouter();

  const localSlugify = (v: string) =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleSlugChange = async (val: string) => {
    setSlug(val);
    setSlugAvailable(null);
    setSlugNormalized("");
    if (slugCheckRef.current) {
      clearTimeout(slugCheckRef.current);
    }
    if (!val.trim()) {
      return;
    }
    slugCheckRef.current = setTimeout(async () => {
      setSlugChecking(true);
      const res = await checkFundraiserSlug(val);
      setSlugChecking(false);
      if (res.success) {
        setSlugAvailable(res.available);
        setSlugNormalized(res.slug);
      } else {
        setSlugAvailable(false);
      }
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { slug } = await params;
      const res = await createFundraiser({
        campaignSlug: slug,
        title: title.trim(),
        target: Number(target || 0),
        slug: slugNormalized || "",
      });
      if (!res.success) {
        setSnack({
          open: true,
          msg: res.error || "Gagal membuat fundraiser",
          type: "error",
        });
      } else {
        setSnack({
          open: true,
          msg: "Fundraiser berhasil dibuat",
          type: "success",
        });
        setCreatedSlug(res.data.slug);
      }
    } catch (err) {
      setSnack({ open: true, msg: "Gagal membuat fundraiser", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const previewUrl =
    createdSlug && (process.env.NEXT_PUBLIC_APP_URL || "")
      ? `${process.env.NEXT_PUBLIC_APP_URL}/donasi/fundraiser/${createdSlug}`
      : createdSlug
      ? `/donasi/fundraiser/${createdSlug}`
      : "";

  return (
    <>
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
            Buat Fundraiser
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              label="Judul Fundraiser"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Slug Kustom"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="contoh: bantu-siwa-rt-03"
              fullWidth
              helperText={
                slug
                  ? slugChecking
                    ? "Memeriksa ketersediaan slug…"
                    : slugAvailable === true
                    ? `Slug tersedia: ${slugNormalized}`
                    : slugAvailable === false
                    ? `Slug tidak tersedia: ${slugNormalized}`
                    : ""
                  : "Kosongkan jika ingin otomatis dari judul"
              }
              color={
                slugAvailable === true
                  ? "success"
                  : slugAvailable === false
                  ? "error"
                  : "primary"
              }
            />
            {(() => {
              const liveSlug = slug.trim()
                ? slugNormalized || localSlugify(slug)
                : title.trim()
                ? localSlugify(title)
                : "";
              const base = process.env.NEXT_PUBLIC_APP_URL || "";
              const liveUrl = liveSlug
                ? base
                  ? `${base}/donasi/fundraiser/${liveSlug}`
                  : `/donasi/fundraiser/${liveSlug}`
                : "";
              return liveUrl ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: "1px solid #e2e8f0",
                    borderRadius: 2,
                    p: 1.25,
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: 14,
                      color: "#334155",
                      wordBreak: "break-all",
                    }}
                  >
                    {liveUrl}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigator.clipboard.writeText(liveUrl);
                      setSnack({
                        open: true,
                        msg: "Tautan disalin",
                        type: "success",
                      });
                    }}
                  >
                    Salin
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      window.open(liveUrl, "_blank");
                    }}
                  >
                    Buka
                  </Button>
                </Box>
              ) : null;
            })()}
            <TextField
              label="Target Dana (Rp)"
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              required
              fullWidth
              inputProps={{ min: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                loading ||
                !title.trim() ||
                Number(target) <= 0 ||
                (!!slug.trim() && slugAvailable === false)
              }
              sx={{ borderRadius: 2, fontWeight: 800, py: 1.25 }}
            >
              {loading ? "Membuat..." : "Buat Fundraiser"}
            </Button>
          </Box>
        </Paper>
        {createdSlug && (
          <Paper elevation={0} sx={{ p: 3, mt: 2, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={800}>
              Link Fundraiser
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                p: 1.25,
                mt: 1.5,
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 14,
                  color: "#334155",
                  wordBreak: "break-all",
                }}
              >
                {previewUrl}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(previewUrl);
                  setSnack({
                    open: true,
                    msg: "Tautan disalin",
                    type: "success",
                  });
                }}
              >
                Salin
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  window.open(previewUrl, "_blank");
                }}
              >
                Buka
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <MuiAlert
          severity={snack.type}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.msg}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
