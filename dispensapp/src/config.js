// import React from 'react';


// const backendBaseUrl = process.env.API_URL;

// // module.exports.storageBaseUrl = backendBaseUrl.concat('/api/storage/');
// module.exports.catalogBaseUrl = backendBaseUrl.concat('/api/catalog/');
// module.exports.categoriesBaseUrl = backendBaseUrl.concat('/api/categories/');

export function storageBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/storage/');
}

export function catalogBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/catalog/');
}

export function categoriesBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/categories/');
}