
const artistRegex =  /\(\d+\)/g;
const cover_placeholder_url = 'https://community.mp3tag.de/uploads/default/original/2X/a/acf3edeb055e7b77114f9e393d1edeeda37e50c9.png'

class Cover {

    constructor(coverData) {
        // data.releases[index].basic_information.huge_thumb
        if (coverData[0] != '') {
            this.coverUrl = coverData[0]
        } else {
            this.coverUrl = cover_placeholder_url;
        }
        // data.releases[index].basic_information.title;
        this.coverTitle = coverData[1];
        // data.releases[index].basic_information.artists[0].name;
        this.coverArtist = coverData[2].replace(artistRegex, '');

    }

    getCoverElement(index) {
        var div = document.createElement('div');

        div.className = 'collection-cover';
        div.id = 'cover-' + (index + 1);

        var p = document.createElement('p');
        p.className = 'collection-cover-text';
        p.innerText = this.coverTitle + '\n-\n' + this.coverArtist;

        div.appendChild(p);

        div.style.background = 'url(' + this.coverUrl + ')';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundPosition = 'center center';

        return div;
    }

}

export default Cover;