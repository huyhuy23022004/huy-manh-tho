export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-VN',{
        style : 'currency',
        currency : 'VND'
    }).format(price)
}