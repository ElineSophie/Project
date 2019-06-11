import pandas as pd


def dataframe():
    data = pd.read_csv("types.csv", sep=';')

    df = data[["Type", "Prevalence", "Female", "Male"]]

    df.set_index("Type", inplace=True)

    return df


def clean_up(dataframe):
    dataframe["Prevalence"] = dataframe["Prevalence"].str.replace(",",".").astype(float)
    dataframe["Female"] = dataframe["Female"].str.replace(",",".").astype(float)
    dataframe["Male"] = dataframe["Male"].str.replace(",",".").astype(float)

    return dataframe


if __name__ == "__main__":
    # Load in CSV file and save
    dataframe = dataframe()

    # Clean up dataframe and save
    cleaned = clean_up(dataframe)

    # Write cleaned data to JSON file
    cleaned.to_json("types.json", orient="index")
