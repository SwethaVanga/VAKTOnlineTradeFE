export const convertAmount = (currency: string, price: number, rates: any) => {
    if(currency === 'GBP') {
        return price;
    }
    return (price / rates[currency]).toFixed(2);
}