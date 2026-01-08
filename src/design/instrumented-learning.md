# Instrumented Learning

The DOJO platform gives assignment authors significant control over the learner's web-accessible working environment. We used this flexibility to implement a number of novel instrumentation hooks that serve as our guardrails to improve student learning.

**Challenge randomization.** DOJO exposes an interface for running setup code when a learner launches a challenge. We use this in a large number of places in the Linux Luminarium, such as randomizing the location of files that learners must find (e.g., to learn the find command), data to filter (to practice grep), and so on.

We use two different forms of randomization: per-attempt (using a pseudorandom number generator) and per-learner (achieved by hashing the /flag file, which is stable per learner-challenge tuple), depending on the specific challenge. The latter allows us to differentiate challenges between learners to minimize the spread of written solutions (which reduce active learning to passive learning), while the former increases challenge variety in general.

**Shell instrumentation.** We expanded the DOJO platform (and up streamed the resulting contribution) to enable hooking of a learner's `.bashrc`, allowing our challenges to customize learner shell sessions.

We use this, combined with bash's rich debug capabilities, to enable significant observability for the challenge of the learner's attempts to solve it. For example, when teaching paths and the cd command, we can directly detect (by tracking the PWD environment variable) when a learner enters the correct directory. Furthermore, by hooking each line entered into the shell, we can ensure that learners properly use absolute paths (in challenges that aim to teach them) versus relative paths (when the curriculum moves on to that) or properly use file globbing, tab completion, and so on as these concepts are taught.

**Command hooking.** We use the aforementioned shell instrumentation to set the learner's PATH environment variable to allow challenges to easily override commands, letting us inject guardrails and feedback into the commands themselves.

For example, when we teach advanced usage of the tee command, our tee wrapper actually inspects the arguments to determine whether the learner is on the right path.

**Error anticipation.** We have observed learners making a large number of mistakes when learning Linux. A common example is case sensitivity: learners unfamiliar with Computer Science might not understand that files and shell variables are case-sensitive. A combination of our shell introspection, command hooking, and mistake prediction allows us to preempt many of these errors.

For example, a challenge that asks the learner to use cat to read the `/flag` file would also include a /FLAG file with content informing the learner of the casing mistake, a CAT command doing the same, a flag command explaining that the command they want is cat, and a shell hook detecting the errant attempt to execute the `/flag` file directly. Likewise, when teaching how to set environment variables (e.g., NAME=VALUE), we include a VALUE command (to catch the case where the learner does NAME= VALUE) and a NAME command (to catch NAME = VALUE).

Naturally, predicting all such errors is impossible. To remedy this, we monitor interactions with our environment and voiced student frustrations on our online Discord community. As we notice common mistakes made by learners, we augment the error anticipation logic to catch these mistakes as well.

**Integrity and robustness.** Our curriculum involves some security relevant concepts and, once users learn these concepts, it becomes difficult to prevent them from finding unintended solutions (and thus potentially missing the pedagogical point of the challenge). We expanded DOJO to try to head off such solutions. For example, we use bash's debug capabilities to hook and immediately terminate sub shells, as so:

`trap '[[ $BASH_SUB SHELL -gt 0 ]] && exit' DEBUG`
