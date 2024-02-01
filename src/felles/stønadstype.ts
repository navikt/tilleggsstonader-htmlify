export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
}

const stønadstypeTittel: Record<Stønadstype, string> = {
    BARNETILSYN: 'Søknad om tilsyn barn',
};

export const tittelStønadstype = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeTittel[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return tittel;
};
