export type PhotoItem = {
  id: string;
  filename: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  rotation: number;
  featured?: boolean;
};

export type VoiceNoteItem = {
  id: string;
  filename: string | null;
  title: string;
  caption: string;
  durationLabel: string;
  src: string;
};

const photoFilenames = [
  "WhatsApp Image 2026-09-12 at 11.41.14 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.14 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.15 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.15 PM (2).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.15 PM (3).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.15 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.16 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.16 PM (2).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.16 PM (3).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.16 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.17 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.17 PM (2).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.17 PM (3).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.17 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.18 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.18 PM (2).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.18 PM.jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.19 PM (1).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.19 PM (2).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.19 PM (3).jpeg",
  "WhatsApp Image 2026-09-12 at 11.41.19 PM.jpeg"
];

// Netlify converts folder names to lowercase during build
const PHOTOS_PATH = "/photos/";

const dimensions = [
  [960, 1280],
  [1280, 960],
  [960, 1280],
  [960, 1280],
  [1280, 960],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [960, 1280],
  [720, 1280],
  [720, 1280],
  [1280, 960],
  [960, 1280],
  [1280, 960],
  [1280, 960],
  [960, 1280]
];

const captions = [
  "Exhibit #01 -- Somehow we survived this.",
  "Exhibit #02 -- Certified chaos.",
  "Exhibit #03 -- Okay, this picture is actually cute.",
  "Exhibit #04 -- Main character evidence.",
  "Exhibit #05 -- This belongs in the archives.",
  "Exhibit #06 -- A normal moment? Suspicious.",
  "Exhibit #07 -- Bestie energy detected.",
  "Exhibit #08 -- The camera understood the assignment.",
  "Exhibit #09 -- Probably had lore.",
  "Exhibit #10 -- Very scrapbook coded.",
  "Exhibit #11 -- Casual slay, unfortunately.",
  "Exhibit #12 -- No notes. Actually, many notes.",
  "Exhibit #13 -- This one has personality.",
  "Exhibit #14 -- Memory successfully saved.",
  "Exhibit #15 -- Soft chaos, premium edition.",
  "Exhibit #16 -- The vibes are vibing.",
  "Exhibit #17 -- Evidence for future blackmail.",
  "Exhibit #18 -- Friendship museum material.",
  "Exhibit #19 -- Cute but also dangerous.",
  "Exhibit #20 -- Another day, another iconic file.",
  "Exhibit #21 -- End of album, not end of chaos."
];

const rotations = [-3, 2, -1, 3, -2, 1, 2, -3, 1, -1, 3, -2, 2, -3, 1, -1, 2, -2, 3, -1, 1];

