from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math, random

ROOT = Path.cwd()
OUT = ROOT / 'output' / '1st-monthsary-banner.png'
OUT.parent.mkdir(parents=True, exist_ok=True)
W,H = 3600,1800
random.seed(26)
# Twilight violet gradient base
img = Image.new('RGB',(W,H))
p = img.load()
draw_base = ImageDraw.Draw(img)
for y in range(H):
    t=y/(H-1)
    top=(28,17,62); bottom=(58,25,94)
    c=tuple(int(top[i]*(1-t)+bottom[i]*t) for i in range(3))
    draw_base.line((0,y,W,y),fill=c)
# Soft lavender light blooms
light=Image.new('RGBA',(W,H),(0,0,0,0)); ld=ImageDraw.Draw(light)
for x,y,r,col in [(620,360,430,(193,111,255,48)),(2000,1150,620,(164,90,248,32)),(3270,260,420,(213,149,255,38))]:
    ld.ellipse((x-r,y-r,x+r,y+r),fill=col)
light=light.filter(ImageFilter.GaussianBlur(150)); img=Image.alpha_composite(img.convert('RGBA'),light)
d=ImageDraw.Draw(img,'RGBA')
# Fine framing lines and star field
for pad,alpha in [(48,95),(70,35)]:
    d.rounded_rectangle((pad,pad,W-pad,H-pad),radius=44,outline=(231,206,255,alpha),width=3)
for _ in range(220):
    x=random.randint(85,W-85); y=random.randint(75,H-75)
    r=random.choice([2,3,4,5])
    d.ellipse((x-r,y-r,x+r,y+r),fill=(255,244,255,random.randint(55,160)))
# Twinkling sparkle crosses
for x,y,s in [(1450,205,18),(2380,330,14),(1210,950,16),(2500,1410,19),(3100,150,13),(1810,1540,15)]:
    d.line((x-s,y,x+s,y),fill=(241,220,255,155),width=3); d.line((x,y-s,x,y+s),fill=(241,220,255,155),width=3)
# fonts
fontroot=Path(r'C:\Windows\Fonts')
def font(name,size): return ImageFont.truetype(str(fontroot/name),size)
serif=font('georgiab.ttf',126); numfont=font('georgiab.ttf',250); sans=font('segoeuib.ttf',60); med=font('segoeui.ttf',44)
small=font('segoeuib.ttf',35); datefont=font('georgiab.ttf',58); cardfont=font('segoeuib.ttf',31)
# Image helpers
def cover_photo(path,size):
    im=Image.open(path).convert('RGB'); w,h=size
    scale=max(w/im.width,h/im.height); im=im.resize((int(im.width*scale),int(im.height*scale)),Image.Resampling.LANCZOS)
    x=(im.width-w)//2; y=(im.height-h)//2
    return im.crop((x,y,x+w,y+h))
def photo_card(path,box,radius=38,stroke=(245,229,255,230),sw=9):
    x,y,w,h=box
    frame=Image.new('RGBA',(w,h),(0,0,0,0)); fd=ImageDraw.Draw(frame)
    fd.rounded_rectangle((0,0,w-1,h-1),radius=radius,fill=stroke)
    inner=cover_photo(path,(w-2*sw,h-2*sw)).convert('RGBA')
    mask=Image.new('L',inner.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,inner.width-1,inner.height-1),radius=max(4,radius-sw),fill=255)
    frame.alpha_composite(inner,(sw,sw)); img.alpha_composite(frame,(x,y))
