# Design document

Name: Sophie Schubert
Student number: 10699988

__Data Sources for each data page__
---

*Introduction*

- https://www.alzheimer-nederland.nl/sites/default/files/directupload/factsheet-dementie-per-gemeente.pdf

  In this fact sheet you will find data about the number of people with dementia in the Netherlands.

  The data gives an indication of the number of people with dementia in 2018.
  Based on predictions of future population structure, there is also a forecast
  made of the number of people with dementia in the future.

  This clearly demonstrates the importance of understanding about dementia.

*Types of Dementia*

A list of all the data sources used for the final project:

- https://www.hersenstichting.nl/alles-over-hersenen/hersenaandoeningen/dementie

  This site contains information about the different types of dementia and how often each type occurs (in percentages).

  However, this is not yet usable as a dataset, so I insert the data myself as a CSV file. Later I will make a JSON file from this CSV file, where the type can be used as a key.

  This dataset can be used for the pie chart. If the mouse is hovered over the pie chart, the number of percentages will be displayed.

A list of all the data sources used for the final project:

*Dementia in the Netherlands*

A list of all the data sources used for the final project:

- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/81622NED/table?ts=1559733412438

  This data represents the DTC's GGZ care programs per province. The number of dementia cases for current DBCs and closed DTCs are displayed. DTC stands for Diagnosis Treatment Combination (2009 - 2016)

  Two columns are shown, namely:
    - the number of primary dementia diagnoses and
    - the care programs per 100,000 inhabitants.

  This dataset will be used for the map, whereby the column with care programs
  per 100,000 inhabitants is chosen.

  A distinction is made between total men and women and men and women separately

  If the mouse is used to hover over the provinces, the number of primary dementia diagnosis will be shown in an information bar (the data from the first column)

  Usage: The download is a CSV file which I convert to a JSON file with the provinces as object.

  Interactive
    - The user can switch between the years (2009 - 2016)
    - The user can also switch between:
      - Total men and women
      - Only men
      - Only women


- https://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=7233&D1=421-424&D2=0&D3=0&D4=13-20&HDR=G2%2cG1%2cG3&STB=T&VW=D

  This dataset shows the number of deceased dementia patients for the Netherlands for the years 2009 to 2016.

  The data set shows that the number is increasing.
  The dataset can be downloaded as a CSV file with which I make a JSON file.

- https://www.alzheimer-nederland.nl/sites/default/files/directupload/factsheet-dementie-per-gemeente.pdf

  In this fact sheet you will find figures about the number of people with dementia in the provinces. A prognosis is given up to the year 2050.

  This is not downloadable, so I made a CSV file with the data myself.

__Technical components__
---

*Introduction*

Components | Description | Implementation
---------- | ----------- | --------------
Multiple layered pie chart|On the introduction page a multilayered pie chart will be shown, with the year 2018 in the middle and 2050 in the outer layer. The number of cases of dementia will be shown |The dataset about the prognosis is required. The variables are the years and the number of dementia patients.

*Types of dementia*

Components | Description | Implementation
---------- | ----------- | --------------
Pie chart | On this page, a pie chart will be shown with the different types of dementia and the percentages | The dataset about the different kind of dementia types is needed. The variables are the percentages for each type and the type names
Optional: bar chart | A bar chart can also be shown on this page, which provides information on what age dementia can occur. Maybe good to do this by type. |A dataset about ages vs dementia is needed. Thereby look for specific types.

*Dementia in the Netherlands*

Components | Description | Implementation
---------- | ----------- | --------------
Data map | A map of the Netherlands on which all the provinces are shown with different colors. It also has a click function for the provinces. When a province is clicked on, another visualization will update| For the data map we need a map of the provinces of the Netherlands. Thereby, the dataset for the prevalence of dementia for each province is needed.
Scatterplot | This visualization updates with the click function of the data map. If a province is clicked on, one dot of this scatterplot will become bigger. On the y axis is aging and the prevalence of dementia on the x axis for each province | For this visualization, the same dataset is needed, but combined with another dataset with aging (65 + and 80+).
Two bar graphs | These visualization will update when clicked on provinces. On one bar graph, aging is being shown for each province and the prevalence. On the other bar graph, men vs women will be shown for each province. | The first dataset can be used.

__Plug ins__
---
- D3 data maps
- Color schemes derived from Color Brewer
- D3-tip
