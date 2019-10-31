const Data = {
    getImageList: function(){
        const list = [];
        Object.keys(Data.CATEGORIES).forEach(function(e){
            Data[e].forEach(function(e){
                e.images.forEach(function(e){
                    list.append('res/grafik/' + e);
                });
                list.append('res/grafik/' + e.graphic);
            });
        });
    },
    getCategory: function(key){
        console.log("Getting -" + key + "-")
        for(i = 0; i<Data.CATEGORIES.length; i++){
            if(Data.CATEGORIES[i].key == key)return Data.CATEGORIES[i];
        }
    },
    CATEGORIES: [{key: 'fleischlos', name: 'Fleischlos glücklich', icon: 'res/icons/categories/pig.png', background: ['res/grafik/fleischlos/schwein.jpg', 'Jonas Wresch']},
                  {key: 'meere', name: 'Hohe See', icon: 'res/icons/categories/ocean.png', background: ['res/grafik/meere/meer.jpg', 'David Traum']},
                  {key: 'kleidung', name: 'Fast Fashion', icon: 'res/icons/categories/tshirt.png', background: ['res/grafik/kleidung/kleidung.jpg', 'David Traum']}],
    fleischlos: [
        {
            type: 'Estimation',
            question: 'Welchen Anteil hat Biofleisch am deutschen Markt?',
            min: 0,
            max: 100,
            correct: 2,
            step: 1,
            unit: '%',
            pointloss: 2,
            images: ['fleischlos/slider/massenhuehner.jpg', 'fleischlos/slider/biohuehner.jpg'],
            copyright: ['Fred Dott / Greenpeace', 'Bente Stachowske / Greenpeace'],
            text: 'Der Anteil von Biofleisch ist sehr gering. Rund 98-99% der gekauften Fleischprodukte stammen aus konventioneller Tierhaltung. Den höchsten Bioanteil der tierischen Produkte erreichen Eier.',
            src: 'Agrarmarkt Informations-Gesellschaft',
            graphic: 'fleischlos/bioanteil.png'
        },

        {
            type: 'Estimation',
            question: 'Wie viele Tiere werden in Deutschland pro Jahr geschlachtet?',
            min: 0,
            max: 1000,
            correct: 750,
            step: 10,
            unit: 'Millionen',
            pointloss: 20,
            images: ['fleischlos/slider/schwein_nah.jpg', 'fleischlos/slider/schlachthof.jpg'],
            copyright: ['Mitja Kobal / Greenpeace', 'Mauricio Bustamante / Greenpeace'],
            text: 'In Deutschland werden im Jahr etwa 750 Millionen Tiere geschlachtet. Das entspricht etwa 2-3 Tieren pro Sekunde.',
            src: 'Albert Schweitzer Stiftung / Statistisches Bundesamt / Fleischatlas',
            graphic: 'fleischlos/tiere_geschlachtet.png'
        },

        {
            type: 'Estimation',
            question: 'Welchen Anteil hat die Tierhaltung an den weltweiten Treibhausgas-Emissionen?',
            min: 0,
            max: 100,
            correct: 14.5,
            step: 1,
            unit: '%',
            pointloss: 2,
            images: ['fleischlos/slider/kuehe_weide.jpg', 'fleischlos/slider/kuehe_weide_sw.jpg'],
            copyright: ['David Traum', 'David Traum'],
            text: 'Durch die hohen Methanemissionen hat die Tierhaltung einen Anteil von 14.5% an den gesamten Treibhausgas-Emissionen. Das ist mehr als der Verkehr. Dieser große Faktor könnte einfach durch einen Ernährungswechsel bewältigt werden, ohne das zusätzlicher finanzieller Aufwand nötig ist.',
            src: 'Fleischatlas / Greenpeace',
            graphic: 'fleischlos/emissions.png'
        },

        {
            type: 'Choice',
            question: 'Wie viele Hühner dürfen in der konventionellen Tierhaltung auf einem Quadratmeter gehalten werden?',
            options: [25,15,10,5],
            correct:  25,
            text: 'Laut der EU Richtline zum Schutz von Masthühnern dürfen in der industriellen Tierhaltung bis zu 42kg Hühner pro Quadratmeter gehalten werden. Das entspricht ca. 25 Hühnern. In der Biohaltung sind es "nur" 10 Hühner pro Quadratmeter.',
            src: 'EU Richtline Mindestvorschrift zum Schutz von Masthühnern',
            graphic: 'fleischlos/huehner_pro_qm.png'
        },

        {
            type: 'Choice',
            question: 'Welches Lebensmittel verbraucht am meisten Wasser?',
            options: ['Mango', 'Schweinefleisch', 'Spargel', 'Eier', 'Rindfleisch'],
            correct:  'Rindfleisch',
            text: 'Rindfleisch verbraucht in der Herstellung etwa 15000 Liter Wasser, da im Futteranbau und der Tierhaltung sehr viel davon benötigt wird.',
            src: 'Statista.com',
            graphic: 'fleischlos/wasserverbrauch.jpg'
        },        

        
        {
            type: 'Order',
            question: 'Sortieren sie die Lebensmittel nach ihrer Klimaschädlichkeit',
            options: ['Butter', 'Rindfleisch', 'Käse und Sahne','Schweinefleisch'],
            icons: ['fleischlos/order/butter.png', 
                    'fleischlos/order/rindfleisch.png', 
                    'fleischlos/order/milchprodukte.png', 
                    'fleischlos/order/schweinefleisch.png'],
            text: 'Den höchsten CO2 Austoss pro Kilogramm hat Butter, da für ein Kilogramm Butter ca. 18 Liter Milch benötigt werden. Insgesamt verursacht (Rind-)Fleisch allerdings höhere  Emissionen, da davon eine größere Menge konsumiert wird.',
            src: 'Utopia.de / ak-umwelt.de',
            graphic: 'fleischlos/co2_lebensmittel.jpg',
            correct: '',
        }
    ],

    meere: [
        {
            type: 'Estimation',
            question: 'Wie viele Jahre braucht eine PET-Flasche bis sie im Meer zerfällt?',
            min: 100,
            max: 500,
            correct: 400,
            step: 5,
            unit: 'Jahre',
            pointloss: 10,
            images: ['meere/slider/hai.jpg', 'meere/slider/flasche.jpg'],
            copyright: ['Alex Hofford / Greenpeace', 'Justin Hofman / Greenpeace'],
            text: 'Eine robuste Plastikflasche etwa braucht schätzungsweise 400 Jahre, um abgebaut zu werden. In einigen Meeresregionen sammelt sich der Müll in gewaltigen Strudeln, so im Nordostpazifik nördlich von Hawaii – auf einer Fläche so groß wie Mitteleuropa.',
            src: 'Greenpeace / Umweltbundesamt / WWF',
            graphic: 'meere/zerfallsdauer.png'
        },  

        {
            type: 'Choice',
            question: 'Wie viel Plastikmüll exportiert Deutschland in andere Länder?',
            options: ['100.000 Tonnen', '500.000 Tonnen','1 mio. Tonnen','10 mio. Tonnen'],
            correct:  '1 mio. Tonnen',
            text: 'Wir haben jährlich ein Plastikmüllaufkommen in Deutschland von sechs Millionen Tonnen und davon geht eine Million in den Export. Der größte Abnehmer 2018 war Malaysia und dann gibt es noch weitere südostasiatische Länder.',
            src: 'NABU / Deutschlandfunk',
            graphic: 'meere/plastikexporte.jpg'
        }, 

        {
            type: 'MultiChoice',
            question: 'Welche Rohstoffe werden unter anderem aus dem Meer gewonnen?',
            options: ['Mangan', 'Gold','Silber','Platin', 'Kies', 'Erdöl', 'Natrium', 'Phosphor', 'Bronze', 'Helium'],
            correct:  ['Mangan', 'Gold','Silber','Platin', 'Kies', 'Erdöl'],
            text: 'Unter dem Meer lagern Erdöl und Erdgas sowie Sand, Kies, Mineralien und Metalle. Um der Erde auch noch diese Schätze zu entreißen, dringen wir Menschen in immer tiefere Meeresregionen vor und bedrohen die letzten fast unberührten Gebiete.',
            src: 'Greenpeace / Umweltbundesamt',
            graphic: 'meere/tiefseebergbau.png'
        }, 

        {
            type: 'Estimation',
            question: 'Wie viele Tonnen Plastikmüll schwimmen im Meer?',
            min: 0,
            max: 300,
            correct: 150,
            step: 5,
            unit: 'mio. Tonnen',
            pointloss: 10,
            images: ['meere/slider/strand_plastikfrei.jpg', 'meere/slider/strand_plastik.jpg'],
            copyright: ['David Traum', 'David Traum'],
            text: 'Eine robuste Plastikflasche etwa braucht schätzungsweise 400 Jahre, um abgebaut zu werden. In einigen Meeresregionen sammelt sich der Müll in gewaltigen Strudeln, so im Nordostpazifik nördlich von Hawaii – auf einer Fläche so groß wie Mitteleuropa.',
            src: 'Greenpeace',
            graphic: 'meere/achter_kontinent.jpg',
            singleBlend: true
        },  
        
        {
            type: 'Estimation',
            question: 'Wie viel Prozent der Speisefischbestände sind von der Überfischung bedroht, oder bereits überfischt?',
            min: 0,
            max: 100,
            correct: 90,
            step: 1,
            unit: '%',
            pointloss: 2,
            images: ['meere/slider/fische.jpg', 'meere/slider/fischfang.jpg'],
            copyright: ['Marco Care / Greenpeace', 'Pierre Gleizes / Greenpeace'],
            text: 'Immer größer ist unser Bedarf an Fisch geworden, immer größere Fangflotten durchpflügen die Meere. Die Folge: 90 Prozent der weltweit kommerziell genutzten Fischbestände sind überfischt oder werden bis an ihre biologischen Grenzen befischt.',
            src: 'FAO (2018). The State of World Fisheries and Aquaculture 2018 (SOFIA). / NABU / Deutsche Meeresstiftung',
            graphic: 'meere/ueberfischung.jpg'
        }, 

        {
            type: 'Estimation',
            question: 'Wie tief reichen die Grundschleppnetze eines Fischkutters?',
            min: 100,
            max: 3000,
            correct: 2000,
            step: 100,
            unit: 'Meter',
            pointloss: 2,
            images: ['meere/slider/fische.jpg', 'meere/slider/schleppnetz.jpg'],
            copyright: ['Marco Care / Greenpeace', 'Alex Hofford / Greenpeace'],
            text: 'Längst gehen nicht mehr nur von der konventionellen Fischerei Gefahren aus. Selbst Meerestiefen von unterhalb 2000 Metern werden heute befischt, so der UNEP- und IUCN-Report. Dazu kommen Rohstoffabbau, Energiegewinnung und militärische Unternehmungen.',
            src: 'NABU / Greenpeace',
            graphic: 'meere/schleppnetze.jpg'
        }, 

        {
            type: 'Choice',
            question: 'Wie viele Tonnen des menschgemachten CO2 speichert das Meer?',
            options: ['10%', '30%','50%','5%', '70%'],
            correct:  '30%',
            text: 'Ozeane nehmen Kohlendioxid auf. Und zwar seit Beginn der Industrialisierung konstant etwa 30 Prozent. Das ergaben zwei Studien von Wissenschaftlern der Uni Zürich. Dabei gilt: Obwohl die Menschen in den letzten Jahrzehnten mehr CO2 produziert haben, hat sich die sogenannte Senkenleistung der Meere ungefähr proportional dazu entwickelt. Je höher also der CO2-Gehalt in der Luft, desto mehr CO2 wird vom Meer absorbiert.',
            src: 'Quarks / IPCC (Meeresatlas)',
            graphic: 'meere/waermeaufnahme.png'
        }, 

        {
            type: 'MultiChoice',
            long: true,
            correct_txt: 'Alle',
            question: 'Welche Auswirkungen hat ein Meeresschutzgebiet?',
            options: ['Lebensräume von Tieren und Pflanzen werden geschützt',
                      'Erholung der Fischbestände',
                      'Ökosysteme im Meer werden widerstandsfähiger',
                      'Steigerung von Artenvielfalt'],
            correct:  ['Lebensräume von Tieren und Pflanzen werden geschützt', 
                    'Erholung der Fischbestände',
                    'Ökosysteme im Meer werden widerstandsfähiger',
                    'Steigerung von Artenvielfalt'],
            text: 'Im Weddell-Meer nördlich der Antarktis sollte das größte Meeresschutzgebiet der Erde entstehen. Der Plan hätte Fischerei in dem artenreichen Gebiet verboten. Doch nun sind die Pläne gescheitert - am Veto von drei Staaten.',
            src: 'Greenpeace / Spiegel',
            graphic: 'meere/weddelmeer_schutzgebiet.jpg'
        }
    ]
} 