export function roundDecimals(float:number,decimals:number) {
    return parseFloat(float.toString()).toFixed(decimals);
}