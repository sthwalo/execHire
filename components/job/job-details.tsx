'use client';

import { Job } from '@prisma/client';
import { ConsentButton } from '@/components/ui/consent-button';

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground">{job.description}</p>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <ul className="list-disc list-inside space-y-1">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Location</h2>
        <p>{job.location}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Salary</h2>
        <p>{job.salary}</p>
      </div>
      <ConsentButton onConsent={() => console.log('User consented')} />
    </div>
  );
}
