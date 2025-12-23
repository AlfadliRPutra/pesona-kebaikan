"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), { ssr: false });

const categories = ["Umum", "Tips", "Kisah", "Berita"];

export default function CreateBlogPage() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    title: "",
    category: "",
    headerImage: "",
    content: "",
  });
  const [toast, setToast] = React.useState<{ open: boolean; msg: string; severity?: "success" | "error" }>({ open: false, msg: "" });
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});
  const [preview, setPreview] = React.useState<string | null>(null);
  const [headerDragActive, setHeaderDragActive] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>(["Umum", "Tips", "Kisah", "Berita"]);
  const [loadingCategories, setLoadingCategories] = React.useState(false);

  // Simulasi upload gambar header + preview
  const handleHeaderImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Simulasi validasi ukuran, seharusnya dicek di backend
    const fakePath = `uploads/blog/${file.name}`;
    setForm({ ...form, headerImage: fakePath });
    // Preview lokal
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop handler for header image
  const handleHeaderDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHeaderDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const fakePath = `uploads/blog/${file.name}`;
      setForm({ ...form, headerImage: fakePath });
      // Preview lokal
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!form.category) newErrors.category = "Kategori wajib diisi";
    if (!form.headerImage) newErrors.headerImage = "Gambar header wajib diisi";
    if (!form.content.trim()) newErrors.content = "Konten wajib diisi";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setToast({ open: true, msg: "Lengkapi semua field!", severity: "error" });
      return;
    }

    try {
      const catRes = await fetch("/api/admin/blog/category-list");
      if (!catRes.ok) throw new Error("Gagal mengambil kategori");
      const catData = await catRes.json();
      const categoryObj = catData.categories.find((c: any) => c.name === form.category);
      if (!categoryObj) {
        setToast({ open: true, msg: "Kategori tidak valid", severity: "error" });
        return;
      }
      const createdById = "ADMIN_ID"; // TODO: ganti dengan id user login

      const res = await fetch("/api/admin/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          categoryId: categoryObj.id,
          headerImage: form.headerImage,
          content: form.content,
          createdById,
        }),
      });

      // CEK: response harus JSON, jika bukan, tampilkan error
      let data: any = null;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Terjadi kesalahan pada server (bukan JSON)");
      }

      if (!data.success) throw new Error(data.error || "Gagal membuat blog");
      setToast({ open: true, msg: "Blog berhasil dibuat", severity: "success" });
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1200);
    } catch (e: any) {
      setToast({ open: true, msg: e.message || "Gagal membuat blog", severity: "error" });
    }
  };

  // FIX: Hindari closure stale state pada setForm di onChange editor
  // Ganti:
  // <RichTextEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
  // Menjadi:
  const handleContentChange = React.useCallback((v: string) => setForm((f) => ({ ...f, content: v })), []);

  React.useEffect(() => {
    setLoadingCategories(true);
    fetch("/api/admin/blog/category-list")
      .then(async (res) => {
        if (!res.ok) throw new Error("Gagal mengambil kategori");
        const data = await res.json();
        setCategories(data.categories.map((c: any) => c.name));
      })
      .catch(() => {
        setToast({ open: true, msg: "Gagal mengambil kategori", severity: "error" });
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h5" className="font-bold mb-4">
        Tulis Blog Baru
      </Typography>
      <Box className="space-y-4">
        <TextField
          label="Judul"
          fullWidth
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          select
          label="Kategori"
          fullWidth
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          error={!!errors.category}
          helperText={errors.category}
          disabled={loadingCategories}
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        {/* Header Image Upload with Drag & Drop */}
        <div>
          <div className="text-sm font-semibold mb-2">Gambar Header (1200x600)</div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setHeaderDragActive(true);
            }}
            onDragLeave={() => setHeaderDragActive(false)}
            onDrop={handleHeaderDrop}
            style={{
              border: headerDragActive ? "2px dashed #1976d2" : "2px dashed #ccc",
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              background: headerDragActive ? "#e3f2fd" : "#fafafa",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input type="file" accept="image/*" onChange={handleHeaderImage} style={{ display: "none" }} id="header-upload" />
            <label htmlFor="header-upload" style={{ cursor: "pointer" }}>
              {headerDragActive ? "Drop gambar di sini..." : "Klik atau drag gambar ke sini"}
            </label>
          </div>
          {errors.headerImage && (
            <Typography variant="caption" color="error" sx={{ display: "block", mb: 1 }}>
              {errors.headerImage}
            </Typography>
          )}
          {preview || form.headerImage ? (
            <Card sx={{ maxWidth: 320, mb: 1 }}>
              <CardMedia component="img" height="150" image={preview || `/${form.headerImage}`} alt="Header Preview" sx={{ objectFit: "cover" }} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {form.headerImage}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Belum ada gambar header
            </Typography>
          )}
        </div>
        {/* Info gallery */}
        <div>
          <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
            Gambar/video yang diupload lewat editor di bawah otomatis masuk gallery (database) dan tampil full width di blog.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Untuk menambah gambar/video ke gallery, gunakan fitur upload/insert gambar/video pada editor di bawah.
          </Typography>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Konten</div>
          <RichTextEditor value={form.content} onChange={handleContentChange} />
          {errors.content && (
            <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
              {errors.content}
            </Typography>
          )}
        </div>
        <DialogActions>
          <Button onClick={() => router.push("/admin/blog")}>Batal</Button>
          <Button variant="contained" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity || "success"} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
