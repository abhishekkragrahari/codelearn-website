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
  },
];

export const tracks = [...languages, ...topics];
