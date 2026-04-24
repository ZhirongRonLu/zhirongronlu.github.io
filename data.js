// Content for Zhirong Lu's site
window.SITE_DATA = {
  name: "Zhirong Lu",
  nickname: "Ron",
  location: "Los Angeles, CA",
  email: "luzhirongnj@gmail.com",
  phone: "+1 (310) 948-8402",
  github: "ZhirongRonLu",
  linkedin: "zhirong-lu-370621302",

  headlines: [
    "building evals for frontier AI.",
    "probing where world models break.",
    "turning research ideas into rigorous code.",
    "closing spatial-reasoning gaps in V-JEPA2.",
  ],

  tagline:
    "I'm a CS undergrad at UCLA and a machine learning researcher in the Visual Machines Group. I build evaluation frameworks and fine-tune world models — most recently on NVIDIA Cosmos and Meta V-JEPA2 — to find where frontier systems are confidently wrong, then design the experiments that move them forward.",

  now: [
    {
      tag: "Research",
      title: "WorldBench → V-JEPA2",
      body: "Closing spatial-reasoning gaps in V-JEPA2 via object-centric modifications and targeted data pipelines.",
    },
    {
      tag: "Reading",
      title: "World models & test-time compute",
      body: "Currently: Genie 3, Cosmos papers, and the latest test-time compute scaling work from the Alignment Forum.",
    },
    {
      tag: "Looking for",
      title: "Summer 2026 research internships",
      body: "AI labs focused on world models, evals, alignment, or interpretability. Open to full-time post-grad.",
    },
  ],

  research: [
    {
      date: "Dec 2024 — Present",
      title: "Machine Learning Researcher",
      org: "Visual Machines Group, UCLA (Prof. Kadambi's Computer Vision Lab)",
      bullets: [
        "Architected WorldBench, a rigorous suite evaluating frontier world models' physics-reasoning capabilities; systematically identified where models are confidently wrong. Co-authored paper.",
        "Probed capability limits of NVIDIA Cosmos by fine-tuning diffusion and autoregressive variants; applied test-time compute strategies to expose failure modes across novel scenarios.",
        "Investigating object-centric modifications to V-JEPA2 to close identified spatial-reasoning gaps; designing targeted data pipelines to address specific architectural limitations.",
      ],
      link: { href: "https://world-bench.github.io", label: "world-bench.github.io" },
    },
    {
      date: "Jan 2024 — Jun 2024",
      title: "Physics Researcher",
      org: "Prof. Kamaha's Lab, UCLA",
      bullets: [
        "Designed ML algorithms for automated PMT calibration in particle physics experiments, casting detector behavior as supervised prediction tasks.",
        "Validated pipeline against Geant4 C++ simulations of germanium detector performance.",
      ],
    },
  ],

  experience: [
    {
      date: "Jun 2024 — Sep 2024",
      title: "AI Research Intern",
      org: "Ericsson",
      bullets: [
        "Architected a PyTorch-based deep mixture density network for automated HSL tuning; deployed production-ready code integrated with existing firmware pipelines.",
        "Achieved 70% improvement in model precision via principled architecture design and numerical stability engineering (log-likelihood stabilization).",
        "Fine-tuned GPT-2 to convert model outputs into natural language tuning recommendations, reducing experimental run time by ~20%.",
      ],
    },
  ],

  projects: [
    {
      num: "01",
      title: "CoLA",
      subtitle: "Agentic Research & Coding Assistant",
      desc:
        "LLM-driven autonomous agent integrating computer vision algorithms. Designed a VLC benchmark to rigorously evaluate agent performance against baselines using test-time compute strategies.",
      stack: ["Python", "PyTorch", "LLMs", "Agents", "CV"],
      accent: "sienna",
    },
    {
      num: "02",
      title: "Diffusion Model Eval Platform",
      subtitle: "Full-stack evaluation tooling",
      desc:
        "Full-stack platform for local Flux model deployment with instrumented output collection, supporting systematic cross-configuration evaluation of generated results.",
      stack: ["Flux", "Diffusion", "Full-stack", "Eval"],
      accent: "olive",
    },
    {
      num: "03",
      title: "WorldBench",
      subtitle: "Physics-reasoning benchmark for world models",
      desc:
        "Evaluation suite that systematically probes frontier world models on physics-reasoning tasks — surfacing the regimes where they're confidently wrong.",
      stack: ["Benchmarks", "World Models", "Python"],
      link: "https://world-bench.github.io",
      accent: "ink",
    },
    {
      num: "04",
      title: "HSL Tuning Network",
      subtitle: "Production ML at Ericsson",
      desc:
        "Deep mixture density network + GPT-2 recommendation layer shipped into firmware pipelines. 70% precision gain, ~20% experimental time saved.",
      stack: ["PyTorch", "MDN", "GPT-2", "Production"],
      accent: "dun",
    },
  ],

  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Los Angeles",
      meta: "2023 — Expected Spring 2027 · GPA 3.936",
      coursework:
        "Artificial Intelligence, Deep Learning, Computer Vision, World Models, Algorithms, Theoretical CS, Statistics.",
    },
  ],

  awards: [
    { title: "Member, Upsilon Pi Epsilon (CS Honor Society)", year: "2024" },
    { title: "Dean's Honors List — four quarters", year: "2023—24" },
    { title: "Research Scholarship Recipient", year: "2024" },
  ],

  skills: [
    {
      group: "Languages",
      items: ["Python", "C / C++ (8 yrs)", "R (4 yrs)", "Java", "JavaScript"],
    },
    {
      group: "ML / AI",
      items: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "Pandas", "NumPy"],
    },
    {
      group: "Models",
      items: ["NVIDIA Cosmos", "Meta V-JEPA2", "GPT-2", "Flux", "Diffusion / AR"],
    },
    {
      group: "Platforms",
      items: ["AWS", "GCP", "Git", "Jupyter", "Colab", "Claude Code"],
    },
  ],

  writing: [
    {
      date: "Coming soon",
      title: "Where world models fail — a visual tour of WorldBench findings",
      status: "Draft",
    },
    {
      date: "Coming soon",
      title: "Fine-tuning Cosmos: notes from the trenches",
      status: "Outlining",
    },
    {
      date: "Coming soon",
      title: "Numerical stability tricks for mixture density networks",
      status: "Idea",
    },
  ],
};
