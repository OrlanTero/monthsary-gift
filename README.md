# Jhon + Marian — Episode 01

A Vite + React anime-inspired monthsary story for Jhon Orlan Tero and Marian Leanda. The page uses the anime-style illustrations from `pics/` in a one-sitting story, photo album, and two video placeholders.

## Photo order

The original files in `pics/` are kept as supplied. Copies used by the website live in `public/media/photos/`.

- Cover: `15.webp` — lead-character cover portrait.
- Story album, in order: `1.webp`, `2.webp`, `3.webp`, `4.webp`, `17.jpg`, `5.webp`, `6.webp`, `8.webp`, `9.webp`, `10.webp`, `11.webp`, `12.webp`, `13.jpeg`, `14.webp`, `16.webp`.
- Each story photo opens with its own caption and short note. The captions and story order can be changed in the `photos` list in `src/main.jsx`.

## Video placeholders

The two supplied videos are copied from `pics/first-vid.mp4` and `pics/second-vid.mp4` into `public/media/videos/`. They autoplay muted, loop continuously, and have no controls or pause interaction. The first is the monthsary greeting; the second is a video of you two together.

## Personal note

The note button opens a placeholder. Replace the text in the `note-modal` section of `src/main.jsx` when your message is ready.

The date counter starts from September 26, 2026 and updates from the current date.

## Run locally

```bash
npm install
npm run dev
```


Clicking a video opens it in a larger popup. Both the card preview and popup stay muted, autoplaying, and looping without playback controls.
