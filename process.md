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
