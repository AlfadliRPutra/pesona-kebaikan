"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BlogCard, { BlogItem } from "@/components/admin/BlogCard";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import ArticleIcon from "@mui/icons-material/Article";
import Fade from "@mui/material/Fade";

const categories = ["Umum", "Tips", "Kisah", "Berita"];

export default function AdminBlogPage() {
  const [items, setItems] = React.useState<BlogItem[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Judul Blog ${i + 1}`,
      excerpt: "Ini adalah ringkasan singkat konten blog untuk contoh tampilan kartu.",
      image: "/defaultimg.webp",
      category: categories[i % categories.length],
      date: `2024-0${(i % 9) + 1}-1${i % 9}`,
      author: `Author ${i + 1}`,
    }))
  );

  const router = useRouter();

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 6,
          px: 3,
          py: 2,
          borderRadius: 2,
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          color: "#fff",
          boxShadow: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ArticleIcon sx={{ fontSize: 36 }} />
          <Typography variant="h5" className="font-bold" sx={{ color: "#fff" }}>
            Daftar Blog
          </Typography>
          <Typography variant="body2" sx={{ ml: 2, color: "#e3f2fd" }}>
            {items.length} blog tersedia
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          sx={{
            background: "#fff",
            color: "#1976d2",
            fontWeight: "bold",
            "&:hover": { background: "#e3f2fd" },
            boxShadow: 1,
          }}
          onClick={() => router.push("/admin/blog/create")}
        >
          Tulis Blog
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ px: 2 }}>
        {items.map((b, idx) => (
          <Fade in timeout={400 + idx * 80} key={b.id}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.03)",
                    boxShadow: 4,
                  },
                }}
              >
                <BlogCard data={b} />
              </Box>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
}
