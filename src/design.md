# Design

Multiple objectives motivated the creation of the Linux Luminarium:

**Minimal Hardware Requirements.** We wanted to make it accessible to people from diverse backgrounds, including those who cannot regularly access computers with development or virtualization capabilities.

**Minimal Prior Knowledge.** Ideally, learners should only need minimal technical background to engage with the Linux Luminarium (e.g., only needing to know how to use a web browser). We deliberately avoided assuming users already understand file systems, processes, source code, executable files, and almost all other technical concepts.

**Minimal Conceptual Span.** Considering that learners are unfamiliar with the relevant concepts, we worked to decompose the Linux learning process into a series of small steps that progressively accumulate to ultimately form a solid and systematic understanding.

**Guardrails.** As experienced educators, we observed that learners can go astray in multiple ways during the learning process. Therefore, we worked to create a learning environment that allows learners to explore freely while minimizing errors that deviate from the main learning path and cause learning blockages.

**Engagement.** Our goal is to maintain learner motivation through regular positive feedback reinforcement and community participation.

Based on the above objectives, we chose pwn.college's DOJO platform [[17](references.md#ref17)] as the infrastructure for the Linux Luminarium. DOJO provides an open-source, web-accessible Linux environment: instructors can implement and deploy assignments within it; the platform simultaneously provides instructors with advanced runtime and behavioral instrumentation capabilities; and it can still provide security guarantees when facing "too-clever" students to maintain the pedagogical integrity of assignments. We adopted the PWN teaching philosophy inspired by Capture-the-Flag (CTF) [[18](references.md#ref18)], which advocates teaching continuous "micro-concepts" through a series of progressively complex hands-on challenges. To this end, we break down complex concepts into smaller constituent units and convey each unit through independent, very small challenges; these challenges build upon each other, ultimately constructing a progressive understanding of the overall concept. On top of this platform and teaching philosophy, we further introduced multiple customized innovations targeting the early Linux learning stage and implemented a complete and systematic curriculum, which will be detailed below.
