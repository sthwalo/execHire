import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="How can we help you?" className="h-32" />
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
            <p className="text-muted-foreground">123 Luxury Lane, London, UK</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+44 (0) 123 456 7890</p>
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