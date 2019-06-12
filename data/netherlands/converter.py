import pandas as pd
import json
from collections import defaultdict


def convertion(infile, outfile):
    """
    This function will write the csv file to a nested json file,
    with years as key.
    """

    df = pd.read_csv(infile, sep=';')

    json_doc = defaultdict(list)

    for index, row in df.iterrows():
        json_doc[row['Perioden']].append(row.to_dict())

    out = json.dumps(json_doc)

    jsonfile = open(outfile, "w")
    jsonfile.write(out)


if __name__ == "__main__":
    convertion("datanetherlands.csv", "datanetherlands.json")
