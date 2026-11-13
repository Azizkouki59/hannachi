// Single source of truth for business data.
// Only details verified on https://hannachi.de are filled in. Everything else is null
// and rendered as a clearly marked "ergänzen" notice on the legal pages only.

export const business = {
  name: "Hannachi",
  tagline: "Elektrohaushaltsgeräte Service",
  owner: "Kamal Hannachi",
  founded: 1990,
  street: "Iburger Straße 5, Im Hof",
  zip: "49082",
  city: "Osnabrück",
  phoneDisplay: "0170 3493494",
  phoneHref: "tel:+491703493494",
  // The live site shows a WhatsApp button; the number behind it is assumed to be the mobile number above.
  whatsappHref: "https://wa.me/491703493494",
  hours: "Nur nach Terminvereinbarung",
  email: null as string | null,
  vatId: null as string | null,
  url: "https://hannachi.de",
  mapsUrl: "https://www.google.com/maps/place/Hannachi+Elektrohaushaltsger%C3%A4te+Service/@52.2902275,8.0207428,17z/data=!3m1!4b1!4m6!3m5!1s0x47b9e5bf477f10fd:0x1f80e75886e37b1e!8m2!3d52.2902275!4d8.0207428!16s%2Fg%2F1tfhfj72",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Hannachi+Elektrohaushaltsger%C3%A4te+Service,+Iburger+Stra%C3%9Fe+5,+49082+Osnabr%C3%BCck&t=&z=16&ie=UTF8&iwloc=&output=embed",
  coordinates: {
    lat: 52.2902275,
    lng: 8.0207428,
  },
};

export const yearsOfExperience = new Date().getFullYear() - business.founded;

export const brands = ["Miele", "Bosch", "Siemens", "AEG", "Bauknecht"];

export type Service = {
  slug: "waschmaschinen" | "geschirrspueler" | "kuehlschraenke" | "backoefen";
  title: string;
  short: string;
  intro: string;
  symptoms: string[];
  approach: string;
  customerNote?: { quote: string; author: string };
};

export const services: Service[] = [
  {
    slug: "waschmaschinen",
    title: "Waschmaschinen",
    short: "Wenn die Maschine ausläuft, nicht schleudert oder gar nicht mehr startet.",
    intro:
      "Eine defekte Waschmaschine bringt den Alltag schnell durcheinander. Wir suchen die Ursache direkt am Gerät und sagen Ihnen vorab, ob sich eine Reparatur lohnt.",
    symptoms: ["Maschine läuft aus", "Wasser wird nicht abgepumpt", "Trommel schleudert nicht", "Gerät startet nicht mehr"],
    approach:
      "Sie beschreiben das Problem, wir geben eine erste Einschätzung und vereinbaren einen Termin. Vor der Reparatur wissen Sie, womit Sie rechnen müssen.",
    customerNote: {
      quote: "Defekte Waschmaschine: Hat sie am nächsten Tag schnell und kompetent repariert. Preis war vollkommen in Ordnung.",
      author: "A. U.",
    },
  },
  {
    slug: "geschirrspueler",
    title: "Geschirrspüler",
    short: "Bleibt das Geschirr schmutzig oder steht Wasser im Gerät? Wir finden den Fehler.",
    intro:
      "Oft steckt hinter einem streikenden Geschirrspüler ein kleiner Fehler. Manchmal lässt er sich schon am Telefon eingrenzen.",
    symptoms: ["Wasser bleibt im Gerät stehen", "Geschirr wird nicht sauber", "Programm bricht ab", "Gerät reagiert nicht"],
    approach:
      "Wir klären zuerst am Telefon, ob es eine einfache Lösung gibt. Wenn nicht, kommen wir zur Reparatur vorbei.",
    customerNote: {
      quote: "Herr Hannachi konnte schon am Telefon schnell und kostenfrei einen Tipp geben, wie wir unseren Geschirrspüler mit ein paar Handgriffen wieder zum Laufen bringen.",
      author: "Roman Osinsky",
    },
  },
  {
    slug: "kuehlschraenke",
    title: "Kühlschränke",
    short: "Wenn der Kühlschrank nicht mehr richtig kühlt, zählt jeder Tag.",
    intro:
      "Ein Kühlschrank, der nicht mehr richtig kühlt, ist dringend. Schildern Sie uns das Problem, wir melden uns persönlich bei Ihnen.",
    symptoms: ["Kühlt nicht mehr richtig", "Ungewöhnliche Geräusche", "Gerät taut ab oder vereist", "Gerät schaltet nicht ein"],
    approach:
      "Nennen Sie uns Marke und Modell, wenn Sie sie kennen. Das hilft uns, Ersatzteile frühzeitig zu klären.",
  },
  {
    slug: "backoefen",
    title: "Backöfen",
    short: "Der Ofen wird nicht mehr heiß oder bleibt kalt? Wir sehen uns das an.",
    intro:
      "Wenn der Backofen streikt, hilft oft schon ein einzelnes Bauteil. Wir sagen Ihnen ehrlich, was nötig ist und was nicht.",
    symptoms: ["Ofen wird nicht heiß", "Heizung fällt aus", "Anzeige oder Bedienung defekt", "Backofen schaltet sich ab"],
    approach:
      "Wir verkaufen nur, was Sie wirklich brauchen. Das gilt für Ersatzteile genauso wie für die Reparatur.",
    customerNote: {
      quote: "Unser Backofen war kaputt. Ich habe angerufen und konnte direkt einen Termin für den nächsten Tag bekommen. Insgesamt hat alles nur 35€ gekostet.",
      author: "Pia B",
    },
  },
];

