# 设计

Several goals drove our creation of the Linux Luminarium:

**Minimal device requirements.** We aimed to be accessible to people of diverse backgrounds, including those without regular access to a development- or virtualization-capable computer.

**Minimal prerequisites.** Ideally, learners would be able to approach the Linux Luminarium with minimal technical knowledge (e.g., just understanding how to use a web browser).We explicitly aimed to avoid assuming that users understood file systems, processes, source code, executables, and almost everything else.

**Minimal conceptual leaps.** Given the lack of familiarity with the concept, we strove to decompose the Linux learning problem into a series of tiny steps that build up to significant knowledge.

**Guardrails.** As experienced educators, we have observed a staggering number of ways that learners can misguide themselves. We attempted to create an environment in which learners had freedom to explore while minimizing the chance of learning-derailing mistakes.

**Engagement.** We aimed to keep learners motivated through regular positive feedback reinforcement and community involvement.

With these goals in mind, we chose our pwn.college DOJO platform [[17](references.md#ref17)] for the Linux Luminarium's infrastructure. The DOJO provides an open-source, web-accessible Linux environment in which instructors can implement assignments, exposes advanced instrumentation for instructor use, and makes security guarantees that maintain educational integrity of assignments in the face of too-clever students. We adopted the Capture-the-Flag-inspired PWN philosophy [[18](references.md#ref18)], which envisions using hands-on challenges, that gradually increase in complexity, to teach successive "microconcepts". For this, we broke concepts into micro-components and conveyed each component through an individual, small challenge that, in aggregate with other challenges, gradually builds up understanding of the concept. We augmented this platform and philosophy with a number of innovations specific to first-stage Linux education and implemented an extensive curriculum, all described below.
