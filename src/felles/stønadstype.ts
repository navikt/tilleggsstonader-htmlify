export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
}

const stønadstypeSøknadTittel: Record<Stønadstype, string> = {
    BARNETILSYN: 'Søknad om tilsyn barn',
};

const stønadstypeInterntVedtakTittel: Record<Stønadstype, string> = {
    BARNETILSYN: 'Tilsyn barn',
};

export const tittelSøknad = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeSøknadTittel[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return tittel;
};

export const tittelInterntVedtak = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeInterntVedtakTittel[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return `Internt vedtak ${tittel}`;
};
