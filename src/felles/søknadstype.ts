export enum Skjematype {
    BARNETILSYN = 'BARNETILSYN',
    LÆREMIDLER = 'LÆREMIDLER',
    REISE_TIL_SAMLING = 'REISE_TIL_SAMLING',
}

export const skjematypeTilTekst: Record<Skjematype, string> = {
    BARNETILSYN: 'tilsyn barn',
    LÆREMIDLER: 'læremidler',
    REISE_TIL_SAMLING: 'reise til samling',
};
