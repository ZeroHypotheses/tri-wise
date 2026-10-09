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

The intended progression is:

1. Establish comparable running-race evidence with clear provenance.
2. Develop probabilistic finish-time forecasts with explicit uncertainty.
3. Make forecasts and their supporting evidence accessible through an agent.
4. Assess predictions against later race outcomes and transparent baselines.
5. Explore training context and distinct demands of triathlon and off-road races.
6. Investigate which preparation changes warrant causal testing.

Evaluation accompanies development throughout. Later extensions depend on the
strength of the evidence; this sequence describes research direction, not a claim
that these capabilities are complete or validated.

## Technical perspective

The research challenge extends beyond predicting a finish time. It involves
learning from repeated observations of an individual athlete while fitness,
equipment and race context change. Personal physiological references and the
provenance of recorded measurements matter to how those observations are read.

The project emphasizes reproducible analysis, transparent baselines, and a clear
separation between observed associations, predictive performance and causal
claims. A faster training session does not automatically imply improved race
readiness; a slower run after a hard ride does not establish its cause.

The technical direction connects three complementary roles:

- **[PyMC](https://www.pymc.io/projects/docs/en/stable/) — performance change and prediction:** estimate race finish-time
  distributions and the probability of meeting a target, with uncertainty and
  assumptions made explicit. How much confidence should an athlete place in a
  forecast given the available training and race evidence?
- **[DoWhy](https://www.pywhy.org/dowhy/main/) — intervention questions:** investigate whether a specific change in
  preparation or pacing could improve an outcome, where the evidence and causal
  assumptions support estimation. Would a more conservative early bike effort
  improve total bike-plus-run time?
- **[PydanticAI](https://pydantic.dev/docs/ai/core-concepts/agent/) — evidence investigation and explanation:** use the open-source
  agent framework
  to coordinate evidence retrieval and analysis tools.
  An LLM would interpret questions and explain results; the agent runtime would
  manage typed tool interactions and structured responses. Which observations
  support a forecast, what assumptions matter, and what context is missing?

The agent design keeps the language model and provider interchangeable. Options
include OpenAI or Anthropic APIs, and open-weight models served locally or through
a hosted endpoint. Candidates would be evaluated against the same tools and
questions. Selection depends on tool-calling reliability, evidence quality,
privacy, latency and cost. Credentials are configured privately where required;
the open-source agent framework is independent of that deployment choice.

The agent direction emphasizes traceable answers and evaluation of both tool use
and evidence attribution. Structured responses help make answers inspectable;
their factual support still needs checking.

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
This repository presents the project's research questions and direction. It does
not publish athlete data, internal methods, or implementation-status claims.
