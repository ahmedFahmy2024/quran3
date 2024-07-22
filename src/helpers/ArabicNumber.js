export const convertNumberToArabic = (number) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(number)
        .split('')
        .map(digit => arabicNumerals[parseInt(digit)])
        .join('');
}

export const removeDiacritics = (text) => {
    return text.replace(/[\u064B-\u065F\u0610-\u061A\u06D6-\u06ED]/g, '');
};

const arabicNormChar = {
    'ك': 'ک', 'ﻷ': 'لا', 'ؤ': 'و', 'ى': 'ی', 'ي': 'ی', 'ئ': 'ی', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ٳ': 'ا', 'ة': 'ه', 'ء': '', 'ِ': '', 'ْ': '', 'ُ': '', 'َ': '', 'ّ': '', 'ٍ': '', 'ً': '', 'ٌ': '', 'ٓ': '', 'ٰ': '', 'ٔ': '', '�': ''
};

export const simplifyArabic = (str) => {
    return str.replace(/[^\u0000-\u007E]/g, function (a) {
        var retval = arabicNormChar[a];
        if (retval === undefined) { retval = a }
        return retval;
    }).normalize('NFKD').toLowerCase();
};