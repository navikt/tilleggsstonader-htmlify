export interface Vilkår {
    resultat: Vilkårsresultat;
    type: Vilkårtype;
    delvilkår: DelvilkårInternt[];
    fødselsdatoBarn?: string;
    fom?: string;
    tom?: string;
    utgift?: number;
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
}

export const vilkårtypeTilTekst: Record<Vilkårtype, string> = {
    PASS_BARN: 'Vilkår om pass av barn',
};

export enum Vilkårsresultat {
    OPPFYLT = 'OPPFYLT',
    AUTOMATISK_OPPFYLT = 'AUTOMATISK_OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_AKTUELL = 'IKKE_AKTUELL',
    IKKE_TATT_STILLING_TIL = 'IKKE_TATT_STILLING_TIL',
    SKAL_IKKE_VURDERES = 'SKAL_IKKE_VURDERES',
}

export const resultatTilTekst: Record<Vilkårsresultat, string> = {
    OPPFYLT: 'Oppfylt',
    AUTOMATISK_OPPFYLT: 'Automatisk oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_AKTUELL: 'Ikke aktuell',
    IKKE_TATT_STILLING_TIL: 'Ikke tatt stilling til',
    SKAL_IKKE_VURDERES: 'Skal ikke vurderes',
};
