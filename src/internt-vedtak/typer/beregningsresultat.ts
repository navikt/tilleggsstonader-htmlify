export interface Beregningsresultat {
    tilsynBarn?: BeregningsresultatTilsynBarn[];
    læremidler?: BeregningsresultatLæremidler[];
    boutgifter?: BeregningsresultatBoutgifter[];
    dagligReiseTso?: BeregningsresultatDagligReiseTso;
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
    stønadsbeløpPerMåned: number;
    stønadsbeløpForPeriode: number;
    utbetalingsdato: string;
}

export interface BeregningsresultatBoutgifter {
    fom: string;
    tom: string;
    antallMåneder: number;
    stønadsbeløp: number;
}
export interface BeregningsresultatDagligReiseTso {
    offentligTransport: {
        reiser: {
            reiseId: string;
            adresse: string;
            perioder: {
                fom: string;
                tom: string;
                prisEnkeltbillett: number;
                prisSyvdagersbillett: number;
                pris30dagersbillett: number;
                antallReisedagerPerUke: number;
                beløp: number;
                billettdetaljer: Record<BillettdetaljerEnum, number>;
                brukersNavKontor?: string;
            }[];
        }[];
    };
}

export type BillettdetaljerEnum = 'ENKELTBILLETT' | 'SYVDAGERSBILLETT' | 'TRETTIDAGERSBILLETT';
