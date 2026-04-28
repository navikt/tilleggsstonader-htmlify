export interface KjørelisteBehandlingBrevData {
    navn: string;
    ident: string;
    behandletDato: string;
    behandlendeEnhet: string;
    saksbehandlerSignatur?: string;
    beregning: PrivatBilOppsummertBeregning;
}

export interface PrivatBilOppsummertBeregning {
    reiser: OppsummertBeregningForReise[];
}

export interface OppsummertBeregningForReise {
    reiseId: string;
    reiseavstandEnVei: number;
    aktivitetsadresse: string | undefined;
    perioder: OppsummertBeregningForPeriode[];
    totaltStønadsbeløp: number;
}

export interface OppsummertBeregningForPeriode {
    fom: string;
    tom: string;
    ukenummer: number;
    antallGodkjenteReisedager: number;
    bompengerTotalt: number | undefined;
    fergekostnadTotalt: number | undefined;
    satser: RammeForReiseMedPrivatBilSatsForDelperiode[];
    parkeringskostnadTotalt: number;
    stønadsbeløp: number;
}

export interface RammeForReiseMedPrivatBilSatsForDelperiode {
    fom: string;
    tom: string;
    kilometersats: number;
    dagsatsUtenParkering: number;
    satsBekreftetVedVedtakstidspunkt: boolean;
}
