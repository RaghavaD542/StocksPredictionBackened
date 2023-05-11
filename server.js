import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import yahooFinance from 'yahoo-finance2';
const port = process.env.port | 5002;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function generateStockHTML(query) {
  const queryOptions = { modules: ['price', 'summaryDetail'] };
  var data = await yahooFinance.quoteSummary(query, queryOptions);
  return data;
}

async function generateTrending() {
  const queryOptions = { count: 6, lang: 'en-US' };
  const result = await yahooFinance.trendingSymbols('US', queryOptions);
  return result;
}

async function generateFrontPageData() {
  const trend = await generateTrending();
  // console.log(trend.quotes[0].symbol);
  const queryOptions = { modules: ['price', 'summaryDetail'] };
  var data1 = await yahooFinance.quoteSummary(
    trend.quotes[0].symbol,
    queryOptions
  );
  data1 = [
    data1.price.longName,
    data1.price.regularMarketPrice,
    data1.price.regularMarketChange,
    data1.price.regularMarketChangePercent,
    data1.price.symbol,
  ];
  var data2 = await yahooFinance.quoteSummary(
    trend.quotes[1].symbol,
    queryOptions
  );
  data2 = [
    data2.price.longName,
    data2.price.regularMarketPrice,
    data2.price.regularMarketChange,
    data2.price.regularMarketChangePercent,
    data2.price.symbol,
  ];
  var data3 = await yahooFinance.quoteSummary(
    trend.quotes[2].symbol,
    queryOptions
  );
  data3 = [
    data3.price.longName,
    data3.price.regularMarketPrice,
    data3.price.regularMarketChange,
    data3.price.regularMarketChangePercent,
    data3.price.symbol,
  ];
  var data4 = await yahooFinance.quoteSummary(
    trend.quotes[3].symbol,
    queryOptions
  );
  data4 = [
    data4.price.longName,
    data4.price.regularMarketPrice,
    data4.price.regularMarketChange,
    data4.price.regularMarketChangePercent,
    data4.price.symbol,
  ];
  var data5 = await yahooFinance.quoteSummary(
    trend.quotes[4].symbol,
    queryOptions
  );
  data5 = [
    data5.price.longName,
    data5.price.regularMarketPrice,
    data5.price.regularMarketChange,
    data5.price.regularMarketChangePercent,
    data5.price.symbol,
  ];
  var data6 = await yahooFinance.quoteSummary(
    trend.quotes[5].symbol,
    queryOptions
  );
  data6 = [
    data6.price.longName,
    data6.price.regularMarketPrice,
    data6.price.regularMarketChange,
    data6.price.regularMarketChangePercent,
    data6.price.symbol,
  ];
  return [data1, data2, data3, data4, data5, data6];
}

async function generateChartData(query) {
  const queryOptions = { period1: '2021-04-23', interval: '1d' /* ... */ };
  var chartdata = await yahooFinance._chart(query, queryOptions);
  return chartdata;
}

let ticker = '^NSEI';
app.post('/getTicker', (req, res) => {
  ticker = JSON.parse(req.body.body).data.name;
  console.log(ticker);
  res.send('Hello');
});
app.get('/getData', async (req, res) => {
  try {
    var data = await generateStockHTML(ticker);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.send('Could not found');
  }
});
app.get('/getFrontPageData', async (req, res) => {
  try {
    var frontPageData = await generateFrontPageData();
    res.json(frontPageData);
  } catch (e) {
    console.log(e);
    res.send('Could not found');
  }
});

app.get('/getChartData', async (req, res) => {
  try {
    var chartdata = await generateChartData(ticker);
    res.json(chartdata);
  } catch (e) {
    // console.log(e);
    res.send('Could not found');
  }
});

app.listen(port, () => {
  console.log('Server has started on port 5002');
});
