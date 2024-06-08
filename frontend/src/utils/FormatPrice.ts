function formatPrice(price: number | undefined): string {
    return price ? `$${price.toFixed()}` : '';
}

export default formatPrice;