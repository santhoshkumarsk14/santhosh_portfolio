import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
      { name: 'Experience', href: '#experience' },
      { name: 'Contact', href: '#contact' }
    ],
    socialLinks: [
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
      { name: 'GitHub', href: 'https://github.com', icon: <Github className="w-5 h-5" /> },
      { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
      { name: 'Email', href: 'mailto:santhosh@example.com', icon: <Mail className="w-5 h-5" /> }
    ]
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-accent transition-colors inline-block mb-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              SR
            </Link>
            <p className="text-secondary/80 leading-relaxed">
              Transforming data into actionable insights through innovative analytics and AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-secondary/80 hover:text-accent transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {footerLinks.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-accent transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/20 mt-8 pt-8 text-center">
          <p className="text-secondary/60 flex items-center justify-center space-x-2">
            <span>&copy; {currentYear} Santhoshkumar Ravichandran. All rights reserved.</span>
            <span className="text-accent">•</span>
            <span className="flex items-center space-x-1">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>using React</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;