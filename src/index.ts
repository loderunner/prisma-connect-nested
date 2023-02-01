import { PrismaClient } from '@prisma/client';

async function connectWithId(prisma: PrismaClient) {
  console.log();
  console.log('///////////////////////////');
  console.log('// connectWithId');
  console.log('///////////////////////////');
  console.log();

  await prisma.user.deleteMany({});

  const user = await prisma.user.create({
    data: {
      username: 'toto',
    },
  });
  console.log(`user created: ${user.id}`);

  const post = await prisma.post.create({
    data: {
      title: 'Hello World!',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  console.log(`post created: ${post.id}`);

  const img1 = await prisma.image.create({
    data: {
      filename: 'image1.jpg',
      post: {
        connect: {
          id: post.id,
        },
      },
    },
  });
  console.log(`image 1 created: ${img1.id}`);

  const img2 = await prisma.image.create({
    data: {
      filename: 'image2.jpg',
      post: {
        connect: {
          title: 'Hello World!',
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    },
  });
  console.log(`image 2 created: ${img2.id}`);
}

async function connectWithUnique(prisma: PrismaClient) {
  console.log();
  console.log('///////////////////////////');
  console.log('// connectWithUnique');
  console.log('///////////////////////////');
  console.log();

  await prisma.user.deleteMany({});

  const user = await prisma.user.create({
    data: {
      username: 'toto',
    },
  });
  console.log(`user created: ${user.id}`);

  const post = await prisma.post.create({
    data: {
      title: 'Hello World!',
      user: {
        connect: {
          username: 'toto',
        },
      },
    },
  });
  console.log(`post created: ${post.id}`);

  const img1 = await prisma.image.create({
    data: {
      filename: 'image1.jpg',
      post: {
        connect: {
          title: 'Hello World!',
        },
      },
    },
  });
  console.log(`image 1 created: ${img1.id}`);

  const img2 = await prisma.image.create({
    data: {
      filename: 'image2.jpg',
      post: {
        connect: {
          title: 'Hello World!',
          user: {
            connect: {
              username: 'toto',
            },
          },
        },
      },
    },
  });
  console.log(`image 2 created: ${img2.id}`);
}

(async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  try {
    await connectWithId(prisma);
  } catch (err) {
    console.log(err);
  }

  try {
    await connectWithUnique(prisma);
  } catch (err) {
    console.log(err);
  }

  await prisma.$disconnect();
})();
