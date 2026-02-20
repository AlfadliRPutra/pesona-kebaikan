import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import {
  Role,
  NotificationType,
  VerifiedAs,
  VerificationStatus,
} from "@/generated/prisma";
import { faker } from "@faker-js/faker";

export async function seedUsers() {
  const password = await bcrypt.hash("password123", 10);

  /* ===== USERS ===== */
  const admin = await prisma.user.upsert({
    where: { email: "admin@pesonakebaikan.id" },
    update: { role: Role.ADMIN },
    create: {
      email: "admin@pesonakebaikan.id",
      name: "Super Admin",
      role: Role.ADMIN,
      password,
    },
  });

  await prisma.user.upsert({
    where: { email: "alfadlirputra@gmail.com" },
    update: {},
    create: {
      email: "alfadlirputra@gmail.com",
      name: "Normal User",
      role: Role.USER,
      password,
    },
  });

  // Generate 100 dummy users with addresses
  console.log("Generating 100 dummy users...");

  // Fetch all provinces IDs to distribute users across Indonesia
  const provinces = await prisma.province.findMany({ select: { id: true } });

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    // Pick a random province
    const randomProvince =
      provinces[Math.floor(Math.random() * provinces.length)];

    // Pick a random village in that province
    const village = await prisma.village.findFirst({
      where: { district: { regency: { provinceId: randomProvince.id } } },
      // Skip a random amount to vary within province (limit skip to avoid performance hit, assuming each province has > 0 villages)
      // For simplicity in seed, just take the first one or a random one from top 10
      skip: Math.floor(Math.random() * 10),
      include: {
        district: {
          include: {
            regency: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });

    let addressData = {};
    if (village) {
      addressData = {
        villageId: village.id,
        districtId: village.district.id,
        regencyId: village.district.regency.id,
        provinceId: village.district.regency.province.id,
        address: faker.location.streetAddress(),
      };
    }

    try {
      await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email: email,
          password: password,
          role: Role.USER,
          phone: faker.phone.number(),
          ...addressData,
        },
      });
    } catch {
      // Ignore duplicates
    }
  }

  console.log("Dummy users generation completed.");

  const usersAll = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true },
  });

  if (usersAll.length > 0) {
    const accountsData = usersAll
      .slice(0, Math.min(20, usersAll.length))
      .map((u) => ({
        userId: u.id,
        type: "oauth",
        provider: "google",
        providerAccountId: `google-${u.id}`,
        access_token: faker.string.alphanumeric(32),
        token_type: "Bearer",
        scope: "profile email",
      }));
    await prisma.account.createMany({
      data: accountsData,
      skipDuplicates: true,
    });

    const sessionsData = usersAll
      .slice(0, Math.min(20, usersAll.length))
      .map((u) => ({
        sessionToken: `sess_${faker.string.alphanumeric(24)}`,
        userId: u.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }));
    await prisma.session.createMany({
      data: sessionsData,
      skipDuplicates: true,
    });

    const vtData = usersAll
      .slice(0, Math.min(10, usersAll.length))
      .map((u) => ({
        identifier: u.email,
        token: faker.string.alphanumeric(6),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      }));
    await prisma.verificationToken.createMany({
      data: vtData,
      skipDuplicates: true,
    });

    const authnData = usersAll
      .slice(0, Math.min(5, usersAll.length))
      .map((u) => ({
        credentialID: faker.string.alphanumeric(24),
        userId: u.id,
        providerAccountId: `webauthn-${u.id}`,
        credentialPublicKey: faker.string.alphanumeric(64),
        counter: faker.number.int({ min: 0, max: 100 }),
        credentialDeviceType: "single_device",
        credentialBackedUp: false,
        transports: "internal",
      }));
    await prisma.authenticator.createMany({
      data: authnData,
      skipDuplicates: true,
    });

    const loginCount = await prisma.loginActivity.count();
    if (loginCount === 0) {
      const activities = usersAll
        .slice(0, Math.min(50, usersAll.length))
        .map((u) => ({
          userId: u.id,
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          location: faker.location.city(),
        }));
      await prisma.loginActivity.createMany({ data: activities });
    }

    const postCount = await prisma.post.count();
    if (postCount === 0) {
      const postsData = usersAll
        .slice(0, Math.min(10, usersAll.length))
        .map((u) => ({
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          published: true,
          userId: u.id,
        }));
      await prisma.post.createMany({ data: postsData });
    }

    const notifCount = await prisma.notification.count();
    if (notifCount === 0) {
      const types = [NotificationType.KABAR, NotificationType.PESAN];
      const notifsData = usersAll
        .slice(0, Math.min(50, usersAll.length))
        .map((u) => ({
          title: "Selamat datang",
          message: "Terima kasih telah bergabung.",
          type: types[Math.floor(Math.random() * types.length)],
          userId: u.id,
        }));
      await prisma.notification.createMany({ data: notifsData });
    }

    const otpCount = await prisma.otpRequest.count();
    if (otpCount === 0) {
      const otpsData = usersAll
        .slice(0, Math.min(10, usersAll.length))
        .map((u) => ({
          phone: u.phone || faker.phone.number(),
          otp_hash: faker.string.alphanumeric(32),
          expires_at: new Date(Date.now() + 5 * 60 * 1000),
        }));
      await prisma.otpRequest.createMany({ data: otpsData });
    }

    const verReqCount = await prisma.verificationRequest.count();
    if (verReqCount === 0) {
      const reqsData = usersAll
        .slice(0, Math.min(20, usersAll.length))
        .map((u, idx) => {
          const isOrg = idx % 2 === 1;
          return {
            userId: u.id,
            type: isOrg ? VerifiedAs.organization : VerifiedAs.personal,
            status: VerificationStatus.PENDING,
            ktpNumber: isOrg
              ? undefined
              : faker.number
                  .int({ min: 1000000000000000, max: 9999999999999999 })
                  .toString(),
            ktpName: isOrg ? undefined : u.name || undefined,
            ktpPhotoUrl: isOrg
              ? undefined
              : "https://picsum.photos/600/400?ktp",
            selfieUrl: isOrg
              ? undefined
              : "https://picsum.photos/600/400?selfie",
            organizationName: isOrg ? faker.company.name() : undefined,
            organizationDocUrl: isOrg
              ? "https://picsum.photos/600/400?doc"
              : undefined,
          };
        });
      await prisma.verificationRequest.createMany({ data: reqsData });
    }
  }

  return admin;
}
