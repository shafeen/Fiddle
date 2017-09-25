from googlefinance.client import get_price_data, get_closing_data
# REQUIRES:
# datetime requests pandas pytz zope.interface certifi idna
# chardet urllib3 python-dateutil numpy setuptools six


# single stock example
def print_single_stock():
    param = {
        'q': "VGHCX",  # Stock symbol (ex: "AAPL")
        'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
        'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
        'p': "1M"  # Period (Ex: "1Y" = 1 year)
    }

    # get price data (return pandas dataframe)
    df = get_price_data(param)
    print(df[-5:])


# multiple stocks example
def print_multiple_stocks():
    params = [
        {
            'q': "VWIAX",  # Stock symbol (ex: "AAPL")
            'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
            'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
            'p': "1M"  # Period (Ex: "1Y" = 1 year)
        },
        {
            'q': "VWEHX",  # Stock symbol (ex: "AAPL")
            'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
            'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
            'p': "1M"  # Period (Ex: "1Y" = 1 year)
        },
        {
            'q': "VQNPX",  # Stock symbol (ex: "AAPL")
            'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
            'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
            'p': "1M"  # Period (Ex: "1Y" = 1 year)
        },
        {
            'q': "VGHCX",  # Stock symbol (ex: "AAPL")
            'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
            'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
            'p': "1M"  # Period (Ex: "1Y" = 1 year)
        },
        {
            'q': "VBIIX",  # Stock symbol (ex: "AAPL")
            'i': "86400",  # Interval size in seconds ("86400" = 1 day intervals)
            'x': "MUTF",  # Stock exchange symbol on which stock is traded (ex: "NASD")
            'p': "1M"  # Period (Ex: "1Y" = 1 year)
        }
    ]
    # get closing price data (return pandas dataframe)
    df = get_closing_data(params, '1Y')
    print(df[-5:])
