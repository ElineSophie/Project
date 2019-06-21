# Process book with timeline of my actions

---

__04-06-2019__
---
On this day, I searched for datamaps for the Netherlands (provinces). I found
something on the internet and tried it with my code.

*Problem*

I could not do it with d3v3 and d3v5. This is a question that I will ask
when a staffmember is available.

__05-06-2019__
---
On this day, I made the design mark down. Here, I described which visualization will be on each page and i looked for the data that is needed for each visualization.

I also changed my page.

*Problem*

It was really frustrating which kind of visualization is necessary.

__07-06-2019__
---
Today I collected all data in a csv file. In addition, I started to write a code to write this to a json file (not finished). Looking up all data took a very long time.

What my purpose of the data is that I make all years as a key, ending in a nested dictionary for all years.

__11-06-2019__
---
Vandaag ben ik bezig geweest om van mijn data (CSV bestand) een json file te maken. Dit bleek toch wel moeilijker te zijn dan verwacht. Wat ik graag met mijn CSV file wil, is dat ik de jaren als key gebruik en er een nested dictionary uit krijg. Daarbij moet er dan per provincie data zijn.

Om toch verder te kunneng aan met mijn eindproject, heb ik voor de html pagina types data gezocht (en gevonden). Daarnaast heb ik deze data omgezet naar een json file en ben ik begonnen met het visualiseren van een pie chart.

De problemen die ik hierbij tegen kwam was het inladen van de data naar de pie chart, waarbij er op internet veel voorbeelden staan van versie 3 of 4 d3.

__12-06-2019__
---
Het overzetten van CSV naar JSON met jaren als key is gelukt. Met deze data heb ik een dropdown menu gemaakt op de dementianetherlands.html pagina voor de jaren.
Daarbij heb ik met deze data een scatterplot gemaakt met op de y-as de vergrijzing voor 65+ totaal en op de x-as totaal aantal lopende DBC dementie patiënten (om mee te oefenen). Nu moet ik dit verbinden met andere dropdown menu's, namelijk totaal lopende/gesloten|gesloten|lopend en ook voor totaal m/v|vrouwen|mannen.

Al deze dropdown menus moeten werken voor alle visualisaties tegelijk. Voor de jaren wil ik liever een balk waar je mee kunt slepen maken ipv een dropdown menu.

Probleem: de scatterplot update helaas niet goed, maar krijg voor elk jaar nieuwe scatterplots onder elkaar. Het probleem kan ik zelf nu niet vinden, want ik verwijder de svg steeds bij het aanroepen van mijn functie.

__13-06-2019__
---
De keuze tussen de jaren update nu de scatterplot met specifieke punten. Echter zijn deze punten nu nog wel gehardcoded.

Voor morgen en volgende week is mijn doel dat ik de data uit de json file nu omzet voor de map, waarbij ik een nieuw object moet aanmaken met de provincies als key. Deze moet ik dan koppelen aan mijn datamaps en linken aan de dropdown. De dropdown moet dan werken voor zowel mijn maps en scatterplot. Als dit allemaal is gelukt, moet ik nieuwe dropdown/keuze menus maken, waarbij de gebruiker ook kan kiezen tussen:
- Totaal DBC/lopende DBC/gesloten DBC.
- Totaal man en vrouw/vrouwen/mannen
- 65+ of 80+ (alleen voor de scatterplot)

Voor het weekend is de planning dat ik mijn website layout ga veranderen door middel van bootstrap en grid layouts.

__14-06-2019__
---
De map heeft nu een mousover functie, waarbij er nu momenteel de naam van de provincie wordt getoont. Om dit te krijgen heb ik een nieuwe json file aangemaakt, waarbij de key de namen van de provincies zijn. Wat ik nu moet doen is dat ik de data aan het menu worden gekoppeld, zodat ik de data van mijn map.json kan koppelen aan de gevisualiseerde map (dit ga ik maandag vragen).

Mijn doel voor dit weekend is om mijn site al zo mooi mogelijk te maken. Ik denk dat dit nu de beste keuze is, omdat ik nu met heel veel vragen over mijn dataset zit. Voor de types site voor dementia, wil ik mijn pie chart afmaken, die dan wel gelinked is aan een bar chart. Dit is niet mijn hoofdvisualisatiepagina, maar maakt wel mijn website mooi.

