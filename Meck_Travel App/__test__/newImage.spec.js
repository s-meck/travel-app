import { newImage } from "../src/client/js/app"

describe ("Show a country photo when there is no photo for the city", () => {
    test ('see if the country pic is triggered', () => {
        document.body.innerHTML = `
        <img id='dest-photo'/>
        <div class='info-header' id='pic-info'></div>
        `;
    
        const pic = "no photo";
        const cntryPic = 'http://localhost/__test__/testImages/test.jpg';
        const img = document.getElementById("dest-photo");
        newImage(pic,cntryPic);

        expect (img.src).toEqual(cntryPic);
    });
});
