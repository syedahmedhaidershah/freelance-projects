class PostDetails {
    attrs = {
        title: '', // 2
        owner: '', // 1
        user: '',  // 10
        contact: '', // 11
        originalImageData: '',
        imageSrc: '',
        price: 'PKR 0', // 0
        city: '', // 3
        year: '', // 4
        mileage: '0', // 5
        consumptionType: 'Petrol', // 6
        ccDisplacement: '0 cc', // 7
        transmission: 'Manual', // 8,
        updatedAt: new Date(), // 9
    }

    constructor(data = {}) {
        for (let key in data) {
            this.attrs[key] = data[key];
        }
    }

    setAttribute = (key, value) => {
        this.attrs[key] = value;
    }

    setAttributes = (data) => {
        for (let key in data) {
            this.attrs[key] = data[key];
        }
    }

    get data() {
        return { ...this.attrs };
    }
}

module.exports = PostDetails;