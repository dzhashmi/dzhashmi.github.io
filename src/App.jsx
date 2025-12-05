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
  GraduationCap, Briefcase, Code, MonitorPlay,
  Cpu, Gamepad2, Leaf, Activity, Search, Wrench, CheckCircle, AlertTriangle,
  Recycle, Network, CalendarClock, Truck, Quote, ChevronDown,
  Maximize2, ExternalLink, ArrowLeft, Hammer, Disc, Home, Volume2, Eye
} from 'lucide-react';

// --- PDF VIEWER COMPONENT (INLINE FOR PREVIEW) ---
// [LOCAL SETUP] UNCOMMENT THESE 3 LINES IN YOUR LOCAL PROJECT IF USING react-pdf
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-gray-900 p-2 shadow-2xl custom-scrollbar" 
        onClick={(e) => e.stopPropagation()} 
        onContextMenu={(e) => e.preventDefault()} // PREVENTS RIGHT CLICK SAVE
      >
        <button 
          onClick={onClose}
          className="sticky top-2 right-2 z-50 float-right mb-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <X size={16} /> Close
        </button>

        <div className="flex flex-col items-center justify-center min-h-full select-none pb-10">
          
          {/* --- [LOCAL SETUP] UNCOMMENT THIS BLOCK FOR REAL PDF VIEWING --- */}
          {
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col gap-4"
            loading={
              <div className="flex flex-col items-center justify-center text-white h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading Secure Document...</p>
              </div>
            }
            error={
              <div className="text-red-400 p-10 text-center border border-red-900 rounded-lg bg-red-900/20">
                <p className="text-xl font-bold">Unable to load PDF.</p>
                <p className="text-sm mt-2 opacity-70">Ensure file exists in 'public' folder.</p>
              </div>
            }
          >
            {numPages && Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`} 
                pageNumber={index + 1} 
                renderTextLayer={false}       // PREVENTS SELECTING TEXT
                renderAnnotationLayer={false} // PREVENTS LINKS/DOWNLOADS
                className="shadow-2xl mb-4 border border-gray-800"
                width={Math.min(windowWidth * 0.85, 900)}
              />
            ))}
          </Document>
          }

          

        </div>
      </div>
    </div>
  );
};

/* ASSETS INSTRUCTIONS:
   Ensure all images are in the /public folder exactly as named.
*/

// --- Configuration ---
// This is the main report file
const pdfUrl = "/public/report.pdf"; 
const email = "daniyalzahidhashmi@hotmail.com";
const linkedinUrl = "https://www.linkedin.com/in/daniyal-hashmi101";

// --- Random Quotes Data ---
const quotesData = [
  { 
    prefix: "The way to succeed is to", 
    highlight: "double your failure rate.", 
    author: "Thomas J. Watson" 
  },
  { 
    prefix: "Scientists discover the world that exists;", 
    highlight: "engineers create the world that never was.", 
    author: "Theodore von Kármán" 
  },
  { 
    prefix: "Design is not just what it looks like.", 
    highlight: "Design is how it works.", 
    author: "Steve Jobs" 
  },
  { 
    prefix: "Failure is simply the opportunity to begin again,", 
    highlight: "this time more intelligently.", 
    author: "Henry Ford" 
  },
  { 
    prefix: "Strive for perfection in everything you do.", 
    highlight: "Take the best that exists and make it better.", 
    author: "Sir Henry Royce" 
  },
  { 
    prefix: "It is not about ideas. It is about", 
    highlight: "making ideas happen.", 
    author: "Scott Belsky" 
  }
];

// --- Other Projects Data ---
// UPDATED: Added 'pdf' property mapped to your specific files
const otherProjects = [
  {
    title: "Catapult Project",
    desc: "A mechanical design challenge focusing on trajectory and force.",
    icon: <Hammer size={24} />,
    pdf: "/public/DaniyalHashmi-CatapultProject.pdf"
  },
  {
    title: "Whistle Design",
    desc: "3D modeling and additive manufacturing of a functional whistle.",
    icon: <Volume2 size={24} />,
    pdf: "/public/Daniyal hashmi-whistle.pdf"
  },
  {
    title: "House Modelling",
    desc: "Architectural CAD modelling and spatial design.",
    icon: <Home size={24} />,
    pdf: "/public/HouseRenovationProposal.pdf"
  },
  {
    title: "3D Scan Turntable",
    desc: "A 3D printed turntable designed to assist in photogrammetry.",
    icon: <Disc size={24} />,
    pdf: "/public/Daniyal hashmi-IDS.pdf"
  }
];

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
        <li><strong>Context:</strong> Lead service lines affect over 10M+ homes.</li>
        <li><strong>Core Issue:</strong> Excavation is disruptive/expensive.</li>
        <li><strong>Goal:</strong> Identify toxic infrastructure remotely.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>During this stage, my team and I investigated the widespread prevalence of Lead Service Lines (LSLs). We identified that current methods like excavation are cost-prohibitive ($5,000+ per site) and disruptive to homeowners. We set our primary objective: to design a remote tool capable of navigating 19mm pipes to distinguish lead from copper or steel without the need for digging.</p>
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
        <li><strong>Constraints:</strong> Remote, Portable, Safe, ~$150.</li>
        <li><strong>Stakeholders:</strong> Municipal Councils, Health Canada.</li>
        <li><strong>Research:</strong> Water sampling is slow; excavation is intrusive.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>My team and I conducted a comprehensive stakeholder analysis involving Municipal Councils and Health Canada. We established strict constraints: the device needed to be remote, portable, safe for drinking water, and cost ~$150 CAD. We clarified that the device must navigate 90-degree bends in 19mm diameter pipes while operating in wet or pressurized environments.</p>
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
        <li><strong>Output:</strong> 39 distinct ideas.</li>
        <li><strong>Focus:</strong> Quantity and variety of solutions.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>My team and I utilized ideation frameworks including SCAMPER and Collaborative Sketching (C-Sketch). This phase prioritized quantity, resulting in 39 distinct concepts ranging from high-tech Neural Networks to mechanical solutions. Key concepts that emerged included the "Pipe Vehicle" (a motorized rover) and the "Scraper Endoscope" (a manual push-rod device).</p>
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
        <li><strong>Screening:</strong> Weighted Decision Matrix.</li>
        <li><strong>Selection:</strong> "Scraper Endoscope" selected.</li>
        <li><strong>Analysis:</strong> Sensitivity Analysis confirmed.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>We employed a Weighted Decision Matrix to filter our 39 concepts, weighting Safety and Performance at 25% each. While the "Pipe Vehicle" was innovative, we identified critical flaws in its propulsion feasibility. Consequently, we selected the "Scraper Endoscope" for its reliance on reliable mechanical principles (Mohs hardness) over complex electronics, maximizing reliability and minimizing cost.</p>
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
        <li><strong>Proto 1:</strong> Virtual test of geometry.</li>
        <li><strong>Proto 2:</strong> Optimized scraper hook.</li>
        <li><strong>Proto 3:</strong> Physical PLA chassis tested.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>During this stage, my team and I followed an iterative "Design-Build-Test" cycle. We started with virtual simulations (Prototype 1) to test geometry, moved to a physical scraper head (Prototype 2) to test debris collection, and finally built a 6-wheel centering chassis (Prototype 3) to validate stability inside a physical pipe. This confirmed our aluminum tip could scratch lead (Mohs 1.5) without damaging copper (Mohs 3.0).</p>
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
        <li><strong>Outcome:</strong> Costing ~$140 CAD.</li>
        <li><strong>Risk:</strong> Safety risks mitigated to 'Low'.</li>
        <li><strong>Impact:</strong> Non-invasive alternative.</li>
      </ul>
    ),
    reportContent: (
      <div className="space-y-4">
        <p>My team and I finalized the design, achieving a material cost of ~$140 CAD (well under our ~$150 target). We conducted a rigorous risk assessment, ensuring safety risks were classified as 'Low' by using Aluminum 6061 (Mohs 2.75). This ensures the device is physically incapable of damaging steel or copper infrastructure, fulfilling our primary safety mandate.</p>
      </div>
    )
  }
];

// --- Data: Reworked Design Journey ---
const designEvolutionData = [
  {
    title: "Ideation & Team Dynamics",
    description: "We began by using the brainstorming technique which included listing out immediate concepts like 'talking pipes' or 'spikes in the ground'. We also utilised other techniques during this process, such as inverses, and extremes. These techniques included solving the reverse problem or using extreme solutions to break design fixation. Then finally used the C-Sketch method to generate 5 refined ideas to add onto our list of brainstormed ideas. Adding up to 39 unique and diverse ideas, ranging from Ground Penetrating Radars, to time machines.",
    images: [
      { src: "/mindmap.png", title: "Problem Space Mind Map", desc: "Our initial roadmap connecting LSLs to potential detection vectors: Acoustic, Chemical, and Mechanical." },
      { src: "/All C_sketches.png", title: "C-Sketch Output", desc: "The raw output of our rapid ideation session. 39 distinct concepts were generated here." },
      { src: "/Working_Together_2.jpg", title: "Team Collaboration", desc: "We utilized critical friend sessions to ruthlessly evaluate feasibility while maintaining a supportive team environment." }
    ]
  },
  {
    title: "The 'Pipe Car' Concept (My Model)",
    description: "Our initial top contender was the 'Pipe Vehicle'. I created this low-fidelity CAD model to visualize how a motorized rover could navigate 19mm pipes. It could carry cameras, sensors, or scrapers. However, during virtual testing, we realized that motors small enough to fit in the pipe lacked the torque required to drive wheels in a wet, pressurized environment. This critical feasibility failure forced us to pivot.",
    images: [
      { src: "/PipeCar_Low_Fidelity_CAD_View3.png", title: "My CAD: Pipe Car", desc: "I modeled this concept to test packaging constraints. The wheelbase calculations revealed it would struggle with traction in vertical pipe sections." }
    ]
  },
  {
    title: "The Pivot: Scraper Endoscope",
    description: "We moved to a simpler, more promising solution: The Piper Endoscope. I developed this low-fidelity prototype (prototype 1) to visualize how it would look, and specifically visualize the head and its functionality. By selecting a material hard enough on the Mohs Hardness scale that can scratch lead, but no other commonly used pipe material, we use this as a mechanical test, which could even retrieve samples to be tested for verification.",
    images: [
      { src: "/PipeEndoscope_Proto1_View1.png", title: "My CAD: Proto 1", desc: "I created this virtual flex test to ensure the device could navigate 90-degree bends without kinking." }
    ]
  },
  {
    title: "Final Design & Planning",
    description: "The final design (Prototype 3) integrated a 6-wheel centering chassis to stabilize the scratch tool. This ensures the tool applies even pressure regardless of orientation. To ensure successful delivery, I developed a comprehensive Gantt Chart outlining a 121.5-day implementation plan, identifying the critical path from regulatory validation to final market launch.",
    images: [
      { src: "/PipeEndoscope_Proto3_View2.png", title: "Final Design Internal", desc: "Transparent view of the final 6-wheel chassis. This mechanism ensures the scratch tool remains centered in the pipe." },
      { src: "/GanttChart.png", title: "My Project Management", desc: "I created this Gantt Chart to map our Critical Path (121.5 days), managing dependencies between R&D, procurement, and testing." }
    ]
  }
];

// --- Data: Technical Deep Dive Content ---
const lcaData = [
  { 
    component: "Scraper Head", 
    material: "Brass (Trade Mix)", 
    reason: "Selected for balance of corrosion resistance and tensile strength. Low environmental impact (3.17 €/kg).",
    icon: <Wrench size={18} />
  },
  { 
    component: "Tubing", 
    material: "SBR (Styrene-Butadiene)", 
    reason: "Selected for superior chemical/weather resistance over natural rubber. Low carbon footprint (0.52 €/kg).",
    icon: <Activity size={18} />
  },
  { 
    component: "Chassis Wheels", 
    material: "PVC", 
    reason: "Selected for high compressive modulus and long service life. Very low carbon footprint (0.34 €/kg).",
    icon: <CheckCircle size={18} />
  }
];

const detailedRiskData = [
  { id: "R001", desc: "Device gets stuck in pipe.", cat: "Operational", source: "Preventable", L: 3, I: 5, score: 15, level: "High", strategy: "Mitigate" },
  { id: "R002", desc: "Scraper breaks off in pipe.", cat: "Operational", source: "Preventable", L: 1, I: 5, score: 5, level: "Low", strategy: "Mitigate" },
  { id: "R003", desc: "Not collecting enough sample.", cat: "Operational", source: "External", L: 1, I: 2, score: 2, level: "Low", strategy: "Accept" },
  { id: "R004", desc: "GPS malfunctioning.", cat: "Operational", source: "Preventable", L: 2, I: 2, score: 4, level: "Low", strategy: "Mitigate" },
  { id: "R005", desc: "Contaminating pipes with lead.", cat: "Safety", source: "Preventable", L: 1, I: 4, score: 4, level: "Low", strategy: "Mitigate" },
  { id: "R006", desc: "Tripping on rubber body.", cat: "Safety", source: "Preventable", L: 1, I: 1, score: 1, level: "Low", strategy: "Accept" },
  { id: "R007", desc: "Pipe leak/damage to env.", cat: "Safety", source: "External", L: 1, I: 1, score: 1, level: "Low", strategy: "Accept" },
  { id: "R008", desc: "Wrong design dimensions.", cat: "Technical", source: "Preventable", L: 2, I: 4, score: 8, level: "Medium", strategy: "Mitigate" },
  { id: "R009", desc: "Incorrect aluminum alloy.", cat: "Technical", source: "Preventable", L: 2, I: 4, score: 8, level: "Medium", strategy: "Mitigate" },
  { id: "R010", desc: "Incorrect rubber type.", cat: "Technical", source: "Preventable", L: 2, I: 3, score: 6, level: "Medium", strategy: "Avoid" },
  { id: "R011", desc: "Selling non-functioning part.", cat: "Technical", source: "Preventable", L: 2, I: 5, score: 10, level: "Medium", strategy: "Mitigate" },
  { id: "R012", desc: "Product not finished on time.", cat: "Proj Mgmt", source: "Preventable", L: 1, I: 3, score: 3, level: "Low", strategy: "Avoid" },
  { id: "R013", desc: "Not completing within budget.", cat: "Proj Mgmt", source: "Strategic", L: 1, I: 3, score: 3, level: "Low", strategy: "Accept" },
  { id: "R014", desc: "Communication breakdown.", cat: "Proj Mgmt", source: "Preventable", L: 2, I: 4, score: 8, level: "Medium", strategy: "Mitigate" },
  { id: "R015", desc: "Exceeding Project Scope.", cat: "Proj Mgmt", source: "Strategic", L: 2, I: 2, score: 4, level: "Low", strategy: "Avoid" },
  { id: "R016", desc: "Inadequate market research.", cat: "Market", source: "Preventable", L: 2, I: 3, score: 6, level: "Medium", strategy: "Mitigate" },
  { id: "R017", desc: "Wrong target audience.", cat: "Market", source: "Preventable", L: 2, I: 3, score: 6, level: "Medium", strategy: "Mitigate" },
  { id: "R018", desc: "Price fluctuations.", cat: "Market", source: "Preventable", L: 3, I: 3, score: 9, level: "Medium", strategy: "Mitigate" }
];

const timelineEvents = [
  { phase: "Regulatory", task: "Validate Requirements", days: "1 Day" },
  { phase: "R&D", task: "Simulations & CAD", days: "21 Days" },
  { phase: "Procurement", task: "Material Sourcing", days: "7 Days" },
  { phase: "Build", task: "Prototype Assembly", days: "4 Days" },
  { phase: "Testing", task: "Performance Validation", days: "6 Days" },
  { phase: "Launch", task: "Stakeholder Review", days: "14 Days" }
];

// --- Data: Expanded Reflection (REVAMPED) ---
const reflectionContent = [
  {
    title: "Engineering Design Process",
    icon: <PenTool size={32} />,
    content: (
      <>
        I learned that the engineering design process is a non-linear process that requires a lot of iteration and good teamwork to be successful in solving an open ended, real life problem. In APSC 169 design labs, we first initially selected the 'Pipe Vehicle' concept because it was versatile and innovative. However, during virtual prototyping, we realized the motors required to move it lacked sufficient torque, did not exist, or function in the way we were hoping for them. We had to step back and pivot to the 'Pipe Endoscope'. This taught me that failure in a prototype is actually a critical success in the process, as it generates the data needed to refine the final solution towards feasibility.
      </>
    )
  },
  {
    title: "Attributes of an Engineer",
    icon: <User size={32} />,
    content: (
      <>
        During my time working on this project I learned that there are many important attributes that an engineer should have:
        <ul className="list-disc pl-5 space-y-2 mt-4 text-base">
          <li><strong>Problem-Solving and Critical Thinking:</strong> The ability to analyze complex, real world, open-ended problems, break them down into manageable parts, and develop innovative solutions is fundamental. My experience with the 'Pipe Vehicle' failure showed the need for screening and scoring initial designs when faced with new challenges.</li>
          <li><strong>Adaptability and Iteration:</strong> Since the design process is non-linear, engineers must be flexible. Real-world constraints often require major changes, requiring the engineer to quickly iterate and learn from failures.</li>
          <li><strong>Effective Communication and Teamwork:</strong> Engineering projects are rarely a one person job. Success relies heavily on clear communication, active listening, conflict resolution, and collaborating effectively within a diverse team.</li>
          <li><strong>Ethical Responsibility:</strong> An engineer must always consider the impact of their work on the public, the environment, and society. This involves upholding engineering ethics, prioritizing safety, and designing sustainable solutions.</li>
        </ul>
      </>
    )
  },
  {
    title: "Role in Society",
    icon: <Network size={32} />,
    content: (
      <>
        My experience on this project significantly deepened my understanding of the professional engineer's role. Working on the Lead Service Line detection system showed me that engineers solve critical societal issues. We had to navigate bylaws, environmental impacts, and health risks, and the needs of various stakeholders of various degrees. I also realized that the quality of work an engineer produces has a significant impact on people’s lives. An engineer's responsibility extends beyond just making things, it includes the safety, sustainability, and ethics, morals, and integrity of the solutions we introduce into society to solve real world problems.
      </>
    )
  },
  {
    title: "Strengths & Growth",
    icon: <Lightbulb size={32} />,
    content: (
      <>
        I bring strong strengths in CAD visualization and technical sketching, which allowed our team to rapidly prototype ideas virtually before building them physically. I acted as an 'Optimizer', refining our designs for efficiency, and making sure our group dynamics were always at the performing stage. However, I identified a need for growth in practical electronics and physical prototyping. Even though I may be skillful in these areas, there is always room for improvement. I plan on improving and building upon my knowledge in these skills throughout my university experience. I plan on becoming an active member in some of the clubs, and even plan on starting my own club with my peers in Bionics, to be able to learn something new, implement my academic knowledge, and grow.
      </>
    )
  }
];

// --- COMPONENTS ---

const ForceFieldBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // SSR Check to prevent crash
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

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

const ProjectAbstract = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 mt-6 w-full max-w-2xl mx-auto">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-left transition-colors hover:bg-white/20 group"
      >
        <span className="text-emerald-300 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <Quote size={14} className="text-emerald-400" /> Project Abstract
        </span>
        <div className={`p-1 rounded-full bg-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={16} className="text-white" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-6 bg-slate-900/50 backdrop-blur-xl border-x border-b border-white/10 rounded-b-2xl -mt-1 pt-6">
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                There is an urgent need for a sustainable, remote, and non-invasive solution to detect lead service lines in residential infrastructure. With millions of homes affected, traditional excavation methods are disruptive, costly, and environmentally damaging. Our team used the engineering design process to develop the Pipe Endoscope. This device is designed to navigate narrow pipes and utilizes a scraper to scrape only lead, and sample it using a filter to be brought back for testing and confirmation, to distinguish soft lead from harder copper or steel infrastructure. The final solution, validated through virtual simulations and physical 3D-printed prototypes, offers a cost effective (~$150 CAD), portable, and safe alternative to excavation, ensuring public health safety while minimising environmental impact.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- BENTO GRID IMAGE COMPONENT ---
const BentoImage = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        layoutId={`bento-img-${item.src}`}
        onClick={() => setIsOpen(true)}
        className={`${item.span || 'col-span-1'} group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100 border border-slate-200 aspect-video`}
        whileHover={{ scale: 1.02 }}
      >
        <motion.img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-emerald-300 font-bold text-xs uppercase tracking-wider mb-1">View Details</p>
          <p className="text-white font-bold text-lg leading-tight">{item.title}</p>
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white">
            <Maximize2 size={16} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-lg" 
            />
            <motion.div 
              layoutId={`bento-img-${item.src}`} 
              className="relative z-10 w-full max-w-6xl bg-black rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-white/10"
            >
              <div className="relative flex-1 bg-black/50 flex items-center justify-center p-8 md:p-12">
                 <img src={item.src} alt={item.title} className="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl" />
              </div>
              <div className="w-full md:w-[450px] bg-slate-50 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                 <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-200 rounded-full text-slate-600 hover:bg-slate-300 transition-colors"><X size={20}/></button>
                 <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">Image Analysis</span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">{item.title}</h3>
                 </div>
                 <div className="h-1 w-20 bg-emerald-500 rounded-full mb-8"></div>
                 <div className="prose prose-slate">
                    <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ================================================
//   NEW COMPONENTS: PROJECTS GALLERY & LEAD PROJECT WRAPPER
// ================================================

// UPDATED: Now accepts onViewPdf prop to handle PDF clicks
const ProjectsGallery = ({ onSelectProject, onViewPdf }) => {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">My Projects</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">A collection of my engineering design work, prototyping, and technical problem solving.</p>
      </div>

      {/* FEATURED PROJECT CARD */}
      <motion.div 
        onClick={() => onSelectProject('lead-detection')}
        whileHover={{ y: -5 }}
        className="relative w-full bg-slate-900 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl group border border-slate-800"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
              <Layers size={12} /> Featured Case Study
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">Lead Service Line <br/> Detection Device</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              A comprehensive engineering design project addressing the public health crisis of lead contamination. Follows the full design cycle from problem definition to valid physical prototyping.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700">CAD</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700">Prototyping</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700">Systems Analysis</span>
            </div>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                View Case Study <ArrowRight size={20} />
              </span>
            </div>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px] bg-slate-800/50 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-6 group-hover:bg-slate-800/70 transition-colors">
              <img src="/PipeEndoscope_Proto3_View2.png" alt="Lead Detection Device" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
          </div>
        </div>
      </motion.div>

      {/* OTHER PROJECTS GRID */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="text-emerald-500" size={24}/> Project Archive
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              // Changed from <a> to div with onClick for secure PDF viewing
              onClick={() => project.pdf ? onViewPdf(project.pdf) : window.open(project.link, '_blank')}
              whileHover={{ y: -5 }}
              className="cursor-pointer group block bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {project.icon}
                </div>
                <ExternalLink size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{project.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// WRAPPER FOR THE DETAILED PROJECT VIEW
// This effectively "re-adds" the Lead Detection project page logic when selected
const LeadDetectionProject = ({ onBack }) => {
  const [hoveredProcessStep, setHoveredProcessStep] = useState(null);
  const [activeTechTab, setActiveTechTab] = useState('lca');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="space-y-24"
    >
      {/* BACK BUTTON NAV */}
      <div className="sticky top-24 z-40 pb-4 bg-gradient-to-b from-slate-50 to-transparent">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:text-emerald-600 transition-all text-slate-600 font-bold text-sm"
        >
          <ArrowLeft size={16}/> Back to Projects
        </button>
      </div>

      {/* Header */}
      <header className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-20 relative overflow-visible shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider text-[10px] mb-6"><Layers size={12}/> APSC 169 Team 02</div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Lead Service Line <br/> Detection</h2>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl font-light">Designing a remote, portable, and low-maintenance solution to identify lead service line infrastructure without excavation.</p>
          
          {/* --- ABSTRACT DROPDOWN --- */}
          <ProjectAbstract />
        </div>
      </header>

      {/* 1. The Challenge */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="prose prose-lg text-slate-600">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm">01</span>The Challenge</h3>
          <p className="text-justify">
            <strong>Why we did it:</strong> Lead contamination in drinking water remains a critical public health threat. Traditional methods of detection (excavation) are disruptive, expensive, and environmentally damaging.
          </p>
          <p className="text-justify">
            <strong>Objective:</strong> To design a device that is remote, portable, safe for humans/environment, and costs under $100 to prototype.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                <p className="text-4xl font-black text-red-500 mb-1">10M+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Pipes in N. America</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                <p className="text-4xl font-black text-red-500 mb-1">$5k+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost per Excavation</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                <p className="text-4xl font-black text-red-500 mb-1">50%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Euro Properties at Risk</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                <p className="text-4xl font-black text-emerald-500 mb-1">~$150</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Device Cost</p>
            </div>
        </div>
      </section>

      {/* 2. The Engineering Process */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">02</span>The Engineering Process</h3>
        
        {/* INTRO PARAGRAPH FOR PROCESS */}
        <p className="text-slate-600 mb-8 max-w-4xl text-lg leading-relaxed">
          We utilized a structured engineering design process to tackle the complex issue of Lead Service Line detection. By moving methodically from problem definition to final implementation, we ensured our solution was not just innovative, but feasible, safe, and economically viable.
        </p>

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

      {/* 3. The Design Evolution */}
      <section className="space-y-16">
        <div className="text-left mb-8">
           <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">03</span>
              The Design Evolution
           </h3>
        </div>
        
        {designEvolutionData.map((phase, index) => (
          <div key={index} className="grid lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-emerald-500"></div>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Phase 0{index + 1}</span>
              </div>
              <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{phase.title}</h4>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">{phase.description}</p>
            </div>
            <div className={`${index % 2 === 1 ? "lg:order-1" : ""} grid gap-6 grid-cols-1`}>
              {phase.images.map((img, i) => (
                <BentoImage key={i} item={img} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. Technical Deep Dive (Tabs) */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
         <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
           <div>
              <h3 className="text-2xl font-bold text-slate-900 gap-3 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm">04</span>
                  Technical Analysis
              </h3>
              <p className="text-slate-500 mt-2 max-w-2xl">Technical Analysis of Life Cycle Assessment (LCA), Systems Thinking, and Risk Management.</p>
           </div>
           <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              {['lca', 'system', 'risk'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTechTab(tab)}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTechTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab === 'lca' ? 'Materials (LCA)' : tab === 'system' ? 'Systems' : 'Risk Matrix'}
                  </button>
              ))}
           </div>
         </div>

         <div className="min-h-[400px]">
            <AnimatePresence mode='wait'>
               {activeTechTab === 'lca' && (
                  <motion.div 
                     key="lca"
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                     className="grid md:grid-cols-3 gap-6"
                  >
                     {lcaData.map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-emerald-200 hover:shadow-md transition-all group">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.component}</div>
                           <h4 className="text-lg font-bold text-slate-900 mb-3">{item.material}</h4>
                           <p className="text-sm text-slate-600 leading-relaxed">{item.reason}</p>
                        </div>
                     ))}
                     <div className="md:col-span-3 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 flex items-start gap-3">
                        <Recycle size={20} className="shrink-0 mt-0.5"/>
                        <p>Brass was chosen over Nickel due to lower eco-toxicity (0.25 €/kg vs 14.06 €/kg). SBR tubing was selected for superior chemical resistance over natural rubber.</p>
                     </div>
                  </motion.div>
               )}

               {activeTechTab === 'system' && (
                  <motion.div 
                     key="system"
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  >
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="prose prose-sm text-slate-600">
                           <h4 className="text-lg font-bold text-slate-900 mb-4">Causal Loop Analysis</h4>
                           <p className="mb-4">
                             The causal loop diagram describes the consequences of the pipe endoscopes that apply to the city of Kelowna and some surrounding areas. In particular, public health, stakeholder satisfaction, resident and safety demand, regulatory and municipal pressure, equipment deployment, operational constraints, and contractor acceptance are all taken into account. However, financial aspects, lead remediation actions, and broader infrastructure policy were excluded to focus on the device's immediate impact.
                           </p>
                           <ul className="space-y-4 list-none pl-0">
                              <li className="flex gap-3">
                                 <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">R</div>
                                 <span><strong>Reinforcing Loop</strong></span>
                              </li>
                              <li className="flex gap-3">
                                 <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">B</div>
                                 <span><strong>Balancing Loop</strong></span>
                              </li>
                           </ul>
                        </div>
                        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 overflow-hidden">
                           <img src="/SystemDiagramVisualization.png" alt="System Diagram" className="w-full h-auto rounded-lg shadow-sm" />
                        </div>
                     </div>
                  </motion.div>
               )}

               {activeTechTab === 'risk' && (
                  <motion.div 
                     key="risk"
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                     className="space-y-8"
                  >
                     {/* HEATMAP */}
                     <div className="flex justify-center items-center bg-slate-100 rounded-3xl p-4 border border-slate-200">
                        <img src="/risk-matrix.png" alt="Risk Assessment Matrix" className="max-w-full h-auto rounded-xl shadow-sm" />
                     </div>

                     {/* TABLE */}
                     <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-200 bg-white">
                           <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <AlertTriangle size={20} className="text-emerald-500" />
                              Detailed Risk Register
                           </h4>
                           <p className="text-sm text-slate-500 mt-1">A comprehensive breakdown of identified risks, their classification, and mitigation strategies.</p>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-sm text-left">
                              <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
                                 <tr>
                                    <th className="px-6 py-4 font-bold">ID</th>
                                    <th className="px-6 py-4 font-bold">Risk Description</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold text-center">Score</th>
                                    <th className="px-6 py-4 font-bold text-center">Level</th>
                                    <th className="px-6 py-4 font-bold text-right">Strategy</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                 {detailedRiskData.map((row) => (
                                    <tr key={row.id} className="hover:bg-white transition-colors group">
                                       <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-emerald-600 transition-colors">{row.id}</td>
                                       <td className="px-6 py-4 text-slate-700 font-medium">{row.desc}</td>
                                       <td className="px-6 py-4 text-slate-500"><span className="px-2 py-1 bg-slate-100 rounded text-xs border border-slate-200">{row.cat}</span></td>
                                       <td className="px-6 py-4 text-center font-mono text-slate-500">{row.score}</td>
                                       <td className="px-6 py-4 text-center">
                                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                             row.level === 'High' ? 'bg-red-100 text-red-800' :
                                             row.level === 'Medium' ? 'bg-amber-100 text-amber-800' :
                                             'bg-emerald-100 text-emerald-800'
                                          }`}>
                                             {row.level}
                                          </span>
                                       </td>
                                       <td className="px-6 py-4 text-right">
                                          <span className={`text-xs font-bold uppercase tracking-wider ${
                                             row.strategy === 'Mitigate' ? 'text-blue-600' :
                                             row.strategy === 'Avoid' ? 'text-purple-600' :
                                             'text-slate-500'
                                          }`}>
                                             {row.strategy}
                                          </span>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </section>

      {/* 5. Implementation Plan (Timeline) */}
      <section className="relative">
         <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
         <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 pl-0 md:pl-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm relative z-10">05</span>
            Implementation Strategy
         </h3>
         
         <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative z-10 md:ml-16">
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                     <h4 className="text-xl font-bold text-slate-900 mb-2">Critical Path Analysis</h4>
                     <p className="text-slate-600 mb-4">Total Project Duration: <strong>121.5 Days</strong>.</p>
                     <div className="space-y-3">
                        {timelineEvents.map((event, i) => (
                           <div key={i} className="flex items-center gap-4 text-sm">
                              <span className="w-24 font-bold text-slate-400 text-right">{event.phase}</span>
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }} 
                                    whileInView={{ width: `${(parseInt(event.days)/30)*100}%` }} 
                                    className="h-full bg-blue-500 rounded-full"
                                 />
                              </div>
                              <span className="w-16 font-mono text-slate-500">{event.days}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="w-full md:w-64 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                     <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CalendarClock size={16}/> Key Milestones</h5>
                     <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex justify-between"><span>Design Freeze</span> <span className="text-slate-400">Day 22</span></li>
                        <li className="flex justify-between"><span>Procurement</span> <span className="text-slate-400">Day 35</span></li>
                        <li className="flex justify-between"><span>Testing</span> <span className="text-slate-400">Day 50</span></li>
                        <li className="flex justify-between"><span>Final Signoff</span> <span className="text-slate-400">Day 91</span></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Future Implementation (NEW SECTION) */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><Truck size={24}/></div>
                <h3 className="text-2xl font-bold">Future Implementation Plan</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h4 className="font-bold text-lg mb-4 text-emerald-400">Organizational Structure</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 shrink-0 text-emerald-500"/> <span><strong>Executive Team:</strong> Original 5 members oversee strategy.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 shrink-0 text-emerald-500"/> <span><strong>Operations:</strong> Managing manufacturing and field logistics.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 shrink-0 text-emerald-500"/> <span><strong>Field Technicians:</strong> Two-person crews for on-site deployment.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 shrink-0 text-emerald-500"/> <span><strong>Engineering:</strong> Ongoing R&D for mechanical/electrical refinements.</span></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-emerald-400">Critical Path</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-4xl font-black">121.5</div>
                      <div className="text-sm text-slate-400 uppercase tracking-widest">Days to<br/>Launch</div>
                    </div>
                </div>
              </div>
          </div>
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
      </section>
      
      {/* 7. Final Product Header & Video */}
      <section className="space-y-8 mt-24">
        <div className="flex items-center gap-3">
           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold">07</div>
           <h3 className="text-2xl font-bold text-slate-900">Final Product</h3>
        </div>
        
        <div className="bg-black rounded-3xl p-4 md:p-8 overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10 pointer-events-none"></div>
           <div className="relative z-20 flex items-center justify-center w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/-S5COSTvpfs?si=bE_1Xn_xTzQjF5t-" 
                title="Project Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default function DaniyalPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewingProject, setViewingProject] = useState(null);
  // NEW STATE: For managing the PDF overlay
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [quote, setQuote] = useState(quotesData[0]);
  
  // Pipe Mode States
  const [pipeMode, setPipeMode] = useState(false); 
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'l') {
        setPipeMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    setQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
  }, []);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    if (activeTab !== 'project') {
      setViewingProject(null); 
    }
  }, [activeTab]);

  return (
    <div 
      className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden relative bg-slate-50 text-slate-800"
      onMouseMove={handleMouseMove}
    >
      <ForceFieldBackground />

      {/* RENDER PDF VIEWER IF A PDF IS SELECTED */}
      {selectedPdf && (
        <PDFViewer file={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )}

      {pipeMode && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none bg-black transition-colors duration-700"
          style={{ background: useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, transparent 0%, rgba(2, 6, 23, 0.98) 20%)` }}
        />
      )}

      {!pipeMode && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.05), transparent 80%)` }}
        />
      )}

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]" style={{ scaleX }} />

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
                <span className="relative z-10 capitalize">{tab === 'project' ? 'Projects' : tab}</span>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton><a href={linkedinUrl} target="_blank" rel="noreferrer" className="block p-2 rounded-full bg-slate-100 hover:bg-[#0077b5] hover:text-white transition-colors shadow-sm"><Linkedin size={18} /></a></MagneticButton>
            <MagneticButton><a href={`mailto:${email}`} className="block p-2 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors shadow-sm"><Mail size={18} /></a></MagneticButton>
          </div>
        </div>
      </nav>

      <motion.main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode='wait'>
          
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
                  "{quote.prefix} <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-x bg-[length:200%_auto]">
                    {quote.highlight}
                  </span>"
                </motion.h1>
                <motion.p variants={itemFadeUp} className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">— {quote.author}</motion.p>
                
                <motion.p variants={itemFadeUp} className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                  Hi, I'm <strong className="text-slate-900 font-bold">Daniyal Hashmi</strong>. 
                  I enjoy making things :) Here, you can learn more about me and what I'm working on.
                </motion.p>
                
                <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
                  <MagneticButton onClick={() => setActiveTab('project')} className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                    View Design Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                  {/* UPDATED: Button now opens the PDF viewer instead of downloading */}
                  <MagneticButton onClick={() => setSelectedPdf(pdfUrl)}>
                    <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 border border-white/50 rounded-2xl font-semibold shadow-lg hover:border-emerald-200 hover:text-emerald-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      <Eye size={18} className="group-hover:scale-110 transition-transform"/> View Full Report
                    </button>
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
                      <InterestTag icon={<Activity size={16}/>} label="Optimization" />
                   </div>
                </div>
                <div className="md:col-span-8 order-1 md:order-2">
                   <h2 className="text-4xl font-black text-slate-900 mb-6">About Me</h2>
                   <div className="prose prose-lg prose-slate text-slate-600 bg-white/60 p-8 rounded-3xl border border-white shadow-sm backdrop-blur-sm leading-relaxed">
                      <p className="mb-4">I am currently an Engineering Student at the University of British Columbia. I chose to study engineering because I am passionate about designing and innovating. I love the process of creating things that are not just functional, but meaningful. I hope to make solutions that have a tangible, positive impact on people's lives, are innovative, and are worthwhile. My ultimate goal is to have a meaningful impact in any way I can.</p>
                      <p className="mb-4">Other than designing, CAD, and other engineering related topics, I enjoy hiking, walking on trails and other outdoor activities. In addition, I like playing soccer, watching Formula 1 races, documentaries, and exploring other interesting subjects. I also spend my free time learning different skills such as programming, game development, and much more.</p>
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
                      <TimelineItem date="2025 - Present" title="Bachelor of Applied Science (Engineering)" subtitle="University of British Columbia - Okanagan" desc="Engineering Student. Studying mechanical engineering with a specialization in mechatronics" current />
                      <TimelineItem date="2022 - 2025" title="High School Diploma" subtitle="South Huron District High School, ON" desc="Honour Roll | Ontario Scholar." />
                      <TimelineItem date="2012 - 2022" title="Primary Education" subtitle="International School of Choueifat - Khalifa City" desc="Built a strong foundation in core subjects" />
                  </div>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Briefcase size={20}/></div>Experience & Involvement</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <ExperienceCard role="Staff Cadet" org="Rocky Mountain Cadet Training Centre" date="Summer 2024" type="Work Experience" />
                    <ExperienceCard role="Student Page" org="Huron County Public Library - Exeter Branch" date="2024 - 2025" type="Work Experience" />
                    <ExperienceCard role="Company Sergeant Major" subRole="Master Warrant Officer" org="Cadets Canada" date="2021 - 2024" type="Leadership" />
                    <ExperienceCard role="Club Executive" org="Eco Exeter" date="2023 - 2024" type="Leadership" />
                    <ExperienceCard role="Volunteer" org="Huron County Immigration Partnership" date="2023" type="Volunteer" />
                    <ExperienceCard role="Club Volunteer" org="Library Chess & Coding Club" date="2022 - 2023" type="Volunteer" />
                 </div>
              </section>
              <section className="bg-slate-900 text-white rounded-3xl p-10 text-center shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  <p className="text-slate-300 mb-8 max-w-xl mx-auto">I am always looking for opportunities to collaborate on complex engineering problems and innovative design projects.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200"><Linkedin size={20}/> LinkedIn</a>
                      <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-lg hover:scale-105 transform duration-200"><Mail size={20}/> Email Me</a>
                  </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'project' && (
            <motion.div key="project" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              {viewingProject === 'lead-detection' ? (
                <LeadDetectionProject onBack={() => setViewingProject(null)} />
              ) : (
                <ProjectsGallery onSelectProject={setViewingProject} onViewPdf={setSelectedPdf} />
              )}
            </motion.div>
          )}

          {activeTab === 'reflection' && (
            <motion.div 
              key="reflection" 
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} 
              className="max-w-5xl mx-auto py-12"
            >
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-slate-900">Personal Reflection</h2>
                  <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
               </div>

               <div className="space-y-12">
                  {reflectionContent.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute -right-6 -top-6 text-[12rem] font-black text-slate-50 group-hover:text-emerald-50/50 transition-colors pointer-events-none select-none z-0">
                        0{i + 1}
                      </div>

                      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="shrink-0">
                           <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                              {item.icon}
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 group-hover:text-emerald-700 transition-colors">
                             {item.title}
                           </h3>
                           <div className="prose prose-lg text-slate-600 leading-relaxed">
                             {item.content}
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200/50 bg-white/50 backdrop-blur-md relative z-10">
        <p className="mb-2">© 2025 Daniyal Hashmi</p>
        <p>APSC 169 • School of Engineering • UBC Okanagan</p>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

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
        <motion.div animate={{ opacity: isHovered ? 0 : 1 }} className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-3">{step.icon}</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 0{step.id}</span>
          <h4 className="text-sm font-bold text-slate-700 text-center">{step.title}</h4>
        </motion.div>

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
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
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

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div variants={itemFadeUp} whileHover={{ y: -5 }} className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-emerald-500/30">{icon}</div>
      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm font-medium">{desc}</p>
    </motion.div>
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

function InterestTag({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all">
      <div className="text-emerald-600 mb-2 p-2 bg-emerald-50 rounded-full">{icon}</div>
      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</span>
    </div>
  );
}