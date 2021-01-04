export function storageBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/storage/');
}

export function catalogBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/catalog/');
}

export function categoriesBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/categories/');
}

export function apiVersionBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/version/');
}

export function userBaseUrl(backendBaseUrl) {
    return backendBaseUrl.concat('/api/user/');
}