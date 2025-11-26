import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  LayoutGroup, 
  useScroll, 
  useSpring, 
  useMotionValue, 
  useTransform, 
  useMotionTemplate 
} from 'framer-motion';
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

// --- Data: Engineering Process ---
const processSteps = [
  {
    id: 1,
    title: "Problem Definition",
    icon: <AlertTriangle size={24}/>,
    short: "Identify the root cause.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Context:</strong> Lead service lines affect over 10M+ homes in North America.</li>
        <li><strong>Core Issue:</strong> Excavation is disruptive and expensive.</li>
        <li><strong>Goal:</strong> Identify toxic infrastructure without digging.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Project Proposal:</strong></p>
        <p>The core problem identified is the widespread prevalence of Lead Service Lines (LSLs) in North American infrastructure, affecting over 10 million homes. The current industry standard for identification involves physical excavation, which is cost-prohibitive ($5,000+ per site), disruptive to homeowners, and environmentally damaging.</p>
        <p>Our team defined the primary objective: <em>To design a remote, non-destructive tool capable of distinguishing between lead, copper, and steel pipes from the interior, thereby eliminating the need for excavation.</em></p>
      </div>
    )
  },
  {
    id: 2,
    title: "Study & Clarify",
    icon: <Search size={24}/>,
    short: "Researching constraints.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Constraints:</strong> Remote, Portable, Safe, &lt;$100.</li>
        <li><strong>Stakeholders:</strong> Municipal Councils, Health Canada.</li>
        <li><strong>Research:</strong> Water sampling is slow; excavation is intrusive.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Needs Analysis:</strong></p>
        <p>We conducted a comprehensive stakeholder analysis involving Municipal Councils, Homeowners, and Health Canada. The research highlighted strict constraints for any potential solution:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Geometry:</strong> Must navigate 19mm (3/4") internal diameter pipes with 90-degree bends.</li>
            <li><strong>Environment:</strong> Must operate in wet, pressurized, or drained environments.</li>
            <li><strong>Cost:</strong> Prototype budget limited to &lt;$100 CAD to ensure scalability.</li>
        </ul>
        <p>Existing solutions, such as water sampling, were deemed too slow (weeks for lab results), reinforcing the need for immediate, on-site mechanical verification.</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Generate Solutions",
    icon: <Lightbulb size={24}/>,
    short: "Ideation & C-Sketch.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Methods:</strong> Brainstorming, SCAMPER, C-Sketch.</li>
        <li><strong>Output:</strong> 39 distinct ideas (e.g., Neural Networks, X-Ray Lawnmowers).</li>
        <li><strong>Focus:</strong> Quantity and variety of mechanical/digital solutions.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Concept Generation:</strong></p>
        <p>The team utilized standard ideation frameworks including SCAMPER and Collaborative Sketching (C-Sketch). This phase prioritized quantity over quality, resulting in 39 distinct concepts ranging from high-tech (Ultrasonic Sensors, Neural Networks) to low-tech (Chemical Swabs, Mechanical Scratchers).</p>
        <p>Key concepts that emerged included:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>The Pipe Vehicle:</strong> A motorized rover for visual inspection.</li>
            <li><strong>The Scraper Endoscope:</strong> A manual push-rod device with a scratching tip.</li>
            <li><strong>The X-Ray Lawnmower:</strong> An external ground-penetrating radar solution (eliminated due to cost).</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "Identify Solution",
    icon: <CheckCircle size={24}/>,
    short: "Screening & Selection.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Screening:</strong> Weighted Decision Matrix (Safety 25%, Performance 25%).</li>
        <li><strong>Selection:</strong> "Scraper Endoscope" selected over "Pipe Vehicle".</li>
        <li><strong>Analysis:</strong> Sensitivity Analysis confirmed cost/safety balance.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Decision Matrix Analysis:</strong></p>
        <p>A Weighted Decision Matrix was employed to rigorously filter the 39 concepts. The criteria were weighted as follows: Safety (25%), Performance (25%), Cost (15%), and Maintenance (10%).</p>
        <p>While the "Pipe Vehicle" scored high on innovation, it failed the technical feasibility screening due to the torque required to drive wheels inside a wet, slim 19mm pipe. The <strong>Scraper Endoscope</strong> was selected as the final solution because it relied on simple mechanical principles (Mohs hardness testing) rather than complex electronics, maximizing reliability and minimizing cost.</p>
      </div>
    )
  },
  {
    id: 5,
    title: "Develop & Test",
    icon: <Wrench size={24}/>,
    short: "Iterative Prototyping.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Proto 1:</strong> Virtual test of rubber/aluminum geometry.</li>
        <li><strong>Proto 2:</strong> Optimized scraper hook for debris collection.</li>
        <li><strong>Proto 3:</strong> Physical PLA chassis tested in 19mm pipe.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Verification Testing:</strong></p>
        <p>The development phase followed an iterative cycle of "Design-Build-Test":</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prototype 1 (Virtual):</strong> FEA analysis confirmed that the aluminum tip (Yield Strength: 276 MPa) would not deform under operation.</li>
            <li><strong>Prototype 2 (Physical):</strong> A PLA-printed chassis revealed that the initial hook angle was too shallow to engage the pipe wall.</li>
            <li><strong>Prototype 3 (Final):</strong> We optimized the scraper hook geometry and added a retraction mechanism. Testing in a clear 19mm pipe confirmed the device could successfully scratch lead (identifying it) while sliding harmlessly over harder copper pipes.</li>
        </ul>
      </div>
    )
  },
  {
    id: 6,
    title: "Implement",
    icon: <Layers size={24}/>,
    short: "Final Design & Risk.",
    detail: (
      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
        <li><strong>Outcome:</strong> Retractable endoscope costing ~$25 CAD.</li>
        <li><strong>Risk:</strong> Safety risks mitigated to 'Low' via design controls.</li>
        <li><strong>Impact:</strong> Low-cost, non-invasive alternative to excavation.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p><strong>Excerpt from Final Recommendations:</strong></p>
        <p>The final "Lead Service Line Detector" was successfully built for a total material cost of ~$25 CAD, significantly under the $100 budget.</p>
        <p><strong>Risk Mitigation:</strong> The primary risk identified was the potential to damage non-lead pipes. This was mitigated by selecting Aluminum 6061 for the tip material. With a Mohs hardness of 2.75, it is harder than Lead (1.5) but softer than Copper (3.0) and Steel (4.0), ensuring that the device inherently cannot damage the infrastructure it is meant to protect.</p>
      </div>
    )
  }
];

