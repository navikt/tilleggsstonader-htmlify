import { Stønadstype } from '../felles/stønadstype';

export interface Søknad {
    type: Stønadstype;
    mottattTidspunkt: string;
    avsnitt: Avsnitt;
    dokumentasjon: Dokumentasjon[];
}

export interface Avsnitt {
    type: 'AVSNITT';
    label: string;
    verdier: HtmlFelt[];
    beholdMargin?: boolean;
}

export interface Verdi {
    type: 'VERDI';
    verdi: string;
    alternativer?: string[];
}

export interface Linje {
    type: 'LINJE';
}

export type HtmlFelt = Avsnitt | Verdi | Linje;

export interface Dokumentasjon {
    label: string;
    dokument: {
        label: string;
        labelSendtInnTidligere: string;
        labelAntall: string;
    }[];
}
