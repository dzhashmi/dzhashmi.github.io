import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Linkedin, Mail, Download, Layers, X,
  Brain, PenTool, Puzzle, User, ArrowRight, Lightbulb,
  GraduationCap, Briefcase, ExternalLink, Code, MonitorPlay,
  Cpu, Gamepad2, Leaf, Activity, Search, Wrench, CheckCircle, AlertTriangle
} from 'lucide-react';

/* ASSETS INSTRUCTIONS:
   1. Place 'headshot.jpg' & PDF in public folder.
   2. Ensure your project images are named correctly in the public folder.
*/

// --- Configuration ---
const pdfUrl = "/Final Draft APSC169 L2F Team 2 - Report 1 (2)-merged.pdf"; 
const email = "daniyalzahidhashmi@hotmail.com";
const linkedinUrl = "https://www.linkedin.com/in/daniyal-hashmi101";

// --- Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)' },
  out: { opacity: 0, y: -20, filter: 'blur(10px)' }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const containerStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// --- Data: Moved outside component for performance ---
const processSteps = [
  {
    id: 1,
    title: "Problem Definition",
    icon: <AlertTriangle size={24}/>,
    short: "Identify the root cause.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Context:</strong> Lead service lines affect over 10M+ homes in North America.</li>
        <li><strong>Core Issue:</strong> Excavation is disruptive and expensive.</li>
        <li><strong>Goal:</strong> Identify toxic infrastructure without digging.</li>
      </ul>
    )
  },
  {
    id: 2,
    title: "Study & Clarify",
    icon: <Search size={24}/>,
    short: "Researching constraints.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Constraints:</strong> Remote, Portable, Safe, &lt;$100.</li>
        <li><strong>Stakeholders:</strong> Homeowners, Municipal Councils, Health Canada.</li>
        <li><strong>Research:</strong> Water sampling is slow; excavation is intrusive.</li>
      </ul>
    )
  },
  {
    id: 3,
    title: "Generate Solutions",
    icon: <Lightbulb size={24}/>,
    short: "Ideation & C-Sketch.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Methods:</strong> Brainstorming, SCAMPER, C-Sketch.</li>
        <li><strong>Output:</strong> 39 distinct ideas (e.g., Neural Networks, X-Ray Lawnmowers).</li>
        <li><strong>Focus:</strong> Quantity and variety of mechanical/digital solutions.</li>
      </ul>
    )
  },
  {
    id: 4,
    title: "Identify Solution",
    icon: <CheckCircle size={24}/>,
    short: "Screening & Selection.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Screening:</strong> Weighted Decision Matrix (Safety 25%, Performance 25%).</li>
        <li><strong>Selection:</strong> "Scraper Endoscope" selected over "Pipe Vehicle".</li>
        <li><strong>Analysis:</strong> Sensitivity Analysis confirmed cost/safety balance.</li>
      </ul>
    )
  },
  {
    id: 5,
    title: "Develop & Test",
    icon: <Wrench size={24}/>,
    short: "Iterative Prototyping.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Proto 1:</strong> Virtual test of rubber/aluminum geometry.</li>
        <li><strong>Proto 2:</strong> Optimized scraper hook for debris collection.</li>
        <li><strong>Proto 3:</strong> Physical PLA chassis tested in 19mm pipe.</li>
      </ul>
    )
  },
  {
    id: 6,
    title: "Implement",
    icon: <Layers size={24}/>,
    short: "Final Design & Risk.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600">
        <li><strong>Outcome:</strong> Retractable endoscope costing ~$25 CAD.</li>
        <li><strong>Risk:</strong> Safety risks mitigated to 'Low' via design controls.</li>
        <li><strong>Impact:</strong> Low-cost, non-invasive alternative to excavation.</li>
      </ul>
    )
  }
];

