# Mayaimi Style Bible v1

The single source of truth for how Mayaimi looks. Every art asset (vessels, dragons, buildings, characters, UI art, intro panels) follows these rules. If an art task and this file disagree, this file wins unless the task says it is changing the style bible.

Status: v1 draft, pending approval of the raft style test (issue #5).

## World
Mayaimi is a medieval fantasy world of sky rafts, airships and dragons. Only the painting style is vintage. Everything shown must be medieval fantasy: wood, rope, cloth, brass and iron. No modern objects, no cars, no modern buildings, no power lines.

## Style
Vintage Art Deco travel-poster painting, like classic Miami Beach and national park posters, applied to this fantasy world.
- Clean geometric shapes, bold flat color areas, smooth airbrushed gradients, subtle screen-print grain.
- No black outlines: edges come from color contrast.
- Strong, simple silhouettes that still read clearly when shrunk to about 128 pixels wide.
- Keep machinery simple: not steampunk, no gears everywhere.

## Color palette (natural, not neon)
| Use | Color | Hex |
|---|---|---|
| Sea | Ocean teal | #2E8B8B |
| Sea | Deep sea blue | #1F5F8B |
| Sky | Sky blue | #8EC5E8 |
| Foliage | Palm green | #4F8A3F |
| Foliage | Jungle green | #2F5D3A |
| Light neutrals | Sand | #E8D3A8 |
| Light neutrals | Cream | #F4EAD5 |
| Wood | Wood brown | #8B5A2B |
| Wood | Dark wood | #5A3A1E |
| Metal | Brass | #C9A24A |
| Accents | Faded rust red | #B5543C |
| Accents | Sun-faded teal | #6FA8A0 |
| Shadows | Deep navy (never pure black) | #1E2A44 |
| Sunset only | Soft coral | #F08A6E |
| Sunset only | Peach | #F6B98A |
| Sunset only | Violet (a touch) | #7A5C8E |

Stay close to these colors.

## Lighting (day and night are part of the style)
- **Daytime:** clear sky-blue gradient, bright natural sun from the top-left, soft navy shadow below.
- **Sunset/night:** the same natural colors warmed by a gentle sunset (coral, peach, a hint of violet in the sky), low warm light from the left, longer shadows. Warm, never neon.
- The game's day/night cycle shifts between these looks; the art itself stays the same.

## Camera and facing
- High 3/4 isometric angle, looking down at about 45 degrees.
- Every vessel and dragon faces toward the lower-left of the image (its front points lower-left).
- Same angle and facing for every asset in the game.

## In-game asset rules
- 1024x1024 PNG source files.
- In-game versions: the whole object alone, centered, filling about 70% of the frame, soft navy shadow under it, transparent background (or plain flat light gray if transparency isn't possible; it gets removed in cleanup).
- No text or watermarks in any image.
- Files are named in lowercase with underscores, e.g. `raft_day.png`, `raft_sunset.png`, `raft_ingame.png`.
- Concept and test art goes in `assets/concept/`. Approved in-game art goes in `assets/sprites/`.

## Avoid
Neon colors, glossy 3D rendering, photorealism, generic fantasy concept art, steampunk clutter, lens flares, extra characters, modern objects, text.

## Recurring details
- **Vizcaya family crest (proposed):** a simple sun-and-wings emblem. Pending approval.
- **Dragon Blow:** the one thing allowed to glow bright white.

## Animation
- Vessels, dragons and battles: still paintings that glide, turn and tilt; action comes from effects (cannon fire, smoke, sparks).
- Hero and up-close characters: cut-out animation (painted once in separate pieces, the game moves the pieces).

## Quality check before delivering any asset
1. Same angle, facing and palette as the style bible?
2. Reads clearly at about 128 pixels wide?
3. Matches the approved reference art?
4. Nothing modern, neon, glossy or steampunk?
