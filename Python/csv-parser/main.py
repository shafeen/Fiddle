import csv

CSV_FILENAME = 'sample.csv'
csvfile = open(CSV_FILENAME, 'rb')
reader = csv.reader(csvfile, delimiter=',', quotechar='|')
for i, row in enumerate(reader):
    columns = [col for col in row]
    # perform whatever logic you want here
    print ','.join(row)