const galleryContent = [
  {
    phase: "Phase 1: Ideation & Strategy",
    items: [
      {
        id: "g1",
        title: "Ideation Mind Map",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Ideation+Mind+Map", // Replace with /mindmap.png
        tag: "Strategy",
        shortDesc: "Brainstorming, SCAMPER, and 'Inverses & Extremes'.",
        longDesc: "We utilized a structured ideation workflow, starting with Brainstorming to generate initial ideas. We then applied SCAMPER (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse) to refine these concepts. The 'Inverses and Extremes' method helped us explore boundary conditions, resulting in 39 distinct potential solutions ranging from biological sensors to mechanical robots."
      },
      {
        id: "g2",
        title: "Collaborative C-Sketch",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Team+Collaboration", // Replace with /teamwork.jpg
        tag: "Teamwork",
        shortDesc: "Silent 5-minute sketching rounds to iterate ideas.",
        longDesc: "Collaborative Sketching (C-Sketch) was our most effective ideation method. Each team member passed their sketch to the next person every 5 minutes, adding to the design without speaking. This process removed bias and allowed for rapid iteration. Both the 'Pipe Vehicle' and 'Neuralink' concepts emerged directly from these sessions."
      },
      {
        id: "g3",
        title: "Concept: Pipe Car",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=C-Sketch+Concept", // Replace with /c-sketch.png
        tag: "Sketching",
        shortDesc: "Early motorized vehicle concept.",
        longDesc: "This detailed C-Sketch depicts the 'Pipe Vehicle', a motorized robot designed to navigate service lines. While initially promising due to its versatility, we later identified significant technical risks regarding motor torque and traction within small diameter (19mm) wet pipes. This analysis led us to pivot to the manual 'Scraper Endoscope'."
      }
    ]
  },
  {
    phase: "Phase 2: Analysis & Design",
    items: [
      {
        id: "g4",
        title: "Solution Screening",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Pairwise+Matrix", // Replace with /pairwise.png
        tag: "Analysis",
        shortDesc: "Pairwise Comparison against weighted criteria.",
        longDesc: "To filter our 39 ideas, we used a Pairwise Comparison Matrix. We compared solutions against each other based on our Weighted Decision Matrix criteria: Safety (25%), Performance (25%), Cost (15%), and Maintenance (10%). The 'Ultrasonic' and 'Pipe Endoscope' solutions scored highest, guiding our final selection."
      },
      {
        id: "g5",
        title: "Proto 1: Virtual Concept",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Prototype+1+Render", // Replace with /proto1-render.png
        tag: "CAD Render",
        shortDesc: "Testing rubber flexibility and housing geometry.",
        longDesc: "Our first prototype was virtual, created to test the general geometry. We selected a synthetic rubber coating for flexibility and an aluminum head for durability. Virtual stress testing confirmed that the aluminum head (470 MPa yield strength) would easily withstand standard residential water pressure (310-345 KPa)."
      },
      {
        id: "g6",
        title: "Proto 2: Scraper Head",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Prototype+2+Head", // Replace with /proto2-head.png
        tag: "Detailed CAD",
        shortDesc: "Optimized aluminum tip for selective scratching.",
        longDesc: "The core innovation is the material selection. We designed the scraper tip using Aluminum 6061, which has a Mohs hardness of 2.75. Lead has a hardness of 1.5, while Copper and Steel are 3.0 and 4.0. This ensures our tool will scratch (and identify) lead pipes, but slide harmlessly over copper or steel, preventing damage to non-lead infrastructure."
      }
    ]
  },
  {
    phase: "Phase 3: Verification & Build",
    items: [
      {
        id: "g7",
        title: "Proto 3: Mechanism",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Mechanism+Schematic", // Replace with /proto3-mechanism.png
        tag: "Schematic",
        shortDesc: "Retractable hook mechanism cross-section.",
        longDesc: "This cross-section shows the internal mechanism of Prototype 3. A copper wire runs through the vinyl tubing to the head. Pushing the wire retracts the hook for safe insertion; pulling the wire extends the hook to engage the pipe wall. The hook shape ensures it digs into soft lead but releases easily when the device is pulled backward."
      },
      {
        id: "g8",
        title: "Risk Assessment",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Risk+Matrix", // Replace with /risk-matrix.png
        tag: "Safety",
        shortDesc: "5x5 Risk Heatmap prioritizing safety.",
        longDesc: "We conducted a comprehensive Risk Assessment covering Safety, Technical, and Market risks. Our highest priority was preventing pipe damage or water contamination. By implementing mitigation strategies—such as the retractable mechanism and using non-toxic PLA/Aluminum materials—we reduced all residual safety risks to 'Low'."
      },
      {
        id: "g9",
        title: "Physical Verification",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Physical+Prototype", // Replace with /proto3-physical.png
        tag: "Final Build",
        shortDesc: "3D Printed model validating pipe navigation.",
        longDesc: "The final physical build used a 3D-printed PLA chassis fitted with six wheels for stability. We tested this model inside a 3D-printed pipe with a 19mm internal diameter (standard service line size). The test confirmed the device could navigate the pipe without jamming and the mechanism could successfully extend/retract."
      }
    ]
  }
];

