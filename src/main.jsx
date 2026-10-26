import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const Icon = ({ name, size = 16, fill = 'none' }) => {
  const paths = {
    down: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
    right: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" fill={fill}/>,
    play: <path d="m7 4 14 8-14 8z" fill={fill}/>,
    close: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};
const ArrowDown = props => <Icon name="down" {...props}/>;
const ArrowRight = props => <Icon name="right" {...props}/>;
const Heart = props => <Icon name="heart" {...props}/>;
const Play = props => <Icon name="play" {...props}/>;
const Sparkles = props => <Icon name="sparkle" {...props}/>;
const X = props => <Icon name="close" {...props}/>;
import './style.css';

const photos = [
  { id: '01', file: '1.webp', caption: 'Happy first monthsary, my love', message: 'One month with you already feels like the start of my favorite story.' },
  { id: '02', file: '2.webp', caption: 'There you were, on my screen', message: 'A little online hello turned into someone I can’t imagine my days without.' },
  { id: '03', file: '3.webp', caption: 'I’m glad I said hi first', message: 'I took the chance, sent the first message, and found you.' },
  { id: '04', file: '4.webp', caption: 'Late-night talks, just us', message: 'We stayed up talking and made the distance feel a little smaller.' },
  { id: '05', file: '17.jpg', caption: 'Dreaming about your Manila trip', message: 'We started planning the day you’d come to Manila and finally see me in person.' },
  { id: '06', file: '5.webp', caption: 'Our little rides and adventures', message: 'Every ride is better when I get to share it with you.' },
  { id: '07', file: '6.webp', caption: 'You’re still so beautiful to me', message: 'I could look at you a thousand times and still get butterflies.' },
  { id: '08', file: '8.webp', caption: 'I knew I wanted you beside me', message: 'The more we shared, the more certain I felt: I want to be with you.' },
  { id: '09', file: '9.webp', caption: 'The little things are better together', message: 'Meals, errands, quiet days—everything feels warmer when it’s us.' },
  { id: '10', file: '10.webp', caption: 'I’ll always be in your corner', message: 'I want to keep showing up for you, cheering you on and holding you close.' },
  { id: '11', file: '11.webp', caption: 'You make my heart so happy', message: 'I love your smile, your little surprises, and all the joy you bring me.' },
  { id: '12', file: '12.webp', caption: 'I want to be your safe place', message: 'Wherever life takes us, I want you to feel loved, safe, and at home with me.' },
  { id: '13', file: '13.jpeg', caption: 'With you, anywhere feels like home', message: 'It’s not the place that makes a moment special. It’s being there with you.' },
  { id: '14', file: '14.webp', caption: 'Still choosing you, every day', message: 'One month in, and I’m still so happy that our paths found each other.' },
  { id: '15', file: '16.webp', caption: 'To the very end—and every day after', message: 'This is only our first chapter. I want to keep loving you through every page ahead.' },
];
const photoUrl = item => `/media/photos/${item.file}`;
const videos = [
  { id: '01', file: 'first-vid.mp4', caption: 'A little greeting for our first monthsary', label: 'FIRST MONTHSARY GREETING' },
  { id: '02', file: 'second-vid.mp4', caption: 'Just us, together', label: 'MY FAVORITE KIND OF MOMENT' },
];

function Confetti({ active }) {
  if (!active) return null;
  return <div className="confetti" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--i': i, '--hue': [280, 320, 44, 195, 255][i % 5] }} />)}</div>;
}

function CoupleCartoon() {
  return <div className="cover-lead-photo"><img src="/media/photos/15.webp" alt="Jhon and Marian, the leads of their first monthsary story" /></div>;
}
function PhotoCard({ item, index, open }) {
  return <button className={`photo-card tilt-${index % 4}`} onClick={() => open({ type: 'photo', ...item })} aria-label={`Open photo ${item.id}: ${item.caption}`}>
    <span className="photo-art"><img src={photoUrl(item)} alt={item.caption} loading="lazy" /><span className="tape"/></span>
    <span className="photo-caption">{item.caption}</span>
  </button>;
}
function fitVideoFrame(event) {
  const video = event.currentTarget;
  const frame = video.closest('.video-thumb, .modal-media');
  if (!frame || !video.videoWidth || !video.videoHeight) return;
  frame.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
  frame.style.height = 'auto';
}
function VideoCard({ item, open }) {
  return <button className="video-card" onClick={() => open({ type: 'video', ...item })} aria-label={`Open video: ${item.caption}`}><span className="video-thumb"><video className="video-loop" autoPlay muted loop playsInline preload="auto" disablePictureInPicture disableRemotePlayback tabIndex="-1" aria-label={item.caption} onLoadedMetadata={fitVideoFrame} onContextMenu={e => e.preventDefault()}><source src={`/media/videos/${item.file}`} type="video/mp4"/></video><span className="video-overlay"/><small>{item.label}</small></span><span className="video-title">{item.caption}<span className="video-end-mark">✦</span></span></button>;
}
function Modal({ item, close }) {
  useEffect(() => { if (!item) return; const fn = e => e.key === 'Escape' && close(); window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn); }, [item, close]);
  if (!item) return null;
  const isPhoto = item.type === 'photo';
  const path = isPhoto ? photoUrl(item) : `/media/videos/${item.file}`;
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}><section className={`memory-modal ${isPhoto ? '' : 'video-modal'}`} role="dialog" aria-modal="true"><button className="close-button" onClick={close} aria-label="Close"><X/></button><div className="modal-media">{isPhoto ? <><img src={path} alt={item.caption} onLoad={e => { e.currentTarget.nextElementSibling.style.display = 'none'; }} onError={e => { e.currentTarget.style.display = 'none'; }}/><span className="modal-placeholder">✦<b>PHOTO {item.id}<br/>GOES HERE</b></span></> : <video className="popup-video" autoPlay muted loop playsInline preload="auto" disablePictureInPicture disableRemotePlayback tabIndex="-1" aria-label={item.caption} src={path} onLoadedMetadata={fitVideoFrame} onContextMenu={e => e.preventDefault()}/>}</div><span className="issue-tag">{isPhoto ? `STORY BEAT ${item.id}` : item.label}</span><h3>{item.caption}</h3>{isPhoto && <p>{item.message}</p>}</section></div>;
}
function App() {
  const [revealed, setRevealed] = useState(false); const [confetti, setConfetti] = useState(false); const [modal, setModal] = useState(null); const [noteOpen, setNoteOpen] = useState(false); const [dayCount, setDayCount] = useState(30);
  useEffect(() => { const since = new Date(2026, 8, 26); const now = new Date(); now.setHours(0,0,0,0); setDayCount(Math.max(1, Math.floor((now - since) / 86400000))); }, []);
  const reveal = () => { setRevealed(true); setConfetti(true); setTimeout(() => setConfetti(false), 1800); setTimeout(() => document.querySelector('#page-one')?.scrollIntoView({ behavior: 'smooth' }), 280); };
  return <><Confetti active={confetti}/><header className="nav"><a href="#cover" className="logo"><span className="logo-mark">♥</span> JHON <i>+</i> MARIAN</a><span className="nav-center">OUR LITTLE ANIME · EPISODE 01</span><a className="nav-link" href="#keepsakes">ANIME PHOTO ALBUM <ArrowDown size={13}/></a></header>
    <main id="cover">
      <section className="cover">
        <div className="cover-copy"><div className="issue-label"><span>EP. 01</span><i/> SEPT 26 — OCT 26 <i/> SHOUJO ROMANCE</div><p className="kicker">BREAKING NEWS FROM OUR LITTLE WORLD!</p><h1>Somehow,<br/>you became<br/><span>my favorite</span><br/><span className="outlined">plot twist.</span></h1><p className="cover-description">A little anime scene about two people,<br/>one very good month, and all the<br/>little moments in between.</p><div className="name-badges"><span>★ JHON ORLAN TERO</span><Heart size={15} fill="currentColor"/><span>★ MARIAN LEANDA</span></div><button className="read-button" onClick={reveal}><span>READ OUR LITTLE STORY</span><ArrowRight size={18}/></button><p className="button-note">ONE SITTING · BEST READ WITH A SMILE</p></div>
        <div className="cover-art"><div className="burst burst-back"/><div className="comic-panel"><div className="panel-top"><span>OUR LEAD CHARACTERS</span><span>♡ ♡</span></div><CoupleCartoon/><span className="name-tag tag-marian">JHON! <b>★</b></span><span className="name-tag tag-jhon">MARIAN! <b>★</b></span><div className="speech-bubble">ONE MONTH<br/>OF <em>US!</em></div><span className="panel-number">#001</span></div><div className="sticker sticker-month"><b>1</b><small>MONTH<br/>TOGETHER</small></div><div className="sticker sticker-wow">WOW!<span>✦</span></div></div>
        <div className="cover-bottom"><span>STARTED SEPTEMBER 26, 2026</span><span className="bottom-dots">•••</span><span>HAPPY FIRST MONTHSARY!</span></div>
      </section>
      <section className={`page-one ${revealed ? 'page-visible' : ''}`} id="page-one"><div className="page-heading"><span className="chapter-stamp">PAGE 01</span><p className="kicker">THE BEST THING HAPPENED</p><h2>Then the story<br/><span>got really good.</span></h2><p className="intro-copy">On September 26, something began.<br/>And every little day since has been more fun<br/>because we get to be <b>Jhon + Marian.</b></p></div><div className="comic-strip"><article className="strip-panel panel-purple"><span className="panel-scribble">☆</span><small>SEPTEMBER 26</small><b>THE<br/>BEGINNING!</b><span className="caption-box">and so our story starts...</span></article><article className="strip-panel panel-pink"><span className="big-heart">♥</span><small>30 DAYS LATER</small><b>STILL<br/>PICKING YOU.</b><span className="caption-box">(obviously.)</span></article><article className="strip-panel panel-yellow"><span className="panel-scribble">✦</span><small>THE NEXT PAGE</small><b>MORE<br/>US, PLEASE.</b><span className="caption-box">to be continued!</span></article></div><div className="days-stamp"><span>★</span><b>{dayCount}</b><small>DAYS IN<br/>OUR STORY</small><span>★</span></div></section>
      <section className="scrapbook" id="keepsakes"><div className="section-head"><div><span className="chapter-stamp">ANIME PHOTO ALBUM</span><h2>Little keepsakes<br/><span>from our story.</span></h2></div><p>15 real moments, in our story order.<br/>Tap any photo to read the little note.</p></div><div className="photo-grid">{photos.map((p,i) => <PhotoCard key={p.id} item={p} index={i} open={setModal}/>)}</div><div className="video-section"><div className="section-head video-head"><div><span className="chapter-stamp">BONUS SCENES</span><h2>Us, in <span>motion!</span></h2></div><p>Two little movies<br/>for the rewatch list.</p></div><div className="video-grid">{videos.map(v => <VideoCard key={v.id} item={v} open={setModal}/>)}</div></div></section>
      <section className="final-page"><div className="final-doodle">♥</div><span className="chapter-stamp">END OF EPISODE 01 · BEGINNING OF EVERYTHING</span><h2>To my favorite<br/><span>person ever.</span></h2><p>There’s a real message coming soon.<br/>For now, here's a little spot to save it.</p><button className="note-button" onClick={() => setNoteOpen(true)}>OPEN YOUR LITTLE NOTE <span>✉</span></button><div className="signoff">Yours, <b>Baby</b><span>✦</span></div><div className="end-label">THE END...? &nbsp; NOPE. TO BE CONTINUED →</div></section>
    </main><footer><span>© JHON + MARIAN · FIRST MONTHSARY · 2026</span><span>MADE WITH ♥ AND A LOT OF PURPLE</span></footer>
    {noteOpen && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setNoteOpen(false)}><section className="note-modal"><button className="close-button" onClick={() => setNoteOpen(false)} aria-label="Close"><X/></button><span className="chapter-stamp">A NOTE FOR MARIAN</span><div className="note-heart">♥</div><h3>Dear Marian,</h3><p className="note-opening">I love you always, my Baby.</p><p>This is only the beginning of our journey, and I hope we stay strong together for a long time. I know we won’t always be perfect, but I hope we learn to understand each other’s flaws, insecurities, and weaknesses, and accept each other for who we truly are.</p><p>I hope we continue choosing each other even on difficult days, loving each other with patience, honesty, compassion, and genuine intentions. I want us to grow together and build a love that isn’t just temporary, but one that we both sincerely intend to last a lifetime.</p><p>Mahal na mahal kita. Mag-ingat ka palagi, ha? I may not always be perfect, but I’ll keep learning how to love you better. At sana, ako pa rin hanggang dulo. Sana sa kabila ng lahat ng pagsubok, tayo pa rin ang magkasama, hanggang sa araw na masabi nating, <em>“Buti na lang, hindi tayo sumuko sa isa’t isa.”</em></p><b>ALWAYS YOURS, BABY</b></section></div>}
    <Modal item={modal} close={() => setModal(null)}/>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);