// --- Data: Gallery ---
const galleryContent = [
  {
    phase: "Phase 1: Ideation & Strategy",
    items: [
      {
        id: "g1",
        title: "Ideation Mind Map",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Ideation+Mind+Map", 
        tag: "Strategy",
        shortDesc: "Brainstorming, SCAMPER, and 'Inverses & Extremes'.",
        longDesc: "We utilized a structured ideation workflow, starting with Brainstorming to generate initial ideas. We then applied SCAMPER (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse) to refine these concepts. The 'Inverses and Extremes' method helped us explore boundary conditions, resulting in 39 distinct potential solutions ranging from biological sensors to mechanical robots."
      },
      {
        id: "g2",
        title: "Collaborative C-Sketch",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Team+Collaboration", 
        tag: "Teamwork",
        shortDesc: "Silent 5-minute sketching rounds to iterate ideas.",
        longDesc: "Collaborative Sketching (C-Sketch) was our most effective ideation method. Each team member passed their sketch to the next person every 5 minutes, adding to the design without speaking. This process removed bias and allowed for rapid iteration. Both the 'Pipe Vehicle' and 'Neuralink' concepts emerged directly from these sessions."
      },
      {
        id: "g3",
        title: "Concept: Pipe Car",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=C-Sketch+Concept", 
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
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Pairwise+Matrix", 
        tag: "Analysis",
        shortDesc: "Pairwise Comparison against weighted criteria.",
        longDesc: "To filter our 39 ideas, we used a Pairwise Comparison Matrix. We compared solutions against each other based on our Weighted Decision Matrix criteria: Safety (25%), Performance (25%), Cost (15%), and Maintenance (10%). The 'Ultrasonic' and 'Pipe Endoscope' solutions scored highest, guiding our final selection."
      },
      {
        id: "g5",
        title: "Proto 1: Virtual Concept",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Prototype+1+Render", 
        tag: "CAD Render",
        shortDesc: "Testing rubber flexibility and housing geometry.",
        longDesc: "Our first prototype was virtual, created to test the general geometry. We selected a synthetic rubber coating for flexibility and an aluminum head for durability. Virtual stress testing confirmed that the aluminum head (470 MPa yield strength) would easily withstand standard residential water pressure (310-345 KPa)."
      },
      {
        id: "g6",
        title: "Proto 2: Scraper Head",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Prototype+2+Head", 
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
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Mechanism+Schematic", 
        tag: "Schematic",
        shortDesc: "Retractable hook mechanism cross-section.",
        longDesc: "This cross-section shows the internal mechanism of Prototype 3. A copper wire runs through the vinyl tubing to the head. Pushing the wire retracts the hook for safe insertion; pulling the wire extends the hook to engage the pipe wall. The hook shape ensures it digs into soft lead but releases easily when the device is pulled backward."
      },
      {
        id: "g8",
        title: "Risk Assessment",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Risk+Matrix", 
        tag: "Safety",
        shortDesc: "5x5 Risk Heatmap prioritizing safety.",
        longDesc: "We conducted a comprehensive Risk Assessment covering Safety, Technical, and Market risks. Our highest priority was preventing pipe damage or water contamination. By implementing mitigation strategies—such as the retractable mechanism and using non-toxic PLA/Aluminum materials—we reduced all residual safety risks to 'Low'."
      },
      {
        id: "g9",
        title: "Physical Verification",
        src: "https://placehold.co/800x600/f1f5f9/334155?text=Physical+Prototype", 
        tag: "Final Build",
        shortDesc: "3D Printed model validating pipe navigation.",
        longDesc: "The final physical build used a 3D-printed PLA chassis fitted with six wheels for stability. We tested this model inside a 3D-printed pipe with a 19mm internal diameter (standard service line size). The test confirmed the device could navigate the pipe without jamming and the mechanism could successfully extend/retract."
      }
    ]
  }
];

