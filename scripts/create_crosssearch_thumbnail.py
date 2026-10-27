"""Render an illustrative CrossSearch loop; no model run or results are depicted."""
from pathlib import Path
import math
import subprocess

from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/research/videos'
OUT.mkdir(parents=True, exist_ok=True)
# The lower 120px remain empty for playback controls at the website's 320px width.
W, H, FPS, SECONDS = 960, 984, 30, 10
NAME = 'crosssearch-agent-rubrics'
FONT_DIR = Path('C:/Windows/Fonts')
FONTS = {size: ImageFont.truetype(str(FONT_DIR / 'segoeui.ttf'), size) for size in [36, 38, 40, 42]}
BOLD = {size: ImageFont.truetype(str(FONT_DIR / 'segoeuib.ttf'), size) for size in [40, 42, 44, 48, 64]}
BG, INK = '#F6F8F6', '#18352D'
BLUE, ORANGE, GREEN = '#2466AC', '#B55618', '#207657'


def blend(a, b, t):
    a, b = [tuple(bytes.fromhex(c.lstrip('#'))) for c in (a, b)]
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def centered(draw, text, center, top, font, fill):
    box = draw.textbbox((0, 0), text, font=font)
    x = center - draw.textlength(text, font=font) / 2
    draw.text((x, top - box[1]), text, font=font, fill=fill)


def smooth(a, b, t):
    v = max(0, min(1, (t-a)/(b-a)))
    return v*v*(3-2*v)


def pulse(t, a, b, c, d):
    return smooth(a, b, t) * (1-smooth(c, d, t))


def pop(t, start, strength):
    """A short expansion and settling bounce, returning exactly to baseline."""
    u=(t-start)/.72
    if u <= 0 or u >= 1:
        return 1
    return 1+strength*math.sin(2*math.pi*u)*(1-u)**2


def composite_box(im, layer, bounds, scale):
    tile=layer.crop(bounds)
    w,h=tile.size
    tile=tile.resize((round(w*scale),round(h*scale)),Image.Resampling.LANCZOS)
    x=round((bounds[0]+bounds[2]-tile.width)/2)
    y=round((bounds[1]+bounds[3]-tile.height)/2)
    im.paste(tile,(x,y),tile)


def particle(draw, points, progress, color):
    if progress <= 0 or progress >= 1:
        return
    lengths = [math.dist(a,b) for a,b in zip(points, points[1:])]
    distance = progress * sum(lengths)
    for a,b,length in zip(points, points[1:], lengths):
        if distance <= length:
            q = distance/length
            x,y = a[0]+(b[0]-a[0])*q, a[1]+(b[1]-a[1])*q
            strength = min(1, progress*10, (1-progress)*10)
            draw.ellipse((x-17,y-17,x+17,y+17),fill=blend(BG,color,strength*.16))
            draw.ellipse((x-8,y-8,x+8,y+8),fill=blend(BG,color,strength))
            return
        distance -= length


