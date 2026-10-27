// Site-wide settings. Change the name here and it updates everywhere.
export const site = {
  name: 'GateShala',
  tagline: 'GATE notes, practice questions and coding tutorials',
  description:
    'Free GATE preparation for CS, DA, CE, ME, EE and EC: subject-wise notes, key formulas and GATE-style practice questions with solutions, plus Python, C, Java, JavaScript and DSA tutorials.',
  // Public address, used for canonical links, the sitemap and robots.txt.
  url: 'https://www.gateshala.com/',
  // Google AdSense publisher ID; its script is added to every page and ads.txt is generated from it.
  adsenseClient: 'ca-pub-5062131569834822',
};

// Order here is the order used in menus and on the home page.
export const languages = [
  {
    id: 'python',
    tagline: 'Simple and powerful. Great for beginners.',
    name: 'Python',
    short: 'Py',
    color: '#3b82f6',
    blurb: 'Readable, versatile and a favourite first language. Great for scripting, data and science.',
    intro:
      'Python reads almost like plain English, which makes it a gentle first language. ' +
      'These lessons take you from printing your first line to writing your own functions.',
  },
  {
    id: 'c',
    tagline: 'Fast, close to hardware. Build strong fundamentals.',
    name: 'C',
    short: 'C',
    color: '#64748b',
    blurb: 'Small, fast and close to the hardware. Learn how memory and programs really work.',
    intro:
      'C is the language underneath operating systems, embedded devices and many other languages. ' +
      'Learning it teaches you how a computer actually runs your code. The track covers the GATE "Programming in C" ' +
      'syllabus, and most lessons end with GATE-style questions whose programs were compiled and run to check every answer.',
  },
  {
    id: 'java',
    tagline: 'Object-oriented and widely used in industry.',
    name: 'Java',
    short: 'Jv',
    color: '#f97316',
    blurb: 'Strongly typed and object-oriented. Powers Android apps and large back-end systems.',
    intro:
      'Java is a strongly typed, object-oriented language that runs on almost any machine through the JVM. ' +
      'These lessons cover the building blocks you need before classes and objects.',
  },
  {
    id: 'javascript',
    tagline: 'Power the web. Run in every browser.',
    name: 'JavaScript',
    short: 'JS',
    color: '#eab308',
    blurb: 'The language of the web. Runs in every browser, so you can try it right here.',
    intro:
      'JavaScript runs in every web browser, so every example on these pages can be run right here ' +
      'with the Run button. No installation needed.',
    runnable: true,
  },
];

