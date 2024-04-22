export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
}

const stønadstypeInterntVedtakTittel: Record<Stønadstype, string> = {
    BARNETILSYN: 'Tilsyn barn',
};

export const tittelInterntVedtak = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeInterntVedtakTittel[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return `Internt vedtak ${tittel}`;
};
