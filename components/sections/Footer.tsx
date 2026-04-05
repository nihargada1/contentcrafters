export default function Footer() {
  return (
    <footer className="py-16 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Content Crafters
            </h3>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-sm">
              Crafting unforgettable experiences through premium content creation
              and event management. Let us bring your vision to life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Work", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase() === "contact" ? "inquiry" : link.toLowerCase()}`}
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex flex-col gap-3">
              {["Instagram", "Facebook", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} Content Crafters. All rights
            reserved.
          </p>
          <p className="text-sm text-foreground/30">
            Designed with care & intention
          </p>
        </div>
      </div>
    </footer>
  );
}
