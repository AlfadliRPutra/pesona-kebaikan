import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker";

function pickRandom<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function makeSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.concat("-", faker.string.alphanumeric(6).toLowerCase());
}

export async function seedFundraisers() {
	const users = await prisma.user.findMany({ select: { id: true, name: true } });
	if (users.length === 0) {
		console.warn("No users found. Skipping fundraiser seeding.");
		return;
	}

	const campaigns = await prisma.campaign.findMany({
		select: { id: true, title: true, target: true },
		where: { status: "ACTIVE" },
	});
	if (campaigns.length === 0) {
		console.warn("No campaigns found. Skipping fundraiser seeding.");
		return;
	}

	for (const c of campaigns) {
		const count = faker.number.int({ min: 1, max: 3 });
		for (let i = 0; i < count; i++) {
			const owner = pickRandom(users);
			const title = `Fundraiser untuk ${c.title} - ${faker.person.fullName()}`;
			const slug = makeSlug(title);
			const target = Math.max(
				100_000,
				Math.floor(Number(c.target) * faker.number.float({ min: 0.1, max: 0.4 }))
			);

			try {
				await prisma.fundraiser.upsert({
					where: { slug },
					update: {},
					create: {
						title,
						slug,
						target,
						campaignId: c.id,
						createdById: owner.id,
					},
				});
			} catch {
				// Ignore duplicates
			}
		}
	}

	console.log("Seeded fundraisers for active campaigns.");

	const faCount = await prisma.fundraiserAmiin.count();
	if (faCount === 0) {
		const fundraisers = await prisma.fundraiser.findMany({
			select: { id: true },
			orderBy: { createdAt: "desc" },
			take: 100,
		});
		const amiinsData = fundraisers.flatMap((f) => {
			const n = faker.number.int({ min: 1, max: 5 });
			return Array.from({ length: n }).map(() => ({
				fundraiserId: f.id,
				userId: pickRandom(users).id,
				ipAddress: faker.internet.ip(),
			}));
		});
		if (amiinsData.length) {
			await prisma.fundraiserAmiin.createMany({
				data: amiinsData,
				skipDuplicates: true,
			});
		}
	}
}
