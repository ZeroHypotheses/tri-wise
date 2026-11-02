# tri-wise

<p align="center">
  <img src="assets/tri-wise-logo.png" alt="tri-wise logo" width="360">
</p>

**Connecting training evidence to race performance.**

tri-wise is an applied research project at the intersection of endurance sport,
probabilistic modeling, and decision support. It explores how longitudinal
training records and race results can help an athlete understand performance,
identify meaningful opportunities, and make better-informed training and pacing
choices.

The scope includes standalone running races and triathlon. A central prediction
question is: **what finish time is plausible, what is the probability of meeting
a target, and which evidence supports the forecast?**

Triathlon adds a demanding setting: three disciplines, interacting fatigue,
variable courses and conditions, and imperfect measurements. The central question
for causal investigation is: **which changes in preparation are likely to matter on race day,
and how strong is the evidence?**

## Explore the demo

[![Bayesian race prediction model](assets/synthetic-model-dark.svg)](https://tri-wise-model-explorer.woollyknoll64.chatgpt.site)

[Open the interactive demo](https://tri-wise-model-explorer.woollyknoll64.chatgpt.site)
to explore how training evidence becomes a race prediction with uncertainty.
The agent examples compare finish-time targets and explore how changes in
preparation could affect an outcome.

The demo uses synthetic data and simulated agent interactions; the counterfactual
scenario illustrates a planned workflow, not an estimated causal effect. Click
the diagram to interact with it.

## Performance questions

- **Race prediction:** estimate finish-time uncertainty for standalone running
  events, with triathlon run splits and off-road courses requiring distinct context.
- **Adaptation over time:** distinguish useful changes in performance and
  physiological response from day-to-day variation.
- **Preparation and execution:** connect training patterns to what happens during
  competition, including how the bike effort relates to the run that follows.
- **Competitive context:** understand the gap to age-group leaders within a
  specific race, while respecting differences in distance, course and conditions.
- **Decisions under uncertainty:** explore alternative training and pacing choices
  with explicit assumptions about what the available evidence can support.

## Research roadmap

The research sequence is:

1. **In place:** establish comparable running-race evidence with clear provenance.
2. **First cut in place:** develop probabilistic finish-time forecasts with
   explicit uncertainty from prior race and training evidence.
3. **First cut in place:** connect an evidence agent to model-backed analysis and
   evaluate its answers on repeatable tasks.
4. **In progress:** assess predictions against later race outcomes and
   transparent baselines.
5. **Later:** explore training context and distinct demands of triathlon and
   off-road races.
6. **Later:** investigate which preparation changes warrant causal testing.

The current forecast and agent are early implementations, not validated
products. Evaluation accompanies development throughout; later extensions depend
on the strength of the evidence.

## Technical perspective

The research challenge extends beyond predicting a finish time. It involves
learning from repeated observations of an individual athlete while fitness,
equipment and race context change. Personal physiological references and the
provenance of recorded measurements matter to how those observations are read.

The project emphasizes reproducible analysis, transparent baselines, and a clear
separation between observed associations, predictive performance and causal
claims. A faster training session does not automatically imply improved race
readiness; a slower run after a hard ride does not establish its cause.

The technical direction connects probabilistic performance forecasts, evidence
retrieval and clear explanations. An agent can retrieve supporting observations,
ask analysis tools for target comparisons, and explore counterfactual questions
when assumptions and evidence support them. Repeatable evaluations check
numerical accuracy, source grounding and whether explanations preserve
uncertainty. The implementation keeps model providers interchangeable and
evaluates them against the same questions.

These research directions do not imply validated predictive or causal
capabilities. Numerical results would come from
analysis tools and models; generated explanations would remain tied to their
supporting evidence. Added complexity must earn its place against transparent
baselines.

## Research ambition

The aim is to connect three levels of evidence: what changed in training, how the
athlete executed the race, and what deserves testing in the next training block.
Success means a more defensible performance decision, with uncertainty visible
and an observation that can be checked again.

---

**The underlying methodology and implementation are intentionally kept private.**
This repository presents the project's research questions, direction and an
independent synthetic illustration. It does not publish athlete data or the
private model's implementation.
