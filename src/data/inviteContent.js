const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

// All editable content for the invite — change dates, messages, links here.

export const inviteContent = {
  hero: {
    greeting: "hi maeeple",
    title: "eto nayung prinepare kong invite hehe",
    subtitle: "sige scroll kana, please?",
  },

  concert: {
    beforePicture: "here's the event:",
    title: "Planetshakers Live in Manila 2026!!",
    beforeDetails:
      "here are the details! and ofc tickets are already secured ryt??",
    date: "Friday, July 17, 2026",
    venue: "SM MOA Arena, Manila, Philippines",
    time: "7:00 PM PHT",
    note: "i know gabi pa yung concert, ...pero whole day sana tayo magkasama while WFH ka?? hmm sunduin kita sa friday morning ha",
    images: {
      logo:
        "https://media.db.com/images/public/user_69dfa62e7616a6620f449b28/88f63fcce_planetshakers-logo.webp",
      bg: "https://media.db.com/images/public/6a57aacf1f415a3b5e62ba98/7458d0e66_MNL-2026-BG.png",
      textLayer:
        "https://media.db.com/images/public/user_69dfa62e7616a6620f449b28/94200cd6e_MNL-2026-TEXT-LAYER-e1772517980653.png",
      seatMap:
        "https://media.db.com/images/public/user_69dfa62e7616a6620f449b28/f03c7f58a_MANILA-Seat-Map-RestrictedView_Website-1.png",
    },
  },

  planetboom: {
    title: "anw, this is with featuring ng Planetboom",
    description:
      "youth/next-gen ministry ng Planetshakers Church. yung songs nila pang gen-z wahahaha i think familiar ka naman",
  },

  svip: {
    title:
      "seats? WALA HAHAHAHA, its SVIP standing. see pic hehe dun sa yellow tau",
    lines: [
      "pede tumalon, sumayaw, kumanta, and syempre give our all para kay Lord!!",
      "so conserve ur energy okiii?",
      "wear comfy clothes and small bag if kayaaaa",
    ],
  },

  notes: {
    title: "so ayun,,",
    lines: [
      "will you go on this date idea of mine?",
      "ang random nu p&w night and date? haha kasi what better way to spend our time together than to glorify God diba?",
    ],
  },

  celebration: {
    headline: "YAYYY see u soon maeple q :))",
    subtext: "u made switso happy",
    confirmTitle: "To confirm your attendance...",
    confirmText: "flz send me a cute selfie on IG hehe",
    playlistText:
      "anw eto yung playlist ng setlist, feel free to take ur time and listen to familiarize para maenjoy mo din.",
    finalMessage:
      "aq na bahala sa plans, food, and transpo ha. its a date :)) wahaha and legal akong nagpaalam for this, so no need to worry about others ha. lets just enjoy our time. see u!",
  },

  playlist: {
    spotifyUrl:
      "https://open.spotify.com/playlist/7apBh6ALJKOZOH7HnSEoFf?si=cnOENYClQv-wrdEhLIVjGQ",
    spotifyLogo:
      "https://media.db.com/images/public/6a57aacf1f415a3b5e62ba98/206e3be39_images.png",
  },
};