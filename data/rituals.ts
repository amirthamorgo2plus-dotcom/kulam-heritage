// SAMPLE / ILLUSTRATIVE ritual descriptions — verify with community elders.
// Keyed by kulamId + lifeEvent so other kulams/events extend this list.

export interface RitualStep {
  title: string;
  detail: string;
  significance?: string; // why it is done / what it means
}

export interface RitualNarrative {
  heading: string;
  body: string[];
}

export interface Ritual {
  id: string;
  kulamId: string;
  lifeEvent: "Wedding" | "Naming" | "Festival" | "Coming of Age" | "Other";
  title: string;
  summary: string;
  steps: RitualStep[];
  // The legend behind the ritual — why the community keeps it at all.
  story?: RitualNarrative;
  // The reasoning our elders gave — the "science behind the ritual" layer.
  closing?: RitualNarrative;
  // Where the account came from (shown as a credit line).
  source?: string;
}

export const rituals: Ritual[] = [
  {
    id: "kamma-wedding",
    kulamId: "kammavar-naidu",
    lifeEvent: "Wedding",
    title: "Kammavar Naidu Wedding",
    summary:
      "A Kammavar Naidu wedding blends Telugu-origin rites with Tamil Nadu customs, centred on horoscope matching, the muhurtham and the kula deivam's blessings.",
    steps: [
      {
        title: "Pen Paarthal / Pelli Choopulu",
        detail:
          "The two families formally meet so the prospective bride and groom can see each other, often over coffee and tiffin at the bride's home.",
        significance:
          "Marks consent of both families to explore the alliance before any commitment.",
      },
      {
        title: "Jathakam / Horoscope matching",
        detail:
          "The families exchange horoscopes and an astrologer compares them (Ashtakoota / guna match). The alliance usually proceeds only on a satisfactory score.",
        significance:
          "Checks long-term compatibility and auspiciousness — see the Horoscope tool.",
      },
      {
        title: "Nichayathartham (Engagement)",
        detail:
          "Betrothal at which elders exchange plates of fruit, betel, turmeric and gifts, and the priest fixes the wedding muhurtham (auspicious date & time).",
        significance:
          "Publicly seals the alliance and locks the date the rest of the planning is built around.",
      },
      {
        title: "Pandhakaal & Naandi",
        detail:
          "A day or two before, a sanctified pole/post is planted and a Naandi (ancestor-remembrance) ceremony invokes blessings of forefathers.",
        significance:
          "Seeks the blessings of family ancestors and removes obstacles before the rites begin.",
      },
      {
        title: "Pellikuthuru & Pellikoduku",
        detail:
          "Turmeric and oil are applied to the bride and groom at their respective homes, followed by Mangala Snanam (auspicious bath), new clothes and aarti.",
        significance:
          "Purifies and beautifies the couple; turmeric is auspicious and protective.",
      },
      {
        title: "Snakatam / Kashi Yatra (groom)",
        detail:
          "The groom playfully pretends to renounce worldly life for Kashi; the bride's brother persuades him to return and marry — light-hearted and symbolic.",
        significance:
          "Symbolises the groom choosing married (householder) life over asceticism.",
      },
      {
        title: "Kanyadanam",
        detail:
          "At the muhurtham the bride's parents formally give her hand to the groom, pouring sacred water as the priest chants.",
        significance:
          "The most sacred gift a parent can make — entrusting their daughter to the groom.",
      },
      {
        title: "Mangalyadharanam (Thaali tying)",
        detail:
          "The groom ties the thaali (mangalsutra) around the bride's neck — typically three knots — as the nadaswaram reaches a crescendo (getti melam).",
        significance:
          "The defining moment of the marriage; the couple are now wed.",
      },
      {
        title: "Saptapadi (seven steps)",
        detail:
          "The couple take seven steps together around the sacred fire (homam), each step a shared vow.",
        significance:
          "Each step is a promise — nourishment, strength, prosperity, happiness, progeny, seasons, and lifelong friendship.",
      },
      {
        title: "Talambralu",
        detail:
          "The newly-weds joyfully shower each other with pearl-mixed rice amid laughter and family cheer.",
        significance:
          "A playful blessing for prosperity, fertility and a joyful union.",
      },
      {
        title: "Reception & Grihapravesam",
        detail:
          "A reception celebrates with guests; later the bride is welcomed into the groom's home (Grihapravesam).",
        significance:
          "Introduces the couple to the wider community and welcomes the bride to her new home.",
      },
    ],
  },
  {
    id: "kamma-barasala",
    kulamId: "kammavar-naidu",
    lifeEvent: "Naming",
    title: "Barasala (Naming Ceremony)",
    summary:
      "Held typically on the 21st day, the infant is formally named, often based on the birth star (nakshatra).",
    steps: [
      {
        title: "Cradle ceremony",
        detail: "The baby is placed in a decorated cradle amid blessings.",
      },
      {
        title: "Naming",
        detail:
          "An auspicious name is chosen, frequently guided by the birth nakshatra's syllable.",
      },
    ],
  },
  {
    id: "kamma-sankranti",
    kulamId: "kammavar-naidu",
    lifeEvent: "Festival",
    title: "Sankranti",
    summary:
      "The harvest festival is the most important seasonal celebration in the Kamma agrarian heartland.",
    steps: [
      {
        title: "Bhogi",
        detail: "Bonfires and discarding of the old on the first day.",
      },
      {
        title: "Makara Sankranti",
        detail: "Family gatherings, rangoli (muggulu), and new harvest offerings.",
      },
      {
        title: "Kanuma",
        detail: "Honouring cattle that support the farming livelihood.",
      },
    ],
  },
  {
    id: "kamma-gauri-vratham",
    kulamId: "kammavar-naidu",
    lifeEvent: "Festival",
    title: "Gauri Vratham (கௌரி விரதம்)",
    summary:
      "The girls' vratham for Gauri Amman — daughter of Renuka Devi — kept in Aavani and Purattasi on the third day after the full moon, and once in three years on the third day after the Aippasi full moon. Also called Kammavar Thatthelu Pandaga, Uthaapina, or Asanya Sayana Vratham. It is observed by a girl child in her 7th, 9th or 11th year.",
    story: {
      heading: "Why Kammavar girls keep the Uthaapina Seer",
      body: [
        "Gauri Amman merged into an ammikkal (the grinding stone) — which is why she is worshipped in that very form to this day. Before she merged into the earth she gave her word: girls of seven kulams would keep her vratham, and for six of them it would be fulfilled — but for the girl born of the Kammavar line alone, it would not. For her, an 'Uthaapina Seer' would have to be done in her 7th, 9th or 11th year.",
        "In the early days, girls of seven kulams — Brahmana, Kammavar, Komutti, Kolla, Balijavar, Batraju and Udaiyar — kept the vratham. A Kammavar girl, Akkammal, lived with her three elder brothers, who doted on their only sister. When she came of age they arranged her Gauri vratham and invited the girls of the other six kulams to keep it at their home.",
        "The rule was that the vratham could be broken only after the moon rose at night and was worshipped. But having fasted all day, Akkammal grew faint with hunger. Her brothers, farmers, returned at evening and could not bear to see her that way. So they worked a trick: one tied a mirror on a peepal tree, and another lit a fire in the tamarind tree facing it. The firelight caught in the mirror looked exactly like a moon rising. They led her out and said, 'Look — the moon is up. Worship it and finish your vratham.' Believing what she saw, she worshipped, broke her fast and slept.",
        "When the real moon rose, the six girls of the other kulams came to the house and were told Akkammal had already finished. 'The moon has only just risen — how could she have finished?' they asked. Hurt and angered, they laid a curse: let the vratham of the girl who did not keep it properly go unfulfilled, and let the girls born in the Kammavar kulam have to perform the Uthaapina Seer in their 7th, 9th or 11th year.",
        "And because it was her own brothers who spoiled Akkammal's vratham, the rule remains to this day: brothers must not be present when the Uthaapina Seer is performed.",
      ],
    },
    steps: [
      {
        title: "Who keeps it",
        detail:
          "A girl child in her 7th, 9th or 11th year, together with five elders who keep the vratham with her — three elderly sumangali women and two men (two couples and one sumangali). Relatives are invited.",
        significance:
          "The child is never alone in it — the vratham is kept by the family around her.",
      },
      {
        title: "Before sunrise",
        detail:
          "All five sit with the child in the middle, a thalaivazhai leaf is laid, and they eat a light tiffin. Nothing is eaten during the day. The child must not sleep in the daytime; a swing is tied for her to play on. She must not touch or step on the threshold that day.",
      },
      {
        title: "Evening bath and adorning",
        detail:
          "The child is bathed with oil, arappu and turmeric, dressed in new clothes, her hair combed and flowers tucked in, well adorned, with naamam on her forehead.",
      },
      {
        title: "Gauri Amman's form",
        detail:
          "The ammikkal is cleaned and laid down and the grinding stone (kuzhavi) stood upon it. Eyes, nose, mouth and ears are marked in turmeric, and it is adorned with flowers and jewellery.",
        significance:
          "Gauri Amman merged into the ammikkal — so the stone itself is shaped into her form and worshipped.",
      },
      {
        title: "To the temple",
        detail:
          "The five who kept the vratham take the child, with relatives, to Gauri Amman. There is no separate temple for her — she may be adorned and worshipped at the village temple or at home, and all the children keeping the vratham in that village may gather in one place and worship together.",
      },
      {
        title: "What is carried",
        detail:
          "A plate with a vaazhai leaf holding five each of uppittu, gujjayam, salt-free dosai, paniyaram and vadai, covered with another leaf; a bowl of salt-free paruppu satham; thengai, pazham, vetrilai-paaku, oodhupathi, karpooram, arali, vilvam, malligai, thaamarai, thulasi and navadhaniyam. An arali-kaai is tied in a turmeric-smeared thread with as many knots as the child's age (7, 9 or 11).",
      },
      {
        title: "Hearing the story",
        detail:
          "Everything is offered before Gauri Amman. The children and elders listen to Gauri Amman's story, told quietly and with devotion. Afterwards a little of the offerings is left with Sri Gauri; only some loose flowers, an arali sprig and the knotted arali-kaai are carried home.",
        significance:
          "The story is the point — each generation hears it at the age it will remember.",
      },
      {
        title: "Washing the elders' feet",
        detail:
          "At home the five stand at the doorway facing east. The girl washes their feet with water from a full pot poured into a sembu, applies sandalwood and kungumam, offers flowers, touches their feet and bows.",
      },
      {
        title: "Worshipping the moon",
        detail:
          "When the moon truly appears, the women of the house stand the child among the five elders, place an arali sprig in every hand and have them open their palms, pour mor, and look at the moon and worship — three times. The arali sprig is then set down and the elders bless the child.",
        significance:
          "The honest moon Akkammal never saw is the one every Kammavar girl now waits for.",
      },
      {
        title: "The mavilakku",
        detail:
          "A kolam is drawn at the doorstep and the child stands on the threshold facing east — two sumangalis behind her, one in front. Three small mavilakkus are made and lit with ghee wicks. The sumangali in front sings 'முடிமுடி தாராலு இந்தாண்டம்மா' and passes the plate back; the one behind receives it with 'தாராலு தெச்சண்டம்மா' and places a mavilakku in the child's mouth, to be swallowed without chewing. This is done three times, for all three mavilakkus.",
      },
      {
        title: "Tying the arali-kaai and eating",
        detail:
          "The three together tie the knotted arali-kaai on the child's right hand. All five then come inside and eat with the child seated in the middle. They first mix uppittu, vadai, gujjayam, pazham and ghee and each give her a handful. As all have fasted, satham, paruppu, sambar, rasam, kaikari and appalam are served. When everyone has eaten, the child alone clears the six leaves, and vetrilai-paaku is given to the elders.",
      },
      {
        title: "The next morning",
        detail:
          "The child is bathed, dressed and adorned and taken to the Gauri Amman temple with thengai, pazham, vetrilai, paaku, poo, karpooram, oodhupathi and navadhaniyam. After the pooja the thread on her hand is untied and placed before the goddess, and the arali-kaai is carried with the worshipped flowers and dropped into a well — 'மஞ்சிமஞ்சி பூவுலு கௌரம்மகு, வாடின பூவுலு கங்கம்மகு'. On the way the flower-tray is set down at three places and kummi is clapped.",
      },
      {
        title: "Completing the Uthaapina Seer",
        detail:
          "The five who kept the vratham with the child must remain well until the Gauri vratham day of the following year — only then is the vratham complete. On that day the child is bathed, dressed and taken again to Gauri Amman with flowers, coconut, fruit and a new pudavai and ravikkai. Thanks are offered for the seer being fulfilled, and good sesame oil, paruppu and palakaaram in new vessels are given to the five.",
      },
    ],
    closing: {
      heading: "The reason our elders gave",
      body: [
        "Our ancestors did not keep any seer or ceremony without cause, merely to pass the time. The Kammavar kulam has kept every seer as a guiding path for life.",
        "A girl child's first stage is the pedhai paruvam (around 7 to 9). At that age whatever happens around her slowly takes root in her mind — which is why these are kept precisely then. Through the Uthaapina Seer, the good of the vratham, respect for elders, the feeling of being surrounded by relatives, and devotion take root in her heart. As she grows, those qualities grow with her — and through her, both the home she is born into and the home she marries into prosper.",
        "In this the Kammavar kulam receives the grace of Renuka Devi — the form of the all-powerful Parasakthi — and her daughter Gauri Amman stands beside them too.",
      ],
    },
    source:
      "Retold in our own words from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore.",
  },
];
