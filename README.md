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

Triathlon provides a demanding setting: three disciplines, interacting fatigue,
variable courses and conditions, and imperfect measurements. The central question
is practical: **which changes in preparation are likely to matter on race day,
and how strong is the evidence?**

## Performance questions

- **Adaptation over time:** distinguish useful changes in performance and
  physiological response from day-to-day variation.
- **Preparation and execution:** connect training patterns to what happens during
  competition, including how the bike effort relates to the run that follows.
- **Competitive context:** understand the gap to age-group leaders within a
  specific race, while respecting differences in distance, course and conditions.
- **Decisions under uncertainty:** explore alternative training and pacing choices
  with explicit assumptions about what the available evidence can support.

## Technical perspective

The research challenge extends beyond predicting a finish time. It involves
learning from repeated observations of an individual athlete while fitness,
equipment and race context change. Personal physiological references and the
provenance of recorded measurements matter to how those observations are read.

The project emphasizes reproducible analysis, transparent baselines, and a clear
separation between observed associations, predictive performance and causal
claims. A faster training session does not automatically imply improved race
readiness; a slower run after a hard ride does not establish its cause.

The modeling direction remains open, with three complementary roles under
consideration:

- **PyMC — performance change and prediction:** estimate how performance changes
  under comparable conditions and what to expect in a future session, with
  uncertainty made explicit. Has expected performance improved beyond ordinary
  session-to-session variation?
- **DoWhy — intervention questions:** investigate whether a specific change in
  preparation or pacing could improve an outcome, where the evidence and causal
  assumptions support estimation. Would a more conservative early bike effort
  improve total bike-plus-run time?
- **LLMs — evidence access and explanation:** provide a grounded interface for
  finding relevant sessions, calling analysis tools, and explaining results with
  source references. Which comparable sessions support a proposed explanation,
  and what context is missing?

These are proposed research directions, not an adopted stack or a claim of
validated predictive or causal capabilities. Numerical results would come from
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
This repository presents the project's research questions and direction. It does
not publish athlete data, internal methods, or implementation-status claims.
