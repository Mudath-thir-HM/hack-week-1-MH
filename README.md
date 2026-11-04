# Directorate of Procurement (Army)

Landscape kiosk app for a foyer touchscreen. Opens on a plan of the Directorate;
touch a room and the plate zooms, then the room's file slides in over it.

## Run it

- Double-click `run.bat` → opens `index.html` in Edge kiosk (fullscreen, no chrome).
- Run `prepare.bat` once to put a shortcut on the Desktop (`assets/icons/app.ico`).
- Needs no server, no build step and no network. Open `index.html` directly to test in a tab.

## Structure

    index.html            entry point — boot screen, plate, dossier shell
    css/fonts.css         self-hosted @font-face (Cinzel Decorative, Tangerine, Cinzel, Lora, Inter)
    css/styles.css        all styling; 1920×1080 stage scaled to the screen
    data/directorate.js   every word and figure shown in the app
    js/app.js             boot sequence, plate, zoom transition, idle return
    assets/js/gsap.min.js bundled GSAP (local, no CDN)
    assets/fonts/         woff2 + ttf, licensed OFL (see OFL-*.txt)
    assets/img/           portraits
    assets/icons/app.ico  shortcut icon

## Editing content

All content lives in `data/directorate.js` — one object per room (`nodes`), plus `meta`.
Nothing is fetched at runtime; edit the file and reload.

## Behaviour

- Boot: an `Open the plate` start button gates the app; the curtain lifts, then the plate draws in.
- Tap a room → zoom to it, dossier slides open, map blurs behind for depth.
- `The plate` button (or `Esc`) → zoom back out.
- Next / the index rail jump between rooms.
- Idle 75 s returns to the plate by itself.
- Add `?static` to the URL for a frozen frame (design review), `?selftest` to check all
  ten files fit without overflow, `#n=<id>` to open a room directly.

## Colours

Deep bottle green `#07140F` / `#0E3B2C`, parchment `#E9E3D2`, brass `#A8853F` / `#C6AA68`,
ivory `#F2ECDD`. Tangerine is used only for the Director's signature.
