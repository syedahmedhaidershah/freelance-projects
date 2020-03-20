const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient('https://api.pro.coinbase.com');

const key = 'RKoucFS7KZ6cWF6z';
const secret = '12lhmiU1sF2OqvR0N9TQNiIEBddL0Kxa';
const passphrase = 'your_passphrase';
 
const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';
 
const authedClient = new CoinbasePro.AuthenticatedClient(
  key,
  secret,
  passphrase,
  apiURI
);

async function getProducts() {
    try {
        const products = await publicClient.getProducts();
        console.log(products);
    } catch (error) {
        /* ... */
    }
}

getProducts();