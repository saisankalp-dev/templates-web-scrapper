"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsCrawler = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class NewsCrawler {
    constructor() {
        this.seedLinks = [
            "https://economictimes.indiatimes.com/markets",
            "https://www.moneycontrol.com/news/india/",
            "https://www.financialexpress.com/market/",
            "https://www.livemint.com/market/stock-market-news"
        ];
        this.ticker = "zomato";
        this.maxDepth = 100;
    }
    getNewsArticlesFromWebsite(website) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield axios_1.default.get(website);
            let $ = cheerio_1.default.load(res.data);
            let headings = $('.eachStory').toArray().map(story => {
                var _a;
                return {
                    headline: $(story).find("h3 > a").text(),
                    date: (_a = $(story).find("time").attr('data-time')) !== null && _a !== void 0 ? _a : "",
                    description: $(story).find("p").text()
                };
            });
            return headings;
        });
    }
}
exports.NewsCrawler = NewsCrawler;
