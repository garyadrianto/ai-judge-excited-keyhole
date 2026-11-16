# ai-judge-excited-keyhole

A tiny deterministic image program for the make.fun bounty `ai-excited-01`. `main.ts` copies the bundled `entry.png` (a keyhole view of a city) byte-for-byte into an output directory, verifying the PNG signature on the way in and the byte count on the way out, so every run produces identical output. It uses only the Node 22 standard library and needs no install step.

Run it from the repository root with:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The image is then written to `out/entry.png`.

[![ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)

[![rank](https://make.fun/badge/ai-excited-01/garyadrianto/ai-judge-excited-keyhole/rank.svg)](https://make.fun/bounty/ai-excited-01)

[![reward](https://make.fun/badge/ai-excited-01/garyadrianto/ai-judge-excited-keyhole/reward.svg)](https://make.fun/bounty/ai-excited-01)
