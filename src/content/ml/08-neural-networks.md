---
title: Neural Networks
chapter: Supervised Learning
description: The perceptron and its learning rule, why XOR needs a hidden layer, multi-layer perceptrons and feed-forward networks, activation functions, counting parameters, the forward pass and backpropagation, for GATE DA.
---
A **neural network** is built from simple units called **neurons**. Each neuron computes a weighted sum of its inputs plus a bias, and passes it through an **activation function** g:

a = g(**w**ᵀ**x** + b)

Connecting many neurons in layers gives a model that can represent very complicated functions.

## The perceptron

The **perceptron** (Rosenblatt, 1958) is a single neuron with a **step** activation: it outputs 1 if **w**ᵀ**x** + b ≥ 0 and 0 otherwise. It is a linear classifier.

**Perceptron learning rule.** For each training sample (**x**, y) with prediction ŷ:

**w ← w + η (y − ŷ) x**, **b ← b + η (y − ŷ)**

Nothing changes when the prediction is correct. A false negative (y = 1, ŷ = 0) adds η**x** to the weights, and a false positive subtracts it.

The **perceptron convergence theorem**: if the data is **linearly separable**, the rule finds a separating hyperplane in a finite number of updates. If it is not separable, the weights never settle.

```python
# Learn AND with the perceptron rule.
data = [((0, 0), 0), ((0, 1), 0), ((1, 0), 0), ((1, 1), 1)]
w, b, eta = [0.0, 0.0], 0.0, 1.0
for epoch in range(1, 20):
    mistakes = 0
    for (x1, x2), y in data:
        pred = 1 if w[0] * x1 + w[1] * x2 + b >= 0 else 0
        if pred != y:
            mistakes += 1
            w = [w[0] + eta * (y - pred) * x1, w[1] + eta * (y - pred) * x2]
            b += eta * (y - pred)
    print(f"epoch {epoch}: w = {w}, b = {b}, mistakes = {mistakes}")
    if mistakes == 0:
        break
```
```output
epoch 1: w = [1.0, 1.0], b = 0.0, mistakes = 2
epoch 2: w = [2.0, 1.0], b = -1.0, mistakes = 3
epoch 3: w = [2.0, 1.0], b = -2.0, mistakes = 3
epoch 4: w = [2.0, 2.0], b = -2.0, mistakes = 2
epoch 5: w = [2.0, 1.0], b = -3.0, mistakes = 1
epoch 6: w = [2.0, 1.0], b = -3.0, mistakes = 0
```

### XOR: the limit of a single layer

XOR outputs 1 for (0, 1) and (1, 0), and 0 for (0, 0) and (1, 1). No straight line separates the two classes, so **no single perceptron can compute XOR**. Minsky and Papert's 1969 book made this famous. The fix is a **hidden layer**: XOR(x₁, x₂) = AND(OR(x₁, x₂), NAND(x₁, x₂)).

```python
step = lambda z: 1 if z >= 0 else 0

def xor_net(x1, x2):
    h1 = step(x1 + x2 - 0.5)        # OR
    h2 = step(-x1 - x2 + 1.5)       # NAND
    return step(h1 + h2 - 1.5)      # AND

for x in [(0, 0), (0, 1), (1, 0), (1, 1)]:
    print(x, "->", xor_net(*x))
```
```output
(0, 0) -> 0
(0, 1) -> 1
(1, 0) -> 1
(1, 1) -> 0
```

## Multi-layer perceptrons (feed-forward networks)

A **multi-layer perceptron** (MLP) has an input layer, one or more **hidden layers**, and an output layer. Each neuron in a layer is connected to every neuron in the next layer (**fully connected**), and information flows only forward, with no cycles: a **feed-forward network**.

With layer sizes n₀ (inputs), n₁, …, n<sub>L</sub>, layer l computes

**a⁽ˡ⁾ = g(W⁽ˡ⁾ a⁽ˡ⁻¹⁾ + b⁽ˡ⁾)**, where W⁽ˡ⁾ is an nₗ × nₗ₋₁ matrix.

**Number of parameters:** layer l has nₗ × nₗ₋₁ weights and nₗ biases. A network with sizes 4 → 5 → 3 has (4 × 5 + 5) + (5 × 3 + 3) = 25 + 18 = **43** parameters.

**Why non-linear activations?** If every g were linear, the whole network would collapse into one linear map (a product of matrices is a matrix), no more powerful than linear regression. The **universal approximation theorem** says that one hidden layer with a non-linear activation and enough neurons can approximate any continuous function on a bounded region.

### Activation functions

| Activation | Formula | Range | Derivative |
| --- | --- | --- | --- |
| Sigmoid | 1 / (1 + e^(−z)) | (0, 1) | σ(z)(1 − σ(z)) |
| tanh | (eᶻ − e^(−z)) / (eᶻ + e^(−z)) | (−1, 1) | 1 − tanh²(z) |
| ReLU | max(0, z) | [0, ∞) | 1 for z > 0, 0 for z < 0 |
| Step | 1 if z ≥ 0 else 0 | {0, 1} | 0 (not usable for gradient descent) |

The output layer matches the task: a linear output for regression, a sigmoid for binary classification, and a **softmax** for multi-class classification. Sigmoid and tanh **saturate**: for large |z| their derivatives are nearly 0, so gradients shrink as they pass back through many layers (the **vanishing gradient** problem). ReLU does not saturate for positive inputs, which is why it is the default in hidden layers. Note that tanh(z) = 2σ(2z) − 1.

