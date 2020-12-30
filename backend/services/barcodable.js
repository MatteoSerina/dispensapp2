const axios = require('axios');

async function getGoodDetails(barcode) {
    const baseUrl = 'https://api.barcodable.com/api/v1/ean/';
    const notFoundResult = { "status": "not_found", "imageUrl": "", "description": "" };

    try {
        let res = await axios.get(baseUrl.concat(barcode));
        if (res.status !== 200 || res.data === undefined || res.data.status !== 200) {
            return notFoundResult
        }
        return {
            "status": "found",
            "imageUrl": res.data.item.matched_items[0].images[0],
            "description": res.data.item.matched_items[0].description.replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\x00-\x7F]/g, "").replace(/\s{2,}/g, ' ').trim()
        };
    } catch (error) {
        return notFoundResult
    }
}

exports.getGoodDetails = getGoodDetails;