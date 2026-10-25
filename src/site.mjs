// Site-wide settings. Change the name here and it updates everywhere.
export const site = {
  name: 'CodeShala',
  tagline: 'Learn to code, one small lesson at a time.',
  description:
    'Free, beginner-friendly tutorials for Python, C, Java and JavaScript with runnable examples.',
};

// Order here is the order used in menus and on the home page.
export const languages = [
  {
    id: 'python',
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
  { name: 'Computer Organization & Architecture' },
  { name: 'Digital Logic', track: 'dl' },
  { name: 'Compiler Design' },
  { name: 'Discrete Mathematics' },
  { name: 'Engineering Mathematics' },
  { name: 'General Aptitude' },
];

export const tracks = [...languages, ...topics];
