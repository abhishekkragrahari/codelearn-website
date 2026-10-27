---
title: Synchronous Generators and Motors
chapter: AC Machines
description: EMF equation with winding factors, synchronous reactance, phasor diagram, voltage regulation methods, power-angle characteristic, parallel operation and synchronisation, V-curves and synchronous motor starting.
---
Synchronous machines run at exactly synchronous speed. Almost all the world's electricity comes from **synchronous generators** (alternators); synchronous motors are used where constant speed or power factor control is needed.

## EMF equation

**E_ph = 4.44 f N_ph Φ K_w**, with winding factor K_w = K_p K_d:

- **Pitch factor** K_p = cos(α/2) (α = short-pitch angle).
- **Distribution factor** K_d = sin(mβ/2)/(m sin(β/2)) (m slots per pole per phase, β = slot angle).
- Short pitching reduces harmonics: to eliminate the nth harmonic, short-pitch by 180°/n.

## Equivalent circuit and regulation

Per phase: **E = V + I_a(R_a + jX_s)**, where X_s (synchronous reactance) = leakage reactance + armature reaction reactance.

- **Voltage regulation** = (E − V)/V. It is positive for lagging and unity pf, and can be negative for leading pf.
- Methods: **EMF (synchronous impedance) method** (pessimistic), **MMF method** (optimistic), ZPF (Potier) method (most accurate).
- From open- and short-circuit tests: Z_s = (open-circuit voltage)/(short-circuit current) at the same field current. **Short-circuit ratio (SCR)** = 1/X_s (per unit).

## Power–angle characteristic

For a cylindrical rotor (R_a neglected):

**P = (3 E V/X_s) sin δ** (δ = load or power angle)

- Maximum power at δ = 90° (steady-state stability limit).
- **Salient pole** machines add a reluctance power term (V²/2)(1/X_q − 1/X_d) sin 2δ, so their maximum is at δ < 90°.

## Parallel operation (synchronising)

Before connecting to the bus: same **voltage**, **frequency**, **phase sequence** and **phase angle** (checked with synchroscope or lamps). Once connected:

- Changing the **prime-mover input** changes the real power (and δ).
- Changing the **field excitation** changes the reactive power (and pf).

## Synchronous motor

- **Not self-starting** (uses damper windings to start as an induction motor, or a pony motor).
- **V-curves:** armature current against field current at constant load; minimum current at unity pf.
- **Over-excited:** leading pf, supplies reactive power (a **synchronous condenser** for pf correction). Under-excited: lagging pf.

## Worked example

A 3-phase alternator: 50 Hz, 100 turns per phase, flux 0.05 Wb, K_w = 0.95.

- E_ph = 4.44 × 50 × 100 × 0.05 × 0.95 = **1054.5 V**.

## Practice

```quiz
q: A coil is short-pitched by 30°. What is its pitch factor? (Give 4 decimal places.)
answer: 0.9659
verify: round(__import__("math").cos(__import__("math").radians(15)), 4)
explain: K_p = cos(α/2) = cos 15° = 0.9659.
```

```quiz
q: An alternator has E = 1.2 pu, V = 1.0 pu and X_s = 0.8 pu (per phase, per unit power). What is its maximum power in pu?
answer: 1.5
verify: round(1.2 * 1.0 / 0.8, 6)
explain: P_max = EV/X_s = 1.2/0.8 = 1.5 pu at δ = 90°.
```

```quiz
q: An over-excited synchronous motor operates at:
* Leading power factor
- Lagging power factor
- Zero power factor always
- Unity power factor always
explain: Over-excitation makes the motor supply reactive power, so it draws a leading current.
```

```quiz
q: For an alternator connected to an infinite bus, increasing the field excitation mainly changes its:
- Real power output
* Reactive power output
- Frequency
- Speed
explain: Real power is set by the prime mover; excitation changes E and hence the reactive power.
```
