import axios from 'axios';
import cheerio from 'cheerio';

async function pasteBin(url) {
    if (!url || typeof url !== 'string' || !url.startsWith('https://pastebin.com/')) {
        return 'URL tidak valid. Mohon berikan URL Pastebin yang valid.';
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const pasteTitle = $('div.info-top h1').text().trim() || 'Judul tidak ditemukan';
        const rawLink = $('a[href^="/raw"]').attr('href');
        const downloadLink = $('a[href^="/dl"]').attr('href');

        const codeContent = [];
        $('.source.text ol li').each((i, el) => {
            codeContent.push($(el).text().trim());
        });

        const username = $('div.username a').text().trim() || 'Username tidak ditemukan';
        const datePosted = $('div.date span').text().trim() || 'Tanggal tidak ditemukan';
        const pasteViews = $('div.visits').text().trim() || 'Jumlah tampilan tidak ditemukan';

        return {
            creator: { nama: 'YannXD', website: 'https://yannapi.vercel.app/' },
            title: pasteTitle,
            rawLink: rawLink ? https://pastebin.com${rawLink} : 'Link raw tidak ditemukan',
            downloadLink: downloadLink ? https://pastebin.com${downloadLink} : 'Link unduh tidak ditemukan',
            content: codeContent.length ? codeContent.join('\n') : 'Konten kode tidak ditemukan',
            datePosted,
            username,
            viewCount: pasteViews
        };
    } catch (error) {
        return 'Terjadi kesalahan saat scraping: ' + error.message;
    }
}


app.get('/convert/pastebin', async (req, res) => {
    try {
      const url = req.query.url;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
      }
      const response = await pasteBin(url);
      res.status(200).json({
        status: 200,
        creator: "YannXD",
        data: { pasteTitle }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
