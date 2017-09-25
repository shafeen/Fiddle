import os

import boto3
from datetime import datetime

import requests

API_ENDPOINT = 'https://www.alphavantage.co/query'
API_KEY = os.environ['alphavantage_apikey']

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
    summaryMsg = symbol+' '+diffStr+' '+lastWeekClosingPrices.__str__()
    print summaryMsg
    return summaryMsg


def send_sns_message(subject, message, sns_topic_region, sns_topic_arn):
    # remember to set the default region, and aws access
    # keys and secrets beforehand (use AWS CLI)
    client = boto3.client('sns', region_name=sns_topic_region)
    client.publish(
        TopicArn=sns_topic_arn,
        Message=message,
        Subject=subject,
    )


def lambda_handler(event, context):
    stockSymbols = os.environ['symbols'].split(',')
    lastWeekStockSummaries = 'Last week\'s stock performance:'
    for symbol in stockSymbols:
        lastWeekStockSummaries += '\n'+ get_last_week_closing_prices(symbol)

    sns_topic_region = os.environ['sns_topic_region']
    sns_topic_arn = os.environ['sns_topic_arn']
    send_sns_message(
        'Last week\'s stock performance',
        lastWeekStockSummaries,
        sns_topic_region,
        sns_topic_arn
    )


# lambda_handler('test', 'test')
# send_sns_message('test1', 'testmessage here')
