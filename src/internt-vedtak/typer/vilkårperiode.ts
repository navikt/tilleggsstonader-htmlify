import { Periode } from '../../felles/periode';

export interface Vilkårperiode extends Periode {
    type: string;
    delvilkår: DelvilkårVilkårperiode;
    kilde: string;
    resultat: ResultatVilkårperiode;
    begrunnelse?: string;
    slettetKommentar?: string;
}

export enum ResultatVilkårperiode {
    OPPFYLT = 'OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    SLETTET = 'SLETTET',
}

export interface DelvilkårVilkårperiode {
    medlemskap?: VurderingVilkårperiode;
    lønnet?: VurderingVilkårperiode;
    mottarSykepenger?: VurderingVilkårperiode;
}

export interface VurderingVilkårperiode {
    svar?: string;
    begrunnelse?: string;
    resultat: string;
}

export interface Stønadsperiode extends Periode {
    målgruppe: string;
    aktivitet: string;
}
