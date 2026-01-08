# Capturing Flags

The DOJO platform is inspired by "Capture The Flag" (CTF) competitions, which are typically live cybersecurity events in which participants must exploit hacking challenges (e.g., by exploiting them) to retrieve a cryptographic "flag" token and submit it for points. These events are very popular in the cybersecurity community, and have been observed to be effective tools in the educator's toolbox [[7](../references.md#ref7), [11](../references.md#ref11), [14](../references.md#ref14), [16](../references.md#ref16), [18](../references.md#ref18), [28](../references.md#ref28)].

Each challenge is essentially equivalent to an auto-grading script that implicitly checks a learner's solution (whether actively, such as checking if the learner has cded into a specified directory, or passively, by being written in a way that the user can only retrieve the flag by solving the challenge). In an example of the former, the first time paths are taught, the Linux Luminarium instruments the shell to detect when a learner enters the correct directory, at which point it prints the flag. For the latter, when we teach the chmod command for changing file permissions, the learner must chmod the flag file to read the flag.

In the pwn.college DOJO, these flags are tracked and aggregated as the learner's score, motivating learners to keep pushing the boundaries of their knowledge.
