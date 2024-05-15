export const tekstEllerFeil = <T extends string>(
    mapping: Record<T, string>,
    kode?: T
): string | undefined => {
    if (kode) {
        const tekst = mapping[kode];
        if (!tekst) {
            throw Error(`Finner ikke mapping av ${kode}`);
        }
        return tekst;
    }
    return undefined;
};
