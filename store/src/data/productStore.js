//Watch: price_1NlucRKJmiKIX4GAzWLZgdhv
//Sunglasses: price_1NlueiKJmiKIX4GAgQhDtCDU
//Camera: price_1NlufVKJmiKIX4GA9rEAYgPM
export const products = [
    {
        id: "price_1NlucRKJmiKIX4GAzWLZgdhv",
        title: "Watch",
        price: 14.99,
        img: "Watch.jpg"
    },
    {
        id: "price_1NlueiKJmiKIX4GAgQhDtCDU",
        title: "Sunglasses",
        price: 9.99,
        img: "Sunglasses.jpg"
    },
    {
        id: "price_1NlufVKJmiKIX4GA9rEAYgPM",
        title: "Camera",
        price: 39.99,
        img: "Camera.jpg"
    },
];

export const getProductData = (id) => {
    let productData = products.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

