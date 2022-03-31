/*
    Elements for displaying covers
*/
const values_list = document.getElementsByClassName("values-list");
const min_element = document.getElementById("min");
const median_element = document.getElementById("median");
const max_element = document.getElementById("max");
const collection_container = document.getElementById("collection-container");
const wishlist_container = document.getElementById("wishlist-container");
/*
    Elements for displaying profile in header
*/
const profile_link = document.getElementById("profile-link");
const profile_picture = document.getElementById("profile-picture")
const header_name = document.getElementById("main-header-name");
const header_description = document.getElementById("main-header-description");

const artistRegex =  /\(\d+\)/g;

var profile_url = localStorage.getItem("profile_url");
var collection_url = localStorage.getItem("collection_url");

var onCollectionTab = true;

/*

## HOVER FOR VALUES ##

*/

values_list[0].addEventListener("mouseover", function() {
    if(onCollectionTab == true) {
        min_element.style.color = "var(--main-accent-color-variant-3)";
        median_element.style.color = "var(--main-accent-color-variant-2)";
        max_element.style.color = "var(--main-accent-color-variant-1)";
    }
})

values_list[0].addEventListener("mouseout", function() {
    if(onCollectionTab == true) {
        min_element.style.color = "var(--main-light-color)";
        median_element.style.color = "var(--main-light-color)";
        max_element.style.color = "var(--main-light-color)";
    }
})


/*

## SET MIN VALUE ##

*/

async function getMinValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if(data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.min.value;
}

async function getMinSum(data) {    
    var minSum = 0;

    for (let index = 0; index < await data.releases.length; index++) {
        minSum += await getMinValues(data, index);
    }
    minSum = Math.round(minSum);
    return minSum;
}

async function setMinSum(data) {
    var minSum = await getMinSum(data);
    min_element.innerText = "min: " + minSum + "€";
}

/*

## SET MEDIAN VALUE ##

*/

async function getMedianValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if(data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.median.value;
}

async function getMedianSum(data) {    
    var medianSum = 0;

    for (let index = 0; index < await data.releases.length; index++) {
        medianSum += await getMedianValues(data, index);
    }
    medianSum = Math.round(medianSum);
    return medianSum;
}

async function setMedianSum(data) {
    var medianSum = await getMedianSum(data);
    median_element.innerText = "median: " + medianSum + "€";
}

/*

## SET MAX VALUE ##

*/

async function getMaxValues(data, index) {

    //Wenn keine sales_history besteht, wird 0 zurückgegeben
    if(data.releases[index].basic_information.sales_history == null) {
        return 0;
    }

    return data.releases[index].basic_information.sales_history.max.value;
}

async function getMaxSum(data) {    
    var maxSum = 0;

    for (let index = 0; index < await data.releases.length; index++) {
        maxSum += await getMaxValues(data, index);
    }
    maxSum = Math.round(maxSum);
    return maxSum;
}

async function setMaxSum(data) {
    var maxSum = await getMaxSum(data);
    max_element.innerText = "max: " + maxSum + "€";
}




async function setValues(data) {
    setMinSum(data);
    setMedianSum(data);
    setMaxSum(data);
}


async function getCoverUrl(data, index) {
    return data.releases[index].basic_information.huge_thumb;
}

function setCover(element, url, title, artist) {
    element.style.background = "url("+ url +")";
    element.style.backgroundSize = "contain";
    element.style.backgroundRepeat = "no-repeat";

    let coverText = getNewCoverText();
    element.appendChild(coverText);

    artist = artist.replace(artistRegex, '');
    coverText.innerText = title + "\n-\n" + artist;
}

function getNewCoverElement(index) {
    var div = document.createElement('div');
    
    div.className = 'collection-cover';
    div.id = 'cover-' + (index+1);
    
    collection_container.appendChild(div);
    
    return div;
}

async function setAllCovers(data) {
    for (let index = 0; index < data.releases.length; index++) {
        let coverText = await getCoverTextFromJson(data, index);
        setCover(getNewCoverElement(index), await getCoverUrl(data, index), coverText[0], coverText[1]);
    }
}

function getNewCoverText() {
    var p = document.createElement('p');
    p.className = 'collection-cover-text';

    return p;
}

async function getCoverTextFromJson(data, index) {
    let coverTitle = data.releases[index].basic_information.title;
    let coverArtist = data.releases[index].basic_information.artists[0].name;
    
    return [coverTitle, coverArtist];
}

fetch(collection_url)
    .then((response) => response.json())
    .then((data) => {
        setAllCovers(data);
        setValues(data);
    }).catch(function () {
        console.log("Collection Promise Rejected");
    }
);



async function setHeaderName(data) {
    header_name.innerText = data.username;
}

async function setProfilePicture(data) {
    profile_picture.style.background = 'url(' + data.avatar_url +')';
    profile_picture.style.backgroundSize = "contain";
}

async function setProfileLink(data) {
    profile_link.setAttribute('href', data.uri);
}

fetch(profile_url)
    .then((response) => response.json())
    .then((data) => {
        setHeaderName(data);
        setProfilePicture(data);
        setProfileLink(data);
    }).catch(function() {
        console.log("Profile Promise Rejected");
    }
);


//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*

## WISHLIST ##

*/




async function getWantUrl(data, index) {
    return data.wants[index].basic_information.cover_image;
}

function setWant(element, url, title, artist) {
    element.style.background = "url("+ url +")";
    element.style.backgroundSize = "contain";
    element.style.backgroundRepeat = "no-repeat";

    let wantText = getNewWantText();
    element.appendChild(wantText);

    artist = artist.replace(artistRegex, '');
    wantText.innerText = title + "\n-\n" + artist;
}

function getNewWantElement(index) {
    var div = document.createElement('div');
    
    div.className = 'collection-cover';
    div.id = 'cover-' + (index+1);
    
    wishlist_container.appendChild(div);
    
    return div;
}

async function setAllWants(data) {
    for (let index = 0; index < data.wants.length; index++) {
        let wantText = await getWantTextFromJson(data, index);
        setWant(getNewWantElement(index), await getWantUrl(data, index), wantText[0], wantText[1]);
    }
}

function getNewWantText() {
    var p = document.createElement('p');
    p.className = 'collection-cover-text';

    return p;
}

async function getWantTextFromJson(data, index) {
    let wantTitle = data.wants[index].basic_information.title;
    let wantArtist = data.wants[index].basic_information.artists[0].name;
    
    return [wantTitle, wantArtist];
}



var wishlist_url = localStorage.getItem("wishlist_url");

fetch(wishlist_url)
    .then((response) => response.json())
    .then((data) => {
        setAllWants(data);
    }).catch(function () {
        console.log("Collection Promise Rejected");
    }
);

/*

## TAB MENU ##

*/

function switchTab (event, tab_name) {
    var i, tabcontent, tab_button;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tab_button = document.getElementsByClassName("tab-button");
    for (i = 0; i < tab_button.length; i++) {
      tab_button[i].className = tab_button[i].className.replace(" active", "");
    }

    if(tab_name == "wishlist-container") {
        min_element.style.color = "transparent";
        median_element.style.color = "transparent";
        max_element.style.color = "transparent";
        
        onCollectionTab = false;

        header_description.innerText = "Vinyl Wishlist";
    } else {
        min_element.style.color = "var(--main-light-color)";
        median_element.style.color = "var(--main-light-color)";
        max_element.style.color = "var(--main-light-color)";
        
        onCollectionTab = true;

        header_description.innerText = "Vinyl Collection";
    }

    document.getElementById(tab_name).style.display = "flex";
    event.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();