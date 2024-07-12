# How to compile

```bash
docker run -v `pwd`:/home --rm ghcr.io/carlosperate/microbit-toolchain:latest yotta build
```

Find the resulting firmware in :

```
build/bbc-microbit-classic-gcc/source/microsquad-arm0-combined.hex
```
