export const getCuttedFileName = (value: string): string => {
    if (value.includes('.pdf')) {
        const endIndex = value.indexOf('.pdf');
        return value.slice(0, endIndex);
    }
    return value
}