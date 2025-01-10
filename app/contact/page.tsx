'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function Contact() {
  const searchParams = useSearchParams();
  const selectedCar = searchParams.get('car');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <form className="space-y-6">
            {selectedCar && (
              <div className="p-4 bg-muted rounded-lg mb-6">
                <h3 className="font-medium mb-2">Selected Vehicle</h3>
                <p className="text-primary">{selectedCar}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Time</label>
                <Select onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time">
                      {time ? time : <span className="flex items-center"><Clock className="mr-2 h-4 w-4" />Select time</span>}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea 
                placeholder="How can we help you?" 
                className="h-32"
                defaultValue={selectedCar ? `I'm interested in hiring the ${selectedCar}.` : ''}
              />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions about our services? Our team is here to help.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">Copperleaf Estate, Morfontaine Street, Centurion, South Africa</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+27 (0) 73 336 6385</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">info@execuhire.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}