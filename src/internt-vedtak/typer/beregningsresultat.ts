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
    offentligTransport?: BeregningsresultatOffentligTransport[] | null;
    privatBil?: BeregningsresultatPrivatBil[] | null;
    beregningsplan: Beregningsplan;
}

export interface Beregningsplan {
    omfang: Beregningsomfang;
    fraDato?: string;
    tidligsteEndring?: string;
}

enum Beregningsomfang {
    ALLE_PERIODER = 'ALLE_PERIODER',
    FRA_DATO = 'FRA_DATO',
    GJENBRUK_FORRIGE_RESULTAT = 'GJENBRUK_FORRIGE_RESULTAT',
    KUN_NYE_KJORELISTE_UKER = 'KUN_NYE_KJORELISTE_UKER',
}

export interface BeregningsresultatOffentligTransport {
    reiseId: string;
    adresse: string | null;
    fom: string;
    tom: string;
    beløp: number;
    begrunnelse: string;
    aktivitetId: string | null;
    fraTidligereVedtak: boolean;
}
export interface BeregningsresultatPrivatBil {
    reiseId: string;
    adresse: string | null;
    fom: string;
    tom: string;
    sats: number;
    totalReiseavstand: number;
    parkering: number | null;
    bompenger: number | null;
    fergekostnad: number | null;
    piggdekkavgift: number | null;
    beløpUtenAndreKostnader: number;
    beløp: number;
    aktivitetId: string | null;
    fraTidligereVedtak: boolean;
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
