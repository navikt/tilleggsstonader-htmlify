export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
    LÆREMIDLER = 'LÆREMIDLER',
}

const stønadstypeInterntVedtakTittel: Record<Stønadstype, string> = {
    BARNETILSYN: 'Tilsyn barn',
    LÆREMIDLER: 'Læremidler',
};

export const tittelInterntVedtak = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeInterntVedtakTittel[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return `Internt vedtak ${tittel}`;
};
