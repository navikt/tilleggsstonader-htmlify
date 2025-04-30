export type Vedtak = VedtakAvslag | VedtakInnvilgeTilsynBarn | VedtakOpphørTilsynBarn;

export interface VedtakAvslag {
    type: VedtakType.AVSLAG;
    årsakerAvslag: ÅrsakAvslag[];
    avslagBegrunnelse: string;
}

export interface VedtakOpphørTilsynBarn {
    type: VedtakType.OPPHØR;
    årsakerOpphør: ÅrsakOpphør[];
    opphørBegrunnelse: string;
}

export interface VedtakInnvilgeTilsynBarn {
    type: VedtakType.INNVILGELSE;
    innvilgelseBegrunnelse: string;
}

enum ÅrsakAvslag {
    INGEN_AKTIVITET = 'INGEN_AKTIVITET',
    IKKE_I_MÅLGRUPPE = 'IKKE_I_MÅLGRUPPE',
    INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE = 'INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE',
    MANGELFULL_DOKUMENTASJON = 'MANGELFULL_DOKUMENTASJON',
    HAR_IKKE_UTGIFTER = 'HAR_IKKE_UTGIFTER',
    RETT_TIL_UTSTYRSSTIPEND = 'RETT_TIL_UTSTYRSSTIPEND',
    HAR_IKKE_MERUTGIFTER = 'HAR_IKKE_MERUTGIFTER',
    RETT_TIL_BOSTØTTE = 'RETT_TIL_BOSTØTTE',
    ANNET = 'ANNET',
}

export enum ÅrsakOpphør {
    ENDRING_AKTIVITET = 'ENDRING_AKTIVITET',
    ENDRING_MÅLGRUPPE = 'ENDRING_MÅLGRUPPE',
    ENDRING_UTGIFTER = 'ENDRING_UTGIFTER',
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
    OPPHØR = 'OPPHØR',
}

export const vedtakTypeTilTekst: Record<VedtakType, string> = {
    INNVILGELSE: 'Innvilget',
    AVSLAG: 'Avslag',
    OPPHØR: 'Opphør',
};

export const årsakAvslagTilTekst: Record<ÅrsakAvslag, string> = {
    INGEN_AKTIVITET: 'Ingen relevant aktivitet',
    IKKE_I_MÅLGRUPPE: 'Ingen målgruppe',
    INGEN_OVERLAPP_AKTIVITET_MÅLGRUPPE: 'Ingen overlapp aktivitet/målgruppe',
    MANGELFULL_DOKUMENTASJON: 'Mangelfull dokumentasjon',
    HAR_IKKE_UTGIFTER: 'Har ikke utgifter',
    RETT_TIL_UTSTYRSSTIPEND: 'Rett til utstyrsstipend',
    HAR_IKKE_MERUTGIFTER: 'Har ikke nødvendige merutgifter',
    RETT_TIL_BOSTØTTE: 'Rett til/mottar bostøtte',
    ANNET: 'Annet',
};

export const årsakOpphørTilTekst: Record<ÅrsakOpphør, string> = {
    ENDRING_AKTIVITET: 'Endring i aktivitet',
    ENDRING_MÅLGRUPPE: 'Endring i målgruppe',
    ENDRING_UTGIFTER: 'Endring i utgifter',
    ANNET: 'Annet',
};
