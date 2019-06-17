import pandas as pd
import json
import csv
from collections import defaultdict


import pandas as pd
import json


df = pd.read_csv('globalprevalence.csv')

with open('globalprevalence.json', 'w') as outfile:

    outfile.write(df.set_index("label").to_json(orient='table'))

# def convertion(infile, outfile):
# #     """
# #     This function will write the csv file to a nested json file,
# #     with years as key.
# #     """
# #
#     df = pd.read_csv(infile, sep=';')
#
# #     print(df.to_dict("dict"))
#
#     json_doc = defaultdict(list)
#
#     for index, row in df.iterrows():
#         json_doc[row['label']].append(row.to_dict())
#
#     out = json.dumps(json_doc)
#
#     jsonfile = open(outfile, "w")
#     jsonfile.write(out)
#
#
# if __name__ == "__main__":
#     convertion("globalprevalence.csv", "globalprevalence.json")