def render(t):
    im = Image.new('RGB', (W,H), BG)
    d = ImageDraw.Draw(im)
    centered(d, 'CrossSearch', 480, 38, BOLD[64], INK)
    centered(d, 'Benchmarking AI agents', 480, 117, FONTS[42], '#4C625A')

    blue_glow = pulse(t,.4,1.3,3.3,4.2)
    orange_glow = pulse(t,1.3,2.2,4.2,5.1)
    joined = pulse(t,3.8,4.8,7.3,9.6)
    result = pulse(t,5.4,6.6,8.2,9.6)
    # 12px grid: equal outer margins, a 48px source gap and 48px stage gaps.
    for x,color,label,glow in [(36,BLUE,'Local files',blue_glow),(504,ORANGE,'Live web',orange_glow)]:
        d.rounded_rectangle((x,192,x+420,396),radius=24,fill='white',outline=blend('#D3DDD6',color,.45+glow*.55),width=3+round(glow*2))
        centered(d,label,x+210,216,BOLD[48],color)

    d.rounded_rectangle((200,295,276,374),radius=8,fill='#EDF3FB',outline=BLUE,width=3)
    d.rounded_rectangle((217,283,293,362),radius=8,fill='white',outline=BLUE,width=3)
    for y,l in [(303,52),(320,41),(337,48)]:
        d.line((230,y,230+l,y),fill=blend('#C8D9EC',BLUE,blue_glow),width=5)
    d.rounded_rectangle((643,283,781,369),radius=9,fill='#FFF6ED',outline=ORANGE,width=3)
    d.line((644,303,780,303),fill='#E6C5AB',width=3)
    for x in [657,667,677]:
        d.ellipse((x-2,291,x+2,295),fill=ORANGE)
    d.ellipse((690,312,737,359),outline=ORANGE,width=3)
    d.ellipse((702,312,725,359),outline=ORANGE,width=2)
    d.line((691,335,736,335),fill=ORANGE,width=2)

    # Evidence flows to the visible agent, which processes it before answering.
    left=[(246,397),(246,420),(350,420),(350,444)]
    right=[(714,397),(714,420),(610,420),(610,444)]
    d.line(left,fill='#B7CCE3',width=5,joint='curve')
    d.line(right,fill='#E8C4A8',width=5,joint='curve')
    for shift in [0,.24]:
        particle(d,left,(t-.5-shift)/3.2,BLUE)
        particle(d,right,(t-1.4-shift)/3.2,ORANGE)
    d.line((480,577,480,619),fill='#B8CFC1',width=5)
    d.polygon([(472,610),(488,610),(480,622)],fill=GREEN)
    particle(d,[(480,577),(480,619)],(t-4.7)/1.2,GREEN)

    agent_layer=Image.new('RGBA',(W,H))
    d=ImageDraw.Draw(agent_layer)
    d.rounded_rectangle((216,444,744,576),radius=24,fill=blend('#E9EFEB','#D4E9DC',joined),outline=blend('#C0CEC4',GREEN,joined),width=3)
    centered(d,'AI agent',548,462,BOLD[48],INK)
    centered(d,'Cross-checking',548,522,FONTS[40],'#4C625A')

    # A gently bobbing antenna, attentive eyes and processing lights identify AI.
    bob=round(2*math.sin(2*math.pi*t/SECONDS))
    d.line((326,473,326,458+bob),fill=INK,width=4)
    d.ellipse((319,449+bob,333,463+bob),fill=blend('#8EAEA0',GREEN,joined))
    d.rounded_rectangle((281,479,371,541),radius=16,fill='white',outline=INK,width=4)
    d.rounded_rectangle((272,497,282,524),radius=4,fill='#9AB4A7')
    d.rounded_rectangle((371,497,381,524),radius=4,fill='#9AB4A7')
    look=round(3*math.sin(2*math.pi*t/SECONDS))
    blink=pulse(t,6.85,6.95,7.05,7.15)
    for x in [306,346]:
        height=max(1,round(6*(1-blink)))
        d.ellipse((x-5+look,501-height,x+5+look,501+height),fill=INK)
    for i,x in enumerate([311,326,341]):
        light=joined*(.35+.65*(.5+.5*math.sin(2*math.pi*(t/1.1-i/3))))
        d.ellipse((x-3,521,x+3,527),fill=blend('#C4D6CC',GREEN,light))

    agent_scale=pop(t,3.55,.13)*pop(t,4.45,.13)
    composite_box(im,agent_layer,(216,444,745,577),agent_scale)

    answer_layer=Image.new('RGBA',(W,H))
    d=ImageDraw.Draw(answer_layer)
    d.rounded_rectangle((84,624,876,864),radius=24,fill=blend('#FFFFFF','#E2F2E9',result),outline=blend('#B7CFC0',GREEN,result),width=3+round(result*2))
    centered(d,'Grounded answer',480,648,BOLD[48],INK)
    # Example rubric dimensions, not a claim that a recorded run passed.
    # Labels stay legible; row outlines and ticks build the checklist in sequence.
    reset=1-smooth(9.15,9.8,t)
    for i,(label,y) in enumerate([
        ('Uses local evidence',710),
        ('Uses live web evidence',758),
        ('Cites supporting sources',806),
    ]):
        progress=smooth(6.15+i*.7,6.65+i*.7,t)*reset
        tick=smooth(6.45+i*.7,6.8+i*.7,t)*reset
        end=round(120+progress*720)
        if end>120:
            d.line((120,y+44,end,y+44),fill='#B8D6C5',width=2)
        d.rounded_rectangle((120,y+3,152,y+35),radius=7,fill=blend('#F3F7F4','#D1E9DC',progress),outline=blend('#B4C7BC',GREEN,progress),width=2)
        # Draw the check itself as two progressively completed strokes.
        points=[(127,y+18),(134,y+25),(146,y+11)]
        length=tick*2
        if length>0:
            a,b=points[0],points[1]
            q=min(1,length)
            d.line((a[0],a[1],a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q),fill=GREEN,width=4)
        if length>1:
            a,b=points[1],points[2];q=length-1
            d.line((a[0],a[1],a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q),fill=GREEN,width=4)
        box=d.textbbox((0,0),label,font=FONTS[40])
        d.text((180,y-box[1]),label,font=FONTS[40],fill=INK)
    composite_box(im,answer_layer,(84,624,877,865),pop(t,5.9,.105))
    return im


if __name__ == '__main__':
    # Check the seam: all moving elements return to the same resting state.
    assert render(0).tobytes() == render(SECONDS).tobytes()
    render(8.5).save(OUT/f'{NAME}.jpg',quality=95,subsampling=0)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    command=[ffmpeg,'-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}',
             '-r',str(FPS),'-i','-','-an','-c:v','libx264','-crf','18',
             '-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart',
             str(OUT/f'{NAME}.mp4')]
    process=subprocess.Popen(command,stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
    for frame in range(FPS*SECONDS):
        process.stdin.write(render(frame/FPS).tobytes())
    process.stdin.close()
    if process.wait():
        raise RuntimeError('Video encoding failed')
    preview=ROOT/'tmp/crosssearch-preview'
    preview.mkdir(parents=True,exist_ok=True)
    for t in [0,2,4,6,8,9.97]:
        render(t).save(preview/f'frame-{t:g}.png')
    render(8.5).resize((293,300),Image.Resampling.LANCZOS).save(preview/'thumbnail-320.png')
    print('Created 10-second seamless loop and poster:',OUT)
