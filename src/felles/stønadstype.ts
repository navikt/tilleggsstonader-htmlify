export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
    LÆREMIDLER = 'LÆREMIDLER',
    BOUTGIFTER = 'BOUTGIFTER',
    DAGLIG_REISE_TSO = 'DAGLIG_REISE_TSO',
    DAGLIG_REISE_TSR = 'DAGLIG_REISE_TSR',
}

export const stønadstypeTilTekst: Record<Stønadstype, string> = {
    BARNETILSYN: 'tilsyn barn',
    LÆREMIDLER: 'læremidler',
    BOUTGIFTER: 'boutgifter',
    DAGLIG_REISE_TSO: 'daglige reiser',
    DAGLIG_REISE_TSR: 'daglige reiser',
};

export const tittelInterntVedtak = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeTilTekst[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return `Internt vedtak ${tittel}`;
};
