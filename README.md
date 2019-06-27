# Programming Project - A visualisation of dementia
Course: Programmeerproject  
Name: Sophie Schubert  
Student number: 10699988

## [Click here for the github website](https://ElineSophie.github.io/Project/)  

## Product Goal  
Dementia is a global problem. According to various prognoses, the number of dementia patients will increase to a large extent. For this increase, different reasons are given. One main reason is the aging population.
The idea for this project is to provide information about the disease and the impact worldwide. On the other hand, information will be given
about the rates of dementia in the Netherlands in relationship with aging population. The number of people with dementia are shown in a map of the Netherlands and also in a scatterplot, against aging rates. Thereby, a prognosis is given for each province till 2050.

## Website Walkthrough  
#### Homepage  
The website consists of a main homepage that shows the navigation bar at the top of the page, followed by the title of my project and information about my webpage and contactinfo, all projected on an image. The navigation bar contains the links to other pages of the website.
![](doc/homepage.png)  

#### Introduction page
This page consists also the same navigation bar as the homepage.
On the left of the website, a small introduction into my problem is given. The story begins generally, namely what the prognosis is for dementia worldwide. There are two line graphs that support the story. The usage for the two line graphs is described in short under the section *usage*. For both line graphs, it is shown that the number of people with dementia is rising for higher income countries and Europe. The Netherlands belongs under both the income countries en Europe category. This leads to the question what the impact of dementia is in the Netherlands.
The user can click on the visualisation page that covers up this question, however, the user can also click on the other visulisation page; namely types of dementia.
![](doc/introduction.PNG)

#### Visualisation page about the types of dementia
Also on this page, the same navigation bar is on the top of the site.
As in the introduction page, a small description is given on the left of the page about the types of dementia. This is supported by a pie chart in the middle of the page. Above the pie chart, there is a very short description under the section *usage* about the visualisation. Under this brief description, the data source is given.
![](doc/types.PNG)

#### Visualisation page about the Netherlands and dementia
Also on this page, the same navigation bar is on the top of the site.
This page is the most interesting page of the website. It contains all the data visualizations that covers the problem statement that was given at the introduction page. At the left, there is again a brief introduction supported by the visulisations.
Above the visualisations, a *usage* description is given about how to handle the visualisations and how the visualisations are connected to each other. Next to the usage section, there is a menu. In the menu, the user can make a choice which data is being shown in the map and scatterplot. The choices that the user can make are:
- Ongoing DTC (Diagnosis Treatment Combination) or closed DTC.
- Total men/women, only men or only women.
- For the gender choice: 65+ or 80+.
- The year (2009 - 2016).
- A reset button that will reload the page.
![](doc/explainandchoice.PNG)

The first visualisation is a map of the Netherlands showing provinces. The provinces are color coded (in blue) to the number of people with dementia per 100.000 inhabitants. A darker color of blue indicates a higher number of people per 100.000 inhabitants. The map holds a tooltip, where you can see the exact amount of this number when you hover over the provinces with your mouse. The map contains also a click function, which will update two other visualisations at the end of the page.
At the right side of the map, a scatterplot is being presented. On the x-axis of the scatterplot, the number of people with dementia per 100.000 inhabitants is given. The aging rate is on the y-axis. Also in this visualisatoin, the provinces are color coded (in blue) to the number of people with dementia per 100.000 inhabitants (with the same index as the map).
The dots hold a tooltip, where you can see the exact amount of people and the aging rate when you hover with your mouse over these dots. Clicking on the dots will update one of the two graphs at the end of the page.
![](doc/mapscatter.PNG)

When scrolling down at the page, two other visualisation are presented: a pie chart on the left and a line graph on the right.
The pie chart presents the age categories for total number of people with dementia (not per 100.000 but in total). When the user hasn't clicked on the map already, the default setting of the pie chart is for Netherland in total. Clicking on the map will update this view according to the province that is being clicked on. The different age categories are color coded (in blue), where 80 to older is the darker tone. While hovering over the parts of the chart, the exact number is given.
The line graph give information about the prognosis, with number of people with dementia on the y-axis and the years (2018 - 2050) on the x-axis. The default setting for this line is again the Netherlands. Hovering with the mouse over the line gives the user the name again (Netherlands as default). Hovering over the dots within the line give the exact number of the expected number of people for the year. When the user clicks on the map or one of the dots in the scatterplot, the line will change to the specific province that is being clicked on. The y-axis and the exact number will update with this click function.
![](doc/pieprog.PNG)  

All the visualisations together on a page with zoom-in 100% is not possible. To see all the visualisation on one page without scrolling to the right, left and below, it is necessary to zoom-out. This gives also a better view about the linked visualisations.
![](doc/AgingNetherlands.PNG)  

## Sources  
#### Data Sources  

#### Code Sources  

#### D3 Plugins  

#### Images

# Programming Project - Number of dementia cases in the Netherlands

Github Link: https://ElineSophie.github.io/Project/

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
