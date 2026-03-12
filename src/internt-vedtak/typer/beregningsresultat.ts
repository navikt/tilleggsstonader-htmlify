export interface Beregningsresultat {
    tilsynBarn?: BeregningsresultatTilsynBarn[];
    læremidler?: BeregningsresultatLæremidler[];
    boutgifter?: BeregningsresultatBoutgifter[];
    dagligReise?: BeregningsresultatDagligReise;
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

export interface BeregningsresultatDagligReise {
    offentligTransport: {
        reiser: OffentligTransportReise[];
    };
    privatBil: {
        reiser: PrivatBilReise[];
    };
}

export interface OffentligTransportReise {
    reiseId: string;
    adresse: string;
    perioder: OffentligTransportPeriode[];
}

export interface OffentligTransportPeriode {
    fom: string;
    tom: string;
    prisEnkeltbillett: number;
    prisSyvdagersbillett: number;
    pris30dagersbillett: number;
    antallReisedagerPerUke: number;
    antallReisedager: number;
    beløp: number;
    billettdetaljer: Record<BillettdetaljerEnum, number>;
    brukersNavKontor?: string;
    fraTidligereVedtak: boolean;
}

export interface PrivatBilReise {
    perioder: PrivatBilPeriode[];
}

export interface PrivatBilPeriode {
    fom: string;
    tom: string;
    utbetalingsdato: string;
    grunnlag: {
        dager: {
            dato: string;
            parkeringskostnad: number;
            stønadsbeløpForDag: number;
        }[];
        dagsatsUtenParkering: number;
    };
    stønadsbeløp: number;
}

export type BillettdetaljerEnum = 'ENKELTBILLETT' | 'SYVDAGERSBILLETT' | 'TRETTIDAGERSBILLETT';
