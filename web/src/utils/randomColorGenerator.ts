/**
 * Generates a random color
 * @param {String} range accepted values are 'dark' or 'light'
 */
export const getRandomColor = (range: 'dark' | 'light') => {
    var letters = range === 'dark' ? '0123456789' : 'ABCDEF'
    var color = '#';
    if(range === 'dark') {
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
    }
    else {
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 6)];
        }
    }
    return color;
}