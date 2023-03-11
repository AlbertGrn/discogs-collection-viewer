import Cover from '../ui/Cover.js';

const collection_container = document.getElementById('collection-container');
const wishlist_container = document.getElementById('wishlist-container');


class CoverManager {

    constructor(data) {
        this.data = data;
        this.coverArray = [];
    }

    getHeaderValues() {
        return [getMinSum(this.data), getMedianSum(this.data), getMaxSum(this.data), getRecordCount(this.data)];
    }

    loadCollection() {
        this.coverArray = setCollectionCovers(this.data, this.coverArray);
    }

    loadWishlist() {
        setWishlistCovers(this.data);
    }

}


function setCollectionCovers(data, coverArray) {
    for (let index = 0; index < data.releases.length; index++) {

        let coverData = [data.releases[index].basic_information.huge_thumb, data.releases[index].basic_information.title, data.releases[index].basic_information.artists[0].name]

        let cover = new Cover(coverData);
        let coverEl = cover.getCoverElement(index)
        collection_container.appendChild(coverEl);
        coverArray.push(coverEl);
    }
    return coverArray;
}

function setWishlistCovers(data) {
    for (let index = 0; index < data.wants.length; index++) {
        let coverData = [data.wants[index].basic_information.cover_image, data.wants[index].basic_information.title, data.wants[index].basic_information.artists[0].name]

        let cover = new Cover(coverData)
        wishlist_container.appendChild(cover.getCoverElement(index));
    }
}


function getMinValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if (data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.min.value;
}

function getMinSum(data) {
    var minSum = 0;

    for (let index = 0; index < data.releases.length; index++) {
        minSum += getMinValues(data, index);
    }
    minSum = Math.round(minSum);
    return minSum;
}

function getMedianValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if (data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.median.value;
}

function getMedianSum(data) {
    var medianSum = 0;

    for (let index = 0; index < data.releases.length; index++) {
        medianSum += getMedianValues(data, index);
    }
    medianSum = Math.round(medianSum);
    return medianSum;
}

function getMaxValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if (data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.max.value;
}

function getMaxSum(data) {
    var maxSum = 0;

    for (let index = 0; index < data.releases.length; index++) {
        maxSum += getMaxValues(data, index);
    }
    maxSum = Math.round(maxSum);
    return maxSum;
}

function getRecordCount(data) {
    return data.pagination.items;
}


export default CoverManager;