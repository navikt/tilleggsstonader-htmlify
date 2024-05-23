export type Vedtak = VedtakAvslag | VedtakInnvilgeTilsynBarn;

export interface VedtakAvslag {
    type: VedtakType.AVSLAG;
    årsakerAvslag: ÅrsakAvslag[];
    avslagBegrunnelse: string;
}

export interface VedtakInnvilgeTilsynBarn {
    type: VedtakType.INNVILGELSE;
    utgifterBarn: UtgiftBarn[];
}

enum ÅrsakAvslag {
    INGEN_AKTIVITET = 'INGEN_AKTIVITET',
    IKKE_I_MÅLGRUPPE = 'IKKE_I_MÅLGRUPPE',
    INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE = 'INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE',
    MANGELFULL_DOKUMENTASJON = 'MANGELFULL_DOKUMENTASJON',
    ANNET = 'ANNET',
}

export interface UtgiftBarn {
    fødselsdatoBarn: string;
    utgifter: Utgift[];
}

export interface Utgift {
    beløp: number;
    fom: string;
    tom: string;
}

export enum VedtakType {
    INNVILGELSE = 'INNVILGELSE',
    AVSLAG = 'AVSLAG',
}

export const vedtakTypeTilTekst: Record<VedtakType, string> = {
    INNVILGELSE: 'Innvilget',
    AVSLAG: 'Avslag',
};

export const årsakAvslagTilTekst: Record<ÅrsakAvslag, string> = {
    INGEN_AKTIVITET: 'Ingen aktivitet',
    IKKE_I_MÅLGRUPPE: 'Ingen målgruppe',
    INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE: 'Ingen overlapp aktivitet/målgruppe',
    MANGELFULL_DOKUMENTASJON: 'Mangelfull dokumentasjon',
    ANNET: 'Annet',
};
