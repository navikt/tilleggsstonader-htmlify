export interface Vilkår {
    resultat: Vilkårsresultat;
    type: Vilkårtype;
    delvilkår: DelvilkårInternt[];
    fødselsdatoBarn?: string;
    fom?: string;
    tom?: string;
    utgift?: number;
    slettetKommentar?: string;
}

export interface DelvilkårInternt {
    resultat: Vilkårsresultat;
    vurderinger: Vurdering[];
}

export interface Vurdering {
    regel: string;
    svar?: string;
    begrunnelse?: string;
}

export enum Vilkårtype {
    PASS_BARN = 'PASS_BARN',
    UTGIFTER_OVERNATTING = 'UTGIFTER_OVERNATTING',
    LØPENDE_UTGIFTER_EN_BOLIG = 'LØPENDE_UTGIFTER_EN_BOLIG',
    LØPENDE_UTGIFTER_TO_BOLIGER = 'LØPENDE_UTGIFTER_TO_BOLIGER',
    DAGLIG_REISE_OFFENTLIG_TRANSPORT = 'DAGLIG_REISE_OFFENTLIG_TRANSPORT',
}

export const vilkårtypeTilTekst: Record<Vilkårtype, string> = {
    PASS_BARN: 'Vilkår om pass av barn',
    LØPENDE_UTGIFTER_EN_BOLIG: 'Løpende utgifter én bolig',
    LØPENDE_UTGIFTER_TO_BOLIGER: 'Løpende utgifter to boliger',
    UTGIFTER_OVERNATTING: 'Utgifter til overnatting',
    DAGLIG_REISE_OFFENTLIG_TRANSPORT: 'Daglig reise offentlig transport',
};

export enum Vilkårsresultat {
    OPPFYLT = 'OPPFYLT',
    AUTOMATISK_OPPFYLT = 'AUTOMATISK_OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_AKTUELL = 'IKKE_AKTUELL',
    IKKE_TATT_STILLING_TIL = 'IKKE_TATT_STILLING_TIL',
    SKAL_IKKE_VURDERES = 'SKAL_IKKE_VURDERES',
    SLETTET = 'SLETTET',
}

export const resultatTilTekst: Record<Vilkårsresultat, string> = {
    OPPFYLT: 'Oppfylt',
    AUTOMATISK_OPPFYLT: 'Automatisk oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_AKTUELL: 'Ikke aktuell',
    IKKE_TATT_STILLING_TIL: 'Ikke tatt stilling til',
    SKAL_IKKE_VURDERES: 'Skal ikke vurderes',
    SLETTET: 'Slettet', // Denne metoden brukes til delvilkår, men delvilkår kan ikke slettes
};