export type Review = { author: string; text: string };

// Verbatim Google reviews shown on hannachi.de (verified via Trustindex). Do not edit wording.
export const reviews: Review[] = [
  { author: "Debeka Servicebüro", text: "Spontaner Termin, gute Beratung und volle Fachkenntnis." },
  { author: "A. U.", text: "Defekte Waschmaschine: Hat sie am nächsten Tag schnell und kompetent repariert. Preis war vollkommen in Ordnung. Absolute Empfehlung!" },
  { author: "Roman Osinsky", text: "Herr Hannachi konnte schon am Telefon schnell und kostenfrei einen Tipp geben, wie wir unseren Geschirrspüler mit ein paar Handgriffen wieder zum Laufen bringen. So geht \"Kundenbindung\"." },
  { author: "Pia B", text: "Unser Backofen war kaputt. Ich habe angerufen und konnte direkt einen Termin für den nächsten Tag bekommen. Insgesamt hat alles nur 35€ gekostet, da das Teil wohl relativ einfach zu reparieren war. Andere Handwerker hätten einen da vielleicht noch abgezockt. Herr Hannachi war freundlich und die Kommunikation via WhatsApp war sehr unkompliziert. Leider hatte ich ihm die falsche Hausnummer geschrieben (bin wohl auf der Tastatur eine Taste zu weit nach links gekommen... Sorry dafür!). Trotzdem hat Herr Hannachi sich zu uns durchgefragt und uns z. B. keine erneute Anfahrt in Rechnung gestellt." },
  { author: "Wayfarer", text: "Super netter und kompetenter Mann wenn es um Elektrohaushaltsgeräte geht. Kennt sich sehr gut aus, verkauft Geräte und kauft sie auch ab. Bei defekten hilft er mit seinem Fachwissen und Ersatzteilen bei der Reparatur für faire Preise. Auch am Telefon sehr nette und ausführliche Auskunft." },
  { author: "Raphattack", text: "Sehr kompetent!" },
  { author: "Dominik Gawehn", text: "Dankeschön Herr Hannachi! Toller Service, preiswert, schnelle Abwicklung. Sehr empfehlenswert!" },
];

export const nav = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kundenbewertungen", label: "Kundenbewertungen" },
  { href: "/kontakt", label: "Kontakt" },
];

export const sparePartsHighlights = [
  {
    title: "100% Original-Qualität",
    desc: "Ausschließlich geprüfte Original-Ersatzteile direkt vom Hersteller oder zertifizierten Erstausrüstern.",
  },
  {
    title: "Für alle Hersteller & Fabrikate",
    desc: "Ersatzteile für Bosch, Siemens, Miele, AEG, Bauknecht, Liebherr, Neff, Samsung, Beko und viele mehr.",
  },
  {
    title: "Schnelle Verfügbarkeit",
    desc: "Gängige Verschleißteile direkt auf Lager in der Werkstatt. Spezifische Teile meist innerhalb 24–48h.",
  },
  {
    title: "Beratung & Montageservice",
    desc: "Genaue Teile-Identifikation per Typenschild. Wahlweise zur Selbstmontage oder fachgerechtem Einbau.",
  },
];

