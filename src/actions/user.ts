'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { Role } from '@/generated/prisma';

export async function getUsers(query?: string, role?: string, page: number = 1, limit: number = 10) {
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { email: { contains: query, mode: 'insensitive' } },
      { phone: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (role && role !== 'all') {
    where.role = role.toUpperCase() as Role;
  }

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          image: true,
          emailVerified: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function createUser(data: any) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        role: data.role as Role,
        password: hashedPassword,
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Email or phone already exists' };
    }
    return { success: false, error: 'Failed to create user' };
  }
}

export async function updateUser(id: string, data: any) {
  try {
    const updateData: any = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      role: data.role as Role,
    };

    // Only update password if provided
    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Email or phone already exists' };
    }
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function verifyUser(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        emailVerified: new Date(),
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error verifying user:', error);
    return { success: false, error: 'Failed to verify user' };
  }
}

export async function resetPassword(userId: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error: 'Failed to reset password' };
  }
}

export async function getUserStats() {
    try {
        const [total, admins, users] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: 'ADMIN' } }),
            prisma.user.count({ where: { role: 'USER' } }),
        ]);
        
        // Mocking "active" vs "inactive" since we don't have that status field yet, 
        // maybe check loginActivity later? For now, assume all are active.
        
        return { total, admins, users };
    } catch (error) {
        return { total: 0, admins: 0, users: 0 };
    }
}
