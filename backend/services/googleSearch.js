const imageSearch = require('image-search-google');
const config = require('../config');

async function getGoodDetails(barcode) {
    const notFoundResult = { "status": "not_found", "imageUrl": "", "description": "" };
    const client = new imageSearch(config.googleCx, config.googleApiKey);
    const options = { num: 1, searchType: 'image', };

    try {
        const res = await client.search(barcode, options);
        //item.imageUrl = images[0].url;
        if (res === undefined || res[0] === undefined) {
            return notFoundResult
        }
        return {
            "status": "found",
            "imageUrl": res[0].url,
            "description": res[0].snippet.replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\x00-\x7F]/g, "").replace(/\s{2,}/g, ' ').trim()
        };
    } catch (error) {
        return notFoundResult
    }
}

exports.getGoodDetails = getGoodDetails;