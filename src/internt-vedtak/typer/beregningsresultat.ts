import { BeregningsresultatDagligReise } from './beregningsresultatDagligeReiser';
import { BeregningsresultatReiseTilSamling } from './beregningsresultatReiseTilSamling';
import { AktivitetType } from './målgruppeOgAktivitet';

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
    studienivå: string;
    studieprosent: number;
    stønadsbeløpPerMåned: number;
    stønadsbeløpForPeriode: number;
    utbetalingsdato: string;
    delAvTidligereUtbetaling: boolean;
    aktivitet: AktivitetType;
    målgruppe: string; // Faktisk målgruppe
}

export interface BeregningsresultatBoutgifter {
    fom: string;
    tom: string;
    stønadsbeløp: number;
    makssatsBekreftet: boolean;
    delAvTidligereUtbetaling: boolean;
    skalFåDekketFaktiskeUtgifter: boolean;
    inneholderUtgifterOvernatting: boolean;
    sumUtgifter: number;
    målgruppe: string; // Faktisk målgruppe
    aktivitet: AktivitetType;
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

export type BillettdetaljerEnum = 'ENKELTBILLETT' | 'SYVDAGERSBILLETT' | 'TRETTIDAGERSBILLETT';
