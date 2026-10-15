import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schemas
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: String,
  videoUrl: String,
  category: { type: String, default: 'YouTube Long-form' },
  aspectRatio: { type: String, default: '16:9' },
  duration: { type: String, default: '3:00' },
  views: { type: String, default: '100K Views' },
  tools: { type: String, default: 'Premiere Pro, After Effects' },
  live: String,
  github: String
});

const clientWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  link: String,
  buttonText: { type: String, default: 'View Live Project' },
  techStack: [String]
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Client' },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true }
});

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const themeSchema = new mongoose.Schema({
  presetId: { type: String, default: 'midnight-sapphire' },
  name: { type: String, default: 'Midnight Sapphire & Gold' },
  bgPrimary: { type: String, default: '#060B19' },
  bgSurface: { type: String, default: '#0F172A' },
  accentPrimary: { type: String, default: '#0066FF' },
  accentSecondary: { type: String, default: '#FF7A00' },
  glowIntensity: { type: String, default: 'medium' },
  bgStyle: { type: String, default: 'aurora-mesh' },
  updatedAt: { type: Date, default: Date.now }
});

const siteConfigSchema = new mongoose.Schema({
  brandName: { type: String, default: 'DIPTO VISUALS' },
  ownerName: { type: String, default: 'Md Tohidul Islam' },
  tagline: { type: String, default: 'Luxury Real Estate & Cinematic Video Editor' },
  heroBadge: { type: String, default: 'Elite Real Estate Post-Production' },
  heroHeadlineStart: { type: String, default: 'Transforming Raw Footage Into' },
  heroHeadlineGradient: { type: String, default: 'Multimillion-Dollar Cinema' },
  heroDescription: { type: String, default: 'High-converting architectural walkthroughs, cinematic drone storytelling, and viral vertical reels engineered to captivate luxury buyers and sell listings faster.' },
  experienceYears: { type: String, default: '5+' },
  videosEdited: { type: String, default: '500+' },
  viewsGenerated: { type: String, default: '100M+' },
  clientSatisfaction: { type: String, default: '99%' },
  email: { type: String, default: 'diptoalmamun34@gmail.com' },
  whatsapp: { type: String, default: '01791315443' },
  bookingUrl: { type: String, default: 'https://cal.com' },
  instagram: { type: String, default: 'https://instagram.com/diptoalmamun' },
  youtube: { type: String, default: 'https://youtube.com/@diptovideoediting' },
  facebook: { type: String, default: 'https://www.facebook.com/profile.php?id=61591489202271' },
  fiverr: { type: String, default: 'https://www.fiverr.com' },
  upwork: { type: String, default: 'https://www.upwork.com' },
  linkedin: { type: String, default: 'https://linkedin.com' },
  whyChooseUsBadge: { type: String, default: 'The Dipto Visuals Advantage' },
  whyChooseUsTitle: { type: String, default: 'Visual Storytelling That' },
  whyChooseUsGradient: { type: String, default: 'Commands High Valuation' },
  whyChooseUsSubtitle: { type: String, default: "Exceptional real estate video isn't merely about documenting square footage—it's about orchestrating desire. We blend Hollywood-grade color mapping, psychological cut pacing, and rich soundscapes so buyers fall in love before stepping through the door." },
  whyChooseUsImage: { type: String, default: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80' },
  whyChooseUsVideoUrl: { type: String, default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  whyChooseUsReasons: { type: Array, default: [] },
  whyChooseUsItems: { type: Array, default: [] },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false });

// Models
const AdminModel = mongoose.model('Admin', adminSchema);
const ProjectModel = mongoose.model('Project', projectSchema);
const ClientWorkModel = mongoose.model('ClientWork', clientWorkSchema);
const TestimonialModel = mongoose.model('Testimonial', testimonialSchema);
const MessageModel = mongoose.model('Message', messageSchema);
const ThemeModel = mongoose.model('Theme', themeSchema);
const SiteConfigModel = mongoose.model('SiteConfig', siteConfigSchema);

// Seed helper arrays with real video editing projects
const seedProjects = [
  {
    title: 'Alpha Reel — 9:16 Viral Retention Cut',
    desc: 'Engineered high-retention short-form pacing with dynamic kinetic captions, 3D tracking popups, and sound design. Generated over 1.8M organic views across TikTok & Instagram Reels.',
    image: '/uploads/builder.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Short-form / 9:16 Reels',
    aspectRatio: '9:16',
    duration: '0:30',
    views: '1.8M Views',
    tools: 'Premiere Pro, DaVinci Resolve, CapCut Pro, After Effects',
    live: 'https://instagram.com'
  },
  {
    title: 'Beverly Hills Luxury Estate — 4K Walkthrough',
    desc: 'Cinematic 4K walkthrough featuring speed ramps, smooth gimbal stabilization, and a warm, inviting Hollywood color grade to highlight the $12M luxury architectural property.',
    image: '/uploads/gocart.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Real Estate Cinematics',
    aspectRatio: '16:9',
    duration: '3:15',
    views: '450K Views',
    tools: 'DaVinci Resolve, Premiere Pro, FilmConvert Pro',
    live: 'https://youtube.com'
  },
  {
    title: 'Nike Pro Commercial — Kinetic Speed Ramp',
    desc: 'Commercial-grade sportswear launch video featuring seamless whip transitions, bespoke foley sound effects, and vibrant grading calibrated for OLED screens.',
    image: '/uploads/Nike.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Commercials & Brand Ads',
    aspectRatio: '16:9',
    duration: '1:00',
    views: '920K Views',
    tools: 'After Effects, Premiere Pro, DaVinci Resolve',
    live: 'https://youtube.com'
  },
  {
    title: 'Coastal Horizon — 4K Drone Showcase',
    desc: 'Breathtaking aerial cinematography focusing on architectural boundaries, dramatic sunset lighting, and slow cinematic orbits over coastal luxury homes.',
    image: '/uploads/Travel.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Drone & Aerial Tours',
    aspectRatio: '16:9',
    duration: '1:45',
    views: '320K Views',
    tools: 'DaVinci Resolve, Premiere Pro, Gyroflow',
    live: 'https://youtube.com'
  },
  {
    title: 'FinTech 3D App Launch — Motion Promo',
    desc: 'Bespoke 3D UI animations, isometric screen mockups, and kinetic typography crafted in After Effects & Blender 3D for a high-converting SaaS product launch.',
    image: '/uploads/cropt.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    category: '3D Motion & VFX',
    aspectRatio: '16:9',
    duration: '2:30',
    views: '680K Views',
    tools: 'Blender 3D, After Effects, Premiere Pro',
    live: 'https://youtube.com'
  },
  {
    title: 'Master Cinematic Showreel 2026',
    desc: 'The definitive editing showreel featuring the best of luxury property commercials, viral social hooks, drone cinematography, and narrative color science.',
    image: '/uploads/Portfolioo.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    category: 'Master Showreel',
    aspectRatio: '16:9',
    duration: '2:00',
    views: '2.4M Views',
    tools: 'DaVinci Resolve, Premiere Pro, After Effects, Blender',
    live: 'https://youtube.com'
  }
];

const seedClientWorks = [
  {
    title: "CoinGrow365 (FinTech Project)",
    description: "Engineered a large-scale platform with a multi-level commission engine and investment module. Built a complex affiliate marketing system to automate high-volume financial transactions and user payouts.",
    image: "/uploads/cropt.png",
    link: "https://www.coingrow365.com/",
    buttonText: "View Live Project",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Redux", "RESTful APIs"]
  },
  {
    title: "Sub4Sub",
    description: "Engineered a reward-based engagement ecosystem where users monetize social interactions (likes, views, subscriptions) to accrue redeemable credits for withdrawal or reinvestment.",
    image: "/uploads/Sub4sub.png",
    link: "https://sub4submvo.netlify.app/login",
    buttonText: "View Live Project",
    techStack: ["React", "Vite", "TailwindCSS", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "Softsasi",
    description: "Developed 2 professional videos and ran a successful 2-week Facebook marketing campaign using Meta Ads and DaVinci Resolve.",
    image: "/uploads/Image.jpeg",
    link: "https://www.facebook.com/story.php?story_fbid=884833464120722&id=100077822304735&rdid=TgZbvrH9RyZJsISW",
    buttonText: "View Video",
    techStack: ["Meta Ads", "DaVinci Resolve", "Facebook Marketing"]
  },
  {
    title: "Depotax (MVP showcase)",
    description: "Spearheaded the complete design overhaul for Depotax Company, implementing a beautiful, modern aesthetic across all digital and physical assets. This strategic reform focused on enhancing user experience and visual appeal, resulting in a significant growth in audience engagement and a strengthened brand identity.",
    image: "/uploads/MVP.png",
    link: "https://depotax-mvp-seven.vercel.app/",
    buttonText: "View Live Project",
    techStack: ["React", "Vite", "TailwindCSS", "Shadcn/UI", "Gsap"]
  }
];

const seedTestimonials = [
  {
    name: "Marcus Vance",
    role: "YouTube Creator (650K Subs)",
    rating: 5,
    text: "Dipto completely transformed our video retention. The custom motion hooks, DaVinci color grading, and sound design took our Average View Duration from 38% to over 64% within just 3 weeks. An absolute powerhouse editor!",
    feedback: "Dipto completely transformed our video retention. The custom motion hooks, DaVinci color grading, and sound design took our Average View Duration from 38% to over 64% within just 3 weeks. An absolute powerhouse editor!",
    channelMetric: "+450K Views/Video"
  },
  {
    name: "Elena Rostova",
    role: "Creative Director at CyberPulse Media",
    rating: 5,
    text: "We needed a commercial-grade product video with 3D camera sweeps and kinetic graphics on a tight 5-day deadline. Dipto delivered early with broadcast-level polish that blew our executive team away.",
    feedback: "We needed a commercial-grade product video with 3D camera sweeps and kinetic graphics on a tight 5-day deadline. Dipto delivered early with broadcast-level polish that blew our executive team away.",
    channelMetric: "Commercial Ad Spot"
  },
  {
    name: "Devon Patel",
    role: "Founder & Short-Form Strategist",
    rating: 5,
    text: "His short-form retention pacing is on another level. The first 3 seconds of every reel he edited for us went viral organically. Over 8 million impressions across Instagram and TikTok in two months!",
    feedback: "His short-form retention pacing is on another level. The first 3 seconds of every reel he edited for us went viral organically. Over 8 million impressions across Instagram and TikTok in two months!",
    channelMetric: "8.2M Total Reach"
  },
  {
    name: "Sarah Jenkins",
    role: "Documentary Filmmaker",
    rating: 5,
    text: "Finding someone with true film emulation color science and documentary sensibility is rare. Dipto crafted the exact moody 35mm aesthetic I envisioned for my film festival premiere.",
    feedback: "Finding someone with true film emulation color science and documentary sensibility is rare. Dipto crafted the exact moody 35mm aesthetic I envisioned for my film festival premiere.",
    channelMetric: "Festival Award Winner"
  },
  {
    name: "Liam Gallagher",
    role: "Agency Founder at ScaleMotion",
    rating: 5,
    text: "The fastest and most reliable video editor we've contracted. Handles multi-cam sync, audio sweetening, and dynamic motion graphics with zero revision back-and-forth.",
    feedback: "The fastest and most reliable video editor we've contracted. Handles multi-cam sync, audio sweetening, and dynamic motion graphics with zero revision back-and-forth.",
    channelMetric: "Agency Retainer"
  }
];

class MongoDatabase {
  async init() {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI is not defined in the environment configuration.');
      }
      
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(uri);
      console.log('MongoDB Atlas connected successfully.');

      // Check if Admin exists, otherwise seed initial data
      const adminCount = await AdminModel.countDocuments();
      if (adminCount === 0) {
        console.log('Database collections are empty. Seeding default portfolio data...');
        
        // Seed Admin credentials
        const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(plainPassword, salt);
        await AdminModel.create({
          username: process.env.ADMIN_USERNAME || 'admin',
          passwordHash: hash
        });

        // Seed Projects
        await ProjectModel.insertMany(seedProjects);
        // Seed Client Works
        await ClientWorkModel.insertMany(seedClientWorks);
        // Seed Testimonials
        await TestimonialModel.insertMany(seedTestimonials);

        console.log('MongoDB Atlas database successfully seeded with default data.');
      }
    } catch (error) {
      console.error('Failed to connect or seed MongoDB:', error);
      throw error;
    }
  }

  // Admin credentials
  async getAdmin() {
    const admin = await AdminModel.findOne();
    if (!admin) throw new Error('No admin account exists in database.');
    return {
      username: admin.username,
      passwordHash: admin.passwordHash
    };
  }

  async updateAdminPassword(newPasswordHash) {
    const admin = await AdminModel.findOne();
    if (!admin) throw new Error('No admin account exists to update.');
    admin.passwordHash = newPasswordHash;
    await admin.save();
  }

  // Projects CRUD
  async getProjects() {
    const list = await ProjectModel.find().lean();
    return list.map(item => ({
      id: item._id.toString(),
      title: item.title,
      desc: item.desc,
      image: item.image,
      videoUrl: (item.videoUrl && item.videoUrl.includes('commondatastorage.googleapis.com')) ? '/uploads/sample-video-1.mp4' : (item.videoUrl || ''),
      category: item.category || 'YouTube Long-form',
      aspectRatio: item.aspectRatio || '16:9',
      duration: item.duration || '3:00',
      views: item.views || '100K Views',
      tools: item.tools || 'Premiere Pro, After Effects',
      live: item.live || '',
      github: item.github || ''
    }));
  }

  async saveProject(project) {
    const projectPayload = {
      title: project.title,
      desc: project.desc,
      image: project.image,
      videoUrl: project.videoUrl,
      category: project.category || 'YouTube Long-form',
      aspectRatio: project.aspectRatio || '16:9',
      duration: project.duration || '3:00',
      views: project.views || '100K Views',
      tools: project.tools || 'Premiere Pro, After Effects',
      live: project.live,
      github: project.github
    };

    if (project.id) {
      const updated = await ProjectModel.findByIdAndUpdate(
        project.id,
        projectPayload,
        { new: true }
      ).lean();
      if (!updated) throw new Error('Project not found to update.');
      return { ...updated, id: updated._id.toString() };
    } else {
      const newDoc = new ProjectModel(projectPayload);
      await newDoc.save();
      const obj = newDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }
  }

  async deleteProject(id) {
    await ProjectModel.findByIdAndDelete(id);
  }

  // Client Works CRUD
  async getClientWorks() {
    const list = await ClientWorkModel.find().lean();
    return list.map(item => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      image: item.image,
      link: item.link,
      buttonText: item.buttonText,
      techStack: item.techStack
    }));
  }

  async saveClientWork(work) {
    if (work.id) {
      const updated = await ClientWorkModel.findByIdAndUpdate(
        work.id,
        {
          title: work.title,
          description: work.description,
          image: work.image,
          link: work.link,
          buttonText: work.buttonText,
          techStack: work.techStack
        },
        { new: true }
      ).lean();
      if (!updated) throw new Error('Client work not found to update.');
      return { ...updated, id: updated._id.toString() };
    } else {
      const newDoc = new ClientWorkModel({
        title: work.title,
        description: work.description,
        image: work.image,
        link: work.link,
        buttonText: work.buttonText,
        techStack: work.techStack
      });
      await newDoc.save();
      const obj = newDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }
  }

  async deleteClientWork(id) {
    await ClientWorkModel.findByIdAndDelete(id);
  }

  // Testimonials CRUD
  async getTestimonials() {
    const list = await TestimonialModel.find().lean();
    return list.map(item => ({
      id: item._id.toString(),
      name: item.name,
      role: item.role,
      rating: item.rating,
      text: item.text
    }));
  }

  async saveTestimonial(testimonial) {
    if (testimonial.id) {
      const updated = await TestimonialModel.findByIdAndUpdate(
        testimonial.id,
        {
          name: testimonial.name,
          role: testimonial.role,
          rating: testimonial.rating,
          text: testimonial.text
        },
        { new: true }
      ).lean();
      if (!updated) throw new Error('Testimonial not found to update.');
      return { ...updated, id: updated._id.toString() };
    } else {
      const newDoc = new TestimonialModel({
        name: testimonial.name,
        role: testimonial.role,
        rating: testimonial.rating,
        text: testimonial.text
      });
      await newDoc.save();
      const obj = newDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }
  }

  async deleteTestimonial(id) {
    await TestimonialModel.findByIdAndDelete(id);
  }

  // Messages CRUD
  async getMessages() {
    const list = await MessageModel.find().sort({ createdAt: -1 }).lean();
    return list.map(item => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      message: item.message,
      createdAt: item.createdAt.toISOString()
    }));
  }

  async saveMessage(message) {
    const newDoc = new MessageModel({
      name: message.name,
      email: message.email,
      message: message.message
    });
    await newDoc.save();
    const obj = newDoc.toObject();
    return {
      id: obj._id.toString(),
      name: obj.name,
      email: obj.email,
      message: obj.message,
      createdAt: obj.createdAt.toISOString()
    };
  }

  async deleteMessage(id) {
    await MessageModel.findByIdAndDelete(id);
  }

  // Theme Settings
  async getTheme() {
    let theme = await ThemeModel.findOne().lean();
    if (!theme) {
      const defaultDoc = new ThemeModel({
        presetId: 'midnight-sapphire',
        name: 'Midnight Sapphire & Gold',
        bgPrimary: '#060B19',
        bgSurface: '#0F172A',
        accentPrimary: '#0066FF',
        accentSecondary: '#FF7A00',
        glowIntensity: 'medium',
        bgStyle: 'aurora-mesh'
      });
      await defaultDoc.save();
      const obj = defaultDoc.toObject();
      return {
        id: obj._id.toString(),
        presetId: obj.presetId,
        name: obj.name,
        bgPrimary: obj.bgPrimary,
        bgSurface: obj.bgSurface,
        accentPrimary: obj.accentPrimary,
        accentSecondary: obj.accentSecondary,
        glowIntensity: obj.glowIntensity,
        bgStyle: obj.bgStyle
      };
    }
    return {
      id: theme._id.toString(),
      presetId: theme.presetId || 'midnight-sapphire',
      name: theme.name || 'Midnight Sapphire & Gold',
      bgPrimary: theme.bgPrimary || '#060B19',
      bgSurface: theme.bgSurface || '#0F172A',
      accentPrimary: theme.accentPrimary || '#0066FF',
      accentSecondary: theme.accentSecondary || '#FF7A00',
      glowIntensity: theme.glowIntensity || 'medium',
      bgStyle: theme.bgStyle || 'aurora-mesh'
    };
  }

  async saveTheme(themeData) {
    let theme = await ThemeModel.findOne();
    const payload = {
      presetId: themeData.presetId || 'custom',
      name: themeData.name || 'Custom Theme',
      bgPrimary: themeData.bgPrimary || '#060B19',
      bgSurface: themeData.bgSurface || '#0F172A',
      accentPrimary: themeData.accentPrimary || '#0066FF',
      accentSecondary: themeData.accentSecondary || '#FF7A00',
      glowIntensity: themeData.glowIntensity || 'medium',
      bgStyle: themeData.bgStyle || 'aurora-mesh',
      updatedAt: new Date()
    };

    if (theme) {
      Object.assign(theme, payload);
      await theme.save();
      const obj = theme.toObject();
      return { ...obj, id: obj._id.toString() };
    } else {
      const newDoc = new ThemeModel(payload);
      await newDoc.save();
      const obj = newDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }
  }

  // Site Profile & Content Configuration
  async getSiteConfig() {
    let config = await SiteConfigModel.findOne();
    if (!config) {
      const defaultDoc = new SiteConfigModel({
        brandName: 'DIPTO VISUALS',
        ownerName: 'Md Tohidul Islam',
        tagline: 'Real Estate Video Editor',
        heroBadge: 'Real Estate Video Editor',
        heroHeadlineStart: 'Turn Raw Property Footage Into',
        heroHeadlineGradient: 'Premium Visual Stories',
        heroDescription: 'High-converting property walkthroughs, drone edits, and viral reels that captivate high-ticket buyers.',
        experienceYears: '5+',
        videosEdited: '500+',
        viewsGenerated: '100M+',
        clientSatisfaction: '99%',
        email: 'diptoalmamun34@gmail.com',
        whatsapp: '01791315443',
        bookingUrl: 'https://cal.com',
        instagram: 'https://instagram.com/diptoalmamun',
        youtube: 'https://youtube.com/@diptovideoediting',
        facebook: 'https://www.facebook.com/profile.php?id=61591489202271',
        fiverr: 'https://www.fiverr.com',
        upwork: 'https://www.upwork.com',
        linkedin: 'https://linkedin.com',
        whyChooseUsBadge: 'The Dipto Visuals Advantage',
        whyChooseUsTitle: 'Visual Storytelling That',
        whyChooseUsGradient: 'Commands High Valuation',
        whyChooseUsSubtitle: "Exceptional real estate video isn't merely about documenting square footage—it's about orchestrating desire. We blend Hollywood-grade color mapping, psychological cut pacing, and rich soundscapes so buyers fall in love before stepping through the door.",
        whyChooseUsImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        whyChooseUsVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        whyChooseUsReasons: [
          "Hollywood DaVinci Color Science",
          "Rhythmic, Beat-Matched Pacing",
          "48-Hour Rapid Delivery Guarantee",
          "Full Commercial Music Licensing",
          "Frictionless Frame.io Reviews",
          "Multi-Platform 16:9 & 9:16 Exports"
        ],
        whyChooseUsItems: [
          {
            id: 'color-science',
            title: 'Hollywood DaVinci Color Science',
            subtitle: 'ACES & Kodak 2383 35mm film emulation with balanced natural skin tones.',
            tag: 'Color Science',
            icon: 'Palette',
            badgeText: 'Rec.709 vs Kodak 2383 Cinema LUT',
            stat: '32-Bit Float',
            statLabel: 'Wide Color Gamut',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 'beat-pacing',
            title: 'Rhythmic, Beat-Matched Pacing',
            subtitle: 'Dynamic cuts timed to audio transients and psychological retention hooks.',
            tag: 'Dynamic Editing',
            icon: 'Activity',
            badgeText: 'Dynamic Speed Ramps & SFX',
            stat: '128 BPM',
            statLabel: 'Rhythm Cut Sync',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 'rapid-delivery',
            title: '48-Hour Rapid Delivery Guarantee',
            subtitle: 'High-speed cloud pipeline ensuring your marketing campaigns launch on schedule.',
            tag: 'Turnaround',
            icon: 'Clock',
            badgeText: 'Zero Listing Delays Guaranteed',
            stat: '24-48 Hours',
            statLabel: 'Priority Delivery',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 'commercial-licensing',
            title: 'Full Commercial Music Licensing',
            subtitle: 'Perpetual commercial clearance with zero copyright strikes across all platforms.',
            tag: 'Royalty-Free',
            icon: 'Shield',
            badgeText: 'Artlist & Musicbed Worldwide Sync Clearance',
            stat: '100% Cleared',
            statLabel: 'Commercial Sync',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 'frame-io',
            title: 'Frictionless Frame.io Reviews',
            subtitle: 'Click, timestamp, and review edits collaboratively with frame-accurate notes.',
            tag: 'Cloud Workflow',
            icon: 'MessageSquare',
            badgeText: 'Frame-Accurate Timecode Notes & Approvals',
            stat: 'Frame-Accurate',
            statLabel: 'Collaborative Review',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
          },
          {
            id: 'multi-platform',
            title: 'Multi-Platform 16:9 & 9:16 Exports',
            subtitle: 'Master 4K landscape walkthroughs plus high-retention 9:16 vertical social cutdowns.',
            tag: 'Dual Aspect',
            icon: 'Layers',
            badgeText: 'Optimized for YouTube, MLS, Reels & TikTok',
            stat: '16:9 & 9:16',
            statLabel: 'Master Deliverables',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
          }
        ]
      });
      await defaultDoc.save();
      const obj = defaultDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }

    // Auto-migrate legacy placeholders if found
    let needsUpdate = false;
    if (config.email === 'contact@diptovisuals.com' || config.email === 'hello@diptovisuals.com') {
      config.email = 'diptoalmamun34@gmail.com';
      needsUpdate = true;
    }
    if (!config.whatsapp || config.whatsapp.includes('1700000000') || config.whatsapp === '+8801700000000' || config.whatsapp === '+880 1700-000000') {
      config.whatsapp = '01791315443';
      needsUpdate = true;
    }
    if (config.instagram === 'https://instagram.com' || !config.instagram) {
      config.instagram = 'https://instagram.com/diptoalmamun';
      needsUpdate = true;
    }
    if (config.youtube === 'https://youtube.com' || !config.youtube) {
      config.youtube = 'https://youtube.com/@diptovideoediting';
      needsUpdate = true;
    }
    if (!config.facebook || config.facebook === 'https://facebook.com') {
      config.facebook = 'https://www.facebook.com/profile.php?id=61591489202271';
      needsUpdate = true;
    }
    if (!config.fiverr) {
      config.fiverr = 'https://www.fiverr.com';
      needsUpdate = true;
    }
    if (!config.upwork) {
      config.upwork = 'https://www.upwork.com';
      needsUpdate = true;
    }
    if (!config.whyChooseUsTitle) {
      config.whyChooseUsTitle = 'Visual Storytelling That';
      needsUpdate = true;
    }
    if (!config.whyChooseUsGradient) {
      config.whyChooseUsGradient = 'Commands High Valuation';
      needsUpdate = true;
    }
    if (!config.whyChooseUsBadge) {
      config.whyChooseUsBadge = 'The Dipto Visuals Advantage';
      needsUpdate = true;
    }
    if (!config.whyChooseUsVideoUrl || config.whyChooseUsVideoUrl.includes('commondatastorage.googleapis.com')) {
      config.whyChooseUsVideoUrl = '/uploads/sample-video-1.mp4';
      needsUpdate = true;
    }
    if (Array.isArray(config.whyChooseUsItems)) {
      let itemsChanged = false;
      config.whyChooseUsItems = config.whyChooseUsItems.map(item => {
        if (item.videoUrl && item.videoUrl.includes('commondatastorage.googleapis.com')) {
          itemsChanged = true;
          return { ...item, videoUrl: '/uploads/sample-video-1.mp4' };
        }
        return item;
      });
      if (itemsChanged) needsUpdate = true;
    }
    if (!Array.isArray(config.whyChooseUsItems) || config.whyChooseUsItems.length === 0) {
      config.whyChooseUsItems = [
        {
          id: 'color-science',
          title: 'Hollywood DaVinci Color Science',
          subtitle: 'ACES & Kodak 2383 35mm film emulation with balanced natural skin tones.',
          tag: 'Color Science',
          icon: 'Palette',
          badgeText: 'Rec.709 vs Kodak 2383 Cinema LUT',
          stat: '32-Bit Float',
          statLabel: 'Wide Color Gamut',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'beat-pacing',
          title: 'Rhythmic, Beat-Matched Pacing',
          subtitle: 'Dynamic cuts timed to audio transients and psychological retention hooks.',
          tag: 'Dynamic Editing',
          icon: 'Activity',
          badgeText: 'Dynamic Speed Ramps & SFX',
          stat: '128 BPM',
          statLabel: 'Rhythm Cut Sync',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'rapid-delivery',
          title: '48-Hour Rapid Delivery Guarantee',
          subtitle: 'High-speed cloud pipeline ensuring your marketing campaigns launch on schedule.',
          tag: 'Turnaround',
          icon: 'Clock',
          badgeText: 'Zero Listing Delays Guaranteed',
          stat: '24-48 Hours',
          statLabel: 'Priority Delivery',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'commercial-licensing',
          title: 'Full Commercial Music Licensing',
          subtitle: 'Perpetual commercial clearance with zero copyright strikes across all platforms.',
          tag: 'Royalty-Free',
          icon: 'Shield',
          badgeText: 'Artlist & Musicbed Worldwide Sync Clearance',
          stat: '100% Cleared',
          statLabel: 'Commercial Sync',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'frame-io',
          title: 'Frictionless Frame.io Reviews',
          subtitle: 'Click, timestamp, and review edits collaboratively with frame-accurate notes.',
          tag: 'Cloud Workflow',
          icon: 'MessageSquare',
          badgeText: 'Frame-Accurate Timecode Notes & Approvals',
          stat: 'Frame-Accurate',
          statLabel: 'Collaborative Review',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'multi-platform',
          title: 'Multi-Platform 16:9 & 9:16 Exports',
          subtitle: 'Master 4K landscape walkthroughs plus high-retention 9:16 vertical social cutdowns.',
          tag: 'Dual Aspect',
          icon: 'Layers',
          badgeText: 'Optimized for YouTube, MLS, Reels & TikTok',
          stat: '16:9 & 9:16',
          statLabel: 'Master Deliverables',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
        }
      ];
      needsUpdate = true;
    }

    if (needsUpdate) {
      await config.save();
    }

    const obj = config.toObject ? config.toObject() : config;
    return { ...obj, id: (obj._id || obj.id).toString() };
  }

  async saveSiteConfig(configData) {
    let config = await SiteConfigModel.findOne();
    const payload = {
      ...configData,
      updatedAt: new Date()
    };
    delete payload._id;
    delete payload.id;

    if (config) {
      config.set(payload);
      await config.save();
      const obj = config.toObject();
      return { ...obj, id: obj._id.toString() };
    } else {
      const newDoc = new SiteConfigModel(payload);
      await newDoc.save();
      const obj = newDoc.toObject();
      return { ...obj, id: obj._id.toString() };
    }
  }
}

const db = new MongoDatabase();
export default db;
