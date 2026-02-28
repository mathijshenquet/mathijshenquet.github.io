#set page(margin: (top: 0.4in, bottom: 0.4in, left: 0.55in, right: 0.55in), paper: "a4")
#set text(font: "Libertinus Serif", size: 9.5pt)
#set par(leading: 0.5em)
#set list(indent: 4pt, body-indent: 5pt, spacing: 6pt)

#let accent = rgb("#333333")
#let muted = rgb("#555555")
#let light = rgb("#777777")
#let link-color = rgb("#2255aa")

#let icon-link(url, body) = {
  link(url)[#text(fill: link-color)[#body #h(1pt) #text(size: 7pt)[#sym.arrow.r.curve]]]
}

#let section-heading(title) = {
  v(1.5em)
  text(10pt, weight: "bold", fill: accent, smallcaps(title))
  v(-0.5em)
  line(length: 100%, stroke: 0.5pt + rgb("#cccccc"))
  v(-0.5em)
}

// Header
#grid(
  columns: (auto, 1fr),
  column-gutter: 16pt,
  align: (center, left),
  box(
    clip: true,
    radius: 50%,
    width: 100pt,
    height: 100pt,
    move(
        dx: 0%,
        dy: 0%,
        image("../docs/photo.jpeg", fit: "cover", width: 125%, height: 125%),
    )
  ),
  [
    #text(22pt, weight: "bold")[Mathijs Henquet]\
    #v(-4pt)
    #text(10pt, fill: muted)[Software Engineer · Amsterdam, NL]\
    #v(2pt)
    #text(8.5pt, fill: light)[
      #box(baseline: 1pt, image("icons/email.svg", height: 7.5pt)) #link("mailto:mathijs.henquet@gmail.com")[mathijs.henquet\@gmail.com] #h(6pt)
      | #h(6pt) #box(baseline: 1pt, image("icons/github.svg", height: 7.5pt)) #link("https://github.com/mathijshenquet")[mathijshenquet] #h(6pt)
      | #h(6pt) #box(baseline: 1pt, image("icons/linkedin.svg", height: 7.5pt)) #link("https://linkedin.com/in/mathijshenquet")[mathijshenquet] #h(6pt)
      | #h(6pt) #box(baseline: 1pt, image("icons/globe.svg", height: 7.5pt)) #link("https://mathijshenquet.nl")[mathijshenquet.nl]
    ]
    #v(3pt)
    // About
    #text(size: 9pt, fill: accent)[Engineer with a dual CS/Math background who takes ideas from pitch to production. At NLR, I built and drove adoption of SKY (generative AI platform, €800k+/yr gains) and SENTINEL (military voice assistant, adopted by Dutch MOD). MIRI 2019 Fellow.]
  ],
)


// Experience
#section-heading("Experience")


#grid(
  columns: (1fr, auto),
  text(weight: "bold")[R&D Engineer, AI team],
  text(fill: light)[2023–2026],
)
#v(-0.5em)
#text(fill: muted)[NLR — Royal Netherlands Aerospace Centre, Amsterdam]
#v(0pt)

- *SKY* --- Built NLR's generative AI platform for classified data. €800k+/yr in measured productivity gains. _#text(fill: light)[.NET C\#, gRPC, Python, RAG, TensorRT-LLM, Docker, Rust]_
#v(-0.3em)

- *SENTINEL* --- Led development of real-time voice assistant for military situational awareness. Adopted by Dutch Ministry of Defence. _#text(fill: light)[Python, Whisper, WebRTC, vLLM, VLM/LLM, TTS (Kokoro)]_
#v(-0.3em)

- *Mesh-as-a-Service* --- Automated 3D modeling via neural reconstruction. Runner-up Best Paper at I/ITSEC 2024.
#v(-0.3em)

- *Flight Debrief Study* --- Led strategic study on automated flight debriefing summarization. Published at ICCAS 2024.
#v(-0.3em)



// Awards
#section-heading("Awards & Fellowships")

- *Runner-up NLR Team Innovation Award* (2025) --- SKY team, nominated among organization-wide finalists (among \~1000 employees)
#v(-0.3em)

- *Runner-up Best Paper* (2024) --- Simulation subcommittee, I/ITSEC 2024 — for Mesh-as-a-Service
#v(-0.3em)

- *MIRI Summer Fellowship* (2019) --- Academic retreat for mathematicians and programmers working on AI alignment
#v(-0.3em)


// Projects
#section-heading("Projects")


#grid(
  columns: (1fr, auto),
  [*Correctness of Automatic Differentiation* --- Master's thesis (on hold)],
  text(fill: light)[2022],
)
#v(-0.5em)
Formal proof of correctness of automatic differentiation in the presence of recursion and iteration. Utrecht University, Mathematics.


#grid(
  columns: (1fr, auto),
  [*Homotopical Mathematics* #icon-link("./cv/henquet_homotopical_mathematics.pdf")[PDF] --- Bachelor's thesis, 9/10],
  text(fill: light)[2019],
)
#v(-0.5em)
On homotopy type theory and its relation to higher topos theory. Utrecht University.


// Publications
#section-heading("Publications")


*Henquet*, Bellucci, Amghane, et al. #icon-link("https://iitsec.xcdacademy.com/index.cfm/item/39283")["Mesh-as-a-Service: Automated 3D Modelling fast as l-AI-ghtning."] _I/ITSEC 2024._ _Runner-up Best Paper, Simulation subcommittee._


*Henquet*, Bellucci. #icon-link("https://www.scitepress.org/Papers/2024/129702/129702.pdf")["AI-Assisted Debrief: Automated Flight Debriefing Summarization and Competency Assessment."] _ICCAS 2024._ 


Hellinga, *Henquet*, Bellucci. "SENTINEL: Supporting Military Situation Understanding Through Conversational Vision-Language AI." _ICMCIS 2026 (accepted for publication)._ 


// Education
#section-heading("Education")


#grid(
  columns: (1fr, auto),
  [*MSc Mathematics (on hold)* --- Utrecht University],
  text(fill: light)[2020–2022],
)


#grid(
  columns: (1fr, auto),
  [*BSc Computer Science*, GPA 7.8/10 --- Utrecht University],
  text(fill: light)[2015–2019],
)


#grid(
  columns: (1fr, auto),
  [*BSc Mathematics*, GPA 7.8/10, thesis 9/10 --- Utrecht University],
  text(fill: light)[2012–2019],
)


// Skills & Languages
#section-heading("Technical Skills & Languages")


*Languages:* Rust, TypeScript/JavaScript, Python, C\# (.NET), Haskell, SQL
#v(-0.3em)

*Web:* React, Node.js, HTML/CSS, Vite
#v(-0.3em)

*AI/ML:* LLM/VLM integration, RAG pipelines, latency optimization (TTS/STT/embedding models)
#v(-0.3em)

*Infrastructure:* Docker, Linux, PostgreSQL, MongoDB, Redis
#v(-0.3em)

*Other:* Security-compliant deployment, classified data handling, LaTeX, Mathematica
#v(-0.3em)

#v(0.5em)
*Languages:* Dutch (native) · English (C2) · German (C1)
