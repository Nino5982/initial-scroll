const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// accesskey need to be always updated, from unsplash. by creating new aplication.
const accessKey = '1nD8lMyAb_hVdMc2v7nEaEuYmQAqLmThlpT_UH-dA5Q';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let arayPhotosFromUnsplash = [];

function showloader(){
    loader.hidden=false;
    imageContainer.hidden=true;
}
function hideLoader(){
    imageContainer.hidden=false;
    loader.hidden=true;
}




function displayPhotos(){
    showloader()
arayPhotosFromUnsplash.forEach((photo) => {
    
    const aLink = document.createElement('a');
    
    aLink.setAttribute('href', photo.links.html);
    aLink.setAttribute('target', '_blank');
    const img = document.createElement('img');
    
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt',photo.alt_description);
    img.setAttribute('title',photo.alt_description);
//  put img inside <a>, then both inside imagecontainer
    aLink.appendChild(img);
    imageContainer.appendChild(aLink);
});
hideLoader()
}

// get images from unsplash api
async function getPhotosFromApi(){
    showloader()
    try {
        const response = await fetch(apiUrl);
        arayPhotosFromUnsplash =await response.json();
        console.log(arayPhotosFromUnsplash);
        displayPhotos();
    } catch (error) {
        
    }
    
}
getPhotosFromApi();