# Main couple cover image
photo_card(ROOT/'pics'/'15.webp',(145,210,1120,1370),radius=58,sw=12)
d=ImageDraw.Draw(img,'RGBA')
# Photo corner label, capsule
d.rounded_rectangle((205,1450,745,1535),radius=40,fill=(42,24,76,220),outline=(246,215,255,130),width=2)
d.text((250,1466),'JHON  +  MARIAN',font=small,fill=(255,245,255,255))
# Main title block
x0=1370
# small chapter tag
d.rounded_rectangle((x0,250,x0+455,322),radius=34,fill=(221,187,255,35),outline=(239,210,255,130),width=2)
d.text((x0+26,265),'OUR FIRST CHAPTER',font=small,fill=(80,49,118,255))
d.text((x0-5,360),'1st',font=numfont,fill=(245,225,255,255),stroke_width=3,stroke_fill=(112,64,172,255))
d.text((x0+10,585),'MONTHSARY',font=serif,fill=(255,241,255,255),stroke_width=2,stroke_fill=(111,62,157,255))
d.line((x0,735,2430,735),fill=(232,196,255,135),width=3)
d.text((x0+8,790),'JHON',font=sans,fill=(225,198,255,255))
# heart between names
cx=x0+355; cy=832
d.polygon([(cx,cy+30),(cx-38,cy-2),(cx-34,cy-35),(cx-8,cy-42),(cx,cy-20),(cx+8,cy-42),(cx+34,cy-35),(cx+38,cy-2)],fill=(255,145,214,255))
d.text((x0+435,790),'MARIAN',font=sans,fill=(255,232,248,255))
d.text((x0+8,890),'ONE MONTH OF US',font=small,fill=(210,183,240,255))
# Date plaque
d.rounded_rectangle((x0,1000,2430,1110),radius=30,fill=(255,255,255,17),outline=(227,198,255,105),width=2)
# center date
text='OCTOBER 26, 2026'; box=d.textbbox((0,0),text,font=datefont); tw=box[2]-box[0]
d.text((x0+(1060-tw)//2,1020),text,font=datefont,fill=(76,45,105,255))
# Two small story stills
photo_card(ROOT/'pics'/'5.webp',(x0,1180,500,335),radius=36,sw=8)
photo_card(ROOT/'pics'/'17.jpg',(x0+535,1180,525,335),radius=36,sw=8)
# captions
for bx,cap in [(x0,'OUR LITTLE ADVENTURES'),(x0+535,'THE DAY WE DREAMED UP')]:
    d=ImageDraw.Draw(img,'RGBA'); d.rounded_rectangle((bx+18,1450,bx+480,1518),radius=28,fill=(38,22,69,210))
    d.text((bx+38,1467),cap,font=cardfont,fill=(255,243,255,250))
# QR card panel
qx,qy,qw,qh=2580,245,850,1320
panel=Image.new('RGBA',(qw,qh),(255,255,255,250)); pd=ImageDraw.Draw(panel)
pd.rounded_rectangle((0,0,qw-1,qh-1),radius=58,fill=(255,251,255,250),outline=(230,207,255,255),width=5)
# heading
pfont=font('segoeuib.ttf',39); subfont=font('segoeui.ttf',32)
heading='SCAN TO OPEN OUR STORY'; hb=pd.textbbox((0,0),heading,font=pfont); pd.text(((qw-(hb[2]-hb[0]))//2,54),heading,font=pfont,fill=(68,39,103,255))
# QR generated with 4-module quiet zone by qrcode library
qr=Image.open(ROOT/'tmp'/'monthsary-qr.png').convert('RGB').resize((690,690),Image.Resampling.NEAREST)
panel.paste(qr,((qw-690)//2,160))
# small divider and footer
pd.line((90,900,qw-90,900),fill=(218,198,235,255),width=3)
for text,yy in [('A LITTLE LINK TO OUR FIRST CHAPTER',948),('monthsary-gift-two.vercel.app',1010)]:
    bb=pd.textbbox((0,0),text,font=subfont); pd.text(((qw-(bb[2]-bb[0]))//2,yy),text,font=subfont,fill=(94,71,118,255))
# ornamental heart at card base
pd.text((qw//2-22,1120),'♥',font=font('seguisym.ttf',54),fill=(177,93,209,255))
img.alpha_composite(panel,(qx,qy))
# Tiny call-to-action below photo card, above border
d=ImageDraw.Draw(img,'RGBA')
d.text((145,1645),'A PURPLE LITTLE UNIVERSE, MADE FOR TWO',font=small,fill=(226,205,246,210))
# Save print resolution PNG
img.convert('RGB').save(OUT,format='PNG',dpi=(300,300),optimize=True)
print(OUT)
