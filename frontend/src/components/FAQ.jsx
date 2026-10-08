import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "What is your turnaround time?",
    answer: "Standard listing videos (under 2 minutes) are delivered within 48 hours. Premium cinematic videos and large projects typically take 3-5 days. If you need a rush delivery (24h), it can be arranged for an additional fee."
  },
  {
    question: "How do I send you the raw footage?",
    answer: "Once we agree to work together, I will provide you with a secure, dedicated Google Drive or Dropbox link. You can easily upload your camera files, drone footage, and any specific logos or assets directly from your phone or computer."
  },
  {
    question: "How many revisions do I get?",
    answer: "Every package includes at least 1 round of revisions. You will receive a link via Frame.io where you can leave timestamped comments directly on the video. Additional revision rounds are available if needed, though most clients approve the first or second draft!"
  },
  {
    question: "Do you provide the music and sound effects?",
    answer: "Yes! All packages include fully licensed, high-quality music and sound design. You won't have to worry about copyright strikes on YouTube or Instagram."
  },
  {
    question: "Can you edit vertical videos for Instagram Reels and TikTok?",
    answer: "Absolutely. I specialize in high-retention vertical edits for social media. Many agents book a combo package that includes a widescreen YouTube video and 2-3 vertical cutdowns for Reels."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

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
            <MessageCircleQuestion className="w-3.5 h-3.5" /> Client Questions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4"
          >
            Frequently Asked <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
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
