# Distribution-Aware Algorithm Design with LLM Agents
Date: Sun Jun 21, 2026
By Pierfrancesco Beneventano and Tomer Galanti on behalf of the authors

We released a revised preprint of [Distribution-Aware Algorithm Design with LLM Agents](https://arxiv.org/abs/2605.14141), joint work by Saharsh Koganti, Priyadarsi Mishra, Pierfrancesco Beneventano, and Tomer Galanti.

The paper studies learning when the output is executable solver code rather than a predictor. In this setting, correctness is not enough: the learned solver should generalize in both solution quality and runtime on future instances drawn from the same deployment distribution.

The central abstraction is a solver hint: reusable distribution-specific structure inferred from samples and compiled into specialized solver code. Empirically, LLM code agents synthesize high-quality solvers across structured combinatorial optimization distributions while running much faster than broad generic baselines.

Read the [preprint](https://arxiv.org/abs/2605.14141) or Tomer Galanti's accompanying explainer, [Distribution-Aware Programming](https://dlfundamentals.github.io/blog/2026/06/08/distribution-aware-programming.html).
