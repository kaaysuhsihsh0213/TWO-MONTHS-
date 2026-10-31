# Two-Month Anniversary Website ❤️

A small personal website for Rasmalai: funny first, cinematic and heartfelt at the end.
Plain HTML + CSS + JavaScript. No build step, no backend.

## Run it locally
Just open `index.html` in a browser. Or, for the most accurate result:
```
cd two-month-anniversary
python3 -m http.server 8000
```
then visit http://localhost:8000

## Change the content
Open `script.js`. Everything editable is in the `CONFIG` block at the top:

| What | Variable |
|---|---|
| Nickname | `NICKNAME` |
| Anniversary date text | `ANNIVERSARY_DATE` |
| Photos + captions + alt text | `PHOTOS` (`file`, `caption`, `alt`) |
| Quiz questions, answers, reactions | `QUIZ` |
| Quiz ending lines | `QUIZ_WIN`, `QUIZ_HONEST` |
| "Little things" cards | `LOVE_CARDS` |
| Gift box message | `GIFT_HEADLINE`, `GIFT_TEXT` |
| Love letter | `LETTER` (one item per paragraph; replace all of it) |
| Final lines | `FINALE_A`, `FINALE_B` |
| Music file | `MUSIC_FILE` |
| Seconds per slide | `SLIDE_SECONDS` |

Any text containing the word "Rasmalai" is swapped automatically if you change `NICKNAME`.

## Photos
Photos live in `assets/photos/` (`photo1.png` … `photo5.png`, in the order they were taken).
To add one: copy it into that folder and add a line to `PHOTOS`. To swap one: replace the file, keep the name.
Photos are always shown whole (never cropped or stretched).

## Music
Put your song at `assets/music/our-song.mp3` (or change `MUSIC_FILE`). Music never autoplays; she taps 🎵 to play and 🔊 to mute.
With no file, the site works normally and the music button shows a small hint.

## Deploy on GitHub Pages
1. Create a GitHub repository and upload everything inside `two-month-anniversary/` (so `index.html` is at the top level).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

All paths are relative, so it works under a repo sub-path.
