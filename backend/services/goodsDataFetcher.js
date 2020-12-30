const barcodeMonster = require('./barcodeMonster');
const barcodable = require('./barcodable');
const googleSearch = require('./googleSearch');


async function getGoodsData(barcode) {
    const res = await Promise.all([
        barcodeMonster.getGoodDetails(barcode),
        barcodable.getGoodDetails(barcode),
        googleSearch.getGoodDetails(barcode)])
    for (let i = 0; i < res.length; i++) {
        if (res[i].status === 'found') {
            return res[i];
        }
    }
    return { "status": "not_found", "imageUrl": "", "description": "" };
}

exports.getGoodsData = getGoodsData;
