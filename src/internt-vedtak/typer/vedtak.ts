export type Vedtak = VedtakAvslag | VedtakInnvilgeTilsynBarn;

export interface VedtakAvslag {
    type: VedtakType.AVSLAG;
    avslagBegrunnelse: string;
}

export interface VedtakInnvilgeTilsynBarn {
    type: VedtakType.INNVILGELSE;
    utgifterBarn: UtgiftBarn[];
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
