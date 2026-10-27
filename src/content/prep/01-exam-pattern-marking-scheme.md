---
title: GATE CS Exam Pattern and Marking Scheme
chapter: Know the Exam
description: GATE CS exam pattern explained: 65 questions, 100 marks, MCQ, MSQ and NAT, negative marking, section weightage and how to calculate your raw score.
---
Before you plan your preparation, know exactly how the GATE Computer Science and Information Technology (CS) paper is built and marked. This page explains the pattern, the three question types, negative marking, and how to work out your raw score from a response sheet.

> **Note:** GATE is conducted by IISc and the IITs on behalf of the National Coordination Board – GATE. GATE 2027 is organised by IIT Madras; its official website is [gate2027.iitm.ac.in](https://gate2027.iitm.ac.in/). Always confirm dates, fees and rules in the official information brochure.

## The paper at a glance

| Item | Details |
| --- | --- |
| Mode | Computer-based test (CBT) at an exam centre |
| Duration | 3 hours |
| Questions | 65 questions, 100 marks |
| General Aptitude (GA) | 10 questions, 15 marks (5 × 1 mark + 5 × 2 marks), common to all papers |
| Engineering Mathematics | About 13 marks |
| Core CS subjects | About 72 marks |
| Marks per question | 1 mark or 2 marks |
| Calculator | On-screen virtual calculator only |

Engineering Mathematics (including Discrete Mathematics) and the core subjects together make 55 questions worth 85 marks: 25 one-mark and 30 two-mark questions.

## The three question types

| Type | What you do | Negative marking |
| --- | --- | --- |
| **MCQ** (multiple choice) | Pick the one correct option out of four | Yes: −1/3 for a 1-mark question, −2/3 for a 2-mark question |
| **MSQ** (multiple select) | Pick **all** correct options; one or more are correct | None, but there is no partial credit |
| **NAT** (numerical answer) | Type a number using the virtual keypad | None |

Points that cost students marks every year:

- An MSQ gives marks only if you select **exactly** the set of correct options. One extra or one missing option gives zero.
- A NAT answer may be an integer or a decimal; read whether the question asks you to round, and to how many places. The official answer key often gives a range for decimal answers.
- An unattempted question gives zero. Guessing is free on MSQ and NAT, but costs marks on MCQ when wrong.

## Calculating your raw score

Raw score = (marks from correct answers) − (negative marks from wrong MCQs).

For example, suppose you answer 15 one-mark MCQs correctly and 4 wrongly, 20 two-mark MCQs correctly and 6 wrongly, and score 20 marks from MSQ and NAT:

- Correct MCQ marks: 15 × 1 + 20 × 2 = 55
- Negative marks: 4 × 1/3 + 6 × 2/3 = 4/3 + 4 = 16/3 ≈ 5.33
- Raw score: 55 + 20 − 5.33 = **69.67**

```javascript
const correct = 15 * 1 + 20 * 2;
const negative = 4 * (1 / 3) + 6 * (2 / 3);
const raw = correct + 20 - negative;
console.log("negative:", negative.toFixed(2));
console.log("raw score:", raw.toFixed(2));
```
```output
negative: 5.33
raw score: 69.67
```

## Raw marks, normalised marks and GATE score

When a paper is held in a single session, the marks out of 100 are used directly. When it is held in more than one session (for example as CS1 and CS2), the marks are **normalised** first, so that a harder session does not put its candidates at a disadvantage. The marks are then converted into a **GATE score** out of 1000, which PSUs and admissions use. The exact formula is published in the official information brochure each year.

The **qualifying marks** (cut-off) are set separately for each paper and each category every year, so do not rely on old numbers: check the result notification of the year you appear.

## Exam-day strategy

1. **First pass:** attempt every question you can solve in under two minutes, NATs and MSQs included.
2. **Second pass:** come back to the longer two-mark questions.
3. **Last 15 minutes:** review marked questions; guess a NAT or MSQ rather than leaving it blank, but guess an MCQ only if you can eliminate at least two options.

With four options and no elimination, a random MCQ guess has an expected value of 1/4 × 1 − 3/4 × 1/3 = 0 marks for a one-mark question. Eliminating even one option makes the expected value positive.

## Practice

```quiz
q: How many questions and how many marks does the GATE CS paper have?
- 60 questions, 100 marks
* 65 questions, 100 marks
- 65 questions, 120 marks
- 100 questions, 100 marks
explain: GATE has 65 questions for 100 marks: 10 General Aptitude questions (15 marks) and 55 subject questions (85 marks).
```

```quiz
q: Which question types in GATE have negative marking?
- MSQ only
- NAT only
* MCQ only
- MCQ and MSQ
explain: Only MCQs carry negative marks (−1/3 or −2/3). MSQ and NAT have no negative marking.
```

```quiz
q: A student gets 10 two-mark MCQs wrong and nothing else wrong. How many marks are deducted? (Give 2 decimal places.)
answer: 6.67
verify: round(10 * 2 / 3, 2)
explain: Each wrong two-mark MCQ costs 2/3: 10 × 2/3 = 6.67 marks.
```

```quiz
q: The 55 subject questions are worth 85 marks, all 1 or 2 marks each. How many of them are two-mark questions?
answer: 30
verify: next(t for t in range(56) if (55 - t) + 2 * t == 85)
explain: If t questions carry 2 marks, (55 − t) + 2t = 85, so t = 30 and 25 questions carry 1 mark.
```

```quiz
q: In an MSQ, options A, C and D are correct. A student selects A and C only. What does the student score?
* 0 marks
- Partial credit for two correct options
- Negative 1/3
- Full marks
explain: MSQs have no partial credit and no negative marking: an incomplete selection scores 0.
```

```quiz
q: A student is sure 2 of the 4 options of a one-mark MCQ are wrong and guesses between the other two. What is the expected mark of the guess? (Give 2 decimal places.)
answer: 0.33
verify: round(0.5 * 1 - 0.5 * (1 / 3), 2)
explain: Expected value = 1/2 × 1 − 1/2 × 1/3 = 1/3 ≈ 0.33 marks, so the guess is worth taking.
```
