import scrapy
from scrapy_splash import SplashRequest

script = """
function main(splash, args)
    splash.private_mode_enabled = false
    splash.indexeddb_enabled = true
    assert(splash:go(args.url))
    assert(splash:wait(0.5))
    return {
        html = splash:html()
    }
end
"""


class QuotesSpider(scrapy.Spider):
    name = "quotes_splash"

    def start_requests(self):
        urls = [
            'http://quotes.toscrape.com/page/1/',
            'http://quotes.toscrape.com/page/2/',
        ]
        for url in urls:
            yield SplashRequest(
                url=url,
                callback=self.parse,
                endpoint='execute',
                args={
                    'lua_source': script,
                }
            )

    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').extract_first(),
                'author': quote.css('small.author::text').extract_first(),
                'tags': quote.css('div.tags a.tag::text').extract(),
            }