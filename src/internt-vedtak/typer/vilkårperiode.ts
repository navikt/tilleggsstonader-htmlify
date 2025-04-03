import {
    aktivitetTilTekst,
    AktivitetType,
    målgruppeTilTekst,
    MålgruppeType,
} from './målgruppeOgAktivitet';
import { Periode } from '../../felles/periode';

export interface Vilkårperiode extends Periode {
    type: VilkårperiodeType;
    faktaOgVurderinger: FaktaOgVurderinger;
    kilde: KildeVilkårperiode;
    resultat: ResultatVilkårperiode;
    begrunnelse?: string;
    slettetKommentar?: string;
}

export interface FaktaOgVurderinger {
    prosent?: number;
    aktivitetsdager?: number;
    studienivå?: Studienivå;
    medlemskap?: VurderingVilkårperiode;
    utgifterDekketAvAnnetRegelverk?: VurderingVilkårperiode;
    lønnet?: VurderingVilkårperiode;
    harUtgifter?: VurderingVilkårperiode;
    harRettTilUtstyrsstipend?: VurderingVilkårperiode;
    aldersvilkår?: VurderingVilkårperiode;
}

type VilkårperiodeType = MålgruppeType | AktivitetType;

export const vilkårperiodeTypeTilTekst: Record<VilkårperiodeType, string> = {
    ...målgruppeTilTekst,
    ...aktivitetTilTekst,
};

type Studienivå = 'VIDEREGÅENDE' | 'HØYERE_UTDANNING';

export const studienivåTilTekst: Record<Studienivå, string> = {
    VIDEREGÅENDE: 'Videregående',
    HØYERE_UTDANNING: 'Høyere utdanning',
};

export interface VurderingVilkårperiode {
    svar?: SvarVurdering;
    resultat: ResultatDelvilkårperiode;
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
