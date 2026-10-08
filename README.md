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

The modeling direction remains open. Current discussion centers on
**probabilistic and Bayesian approaches using PyMC**, alongside
**causal-inference approaches using DoWhy**. These are candidates for exploration,
not an adopted stack or a claim of validated predictive or causal capabilities.

## Research ambition

The aim is to connect three levels of evidence: what changed in training, how the
athlete executed the race, and what deserves testing in the next training block.
Success means a more defensible performance decision, with uncertainty visible
and an observation that can be checked again.

---

**The underlying methodology and implementation are intentionally kept private.**
This repository presents the project's research questions and direction. It does
not publish athlete data, internal methods, or implementation-status claims.
