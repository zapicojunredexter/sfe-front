export const arrayToObject = (array, key) => {
    return array.reduce((acc,cur) => ({...acc,[cur[key]]: cur}),{});
}