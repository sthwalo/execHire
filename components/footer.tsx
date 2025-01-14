import { Car, Instagram, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">ExecuHire</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Experience luxury and sophistication with our premium car hire service.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/fleet" className="text-sm text-muted-foreground hover:text-primary">Our Fleet</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Copperleaf Estate</li>
              <li>Morfontaine Street</li>
              <li>Centurion</li>
              <li>South Africa</li>
              <li>+27 (0)73 336 6385 </li>
              <li>info@execuhire.com</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 9am - 6pm</li>
              <li>Saturday: 10am - 4pm</li>
              <li>Sunday: By Appointment</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/27733366385?text=${encodeURIComponent('Hello, I would like to inquire about booking a vehicle.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@execuhire?_t=ZM-8swb42mNWGU&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/execuhire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Global Hope Consortium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}