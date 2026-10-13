import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { Quote, Star, Award, CheckCircle } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Michael Carter',
    role: 'Luxury Real Estate Agent',
    text: 'Dipto is hands down the best video editor I have worked with. The property tours he produces look like Hollywood movies. He understands pacing and knows exactly what buyers want to see.',
    rating: 5,
    channelMetric: 'Sold $12M Listing',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Broker @ Century 21',
    text: 'His turnaround time is unbelievable, but what impresses me most is the color grading. He makes every house look bright, warm, and inviting even if we shot on a cloudy day.',
    rating: 5,
    channelMetric: '30+ Videos Delivered',
  },
  {
    id: 3,
    name: 'David Rossi',
    role: 'Founder, Urban Estates',
    text: 'Our Instagram engagement skyrocketed after Dipto started editing our vertical reels. The hooks are sharp, the captions are dynamic, and it drives real leads to our open houses.',
    rating: 5,
    channelMetric: '+450% Engagement',
  },
  {
    id: 4,
    name: 'Jessica Lin',
    role: 'Realtor',
    text: 'I used to spend hours managing revisions with other editors. With Dipto, the first draft is usually perfect. Clean edits, natural b-roll, and great communication.',
    rating: 5,
    channelMetric: 'Zero Revisions Needed',
  },
  {
    id: 5,
    name: 'Robert Hayes',
    role: 'Commercial Broker',
    text: 'We needed a high-end commercial promo for a new development project. Dipto delivered a masterpiece that helped us secure initial investors within a week.',
    rating: 5,
    channelMetric: 'Commercial Project',
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {
        // use defaults
      });
  }, []);

  return (
    <section
      id="testimonials"
      className="py-12 md:py-20 relative bg-brand-navy-light overflow-hidden border-t border-[var(--card-border)]"
    >
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-electric/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" /> Client Praise & Verified Results
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-heading tracking-tight mb-4">
            Trusted by Top-Producing{' '}
            <span className="bg-gradient-to-r from-brand-electric to-brand-orange bg-clip-text text-transparent">
              Agents & Brokers
            </span>
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto text-base">
            Discover how cinematic post-production consistency helps top agents dominate market mindshare and close high-ticket transactions.
          </p>
        </div>

        {/* Swiper 3D Carousel */}
        <div className="swiper-container-3d">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper py-10"
          >
            {testimonials.map((item) => {
              const commentText = item.text || 'Exceptional editing polish, master color grading, and high-retention storytelling.';
              const initials = item.name
                ? item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : 'RE';
              const metric = item.channelMetric || 'Verified Client';

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="h-full flex flex-col justify-between p-7 md:p-8 rounded-3xl bg-brand-navy border border-[var(--card-border)] backdrop-blur-xl shadow-2xl hover:border-brand-electric/40 transition-all duration-300">
                    {/* Top Quote & Rating */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <Quote className="w-8 h-8 text-brand-electric/50" />
                        <div className="flex gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-brand-orange text-brand-orange drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-brand-text text-sm md:text-base leading-relaxed">
                        "{commentText}"
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="pt-6 mt-6 border-t border-[var(--card-border)] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-electric to-brand-orange flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-lg flex-shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-brand-heading text-sm sm:text-base flex items-center gap-1.5 truncate">
                            {item.name}
                            <CheckCircle className="w-3.5 h-3.5 text-brand-electric flex-shrink-0" />
                          </h4>
                          <p className="text-xs text-brand-muted truncate">{item.role}</p>
                        </div>
                      </div>

                      {metric && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-brand-electric/10 border border-brand-electric/30 text-brand-electric whitespace-nowrap flex-shrink-0">
                          {metric}
                        </span>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="swiper-pagination mt-6 flex justify-center gap-2" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