export const sparePartsCategories = [
  {
    category: "Waschmaschinen & Trockner",
    appliance: "waschmaschinen",
    parts: [
      "Laugenpumpen & Ablaufpumpen",
      "Heizstäbe & Temperatursensoren",
      "Türmanschetten & Bullaugendichtungen",
      "Keilriemen & Antriebsriemen",
      "Motorkohlen & Kohlebürsten",
      "Stoßdämpfer & Aufhängungsfedern",
      "Türverriegelungen & Elektronikmodule",
    ],
  },
  {
    category: "Geschirrspüler",
    appliance: "geschirrspueler",
    parts: [
      "Umwälzpumpen & Heizpumpen",
      "Ablaufpumpen & Rückschlagventile",
      "Spritzarme oben & unten",
      "Türdichtungen & Wannendichtungen",
      "Aquastop-Zulaufschläuche",
      "Dosierkammern & Klarspülerspender",
      "Geschirrkörbe & Rollensätze",
    ],
  },
  {
    category: "Kühlschränke & Gefriergeräte",
    appliance: "kuehlschraenke",
    parts: [
      "Thermostate & NTC-Temperaturfühler",
      "Magnet-Türdichtungen",
      "Türscharniere & Schleppscharniere",
      "Umluftventilatoren & Lüftermotoren",
      "Kompressor-Startrelais & Klixon",
      "Abtauheizungen & Timer",
      "Glasplatten, Schubladen & Türfächer",
    ],
  },
  {
    category: "Backöfen & Herde",
    appliance: "backoefen",
    parts: [
      "Unterhitze- & Oberhitze-Heizkörper",
      "Heißluft-Ringheizkörper",
      "Backofenschalter & Energieregler",
      "Sicherheits-Thermostate",
      "Backofentürdichtungen & Scheiben",
      "Heißluftlüfter & Kühlgebläse",
      "Backbleche & Kombiroste",
    ],
  },
];

export const sparePartsBrands = [
  { name: "Miele", group: "Deutsche Premiumklasse" },
  { name: "Bosch", group: "BSH Hausgeräte" },
  { name: "Siemens", group: "BSH Hausgeräte" },
  { name: "AEG", group: "Electrolux Gruppe" },
  { name: "Bauknecht", group: "Whirlpool Gruppe" },
  { name: "Liebherr", group: "Kühl- & Gefriertechnik" },
  { name: "Neff", group: "BSH Hausgeräte" },
  { name: "Constructa", group: "BSH Hausgeräte" },
  { name: "Samsung", group: "Originalteile" },
  { name: "LG", group: "Originalteile" },
  { name: "Beko", group: "Haushaltsgeräte" },
  { name: "Gorenje", group: "Hisense Gruppe" },
  { name: "Electrolux", group: "Electrolux Gruppe" },
  { name: "Privileg", group: "Haushaltsgeräte" },
  { name: "Zanussi", group: "Electrolux Gruppe" },
  { name: "Whirlpool", group: "Whirlpool Gruppe" },
];

export type SupportedApplianceCategory = {
  title: string;
  badge: string;
  description: string;
  items: {
    name: string;
    description: string;
    symptoms: string[];
  }[];
};

