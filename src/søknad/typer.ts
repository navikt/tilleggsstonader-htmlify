import { Stønadstype } from '../felles/stønadstype';

export interface Søknad {
    type: Stønadstype;
    mottattTidspunkt: string;
    avsnitt: Avsnitt;
}

export interface Avsnitt {
    type: 'AVSNITT';
    label: string;
    verdier: HtmlFelt[];
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
