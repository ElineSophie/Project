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
