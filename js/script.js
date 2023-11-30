const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// accesskey need to be always updated, from unsplash. by creating new aplication.
const accessKey = 'mtb0JgG-9x9K2RT_HI1cW1PDKNunilmbqiQp1xA4N_w';
let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
let ready = false;
let imagesLoaded = 0;
let totalImages =  0;
let arayPhotosFromUnsplash = [];

// chexk if all images were loaded
function imageLoaded(){
    loader.hidden=true
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready= true;
        count = 30;
    }
}
// helper function to set attributes on DOM element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// display photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages=arayPhotosFromUnsplash.length;
    console.log('total images=', totalImages);
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
        img.addEventListener('load', imageLoaded)  
             //  put img inside <a>, then both inside imagecontainer
        aLink.appendChild(img);
        imageContainer.appendChild(aLink);
    });
}

// get images from unsplash api
async function getPhotosFromApi(){
    try {
        const response = await fetch(apiUrl);
        arayPhotosFromUnsplash =await response.json();
        displayPhotos();
    } catch (error) {
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY>=document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotosFromApi();
    }
});

getPhotosFromApi();