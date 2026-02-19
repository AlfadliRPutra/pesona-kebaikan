import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const categories = await prisma.campaignCategory.findMany({
			orderBy: { name: "asc" },
			include: {
				options: {
					orderBy: { order: "asc" },
				},
				examples: {
					orderBy: { order: "asc" },
				},
			},
		});
		return NextResponse.json(categories);
	} catch (e: any) {
		return NextResponse.json(
			{ error: e?.message ?? "Failed to fetch campaign categories" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, slug, icon, isActive } = body;

		if (!name) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}

		const finalSlug =
			slug ||
			name
				.toLowerCase()
				.trim()
				.replace(/[^\w\s-]/g, "")
				.replace(/[\s_-]+/g, "_");

		const category = await prisma.campaignCategory.create({
			data: {
				name,
				slug: finalSlug,
				icon,
				isActive: isActive ?? true,
			},
		});

		return NextResponse.json(category);
	} catch (e: any) {
		console.error("Error creating category:", e);
		return NextResponse.json(
			{ error: e?.message ?? "Failed to create category" },
			{ status: 500 },
		);
	}
}

export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { id, name, slug, icon, isActive, options, examples } = body;

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const data: any = {
			name,
			slug,
			icon,
			isActive,
		};

		if (Array.isArray(options)) {
			const normalizedOptions = options.map((o: any, index: number) => ({
				title: String(o.title || "").trim(),
				desc: o.desc ? String(o.desc) : null,
				isActive:
					typeof o.isActive === "boolean"
						? o.isActive
						: typeof o.active === "boolean"
							? o.active
							: true,
				order: typeof o.order === "number" ? o.order : index,
			}));

			data.options = {
				deleteMany: {},
				createMany:
					normalizedOptions.length > 0
						? {
								data: normalizedOptions,
							}
						: undefined,
			};
		}

		if (Array.isArray(examples)) {
			const normalizedExamples = examples.map((e: any, index: number) => ({
				title: String(e.title || "").trim(),
				isActive:
					typeof e.isActive === "boolean"
						? e.isActive
						: typeof e.active === "boolean"
							? e.active
							: true,
				order: typeof e.order === "number" ? e.order : index,
			}));

			data.examples = {
				deleteMany: {},
				createMany:
					normalizedExamples.length > 0
						? {
								data: normalizedExamples,
							}
						: undefined,
			};
		}

		const categoryWithRelations = await prisma.campaignCategory.update({
			where: { id },
			data,
			include: {
				options: {
					orderBy: { order: "asc" },
				},
				examples: {
					orderBy: { order: "asc" },
				},
			},
		});

		return NextResponse.json(categoryWithRelations);
	} catch (e: any) {
		console.error("Error updating category:", e);
		return NextResponse.json(
			{ error: e?.message ?? "Failed to update category" },
			{ status: 500 },
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		// Check if category has campaigns
		const count = await prisma.campaign.count({
			where: { categoryId: id },
		});

		if (count > 0) {
			return NextResponse.json(
				{ error: "Cannot delete category with existing campaigns" },
				{ status: 400 },
			);
		}

		await prisma.campaignCategory.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (e: any) {
		console.error("Error deleting category:", e);
		return NextResponse.json(
			{ error: e?.message ?? "Failed to delete category" },
			{ status: 500 },
		);
	}
}