// --- Data: Reflection ---
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

// --- NEW COMPONENT: Force Field Background (Canvas) ---
const ForceFieldBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const dots = [];
    const spacing = 40;
    
    for(let x = 0; x < window.innerWidth + spacing; x += spacing) {
      for(let y = 0; y < window.innerHeight + spacing; y += spacing) {
        dots.push({ x, y, originX: x, originY: y });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#94a3b8'; // Slate-400
      
      dots.forEach(dot => {
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * -30;
          const moveY = Math.sin(angle) * force * -30;
          
          dot.x += (dot.originX + moveX - dot.x) * 0.1;
          dot.y += (dot.originY + moveY - dot.y) * 0.1;
        } else {
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none" />;
};

// --- NEW COMPONENT: Magnetic Button ---
const MagneticButton = ({ children, onClick, className, active }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Magnetic strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- NEW COMPONENT: Konami Code Manager ---
const KonamiCode = ({ onUnlock }) => {
  const [keys, setKeys] = useState([]);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prev) => {
        const newKeys = [...prev, e.key].slice(-10);
        if (JSON.stringify(newKeys) === JSON.stringify(code)) {
          onUnlock();
        }
        return newKeys;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
};

export default function DaniyalPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredProcessStep, setHoveredProcessStep] = useState(null);
  
  // Easter Egg States
  const [eggMode, setEggMode] = useState(null); // 'blueprint', 'gravity', 'party'
  const [gravityEnabled, setGravityEnabled] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const triggerKonami = () => {
    const modes = ['blueprint', 'gravity', 'party'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    setEggMode(randomMode);
    
    if (randomMode === 'gravity') {
      setGravityEnabled(true);
      setTimeout(() => { setGravityEnabled(false); setEggMode(null); }, 5000); // Reset after 5s
    } else if (randomMode === 'party') {
      setTimeout(() => setEggMode(null), 5000);
    } else if (randomMode === 'blueprint') {
        // Toggle off if pressed again or set timeout
        setTimeout(() => setEggMode(null), 10000);
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden relative 
      ${eggMode === 'blueprint' ? 'bg-[#0f2862] text-white font-mono' : 'bg-slate-50 text-slate-800'}`}
      onMouseMove={handleMouseMove}
    >
      <KonamiCode onUnlock={triggerKonami} />
      <ForceFieldBackground />

      {/* Spotlight Background */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]" style={{ scaleX }} />

      {/* Blueprint Grid Overlay */}
      {eggMode === 'blueprint' && (
        <div className="fixed inset-0 z-50 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      )}

      {/* Party Confetti */}
      {eggMode === 'party' && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
           {[...Array(50)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-3 h-3 bg-emerald-500 rounded-full"
               initial={{ x: Math.random() * window.innerWidth, y: -20 }}
               animate={{ y: window.innerHeight + 20, rotate: 360 }}
               transition={{ duration: Math.random() * 2 + 2, ease: "linear", repeat: Infinity }}
               style={{ backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'][Math.floor(Math.random() * 3)] }}
             />
           ))}
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.button 
            drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2}
            className="flex flex-col cursor-grab active:cursor-grabbing group text-left focus:outline-none z-50" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors pointer-events-none">DH.</h1>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 group-hover:tracking-[0.15em] transition-all duration-300 pointer-events-none">Daniyal Hashmi</span>
          </motion.button>

          <div className="hidden md:flex gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50 backdrop-blur-md">
            {['home', 'about', 'project', 'reflection'].map((tab) => (
              <MagneticButton
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-out ${activeTab === tab ? 'text-white shadow-md' : 'text-slate-600 hover:text-emerald-600 hover:bg-white/50'}`}
              >
                {activeTab === tab && (
                  <motion.div layoutId="bubble" className="absolute inset-0 bg-slate-900 rounded-full" transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }} />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton><a href={linkedinUrl} target="_blank" rel="noreferrer" className="block p-2 rounded-full bg-slate-100 hover:bg-[#0077b5] hover:text-white transition-colors shadow-sm"><Linkedin size={18} /></a></MagneticButton>
            <MagneticButton><a href={`mailto:${email}`} className="block p-2 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors shadow-sm"><Mail size={18} /></a></MagneticButton>
          </div>
        </div>
      </nav>

      {/* GRAVITY ANIMATION WRAPPER */}
      <motion.main 
        animate={gravityEnabled ? { y: 1000, rotate: 10, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
        className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col"
      >
        <AnimatePresence mode='wait'>
          
          {/* ================= HOME PAGE ================= */}
          {activeTab === 'home' && (
            <motion.div key="home" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="flex flex-col items-center justify-center flex-grow text-center">
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
                  I enjoy making things :) Here, you can learn more about me and what I'm working on.
                </motion.p>
                
                <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
                  <MagneticButton onClick={() => setActiveTab('project')} className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                    View Design Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                  <MagneticButton>
                    <a href={pdfUrl} download className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 border border-white/50 rounded-2xl font-semibold shadow-lg hover:border-emerald-200 hover:text-emerald-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <Download size={18} className="group-hover:-translate-y-1 transition-transform"/> Download Full Report
                    </a>
                  </MagneticButton>
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
            <motion.div key="about" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="space-y-16">
              <div className="grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 order-2 md:order-1">
                   <motion.div 
                     whileTap={{ rotate: 360, transition: { duration: 0.6 } }}
                     className="aspect-[3/4] rounded-[2rem] bg-slate-200 relative overflow-hidden shadow-2xl border-[8px] border-white transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 cursor-pointer"
                   >
                      <img src="/headshot.jpg" alt="Daniyal Hashmi" onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x500/f1f5f9/1e293b?text=Daniyal+Hashmi"}} className="object-cover w-full h-full" />
                   </motion.div>
                   <h3 className="mt-8 mb-4 font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest"><Lightbulb size={16} className="text-emerald-500"/> Skills</h3>
                   <div className="grid grid-cols-2 gap-3">
                      <InterestTag icon={<PenTool size={16}/>} label="CAD" />
                      <InterestTag icon={<Code size={16}/>} label="Python/Java" />
                      <InterestTag icon={<Puzzle size={16}/>} label="Prototyping" />
                      <InterestTag icon={<Activity size={16}/>} label="Simulation" />
                   </div>
                </div>
                <div className="md:col-span-8 order-1 md:order-2">
                   <h2 className="text-4xl font-black text-slate-900 mb-6">About Me</h2>
                   <div className="prose prose-lg prose-slate text-slate-600 bg-white/60 p-8 rounded-3xl border border-white shadow-sm backdrop-blur-sm leading-relaxed">
                      <p className="mb-4">I am currently an Engineering Student at the University of British Columbia. I chose to study engineering because I am passionate about designing and innovating. I love the process of creating things that are not just functional, but meaningful.</p>
                      <p className="mb-4">Other than designing, CAD, and other engineering related topics, I enjoy hiking, walking on trails and other outdoor activities. In addition, I like playing soccer, watching Formula 1 races, documentaries, and exploring other interesting subjects.</p>
                   </div>
                   <h3 className="mt-8 mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">Interests & Hobbies:</h3>
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"><div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><GraduationCap size={20}/></div>Education Timeline</h3>
                  <div className="relative border-l-2 border-dashed border-emerald-200 ml-4 space-y-12">
                     <TimelineItem date="2025 - Present" title="Bachelor of Applied Science (Engineering)" subtitle="University of British Columbia - Okanagan" desc="Engineering Student. Focused on studying mechanical engineering with a specialization in mechatronics" current />
                     <TimelineItem date="2022 - 2025" title="High School Diploma" subtitle="South Huron District High School, ON" desc="Honour Roll | Ontario Scholar." />
                     <TimelineItem date="2012 - 2022" title="Primary & Secondary Education" subtitle="International School of Choueifat - Khalifa City" desc="Built a strong foundation in core subjects" />
                  </div>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Briefcase size={20}/></div>Experience & Involvement</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <ExperienceCard role="Staff Cadet" org="Rocky Mountain Cadet Training Centre" date="Summer 2024" type="Work Experience" />
                    <ExperienceCard role="Student Page" org="Huron County Public Library - Exeter Branch" date="2024 - 2025" type="Work Experience" />
                    <ExperienceCard role="Company Sergeant Major" subRole="Master Warrant Officer" org="Cadets Canada" date="Extracurricular" type="Leadership" />
                    <ExperienceCard role="Club Executive" org="Eco Exeter" date="Volunteer" type="Leadership" />
                    <ExperienceCard role="Volunteer" org="Huron County Immigration Partnership" date="Volunteer" type="Community" />
                    <ExperienceCard role="Club Volunteer" org="Library Chess & Coding Club" date="Volunteer" type="Mentorship" />
                 </div>
              </section>
              <section className="bg-slate-900 text-white rounded-3xl p-10 text-center shadow-xl">
                 <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                 <p className="text-slate-300 mb-8 max-w-xl mx-auto">I'm always open to discussing sustainable engineering, new projects, or sharing ideas.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200"><Linkedin size={20}/> LinkedIn</a>
                    <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200"><Mail size={20}/> Email Me</a>
                 </div>
              </section>
            </motion.div>
          )}

          {/* ================= PROJECT PAGE ================= */}
          {activeTab === 'project' && (
            <motion.div key="project" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="space-y-12">
              <header className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
                <div className="relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider text-[10px] mb-6"><Layers size={12}/> APSC 169 Team 02</div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Lead Service Line <br/> Detection & Remediation</h2>
                  <p className="text-slate-300 text-xl leading-relaxed max-w-2xl font-light">Designing a remote, portable, and low-maintenance solution to identify lead service line infrastructure without excavation.</p>
                </div>
              </header>

              {/* 1. The Challenge */}
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg text-slate-600">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm">01</span>The Challenge</h3>
                  <p><strong>Why we did it:</strong> Lead contamination in drinking water remains a critical public health threat. Traditional methods of detection (excavation) are disruptive, expensive, and environmentally damaging.</p>
                  <p><strong>Objective:</strong> To design a device that is remote, portable, safe for humans/environment, and costs under $100 to prototype.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                   <div className="bg-red-50 rounded-xl p-6 text-center">
                      <p className="text-4xl font-black text-red-500 mb-2">10M+</p>
                      <p className="text-sm font-medium text-red-800">Est. Lead Pipes in North America</p>
                   </div>
                </div>
              </section>

              {/* 2. The Engineering Process (Hybrid Animation) */}
              <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">02</span>The Engineering Process</h3>
                <LayoutGroup>
                  <div className="w-full">
                    <p className="text-sm text-slate-400 uppercase tracking-wider mb-4 text-center font-semibold">Hover to Expand • Click for Details</p>
                    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
                      {processSteps.map((step) => (
                        <ProcessStepCard key={step.id} step={step} isHovered={hoveredProcessStep === step.id} setHovered={setHoveredProcessStep} />
                      ))}
                    </div>
                  </div>
                </LayoutGroup>
              </section>

              {/* 3. Multimedia Gallery (3D Tilt) */}
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
                            <TiltCard key={item.id}><ExpandableGalleryItem item={item} /></TiltCard>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </LayoutGroup>

              {/* 4. Engineering Perspective Box */}
              <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex gap-6 items-start">
                 <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl hidden md:block"><Brain size={32}/></div>
                 <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Engineering Perspective</h3>
                    <p className="text-emerald-800/80 leading-relaxed">The core technical challenge was identifying lead (Mohs Hardness 1.5) without damaging copper (Mohs 3.0). Our solution utilizes an <strong>Aluminum 6061 tip (Mohs 2.75)</strong>.</p>
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
                  {reflectionContent.map((item, i) => (<ReflectionBlock key={i} question={item.q} answer={item.a} />))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200/50 bg-white/50 backdrop-blur-md relative z-10">
        <p className="mb-2">© 2025 Daniyal Hashmi</p>
        <p>APSC 169 • School of Engineering • UBC Okanagan</p>
      </footer>
    </div>
  );
}

// --- NEW: 3D Tilt Card Wrapper ---
function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div 
      style={{ perspective: 1000 }} 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// --- Sub-Components ---

function ProcessStepCard({ step, isHovered, setHovered }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        layout 
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setHovered(step.id)}
        onMouseLeave={() => setHovered(null)}
        animate={{ flex: isHovered ? 10 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 group min-w-[100px]"
      >
        {/* VIEW 1: IDLE */}
        <motion.div animate={{ opacity: isHovered ? 0 : 1 }} className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-3">{step.icon}</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 0{step.id}</span>
          <h4 className="text-sm font-bold text-slate-700 text-center">{step.title}</h4>
        </motion.div>

        {/* VIEW 2: HOVER */}
        <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          <div className="flex justify-between items-start min-w-[300px]"> 
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-inner">{step.icon}</div>
            <span className="text-4xl font-black text-slate-200">0{step.id}</span>
          </div>
          <div className="min-w-[300px]"> 
            <h3 className="text-2xl font-bold text-slate-900 mb-2 whitespace-nowrap">{step.title}</h3>
            <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>
            <p className="text-sm font-semibold text-emerald-700 mb-2">{step.short}</p>
            <div className="mb-4">{step.detail}</div>
            <div className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">Click to Read Report <ArrowRight size={10} /></div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div layoutId={`modal-card-${step.id}`} className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden relative z-10 shadow-2xl flex flex-col max-h-[80vh]">
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-20"><X size={20}/></button>
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">{step.icon}</div>
                    <div><span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Step 0{step.id}</span><h4 className="text-2xl font-black text-slate-900">{step.title}</h4></div>
                 </div>
              </div>
              <div className="p-8 overflow-y-auto">
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-slate max-w-none">{step.reportContent}</motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ExpandableGalleryItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div layoutId={`card-${item.id}`} onClick={() => setIsOpen(true)} className="bg-slate-800/50 rounded-3xl overflow-hidden hover:bg-slate-800 transition-colors duration-300 group border border-white/5 cursor-pointer relative h-full">
        <motion.div layoutId={`img-container-${item.id}`} className="h-64 overflow-hidden relative">
          <motion.img layoutId={`img-${item.id}`} src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <motion.div layoutId={`tag-${item.id}`} className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-white/10">{item.tag}</motion.div>
        </motion.div>
        <motion.div layoutId={`content-${item.id}`} className="p-6">
          <motion.h4 layoutId={`title-${item.id}`} className="text-xl font-bold text-white mb-2">{item.title}</motion.h4>
          <motion.p layoutId={`desc-${item.id}`} className="text-sm text-slate-300 leading-relaxed">{item.shortDesc}</motion.p>
          <div className="mt-4 flex items-center text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:text-emerald-300">Read Analysis <ArrowRight size={14} className="ml-1" /></div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div layoutId={`card-${item.id}`} className="w-full max-w-3xl bg-slate-900 rounded-[2rem] overflow-hidden relative z-10 border border-slate-700 shadow-2xl">
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors z-20"><X size={20}/></button>
              <motion.div layoutId={`img-container-${item.id}`} className="h-80 w-full relative">
                <motion.img layoutId={`img-${item.id}`} src={item.src} alt={item.title} className="w-full h-full object-cover" />
                <motion.div layoutId={`tag-${item.id}`} className="absolute top-6 left-6 bg-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg">{item.tag}</motion.div>
              </motion.div>
              <motion.div layoutId={`content-${item.id}`} className="p-10">
                <motion.h4 layoutId={`title-${item.id}`} className="text-3xl font-black text-white mb-6">{item.title}</motion.h4>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-invert max-w-none"><p className="text-lg text-slate-300 leading-relaxed">{item.longDesc}</p></motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
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