import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Mail, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import VariableProximity from './VariableProximity';
import ScrollReveal from './ui/scroll-reveal';

const Contact = () => {
  const [state, handleSubmit] = useForm("mzzegvyk");
  const [formError, setFormError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="contact" className="min-h-screen flex items-center py-20 relative">
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{
            once: true
          }}
        >
          <div className="text-center mb-12">
            <VariableProximity 
              label="Let's Connect"
              fromFontVariationSettings="'wght' 400, 'opsz' 9" 
              toFontVariationSettings="'wght' 800, 'opsz' 40" 
              containerRef={containerRef} 
              radius={150} 
              falloff="exponential" 
              className="variable-proximity-title playfair-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8" 
            />
          </div>
          
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
                    <ScrollReveal
                      textClassName="text-sm font-medium"
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={1}
                      blurStrength={3}
                      delay={0.1}
                    >
                      Name
                    </ScrollReveal>
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
                    <ScrollReveal
                      textClassName="text-sm font-medium"
                      baseOpacity={0}
                      enableBlur={true}
                      baseRotation={1}
                      blurStrength={3}
                      delay={0.2}
                    >
                      Email
                    </ScrollReveal>
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
                  <ScrollReveal
                    textClassName="text-sm font-medium"
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={1}
                    blurStrength={3}
                    delay={0.3}
                  >
                    Message
                  </ScrollReveal>
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

          <ScrollReveal
            className="mt-12 text-center"
            textClassName="text-sm text-muted-foreground"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={1}
            blurStrength={3}
            delay={0.4}
          >
            © {new Date().getFullYear()} Bidit Raj. All rights reserved.
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