// Topic tracks are not programming languages: their lessons contain code in
// several languages (shown as tabs), so they get no playground or highlighter of their own.
export const topics = [
  {
    id: 'dsa',
    tagline: 'Master data structures and algorithms.',
    name: 'Data Structures',
    short: 'DS',
    color: '#10b981',
    blurb: 'Arrays to graphs, sorting to dynamic programming, with Java, Python and C code and GATE-style practice questions.',
    intro:
      'Data structures and algorithms are the toolkit behind every efficient program, and a core GATE CS subject. ' +
      'Each lesson explains one idea with figures, gives the code in Java, Python and C, and ends with GATE-style practice questions.',
    topic: true,
    gate: true,
    nav: true,
    cardTitle: 'Data Structures & Algorithms',
    cardMeta: 'Java, Python & C · GATE-style questions',
  },
  {
    id: 'os',
    name: 'Operating Systems',
    short: 'OS',
    color: '#8b5cf6',
    blurb: 'Processes, CPU scheduling, synchronization, deadlocks, memory, virtual memory, file systems and disk scheduling.',
    intro:
      'Operating Systems is one of the highest-weighted GATE CS subjects. These lessons explain each topic with figures and ' +
      'worked examples, use small simulators to show exactly how scheduling, paging and disk algorithms behave, and end with ' +
      'GATE-style questions whose numerical answers are recomputed by a program.',
    topic: true,
    gate: true,
    cardMeta: 'Simulations · worked examples · GATE-style questions',
  },
  {
    id: 'dbms',
    name: 'Databases (DBMS)',
    short: 'DBMS',
    color: '#0ea5e9',
    blurb: 'ER model, relational algebra, SQL, functional dependencies, normalization, transactions, concurrency control and indexing.',
    intro:
      'Databases is a core GATE CS subject. These lessons go from the ER model and relational algebra to SQL, normal forms, ' +
      'transactions and B+ trees. Every SQL example runs on a real SQLite database when the site is built, so the result ' +
      'tables you see are exact, and the algorithms (attribute closure, candidate keys, serializability) come with small programs.',
    topic: true,
    gate: true,
    cardMeta: 'Real SQL results · worked examples · GATE-style questions',
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    short: 'CN',
    color: '#f97316',
    blurb: 'Layering, switching, error detection, flow control, MAC protocols, IP addressing and routing, TCP and UDP, and application protocols.',
    intro:
      'Computer Networks is a numerical-heavy GATE CS subject. These lessons explain each layer with figures, work through ' +
      'the standard calculations (delays, efficiency, window sizes, subnets, fragmentation, congestion windows) step by step, ' +
      'and use small Python programs to compute CRCs, checksums, subnets and routes, so every number shown is checked.',
    topic: true,
    gate: true,
    cardMeta: 'Step-by-step numericals · simulations · GATE-style questions',
  },
  {
    id: 'toc',
    name: 'Theory of Computation',
    short: 'TOC',
    color: '#ec4899',
    blurb: 'Finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines and undecidability.',
    intro:
      'Theory of Computation studies what machines can and cannot do. These lessons build the Chomsky hierarchy from the ' +
      'bottom up, with a state diagram for every automaton and small Python simulators for DFAs, NFAs, PDAs and Turing ' +
      'machines, so every claim about which strings are accepted is checked by running the machine.',
    topic: true,
    gate: true,
    cardMeta: 'State diagrams · machine simulators · GATE-style questions',
  },
  {
    id: 'dl',
    name: 'Digital Logic',
    short: 'DL',
    color: '#14b8a6',
    blurb: 'Number systems, 2\'s complement and IEEE 754, Boolean algebra, K-maps, combinational circuits, flip-flops and counters.',
    intro:
      'Digital Logic is a short but scoring GATE CS subject. These lessons cover number representation, Boolean algebra and ' +
      'minimization, and combinational and sequential circuits, with truth tables, K-map groupings and counter sequences ' +
      'generated by small Python programs, so every table and count shown is exact.',
    topic: true,
    gate: true,
    cardMeta: 'Truth tables · K-maps · circuit simulations · GATE-style questions',
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture',
    short: 'COA',
    color: '#6366f1',
    blurb: 'Performance, instruction sets and addressing modes, the ALU, data path and control unit, pipelining and hazards, caches and memory, and I/O.',
    intro:
      'Computer Organization and Architecture is one of the most numerical GATE CS subjects. These lessons explain how a CPU ' +
      'executes instructions, how pipelines and caches make it fast, and how it talks to memory and devices, with small ' +
      'simulators for Booth multiplication, pipelines and caches, so every cycle count and hit count shown is computed.',
    topic: true,
    gate: true,
    cardTitle: 'Computer Organization',
    cardMeta: 'Pipeline and cache simulators · numericals · GATE-style questions',
  },
  {
    id: 'cd',
    name: 'Compiler Design',
    short: 'CD',
    color: '#a855f7',
    blurb: 'Lexical analysis, LL and LR parsing, syntax-directed translation, intermediate code, runtime environments, and optimization with data-flow analysis.',
    intro:
      'Compiler Design follows a program through every phase of a compiler. These lessons come with small working pieces of ' +
      'a compiler in Python: a scanner, FIRST/FOLLOW and LL(1) table builders, an LR(0)/SLR item-set builder, a three-address ' +
      'code generator, and liveness analysis, so every set, table and count in the questions is computed.',
    topic: true,
    gate: true,
    cardMeta: 'Working compiler pieces · parsing tables · GATE-style questions',
  },
  {
    id: 'dm',
    name: 'Discrete Mathematics',
    short: 'DM',
    color: '#84cc16',
    blurb: 'Propositional and first-order logic, sets, relations, functions, lattices, groups, combinatorics, recurrences and graph theory.',
    intro:
      'Discrete Mathematics is the mathematical foundation of computer science and a large part of the GATE paper. These ' +
      'lessons explain every syllabus topic with worked examples, and check the counting formulas (relations, functions, ' +
      'derangements, colourings) by brute-force enumeration with small programs.',
    topic: true,
    gate: true,
    cardMeta: 'Worked examples · brute-force checks · GATE-style questions',
  },
  {
    id: 'em',
    name: 'Engineering Mathematics',
    short: 'EM',
    color: '#f59e0b',
    blurb: 'Linear algebra, calculus, probability and statistics, vector calculus, differential equations, Laplace transforms, complex variables and numerical methods.',
    intro:
      'Engineering Mathematics covers the mathematics of every GATE paper: linear algebra, calculus and probability (all papers), ' +
      'plus vector calculus, differential equations, Laplace transforms, Fourier series and PDEs, complex variables and ' +
      'numerical methods (CE, ME, EE and EC). Every worked example is checked by a small program, so the numbers in the ' +
      'lessons and answers can be trusted.',
    topic: true,
    gate: true,
    cardMeta: 'Exact computations · worked examples · GATE-style questions',
  },
  {
    id: 'ga',
    name: 'General Aptitude',
    short: 'GA',
    color: '#0d9488',
    blurb: 'Numbers and percentages, ratios, work, speed, interest, data interpretation, logical and spatial reasoning, and verbal ability.',
    intro:
      'General Aptitude is worth 15 marks in every GATE paper. These lessons give the standard method for each question type, ' +
      'with worked examples whose numbers are computed by small programs, and a section on English usage and reading ' +
      'comprehension with original passages.',
    topic: true,
    gate: true,
    cardMeta: 'Shortcuts · worked examples · GATE-style questions',
  },
  // GATE Data Science and Artificial Intelligence (DA) subjects.
  {
    id: 'ps',
    name: 'Probability & Statistics',
    short: 'PS',
    color: '#e11d48',
    blurb: 'Counting, conditional probability and Bayes, random variables and distributions, the central limit theorem, confidence intervals and hypothesis tests.',
    intro:
      'Probability and Statistics is the largest mathematics section of GATE DA. These lessons go from counting and Bayes\' ' +
      'theorem to the normal, t and chi-squared distributions, confidence intervals and z, t and chi-squared tests. Every ' +
      'probability is checked by exact enumeration or a small program, so the numbers in the lessons and answers can be trusted.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'Exact computations · worked examples · GATE-style questions',
  },
  {
    id: 'la',
    name: 'Linear Algebra',
    short: 'LA',
    color: '#2563eb',
    blurb: 'Vector spaces and subspaces, rank and linear systems, projection, orthogonal and idempotent matrices, quadratic forms, eigenvalues, LU and SVD.',
    intro:
      'Linear Algebra is the language of machine learning and a core GATE DA subject. These lessons explain vector spaces, ' +
      'rank, special matrices, quadratic forms, eigenvalues and the LU and singular value decompositions, with small ' +
      'programs in plain Python (exact fractions where possible) that check every matrix and number shown.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'Exact matrix computations · worked examples · GATE-style questions',
  },
  {
    id: 'calc',
    name: 'Calculus & Optimization',
    short: 'CO',
    color: '#ea580c',
    blurb: 'Functions of one variable, limits, continuity and differentiability, Taylor series, maxima and minima, and single-variable optimization.',
    intro:
      'Calculus and Optimization in GATE DA is about functions of a single variable: limits, continuity, derivatives, Taylor ' +
      'series and finding maxima and minima. These lessons work through each idea with examples, and check every limit, ' +
      'derivative and optimum numerically with small programs.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'Numerical checks · worked examples · GATE-style questions',
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    short: 'ML',
    color: '#7c3aed',
    blurb: 'Regression, logistic regression, k-NN, naive Bayes, LDA, SVM, decision trees, bias-variance, cross-validation, neural networks, clustering and PCA.',
    intro:
      'Machine Learning is the heart of GATE DA. These lessons explain every supervised and unsupervised method in the ' +
      'syllabus from first principles, and implement each one in a few lines of plain Python (no libraries), so you can see ' +
      'exactly how regression weights, tree splits, cluster assignments and principal components are computed.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'From-scratch implementations · worked examples · GATE-style questions',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    short: 'AI',
    color: '#0891b2',
    blurb: 'Uninformed, informed and adversarial search, propositional and predicate logic, and reasoning under uncertainty with Bayesian networks.',
    intro:
      'The AI section of GATE DA covers search, logic and reasoning under uncertainty. These lessons draw every search tree ' +
      'and network, and come with small Python programs for BFS, A*, minimax with alpha-beta pruning, resolution, and exact ' +
      'and sampling-based inference, so every expanded node and probability shown is computed.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'Search and inference programs · worked examples · GATE-style questions',
  },
  {
    id: 'dw',
    name: 'Data Warehousing',
    short: 'DW',
    color: '#65a30d',
    blurb: 'Data types and data preparation (normalization, discretization, sampling, compression), multidimensional schemas, concept hierarchies, measures and OLAP.',
    intro:
      'GATE DA pairs databases with data warehousing. These lessons cover how data is cleaned and transformed before ' +
      'analysis, how a warehouse is modelled with star and snowflake schemas, and how OLAP operations work, with SQL that ' +
      'runs on a real SQLite database when the site is built.',
    topic: true,
    gate: true,
    da: true,
    cardMeta: 'Real SQL results · worked examples · GATE-style questions',
  },
  // GATE CS exam guide: pattern, syllabus, study plans, formula sheet and mock tests.
  {
    id: 'prep',
    name: 'GATE CS Exam Guide',
    short: 'EG',
    color: '#4f46e5',
    blurb: 'Exam pattern and marking scheme, the syllabus, previous year papers, 6-month and 3-month study plans, a formula sheet and a free mock test.',
    intro:
      'Everything around the subjects: how the GATE CS paper is built and marked, the full syllabus with links to every lesson, ' +
      'where to get official previous year papers and how to analyse them, study plans for six and three months, a formula sheet ' +
      'for revision and a free mock test whose numerical answers are recomputed by a program.',
    topic: true,
    gate: true,
    cardMeta: 'Pattern · syllabus · study plans · mock test',
    indexTitles: ['GATE CS 2027 Exam Guide: Pattern, Syllabus, Study Plan', 'GATE CS 2027 Exam Guide'],
  },
  // GATE core-branch papers: one track per paper, one lesson per syllabus subject.
  {
    id: 'ce',
    name: 'Civil Engineering',
    short: 'CE',
    color: '#b45309',
    blurb: 'Structural, geotechnical, water resources, environmental and transportation engineering, and geomatics.',
    intro:
      'The GATE CE paper tests civil engineering. Each lesson covers one part of the syllabus: the detailed list of topics, the key ' +
      'concepts and formulas, a worked example, and GATE-style questions whose numerical answers are recomputed by a program. ' +
      'Engineering Mathematics and General Aptitude, common to all papers, have their own tracks.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    cardMeta: 'Detailed syllabus · key formulas · GATE-style questions',
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    short: 'ME',
    color: '#475569',
    blurb: 'Engineering mechanics, strength of materials, machines and design, fluids, thermal sciences, manufacturing and industrial engineering.',
    intro:
      'The GATE ME paper tests mechanical engineering. Each lesson covers one part of the syllabus: the detailed list of topics, the key ' +
      'concepts and formulas, a worked example, and GATE-style questions whose numerical answers are recomputed by a program. ' +
      'Engineering Mathematics and General Aptitude, common to all papers, have their own tracks.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    cardMeta: 'Detailed syllabus · key formulas · GATE-style questions',
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    short: 'EE',
    color: '#ca8a04',
    blurb: 'Circuits, electromagnetic fields, signals, machines, power systems, control, measurements, electronics and power electronics.',
    intro:
      'The GATE EE paper tests electrical engineering. Each lesson covers one part of the syllabus: the detailed list of topics, the key ' +
      'concepts and formulas, a worked example, and GATE-style questions whose numerical answers are recomputed by a program. ' +
      'Engineering Mathematics and General Aptitude, common to all papers, have their own tracks.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    cardMeta: 'Detailed syllabus · key formulas · GATE-style questions',
  },
  {
    id: 'ec',
    name: 'Electronics & Communication',
    short: 'EC',
    color: '#db2777',
    blurb: 'Networks, signals and systems, devices, analog and digital circuits, control, communications and electromagnetics.',
    intro:
      'The GATE EC paper tests electronics and communication engineering. Each lesson covers one part of the syllabus: the detailed list of topics, the key ' +
      'concepts and formulas, a worked example, and GATE-style questions whose numerical answers are recomputed by a program. ' +
      'Engineering Mathematics and General Aptitude, common to all papers, have their own tracks.',
    topic: true,
    gate: true,
    paper: 'GATE EC',
    cardMeta: 'Detailed syllabus · key formulas · GATE-style questions',
  },
  // GATE ME subject tracks: one track per syllabus subject, one lesson per topic.
  {
    id: 'me-mech',
    name: 'Engineering Mechanics',
    short: 'EM',
    color: '#64748b',
    blurb: 'Free-body diagrams, equilibrium, friction, trusses, virtual work, kinematics and dynamics of rigid bodies, impulse, momentum and energy.',
    intro:
      'Engineering Mechanics for GATE Mechanical and Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME and CE',
    branch: 'me',
    alsoBranch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-som',
    name: 'Strength of Materials',
    short: 'SM',
    color: '#0f766e',
    blurb: 'Stress and strain, elastic constants, Mohr circle, thin cylinders, SFD and BMD, bending, shear, deflection, torsion, springs, columns and strain energy.',
    intro:
      'Strength of Materials for GATE Mechanical and Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME and CE',
    branch: 'me',
    alsoBranch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-tom',
    name: 'Theory of Machines & Vibrations',
    short: 'TV',
    color: '#7c3aed',
    blurb: 'Mechanisms and degrees of freedom, velocity and acceleration, cams, gears and gear trains, flywheels, governors, balancing and vibrations.',
    intro:
      'Theory of Machines & Vibrations for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-md',
    name: 'Machine Design',
    short: 'MD',
    color: '#b91c1c',
    blurb: 'Static failure theories, fatigue and endurance limit, bolted and welded joints, shafts and keys, bearings, gears, brakes and clutches.',
    intro:
      'Machine Design for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-fm',
    name: 'Fluid Mechanics',
    short: 'FM',
    color: '#0284c7',
    blurb: 'Fluid properties and statics, buoyancy, kinematics, Bernoulli and momentum equations, pipe flow, boundary layers, dimensional analysis and turbomachines.',
    intro:
      'Fluid Mechanics for GATE Mechanical and Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME and CE',
    branch: 'me',
    alsoBranch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-td',
    name: 'Thermodynamics',
    short: 'TD',
    color: '#ea580c',
    blurb: 'Laws of thermodynamics, entropy, availability, properties of steam, Rankine, gas power and refrigeration cycles, psychrometry and IC engines.',
    intro:
      'Thermodynamics for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-ht',
    name: 'Heat Transfer',
    short: 'HT',
    color: '#dc2626',
    blurb: 'Conduction, fins, transient conduction, forced and natural convection, radiation and heat exchangers (LMTD and effectiveness-NTU).',
    intro:
      'Heat Transfer for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-mfg',
    name: 'Materials & Manufacturing',
    short: 'MF',
    color: '#a16207',
    blurb: 'Engineering materials, casting, forming, joining, machining and tool life, non-traditional machining, metrology and computer integrated manufacturing.',
    intro:
      'Materials & Manufacturing for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'me-ie',
    name: 'Industrial Engineering',
    short: 'IE',
    color: '#4d7c0f',
    blurb: 'Forecasting, inventory models, linear programming, transportation and assignment, queueing, PERT and CPM, scheduling and quality control.',
    intro:
      'Industrial Engineering for GATE Mechanical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE ME',
    branch: 'me',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  // GATE CE subject tracks (engineering mechanics, solid mechanics and fluid mechanics are shared with ME).
  {
    id: 'ce-str',
    name: 'Structural Analysis',
    short: 'SA',
    color: '#9333ea',
    blurb: 'Static and kinematic indeterminacy, influence lines, force and displacement methods, slope deflection, moment distribution, arches, cables and matrix methods.',
    intro:
      'Structural Analysis for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-rcc',
    name: 'Concrete & Steel Structures',
    short: 'RC',
    color: '#78716c',
    blurb: 'Concrete technology, limit state design of beams, slabs and columns, shear and bond, prestressed concrete, and design of steel tension, compression and flexural members and connections.',
    intro:
      'Concrete & Steel Structures for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-geo',
    name: 'Geotechnical Engineering',
    short: 'GT',
    color: '#a16207',
    blurb: 'Soil properties and classification, permeability and seepage, effective stress, consolidation, compaction, shear strength, earth pressure, slope stability and foundations.',
    intro:
      'Geotechnical Engineering for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-wr',
    name: 'Water Resources Engineering',
    short: 'WR',
    color: '#0369a1',
    blurb: 'Open channel flow, hydraulic jump, hydrology, unit hydrographs, flood routing, groundwater and wells, and irrigation engineering.',
    intro:
      'Water Resources Engineering for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-env',
    name: 'Environmental Engineering',
    short: 'EV',
    color: '#15803d',
    blurb: 'Water demand and quality, water treatment, wastewater characteristics and BOD, sewage treatment, air pollution, noise and municipal solid waste.',
    intro:
      'Environmental Engineering for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-tr',
    name: 'Transportation Engineering',
    short: 'TR',
    color: '#c2410c',
    blurb: 'Highway geometric design, pavement materials, flexible and rigid pavement design, traffic flow, capacity and signal design.',
    intro:
      'Transportation Engineering for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ce-gm',
    name: 'Geomatics Engineering',
    short: 'GM',
    color: '#4338ca',
    blurb: 'Distance and angle measurement, levelling, traversing, curves, tacheometry, errors, photogrammetry, remote sensing and GPS.',
    intro:
      'Geomatics Engineering for GATE Civil Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE CE',
    branch: 'ce',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  // GATE EE subject tracks: one track per syllabus subject, one lesson per topic.
  {
    id: 'ee-ckt',
    name: 'Electric Circuits',
    short: 'EC',
    color: '#2563eb',
    blurb: 'Network theorems, transient analysis, sinusoidal steady state and phasors, resonance, three-phase circuits and two-port networks.',
    intro:
      'Electric Circuits for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-emf',
    name: 'Electromagnetic Fields',
    short: 'EF',
    color: '#7c3aed',
    blurb: 'Coulomb and Gauss laws, electric potential, capacitance, Biot-Savart and Ampere laws, inductance, Faraday law and Maxwell equations.',
    intro:
      'Electromagnetic Fields for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-ss',
    name: 'Signals & Systems',
    short: 'SS',
    color: '#0891b2',
    blurb: 'Signal types, LTI systems and convolution, Fourier series and transform, Laplace and z-transforms, and sampling.',
    intro:
      'Signals & Systems for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-cs',
    name: 'Control Systems',
    short: 'CS',
    color: '#16a34a',
    blurb: 'Transfer functions and block diagrams, time response, steady-state error, Routh stability, root locus, Bode and Nyquist plots, compensators and state space.',
    intro:
      'Control Systems for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-mac',
    name: 'Electrical Machines',
    short: 'EM',
    color: '#ca8a04',
    blurb: 'Magnetic circuits, single and three-phase transformers, DC machines, induction motors and synchronous machines.',
    intro:
      'Electrical Machines for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-ps',
    name: 'Power Systems',
    short: 'PS',
    color: '#dc2626',
    blurb: 'Transmission line parameters and performance, per-unit system, load flow, faults, protection, stability and economic dispatch.',
    intro:
      'Power Systems for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-meas',
    name: 'Electrical Measurements',
    short: 'MS',
    color: '#64748b',
    blurb: 'Indicating instruments, bridges, measurement of power and energy, instrument transformers, oscilloscopes and errors.',
    intro:
      'Electrical Measurements for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-elec',
    name: 'Analog & Digital Electronics',
    short: 'AD',
    color: '#db2777',
    blurb: 'Diodes and rectifiers, BJT and MOSFET amplifiers, op-amps, oscillators, logic gates, combinational and sequential circuits, and data converters.',
    intro:
      'Analog & Digital Electronics for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
  {
    id: 'ee-pe',
    name: 'Power Electronics',
    short: 'PE',
    color: '#ea580c',
    blurb: 'Power semiconductor devices, controlled rectifiers, DC-DC converters, inverters with PWM, and AC voltage controllers.',
    intro:
      'Power Electronics for GATE Electrical Engineering, one topic per lesson: the theory in plain words, the formulas, a solved example, ' +
      'and GATE-style questions (MCQ, MSQ and NAT) whose numerical answers are recomputed by a program when the site is built.',
    topic: true,
    gate: true,
    paper: 'GATE EE',
    branch: 'ee',
    cardMeta: 'Topic-wise lessons · solved examples · GATE-style questions',
  },
];

// The GATE CS syllabus, in the order shown on the GATE hub page. `track` links a
// subject to a track that already exists; subjects without one show "coming soon".
export const gateSubjects = [
  { name: 'Programming in C', track: 'c' },
  { name: 'Data Structures & Algorithms', track: 'dsa' },
  { name: 'Operating Systems', track: 'os' },
  { name: 'Databases (DBMS)', track: 'dbms' },
  { name: 'Computer Networks', track: 'cn' },
  { name: 'Theory of Computation', track: 'toc' },
  { name: 'Computer Organization & Architecture', track: 'coa' },
  { name: 'Digital Logic', track: 'dl' },
  { name: 'Compiler Design', track: 'cd' },
  { name: 'Discrete Mathematics', track: 'dm' },
  { name: 'Engineering Mathematics', track: 'em' },
  { name: 'General Aptitude', track: 'ga' },
];

// The GATE DA (Data Science and Artificial Intelligence) syllabus, shown on gate-da.html.
// Programming, DSA, databases and aptitude reuse the GATE CS tracks.
export const gateDaSubjects = [
  { name: 'Probability & Statistics', track: 'ps' },
  { name: 'Linear Algebra', track: 'la' },
  { name: 'Calculus & Optimization', track: 'calc' },
  { name: 'Programming in Python', track: 'python' },
  { name: 'Data Structures & Algorithms', track: 'dsa' },
  { name: 'Database Management (DBMS)', track: 'dbms' },
  { name: 'Data Warehousing', track: 'dw' },
  { name: 'Machine Learning', track: 'ml' },
  { name: 'Artificial Intelligence', track: 'ai' },
  { name: 'General Aptitude', track: 'ga' },
];

export const tracks = [...languages, ...topics];
