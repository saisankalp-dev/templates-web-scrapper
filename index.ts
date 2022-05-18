import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { NewsScrapper } from './src/NewsScrapper';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async(req: Request, res: Response) => {
  let newsScrapper = new NewsScrapper()
  let news = await newsScrapper.getNewsArticlesFromWebsite("https://economictimes.indiatimes.com/markets/stocks/news")
  res.send({headings:news});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});