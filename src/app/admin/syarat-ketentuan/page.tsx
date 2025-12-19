"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import DescriptionIcon from "@mui/icons-material/Description";

export default function AdminSyaratPage() {
  return (
    <ContentEditor
      contentKey="terms"
      title="Syarat & Ketentuan"
      subtitle="Kelola konten halaman Syarat & Ketentuan"
      icon={<DescriptionIcon />}
    />
  );
}
