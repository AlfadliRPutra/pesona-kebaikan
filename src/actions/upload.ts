"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  return uploadFile(formData);
}

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Sanitize filename to remove special characters but keep extension
    const ext = file.name.split(".").pop();
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-");
    const filename = `${cleanName}-${uniqueSuffix}.${ext}`;
    
    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);
    
    const url = `/uploads/${filename}`;
    
    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Upload failed" };
  }
}