export const allSupportedAppliances: SupportedApplianceCategory[] = [
  {
    title: "Wäsche waschen und trocknen",
    badge: "Großgeräte",
    description: "Zuverlässige Reparatur für Ihre Waschmaschinen und Trockner.",
    items: [
      {
        name: "Waschmaschinen & Toplader",
        description: "Frontlader, Toplader und kompakte Waschmaschinen aller Fabrikate.",
        symptoms: ["Pumpt nicht ab", "Schleudert nicht", "Wasser tritt aus", "Trommellager defekt", "Fehlermeldung"],
      },
      {
        name: "Wäschetrockner",
        description: "Wärmepumpentrockner, Kondenstrockner und Ablufttrockner aller Hersteller.",
        symptoms: ["Heizt nicht mehr", "Trommel steht", "Trocknet nicht durch", "Wasserbehälter-Warnung"],
      },
      {
        name: "Waschtrockner (2-in-1)",
        description: "Kombinierte Wasch- und Trockengeräte mit komplexer Sensortechnik.",
        symptoms: ["Programm bricht ab", "Trockenfunktion streikt", "Starke Vibrationen"],
      },
    ],
  },
  {
    title: "Geschirr spülen",
    badge: "Küche",
    description: "Schnelle Reparatur für sauberes Geschirr und funktionierende Spülmaschinen.",
    items: [
      {
        name: "Geschirrspüler",
        description: "Vollintegrierte, teilintegrierte, Unterbau- und Stand-Spülmaschinen.",
        symptoms: ["Wasser bleibt stehen", "Heizt nicht", "Geschirr nicht sauber", "Aquastop ausgelöst"],
      },
      {
        name: "Gastro- & Bürospülmaschinen",
        description: "Schnellspüler und Kleingewerbegeräte in Praxen, Büros und Kanzleien.",
        symptoms: ["Dosierung fehlerhaft", "Druckverlust", "Laufzeitfehler"],
      },
    ],
  },
  {
    title: "Kühlen und Gefrieren",
    badge: "Kühltechnik",
    description: "Notfallservice für Kühlgeräte — schnell vor Ort, damit Lebensmittel frisch bleiben.",
    items: [
      {
        name: "Kühlschränke",
        description: "Einbau- und Standkühlschränke mit und ohne Gefrierfach.",
        symptoms: ["Kühlt nicht mehr", "Kompressor läuft durch", "Ungewöhnliche Geräusche", "Vereist stark"],
      },
      {
        name: "Gefrierschränke & Gefriertruhen",
        description: "NoFrost-Gefrierschränke, Tiefkühltruhen und Vorratsgeräte.",
        symptoms: ["Temperaturalarm", "Starke Eisbildung", "Lüfter rattert", "Dichtung undicht"],
      },
      {
        name: "Side-by-Side & French Door",
        description: "Großraum-Kühlschränke mit Eiswürfelbereiter und digitaler Invertertechnik.",
        symptoms: ["Eisbereiter streikt", "Kühlkreislauf ungleichmäßig", "Displayausfall"],
      },
    ],
  },
  {
    title: "Kochen, Backen und Lüften",
    badge: "Küche & Hitze",
    description: "Sicherheit und Präzision bei allen wärme- und lüftungstechnischen Küchengeräten.",
    items: [
      {
        name: "Backöfen & Einbauöfen",
        description: "Umluft-, Heißluft- und Dampfbacköfen aller Systeme.",
        symptoms: ["Unter-/Oberhitze defekt", "Ringheizkörper durchgebrannt", "Lüfter laut", "Thermostat schaltet ab"],
      },
      {
        name: "Elektro- & Standherde",
        description: "Klassische Standherde und moderne Einbauherd-Kombinationen.",
        symptoms: ["Platte bleibt kalt", "Schalter defekt", "Backofenuhr blockiert"],
      },
      {
        name: "Ceran- & Induktionskochfelder",
        description: "Autarke Glaskeramik- und Induktionsfelder mit Touch-Steuerung.",
        symptoms: ["Touch reagiert nicht", "Fehlercode im Display", "Kochzone heizt nicht", "Sicherung fliegt"],
      },
      {
        name: "Dunstabzugshauben",
        description: "Wandhauben, Inselhauben, Flachschirm- und Kopffreihauben.",
        symptoms: ["Motor blockiert", "Beleuchtung defekt", "Stufenschaltung streikt", "Extrem laut"],
      },
      {
        name: "Mikrowellen & Dampfgarer",
        description: "Einbau- und Stand-Mikrowellen sowie Solo- und Kombidampfgarer.",
        symptoms: ["Erwärmt Speisen nicht", "Drehteller steht", "Sicherung löst aus", "Display dunkel"],
      },
    ],
  },
  {
    title: "Kaffee und Kleingeräte",
    badge: "Kaffee & Geräte",
    description: "Wartung und Reparatur für Kaffeemaschinen und ausgewählte Geräte.",
    items: [
      {
        name: "Kaffeevollautomaten",
        description: "Jura, DeLonghi, Siemens, Miele, Saeco, Melitta, Nivona, Krups uvm.",
        symptoms: ["Brühgruppe klemmt", "Wasser unter der Maschine", "Kaffee fließt nicht", "Mahlwerk blockiert"],
      },
      {
        name: "Siebträgermaschinen",
        description: "Druckprüfungen, Pumpenwechsel, Dichtungen und Thermoblöcke.",
        symptoms: ["Kein Druckaufbau", "Dampfventil undicht", "Heizt unzureichend"],
      },
      {
        name: "Ausgewählte Kleingeräte",
        description: "Bügelstationen, Staubsauger, Küchenmaschinen auf persönliche Anfrage.",
        symptoms: ["Mechanische & elektrische Prüfung vorab"],
      },
    ],
  },
  {
    title: "Meisterwerkstatt: Platinen- & Elektronikreparatur",
    badge: "Elektronik",
    description: "Reparatur auf Bauteilebene statt teurem Austausch der gesamten Platine.",
    items: [
      {
        name: "Steuerungsplatinen & Leistungselektronik",
        description: "Reparatur von Relais, Triacs, Kondensatoren, Netzteilen und Leiterbahnen.",
        symptoms: ["Gerät ist komplett tot", "Relais klickt nur", "Fehlerstrom / Kurzschluss"],
      },
      {
        name: "Inverter- & Motorsteuerungen",
        description: "Moderne bürstenlose Inverter-Antriebe für Waschmaschinen und Wärmepumpen.",
        symptoms: ["Motor ruckelt", "Drehzahlfehler", "Inverter-Fehlercode"],
      },
      {
        name: "Display- & Bedienmodule",
        description: "Tastaturen, Drehencoder, Segmentanzeigen und Touch-Panele.",
        symptoms: ["Tasten ohne Funktion", "Display flackert oder bleibt schwarz"],
      },
    ],
  },
];


