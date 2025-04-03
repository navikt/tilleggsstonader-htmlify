export interface Beregningsresultat {
    tilsynBarn?: BeregningsresultatTilsynBarn[];
    læremidler?: BeregningsresultatLæremidler[];
    boutgifter?: BeregningsresultatBoutgifter[];
}

export interface BeregningsresultatTilsynBarn {
    dagsats: number;
    månedsbeløp: number;
    grunnlag: {
        måned: string;
        utgifterTotal: number;
        antallBarn: number;
    };
}

export interface BeregningsresultatLæremidler {
    fom: string;
    tom: string;
    antallMåneder: number;
    beløp: number;
    stønadsbeløp: number;
    utbetalingsdato: string;
}

export interface BeregningsresultatBoutgifter {
    fom: string;
    tom: string;
    antallMåneder: number;
    beløp: number;
    stønadsbeløp: number;
    utbetalingsdato: string;
}
