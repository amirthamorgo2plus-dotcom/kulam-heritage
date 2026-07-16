// Kammavar Naidu rituals — bilingual (Tamil original + English retelling).
// Sourced from community material shared by the Peelamedu Kammavar Seva Sangam.
// Earlier illustrative/placeholder rituals were removed: they were guesses and
// contradicted this authentic account. Verified entries only from here on.

/** A bilingual string. `ta` is the Tamil original, `en` the English retelling. */
export interface Bi {
  ta?: string;
  en: string;
}

export interface RitualStep {
  title: Bi;
  detail: Bi;
  significance?: Bi; // why it is done / what it means
}

export interface RitualNarrative {
  heading: Bi;
  body: Bi[];
}

export interface Ritual {
  id: string;
  kulamId: string;
  lifeEvent:
    | "Wedding"
    | "Childbirth"
    | "Childhood"
    | "Festival"
    | "Coming of Age"
    | "Other";
  title: Bi;
  summary: Bi;
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
    id: "kamma-pitta-sangiyam",
    kulamId: "kammavar-naidu",
    lifeEvent: "Childbirth",
    title: { ta: "பிட்ட சாங்கியம் (குழந்தைச் சீர்)", en: "Pitta Sangiyam (Child Seer)" },
    summary: {
      ta: "தாய் வீட்டில் மகப்பேற்றினை முடித்துக் கொண்டு, குழந்தையுடன் கணவன் வீடு திரும்பும் பெண்ணுக்கு, பெற்றவர்கள் செய்யும் சாங்கியமே பிட்ட சாங்கியம் எனப்படுவது. கம்ம குலப் பெண்ணின் வாழ்க்கையில் அவளுக்குச் செய்யப்படும் சிறப்புச் சீர்களில் இதைத்தான் கடைசியாகச் செய்யப்படுவது. குழந்தைக்கு 5, 7, 9 அல்லது 11 ஆம் மாதங்களில் இச்சீரைச் செய்யலாம்.",
      en: "The seer her parents perform for a woman who has completed her confinement at her mother's home and is returning to her husband's house with the baby. Of all the special seers done for a Kamma woman across her life, this is the last one. It may be done in the child's 5th, 7th, 9th or 11th month.",
    },
    steps: [
      {
        title: { ta: "எப்போது செய்ய வேண்டும்", en: "When it must be done" },
        detail: {
          ta: "இந்தக் காலத்தில் இந்தச் சடங்கை எப்போது வேண்டுமானாலும் செய்கிறார்கள். பெண் குழந்தையாக இருந்தால், கௌரி விரதம் என்னும் உத்தாபிஞ்சேதி சாங்கியம் செய்வதற்கு முன்பே இந்தப் பிட்ட சாங்கியம் செய்ய வேண்டும்.",
          en: "These days people perform it whenever convenient. But if the child is a girl, the Pitta Sangiyam must be done before the Uthaapinjedhi Sangiyam — the Gauri Vratham.",
        },
        significance: {
          ta: "கம்மவார் பெண்ணின் சீர்கள் ஒரு வரிசை — பிட்ட சாங்கியம் முடிந்த பின்னரே கௌரி விரதம்.",
          en: "A Kammavar girl's seers run in order — the Gauri Vratham only follows once this one is complete.",
        },
      },
      {
        title: { ta: "வாங்க வேண்டியவை", en: "What is bought" },
        detail: {
          ta: "முக்கியமாக மூன்று புடவை, ரவிக்கைகள், ஒரு தொட்டில் கொக்கி, 2 தொட்டில் துணிகள், பால் ஊற்றும் சங்கு, எண்ணெய் பாத்திரம், ஒரு கரண்டி, ஒரு செம்பு, ஒரு குடம் ஆகியவை. பெண் வீட்டாரின் வசதியைப் பொறுத்து, பாத்திரங்களும் குழந்தைக்கு நகையும் வாங்க வேண்டும்.",
          en: "Chiefly three pudavais and ravikkais, a cradle hook, two cradle cloths, a conch for pouring milk, an oil vessel, a ladle, a sembu and a kudam. Depending on what the girl's family can afford, vessels and jewellery for the child are also bought.",
        },
      },
      {
        title: { ta: "சீர் மூட்டை கட்டுதல்", en: "Tying the seer bundle" },
        detail: {
          ta: "ஒரு சதுரமான புதுத் துண்டில் நான்கு மூலையிலும் மஞ்சள் தடவி, அதில் ஒரு தேங்காய், வெற்றிலை பாக்கு, பூ, சந்தன வில்லை, குங்குமச் சிமிழ், 5 எலுமிச்சம் பழம், மஞ்சள் சரடு 3 பிடி, தொட்டில் கொக்கி, சங்கு, ஒரு புடவை, ரவிக்கை, சுண்டு காரம் எனப்படும் சுக்கு, வசம்பு, மிளகு, ஜாதிக்காய், பூண்டு சேர்த்த பொடி ஆகியவற்றுடன் பணம் வைத்துக் கட்ட வேண்டும். இந்த மூட்டையைப் பெண்ணின் சகோதரர் எடுத்து வர வேண்டும்.",
          en: "A new square cloth is smeared with turmeric at its four corners and tied into a bundle holding a coconut, vetrilai-paaku, flowers, a sandal cake, a kungumam box, five lemons, three lengths of turmeric thread, the cradle hook, the conch, a pudavai and ravikkai, and the powder called sundu-kaaram (dry ginger, vasambu, pepper, nutmeg and garlic), along with money. The girl's brother must carry this bundle.",
        },
      },
      {
        title: { ta: "மாப்பிள்ளை வீட்டிற்குச் செல்லுதல்", en: "Going to the husband's house" },
        detail: {
          ta: "செம்பில் மஞ்சள் பொட்டு, எண்ணெய் பாத்திரத்தில் எண்ணெயும், குடத்தில் சக்கரையும் போட்டு, புதுப் பாத்திரத்தில் இனிப்பு, காரம், வெற்றிலை பாக்கு வைத்து அனுப்ப வேண்டும். இந்தச் சீருக்குப் பழம் வைப்பதில்லை. நல்ல நேரத்தில் பெண் புது புடவையை உடுத்திக் கொள்ள வேண்டும். 5 சுமங்கலிகள் பெண்ணை வாசலில் கிழக்கு நோக்கி நிறுத்தி மஞ்சள் பூசி, பூ வைத்து, மஞ்சள் சரடு கட்டிவிட்டுத் தாங்களும் பூ வைத்து, பொட்டு வைத்து, மஞ்சள் சரடு கட்டிக் கொள்ள வேண்டும். பின்னர் பெண்ணின் மடியில் வெற்றிலை பாக்கு, எலுமிச்சம் பழம் வைத்து, தாங்களும் எடுத்துக் கொண்டு மாப்பிள்ளை வீட்டிற்குச் செல்ல வேண்டும். அங்கு வாசற்படியில் ஆரத்தி எடுத்துக் குழந்தையும் தாயும் வரவேற்க வேண்டும்.",
          en: "A turmeric dot is put on the sembu, oil in the oil vessel, sugar in the kudam, and sweets, savouries and vetrilai-paaku in a new vessel. No fruit is placed for this seer. At an auspicious hour the woman wears a new pudavai. Five sumangalis stand her at the doorway facing east, apply turmeric, place flowers and tie the turmeric thread — then do the same for themselves. Vetrilai-paaku and lemon are placed in her lap, and they set out for the husband's house, where mother and child are welcomed with aarathi at the threshold.",
        },
      },
      {
        title: { ta: "சீர் நிறைவு", en: "Completing the seer" },
        detail: {
          ta: "சீர் மூட்டையைப் பூஜை அறையில் வைத்துக் கும்பிட்டு, மூட்டையை அவிழ்த்து, அதில் உள்ள புடவையை எடுத்து மாப்பிள்ளையின் தாய் அல்லது சகோதரி கட்டிக் கொண்டு, மஞ்சள், குங்குமம், வெற்றிலை பாக்கு, எலுமிச்சம் பழம், பூ ஆகியவற்றை எடுத்துத் தட்டில் வைக்க வேண்டும். மாப்பிள்ளை வீட்டில் உள்ள சுமங்கலிப் பெண்கள் 5 பேர், பெண்ணிற்கு மஞ்சள் பூசிப் பொட்டு வைத்து, மஞ்சள் சரடு கட்டி விட்டு, வெற்றிலை பாக்கு, எலுமிச்சம் பழம் கொடுத்து, அவர்களும் எடுத்துக் கொள்ள வேண்டும். பின்னர் அன்றோ அல்லது வேறு ஒரு நல்ல நாளில் மற்றொரு புடவையைத் தாய் வீட்டிற்குச் சென்று கட்டிக் கொண்டு வர வேண்டும். இத்துடன் கம்ம குலப் பெண்ணிற்குச் செய்யும் சாங்கியம் நிறைவு பெறும்.",
          en: "The bundle is set in the puja room and worshipped, then opened; the groom's mother or sister wears the pudavai from it, and turmeric, kungumam, vetrilai-paaku, lemon and flowers are placed on a plate. Five sumangalis of the husband's house apply turmeric to the woman, place her pottu, tie her turmeric thread and give her vetrilai-paaku and lemon, taking the same themselves. Then, that day or on another auspicious day, she goes to her mother's house and returns wearing another pudavai. With this, the cycle of seers performed for a Kamma woman is complete.",
        },
      },
    ],
    source:
      "Retold from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore — with our thanks.",
  },
  {
    id: "kamma-mottai-kottedhi",
    kulamId: "kammavar-naidu",
    lifeEvent: "Childhood",
    title: { ta: "மொட்டை கொட்டேதி (முடி இறக்குதல்)", en: "Mottai Kottedhi (First Tonsure)" },
    summary: {
      ta: "பிறந்த குழந்தையின் தலை உச்சி, மென்மைத் தன்மை மாறி வலுப் பெற்றதும், முடி இறக்குதல் செய்ய வேண்டும். குழந்தை பிறந்து 7, 9 அல்லது 11 ஆம் மாதங்களில், அவரவர் குலதெய்வக் கோயிலில் இச்சாங்கியம் செய்ய வேண்டும்.",
      en: "Once the soft crown of a newborn's head has firmed and grown strong, the first tonsure is done — in the child's 7th, 9th or 11th month, at the family's own kula deivam temple.",
    },
    steps: [
      {
        title: { ta: "ஏற்பாடுகள்", en: "Preparations" },
        detail: {
          ta: "நல்ல நாள் பார்த்து தாய் வீட்டார், குழந்தைக்கும் பெற்றோர்களுக்கும் புத்தாடைகள் எடுக்க வேண்டும். கோயிலில் திருமஞ்சனம் செய்ய, பொங்கல் வைக்கச் சாமான்கள் வாங்க வேண்டும்.",
          en: "An auspicious day is chosen and the mother's family buys new clothes for the child and the parents, along with provisions for the thirumanjanam and the pongal at the temple.",
        },
      },
      {
        title: { ta: "தாய்மாமன் மடியில்", en: "In the maternal uncle's lap" },
        detail: {
          ta: "தாய்மாமன் மடியில் குழந்தையை உட்கார வைத்து முடி இறக்க வேண்டும்.",
          en: "The child is seated in the maternal uncle's (thaai maaman's) lap and the hair is removed.",
        },
        significance: {
          ta: "கம்மவார் சீர்களில் தாய்மாமனுக்கே முதல் இடம் — குழந்தையின் வாழ்வின் ஒவ்வொரு படியிலும் அவர் உடன் இருக்கிறார்.",
          en: "The maternal uncle holds pride of place in Kammavar seers — he is present at every step of the child's life.",
        },
      },
      {
        title: { ta: "காது குத்துதல்", en: "Ear piercing" },
        detail: {
          ta: "முடி இறக்கும் நாளில் காதும் குத்தலாம்; அதற்குக் கம்மல் வாங்க வேண்டும். பின் குழந்தையைக் குளிக்க வைத்து புதுத் துணிகள் அணிவித்து, காது குத்தி கம்மல்கள் அணிவிக்க வேண்டும்.",
          en: "The ears may be pierced on the same day, and kammal (earrings) are bought for it. The child is then bathed, dressed in new clothes, and the kammal put on.",
        },
        significance: {
          ta: "மகாலட்சுமியின் கம்மலில் இருந்து தோன்றிய குலம் — அக்கம்மலையே குழந்தையின் காதிலும் சூட்டுகிறோம்.",
          en: "A kulam born from Mahalakshmi's kammal puts that very kammal on its child's ears — see the name-origin on the History page.",
        },
      },
      {
        title: { ta: "ஆசீர்வாதமும் விருந்தும்", en: "Blessing and the feast" },
        detail: {
          ta: "பூஜைகள் முடித்துக் கொண்டு, குழந்தையையும் பெற்றோரையும் ஆசீர்வாதம் செய்ய வேண்டும். பின்னர் எல்லோருக்கும் விருந்து கொடுத்து அனுப்ப வேண்டும்.",
          en: "The pujas are completed, the child and the parents are blessed, and everyone is sent off with a feast.",
        },
      },
    ],
    source:
      "Retold from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore — with our thanks.",
  },
  {
    id: "kamma-gauri-vratham",
    kulamId: "kammavar-naidu",
    lifeEvent: "Festival",
    title: { ta: "கௌரி விரதம்", en: "Gauri Vratham" },
    summary: {
      ta: "கௌரி அம்மனுக்கு — ரேணுகா தேவியின் மகள் — பெண் குழந்தைகள் இருக்கும் விரதம். ஆவணி, புரட்டாசி மாதங்களில் பௌர்ணமிக்கு அடுத்த மூன்றாவது நாளிலும், மூன்று வருடங்களுக்கு ஒரு முறை ஐப்பசி மாத பௌர்ணமிக்கு அடுத்த மூன்றாவது நாளும் அனுஷ்டிக்கப்படுகிறது. இதனை கம்மவார் தத்தெலு பண்டக, உத்தாபின, அசுன்ய சயன விரதம் எனவும் வழங்குவர். பெண் குழந்தையின் 7, 9 அல்லது 11 ஆம் வயதில் இச்சீர் செய்யப்படும்.",
      en: "The girls' vratham for Gauri Amman — daughter of Renuka Devi — kept in Aavani and Purattasi on the third day after the full moon, and once in three years on the third day after the Aippasi full moon. Also called Kammavar Thatthelu Pandaga, Uthaapina, or Asanya Sayana Vratham. It is observed by a girl child in her 7th, 9th or 11th year.",
    },
    story: {
      heading: {
        ta: "கம்மவார் குலப் பெண்கள் உத்தாபின சீர் செய்யக் காரணம்",
        en: "Why Kammavar girls keep the Uthaapina Seer",
      },
      body: [
        {
          ta: "கௌரியம்மன் தெய்வமாகி விடுகிறாள். ஆதலால் அம்மிக்கல்லே கௌரியம்மனாகப் பூஜிக்கப்படுகிறது. அப்பொழுது கௌரியம்மன் ஒரு வாக்கு தருகிறாள்: “ஏழு குலப் பெண் குழந்தைகள் விரதம் இருந்து என்னை வணங்குவார்கள். அவர்களில் ஆறு பேர்களது விரதம் செல்லும். கம்மவார் வம்சத்தில் பிறந்த பெண் குழந்தை அக்கம்மாவின் விரதம் மட்டும் செல்லாது போய்விடும். அதனால் கம்மவார் குலத்தில் பிறக்கும் பெண் குழந்தைகளுக்கு 7, 9, 11 ஆம் வயதுகளில் ஏதாவது ஒரு வயதில் ‘உத்தாபின சீர்’ செய்ய வேண்டும்.” பின்னர் கௌரியம்மன் பூமியில் ஐக்கியம் ஆனாள்.",
          en: "Gauri Amman became divine and merged into the ammikkal (the grinding stone) — which is why she is worshipped in that very form to this day. Before she merged into the earth she gave her word: girls of seven kulams would keep her vratham, and for six of them it would be fulfilled — but for the girl born of the Kammavar line alone, it would not. For her, an 'Uthaapina Seer' would have to be done in her 7th, 9th or 11th year.",
        },
        {
          ta: "தொடக்க காலத்தில் பிராமண குலம், கம்மவார் குலம், கோமுட்டி குலம், கொல்ல குலம், பலிஜவார் குலம், பட்ராஜு குலம், உடையார் குலம் ஆகிய ஏழு குலத்தில் பிறந்த குழந்தைகளும் தத்தம் 7, 9, 11 வயதுகளில் கௌரி விரதம் இருந்தனர். கம்மவார் குலப் பெண் குழந்தை அக்கம்மாள் தனது அண்ணன்மார் மூவரோடு வாழ்ந்து வந்தாள். அவர்கள் தங்களது ஒரே தங்கையான அக்கம்மாள் மீது மிகுதியான பாசம் கொண்டிருந்தனர். அக்கம்மா உரிய வயதினை அடைந்ததும், கௌரி விரதம் வைத்துச் சாமி கும்பிட முடிவு செய்தனர். விரதத்தைக் கடைபிடிக்கின்ற மற்ற ஆறு குல பெண் குழந்தைகளையும் தமது வீட்டிற்கே வரவழைத்து விரதம் இருக்கச் செய்தனர்.",
          en: "In the early days, girls of seven kulams — Brahmana, Kammavar, Komutti, Kolla, Balijavar, Batraju and Udaiyar — kept the vratham in their 7th, 9th or 11th year. A Kammavar girl, Akkammal, lived with her three elder brothers, who doted on their only sister. When she came of age they arranged her Gauri vratham and invited the girls of the other six kulams to keep it at their home.",
        },
        {
          ta: "பகல் முழுதும் விரதம் மேற்கொண்டதால் அக்கம்மாள் பசி மயக்கத்திற்கு ஆளானாள். விவசாயிகளான அண்ணன்மார்கள் மாலையில் வீடு திரும்பி, பசி மயக்கம் உள்ள தங்கையின் நிலை கண்டு வேதனைக்கு ஆளாயினர். இரவு நிலவு உதித்த பின்னர் நிலாவைப் பார்த்து வணங்கிய பின்னர் தான் விரதத்தை முடிக்க வேண்டும் என்பது நியதி. ஆனால் அதுவரை தமது தங்கை பசி பொறுக்க மாட்டாள் என எண்ணி, நிலா உதித்து விட்டதாக நம்ப வைத்து விரதத்தை முடிக்கச் செய்ய ஒரு உபாயத்தை மேற்கொண்டனர்.",
          en: "The rule was that the vratham could be broken only after the moon rose at night and was worshipped. But having fasted all day, Akkammal grew faint with hunger. Her brothers, farmers, returned at evening and could not bear to see her that way — so they worked a trick to make her believe the moon had already risen.",
        },
        {
          ta: "ஒரு அண்ணன் அரசமரத்தில் ஒரு கண்ணாடியைக் கட்டி வைத்தார். மற்ற அண்ணன் அதன் எதிரிலிருந்த புளியமரத்தில் தீயை உண்டாக்கினார். கண்ணாடியில் புளியமரத்து நெருப்பு “நிலா” கிளம்பி வருவது போன்ற ஒரு பொய்த் தோற்றத்தை உருவாக்கியது. பின்னர் அண்ணன்மார்கள் அக்கம்மாவை வீட்டிற்கு வெளியில் அழைத்து வந்து, “இதோ பார், நிலா உதித்து விட்டது. நீ நிலாவைக் கும்பிட்டு விரதத்தை முடித்துக் கொள்ளலாம்” என்றனர். தான் கண்ட நிலாத் தோற்றத்தை உண்மை என நம்பிய அக்கம்மாள், நிலாவை வணங்கி, விரதத்தை முடித்துக் கொண்டு, படுத்து உறங்கி விட்டாள்.",
          en: "One brother tied a mirror on a peepal tree; another lit a fire in the tamarind tree facing it. The firelight caught in the mirror looked exactly like a moon rising. They led her out and said, 'Look — the moon is up. Worship it and finish your vratham.' Believing what she saw, she worshipped, broke her fast and slept.",
        },
        {
          ta: "வானத்தில் உண்மையாக உதித்த நிலாவைக் கண்ட பிற குலக் குழந்தைகள் ஆறு பேரும் அக்கம்மாவின் வீட்டிற்கு வந்தனர். “எங்கள் அக்கம்மா நிலவைப் பார்த்து கும்பிட்டு விரதம் முடித்து விட்டாள்” என்றனர் அண்ணன்மார்கள். “இப்போது தானே நிலா உதித்தது. உங்கள் அக்கம்மா எப்படி விரதம் முடிக்க முடியும்?” என்று கேட்டு மிகுதியான வேதனைக்கும் சினத்திற்கும் ஆளாயினர். “முறையான விரதம் மேற்கொள்ளாத அக்கம்மாவின் கௌரி விரதம் செல்லுபடியாகாமல் போகட்டும். உங்கள் கம்மவார் குலத்தில் பிறந்த பெண் குழந்தைகளுக்கு 7, 9, 11 ஆம் வருடங்களில் ‘உத்தாபின சீர்’ செய்ய வேண்டும்” என்று சாபம் இட்டனர். அக்கம்மாவின் விரதத்திற்கு அவளது அண்ணன்மார்களால் பங்கம் ஏற்பட்டதால், ‘உத்தாபின சீர்’ செய்யும்பொழுது சகோதரர்கள் அருகில் இருக்கக் கூடாது என்ற நியதி ஏற்பட்டது.",
          en: "When the real moon rose, the six girls of the other kulams came to the house and were told Akkammal had already finished. 'The moon has only just risen — how could she have finished?' they asked. Hurt and angered, they laid a curse: let the vratham of the girl who did not keep it properly go unfulfilled, and let the girls born in the Kammavar kulam have to perform the Uthaapina Seer in their 7th, 9th or 11th year. And because it was her own brothers who spoiled her vratham, the rule remains: brothers must not be present when the Uthaapina Seer is performed.",
        },
      ],
    },
    steps: [
      {
        title: { ta: "விரதம் இருப்பவர்கள்", en: "Who keeps it" },
        detail: {
          ta: "உற்றார் உறவினர் சுற்றத்தாரை அழைத்தல் வேண்டும். வயதான சுமங்கலிப் பெண்கள் மூவரும், ஆடவர் இருவரும் (இரண்டு தம்பதிகள், ஒரு சுமங்கலி என ஐவர்) குழந்தையுடன் சேர்ந்து விரதம் இருத்தல் வேண்டும்.",
          en: "A girl child in her 7th, 9th or 11th year, together with five elders who keep the vratham with her — three elderly sumangali women and two men (two couples and one sumangali). Relatives are invited.",
        },
        significance: {
          ta: "குழந்தை தனியாக விரதம் இருப்பதில்லை — குடும்பமே அவளுடன் சேர்ந்து இருக்கிறது.",
          en: "The child is never alone in it — the vratham is kept by the family around her.",
        },
      },
      {
        title: { ta: "சூரிய உதயத்திற்கு முன்", en: "Before sunrise" },
        detail: {
          ta: "சூரியன் உதிப்பதற்கு முன்னரே ஐவரும் குழந்தையை நடுவில் உட்கார வைத்து, தலைவாழை இலை போட்டுச் சிற்றுண்டி சாப்பிட வேண்டும். பகலில் சாப்பிடக் கூடாது. குழந்தை பகலில் தூங்கக் கூடாது. ஊஞ்சல் கட்டிக் கொடுத்து விளையாடச் செய்ய வேண்டும். விரதம் மேற்கொள்ளும் நாளில் அக்குழந்தை வாசற்படியினையோ, நிலைப்படியினையோ தொடவோ, மிதித்து நடக்கவோ கூடாது.",
          en: "All five sit with the child in the middle, a thalaivazhai leaf is laid, and they eat a light tiffin. Nothing is eaten during the day. The child must not sleep in the daytime; a swing is tied for her to play on. She must not touch or step on the threshold that day.",
        },
      },
      {
        title: { ta: "மாலை நீராட்டும் அலங்காரமும்", en: "Evening bath and adorning" },
        detail: {
          ta: "அன்று மாலையில் குழந்தைக்கு எண்ணெய் தேய்த்து அரப்பு வைத்து மஞ்சளைத் தேய்த்துக் குளிப்பாட்ட வேண்டும். புத்தாடை அணியச் செய்ய வேண்டும். தலைவாரி, பூச்சூட்டிக் குழந்தையை நன்கு அலங்கரிக்க வேண்டும். நெற்றியில் நாமம் வைக்க வேண்டும்.",
          en: "The child is bathed with oil, arappu and turmeric, dressed in new clothes, her hair combed and flowers tucked in, well adorned, with naamam on her forehead.",
        },
      },
      {
        title: { ta: "கௌரி அம்மன் வடிவம்", en: "Gauri Amman's form" },
        detail: {
          ta: "அம்மிக்கல்லை சுத்தம் செய்து படுக்க வைத்து, அரைக்கும் குழவியை நிற்க வைத்து, மஞ்சளில் கண், மூக்கு, வாய், காது வைத்து மலர்களாலும் நகைகளாலும் அலங்கரிக்க வேண்டும். அதனையே கௌரியம்மனாக உருவகித்து வணங்க வேண்டும்.",
          en: "The ammikkal is cleaned and laid down and the grinding stone (kuzhavi) stood upon it. Eyes, nose, mouth and ears are marked in turmeric, and it is adorned with flowers and jewellery, then worshipped as Gauri Amman herself.",
        },
        significance: {
          ta: "கௌரியம்மன் அம்மிக்கல்லில் ஐக்கியம் ஆனவள்.",
          en: "Gauri Amman merged into the ammikkal — so the stone itself is shaped into her form and worshipped.",
        },
      },
      {
        title: { ta: "கோயிலுக்குச் செல்லுதல்", en: "To the temple" },
        detail: {
          ta: "மாலையில் விரதம் மேற்கொண்ட பெரியோர்கள் ஐவரும் குழந்தையை அழைத்துக் கொண்டு, உற்றார் உறவினர்களுடன் கௌரி அம்மன் கோயிலுக்குச் செல்ல வேண்டும். கௌரி அம்மனுக்கென்று தனியான கோயில் கிடையாது; ஊரில் உள்ள கோயிலிலோ அல்லது வாழும் இல்லத்திலோ கௌரி அம்மனை அலங்கரித்து வழிபடலாம். அவ்வூரில் விரதம் மேற்கொண்ட குழந்தைகள் பலரும் ஒரே இடத்தில் சேர்ந்து கௌரி அம்மனை ஒன்றாகவும் வணங்கலாம்.",
          en: "The five who kept the vratham take the child, with relatives, to Gauri Amman. There is no separate temple for her — she may be adorned and worshipped at the village temple or at home, and all the children keeping the vratham in that village may gather in one place and worship together.",
        },
      },
      {
        title: { ta: "கோவிலுக்கு எடுத்துச் செல்ல வேண்டியன", en: "What is carried" },
        detail: {
          ta: "ஒரு தட்டில் வாழை இலை போட்டு அதில் ஐந்து எண்ணிக்கையில் உப்பட்டு, கஜ்ஜாயம், உப்பில்லாத தோசை, பணியாரம், வடை ஆகியவற்றை வைத்து மற்றொரு இலையால் மூட வேண்டும். அதனோடு ஒரு கிண்ணத்தில் உப்பில்லாத பருப்பு சாதம், தேங்காய், பழம், வெற்றிலை பாக்கு, ஊதுபத்தி, கற்பூரம், அரளி, வில்வம், மல்லிகை, தாமரை, துளசி முதலிய உதிரிப்பூக்கள், நவதானியம் முதலியவற்றை எடுத்துச் செல்ல வேண்டும். மஞ்சள் தடவிய முன்னூலில் அரளிக்காய் ஒன்றினைக் கட்டி, குழந்தையின் வயதிற்கேற்ப (7, 9, 11) முடிச்சுகள் போட வேண்டும்.",
          en: "A plate with a vaazhai leaf holding five each of uppittu, gujjayam, salt-free dosai, paniyaram and vadai, covered with another leaf; a bowl of salt-free paruppu satham; thengai, pazham, vetrilai-paaku, oodhupathi, karpooram, arali, vilvam, malligai, thaamarai, thulasi and navadhaniyam. An arali-kaai is tied in a turmeric-smeared thread with as many knots as the child's age (7, 9 or 11).",
        },
      },
      {
        title: { ta: "கதை கேட்டல்", en: "Hearing the story" },
        detail: {
          ta: "கொண்டு சென்ற பூசைப் பொருள் அனைத்தையும் கௌரியம்மனின் முன்னால் படைத்து வணங்க வேண்டும். விரதம் இருக்கும் குழந்தைகளும் பெரியோர்களும் அங்கு கூறும் கௌரியம்மனின் கதையை அமைதியாகவும் பக்தி சிரத்தையுடனும் கேட்க வேண்டும். கதை கேட்டு முடிந்த பின், கொண்டு போன பலகாரங்களில் கொஞ்சம் ஸ்ரீ கௌரிக்குச் சமர்ப்பித்து விட்டு, கொஞ்சம் உதிரிப் பூக்கள், அரளிக் கொம்பு, அரளிக்காய் ஆகியவற்றை மட்டும் வீட்டிற்கு எடுத்து வர வேண்டும்.",
          en: "Everything is offered before Gauri Amman. The children and elders listen to Gauri Amman's story, told quietly and with devotion. Afterwards a little of the offerings is left with Sri Gauri; only some loose flowers, an arali sprig and the knotted arali-kaai are carried home.",
        },
        significance: {
          ta: "கதையே இதன் மையம் — ஒவ்வொரு தலைமுறையும் நினைவில் நிற்கும் வயதில் அதைக் கேட்கிறது.",
          en: "The story is the point — each generation hears it at the age it will remember.",
        },
      },
      {
        title: { ta: "பெரியோர்களின் பாதம் கழுவுதல்", en: "Washing the elders' feet" },
        detail: {
          ta: "வீட்டிற்கு வந்ததும், விரதம் மேற்கொண்ட பெரியோர்கள் ஐந்து பேரும் வாசலில் கிழக்கு நோக்கி நிற்க வேண்டும். பெண் குழந்தை நிறை குடத்தில் உள்ள நீரை ஒரு செம்பில் நிரப்பி அவர்களது பாதங்களைக் கழுவ வேண்டும். பின்னர் பாதங்களில் சந்தனம், குங்குமம் வைத்து மலர் இட்டு, கால்களைத் தொட்டுக் கும்பிட வேண்டும்.",
          en: "At home the five stand at the doorway facing east. The girl washes their feet with water from a full pot poured into a sembu, applies sandalwood and kungumam, offers flowers, touches their feet and bows.",
        },
      },
      {
        title: { ta: "நிலா வணங்குதல்", en: "Worshipping the moon" },
        detail: {
          ta: "வானத்தில் நிலாத் தோன்றியதும், வீட்டில் உள்ள பெண்கள் குழந்தையைப் பெரியவர் ஐவர் நடுவில் நிற்க வைத்து, எல்லோரது கைகளிலும் அரளிக் கொம்பு கொடுத்துக் கையை விரிக்கச் சொல்லி, மோர் விட்டு நிலாவைப் பார்த்துக் கும்பிடச் சொல்ல வேண்டும். மூன்று முறை கும்பிட்ட பின்னர், அரளிக் கொம்பைக் கீழே போட வேண்டும். பெரியவர்கள் குழந்தையை வாழ்த்த வேண்டும்.",
          en: "When the moon truly appears, the women of the house stand the child among the five elders, place an arali sprig in every hand and have them open their palms, pour mor, and look at the moon and worship — three times. The arali sprig is then set down and the elders bless the child.",
        },
        significance: {
          ta: "அக்கம்மாள் காணாத உண்மையான நிலாவைத் தான் இன்று ஒவ்வொரு கம்மவார் பெண்ணும் காத்திருந்து வணங்குகிறாள்.",
          en: "The honest moon Akkammal never saw is the one every Kammavar girl now waits for.",
        },
      },
      {
        title: { ta: "மாவிளக்கு", en: "The mavilakku" },
        detail: {
          ta: "வீட்டில் தலைவாசலில் கோலம் போட்டு நிலைப்படியில் குழந்தையை கிழக்கு நோக்கி நிற்க வைக்க வேண்டும். குழந்தைக்குப் பின்னால் இரண்டு சுமங்கலிகளும், முன்னால் ஒரு சுமங்கலியும் நின்று, சின்னதாகச் செய்த மூன்று மாவிளக்குகளில் திரி போட்டு நெய் தீபம் ஏற்ற வேண்டும். முன்னால் நிற்கும் சுமங்கலி “முடிமுடி தாராலு இந்தாண்டம்மா” எனச் சொல்லி பின்னால் நிற்பவரிடம் கொடுக்க, அவர் “முள்ளா தாராலு தெச்சுண்டம்மா” என்று பாடிக் கொடுக்க, முன்னால் நிற்பவர் ஒரு மாவிளக்கை குழந்தையின் வாயில் போட்டு, மெல்லாமல் விழுங்கச் சொல்ல வேண்டும். இதுபோல மூன்று முறை செய்து மூன்று மாவிளக்குகளையும் விழுங்கச் சொல்ல வேண்டும்.",
          en: "A kolam is drawn at the doorstep and the child stands on the threshold facing east — two sumangalis behind her, one in front. Three small mavilakkus are made and lit with ghee wicks. The sumangali in front sings 'முடிமுடி தாராலு இந்தாண்டம்மா' and passes the plate back; the one behind receives it with 'முள்ளா தாராலு தெச்சுண்டம்மா' and places a mavilakku in the child's mouth, to be swallowed without chewing. This is done three times, for all three.",
        },
      },
      {
        title: { ta: "அரளிக்காய் கட்டுதலும் உணவும்", en: "Tying the arali-kaai and eating" },
        detail: {
          ta: "மூவரும் சேர்ந்து குழந்தையின் வலது கையில் முடிச்சிட்ட அரளிக்காயைக் கட்ட வேண்டும். பின்னர் விரதம் இருந்த ஐவரும் குழந்தையோடு அமர்ந்து சாப்பிட வேண்டும்; குழந்தை ஐவருக்கும் நடுவில் அமர வேண்டும். ஐவரும் முதலில் உப்பட்டு, வடை, கஜ்ஜாயம், பழம், நெய் சேர்த்துப் பிசைந்து ஆளுக்கு ஒரு கை குழந்தைக்குக் கொடுக்க வேண்டும். சாதம், பருப்பு, சாம்பார், ரசம், காய்கறி, அப்பளம் ஆகியன படைக்கப்படுதல் வேண்டும். எல்லோரும் சாப்பிட்டு முடித்தவுடன், ஆறு பேரது சாப்பிட்ட இலைகளைக் குழந்தையே எடுக்க வேண்டும். பின்னர் பெரியோர்களுக்கு வெற்றிலை பாக்கு கொடுக்க வேண்டும்.",
          en: "The three together tie the knotted arali-kaai on the child's right hand. All five then come inside and eat with the child seated in the middle. They first mix uppittu, vadai, gujjayam, pazham and ghee and each give her a handful. As all have fasted, satham, paruppu, sambar, rasam, kaikari and appalam are served. When everyone has eaten, the child alone clears the six leaves, and vetrilai-paaku is given to the elders.",
        },
      },
      {
        title: { ta: "மறுநாள் காலை", en: "The next morning" },
        detail: {
          ta: "மறுநாள் காலையில் குழந்தையைக் குளிக்க வைத்து, ஆடை உடுத்தி, அலங்கரித்து, பூஜைப் பொருட்களோடு (தேங்காய், பழம், வெற்றிலை, பாக்கு, பூ, கற்பூரம், ஊதுபத்தி, நவதானியம்) கௌரி அம்மன் கோயிலுக்கு அழைத்துச் செல்ல வேண்டும். பூஜை முடிந்தவுடன் கையில் கட்டிய அரளிக்காய் நூலை அவிழ்த்து சாமி முன் வைக்க வேண்டும். அங்கு பூஜித்த மலர்களுடன் அந்த அரளிக்காயையும் ஒரு தட்டில் வைத்து எடுத்து வந்து கிணற்றில் (கங்கம்மா) விட வேண்டும் — “மஞ்சிமஞ்சி பூவுலு கௌரம்மகு, வாடின பூவுலு கங்கம்மகு”. செல்லும் வழியில் 3 இடங்களில் பூத்தட்டை வைத்து கும்மி தட்ட வேண்டும். அடுத்த ஆண்டு விரதம் இருக்க வேண்டிய குழந்தைகளும் (6, 8 வயதினர்) உடன் சேர்ந்து கொள்வர்.",
          en: "The child is bathed, dressed and adorned and taken to the Gauri Amman temple with thengai, pazham, vetrilai, paaku, poo, karpooram, oodhupathi and navadhaniyam. After the pooja the thread on her hand is untied and placed before the goddess, and the arali-kaai is carried with the worshipped flowers and dropped into a well (Gangamma) — 'மஞ்சிமஞ்சி பூவுலு கௌரம்மகு, வாடின பூவுலு கங்கம்மகு'. On the way the flower-tray is set down at three places and kummi is clapped. Children due to keep the vratham next year (aged 6 and 8) join in.",
        },
      },
      {
        title: { ta: "உத்தாபின சீர் நிறைவேறியமை", en: "Completing the Uthaapina Seer" },
        detail: {
          ta: "சீர் செய்த அடுத்த ஆண்டு கௌரி விரதத்திற்குரிய நாள் வரை குழந்தையோடு விரதம் மேற்கொண்ட ஐவரும் நலமாக இருத்தல் வேண்டும்; அப்போது தான் விரதம் பூர்த்தியாகும். அடுத்த ஆண்டு கௌரிவிரத நாளில் குழந்தையைக் குளிப்பாட்டி, புத்தாடை உடுத்தி அலங்கரித்து கௌரி அம்மன் கோயிலுக்கு அழைத்துச் செல்ல வேண்டும். பூ, தேங்காய், பழத்துடன் ஒரு தட்டில் புதிய புடவை, ரவிக்கைத் துணி வைத்துக்கொண்டு சென்று, அம்மனின் முன் வைத்து நன்றி செலுத்தி வணங்க வேண்டும். பின்னர் விரதம் இருந்த ஐவருக்கும் நல்லெண்ணெய், பருப்புடன் புதிய பாத்திரங்களில் பலகாரம் கொடுத்தனுப்ப வேண்டும்.",
          en: "The five who kept the vratham with the child must remain well until the Gauri vratham day of the following year — only then is the vratham complete. On that day the child is bathed, dressed and taken again to Gauri Amman with flowers, coconut, fruit and a new pudavai and ravikkai. Thanks are offered for the seer being fulfilled, and good sesame oil, paruppu and palakaaram in new vessels are given to the five.",
        },
      },
    ],
    closing: {
      heading: {
        ta: "நம் முன்னோர்கள் கூறிய காரணம்",
        en: "The reason our elders gave",
      },
      body: [
        {
          ta: "நம் முன்னோர்கள், எந்த ஒரு சீரினையும் சடங்கினையும் காரணகாரியங்கள் இன்றி வெறும் பொழுது போக்கிற்காகக் கடைப் பிடிக்கவில்லை. கம்மவார் குலத்தினரும், எல்லாச் சீர்களையும் சடங்குகளையும் வாழ்க்கையின் வழிகாட்டும் நெறிகளாகவே கடைபிடித்து வந்துள்ளனர்.",
          en: "Our ancestors did not keep any seer or ceremony without cause, merely to pass the time. The Kammavar kulam has kept every seer as a guiding path for life.",
        },
        {
          ta: "பெண் குழந்தையின் முதல் பருவம் பேதைப் பருவம் (7, 9 வயது). அந்த வயதில் குழந்தையின் மனதில் தம்மைச் சுற்றி நடக்கின்ற நிகழ்ச்சிகள் மெல்ல மெல்ல வேரூன்றும். எனவே அந்த வயதில் கடைபிடிக்கப்படுகின்றன. “உத்தாபின சீரால்” அக்குழந்தையின் உள்ளத்தில் விரதத்தின் நன்மை, பெரியோர்களை மதித்தல், உறவினர் சூழ்ந்திருத்தல், தெய்வ வழிபாடு ஆகிய நல்ல பண்புகள் வேரூன்றுகின்றன. குழந்தை வளர வளர நல்ல பண்புகளும் அவளோடு சேர்ந்து வளர்கிறது. அவளால், பிறந்த வீடும் புகுந்த வீடும் நலம் பெறுகின்றன.",
          en: "A girl child's first stage is the pedhai paruvam (around 7 to 9). At that age whatever happens around her slowly takes root in her mind — which is why these are kept precisely then. Through the Uthaapina Seer, the good of the vratham, respect for elders, the feeling of being surrounded by relatives, and devotion take root in her heart. As she grows, those qualities grow with her — and through her, both the home she is born into and the home she marries into prosper.",
        },
        {
          ta: "எல்லாம் வல்லவளாகிய பராசக்தியின் வடிவமாகிய — கம்மவார் குலத்தில் எல்லம்மாவாகிய ரேணுகா தேவியின் அனுக்கிரகம் கிடைக்கப்பெறும், அவள் மகள் கௌரி அம்மனும் துணையிருப்பாள்.",
          en: "In this the Kammavar kulam receives the grace of Renuka Devi — the form of the all-powerful Parasakthi — and her daughter Gauri Amman stands beside them too.",
        },
      ],
    },
    source:
      "Retold from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore — with our thanks.",
  },
  {
    id: "kamma-payindu-sangiyam",
    kulamId: "kammavar-naidu",
    lifeEvent: "Coming of Age",
    title: { ta: "பயிண்டு சாங்கியம் (மாராப்பு சீர்)", en: "Payindu Sangiyam (Maraappu Seer)" },
    summary: {
      ta: "ஒரு பெண் குழந்தை தான் ஒரு பெண்ணாக உருமாறிக் கொண்டிருப்பதை உணர்த்தும் சடங்குதான் “பயின்டேசேதி” என்னும் மாராப்புச் சீர் ஆகும். ஆடி, புரட்டாசி, மார்கழி மாதங்கள் தவிர பிற மாதங்களில், ஒரு நல்ல நாள் பார்த்து இச்சடங்கைச் செய்யலாம். பெண்ணின் ஒன்பதாவது வயதில் செய்யப்படும்.",
      en: "The rite called 'Payindedhi' — the Maraappu Seer — is the one that marks a girl beginning to become a woman. It may be done in any month except Aadi, Purattasi and Maargazhi, on an auspicious day, in her ninth year.",
    },
    steps: [
      {
        title: { ta: "உறவினர் கூடுதல்", en: "The family gathers" },
        detail: {
          ta: "பெண்ணின் ஒன்பதாவது வயதில், ஒரு நல்ல நாளில், தாய் மாமா, மாமி, பாட்டி, தாத்தா எல்லோரும் சேர்ந்து பெண்ணை அழைத்து வந்து, புதிய புடவை, ரவிக்கை, நகை முதலியவை வாங்கி வந்து, உறவினர்களை அழைத்துச் சடங்கு செய்ய வேண்டும்.",
          en: "In her ninth year, on an auspicious day, the maternal uncle and aunt, grandmother and grandfather all come together, bring the girl, buy a new pudavai, ravikkai and jewellery, and invite the relatives for the rite.",
        },
      },
      {
        title: { ta: "எண்ணெய் ஸ்நானம்", en: "The oil bath" },
        detail: {
          ta: "தாய் மாமாவின் மனைவி, பெண்ணிற்கு எண்ணெய் ஸ்நானம் செய்ய வேண்டும். பின்னர் ஒரு மனைப்பலகை போட்டு, ஜமக்காளம் விரித்து அமர வைத்து, ஒரு தட்டில் சேலை, ரவிக்கை, வெற்றிலை பாக்கு, எலுமிச்சம் பழம், பூ ஆகியவற்றைக் கொடுத்து, சந்தனம், குங்குமம் வைத்துப் பூச்சூட்ட வேண்டும்.",
          en: "The maternal uncle's wife gives the girl an oil bath. A manaipalagai is set down, a jamakkalam spread, and she is seated; a plate with a saree, ravikkai, vetrilai-paaku, lemon and flowers is given, sandalwood and kungumam applied, and flowers placed in her hair.",
        },
      },
      {
        title: { ta: "மாராப்பு புடவை கட்டுதல்", en: "Draping the maraappu" },
        detail: {
          ta: "பெண்ணை அழைத்துப் போய், புடவைக்கு மஞ்சள் வைத்து, ஒரு முனையில் வெற்றிலை பாக்கு, பவுன் அல்லது பணம் வைத்து முடிந்து, வலதுபுறம் மாராப்பு வருமாறு புடவை கட்டி விட வேண்டும்.",
          en: "The girl is taken aside, turmeric is applied to the pudavai, vetrilai-paaku and a sovereign or money are knotted into one end, and the saree is draped so that the maraappu falls over the right shoulder.",
        },
        significance: {
          ta: "மாராப்பு தான் இச்சடங்கின் மையம் — குழந்தை பெண்ணாகிறாள் என்பதை ஆடையே அறிவிக்கிறது.",
          en: "The maraappu is the whole point — the garment itself announces that the child is becoming a woman.",
        },
      },
      {
        title: { ta: "ஆசீர்வாதம்", en: "The blessing" },
        detail: {
          ta: "பெண்ணை மனைப்பலகையில் அமர்த்தி, குத்துவிளக்குகள் ஏற்றி வைத்து, தாத்தா, பாட்டி மற்றும் உறவினர்கள் எல்லோரும் ஆசீர்வாதம் செய்ய வேண்டும். 5 அல்லது 7 அல்லது 9 தட்டுகளில் வெற்றிலை பாக்கு, பழம், பலகாரம் எல்லாம் வைக்க வேண்டும்.",
          en: "She is seated on the manaipalagai, kuthuvilakkus are lit, and the grandfather, grandmother and all the relatives bless her. Five, seven or nine plates are laid with vetrilai-paaku, fruit and palakaaram.",
        },
      },
      {
        title: { ta: "வீடு திரும்புதல்", en: "Returning home" },
        detail: {
          ta: "நல்ல நேரத்தில், பெண்ணை மாமா, மாமி, அம்மா வீட்டிற்கு அழைத்து வர வேண்டும். அங்கு வாசலில் நிறுத்தி ஆர்த்தி எடுக்க வேண்டும். பூஜை அறையில் போய் கற்பூரம் ஏற்றி சாமி கும்பிட்டுச் சந்தனம், குங்குமம் கொடுக்க வேண்டும்.",
          en: "At an auspicious hour the uncle, aunt and mother bring her home. She is stood at the doorway and aarathi is taken. In the puja room camphor is lit, the deity worshipped, and sandalwood and kungumam given.",
        },
      },
    ],
    source:
      "Retold from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore — with our thanks.",
  },
  {
    id: "kamma-ruthu-mangala-seer",
    kulamId: "kammavar-naidu",
    lifeEvent: "Coming of Age",
    title: { ta: "ருது மங்கள சீர்", en: "Ruthu Mangala Seer" },
    summary: {
      ta: "நம் குலப் பெண்ணின் பருவமடைதல் மிகச் சிறப்பாகச் செய்யப்பட்டு வந்தது. ருதுவான நாள், நேரம், நட்சத்திரம் குறித்து ஜாதகம் கணிப்பதும் வழக்கம்.",
      en: "A girl of our kulam coming of age was marked with great honour. It is also customary to note the day, time and natchathiram of her ruthu and to cast her horoscope from it.",
    },
    steps: [
      {
        title: { ta: "முதல் நாள்", en: "The first day" },
        detail: {
          ta: "ருதுவானவுடன் பெண்ணிற்கு மாமி முறை உள்ளவர்கள் ஸ்நானம் செய்வித்து, பால், பழம், சக்கரை சேர்த்துக் கலந்து தர வேண்டும்.",
          en: "As soon as she comes of age, the women who stand as maami bathe her and give her milk, fruit and sugar mixed together.",
        },
      },
      {
        title: { ta: "தாய்ச்சீர்", en: "The mother's seer" },
        detail: {
          ta: "பின்னர் தாய்ச்சீர் செய்யப்படும். பெண்ணிற்கு நீராடி, தாய் எடுக்கும் புதுப் புடவை, நகை அணிவித்து, ஒரு இடத்தில் அமரச் செய்ய வேண்டும். இருபுறமும் குத்துவிளக்குகள் ஏற்றி வைத்து சீர்த் தட்டுகள் வைக்க வேண்டும்.",
          en: "Then the thaai-cheer is performed. She is bathed, dressed in the new pudavai and jewellery her mother has brought, and seated in one place, with kuthuvilakkus lit on both sides and the seer plates set out.",
        },
      },
      {
        title: { ta: "முக்கிய சடங்குப் பொருள்", en: "The central offering" },
        detail: {
          ta: "ஐந்து படி நெல்லை ஒரு பாத்திரத்தில் போட்டு, இரண்டு அச்சு பனைவெல்லம் அதன் மேல் வைக்க வேண்டும். இது தான் முக்கிய சடங்குப் பொருளாகும். சுமங்கலிப் பெண்கள், பெண்ணிற்கு மஞ்சள் குங்குமம் வைத்து இனிப்பு தருவார்கள்.",
          en: "Five padi of paddy are put in a vessel and two moulds of palm jaggery placed on top — this is the central object of the rite. The sumangalis apply turmeric and kungumam to her and give her sweets.",
        },
      },
      {
        title: { ta: "தனிக் குடில்", en: "The separate hut" },
        detail: {
          ta: "தாய்மாமனால் அமைக்கப்பட்ட கம்மந்தட்டுகளால் ஆன குடிலில், பெண்ணைத் தனியே இருக்கும்படி செய்வார்கள்.",
          en: "In a hut built by the maternal uncle from kammanthattu (millet-stalk screens), she is given a place to stay apart.",
        },
      },
      {
        title: { ta: "சீர் செய்தல்", en: "Completing the seer" },
        detail: {
          ta: "அன்றோ அல்லது மூன்று மாதம் கழித்தோ, ஒரு நல்ல நாளில், தாய்மாமனால் பெண் வீட்டில் முன் கூறியபடி சீர் செய்ய வேண்டும்.",
          en: "That same day, or three months later on an auspicious day, the maternal uncle performs the seer at the girl's house as described above.",
        },
      },
    ],
    closing: {
      heading: {
        ta: "தனிக் குடில் ஏன்?",
        en: "Why the separate hut?",
      },
      body: [
        {
          ta: "உடல்ரீதியாகத் திருமணத் தகுதி பெற்றுவிட்ட பெண்ணுக்கு மனரீதியாகவும் வலிமை வேண்டும்; பெற்றோரை விட்டுத் தனித்து இருக்கும் வலிமையை வரவழைக்கவும், சுகாதாரம் கருதியும், அச்சமயத்தில் முழுமையான ஓய்வு தேவை என்பதாலும் பெண்ணைத் தனியே குடில் கட்டி வைக்கும் முறை வழக்கத்தில் இருந்து வந்தது.",
          en: "A girl who has become physically ready for marriage needs to be ready in mind too. The custom of building her a hut of her own came from four reasons together: to call up in her the strength to be apart from her parents, out of care for hygiene, and because complete rest is what she truly needs at that time.",
        },
        {
          ta: "ஆனால் இன்றைய காலத்தில் வேகமாய் மாறிவரும் வாழ்க்கைச் சூழலில், நம் அனைவரும் இந்தச் சடங்கை மறந்தும் மறுத்தும் வருகிறோம்.",
          en: "But in today's fast-changing way of life, we have all been forgetting this rite — and refusing it.",
        },
      ],
    },
    source:
      "Retold from community material shared by the Peelamedu Kammavar Seva Sangam (kammavarthirumanaseva.com), Coimbatore — with our thanks.",
  },
];
