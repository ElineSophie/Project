import pandas as pd
import json
from collections import defaultdict

df = pd.read_csv("datanetherlands.csv", sep=';')

json_doc = defaultdict(list)
print(json_doc)

for _id in df.T:
    data = df.T[_id]
    key = data.Perioden
    print(data.Regios)
    for elt in json_doc[key]:
        if elt["Perioden"] == data.Periode:
            print("hoi")
        print(values)
        json_doc[key].append(values)

print(json.dumps(json_doc, indent=4))



# print(data)
#
# df = data.loc[data["Perioden"] == 2009]
# print(df)
# year = []
# for row in data.iterrows():
#     # print(data.Perioden)
#     if not row.Perioden in year:
#         year.append(row.Perioden)
#
#
# print(year)
    # print(row)
    # if data.loc[data["Perioden"] == 2009]:
    #     print(row)
    # for i in row:
    #     print(row[i])
    #     input()


# def get_nested_rec(key):
#     rec = {}
#     rec["﻿Perioden"] = key[0]
#     rec["Regio's"] = key[1]
#     rec["Totaal aantal lopend"] = key[2]
#     rec["Tot per 100.000 inwoners lopend"] = key[3]
#
#     return rec
#
#
# records = []
# for key in data.groupby(["﻿Perioden", "Regio's", "Totaal aantal lopend", "Tot per 100.000 inwoners lopend"]):
#     rec = get_nested_rec(key)
#     records.append(rec)
#
# records = dict(data = records)
#
#
# print(json.dumps(records, indent=4))

# def dataframe():
#     """
#     Output a dataframe from a CSV file containing the data per
#     specific columns
#     """
#     # Load in dataframe with missing values
#     data = pd.read_csv("datanetherlands.csv", sep=';')
#
#     df = data[["﻿Perioden", "Regio's", "Totaal aantal lopend", "Tot per 100.000 inwoners lopend", "Totaal aantal gesloten",
#     	"Tot per 100.000 inwoners gesloten", "Totaal aantal mannen lopend", "Tot per 100.000 inwoners mannen lopend",
#         "Totaal aantal mannen gesloten","Tot per 100.000 inwoners mannen gesloten",
#         "Totaal aantal vrouwen lopend", "Tot per 100.000 inwoners vrouwen lopend",
#         "Totaal aantal vrouwen gesloten", "Tot per 100.000 inwoners vrouwen gesloten",
#         "Tot lopend 0-20","Tot per 100.000 inwoners lopend 0-20", "Tot gesloten 0-20",
#         "Tot per 100.000 inwoners gesloten 0-20","Tot lopend 20-40","Tot per 100.000 inwoners lopend 20-40",
#         "Tot gesloten 20-40", "Tot per 100.000 inwoners gesloten 20-40", "Tot lopend 40-60",
#         "Tot per 100.000 inwoners lopend 40-60","Tot gesloten 40-60", "Tot per 100.000 inwoners gesloten 40-60",
#         "Tot lopend 60-80", "Tot per 100.000 inwoners lopend 60-80" "Tot gesloten 60-80",
#         "Tot per 100.000 inwoners gesloten 60-80", "Tot lopend 80-ouder","Tot per 100.000 inwoners lopend 80-ouder"
#         "Tot gesloten 80-ouder", "Tot per 100.000 inwoners gesloten 80-ouder", "Tot lopend mannen 0-20",
#         "Tot per 100.000 inwoners lopend mannen 0-20","Tot gesloten mannen 0-20","Tot per 100.000 inwoners gesloten mannen 0-20"
#         "Tot lopend mannen 20-40","Tot per 100.000 inwoners lopend mannen 20-40","Tot gesloten mannen 20-40",
#         "Tot per 100.000 inwoners gesloten mannen 20-40","Tot lopend mannen 40-60",
#         "Tot per 100.000 inwoners lopend mannen 40-60","Tot gesloten mannen 40-60",
#         "Tot per 100.000 inwoners gesloten mannen 40-60",
#         "Tot lopend mannen 60-80","Tot per 100.000 inwoners lopend mannen 60-80","Tot gesloten mannen 60-80",
#         "Tot per 100.000 inwoners gesloten mannen 60-80","Tot lopend mannen 80-ouder",
#         "Tot per 100.000 inwoners lopend mannen 80-ouder","Tot gesloten mannen 80-ouder",
#         "Tot per 100.000 inwoners gesloten mannen 80-ouder","Tot lopend vrouwen 0-20",
#         "Tot per 100.000 inwoners lopend vrouwen 0-20",	"Tot gesloten vrouwen 0-20",
#         "Tot per 100.000 inwoners gesloten vrouwen 0-20","Tot lopend vrouwen 20-40",
#         "Tot per 100.000 inwoners lopend vrouwen 20-40","Tot gesloten vrouwen 20-40",
#         "Tot per 100.000 inwoners gesloten vrouwen 20-40",	"Tot lopend vrouwen 40-60",
#         "Tot per 100.000 inwoners lopend vrouwen 40-60","Tot gesloten vrouwen 40-60",
#         "Tot per 100.000 inwoners gesloten vrouwen 40-60","Tot lopend vrouwen 60-80",
#         "Tot per 100.000 inwoners lopend vrouwen 60-80","Tot gesloten vrouwen 60-80",
#         "Tot per 100.000 inwoners gesloten vrouwen 60-80","Tot lopend vrouwen 80-ouder",
#         "Tot per 100.000 inwoners lopend vrouwen 80-ouder",	"Tot gesloten vrouwen 80-ouder",
#         "Tot per 100.000 inwoners gesloten vrouwen 80-ouder","65+ totaal", "80+ totaal",
#         "65+ mannen","80+ mannen", "65+ vrouwen","80+ vrouwen"]]
#
#     df.set_index("ISO", inplace=True)
#
#     # Return dataframe
#     return df
#
#
# def clean_up(dataframe):
#     """
#     Function for cleaning up the dataframe. String are being removed
#     and replaced by floats. Rows with missing values are removed and
#     rows with outstanding values that are not representative are also
#     deleted.
#     """
#     # Remove the strings and replace
#
# if __name__ == "__main__":
#     # Load in CSV file and save
#     dataframe = dataframe()
#
#
#     # Write cleaned data to JSON file
#     cleaned.to_json("HPI_data.json", orient="index")
