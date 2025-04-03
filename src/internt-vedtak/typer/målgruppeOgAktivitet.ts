export enum MålgruppeType {
    AAP = 'AAP',
    DAGPENGER = 'DAGPENGER',
    OMSTILLINGSSTØNAD = 'OMSTILLINGSSTØNAD',
    OVERGANGSSTØNAD = 'OVERGANGSSTØNAD',
    NEDSATT_ARBEIDSEVNE = 'NEDSATT_ARBEIDSEVNE',
    UFØRETRYGD = 'UFØRETRYGD',
    SYKEPENGER_100_PROSENT = 'SYKEPENGER_100_PROSENT',
    INGEN_MÅLGRUPPE = 'INGEN_MÅLGRUPPE',
}

export enum FaktiskMålgruppeType {
    NEDSATT_ARBEIDSEVNE = 'NEDSATT_ARBEIDSEVNE',
    ENSLIG_FORSØRGER = 'ENSLIG_FORSØRGER',
    GJENLEVENDE = 'GJENLEVENDE',
}

export enum AktivitetType {
    TILTAK = 'TILTAK',
    UTDANNING = 'UTDANNING',
    REELL_ARBEIDSSØKER = 'REELL_ARBEIDSSØKER',
    INGEN_AKTIVITET = 'INGEN_AKTIVITET',
}

export const målgruppeTilTekst: Record<MålgruppeType, string> = {
    AAP: 'AAP',
    NEDSATT_ARBEIDSEVNE: 'Nedsatt arbeidsevne',
    DAGPENGER: 'Dagpenger',
    OMSTILLINGSSTØNAD: 'Omstillingsstønad',
    OVERGANGSSTØNAD: 'Overgangsstønad',
    UFØRETRYGD: 'Uføretrygd',
    SYKEPENGER_100_PROSENT: '100% sykepenger',
    INGEN_MÅLGRUPPE: 'Ingen målgruppe',
};

export const faktiskMålgruppeTilTekst: Record<FaktiskMålgruppeType, string> = {
    NEDSATT_ARBEIDSEVNE: 'Nedsatt arbeidsevne',
    ENSLIG_FORSØRGER: 'Enslig forsørger',
    GJENLEVENDE: 'Gjenlevende',
};

export const målgruppeEllerFaktiskMålgruppeTilTekst: Record<
    MålgruppeType | FaktiskMålgruppeType,
    string
> = {
    ...målgruppeTilTekst,
    ...faktiskMålgruppeTilTekst,
};

export const aktivitetTilTekst: Record<AktivitetType, string> = {
    TILTAK: 'Tiltak',
    UTDANNING: 'Utdanning',
    REELL_ARBEIDSSØKER: 'Reell arbeidssøker',
    INGEN_AKTIVITET: 'Ingen relevant aktivitet',
};
