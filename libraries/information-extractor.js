/** 3rd party packages */
const { parse: parser } = require('node-html-parser');

/** custom factories and libraries */
const {
    PostDetails
} = require('../factoriesAndCreators');

const pakWheelsUsedCarsData = (data) => {
    const root = parser(data);

    // const cards = root.querySelectorAll('.search-list');
    const titles = root.querySelectorAll('.car-name.ad-detail-path');
    const cities = root.querySelectorAll('.search-vehicle-info');
    const prices = root.querySelectorAll('.price-details');
    const year = root.querySelectorAll('.search-vehicle-info-2 li:nth-child(n)');
    const mileage = root.querySelectorAll('.search-vehicle-info-2 li:nth-child(2n)');
    const consumptionType = root.querySelectorAll('.search-vehicle-info-2 li:nth-child(3n)');
    const ccDisplacement = root.querySelectorAll('.search-vehicle-info-2 li:nth-child(4n)');
    const transmission = root.querySelectorAll('.search-vehicle-info-2 li:nth-child(5n)');
    const updatedAt = root.querySelectorAll('.search-bottom .pull-left');
    let userDetails = root.querySelectorAll('.search-bottom .pull-right');
    const imageData = root.querySelectorAll('.lazy.pic');

    userDetails = userDetails.map(u => u.innerText.trim())
        .filter(e => e)

    return Array.from(titles)
        .map((title, index) => {
            const newPost = new PostDetails();

            const swapRegex = /\n{1,}|\s{2,}/g;

            const [user, contact, ...watermarktext] = userDetails[index]
                ?.split(/\n/g)
                ?.map(e => e
                    .replace(/\s{2,}/g, '')
                    .trim()
                )
                ?.filter(e => e);

            if (!imageData?.[index])
                imageData[index] = { attributes: {} };

            const {
                'data-original': originalImageData = '',
                src: imageSrc = '',
                title: useTitle = ''
            } = imageData[index]?.attributes;

            newPost.setAttributes({
                title: (useTitle || title.innerText).replace(swapRegex, ' ').trim() || '',
                city: cities[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                price: prices[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                year: year[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                mileage: mileage[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                consumptionType: consumptionType[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                ccDisplacement: ccDisplacement[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                transmission: transmission[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                updatedAt: updatedAt[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                user: user || '',
                contact: contact || '',
                updatedAt: updatedAt[index]?.innerText.replace(swapRegex, ' ').trim() || '',
                originalImageData: originalImageData.replace(swapRegex, ' ').trim() || '',
                imageSrc: imageSrc.replace(swapRegex, ' ').trim() || '',
            })

            return newPost.data;
        })
}

module.exports ={
    pakWheelsUsedCarsData
}