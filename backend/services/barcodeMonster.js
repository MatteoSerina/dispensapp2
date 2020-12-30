const axios = require('axios');

async function getGoodDetails(barcode) {
    const baseUrl = 'https://barcode.monster/api/';
    const notFoundResult = { "status": "not_found", "imageUrl": "", "description": "" };

    try {
        let res = await axios.get(baseUrl.concat(barcode));
        if (res.status !== 200 || res.data === undefined || res.data.status !== 'active') {
            return notFoundResult
        }
        return {
            "status": "found",
            "imageUrl": res.data.image_url,
            "description": res.data.description.replace(" (from barcode.monster)", "").replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\x00-\x7F]/g, "").replace(/\s{2,}/g, ' ').trim()
        };
    } catch (error) {
        return notFoundResult
    }
}

exports.getGoodDetails = getGoodDetails;