import csv
import json


def convertion(infile, outfile):
    # Open CSV file
    csvfile = open(infile, 'r')

    # Change appropriate filednames
    fieldnames = ("Provincie", "2018", "2020", "2025", "2030", "2035", "2040", "2050")
    reader = csv.DictReader( csvfile, delimiter=";")
    out = json.dumps( [ row for row in reader ] )

    # Save as JSON file
    jsonfile = open(outfile, 'w')
    jsonfile.write(out)

if __name__ == "__main__":
    convertion("prognoseprovincies.csv", "prognoseprovincies.json")
