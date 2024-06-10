import pandas as pd

def convert_csv_to_json(csv_file_path, json_file_path):
    # Read the CSV file
    df = pd.read_csv(csv_file_path)
    
    # Convert to JSON and save
    df.to_json(json_file_path, orient='records', lines=True)

# Convert specific files using direct paths
convert_csv_to_json('cypress/fixtures/users.csv', 'cypress/fixtures/users.json')
convert_csv_to_json('cypress/fixtures/companies.csv', 'cypress/fixtures/companies.json')