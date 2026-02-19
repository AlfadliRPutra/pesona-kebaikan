import dotenv from "dotenv";
dotenv.config();

import { prisma } from "./src/lib/prisma";

async function main() {
	console.log("Starting reproduction script...");

	// Mock data
	const user = await prisma.user.findFirst();
	if (!user) {
		console.error("No user found to create campaign");
		return;
	}

	const category = await prisma.campaignCategory.findFirst();
	if (!category) {
		console.error("No category found");
		return;
	}

	const metadata = {
		who: "self",
		patientName: "John Doe",
		patientAge: "30",
		patientCity: "Jakarta",
	};

	console.log("Parsed metadata:", metadata);

	// Create campaign with metadata
	const campaign = await prisma.campaign.create({
		data: {
			title: "Test Draft Metadata",
			slug: `test-draft-${Date.now()}`,
			story: "Testing metadata persistence",
			target: 1000000,
			start: new Date(),
			phone: "08123456789",
			categoryId: category.id,
			createdById: user.id,
			status: "DRAFT",
			metadata: metadata,
		},
	});

	console.log("Campaign created with ID:", campaign.id);

	// Verify persistence
	const fetched = await prisma.campaign.findUnique({
		where: { id: campaign.id },
	});

	if (fetched?.metadata) {
		console.log("Fetched metadata:", fetched.metadata);

		// Deep equality check
		const originalJson = JSON.stringify(metadata);
		// We need to be careful about key order, but for this simple object it might be consistent.
		// Better to check specific fields.
		const m = fetched.metadata as any;
		if (m.patientName === "John Doe" && m.patientAge === "30") {
			console.log("SUCCESS: Metadata persisted correctly.");
		} else {
			console.error("FAILURE: Metadata mismatch.");
			console.log("Expected:", metadata);
			console.log("Got:", fetched.metadata);
		}
	} else {
		console.error("FAILURE: Metadata is null/undefined");
	}

	// Clean up
	await prisma.campaign.delete({ where: { id: campaign.id } });
	console.log("Test campaign deleted.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
