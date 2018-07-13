import 'whatwg-fetch';
import convert from 'xml-js';
import { isArrayLike } from 'mobx';

const APIKEY = process.env.REACT_APP_GOODREADS_APIKEY;
const API_ENDPOINT =
    'https://cors-anywhere.herokuapp.com/https://www.goodreads.com';

export async function searchBooks(term) {
    const json = await getJSONResponse(
        `${API_ENDPOINT}/search/index.xml?key=${APIKEY}&q=${term}`,
    );

    const { 'total-results': total } = json.search;
    const innerResults = json.search.results.work;

    const results = isArrayLike(innerResults)
        ? innerResults.map(asBook)
        : innerResults
            ? [asBook(innerResults)]
            : [];

    return {
        total: parseInt(total._text, 10),
        items: results,
    };
}

function asBook(json) {
    const {
        id,
        best_book: {
            author: { name: authorName },
            image_url: imageUrl,
            small_image_url: smallImageUrl,
            title,
        },
        average_rating: rating,
        ratings_count: totalRatings,
        original_publication_day: pubDay,
        original_publication_month: pubMonth,
        original_publication_year: pubYear,
    } = json;

    return {
        id: id._text,
        rating: parseFloat(rating._text, 10),
        totalRatings: parseFloat(totalRatings._text, 10),
        author: authorName._text,
        image: imageUrl._text,
        smallImage: smallImageUrl._text,
        title: title._text,
        pubDate: new Date(
            parseInt(pubYear._text, 10),
            parseInt(pubMonth._text || '0', 10) - 1,
            parseInt(pubDay._text || '1', 10),
        ),
    };
}

async function getJSONResponse(url) {
    const results = await fetch(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    const data = await results.text();

    const json = convert.xml2js(data, {
        compact: true,
        ignoreDeclaration: true,
        ignoreDoctype: true,
        ignoreInstruction: true,
        ignoreComment: true,
        ignoreCdata: true,
    });

    return json.GoodreadsResponse;
}