Voor het mooi maken van mijn website zal ik gebruik maken van bootstrap.

In de avonduren heb ik mijn website nog aangepast en een piechart voor mijn typesdementia pagina gemaakt. Op Alzheimerworldwide heb ik nog data gevonden over de prognose wereldwijd (2050), die ik wil gebruiken voor mijn introductie pagina.

__17/18-06-2019__
---
Zowel gisteren als vandaag heb ik geprobeerd om de data te verbinden met een dropdown menu en ook met radio buttons. Dit is helaas nog niet gelukt. Waar ik tegen aan loop is dat ik twee verschillende datasets heb, waarbij ik voor de map als voor de scatterplot apart de data moet doorzoeken naar de waarden. Ik kan daarbij de .on functie niet voor twee verschillende functies gebruiken.

Wat ik wel heb gedaan is twee lijngrafieken getekend, voor op de introductiepagina en op de dementianetherlands pagina. Deze grafiek is naar mijn mening goed gelukt. Wat mijn doel is voor de lijngrafiek op dementianetherlands, is dat deze een transition functie heeft. Als default zou ik graag de lijn voor Nederland als totaal willen hebben. Zodra er dan geklikt wordt op een provincie in de map, wordt de lijngrafiek geupdate naar de prognose voor de aangeklikte provincie (dit is de planning voor morgen).

Mijn doelen voor de aankomende dagen:
- De data verbinden aan de keuzes en daarbij dus aan de grafieken.
- De data bij elke klik updaten.
- De svg's op de goede plek zetten.

__19-06-2019__
---
De svg's op de goede plek zitten is gelukt voor de pagina dementianetherlands. De dropdown voor de jaren is gekoppeld aan de map en aan de scatterplot.

__20-06-2019__
---
De link tussen de map en de lijngrafiek op de dementianetherlands pagina is bijna gelukt. Er is nog wel wat verwarring welke class ik moet updaten. Eerst kreeg ik allemaal nieuwe grafieken onder elkaar, wat niet de bedoeling was. De fout zit ergens verstopt, maar denk dat als ik deze heb gevonden dat de linegrafiek wel gaat updaten.

Om het updaten uit te proberen, ben ik nu begonnen om de lijngrafiek op de introductiepagina te veranderen door middel van een radiobutton. Dit is ook bijna gelukt. Ik ga hier nog mee oefenen om zo door te krijgen welke ik moet aanpassen.

Daarnaast moest ik nogmaals mijn data veranderen vandaag, omdat ik ook een pie chart moet maken die update. Mijn plan was om dit ook voor zowel mannen als vrouwen te doen, waaronder ook totaal daarvan. Echter heb ik vandaag met Nigel overlegd dat dit helaas niet mogelijk is, naar aanleiding van mijn hoeveelheid aan data en de keuzes die de gebruiker kan maken op de website. Daarom heb ik na overleg besloten om de piechart te baseren op het totaal aantal gesloten/lopende DBC's en het totaal mannen en vrouwen. Met deze data ga ik een pie chart maken voor leeftijdscategorie verdeling, waarbij de default voor heel Nederland laat zien. Als er dan geklikt wordt op een provincie, is het de bedoeling dat de pie chart verandert.

Mijn doel in het weekend is om de website en alle grafieken ook mooier te maken.

__21-06-2019__
---
De update van mijn linechart is gelukkig gelukt. Ik had vandaag met meerdere assistenten gezeten, maar zij wisten niet hoe het moest (want ik heb heel veel events bij mijn linechart). Na veel uitproberen is het mij gelukt, zodat als ik nu op een provincie klik in de map, de lijn en de assen verandert. Echter lukt dit nog niet voor de circles die aan de lijn verbonden zijn. Ik ga dit weekend proberen om de circles ook nog te updaten.

Wat nog niet gelukt is, is het maken van de verschillende dropdown menus bij de bijhorende radiobuttons. Hopelijk kan ik dit maandag met iemand bespreken. Als dit gelukt is kan ik alle data updaten.

Daarnaast heb ik een pie chart gemaakt, alleen voor NL (want dat ik mijn default). De update moet nog gemaakt worden voor zowel het dropdownmenu jaren en als je dan op de provincie klikt op de kaart. In het weekend ga ik dit maken. 
