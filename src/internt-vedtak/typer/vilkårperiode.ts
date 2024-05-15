import { Periode } from '../../felles/periode';

export interface Vilkårperiode extends Periode {
    type: TypeStønadsperiode;
    delvilkår: DelvilkårVilkårperiode;
    kilde: KildeVilkårperiode;
    resultat: ResultatVilkårperiode;
    begrunnelse?: string;
    slettetKommentar?: string;
}

export interface DelvilkårVilkårperiode {
    medlemskap?: VurderingVilkårperiode;
    lønnet?: VurderingVilkårperiode;
    mottarSykepenger?: VurderingVilkårperiode;
}

export interface VurderingVilkårperiode {
    svar?: SvarVurdering;
    resultat: ResultatVurderingVilkårperiode;
}

export interface Stønadsperiode extends Periode {
    målgruppe: string;
    aktivitet: string;
}

export enum ResultatVilkårperiode {
    OPPFYLT = 'OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    SLETTET = 'SLETTET',
}

enum KildeVilkårperiode {
    SYSTEM = 'SYSTEM',
    MANUELL = 'MANUELL',
}

export const kildeVilkårperiodeTilTekst: Record<KildeVilkårperiode, string> = {
    SYSTEM: 'System',
    MANUELL: 'Manuell',
};

enum SvarVurdering {
    JA = 'JA',
    JA_IMPLISITT = 'JA_IMPLISITT',
    NEI = 'NEI',
}

export const svarVurderingTilTekst: Record<SvarVurdering, string> = {
    JA: 'Ja',
    JA_IMPLISITT: 'Ja, implisitt',
    NEI: 'Nei',
};

enum ResultatVurderingVilkårperiode {
    OPPFYLT = 'OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    SLETTET = 'SLETTET',
}

export const resultatVurderingVilkårperiodeTilTekst: Record<
    ResultatVurderingVilkårperiode,
    string
> = {
    OPPFYLT: 'Oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_VURDERT: 'Ikke vurdert',
    SLETTET: 'Slettet',
};

enum TypeStønadsperiode {
    AAP = 'AAP',
    DAGPENGER = 'DAGPENGER',
    OMSTILLINGSSTØNAD = 'OMSTILLINGSSTØNAD',
    OVERGANGSSTØNAD = 'OVERGANGSSTØNAD',
    NEDSATT_ARBEIDSEVNE = 'NEDSATT_ARBEIDSEVNE',
    UFØRETRYGD = 'UFØRETRYGD',
    INGEN_MÅLGRUPPE = 'INGEN_MÅLGRUPPE',
    TILTAK = 'TILTAK',
    UTDANNING = 'UTDANNING',
    REELL_ARBEIDSSØKER = 'REELL_ARBEIDSSØKER',
    INGEN_AKTIVITET = 'INGEN_AKTIVITET',
}

export const typeStønadsperiodeTilTekst: Record<TypeStønadsperiode, string> = {
    AAP: 'AAP',
    DAGPENGER: 'Dagpenger',
    OMSTILLINGSSTØNAD: 'Omstillingsstønad',
    OVERGANGSSTØNAD: 'Overgangsstønad',
    NEDSATT_ARBEIDSEVNE: 'Nedsatt arbeidsevne',
    UFØRETRYGD: 'Uføretrygd',
    INGEN_MÅLGRUPPE: 'Ingen målgruppe',
    TILTAK: 'Tiltak',
    UTDANNING: 'Utdanning',
    REELL_ARBEIDSSØKER: 'Reell arbeidssøker',
    INGEN_AKTIVITET: 'Ingen aktivitet',
};
