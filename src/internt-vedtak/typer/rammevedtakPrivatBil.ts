import { Vedtaksperiode } from './vedtaksperiode';

export interface RammevedtakPrivatBil {
    reiser: RammeForReiseMedPrivatBil[];
}

export interface RammeForReiseMedPrivatBil {
    reiseId: string;
    aktivitetsadresse?: string;
    grunnlag: BeregningsgrunnlagForReiseMedPrivatBil;
}

export interface BeregningsgrunnlagForReiseMedPrivatBil {
    fom: string;
    tom: string;
    delperioder: Delperiode[];
    reiseavstandEnVei: number;
    vedtaksperioder: Vedtaksperiode[];
}

export interface Delperiode {
    fom: string;
    tom: string;
    satser: SatsForPeriodePrivatBil[];
    reisedagerPerUke: number;
    ekstrakostnader: Ekstrakostnader;
}

export interface Ekstrakostnader {
    bompengerPerDag?: number;
    fergekostnadPerDag?: number;
}
export interface SatsForPeriodePrivatBil {
    fom: string;
    tom: string;
    kilometersats: number;
    dagsatsUtenParkering: number;
    satsBekreftetVedVedtakstidspunkt: boolean;
}
