from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
from pathlib import Path
import math

ROOT = Path.cwd()
W, H = 1080, 1920
OUT = ROOT / 'output' / '1st-monthsary-phone-banner.png'
OUT.parent.mkdir(parents=True, exist_ok=True)
fontdir = Path(r'C:\Windows\Fonts')

def font(name, size):
    return ImageFont.truetype(str(fontdir / name), size)

source = Image.open(ROOT / 'pics' / 'us.png').convert('RGB')
couple = source.convert('RGBA')

# White canvas with restrained lavender accents and lots of breathing room.
canvas = Image.new('RGB', (W, H), '#ffffff')
draw = ImageDraw.Draw(canvas, 'RGBA')
# Fine frame and restrained lavender details on a clean white background.
canvas = canvas.convert('RGBA')
draw = ImageDraw.Draw(canvas, 'RGBA')
draw.rounded_rectangle((34, 34, W-34, H-34), radius=44, outline=(111, 75, 153, 55), width=2)
# Couple artwork, with the source's white background blending into the canvas.
target_w = 840
scale = target_w / couple.width
couple = couple.resize((target_w, int(couple.height * scale)), Image.Resampling.LANCZOS)
x = (W - couple.width) // 2
y = 92
canvas.alpha_composite(couple, (x, y))

# One composed text block: names, occasion, and date.
draw = ImageDraw.Draw(canvas, 'RGBA')
title = 'JHON  +  MARIAN'
subtitle = '1ST MONTHSARY  ·  OCT 26, 2026'
title_font = font('georgiab.ttf', 67)
sub_font = font('segoeuib.ttf', 29)
def centered(text, y, f, color):
    box = draw.textbbox((0, 0), text, font=f)
    draw.text(((W - (box[2] - box[0])) // 2, y), text, font=f, fill=color)
centered(title, 1110, title_font, (73, 42, 112, 255))
centered(subtitle, 1201, sub_font, (123, 95, 150, 255))
# Quiet accent rule under the single text group.
draw.rounded_rectangle((410, 1260, 670, 1266), radius=3, fill=(167, 119, 209, 150))

# Large, high-contrast QR. The quiet zone is built into the QR image.
qr = Image.open(ROOT / 'tmp' / 'monthsary-qr.png').convert('RGB')
qr_size = 460
qr = qr.resize((qr_size, qr_size), Image.Resampling.NEAREST)
panel_size = 520
panel_x = (W - panel_size) // 2
panel_y = 1320
panel = Image.new('RGBA', (panel_size, panel_size), (255, 255, 255, 255))
pd = ImageDraw.Draw(panel)
pd.rounded_rectangle((1, 1, panel_size-2, panel_size-2), radius=34,
                     outline=(224, 216, 237, 255), width=2)
panel.paste(qr, ((panel_size-qr_size)//2, (panel_size-qr_size)//2))
canvas.alpha_composite(panel, (panel_x, panel_y))

canvas.convert('RGB').save(OUT, 'PNG', dpi=(300, 300), optimize=True)
print(OUT)
