import { Dokumentasjon } from '../søknad/typer';

export interface Kjøreliste {
    tittel: string;
    skjemanummer: string;
    mottattTidspunkt: string;
    uker: Uke[];
    dokumentasjon: Dokumentasjon[];
    søker: Søkerinformasjon;
}

export interface Uke {
    ukeTekst: string;
    spørsmål: string;
    dager: Dag[];
}

export interface Dag {
    datoTekst: string;
    harKjørt: boolean;
    parkeringsutgift?: Parkeringsutgift;
}

export interface Parkeringsutgift {
    tekst: string;
    beløp: number;
}

export interface Søkerinformasjon {
    ident: string;
    navn: string;
}