## Training: backpropagation

The network is trained by gradient descent on a loss (squared error or cross-entropy). **Backpropagation** computes all the gradients efficiently with the **chain rule**:

1. **Forward pass**: compute every layer's output, from the input to the loss.
2. **Backward pass**: starting from the loss, compute the gradient with respect to each layer's outputs, then its weights, moving backwards one layer at a time and reusing the results of the layer after it.
3. **Update** every weight: w ← w − η ∂L/∂w.

The loss of a network with hidden layers is **not convex**, so gradient descent can stop at a local minimum; in practice, good solutions are still found. Weights must be initialised **randomly**: if all weights start equal, every neuron in a layer gets the same gradient and they stay identical forever (the **symmetry** problem).

**Worked example.** One sigmoid neuron with one input, squared-error loss L = ½(a − y)². Input x = 1.5, target y = 1, initial w = 0.4, b = −0.2, learning rate η = 0.5.

- Forward: z = 0.4 × 1.5 − 0.2 = 0.4, a = σ(0.4) ≈ 0.5987, L ≈ 0.0805.
- Backward: ∂L/∂a = a − y ≈ −0.4013; ∂a/∂z = a(1 − a) ≈ 0.2403; so ∂L/∂z ≈ −0.0964. Then ∂L/∂w = ∂L/∂z × x ≈ −0.1446 and ∂L/∂b = ∂L/∂z ≈ −0.0964.
- Update: w ≈ 0.4 + 0.5 × 0.1446 ≈ 0.4723, b ≈ −0.2 + 0.5 × 0.0964 ≈ −0.1518.

The program checks the gradient against a numerical derivative, the standard way to test a backpropagation implementation.

```python
import math

sig = lambda z: 1 / (1 + math.exp(-z))
x, y, w, b, eta = 1.5, 1.0, 0.4, -0.2, 0.5

def loss(w, b):
    return 0.5 * (sig(w * x + b) - y) ** 2

z = w * x + b
a = sig(z)
dz = (a - y) * a * (1 - a)
dw, db = dz * x, dz
print(f"z = {z:.4f}, a = {a:.4f}, loss = {loss(w, b):.4f}")
print(f"dL/dw = {dw:.4f}, dL/db = {db:.4f}")
h = 1e-6
print(f"numerical dL/dw = {(loss(w + h, b) - loss(w - h, b)) / (2 * h):.4f}")
w, b = w - eta * dw, b - eta * db
print(f"after one step: w = {w:.4f}, b = {b:.4f}, loss = {loss(w, b):.4f}")
```
```output
z = 0.4000, a = 0.5987, loss = 0.0805
dL/dw = -0.1446, dL/db = -0.0964
numerical dL/dw = -0.1446
after one step: w = 0.4723, b = -0.1518, loss = 0.0664
```

One step lowered the loss, as it should.

## Practice questions

```quiz
q: How many trainable parameters (weights and biases) does a fully connected network with layer sizes 10 → 8 → 4 → 1 have?
answer: 129
verify: (10 * 8 + 8) + (8 * 4 + 4) + (4 * 1 + 1)
explain: (10 × 8 + 8) + (8 × 4 + 4) + (4 × 1 + 1) = 88 + 36 + 5 = 129.
```

```quiz
q: A perceptron has w = (1, −1), b = 0 and learning rate η = 1. It sees the sample x = (2, 3) with label y = 1. What is the new weight vector after applying the perceptron rule?
- (1, −1)
* (3, 2)
- (−1, −4)
- (2, 3)
verify:
  w, b, x, y = [1, -1], 0, (2, 3), 1
  pred = 1 if w[0] * x[0] + w[1] * x[1] + b >= 0 else 0
  w = [w[i] + (y - pred) * x[i] for i in range(2)]
  print(f"({w[0]}, {w[1]})")
explain: wᵀx + b = 2 − 3 + 0 = −1 < 0, so the prediction is 0 but the label is 1. The rule adds x: (1 + 2, −1 + 3) = (3, 2).
```

```quiz
q: A ReLU neuron has weights (0.5, −1), bias 0.25 and input (2, 1.5). What is its output?
answer: 0
verify: max(0, 0.5 * 2 - 1 * 1.5 + 0.25)
explain: z = 0.5 × 2 − 1 × 1.5 + 0.25 = 1 − 1.5 + 0.25 = −0.25. ReLU gives max(0, −0.25) = 0.
```

```quiz
q: What is the value of tanh(z) when σ(2z) = 0.8, where σ is the sigmoid function?
answer: 0.6
verify: round(2 * 0.8 - 1, 9)
explain: tanh(z) = 2σ(2z) − 1 = 2 × 0.8 − 1 = 0.6.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A single perceptron cannot represent XOR
* Without non-linear activations, a multi-layer network is equivalent to a single linear layer
- Backpropagation always finds the global minimum of a neural network's loss
- Initialising all weights to the same value is the recommended way to start training
explain: XOR is not linearly separable. Stacked linear maps compose into one linear map. The loss of a network with hidden layers is not convex, so gradient descent can get stuck in local minima. Equal initial weights keep all neurons in a layer identical (symmetry), so weights are initialised randomly.
```

```quiz
q: Which activation function's derivative is exactly 0 for every negative input?
- Sigmoid
- tanh
* ReLU
- Softmax
explain: ReLU(z) = max(0, z) is flat for z < 0, so its derivative there is 0. Sigmoid and tanh have small but non-zero derivatives everywhere.
```
