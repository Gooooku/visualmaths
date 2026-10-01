# VisualMaths — site d'animations

## Fichiers (tous au même niveau, sans sous-dossier)
- `index.html` : la page d'accueil avec les chapitres et les cartes des vidéos
- `points-vecteurs.html`, `droite-theorie.html`, `droite-drones.html`, `droite-rayon.html` : les vidéos
- `droite-complete.html` : la droite et ses deux applications à la suite
- `thumb-*.jpg` : les vignettes des cartes
- `three.min.js`, `OrbitControls.js`, `RoomEnvironment.js` : le moteur 3D
- `sw.js`, `manifest.webmanifest`, `icone.svg` : hors connexion et installation sur l'écran d'accueil

## Mise en ligne
1. Crée un dépôt public sur GitHub (par exemple `maths-3d`).
2. « Add file » → « Upload files » : dépose tous les fichiers d'un coup, puis « Commit changes ».
3. « Settings » → « Pages » → « Deploy from a branch » → `main` / `(root)` → Save.
4. Le site est disponible à `https://<ton-compte>.github.io/maths-3d/`.

## Ajouter une vidéo
1. Dépose le fichier de la vidéo (`.html`) et sa vignette (image 16/9, par exemple `thumb-xxx.jpg`).
2. Dans `index.html`, dans la liste `CHAPITRES`, copie un bloc `{ titre: …, texte: …, lien: …, image: …, duree: …, tag: … }`
   dans le bon chapitre et adapte-le. Pour un nouveau chapitre, copie tout un bloc de chapitre.
3. Dans `sw.js`, ajoute les nouveaux fichiers à la liste `FILES` et change le numéro de `CACHE` (v1 → v2)
   pour que les appareils reçoivent la mise à jour.
