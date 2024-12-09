import { Periode } from '../../felles/periode';

export interface Vilkårperiode extends Periode {
    type: TypeStønadsperiode;
    delvilkår: DelvilkårVilkårperiode;
    faktaOgVurderinger: FaktaOgVurderinger;
    kilde: KildeVilkårperiode;
    resultat: ResultatVilkårperiode;
    begrunnelse?: string;
    slettetKommentar?: string;
    aktivitetsdager?: number | null;
}

export type FaktaOgVurderinger = MålgruppeFaktaOgVurderingerDto | AktivitetFaktaOgVurderingDto;

export interface MålgruppeFaktaOgVurderingerDto {
    medlemskap: VurderingVilkårperiode | undefined;
    utgifterDekketAvAnnetRegelverk: VurderingVilkårperiode | undefined;
}

export type AktivitetFaktaOgVurderingDto =
    | AktivitetBarnetilsynFaktaOgVurderingerDto
    | AktivitetLæremidlerFaktaOgVurderingerDto;

type Studienivå = 'VIDEREGÅENDE' | 'HØYERE_UTDANNING';

// TODO: Nullability
export interface AktivitetBarnetilsynFaktaOgVurderingerDto {
    aktivitetsdager: number | null;
    lønnet?: VurderingVilkårperiode;
}

export interface AktivitetLæremidlerFaktaOgVurderingerDto {
    prosent: number | null;
    studienivå: Studienivå | null;
    harUtgifter: VurderingVilkårperiode | undefined;
    harRettTilUtstyrsstipend: VurderingVilkårperiode | undefined;
}

export interface DelvilkårVilkårperiode {
    medlemskap?: VurderingVilkårperiode;
    dekketAvAnnetRegelverk?: VurderingVilkårperiode;
    lønnet?: VurderingVilkårperiode;
}

export interface VurderingVilkårperiode {
    svar?: SvarVurdering;
    resultat: ResultatDelvilkårperiode;
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

enum ResultatDelvilkårperiode {
    OPPFYLT = 'OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    IKKE_AKTUELT = 'IKKE_AKTUELT',
}

export const resultatDelvilkårperiodeTilTekst: Record<ResultatDelvilkårperiode, string> = {
    OPPFYLT: 'Oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_VURDERT: 'Ikke vurdert',
    IKKE_AKTUELT: 'Ikke aktuelt',
};

enum TypeStønadsperiode {
    AAP = 'AAP',
    DAGPENGER = 'DAGPENGER',
    OMSTILLINGSSTØNAD = 'OMSTILLINGSSTØNAD',
    OVERGANGSSTØNAD = 'OVERGANGSSTØNAD',
    NEDSATT_ARBEIDSEVNE = 'NEDSATT_ARBEIDSEVNE',
    UFØRETRYGD = 'UFØRETRYGD',
    SYKEPENGER_100_PROSENT = 'SYKEPENGER_100_PROSENT',
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
    SYKEPENGER_100_PROSENT: '100% sykepenger',
    INGEN_MÅLGRUPPE: 'Ingen målgruppe',

    TILTAK: 'Tiltak',
    UTDANNING: 'Utdanning',
    REELL_ARBEIDSSØKER: 'Reell arbeidssøker',
    INGEN_AKTIVITET: 'Ingen aktivitet',
};
