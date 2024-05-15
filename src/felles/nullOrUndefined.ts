export const notNullOrUndefined = <T extends string | number>(
    verdi: T | undefined | null
): verdi is T => {
    return !(verdi === undefined || verdi === null);
};
