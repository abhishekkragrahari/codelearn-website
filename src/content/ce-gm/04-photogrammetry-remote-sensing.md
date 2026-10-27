---
title: Photogrammetry, Remote Sensing and GPS
chapter: Modern Surveying
description: Scale of vertical photographs, relief displacement, overlap and number of photographs, parallax heights, remote sensing principles and resolutions, GIS basics, GPS and total station.
---
Modern surveying uses photographs, satellites and electronic instruments to map large areas quickly.

## Aerial photogrammetry

For a vertical photograph taken by a camera of focal length f from flying height H above datum, for ground at elevation h:

- **Scale = f/(H − h)**.
- **Relief displacement** of a point at height h, radial distance r from the principal point: **d = r h/H** (displaced away from the centre). It is used to find heights of tall objects.
- **Overlap:** about 60% forward (along the flight line) and 30% side overlap, so each point appears on at least two photos for stereoscopic viewing.
- **Ground coverage of one photo** (side L on the ground): L = photo size × (H − h)/f.
- Number of photos ≈ (area)/(net area covered by one photo), with the net area reduced by the overlaps.
- **Parallax:** heights from the difference in parallax between two photos: Δh = (H − h) Δp/(b + Δp) for photo base b.

## Remote sensing

Sensors detect electromagnetic energy reflected or emitted by the Earth.

- **Passive** (uses sunlight: optical, thermal) and **active** (sends its own energy: radar, LiDAR).
- **Atmospheric windows:** wavelengths that pass through the air (visible, near infrared, thermal infrared, microwave).
- **Resolutions:** spatial (ground size of a pixel), spectral (number and width of bands), radiometric (grey levels, bits), temporal (revisit time).
- Healthy vegetation reflects strongly in the near infrared: **NDVI = (NIR − Red)/(NIR + Red)**.

## GIS

A geographic information system stores, analyses and displays spatial data: **vector** (points, lines, polygons) and **raster** (grid cells) formats; overlay and buffer analysis.

## GPS and total station

- **GNSS/GPS** finds position from the ranges to at least **4 satellites** (3 for position plus 1 for the receiver clock error). Differential GPS (DGPS) and RTK improve accuracy to centimetres.
- **Total station:** electronic theodolite + EDM (electronic distance measurement), recording data digitally.

## Worked example

A camera with f = 150 mm flies 3000 m above datum over ground at 500 m.

- Scale = 0.15/(3000 − 500) = **1/16,667**.

## Practice

```quiz
q: A photograph is taken with f = 152 mm from 2280 m above ground. What is the scale denominator (1 : x)?
answer: 15000
verify: round(2280 / 0.152)
explain: Scale = f/H = 0.152/2280 = 1/15,000.
```

```quiz
q: A tower top appears 60 mm from the principal point on a photo taken from 1500 m above its base; the relief displacement is 4 mm. What is the tower height in m?
answer: 100
verify: 4 * 1500 / 60
explain: h = dH/r = 4 × 1500/60 = 100 m.
```

```quiz
q: A pixel has NIR = 0.5 and Red = 0.1. What is its NDVI? (Give 3 decimal places.)
answer: 0.667
verify: round((0.5 - 0.1) / (0.5 + 0.1), 3)
explain: NDVI = 0.4/0.6 = 0.667 (dense healthy vegetation).
```

```quiz
q: What is the minimum number of GPS satellites needed for a 3D position fix with an unknown receiver clock error?
answer: 4
verify: 3 + 1
explain: Three unknown coordinates plus the receiver clock bias need four ranges.
```
