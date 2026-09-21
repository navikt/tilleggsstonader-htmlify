export interface Beregningsresultat {
    tilsynBarn?: BeregningsresultatTilsynBarn[];
    læremidler?: BeregningsresultatLæremidler[];
    boutgifter?: BeregningsresultatBoutgifter[];
    dagligReise?: BeregningsresultatDagligReise;
    reiseTilSamling?: BeregningsresultatReiseTilSamling;
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
}

export interface BeregningsresultatReiseTilSamling {
    offentligTransport: BeregningsresultatOffentligTransport[];
    privatBil: BeregningsresultatPrivatBil[];
}
export interface BeregningsresultatOffentligTransport {
    reiseId: string;
    adresse: string;
    fom: string;
    tom: string;
    beløp: number;
}
export interface BeregningsresultatPrivatBil {
    reiseId: string;
    adresse: string;
    fom: string;
    tom: string;
    sats: number;
    reiseavstand: number;
    bompenger: number;
    fergekostnad: number;
    parkering: number;
    piggdekkavgift: number;
    beløp: number;
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

export type BillettdetaljerEnum = 'ENKELTBILLETT' | 'SYVDAGERSBILLETT' | 'TRETTIDAGERSBILLETT';
