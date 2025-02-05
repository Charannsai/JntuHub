import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const urls = [
  {
    url: 'https://www.jntuh.ac.in/',
    category: 'general'
  },
  {
    url: 'https://en.wikipedia.org/wiki/Jawaharlal_Nehru_Technological_University,_Hyderabad',
    category: 'general'
  }
];

async function scrapeUrl(url, category) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // Remove unwanted elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('footer').remove();
    $('header').remove();
    
    // Extract relevant text content
    const mainContent = $('main, article, .content, #content, #main').text() || $('body').text();
    const cleanContent = mainContent
      .replace(/\s+/g, ' ')
      .trim();
    
    // Store in database
    const { error } = await supabase
      .from('jntuh_data')
      .insert([
        {
          source: url,
          content: cleanContent,
          category: category
        }
      ]);
    
    if (error) {
      console.error(`Error storing data from ${url}:`, error);
    } else {
      console.log(`Successfully scraped and stored data from ${url}`);
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Starting web scraping...');
  
  for (const { url, category } of urls) {
    console.log(`Scraping ${url}...`);
    await scrapeUrl(url, category);
  }
  
  console.log('Web scraping completed!');
}

main().catch(console.error);