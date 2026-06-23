# Agentic Systems as Boosting Weak Reasoning Models
Date: Wed May 13, 2026
By Varun Sunkaraneni, Pierfrancesco Beneventano, Riccardo Neumarker, Tomaso Poggio, and Tomer Galanti

We released [Agentic Systems as Boosting Weak Reasoning Models](https://arxiv.org/abs/2605.14163), a preprint studying when committees of weak reasoning-model calls can approach the performance of much stronger models.

The core message is that the benefit does not come simply from adding more agents. Repeated sampling can expose good candidate solutions, but reliable improvement depends on selection: critics and comparators need local soundness signals such as execution, proof checking, tests, type checking, or constraint solving.

The paper separates proposal coverage, local identifiability, progress, and diversity, and uses this lens to analyze verifier-backed committee search as inference-time boosting for reasoning language models.

Read the [preprint](https://arxiv.org/abs/2605.14163).
