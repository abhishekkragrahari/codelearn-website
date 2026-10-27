---
title: GATE CS Previous Year Papers and How to Analyse Them
chapter: Know the Exam
description: Where to download official GATE CS previous year question papers and answer keys, and a step-by-step method to analyse them topic-wise for your own preparation.
---
Previous year papers (PYQs) are the best guide to what GATE asks and how it asks it. This page tells you where to get the **official** papers and answer keys, and how to turn them into a topic-wise analysis that shapes your study plan.

> **Note:** GATE question papers are published by the organising IITs. This site does not reproduce them; the practice questions on GateShala are original, written in the GATE style. Download papers only from official websites.

## Where to get official papers

- **The current GATE website.** GATE 2027 is organised by IIT Madras: [gate2027.iitm.ac.in](https://gate2027.iitm.ac.in/). Each year's official site has a section for previous question papers and answer keys.
- **The GATE office of each IIT and IISc.** The zonal GATE offices also host papers and keys of the years they organised.
- **Your own response sheet.** After the exam, candidates can view their responses and the provisional answer key on the GOAPS portal, and the final key is published with the results.

Avoid papers from unofficial sources that retype questions: they often contain typing errors, missing figures and wrong keys.

## A topic-wise analysis in five steps

Make a table with one row per question and these columns: year, question number, marks (1 or 2), type (MCQ, MSQ or NAT), subject, topic, and whether you solved it.

1. **Tag every question.** Use the section names from the [syllabus](syllabus.html), and one topic name from within the section (for example *Operating System → Paging*).
2. **Total the marks per subject for each year.** The weightage moves a little from year to year, so look at the average over several years, not one paper.
3. **Find the repeated topics.** Some topics come almost every year (for example asymptotic complexity, CPU scheduling, normal forms, subnetting, cache mapping, DFA minimization). Make sure these are your strongest.
4. **Mark your score per subject.** Solve each paper in three hours under exam conditions, then record the marks you lost per subject.
5. **Plan from the gaps.** Spend the next week's study time where *weightage is high and your score is low*.

The program below shows how to total such a table. The data here is a made-up sample, not real GATE data: replace it with your own tags.

```python
from collections import defaultdict

# (subject, marks, solved?) for each question you tagged. Sample data only.
tags = [
    ("Algorithms", 2, True), ("Algorithms", 1, False), ("OS", 2, True),
    ("OS", 2, False), ("CN", 1, True), ("CN", 2, True), ("TOC", 2, False),
    ("DBMS", 1, True), ("DBMS", 2, True), ("COA", 2, False),
]
total = defaultdict(int)
lost = defaultdict(int)
for subject, marks, solved in tags:
    total[subject] += marks
    if not solved:
        lost[subject] += marks
for subject in sorted(total, key=lambda s: -lost[s]):
    print(f"{subject:10} marks {total[subject]}  lost {lost[subject]}")
```
```output
OS         marks 4  lost 2
TOC        marks 2  lost 2
COA        marks 2  lost 2
Algorithms marks 3  lost 1
CN         marks 3  lost 0
DBMS       marks 3  lost 0
```

## Using PYQs at each stage

| Stage | How to use previous papers |
| --- | --- |
| While learning a subject | After each topic, solve that topic's PYQs from the last 10 years |
| After finishing the syllabus | Solve full papers year-wise, one per week, timed |
| Last month | Re-solve only the questions you got wrong earlier |

Each subject track on this site ends with a GATE practice set of original questions on the same patterns: for example [Operating Systems](../os/gate-practice-set.html), [Computer Networks](../cn/gate-practice-set.html) and [Algorithms](../dsa/gate-practice-set.html).

## Practice

```quiz
q: In the sample analysis above, how many marks did the student lose in total?
answer: 7
verify: sum(m for s, m, ok in [("Algorithms", 2, True), ("Algorithms", 1, False), ("OS", 2, True), ("OS", 2, False), ("CN", 1, True), ("CN", 2, True), ("TOC", 2, False), ("DBMS", 1, True), ("DBMS", 2, True), ("COA", 2, False)] if not ok)
explain: Lost marks: Algorithms 1 + OS 2 + TOC 2 + COA 2 = 7.
```

```quiz
q: Which is the most reliable source for GATE previous year papers and answer keys?
- Any PDF shared on social media
* The official website of the organising IIT
- A coaching institute's retyped copy
- Online forums
explain: The organising institutes publish the papers and keys. Retyped copies can have errors in questions, figures and answers.
```

```quiz
q: Weightage per subject changes slightly every year. Over three years a subject carried 8, 11 and 11 marks. What is its average weightage?
answer: 10
verify: (8 + 11 + 11) // 3
explain: (8 + 11 + 11) / 3 = 30 / 3 = 10 marks.
```
