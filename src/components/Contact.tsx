
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, MapPin, Phone, Instagram, Github, Linkedin, Twitter } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    subject: '',
  });
  const [formspreeState, handleSubmit] = useForm("mzzegvyk");
  const [animationStarted, setAnimationStarted] = useState(false);

  // Start animation when section comes into view
  if (isInView && !animationStarted) {
    controls.start('visible');
    setAnimationStarted(true);
  }

  // Handle form success and redirect
  useEffect(() => {
    if (formspreeState.succeeded) {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form state
      setFormState({
        name: '',
        subject: '',
      });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [formspreeState.succeeded, toast, navigate]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: 'Email',
      value: 'biditraj@gmail.com',
      link: 'mailto:biditraj@gmail.com',
    },
    {
      icon: <MapPin className="h-5 w-5 text-secondary" />,
      title: 'Location',
      value: 'New Delhi, India',
    },
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: 'Phone',
      value: '+(91) 9337718826',
      link: 'tel:+919337718826',
    },
  ];

  // Social media links
  const socialMedia = [
    {
      icon: <Instagram className="w-5 h-5" />,
      title: 'Instagram',
      url: 'https://www.instagram.com/shutup.bidit?igsh=MmRtajA4ZTR1ZnI=',
      ariaLabel: 'Instagram Profile'
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: 'GitHub',
      url: 'https://github.com/biditraj',
      ariaLabel: 'GitHub Profile'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/biditraj/',
      ariaLabel: 'LinkedIn Profile'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      title: 'Twitter',
      url: 'https://twitter.com/biditraj',
      ariaLabel: 'Twitter Profile'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="scroll-section pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-32">
        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="text-center mb-16"
        >
          <span className="tag">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? 
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            custom={1}
          >
            <div className="glass-card p-8" id="contact-form">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={formspreeState.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    ></textarea>
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={formspreeState.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    disabled={formspreeState.submitting}
                  >
                    {formspreeState.submitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            custom={2}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 glass-card rounded-full mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-full hover:bg-white/10 transition-all duration-300"
                      aria-label={social.ariaLabel}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 mt-12">
              <p className="text-lg">
                "The details are not the details. They make the design."
              </p>
              <p className="text-right text-sm mt-2 text-muted-foreground">
                — Charles Eames
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
