import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConsentButton } from '@/components/ui/consent-button';
import { JobDetails } from '@/components/job/job-details';
import { getJobById } from '@/lib/jobs';

interface JobPageProps {
  params: {
    jobId: string;
  };
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const job = await getJobById(params.jobId);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} | ExecHire`,
    description: job.description,
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await getJobById(params.jobId);

  if (!job) {
    notFound();
  }

  const handleJobApplication = async () => {
    'use server';
    // Handle job application logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <JobDetails job={job} />
      
      <div className="mt-8 max-w-md mx-auto">
        <ConsentButton
          jobTitle={job.title}
          companyName={job.company}
          onConsent={handleJobApplication}
          className="mt-4"
        />
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <h3 className="font-semibold mb-2">Privacy Notice</h3>
        <p>
          Your privacy is important to us. When you apply for this position, 
          we collect and process your personal data in accordance with our 
          privacy policy. This data will only be used for recruitment purposes 
          and will be handled securely and confidentially.
        </p>
      </div>
    </div>
  );
}
