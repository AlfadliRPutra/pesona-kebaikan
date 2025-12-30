"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNotifyKey(key: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return null;

  return prisma.notifyKey.findUnique({
    where: { key },
  });
}

export async function updateNotifyKey(key: string, value: string, name?: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.notifyKey.upsert({
      where: { key },
      update: { value, name },
      create: { key, value, name },
    });

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update notify key:", error);
    return { error: "Gagal menyimpan pengaturan" };
  }
}

export async function getNotifyKeys(keys: string[]) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return [];

  return prisma.notifyKey.findMany({
    where: { key: { in: keys } },
  });
}

export async function updateNotifyKeys(settings: { key: string; value: string; name?: string }[]) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.$transaction(
      settings.map((s) =>
        prisma.notifyKey.upsert({
          where: { key: s.key },
          update: { value: s.value, name: s.name },
          create: { key: s.key, value: s.value, name: s.name },
        })
      )
    );

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update notify keys:", error);
    return { error: "Gagal menyimpan pengaturan" };
  }
}
