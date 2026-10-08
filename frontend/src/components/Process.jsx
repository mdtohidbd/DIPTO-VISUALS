import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Scissors, MessageSquare, CheckCircle } from 'lucide-react';

const steps = [
  { icon: UploadCloud, title: 'Send Footage', desc: 'Upload your raw camera and drone files via a secure cloud folder.' },
  { icon: Scissors, title: 'I Edit', desc: 'I apply cinematic color grading, sound design, and dynamic pacing.' },
  { icon: MessageSquare, title: 'You Review', desc: 'Review the draft via Frame.io. Revisions are handled quickly.' },
  { icon: CheckCircle, title: 'Final Delivery', desc: 'Receive the final 4K export, ready to upload and generate leads.' }
];

const Process = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-brand-navy-light relative overflow-hidden border-t border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading mb-4">
            Simple, Seamless <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Workflow</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-base">
            No complicated onboarding. Just a streamlined process designed for busy real estate professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connector Line (Desktop only) */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-slate-500/20" />
                )}
                
                <div className="relative w-24 h-24 rounded-full bg-brand-navy border border-[var(--card-border)] flex items-center justify-center mb-6 z-10 group-hover:border-brand-electric/50 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all duration-300">
                  <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-brand-electric text-white text-xs font-bold flex items-center justify-center translate-x-1/4 -translate-y-1/4 border-2 border-brand-navy-light">
                    {index + 1}
                  </div>
                  <Icon className="w-10 h-10 text-brand-heading group-hover:text-brand-electric transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-brand-heading mb-2">{step.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