const reflectionContent = [
  {
    q: "What did you learn about the Engineering Design process from your experience in this course?",
    a: "I learned that the engineering design process is fundamentally non-linear and requires the courage to pivot. In APSC 169, we initially selected the 'Pipe Vehicle' concept because of its versatility. However, during virtual prototyping, we realized the motors required to move it lacked sufficient torque for the pipe environment. We had to step back and pivot to the 'Scraper Endoscope'. This taught me that 'failure' in a prototype is actually a valuable data point that refines the final solution."
  },
  {
    q: "Based on your experiences in this course, what are the most important attributes of an engineer?",
    a: "The most important attributes are empathy, ethical responsibility, and adaptability. We weren't just solving a geometry puzzle; we were dealing with a public health crisis affecting children and pregnant women. An engineer must empathize with the homeowner who fears contaminated water and the city worker who needs a durable tool. Furthermore, adaptability was key; when our initial concept faced technical hurdles, we had to adapt our constraints to find a simpler, more mechanical solution."
  },
  {
    q: "How has your experience contributed to your understanding of the role of the professional engineer in society?",
    a: "My experience solidified that engineers are stewards of public safety and environmental protection. Our Risk Assessment (Report 4) wasn't just paperwork; it was a necessary step to ensure our device wouldn't accidentally damage infrastructure or contaminate the water supply further. I now understand that a professional engineer must balance technical innovation with societal trust, ensuring that cost-saving measures never compromise human safety."
  },
  {
    q: "Based on what you learned about yourself, what strengths will you bring and what areas need growth?",
    a: "I bring strong strengths in CAD visualization and technical sketching, which allowed our team to rapidly prototype ideas virtually before building them physically. I acted as an 'Optimizer', refining our designs for efficiency. However, I identified a need for growth in practical electronics and physical circuit assembly. To facilitate this growth, I plan to participate in more hands-on maker-space projects next semester to bridge the gap between my digital design skills and physical fabrication."
  }
];

