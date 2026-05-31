import {
  PrismaClient,
  UserRole,
  SettingType,
} from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers() {
  const defaultPassword =
    process.env.DEFAULT_ADMIN_PASSWORD ||
    'Admin@123';

  const password =
    await bcrypt.hash(
      defaultPassword,
      10,
    );

  await prisma.user.upsert({
    where: {
      username: 'sysadmin',
    },
    update: {},
    create: {
      username: 'sysadmin',
      email: 'sysadmin@coreitbox.local',
      fullName: 'System Administrator',
      password,
      role: UserRole.SYSADMIN,
    },
  });

  await prisma.user.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@coreitbox.local',
      fullName: 'Administrator',
      password,
      role: UserRole.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: {
      username: 'teknisi',
    },
    update: {},
    create: {
      username: 'teknisi',
      email: 'teknisi@coreitbox.local',
      fullName: 'Default Technician',
      password,
      role: UserRole.TEKNISI,
    },
  });

  console.log(
    '✅ Default users seeded',
  );
}

async function seedCategories() {
  const categories = [
    {
      name: 'Email',
      description:
        'Email dan akun',
    },
    {
      name: 'Network',
      description:
        'Jaringan dan internet',
    },
    {
      name: 'Hardware',
      description:
        'PC, Laptop, Printer',
    },
    {
      name: 'Software',
      description:
        'Aplikasi dan sistem',
    },
  ];

  for (const item of categories) {
    await prisma.ticketCategory.upsert({
      where: {
        name: item.name,
      },
      update: {},
      create: item,
    });
  }

  console.log(
    '✅ Categories seeded',
  );
}

async function seedSettings() {
  const settings = [
    {
      key: 'company_name',
      value: 'CoreITBox',
      type: SettingType.COMPANY,
      description:
        'Nama perusahaan',
    },
    {
      key: 'company_email',
      value:
        'helpdesk@coreitbox.local',
      type: SettingType.COMPANY,
      description:
        'Email perusahaan',
    },
    {
      key: 'company_phone',
      value:
        '+62 812 3456 7890',
      type: SettingType.COMPANY,
      description:
        'Telepon perusahaan',
    },
    {
      key: 'ticket_prefix',
      value: 'TCK',
      type: SettingType.SYSTEM,
      description:
        'Prefix ticket',
    },
    {
      key: 'auto_close_days',
      value: '7',
      type: SettingType.SYSTEM,
      description:
        'Auto close ticket',
    },
    {
      key: 'max_upload_size',
      value: '10',
      type: SettingType.SYSTEM,
      description:
        'Max upload MB',
    },
    {
      key: 'default_theme',
      value: 'dark',
      type: SettingType.UI,
      description:
        'Default theme',
    },
  ];

  for (const item of settings) {
    await prisma.setting.upsert({
      where: {
        key: item.key,
      },
      update: {
        value: item.value,
        description:
          item.description,
      },
      create: item,
    });
  }

  console.log(
    '✅ Settings seeded',
  );
}

async function main() {
  console.log(
    '🚀 Starting CoreITBox seed...',
  );

  await seedUsers();

  await seedCategories();

  await seedSettings();

  const defaultPassword =
    process.env.DEFAULT_ADMIN_PASSWORD ||
    'Admin@123';

  console.log(`
=========================================
 CoreITBox Initial Accounts
=========================================

 SYSADMIN
 username : sysadmin
 password : ${defaultPassword}

 ADMIN
 username : admin
 password : ${defaultPassword}

 TEKNISI
 username : teknisi
 password : ${defaultPassword}

=========================================
`);

  console.log(
    '✅ CoreITBox seed completed',
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });