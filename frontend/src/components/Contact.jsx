import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Clock, Phone } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // null, 'sending', 'success', 'error'
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'santhosh14.ravichandran@gmail.com',
      link: 'mailto:santhosh14.ravichandran@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 93447 33869',
      link: 'tel:+919344733869'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Trichy, Tamil Nadu, India',
      link: null
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/santhoshkumar-ravichandran', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/santhoshkumarsk14', icon: '💻' }
  ];

  return (
    <section ref={contactRef} id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Ready to transform your data into actionable insights? Let's discuss your project and how I can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-primary font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-primary font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-primary font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none bg-background"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-accent hover:bg-blue-600 disabled:bg-secondary text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="flex items-center space-x-2 text-success bg-success/10 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again later.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-8">
              {/* Contact Details */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-accent mt-1">{info.icon}</div>
                      <div>
                        <p className="text-primary font-medium">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-secondary hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-secondary">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-background p-6 rounded-xl border">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-success" />
                  <span className="text-primary font-medium">Available for Projects</span>
                </div>
                <p className="text-secondary text-sm">
                  Currently accepting new data analytics and dashboard development projects.
                  Response time: 24-48 hours.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;