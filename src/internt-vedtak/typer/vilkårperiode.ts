import { Periode } from '../../felles/periode';

export interface Vilkårperiode extends Periode {
    type: string;
    delvilkår: DelvilkårVilkårperiode;
    kilde: string;
    resultat: string;
    begrunnelse?: string;
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
