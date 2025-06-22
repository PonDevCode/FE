    export const limitWords = (text = '', maxWords = 5) => {
        const words = text.trim().split(/\s+/); // tách theo khoảng trắng
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '.....';
};