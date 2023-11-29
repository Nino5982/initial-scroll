const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// accesskey need to be always updated, from unsplash. by creating new aplication.
const accessKey = 'G5BWT1-NoF1k-JzmpkIpaMpnfi1Y2HYgMaqFrPtVE3s';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let arayPhotosFromUnsplash = [];
// loader
function showloader(){
    loader.hidden=false;
    imageContainer.hidden=true;
}
function hideLoader(){
    imageContainer.hidden=false;
    loader.hidden=true;
}
// helper function to set attributes on DOM element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// display photos
function displayPhotos(){
    showloader()
    arayPhotosFromUnsplash.forEach((photo) => {
    
    const aLink = document.createElement('a');
    setAttributes(aLink,{
        href: photo.links.html,
        target: '_blank',
    })
    const img = document.createElement('img');
setAttributes(img,{
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
})
    
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