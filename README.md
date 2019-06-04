# Programming Project - Number of dementia cases in the Netherlands

Github Link: https://ElineSophie.github.io/Project/code/html/

The idea behind my project is on this page. This page is a template for what my page will look like.
If you click on the different nav-bars (types of dementia, dementia in the Netherlands, Migration background and dementia), a drawing / sketch will be shown of the page.

---

##### Name: Sophie Schubert
##### Course: Minor Programming
##### Student number: 10699988

---

__Goal of the project__
---
For this project of the programming minor, I will try to visualize the different kinds of dementia, the occurence of dementia 1996 vs 2018/2019 and compare this with various factors (aging, mental care, gender).

__Problem statement__
---
In the Netherlands, dementia is a major cause of death. The number of people with dementia in 2016 is estimated to be between 254,000 and 270,000 people (96,000 men and 185,000 women). The number of dementia is increasing within the Netherlands, with aging as the main reason. In addition, more women than men have or die of dementia, because women tend to live longer than men. With the right visualizations, information can be provided about these assumptions and about the occurence of the disease.

__Solution__
---
It is importent that a good overview is provided that gains insight into the disease. In this final project, multiple visualizations will be made that will give insight into different aspects of the disease.

**Different types of dementia and prevalence**

Often, people will think of Alzheimer's disease when hearing about dementia. However, there are different types of dementia.Therefore, to gain insight in the different kind of dementia, a pie chart will be given.

*Main features*
- Pie chart with Alzheimer's disease, Lewy body dementia, Frontotemporale dementie (FTD), Korsakov, Creutsfeldt-Jakob, Parkinson, Posterieure coritcale Atrofie(PCA), Mild Cognitive Impairment (MCI) en ziekte van Pick.
- When there is a mouse over, the user can see the % of prevalence.

*Optional features*
- If a disease is clicked within the pie chart, an explanation will be given about the type of dementia.

**Dementia mortality per GGD region**

The lowest mortality rate from dementia is recorded in Zeeland and the North-East Gelderland region. In the middle and south of the Netherlands, the mortality is high.

*Main features*
- A map of the Netherlands. If the user is going with the mouse over different regions, the mortality rate between 2013-2016 will be given.
- At the bottom of the visualization, a button will be given that the user can click to see another visualization on the same page (see deeper knowledge per region)

**Deeper knowledge per region**

Another visualization will be obtained with different data, which shows the prevalence of dementia/dementia mortality per region (no GGD region, these are more regions).

*Main features*
- A map of the Netherlands.
- A scatterplot with on the y-axis aging (65+/80) and on the x-axis dementia rate.
- If nothing is clicked yet, a scatter plot of the total number of dementia will be seen against the total number of aging (in the Netherlands).
- If a region is clicked, a circle within the scatterplot will popping out of the scatterplot (will become bigger) and give the dementia rate.
- A bar will be provided at the bottom on the visualizations where the user can choose a year (1996 - 2017).

*Optional features*
- Men vs women as information about the circles in the scatterplot (instead of the next visualization).

**Information about gender vs. dementia**

Dementia becomes more common as we age and women tend to live longer than men. Therefore, more women develop the condition.

*Main features*
- A bar chart with two bars: men vs women.
- A line chart with on the x axis age (65 - 95/older) and on the y axis percentage dementia rate, with a legend women vs. men.

*Optional features*
- For the line chart an dropdown menu where the user can choose a year.

**Optional**
Low-educated people seem to live less long compared to higher-educated people. It is interesting to look at the dementia rates by education level and compare this with life expectancy.
On the other hand, it is also interesting to look at migration backgrounds vs. dementia in the Netherlands.

__Prerequisites__
---

**Data sources**
- __[Volksgezondheidszorg](https://www.volksgezondheidenzorg.info/onderwerp/dementie/regionaal-internationaal/regionaal)__ - Mortality rates per GGD-region.
- __[Statlines](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/81622NED/table?ts=1558456507938)__ - Dementia rates in different regions within the Netherlands.
- __[Volksgezondheidszorg](https://www.volksgezondheidenzorg.info/onderwerp/dementie/cijfers-context/huidige-situatie#node-prevalentie-naar-leeftijd)__- Prevalence by age (men vs women) of dementia.
- __[Volksgezondheidszorg](https://www.volksgezondheidenzorg.info/onderwerp/levensverwachting/cijfers-context/huidige-situatie#node-levensverwachting-op-65-jaar-naar-opleiding)__- Life expectancy rates by education level.
- __[Statlines](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83710NED/table?ts=1558456481790)__ - Data for migration backgrounds and dementia rates.

**External components**
- d3-tip

**Hardest part**
- Making the data map with the regions where data is
