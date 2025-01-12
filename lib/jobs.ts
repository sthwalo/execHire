import { prisma } from '@/lib/db';

export async function getJob(id: string) {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  return job;
}

export async function getJobs() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return jobs;
}