export default function DaniyalPortfolio() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            className="flex flex-col cursor-pointer group text-left focus:outline-none" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">DH.</h1>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 group-hover:tracking-[0.15em] transition-all duration-300">Daniyal Hashmi</span>
          </button>

          <div className="hidden md:flex gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50 backdrop-blur-md">
            {['home', 'about', 'project', 'reflection'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-out ${activeTab === tab ? 'text-white shadow-md' : 'text-slate-600 hover:text-emerald-600 hover:bg-white/50'}`}
              >
                {activeTab === tab && (
                  <motion.div layoutId="bubble" className="absolute inset-0 bg-slate-900 rounded-full" transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }} />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"><Linkedin size={18} /></a>
            <a href={`mailto:${email}`} className="p-2 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"><Mail size={18} /></a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode='wait'>
          
          {/* ================= HOME PAGE ================= */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
              className="flex flex-col items-center justify-center flex-grow text-center"
            >
              <motion.div variants={containerStagger} initial="hidden" animate="show" className="max-w-4xl mx-auto">
                <motion.div variants={itemFadeUp} className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-emerald-100 shadow-sm text-emerald-800 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Engineering Student @ UBC Okanagan
                  </div>
                </motion.div>
                
                <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  "The way to succeed is to <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-x bg-[length:200%_auto]">
                    double your failure rate.
                  </span>"
                </motion.h1>
                <motion.p variants={itemFadeUp} className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">— Thomas J. Watson</motion.p>
                
                <motion.p variants={itemFadeUp} className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                  Hi, I'm <strong className="text-slate-900 font-bold">Daniyal Hashmi</strong>. 
                  Here, you can check out what I'm working on. I try my best to create things with 
                  <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 mx-1">purpose</span> 
                  and <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 mx-1">precision</span>.
                </motion.p>
                
                <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
                  <button onClick={() => setActiveTab('project')} className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                    View Design Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href={pdfUrl} download className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 border border-white/50 rounded-2xl font-semibold shadow-lg hover:border-emerald-200 hover:text-emerald-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Download size={18} className="group-hover:-translate-y-1 transition-transform"/> Download Full Report
                  </a>
                </motion.div>

                <motion.div variants={containerStagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                  <FeatureCard delay={0.1} icon={<Brain size={24} />} title="Analytical Thinking" desc="Breaking down complex environmental problems into data-driven, actionable engineering requirements." />
                  <FeatureCard delay={0.2} icon={<Puzzle size={24} />} title="Problem Solving" desc="Developing tangible prototypes that address real-world constraints like safety, budget, and durability." />
                  <FeatureCard delay={0.3} icon={<PenTool size={24} />} title="Design" desc="Leveraging CAD and C-Sketch to iterate through concepts and visualize solutions." />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ================= ABOUT PAGE ================= */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
              className="space-y-16"
            >
              <div className="grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 order-2 md:order-1">
                   <div className="aspect-[3/4] rounded-[2rem] bg-slate-200 relative overflow-hidden shadow-2xl border-[8px] border-white transform rotate-[-2deg] hover:rotate-0 transition-all duration-500">
                      <img 
                        src="/headshot.jpg" 
                        alt="Daniyal Hashmi" 
                        onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x500/f1f5f9/1e293b?text=Daniyal+Hashmi"}}
                        className="object-cover w-full h-full"
                      />
                   </div>
                   <h3 className="mt-8 mb-4 font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                     <Lightbulb size={16} className="text-emerald-500"/> Skills
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                      <InterestTag icon={<PenTool size={16}/>} label="CAD" />
                      <InterestTag icon={<Code size={16}/>} label="Python/Java" />
                      <InterestTag icon={<Puzzle size={16}/>} label="Prototyping" />
                      <InterestTag icon={<Activity size={16}/>} label="Risk Analysis" />
                   </div>
                </div>
                
                <div className="md:col-span-8 order-1 md:order-2">
                   <h2 className="text-4xl font-black text-slate-900 mb-6">About Me</h2>
                   <div className="prose prose-lg prose-slate text-slate-600 bg-white/60 p-8 rounded-3xl border border-white shadow-sm backdrop-blur-sm leading-relaxed">
                      <p className="mb-4">
                        Based in Kelowna, I am currently an Engineering Student at the University of British Columbia. 
                        Previously, I attended the International School of Choueifat, where I developed a rigorous global perspective on education and problem-solving.
                      </p>
                      <p className="mb-4">
                        I chose engineering because I am deeply <strong>passionate about designing and innovating</strong>. 
                        I love the process of creating things that are not just functional, but meaningful—solutions 
                        that have a tangible, positive impact on people's lives. Whether it's a simple mechanism 
                        or a complex system, I find joy in the act of creation.
                      </p>
                      <p className="mb-4">
                          When I'm not designing in CAD or working on a project, I enjoy exploring nature, 
                          playing soccer, and diving into documentaries or educational videos. I also spend my free time 
                          leveling up my programming skills and gaming.
                      </p>
                      <p className="font-semibold text-emerald-800">
                          My ultimate goal is simple: to have a meaningful impact in any way I can.
                      </p>
                   </div>
                   
                   <h3 className="mt-8 mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                    Interests & Hobbies:
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <InterestTag icon={<Cpu size={18}/>} label="Robotics" />
                      <InterestTag icon={<Leaf size={18}/>} label="Nature" />
                      <InterestTag icon={<MonitorPlay size={18}/>} label="Automation" />
                      <InterestTag icon={<User size={18}/>} label="Soccer" />
                      <InterestTag icon={<Gamepad2 size={18}/>} label="Gaming" />
                      <InterestTag icon={<Code size={18}/>} label="Coding" />
                   </div>
                </div>
              </div>

              <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><GraduationCap size={20}/></div>
                    Education Timeline
                  </h3>
                  <div className="relative border-l-2 border-dashed border-emerald-200 ml-4 space-y-12">
                     <TimelineItem 
                       date="2025 - Present"
                       title="Bachelor of Applied Science"
                       subtitle="University of British Columbia - Okanagan"
                       desc="Engineering Student. Focusing on sustainable design principles, applied sciences, and technical communication."
                       current
                     />
                     <TimelineItem 
                       date="2022 - 2025"
                       title="High School Diploma"
                       subtitle="South Huron District High School, ON"
                       desc="Honour Roll | Ontario Scholar. Developed strong foundational skills in mathematics and sciences."
                     />
                     <TimelineItem 
                       date="2012 - 2022"
                       title="Primary & Secondary Education"
                       subtitle="International School of Choueifat - Khalifa City"
                       desc="Gained a rigorous international education foundation."
                     />
                  </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Briefcase size={20}/></div>
                   Experience & Involvement
                 </h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <ExperienceCard role="Staff Cadet" org="Rocky Mountain Cadet Training Centre" date="Summer 2024" type="Work Experience" />
                    <ExperienceCard role="Student Page" org="Huron County Public Library - Exeter Branch" date="2024 - 2025" type="Work Experience" />
                    <ExperienceCard role="Company Sergeant Major" subRole="Master Warrant Officer" org="Cadets Canada" date="Extracurricular" type="Leadership" />
                    <ExperienceCard role="Club Executive" org="Eco Exeter" date="Volunteer" type="Leadership" />
                    <ExperienceCard role="Volunteer" org="Huron County Immigration Partnership" date="Volunteer" type="Community" />
                    <ExperienceCard role="Club Volunteer" org="Library Chess & Coding Club" date="Volunteer" type="Mentorship" />
                 </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Layers size={20}/></div>
                   Other Projects & Documents
                 </h3>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <ProjectLink title="Project Presentation Slides" url="https://docs.google.com/presentation/d/109lGfL_bw1LPID9-GYBsG9kdrDme9RYGQoFwCcHXWvo/edit?usp=sharing" />
                    <ProjectLink title="Design Document A" url="https://docs.google.com/document/d/1a-1sLrhcaRfoKVcxdnNXdL5w1rQDlS46LEZdGPe_kxs/edit?usp=sharing" />
                    <ProjectLink title="Design Document B" url="https://docs.google.com/document/d/1lYzlc-er8sdUB5uCXUjq8E6UVO6MnCXmOnX4KdzJ6lI/edit?usp=sharing" />
                    <ProjectLink title="Technical Analysis" url="https://docs.google.com/document/d/1nXQvHBbdcPvQw5a4hQDQ8tMo3IFe5358xiCEdeZtUaQ/edit?usp=sharing" />
                 </div>
              </section>

              <section className="bg-slate-900 text-white rounded-3xl p-10 text-center shadow-xl">
                 <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                 <p className="text-slate-300 mb-8 max-w-xl mx-auto">I'm always open to discussing sustainable engineering, new projects, or sharing ideas.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200">
                      <Linkedin size={20}/> LinkedIn
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200">
                      <Mail size={20}/> Email Me
                    </a>
                 </div>
              </section>
            </motion.div>
          )}

          {/* ================= PROJECT PAGE ================= */}
          {activeTab === 'project' && (
            <motion.div
              key="project"
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
              className="space-y-12"
            >
              <header className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
                <div className="relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider text-[10px] mb-6">
                    <Layers size={12}/> APSC 169 Team 02
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Lead Service Line <br/> Detection & Remediation</h2>
                  <p className="text-slate-300 text-xl leading-relaxed max-w-2xl font-light">
                    Designing a remote, portable, and low-maintenance solution to identify lead service line infrastructure without excavation.
                  </p>
                </div>
              </header>

              {/* 1. The Challenge */}
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg text-slate-600">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm">01</span>
                    The Challenge
                  </h3>
                  <p>
                    <strong>Why we did it:</strong> Lead contamination in drinking water remains a critical public health threat. Traditional methods of detection (excavation) are disruptive, expensive, and environmentally damaging.
                  </p>
                  <p>
                    <strong>Objective:</strong> To design a device that is remote, portable, safe for humans/environment, and costs under $100 to prototype.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                   <div className="bg-red-50 rounded-xl p-6 text-center">
                      <p className="text-4xl font-black text-red-500 mb-2">10M+</p>
                      <p className="text-sm font-medium text-red-800">Est. Lead Pipes in North America</p>
                   </div>
                   <div className="mt-4 text-sm text-slate-500 italic">
                     *Based on research from Report 1 & 2. High risk to children and pregnant women.
                   </div>
                </div>
              </section>

              {/* 2. The Engineering Process */}
              <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">02</span>
                    The Engineering Process
                </h3>
                
                <div className="w-full">
                  <p className="text-sm text-slate-400 uppercase tracking-wider mb-4 text-center font-semibold">Hover over a step to view details</p>
                  <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">
                    {processSteps.map((step) => (
                      <ProcessStepCard key={step.id} step={step} />
                    ))}
                  </div>
                </div>
              </section>

              {/* 3. Multimedia Gallery (New Interactive System) */}
              <LayoutGroup>
                <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white">
                  <div className="mb-12">
                    <h3 className="text-3xl font-bold mb-2">Design Evolution</h3>
                    <p className="text-slate-400">A complete visual history from ideation to physical validation.</p>
                  </div>
                  
                  <div className="space-y-16">
                    {galleryContent.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="text-xl font-bold text-emerald-400 mb-6 border-b border-emerald-900 pb-2">{section.phase}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {section.items.map((item) => (
                            <ExpandableGalleryItem key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </LayoutGroup>

              {/* 4. Engineering Perspective Box */}
              <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex gap-6 items-start">
                 <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl hidden md:block">
                    <Brain size={32}/>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Engineering Perspective</h3>
                    <p className="text-emerald-800/80 leading-relaxed">
                      The core technical challenge was identifying lead (Mohs Hardness 1.5) without damaging copper (Mohs 3.0) or steel (Mohs 4.0). 
                      Our solution utilizes an <strong>Aluminum 6061 tip (Mohs 2.75)</strong>. 
                      Mechanically, if the tip scratches the pipe wall, the material is softer than aluminum (Lead). 
                      If it slides, the material is harder (Copper/Steel). This binary mechanical test eliminates the need for complex sensors.
                    </p>
                 </div>
              </section>
            </motion.div>
          )}

          {/* ================= REFLECTION PAGE ================= */}
          {activeTab === 'reflection' && (
            <motion.div key="reflection" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-slate-50/50 p-10 border-b border-slate-100 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><User size={32}/></div>
                  <h2 className="text-4xl font-black text-slate-900 mb-3">Personal Reflection</h2>
                  <p className="text-slate-500 text-lg">Analyzing my growth as an engineer in APSC 169.</p>
                </div>
                <div className="p-10 md:p-14 space-y-12">
                  {reflectionContent.map((item, i) => (
                    <ReflectionBlock key={i} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200/50 bg-white/50 backdrop-blur-md">
        <p className="mb-2">© 2025 Daniyal Hashmi</p>
        <p>APSC 169 • School of Engineering • UBC Okanagan</p>
      </footer>
    </div>
  );
}

// --- Sub-Components ---

// NEW: Expandable Gallery Card
function ExpandableGalleryItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        layoutId={`card-${item.id}`}
        onClick={() => setIsOpen(true)}
        className="bg-slate-800/50 rounded-3xl overflow-hidden hover:bg-slate-800 transition-colors duration-300 group border border-white/5 cursor-pointer relative"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div layoutId={`img-container-${item.id}`} className="h-64 overflow-hidden relative">
          <motion.img 
            layoutId={`img-${item.id}`}
            src={item.src} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <motion.div layoutId={`tag-${item.id}`} className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-white/10">
            {item.tag}
          </motion.div>
        </motion.div>
        <motion.div layoutId={`content-${item.id}`} className="p-6">
          <motion.h4 layoutId={`title-${item.id}`} className="text-xl font-bold text-white mb-2">{item.title}</motion.h4>
          <motion.p layoutId={`desc-${item.id}`} className="text-sm text-slate-300 leading-relaxed">{item.shortDesc}</motion.p>
          <div className="mt-4 flex items-center text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:text-emerald-300">
            Read Analysis <ArrowRight size={14} className="ml-1" />
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              layoutId={`card-${item.id}`}
              className="w-full max-w-3xl bg-slate-900 rounded-[2rem] overflow-hidden relative z-10 border border-slate-700 shadow-2xl"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors z-20"
              >
                <X size={20}/>
              </button>

              <motion.div layoutId={`img-container-${item.id}`} className="h-80 w-full relative">
                <motion.img 
                  layoutId={`img-${item.id}`}
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
                <motion.div layoutId={`tag-${item.id}`} className="absolute top-6 left-6 bg-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg">
                  {item.tag}
                </motion.div>
              </motion.div>

              <motion.div layoutId={`content-${item.id}`} className="p-10">
                <motion.h4 layoutId={`title-${item.id}`} className="text-3xl font-black text-white mb-6">{item.title}</motion.h4>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-lg text-slate-300 leading-relaxed">{item.longDesc}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div variants={itemFadeUp} whileHover={{ y: -5 }} className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-emerald-500/30">{icon}</div>
      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm font-medium">{desc}</p>
    </motion.div>
  );
}

function ReflectionBlock({ question, answer }) {
  return (
    <div className="group">
      <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors flex items-center gap-3"><span className="w-1.5 h-6 bg-emerald-200 rounded-full group-hover:bg-emerald-500 transition-colors"></span>{question}</h3>
      <p className="text-slate-600 leading-7 pl-5 border-l border-slate-200 group-hover:border-emerald-200 transition-colors">{answer}</p>
    </div>
  );
}

function TimelineItem({ date, title, subtitle, desc, current }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8">
      <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${current ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
      <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{date}</div>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <div className="text-sm font-semibold text-slate-500 mb-2">{subtitle}</div>
      <p className="text-sm text-slate-600">{desc}</p>
    </motion.div>
  );
}

function ExperienceCard({ role, subRole, org, date, type }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-1 bg-slate-50 rounded text-[10px] font-bold uppercase tracking-wider text-slate-500">{type}</span>
        <span className="text-xs font-medium text-slate-400">{date}</span>
      </div>
      <h4 className="font-bold text-slate-900 leading-tight">{role}</h4>
      {subRole && <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">{subRole}</p>}
      <p className="text-sm text-slate-600 mt-2 border-t border-slate-100 pt-2">{org}</p>
    </motion.div>
  );
}

function ProjectLink({ title, url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all group">
      <span className="font-medium text-slate-700 group-hover:text-purple-700 transition-colors">{title}</span>
      <ExternalLink size={16} className="text-slate-400 group-hover:text-purple-500"/>
    </a>
  );
}

function InterestTag({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all">
      <div className="text-emerald-600 mb-2 p-2 bg-emerald-50 rounded-full">{icon}</div>
      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</span>
    </div>
  );
}

// NEW: Interactive Process Component
function ProcessStepCard({ step }) {
  return (
    <motion.div 
      layout // Added layout prop for smooth flex resizing
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 flex-grow group"
      initial={false}
      whileHover={{ flexGrow: 5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* Normal State (Collapsed) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 group-hover:opacity-0 transition-opacity duration-300">
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-3">{step.icon}</div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">0{step.id}</span>
        <h4 className="text-sm font-bold text-slate-700 text-center mt-1 rotate-0 lg:-rotate-90 lg:whitespace-nowrap lg:mt-12 origin-center">{step.title}</h4>
      </div>

      {/* Hover State (Expanded) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-inner">{step.icon}</div>
          <span className="text-4xl font-black text-slate-200">0{step.id}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
          <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>
          <p className="text-sm font-semibold text-emerald-700 mb-2">{step.short}</p>
          <div className="text-slate-600 leading-relaxed text-sm">{step.detail}</div>
        </div>
      </div>
    </motion.div>
  );
}