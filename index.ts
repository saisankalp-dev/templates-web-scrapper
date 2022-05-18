import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { NewsCrawler } from './src/NewsCrawler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async(req: Request, res: Response) => {
  let newsCrawler = new NewsCrawler()
  let news = await newsCrawler.getNewsArticlesFromWebsite("https://economictimes.indiatimes.com/markets/stocks/news")
  res.send({headings:news});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});