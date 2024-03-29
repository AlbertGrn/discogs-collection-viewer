import ApiManager from '../api/ApiManager.js';
import CoverManager from './CoverManager.js';

/*
    Elements for color toggle
*/

const color_toggle_button = document.getElementById('mode-toggle');
const color_toggle_span = document.getElementById('mode-icon');
const color_toggle_icon = document.querySelector('#mode-icon img');
const random_button_icon = document.querySelector('#random-button img');

/*
    Elements for displaying covers
*/
const values_list = document.getElementsByClassName('values-list');
const min_element = document.getElementById('min');
const median_element = document.getElementById('median');
const max_element = document.getElementById('max');
const amount_element = document.getElementById('record-count');
const collection_container = document.getElementById('collection-container');
const wishlist_container = document.getElementById('wishlist-container');
/*
    Elements for displaying profile in header
*/
const profile_link = document.getElementById('profile-link');
const profile_picture = document.getElementById('profile-picture')
const header_name = document.getElementById('main-header-name');
const header_description = document.getElementById('main-header-description');

const random_button = document.getElementById('random-button');

var profile_url = localStorage.getItem('profile_url');
var collection_url = localStorage.getItem('collection_url');
var wishlist_url = localStorage.getItem('wishlist_url');

var onCollectionTab = true;

/*

## COLOR MODE TOGGLE ##

*/

color_toggle_button.addEventListener('click', function () {
    // class contains current mode
    if (color_toggle_span.classList.contains('light')) {
        // switch to dark mode
        collection_container.style.background = 'var(--main-bg-color)';
        wishlist_container.style.background = 'var(--main-bg-color)';
        color_toggle_icon.src = './img/light-icon.svg';
        random_button_icon.src = './img/rnd_icon_dark.svg';
        random_button.style.background = 'var(--main-bg-color)';
        random_button.style.borderColor = 'var(--main-light-color)';
        
        color_toggle_span.classList.remove('light');
        color_toggle_span.classList.add('dark');
    } else {
        // switch to light mode
        collection_container.style.background = 'var(--main-light-color)';
        wishlist_container.style.background = 'var(--main-light-color)';
        color_toggle_icon.src = './img/dark-icon.svg';
        random_button_icon.src = './img/rnd_icon.svg';
        random_button.style.background = 'var(--main-light-color)';
        random_button.style.borderColor = 'var(--main-dark-color)';
        
        color_toggle_span.classList.remove('dark');
        color_toggle_span.classList.add('light');
    }
})

/*

## HOVER FOR VALUES ##

*/

values_list[0].addEventListener('mouseover', function () {
    if (onCollectionTab == true) {
        min_element.style.color = 'var(--main-accent-color-variant-3)';
        median_element.style.color = 'var(--main-accent-color-variant-2)';
        max_element.style.color = 'var(--main-accent-color-variant-1)';
        amount_element.style.color = 'var(--main-accent-color-variant-4)';
    }
})

values_list[0].addEventListener('mouseout', function () {
    if (onCollectionTab == true) {
        min_element.style.color = 'var(--main-light-color)';
        median_element.style.color = 'var(--main-light-color)';
        max_element.style.color = 'var(--main-light-color)';
        amount_element.style.color = 'var(--main-light-color)';
    }
})

/*

## LOADING OF ALL ELEMENTS

*/

const mouseoverEvent = new MouseEvent('mouseover');

function initCollection() {
    ApiManager.getData(collection_url).then(collectionData => {
        let collectionManager = new CoverManager(collectionData);
        collectionManager.loadCollection();

        setValues(collectionManager);

        var prevCoverEl;

        random_button.addEventListener('click', (event) => {
            var rndCoverEl;
            if (prevCoverEl !== undefined) {
                prevCoverEl.classList.remove('rnd-selection');
            }
            rndCoverEl = collectionManager.coverArray[Math.floor(Math.random() * collectionManager.coverArray.length)];
            prevCoverEl = rndCoverEl;

            // scroll to randomly selected cover and highlist
            rndCoverEl.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            rndCoverEl.classList.add('rnd-selection');

            collection_container.addEventListener('mouseover', (event) => {
                if (event.target.matches(`#${rndCoverEl.id}`)) {
                    rndCoverEl.classList.remove('rnd-selection');
                }
            })
        });
    });
    ApiManager.getData(profile_url).then(profileData => {
        setHeaderInfo(profileData);
    })
}

function initWishlist() {
    ApiManager.getData(wishlist_url).then(wishlistData => {
        let wishlistManager = new CoverManager(wishlistData);
        wishlistManager.loadWishlist();
    });
}

function setValues(manager) {
    let headerValues = manager.getHeaderValues();

    min_element.innerText = `min: ${headerValues[0]}€`;
    median_element.innerText = `median: ${headerValues[1]}€`;
    max_element.innerText = `max: ${headerValues[2]}€`;
    amount_element.innerText = `${headerValues[3]} records`
}

function setHeaderInfo(profileData) {
    header_name.innerText = profileData.username;

    profile_picture.style.background = 'url(' + profileData.avatar_url + ')';
    profile_picture.style.backgroundSize = 'contain';

    profile_link.setAttribute('href', profileData.uri);
}

/*

## SCROLL TO TOP BUTTON ##

*/

//Get the button:
let mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        mybutton.style.display = 'block';
    } else {
        mybutton.style.display = 'none';
    }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', topFunction);

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*

## RANDOM BUTTON ##

*/

random_button.addEventListener('mouseover', function() {
    random_button.style.borderColor = 'var(--main-accent-color)';
    random_button_icon.src = './img/rnd_icon_accent.svg';
})

random_button.addEventListener('mouseout', function() {
    if (color_toggle_span.classList.contains('light')) {
        random_button.style.borderColor = 'var(--main-dark-color)';
        random_button_icon.src = './img/rnd_icon.svg';
    } else {
        random_button.style.borderColor = 'var(--main-light-color)';
        random_button_icon.src = './img/rnd_icon_dark.svg';
    }
})

/*

## TAB MENU ##

*/

const tab_buttons = document.getElementsByClassName('tab-button');
for (let i = 0; i < tab_buttons.length; i++) {
    tab_buttons[i].addEventListener('click', event => switchTab(event, tab_buttons[i].textContent))
}

function switchTab(event, tab_text) {
    var i, tabcontent, tab_button;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tab_button = document.getElementsByClassName('tab-button');
    for (i = 0; i < tab_button.length; i++) {
        tab_button[i].className = tab_button[i].className.replace(' active', '');
    }

    if (tab_text == 'Wishlist') {
        document.getElementById('wishlist-container').style.display = 'flex';
        random_button.style.display = 'none';

        min_element.style.color = 'transparent';
        median_element.style.color = 'transparent';
        max_element.style.color = 'transparent';
        amount_element.style.color = 'transparent';

        onCollectionTab = false;

        header_description.innerText = 'Vinyl Wishlist';
    } else {
        document.getElementById('collection-container').style.display = 'flex';
        random_button.style.display = 'flex';

        min_element.style.color = 'var(--main-light-color)';
        median_element.style.color = 'var(--main-light-color)';
        max_element.style.color = 'var(--main-light-color)';
        amount_element.style.color = 'var(--main-light-color)';

        onCollectionTab = true;

        header_description.innerText = 'Vinyl Collection';
    }

    event.currentTarget.className += ' active';
}

/*

## CALLING OF INIT FUNCTIONS ##

*/

initCollection();
initWishlist();

// Initial opening of the collection tab

document.getElementById('defaultOpen').click();