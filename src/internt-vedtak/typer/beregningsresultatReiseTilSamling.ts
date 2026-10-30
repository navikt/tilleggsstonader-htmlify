import { Beregningsplan } from './beregningsresultat';

export interface BeregningsresultatReiseTilSamling {
    offentligTransport?: BeregningsresultatOffentligTransport[];
    privatBil?: BeregningsresultatPrivatBil[];
    drosje?: BeregningsresultatDrosje[];
    beregningsplan: Beregningsplan;
}

export interface BeregningsresultatOffentligTransport {
    reiseId: string;
    adresse?: string;
    fom: string;
    tom: string;
    beløp: number;
    begrunnelse: string;
    aktivitetId?: string;
    fraTidligereVedtak: boolean;
}
export interface BeregningsresultatDrosje {
    reiseId: string;
    adresse?: string;
    fom: string;
    tom: string;
    beløp: number;
    begrunnelse: string;
    aktivitetId?: string;
    fraTidligereVedtak: boolean;
}
export interface BeregningsresultatPrivatBil {
    reiseId: string;
    adresse?: string;
    fom: string;
    tom: string;
    sats: number;
    totalReiseavstand: number;
    parkering?: number;
    bompenger?: number;
    fergekostnad?: number;
    piggdekkavgift?: number;
    beløpUtenAndreKostnader: number;
    beløp: number;
    aktivitetId?: string;
    fraTidligereVedtak: boolean;
}
