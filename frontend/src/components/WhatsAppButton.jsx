import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../context/SiteConfigContext';

const WhatsAppButton = () => {
    const { config } = useSiteConfig();
    const [isHovered, setIsHovered] = useState(false);
    const rawNumber = (config.whatsapp || '01791315443').replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('0') ? '88' + rawNumber : (rawNumber.startsWith('88') ? rawNumber : '880' + rawNumber);
    const whatsappLink = `https://wa.me/${cleanNumber}?text=Hi%20Dipto,%20I'm%20interested%20in%20your%20video%20editing%20services!`;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999]">
            <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center group"
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: -10, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            className="hidden sm:block absolute right-full mr-2 whitespace-nowrap bg-black/85 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/20 shadow-xl"
                        >
                            Chat on WhatsApp
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] cursor-pointer border-2 border-white/20"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
                    >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.6 69.1 26.9 106.2 26.9 122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157.1zM223.9 446.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.4-29.4-28.1-63.3-28.1-98.2 0-104.8 85.2-190 190-190 50.8 0 98.5 19.8 134.4 55.7 35.9 35.8 55.7 83.5 55.7 134.4 0 104.8-85.2 190-190 190zm105.1-143c-5.8-2.9-34.1-16.8-39.4-18.7-5.3-1.9-9.2-2.9-13.1 2.9-3.9 5.8-15 18.7-18.4 22.6-3.4 3.9-6.8 4.4-12.6 1.4-5.8-2.9-24.4-9-46.5-28.7-17.2-15.3-28.8-34.1-32.1-39.8-3.4-5.8-.4-8.9 2.6-11.8 2.7-2.6 5.8-6.8 8.7-10.2 2.9-3.4 3.9-5.8 5.8-9.7 1.9-3.9 1-7.3-.5-10.2-1.5-2.9-13.1-31.5-17.9-43.2-4.7-11.4-9.4-9.8-13.1-10-3.3-.2-7.2-.2-11.1-.2s-10.2 1.5-15.5 7.3c-5.3 5.8-20.4 19.9-20.4 48.5s20.8 56.3 23.7 60.2c2.9 3.9 41 62.5 99.1 87.6 13.8 6 24.6 9.6 33 12.3 13.9 4.4 26.6 3.8 36.6 2.3 11.1-1.6 34.1-13.9 38.9-27.4 4.8-13.4 4.8-25 3.4-27.4-1.5-2.4-5.3-3.8-11.1-6.7z" />
                    </svg>
                </motion.div>
            </a>
        </div>
    );
};

export default WhatsAppButton;
