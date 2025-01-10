import { Mail, Phone, MapPin, MessageSquare, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const phoneNumber = '+27733366385';
  
  const createWhatsAppLink = () => {
    const message = encodeURIComponent(
      'Hello, I would like to inquire about booking a vehicle.'
    );
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
  };

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get in touch with us for bookings and inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold">Quick Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+27 (0) 73 336 6385</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">info@execuhire.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">
                    Copperleaf Estate<br />
                    Morfontaine Street<br />
                    Centurion<br />
                    South Africa
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Copperleaf+Estate+Morfontaine+Street+Centurion+South+Africa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold">Book via WhatsApp</h2>
            <p className="text-muted-foreground">
              For the fastest response and instant booking, reach out to us on WhatsApp. Our team is ready to assist you 24/7.
            </p>
            <a 
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.5436243241087!2d28.2447693!3d-25.8187697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956608a8b1b6a7%3A0x47b4c0e2c5719485!2sCopperleaf%20Golf%20Estate!5e0!3m2!1sen!2sza!4v1704883678654!5m2!1sen!2sza"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="ExecuHire Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}