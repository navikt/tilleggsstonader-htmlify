export enum Stønadstype {
    BARNETILSYN = 'BARNETILSYN',
    LÆREMIDLER = 'LÆREMIDLER',
    BOUTGIFTER = 'BOUTGIFTER',
    DAGLIG_REISE_TSO = 'DAGLIG_REISE_TSO',
    DAGLIG_REISE_TSR = 'DAGLIG_REISE_TSR',
}

export const stønadstypeTilTeXt: Record<Stønadstype, string> = {
    BARNETILSYN: 'Tilsyn barn',
    LÆREMIDLER: 'Læremidler',
    BOUTGIFTER: 'Boutgifter',
    DAGLIG_REISE_TSO: 'Daglig reise',
    DAGLIG_REISE_TSR: 'Daglig reise',
};

export function stønadstypeTekstTilSmåBokstav(stønadstype: Stønadstype): string {
    const stønadstypeTilText = stønadstypeTilTeXt[stønadstype];
    return stønadstypeTilText.toLowerCase();
}

export const tittelInterntVedtak = (stønadstype: Stønadstype): string => {
    const tittel = stønadstypeTilTeXt[stønadstype];
    if (!tittel) {
        throw Error(`Finner ikke stønadstype=${stønadstype}`);
    }
    return `Internt vedtak ${tittel}`;
};
