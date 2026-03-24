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
    reisedagerPerUke: number;
    reiseavstandEnVei: number;
    ekstrakostnader: Ekstrakostnader;
    satser: SatsForPeriodePrivatBil[];
    vedtaksperioder: Vedtaksperiode[];
}

export interface Ekstrakostnader {
    bompengerPerDag?: number;
    fergekostnadPerDag: number;
}
export interface SatsForPeriodePrivatBil {
    fom: string;
    tom: string;
    satsBekreftetVedVedtakstidspunkt: boolean;
    kilometersats: number;
    dagsatsUtenParkering: number;
}
