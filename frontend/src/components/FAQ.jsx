import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useSiteConfig, DEFAULT_FAQS } from '../context/SiteConfigContext';

const FAQ = () => {
  const { config } = useSiteConfig();
  const [openIndex, setOpenIndex] = useState(0);

  const faqsList = Array.isArray(config.faqs) && config.faqs.length > 0
    ? config.faqs
    : DEFAULT_FAQS;

  return (
    <section id="faq" className="py-20 md:py-28 bg-brand-navy border-t border-[var(--card-border)] relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" /> {config.faqBadge || 'Client Inquiries'}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4"
          >
            {config.faqTitle || 'Frequently Asked'}{' '}
            <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
              {config.faqGradient || 'Questions'}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-brand-muted max-w-xl mx-auto text-base"
          >
            {config.faqSubtitle || 'Clear answers to common questions about our delivery pipeline, licensing, and workflow.'}
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqsList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'bg-brand-navy-light border-brand-electric/50 shadow-[0_10px_30px_rgba(0,102,255,0.1)]' : 'bg-brand-navy-light/40 border-[var(--card-border)] hover:border-brand-electric/40'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                >
                  <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-brand-electric' : 'text-brand-heading group-hover:text-brand-electric'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-brand-electric' : 'text-brand-muted'}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 md:px-6 pb-6 text-brand-muted text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
