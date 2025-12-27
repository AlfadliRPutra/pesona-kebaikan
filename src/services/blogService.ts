import { prisma } from "@/lib/prisma";
import { JSDOM } from "jsdom";
import { BlogMediaType } from "@/generated/prisma/enums";

// Helper to extract media from HTML content
function extractMediaFromContent(content: string) {
  const dom = new JSDOM(content);
  const doc = dom.window.document;
  const media: { type: BlogMediaType; url: string }[] = [];

  // Images
  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      media.push({ type: "image", url: src });
    }
  });

  // Videos (video tag)
  const videos = doc.querySelectorAll("video");
  videos.forEach((video) => {
    const src = video.getAttribute("src");
    if (src) {
      media.push({ type: "video", url: src });
    } else {
        // check sources inside video
        const sources = video.querySelectorAll("source");
        sources.forEach(source => {
            const sourceSrc = source.getAttribute("src");
            if (sourceSrc) media.push({ type: "video", url: sourceSrc });
        });
    }
  });

  // Iframes (YouTube, Vimeo, etc.)
  const iframes = doc.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (src) {
       // Naive check for video providers, or just accept all iframes as 'video' type or 'file' if generic?
       // Enum has: image, video, file.
       // Let's assume iframes are videos for now.
       media.push({ type: "video", url: src });
    }
  });

  return media;
}

export interface CreateBlogData {
  title: string;
  content: string;
  categoryId: string;
  createdById: string;
  heroImage?: string;
}

export interface UpdateBlogData {
  title?: string;
  content?: string;
  categoryId?: string;
  heroImage?: string;
}

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export const blogService = {
  async getBlogs({ page = 1, limit = 10, search, categoryId }: GetBlogsParams) {
    const skip = (page - 1) * limit;
    // Derive type from prisma instance to avoid importing Prisma namespace
    const where: NonNullable<Parameters<typeof prisma.blog.findMany>[0]>["where"] = {};

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.blog.count({ where }),
    ]);

    return {
      data: blogs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getBlogById(id: string) {
    return prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        gallery: true,
      },
    });
  },

  async createBlog(data: CreateBlogData) {
    const { title, content, categoryId, createdById, heroImage } = data;

    // Extract media from content
    const mediaItems = extractMediaFromContent(content);

    return prisma.$transaction(async (tx) => {
      const blog = await tx.blog.create({
        data: {
          title,
          content,
          categoryId,
          createdById,
          heroImage,
        },
      });

      if (mediaItems.length > 0) {
        await tx.blogMedia.createMany({
          data: mediaItems.map((item) => ({
            blogId: blog.id,
            type: item.type,
            url: item.url,
          })),
        });
      }

      return blog;
    });
  },

  async updateBlog(id: string, data: UpdateBlogData) {
    const { title, content, categoryId, heroImage } = data;

    return prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: { id },
        data: {
          title,
          content,
          categoryId,
          heroImage,
        },
      });

      // If content is updated, sync gallery
      if (content) {
        // Delete existing media
        await tx.blogMedia.deleteMany({
          where: { blogId: id },
        });

        // Extract and create new media
        const mediaItems = extractMediaFromContent(content);
        if (mediaItems.length > 0) {
          await tx.blogMedia.createMany({
            data: mediaItems.map((item) => ({
              blogId: blog.id,
              type: item.type,
              url: item.url,
            })),
          });
        }
      }

      return blog;
    });
  },

  async deleteBlog(id: string) {
    return prisma.blog.delete({
      where: { id },
    });
  },
};
