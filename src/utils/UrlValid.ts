export const isValidUrl = (str) => {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
};

export function isValidUrlSchema(value: string) {
    if (value === "") {
        return true; 
    }
    const urlPattern = /(http(s?):)([/|.|\w|\s|-])*\/*(\?\S*)?$/g;
    return urlPattern.test(value);
}
