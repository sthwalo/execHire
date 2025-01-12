'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ConsentButtonProps {
  onConsent: () => void;
  jobTitle: string;
  companyName?: string;
  className?: string;
}

export function ConsentButton({
  onConsent,
  jobTitle,
  companyName = '',
  className = '',
}: ConsentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  const handleConsent = () => {
    if (hasConsented) {
      setIsOpen(false);
      onConsent();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`w-full ${className}`}
        variant="default"
      >
        Apply for this position
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Consent Required</DialogTitle>
            <DialogDescription>
              Before applying for the {jobTitle} position{companyName && ` at ${companyName}`}, 
              please review and accept our terms.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={hasConsented}
                onCheckedChange={(checked) => setHasConsented(checked as boolean)}
              />
              <Label
                htmlFor="consent"
                className="text-sm leading-relaxed"
              >
                I consent to ExecHire processing my personal data for the purpose of job application 
                and recruitment. I understand that my data will be handled in accordance with the 
                privacy policy and applicable data protection laws.
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConsent}
              disabled={!hasConsented}
            >
              Continue Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