export const siteConfig = {
  birthdayDate: "18 September",
  themeSong: {
    title: "Honeypie — JAWNY",
    filename: "JAWNY - Honeypie (Lyrics).mp3",
    src: "/mp3/JAWNY - Honeypie (Lyrics).mp3"
  },
  heroPhoto: {
    filename: "WhatsApp Image 2026-09-12 at 11.41.17 PM (3).jpeg",
    src: "/photos/WhatsApp Image 2026-09-12 at 11.41.17 PM (3).jpeg"
  },
  photos: photoFilenames.map<PhotoItem>((filename, index) => ({
    id: `photo-${index + 1}`,
    filename,
    src: `${PHOTOS_PATH}${filename}`,
    width: dimensions[index][0],
    height: dimensions[index][1],
    caption: captions[index],
    rotation: rotations[index],
    featured: index === 12 || index === 16 || index === 19
  })),
  voiceNotes: [
    {
      id: "incident",
      filename: "ElevenLabs_2026-09-12T19_17_13__s50_v3.mp3",
      title: "THE INCIDENT",
      caption: "Press play. You already know.",
      durationLabel: "Loading...",
      src: "/jokes/ElevenLabs_2026-09-12T19_17_13__s50_v3.mp3"
    },
    {
      id: "joke-02",
      filename: "ElevenLabs_2026-09-12T19_19_34_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3",
      title: "INSIDE JOKE #02",
      caption: "This one cannot be explained to normal people.",
      durationLabel: "Loading...",
      src: "/jokes/ElevenLabs_2026-09-12T19_19_34_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3"
    },
    {
      id: "joke-03",
      filename: "ElevenLabs_2026-09-12T19_21_59_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3",
      title: "INSIDE JOKE #03",
      caption: "Scientifically unserious behavior.",
      durationLabel: "Loading...",
      src: "/jokes/ElevenLabs_2026-09-12T19_21_59_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3"
    },
    {
      id: "joke-04",
      filename: "ElevenLabs_2026-09-12T19_23_36_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3",
      title: "INSIDE JOKE #04",
      caption: "No context. Only dangerous amounts of lore.",
      durationLabel: "Loading...",
      src: "/jokes/ElevenLabs_2026-09-12T19_23_36_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3"
    },
    {
      id: "joke-05",
      filename: "ElevenLabs_2026-09-12T19_24_34_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3",
      title: "INSIDE JOKE #05",
      caption: "The vault accepts this as official evidence.",
      durationLabel: "Loading...",
      src: "/jokes/ElevenLabs_2026-09-12T19_24_34_Roopa - AI Bestie and Gossip Buddy_pvc_sp100_s72_sb75_v3.mp3"
    }
  ] satisfies VoiceNoteItem[],
  stats: [
    { label: "Randomness", value: 99.9, display: "99.9%" },
    { label: "Chaos Level", value: 100, display: "100%" },
    { label: "Annoying Bestie Score", value: 98, display: "98%" },
    { label: "Laughs Generated", value: 100, display: "∞" },
    { label: "Normal Conversations", value: 2, display: "2%" },
    { label: "Friendship Level", value: 100, display: "MAX" }
  ],
  easterEggs: [
    "You found a secret. Don't tell Yagyavi.",
    "Okay, why are you clicking everything?",
    "This one has lore.",
    "Friendship committee has noted your curiosity.",
    "Tiny chaos unlocked.",
    "I literally told you not to click it."
  ],
  letter: `Dear Yagyavi,

HAPPYYYY BIRTHDAYYYYY!!!

Okay, first of all… ONE MONTH.

Bas ek mahina hua hai humein properly jaane hue, and honestly, mujhe khud samajh nahi aa raha ki itne kam time mein itni saari baatein, memories aur inside jokes kaise ban gaye.

Sach bolun toh, lagta hi nahi ki sirf ek month hua hai.

Itne se time mein random conversations, faltu ki bakchodi, hasi-mazaak, stupid moments aur woh saare inside jokes ban gaye hain jo agar hum kisi aur ko explain karne baithe, toh woh pakka humein pagal samjhega.

And honestly, I'm really glad I met you.

Kuch logon ko apna banne mein saalon lag jaate hain, aur kuch log bas ek mahine mein hi itne familiar lagne lagte hain jaise pata nahi kab se jaante ho.

Tu unfortunately second category mein aa gayi.

I mean, itna jaldi bestie banne ka decision kisne approve kiya tha, mujhe nahi pata… but ab ho gaya toh ho gaya.

Jokes apart, I'm genuinely really happy that we became friends.

I love how easily we can talk about literally anything, laugh at the stupidest things, and somehow turn even the most normal moment into a memory.

Aur obviously… hamare inside jokes.

Bhai, unka toh alag hi level hai.

Kuch jokes aise hain jinko sirf hum samajhte hain, and honestly, wahi sabse zyada funny hote hain.

We've only had one month so far, but agar ek mahine mein itna kuch ho gaya hai, toh honestly, aage kitna chaos hone wala hai uska koi idea nahi.

So today, on your birthday, I genuinely just want to wish you the best.

I hope tu hamesha khush rahe, jo bhi tu chahti hai woh tujhe mile, life mein bohot saari amazing opportunities aayein, aur tere aas-paas hamesha aise log rahein jo tujhe genuinely value karein.

Aur haan…

thoda kam drama bhi kar lena.

Although…

Drama ke bina Yagyavi, Yagyavi thodi na hai.

Thank you for making this one month so much more fun and memorable.

It's honestly kinda crazy that someone I've known for such a short time can already be a part of so many memories.

And this website?

Ye sirf ek birthday gift nahi hai.

It's basically a tiny collection of all the chaos we've somehow managed to create in just one month.

Hopefully, someday we'll look back at this and laugh about how this was just the beginning.

One month down.
Hopefully, bohot saari memories baaki hain.

So once again…

HAPPY BIRTHDAY, YAGYAVI!

Enjoy your day, eat lots of cake, smile like crazy, and please don't become too mature just because you're getting older.

Stay the same idiot you are.

— Your Bestie`
};

