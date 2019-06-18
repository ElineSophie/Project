import pandas as pd
import json
import csv
from collections import defaultdict


import pandas as pd
import json


# df = pd.read_csv('globalprevalence.csv')
#
# with open('globalprevalence.json', 'w') as outfile:
#
#     outfile.write(df.set_index("label").to_json(orient='table'))

def convertion(infile, outfile):
    """
    This function will write the csv file to a nested json file.
    """

    df = pd.read_csv(infile, sep=';')

#     print(df.to_dict("dict"))

    lege_lijst = []

    for index, row in df.iterrows():
        bestaat_al = False
        for el in lege_lijst:
            if el["name"] == row.label:
                bestaat_al = True
        if bestaat_al:
            # Toevoegen aan values
            json_doc["values"].append(row.to_dict())
            # lege_lijst.append(json_doc)
        else:
            # maak values aan en voeg x en y toe
            json_doc = {}
            json_doc["name"] = row['label']
            json_doc["values"] = []
            json_doc["values"].append(row.to_dict())

            lege_lijst.append(json_doc)
        # for row in lege_lijst:
        #     print(row["name"])
        # print(row)
        # json_doc = {}
        # json_doc["name"] = row['label']
        # json_doc['values'] = []
        #
        # for el in json_doc:
        #     if json_doc["name"]:
        #         json_doc['values'].append(row.to_dict())
            # else:
        # print(lege_lijst)
        # input()


        # json_doc['values'] = []
        # json_doc['values'].append(row.to_dict())
        # lege_lijst.append(json_doc)


        # if not (row["label"]) in lege_lijst:
        #
        #     json_doc['values'] = []
        #     print(json_doc)
        # # else:

        # else:
        # json_doc["values"].append(row.to_dict())
        # lege_lijst.append(json_doc)

        #     json_doc = {}
        #     json_doc["name"] = row['label']
        #     json_doc['values'] = []
        # json_doc['values'].append(row.to_dict())
        # lege_lijst.append(json_doc)

    out = json.dumps(lege_lijst)

    jsonfile = open(outfile, "w")
    print(out)
    jsonfile.write(out)


if __name__ == "__main__":
    convertion("globalprevalence.csv", "globalprevalence.json")
