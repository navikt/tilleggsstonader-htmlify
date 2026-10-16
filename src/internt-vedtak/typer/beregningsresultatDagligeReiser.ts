import { Beregningsplan } from './beregningsresultat';

export interface BeregningsresultatDagligReise {
    offentligTransport?: BeregningsresultatOffentligTransport;
    privatBil?: OppsummertBeregningForReise[];
    beregningsplan: Beregningsplan;
    tidligsteEndring?: string;
}

/**
 * Offentlig transport
 */
export interface BeregningsresultatOffentligTransport {
    reiser: BeregningsresultatForReiseOffentlig[];
}

export interface BeregningsresultatForReiseOffentlig {
    reiseId: string;
    adresse?: string;
    perioder: BeregningsresultatForPeriode[];
}

interface BeregningsresultatForPeriode {
    fom: string;
    tom: string;
    prisEnkeltbillett?: number;
    prisSyvdagersbillett?: number;
    pris30dagersbillett?: number;
    antallReisedagerPerUke: number;
    beløp: number;
    billettdetaljer: Record<string, number>;
    antallReisedager: number;
    fraTidligereVedtak: boolean;
    brukersNavKontor?: string;
}

/**
 * Privat bil
 */

export interface OppsummertBeregningForReise {
    reiseId: string;
    reiseavstandEnVei: number;
    aktivitetsadresse?: string;
    perioder: OppsummertBeregningForPeriode[];
    fraTidligereVedtak: boolean;
    totaltStønadsbeløpMedPerioderFraForrigeVedtak: number;
    totaltStønadsbeløpUtenPerioderFraForrigeVedtak: number;
}

export interface OppsummertBeregningForPeriode {
    fom: string;
    tom: string;
    antallGodkjenteReisedager: number;
    bompengerTotalt?: number;
    fergekostnadTotalt?: number;
    satser: RammeForReiseMedPrivatBilDelperiodeSatser[];
    parkeringskostnadTotalt: number;
    stønadsbeløp: number;
    fraTidligereVedtak: boolean;
    ukenummer: number;
}

export interface RammeForReiseMedPrivatBilDelperiodeSatser {
    fom: string;
    tom: string;
    satsBekreftetVedVedtakstidspunkt: boolean;
    kilometersats: number;
    dagsatsUtenParkering: number;
}
