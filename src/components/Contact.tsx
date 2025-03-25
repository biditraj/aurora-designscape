import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mzzegvyk");
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("There was an error sending your message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-black/5 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Let's Connect</h2>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a 
              href="https://github.com/biditraj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-background/5 hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/shutup.bidit?igsh=MmRtajA4ZTR1ZnI=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-background/5 hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="mailto:biditraj@gmail.com" 
              className="p-3 bg-background/5 hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          
          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 rounded-lg p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-foreground/80">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <Button 
                className="mt-6 btn-primary"
                onClick={() => window.location.reload()}
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <div className="bg-background/10 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg">
              <form 
                onSubmit={handleFormSubmit} 
                action="https://formspree.io/f/mzzegvyk"
                method="POST"
                className="space-y-6 relative z-20"
              >
                {formError && (
                  <div className="bg-red-500/10 p-4 rounded-md text-red-500 text-sm">
                    {formError}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="w-full !bg-background/20 border border-white/10 focus:border-primary/50 focus:!ring-1 focus:!ring-primary/50"
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-sm text-red-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email" 
                      name="email"
                      placeholder="Your email"
                      required
                      className="w-full !bg-background/20 border border-white/10 focus:border-primary/50 focus:!ring-1 focus:!ring-primary/50"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="What would you like to talk about?"
                    required
                    className="min-h-32 w-full !bg-background/20 border border-white/10 focus:border-primary/50 focus:!ring-1 focus:!ring-primary/50"
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-sm text-red-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full btn-primary relative z-20"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          )}

          <div className="mt-12 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bidit Raj. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
