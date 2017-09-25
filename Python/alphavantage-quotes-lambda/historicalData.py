import os

from datetime import datetime

import requests

API_ENDPOINT = 'https://www.alphavantage.co/query'
API_KEY = os.environ['apikey']

def get_last_week_closing_prices(symbol):

    payload = {
        'function': 'TIME_SERIES_DAILY_ADJUSTED',
        'symbol': symbol,
        'apikey': API_KEY
    }

    todayStr = datetime.today().strftime("%Y-%m-%d")
    quoteData = requests.get(API_ENDPOINT, params=payload).json()
    quoteDates = quoteData['Time Series (Daily)'].keys()
    quoteDates.sort()

    lastWeek = quoteDates[-5:]

    lastWeekClosingPrices = [quoteData['Time Series (Daily)'][date]['4. close'] for date in lastWeek]
    lastWeekClosingPrices = list(map(lambda x: float(x), lastWeekClosingPrices))

    endOfWeekDiff = round((lastWeekClosingPrices[-1] - lastWeekClosingPrices[0])*100/lastWeekClosingPrices[0], 2)
    diffStr = '+'+str(endOfWeekDiff)+'%' if endOfWeekDiff >= 0 else str(endOfWeekDiff)+'%'
    print symbol, diffStr, lastWeekClosingPrices


def lambda_handler(event, context):
    stockSymbols = os.environ['symbols'].split(',')

    for symbol in stockSymbols:
        get_last_week_closing_prices(symbol)

# lambda_handler('test', 'test')