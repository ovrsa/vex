import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeEvents = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        console.log(data.slice(0, 500)); // 最初の500文字をコンソールに出力

        const $ = cheerio.load(data);
        // ここでスクレイピングのロジックを実装

        // 今回はHTMLデータの確認のみなので、空の配列を返します
        return [];
    } catch (error) {
        console.error(`Error during data fetching: ${error}`);
        return [];
    }
};