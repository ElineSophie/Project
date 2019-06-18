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
            if el["name"] == row.Provincie:
                bestaat_al = True
        if bestaat_al:
            # Toevoegen aan values
            json_doc["values"].append(row.to_dict())
            # lege_lijst.append(json_doc)
        else:
            # maak values aan en voeg x en y toe
            json_doc = {}
            json_doc["name"] = row['Provincie']
            json_doc["values"] = []
            json_doc["values"].append(row.to_dict())

            lege_lijst.append(json_doc)

    out = json.dumps(lege_lijst)

    jsonfile = open(outfile, "w")
    print(out)
    jsonfile.write(out)


if __name__ == "__main__":
    convertion("prognose.csv", "prognose.json")
