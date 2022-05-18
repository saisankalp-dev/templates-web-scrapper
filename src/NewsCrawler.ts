import axios from "axios"
import cheerio from "cheerio"

interface INewsCrawler {
    getNewsArticlesFromWebsite(website: string): Promise<Article[]>
}

interface Article {
    headline: string
    date: string
    description: string
}

class NewsCrawler implements INewsCrawler {
    seedLinks: string[] = [
        "https://economictimes.indiatimes.com/markets",
        "https://www.moneycontrol.com/news/india/",
        "https://www.financialexpress.com/market/",
        "https://www.livemint.com/market/stock-market-news"
    ]
    ticker: string = "zomato"
    maxDepth: number = 100

    async getNewsArticlesFromWebsite(website: string): Promise<Article[]> {
        let res = await axios.get<string>(website)
        let $ = cheerio.load(res.data)
        let headings = $('.eachStory').toArray().map(story => {
            return {
                headline: $(story).find("h3 > a").text(),
                date: $(story).find("time").attr('data-time') ?? "",
                description: $(story).find("p").text()
            }
        })
        return headings
    }
}

export { INewsCrawler, NewsCrawler }