---
title: Clustering - k-Means, k-Medoids and Hierarchical Clustering
chapter: Unsupervised Learning
description: The k-means algorithm and its objective, initialization and choosing k, k-medoids, and agglomerative hierarchical clustering with single, complete and average linkage and dendrograms, with worked GATE DA examples.
---
**Clustering** groups unlabelled samples so that samples in the same group (cluster) are similar and samples in different groups are not. There are no labels to learn from, so "similar" is defined by a **distance**, usually Euclidean.

## k-means

k-means splits the data into exactly k clusters, each represented by its **centroid** (the mean of its points). It minimises the **within-cluster sum of squares** (WCSS, also called inertia):

**J = Σ over clusters Σ over points x in the cluster ‖x − μ<sub>c</sub>‖²**

**Lloyd's algorithm:**

1. Choose k initial centroids (for example, k random samples).
2. **Assignment step**: assign every point to its nearest centroid.
3. **Update step**: move each centroid to the mean of the points assigned to it.
4. Repeat steps 2 and 3 until no assignment changes.

Each step can only lower J (or leave it unchanged), and there are finitely many ways to assign points, so the algorithm always **converges**, but only to a **local minimum** that depends on the starting centroids. In practice it is run several times from different starts, keeping the result with the smallest J. **k-means++** picks starting centroids that are spread out, which gives better results.

**Worked example.** Cluster the points 2, 4, 10, 12, 3, 20, 30, 11, 25 into k = 2 clusters, starting with centroids 2 and 4.

```python
points = [2, 4, 10, 12, 3, 20, 30, 11, 25]
centroids = [2.0, 4.0]
for it in range(1, 20):
    clusters = [[] for _ in centroids]
    for p in points:
        nearest = min(range(len(centroids)), key=lambda c: abs(p - centroids[c]))
        clusters[nearest].append(p)
    new = [sum(c) / len(c) for c in clusters]
    print(f"iteration {it}: clusters {[sorted(c) for c in clusters]}, centroids -> {[round(c, 3) for c in new]}")
    if new == centroids:
        break
    centroids = new
wcss = sum((p - centroids[i]) ** 2 for i, c in enumerate(clusters) for p in c)
print(f"WCSS = {wcss:.3f}")
```
```output
iteration 1: clusters [[2, 3], [4, 10, 11, 12, 20, 25, 30]], centroids -> [2.5, 16.0]
iteration 2: clusters [[2, 3, 4], [10, 11, 12, 20, 25, 30]], centroids -> [3.0, 18.0]
iteration 3: clusters [[2, 3, 4, 10], [11, 12, 20, 25, 30]], centroids -> [4.75, 19.6]
iteration 4: clusters [[2, 3, 4, 10, 11, 12], [20, 25, 30]], centroids -> [7.0, 25.0]
iteration 5: clusters [[2, 3, 4, 10, 11, 12], [20, 25, 30]], centroids -> [7.0, 25.0]
WCSS = 150.000
```

### Properties of k-means

- Each iteration costs O(n · k · d).
- It finds **convex, roughly spherical** clusters of similar size. It fails on elongated or ring-shaped clusters.
- The mean is pulled by **outliers**, which can drag a centroid away from its cluster.
- Features must be **scaled**, as for k-NN.
- **Choosing k**: J always decreases as k grows (with k = n, J = 0), so the smallest J is not the answer. The **elbow method** plots J against k and picks the k where the decrease slows sharply.

## k-medoids

**k-medoids** is like k-means, but each cluster is represented by a **medoid**: an actual data point, the one with the smallest total distance to the other points in its cluster. The best-known algorithm is **PAM** (Partitioning Around Medoids), which repeatedly tries swapping a medoid with a non-medoid point and keeps the swap if the total cost falls.

- It works with **any distance or dissimilarity**, even when a "mean" makes no sense (for example, edit distance between strings).
- It is **more robust to outliers**, because a medoid cannot be dragged outside the data the way a mean can.
- It is slower than k-means: computing the best medoid of a cluster with m points takes O(m²) distance computations.

For the one-dimensional cluster {1, 2, 3, 4, 100}, the mean is 22, far from every point, while the medoid is 3.

## Hierarchical clustering

**Agglomerative** (bottom-up) hierarchical clustering does not need k in advance:

1. Start with every point in its own cluster.
2. Merge the **two closest clusters**.
3. Repeat until one cluster remains.

The sequence of merges is drawn as a **dendrogram**, a tree whose leaves are the points and where the height of each join is the distance at which the clusters merged. Cutting the dendrogram at a chosen height gives a flat clustering.

The distance between two **clusters** A and B is defined by the **linkage**:

| Linkage | Distance between clusters A and B | Behaviour |
| --- | --- | --- |
| **Single** | Minimum distance between a point in A and a point in B | Can form long "chains"; finds non-convex shapes |
| **Complete** | Maximum distance between a point in A and a point in B | Compact clusters of similar diameter; sensitive to outliers |
| **Average** | Average of all pairwise distances between A and B | A compromise between the two |

Single linkage builds exactly the same tree as **Kruskal's algorithm** for the minimum spanning tree: each merge adds the shortest remaining edge between two components.

**Worked example.** Points on a line: A = 1, B = 2, C = 4, D = 7, E = 11.

