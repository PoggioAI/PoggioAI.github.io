# Edge of (Stochastic) Stability made simple — Part II: the mini-batch case
Date: Feb 23, 2026
By Pierfrancesco Beneventano

← **[Part I: full-batch EOS](/blogsupdates/edge-of-stochastic-stability-part-i)** · **[Part III: practical implications](/blogsupdates/edge-of-stochastic-stability-part-iii)**

Based on **[Edge of Stochastic Stability: Revisiting the Edge of Stability for SGD (Andreyev & Beneventano, arXiv:2412.20553)](https://arxiv.org/abs/2412.20553)**; correspondence to [Pierfrancesco Beneventano](https://pierbeneventano.github.io/), [pierb@mit.edu](mailto:pierb@mit.edu).

<!-- Optional hero image -->
<!-- ![caption](assets/hero_part_ii.png) -->

<aside>
<strong><em>What this post is about:</em></strong>

<em>In Part I, “Edge of Stability” (EOS) for full-batch GD had a clean signature: sharpness rises and hovers near a stability threshold, and the loss becomes oscillatory.</em>

<em>In mini-batch training, this intuition breaks again: SGD oscillates almost all the time, and the full-batch Hessian’s top eigenvalue typically does <strong>not</strong> sit at the relevant threshold.</em>

<em>This post rebuilds the “edge” from scratch for SGD: we’ll define what an EOS-like regime should mean for a stochastic optimizer, give a practical edge-test, and introduce the quantity that actually saturates at <span style="white-space:nowrap;">2/η</span>.</em>
</aside>

---

***Acknowledgements / lineage.***  
Part I leaned heavily on the EOS story developed by Jeremy Cohen, Alex Damian, and coauthors (and their excellent Central Flows writeups). This Part II is where we pivot to the mini-batch world, following our paper with Arseniy Andreyev.

<!-- Optional: same acknowledgements block as Part I -->
<!--
I’m grateful to [Jeremy Cohen](https://jmcohen.github.io/), [Alex Damian](https://alex-damian.github.io/), and [Arseniy Andreyev](https://scholar.google.com/citations?user=CI36v0sAAAAJ&hl=en) for many discussions over the years that shaped how I think about stability-limited training and curvature.
-->

***Conceptual map (where this is going):***

- **Part I:** full-batch EOS: why “wrong step sizes” can still train, and the two mechanisms (local instability + progressive sharpening).
- **Part II (this post):** SGD: why the Part I diagnostic fails, what “edge” should mean for stochastic dynamics, and **Edge of Stochastic Stability (EoSS)**.
- **Part III:** why any of this matters: hyperparameters, batch-size effects, and what this perspective changes about modeling SGD.

---

# Part II: The mini-batch case

In Part I, we had **one landscape** and a deterministic update.  
Now we have **a distribution of mini-batch landscapes** and a stochastic update. That single change is what forces us to rethink what “edge” even means.

<details>
<summary><strong>Part I recap in ~60 seconds (click to expand)</strong></summary>

- On a quadratic, GD is stable iff \(0<\eta<2/\lambda\).
- In deep nets, as training proceeds, curvature (“sharpness”) tends to increase (“progressive sharpening”).
- Full-batch GD often self-regulates near \(2/\eta\): instability grows oscillations, oscillations push back on sharpness.
- Consequence: “descent lemma” style monotonic-loss reasoning stops applying in the regime that modern training actually uses.
</details>

<details>
<summary><strong>Notation (click to expand)</strong></summary>

- Dataset: \(\{z_i\}_{i=1}^N\)
- Full loss: \(L(\theta)=\frac1N\sum_{i=1}^N \ell(\theta;z_i)\)
- Mini-batch \(B\subset\{1,\dots,N\}\), \(|B|=b\)
- Mini-batch loss: \(L_B(\theta)=\frac1b\sum_{i\in B} \ell(\theta;z_i)\)
- SGD: \(\theta_{t+1}=\theta_t-\eta\,\nabla L_{B_t}(\theta_t)\)
</details>

---

## 1) From GD to SGD: the “landscape” moves under your feet

Full-batch GD sees a single Hessian \(\nabla^2 L(\theta)\).  
SGD sees \(\nabla^2 L_{B_t}(\theta)\), which changes every step.

<aside>
💡 <strong>Key shift:</strong> In SGD, stability is governed by what happens on the <em>mini-batch</em> loss surface along the <em>mini-batch</em> step direction—not by the full-batch \(\lambda_{\max}\) alone.
</aside>

<!-- TODO FIGURE: cartoon -->
<!--
Suggested animation:
- Show a fixed “full-batch” contour plot.
- Overlay a jittering mini-batch contour plot that changes every frame.
- Show SGD steps following the current mini-batch gradient, while the full-batch landscape stays fixed.
File: assets/gif_moving_landscape.gif
-->

---

## 2) Why the Part I diagnostic breaks: “SGD always oscillates”

In full-batch GD, “loss starts oscillating” is a strong signal you crossed a curvature stability boundary.

In SGD, the loss oscillates even on convex quadratics—simply because the gradient is noisy and the step size doesn’t vanish.

<aside>
💡 <strong>Takeaway:</strong> For SGD, <em>oscillations are not diagnostic</em>. We need a different, mini-batch-native signature of “being at the edge.”
</aside>

<!-- TODO GIF: SGD oscillations that are still stable -->
<!--
Suggested animation:
- 1D quadratic with noisy gradients: show iterates wobbling near optimum.
- Then increase η past the true stability limit: show divergence.
This visually separates “stable wobbling” vs “curvature-driven instability”.
File: assets/gif_type1_vs_type2.gif
-->

---

## 3) What does “edge” mean for a stochastic optimizer?

Here’s the philosophy shift I like:

> In stochastic dynamics, “the edge” should be defined by a **stability/instability criterion** that (i) is meaningful for the dynamics, and (ii) **saturates** during training.

So we want something like:

- A scalar quantity \(f(\theta;\eta,b)\) that grows as training progresses (progressive sharpening / drift).
- A threshold \(c(\eta,b)\) such that exceeding it implies a real divergence event *on the local quadratic model*.
- Along training, we empirically see \(f(\theta_t;\eta,b)\approx c(\eta,b)\): the optimizer hovers near the threshold.

<aside>
💡 <strong>Operational intuition:</strong> “At the edge” = “a small destabilizing hyperparameter nudge would make things blow up (locally).”
</aside>

---

## 4) A practical tool: the checkpoint-level <em>edge test</em>

If a quantity really is a tight stability threshold, it should pass a simple falsifiable test:

1. Train normally to a checkpoint \(\theta_t\).
2. Restart from \(\theta_t\) and make a *small destabilizing perturbation* (e.g. \(\eta\uparrow\) or \(b\downarrow\)).
3. If we truly were saturating a valid instability threshold, the perturbed run should exhibit a **catapult** (a large loss spike / violent excursion) on the local quadratic approximation.

<aside>
💡 <strong>Edge test:</strong> Saturation + monotonicity in a destabilizing direction ⇒ small perturbations should trigger catapults.
</aside>

```pseudo
# Edge test (checkpoint-level)
train with (η, b) → checkpoint θ_t

baseline: continue training from θ_t with (η, b)
perturb:  continue training from θ_t with (η', b')  where η' > η or b' < b  (small change)

if baseline is stable but perturb catapults:
    evidence that training was near a tight instability threshold
else:
    the “saturating quantity” you measured is probably not the right edge diagnostic
```

<!-- TODO FIGURE: side-by-side baseline vs perturbed -->

<!--
Suggested animation:
- Left panel: baseline loss curve continues smoothly.
- Right panel: perturbed run spikes (“catapult”) shortly after restart.
File: assets/gif_edge_test.gif
-->

---

## 5) Candidate diagnostics for SGD: what fails, what works

This post is organized as a simple detective story:

1. **A very tempting candidate** that tracks oscillations, but fails the edge test.
2. **The quantity SGD actually sees** that passes the edge test and stabilizes around \(2/\eta\).

### 5.1 A tempting quantity: a “certifier” of oscillations (but not of instability)

<!-- TODO: introduce GNI gently, as “a scalar that appears in a second-order expansion” -->

We can derive oscillations from a second-order Taylor expansion of the full loss around an SGD step. This yields a scalar that often sits near \(2/\eta\) and correlates with oscillatory behavior.

But crucially:

<aside>
💡 <strong>Main point:</strong> This kind of quantity can sit at \(2/\eta\) even in regimes where the dynamics is not curvature-unstable (for example, stable noisy wobbling). So it does not pass the edge test.
</aside>

<!-- TODO FIGURE: show “GNI saturates early but doesn’t predict catapults” -->

<!--
Side-by-side:
- top: quantity ~ 2/η across training
- bottom: catapults occur only when another quantity crosses threshold
File: assets/fig_gni_not_diagnostic.png
-->

### 5.2 The mini-batch-native quantity: directional curvature along the SGD step

SGD steps along \(\nabla L_B(\theta)\), and the mini-batch curvature relevant to that step is:

\[
\frac{\nabla L_B(\theta)^\top \nabla^2 L_B(\theta)\nabla L_B(\theta)}
{\|\nabla L_B(\theta)\|^2}.
\]

This is a Rayleigh quotient: curvature in the direction you actually step.

Now average over batch sampling:

\[
\textbf{BatchSharpness}(\theta)
:=\mathbb{E}_{B}\!\left[
\frac{\nabla L_B(\theta)^\top \nabla^2 L_B(\theta)\nabla L_B(\theta)}
{\|\nabla L_B(\theta)\|^2}
\right].
\]

<aside>
💡 <strong>Interpretation:</strong> Batch Sharpness is the <em>expected directional curvature</em> of the mini-batch loss surface along the step direction.
</aside>

---

## 6) Edge of <em>Stochastic</em> Stability (EoSS): what actually saturates at \(2/\eta\)

Here is the empirical phenomenon (the headline):

<aside>
<strong>Edge of Stochastic Stability (EoSS):</strong><br/>
<strong>Batch Sharpness progressively increases and then hovers around</strong> \(2/\eta\).
</aside>

And this immediately explains why the full-batch \(\lambda_{\max}\) behaves differently:

- The full-batch \(\lambda_{\max}\) typically plateaus **below** \(2/\eta\).
- Smaller batch sizes tend to suppress that plateau further.
- Yet Batch Sharpness is the one that locks to \(2/\eta\).

<!-- TODO FIGURE: the money plot -->

<!--
Plot: BatchSharpness(t) for several batch sizes (all hit ~2/η)
Overlay: λ_max(full batch) (plateaus below, depends on batch)
File: assets/fig_batchsharpness_vs_lmax.png
-->

<details>
<summary><strong>Optional: “three sharpnesses” cheat-sheet (click to expand)</strong></summary>

- **Full-batch sharpness:** \(\lambda_{\max}(\nabla^2 L(\theta))\)
- **Step sharpness:** the Rayleigh quotient on the current batch \(B_t\)
- **Batch Sharpness:** expectation of step sharpness over batch sampling

EoSS is the statement about the third one.

</details>

---

## 7) Catapults: what stochasticity adds to the edge story

In EOS (full-batch), what stabilizes is a deterministic curvature quantity.  
In EoSS, what stabilizes is an **expectation** of a per-step random quantity.

That matters because:

- Most steps look near-threshold.
- Occasionally, you sample a streak of unusually sharp batches.
- Those steps overshoot and trigger a **catapult** (loss spike / large excursion).
- After the catapult, the trajectory may re-enter a stable region; if Batch Sharpness is below \(2/\eta\) there, progressive sharpening resumes and the process returns to EoSS.

<aside>
💡 <strong>Mental picture:</strong> EoSS is a hovering regime with intermittent “lightning strikes”.
</aside>

<!-- TODO GIF: catapult event -->

<!--
Suggested animation:
- show training trajectory in a 2D landscape (or loss curve) with a sudden spike
- annotate: “anomalously sharp mini-batches → overshoot → catapult”
File: assets/gif_catapult.gif
-->

---

## 8) A theory interlude (kept short): why \(2/\eta\) shows up again

In Part I, \(2/\eta\) came from the stability of \(I-\eta H\) on a quadratic.

In SGD, \(2/\eta\) reappears because a second-order expansion of the mini-batch loss along an SGD step produces the same algebraic stability threshold, but now applied to **directional curvature along the step**.

<aside>
💡 <strong>One-line theorem statement (blog version):</strong> On the local quadratic model, if Batch Sharpness exceeds \((2+\varepsilon)/\eta\), then SGD started from that point exhibits a divergence event (catapult) in expectation.
</aside>

<!-- TODO: add a short proof sketch box -->

<!--
Proof sketch idea:
- choose Lyapunov V(θ)=||∇L_B(θ)||^2 on the quadratic model
- show multiplicative drift E[V_{t+1}/V_t | θ_t] > 1 when BatchSharpness > (2+ε)/η
- conclude catapult on the quadratic model
-->

---

## 9) Summary (so far)

<aside>
<strong><em>If you only remember three bullets from Part II:</em></strong>

<ul>
  <li><strong>SGD oscillations are not diagnostic.</strong> “Loss wiggles” is too cheap in stochastic training.</li>
  <li><strong>The right edge quantity is mini-batch-native.</strong> It measures curvature along the stochastic step direction.</li>
  <li><strong>EoSS:</strong> Batch Sharpness sharpens and hovers around <span style="white-space:nowrap;">2/η</span>, while full-batch \(\lambda_{\max}\) is suppressed and batch-size-dependent.</li>
</ul>
</aside>

---

## 10) Bridge to Part III: what this perspective will buy us

In Part III, we’ll use this edge test + Batch Sharpness viewpoint to talk about:

- why batch size and step size affect where you end up (not just how fast),
- how this reframes flat vs sharp minima heuristics,
- what goes wrong with common GD + isotropic noise / SDE proxies if they do not preserve batch-dependent curvature,
- practical takeaways for tuning \((\eta,b)\) and diagnosing instability.

→ **Next:** [Part III: Getting practical](/blogsupdates/edge-of-stochastic-stability-part-iii)

---

# Appendix: measuring Batch Sharpness in practice (optional)

<!-- Keep this very practical: readers love this. -->

**Goal:** estimate
\[
\mathbb{E}_{B}\left[
\frac{g_B^\top H_B g_B}{\|g_B\|^2}
\right]
\]
where \(g_B=\nabla L_B(\theta)\) and \(H_B=\nabla^2 L_B(\theta)\).

- Compute \(g_B\) on several mini-batches.
- For each batch, compute the Hessian-vector product \(H_B g_B\) (no need to form \(H_B\)).
- Accumulate the Rayleigh quotient \(g_B^\top (H_B g_B)/\|g_B\|^2\).
- Average.

```pseudo
# Batch Sharpness estimator at θ
input: θ, sampler for batches B ~ P_b, num_samples M

vals = []
for m in 1..M:
    B = sample_batch()
    g = grad(L_B(θ))
    Hg = hvp(L_B, θ, v=g)         # Hessian-vector product
    vals.append( dot(g, Hg) / dot(g, g) )

return mean(vals)
```

---

# References / further reading

- **Cohen et al. (2021):** Gradient Descent on Neural Networks Typically Occurs at the Edge of Stability — [https://arxiv.org/abs/2103.00065](https://arxiv.org/abs/2103.00065)
- **Damian et al. (2022):** Self-Stabilization: The Implicit Bias of Gradient Descent at the Edge of Stability — [https://arxiv.org/abs/2209.15594](https://arxiv.org/abs/2209.15594)
- **Andreyev & Beneventano (2025):** Edge of Stochastic Stability — [https://arxiv.org/abs/2412.20553](https://arxiv.org/abs/2412.20553)

<!-- TODO: add a small “Related work” list, but keep it short in the main text -->