```python
from itertools import combinations

pts = {"A": 1, "B": 2, "C": 4, "D": 7, "E": 11}

def link(c1, c2, kind):
    d = [abs(pts[a] - pts[b]) for a in c1 for b in c2]
    return {"single": min(d), "complete": max(d), "average": sum(d) / len(d)}[kind]

for kind in ["single", "complete", "average"]:
    clusters = [(n,) for n in pts]
    print(f"{kind} linkage:")
    while len(clusters) > 1:
        a, b = min(combinations(clusters, 2), key=lambda p: link(p[0], p[1], kind))
        d = link(a, b, kind)
        clusters = [c for c in clusters if c not in (a, b)] + [a + b]
        print(f"  merge {''.join(a)} + {''.join(b)} at distance {d:g}")
```
```output
single linkage:
  merge A + B at distance 1
  merge C + AB at distance 2
  merge D + CAB at distance 3
  merge E + DCAB at distance 4
complete linkage:
  merge A + B at distance 1
  merge C + D at distance 3
  merge AB + CD at distance 6
  merge E + ABCD at distance 10
average linkage:
  merge A + B at distance 1
  merge C + AB at distance 2.5
  merge D + E at distance 4
  merge CAB + DE at distance 6.66667
```

All three linkages first merge A and B (distance 1), and then they disagree:

- **Single** linkage chains C, D and E onto the growing cluster one at a time, at heights 2, 3 and 4 (the gaps between neighbouring points).
- **Complete** linkage pairs C with D at height 3, joins that pair to AB at height 6, and adds E last at height 10.
- **Average** linkage adds C to AB at height 2.5, pairs D with E at height 4, and joins the two groups at about 6.67.

Cut at height 3.5, single linkage gives {A, B, C, D} and {E}, complete linkage gives {A, B}, {C, D} and {E}, and average linkage gives {A, B, C}, {D} and {E}.

**Divisive** (top-down) clustering works the other way: start with one cluster and split recursively. It is less common.

## Practice questions

```quiz
q: k-means with k = 2 is run on the points 1, 2, 3, 9, 10, 11, 12 with initial centroids 1 and 2. What is the final centroid of the cluster containing 12?
answer: 10.5
verify:
  pts, c = [1, 2, 3, 9, 10, 11, 12], [1.0, 2.0]
  while True:
      cl = [[p for p in pts if abs(p - c[0]) <= abs(p - c[1])], [p for p in pts if abs(p - c[0]) > abs(p - c[1])]]
      new = [sum(x) / len(x) for x in cl]
      if new == c:
          break
      c = new
  print(c[1])
explain: Iteration 1: {1} and {2, 3, 9, 10, 11, 12}, centroids 1 and 7.833. Iteration 2: {1, 2, 3} and {9, 10, 11, 12}, centroids 2 and 10.5. Iteration 3: no change. The final centroid is (9 + 10 + 11 + 12)/4 = 10.5.
```

```quiz
q: The final clusters are {1, 2, 3} and {9, 10, 11, 12}. What is the within-cluster sum of squares?
answer: 7
verify: sum((p - 2) ** 2 for p in [1, 2, 3]) + sum((p - 10.5) ** 2 for p in [9, 10, 11, 12])
explain: Cluster 1 (mean 2): 1 + 0 + 1 = 2. Cluster 2 (mean 10.5): 2.25 + 0.25 + 0.25 + 2.25 = 5. Total WCSS = 7.
```

```quiz
q: What is the medoid of the one-dimensional cluster {1, 3, 4, 8, 30}, using absolute distance?
answer: 4
verify: min([1, 3, 4, 8, 30], key=lambda m: sum(abs(m - p) for p in [1, 3, 4, 8, 30]))
explain: Total distances: from 1: 2 + 3 + 7 + 29 = 41; from 3: 2 + 1 + 5 + 27 = 35; from 4: 3 + 1 + 4 + 26 = 34; from 8: 7 + 5 + 4 + 22 = 38; from 30: 117. The smallest is 34, so the medoid is 4. (The mean, 9.2, is not even a data point.)
```

```quiz
q: Clusters P = {1, 2} and Q = {6, 9} lie on a line. What is the **complete-linkage** distance between them?
answer: 8
verify: max(abs(a - b) for a in [1, 2] for b in [6, 9])
explain: Complete linkage uses the largest pairwise distance: |1 − 9| = 8. Single linkage would give |2 − 6| = 4, and average linkage (5 + 8 + 4 + 7)/4 = 6.
```

```quiz
q: For the same clusters P = {1, 2} and Q = {6, 9}, what is the **average-linkage** distance?
answer: 6
verify: sum(abs(a - b) for a in [1, 2] for b in [6, 9]) / 4
explain: The four pairwise distances are 5, 8, 4 and 7. Their average is 24/4 = 6.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* k-means always converges, but possibly to a local minimum
* k-medoids can be used with any dissimilarity measure, not only Euclidean distance
- The k that minimises the within-cluster sum of squares is the best choice of k
* Single-linkage clustering can produce long, chain-like clusters
explain: Each k-means step does not increase J, so it converges, but the result depends on initialisation. Medoids are data points, so only pairwise dissimilarities are needed. WCSS keeps falling as k grows (0 at k = n), so the elbow method is used instead. Single linkage joins clusters through their closest points, which allows chaining.
```
