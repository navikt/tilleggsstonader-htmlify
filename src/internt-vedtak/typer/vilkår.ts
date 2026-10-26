import { SvarVurdering } from './vilkårperiode';
import { tekstEllerFeil } from '../../felles/tekstutils';

export interface Vilkår {
    type: Vilkårtype;
    resultat: Vilkårsresultat;
    delvilkår: DelvilkårInternt[];
    fødselsdatoBarn?: string;
    fom?: string;
    tom?: string;
    utgift?: number;
    slettetKommentar?: string;
    fakta?: VilkårFakta;
}

export type VilkårFakta =
    | FaktaDagligReiseOffentligTransport
    | FaktaDagligReisePrivatBil
    | FaktaReiseTilSamlingOffentligTransport
    | FaktaReiseTilSamlingPrivatBil
    | FaktaFlyttebyrå
    | FaktaFlyttingSelv
    | FaktaFlyttingUbestemt;

export interface VilkårFaktaBase {
    adresse?: string;
    type: VilkårFaktaType;
}

export interface ReiseVilkårFaktaBase extends VilkårFaktaBase {
    reiseId: string;
}

export interface FaktaDagligReiseOffentligTransport extends ReiseVilkårFaktaBase {
    type: VilkårFaktaType.DAGLIG_REISE_OFFENTLIG_TRANSPORT;
    reisedagerPerUke: number;
    prisEnkelbillett?: number | null;
    prisSyvdagersbillett?: number | null;
    prisTrettidagersbillett?: number | null;
}

export interface FaktaDagligReisePrivatBil extends ReiseVilkårFaktaBase {
    type: VilkårFaktaType.DAGLIG_REISE_PRIVAT_BIL;
    reiseavstandEnVei: number;
    faktaDelperioder: FaktaDelperiodeDagligReisePrivatBil[];
    aktivitetId: string;
}

export interface FaktaDelperiodeDagligReisePrivatBil {
    fom: string;
    tom: string;
    reisedagerPerUke: number;
    bompengerPerDag?: number;
    fergekostnadPerDag?: number;
}
export interface FaktaReiseTilSamlingOffentligTransport extends ReiseVilkårFaktaBase {
    type: VilkårFaktaType.REISE_TIL_SAMLING_OFFENTLIG_TRANSPORT;
    nødvendigUtgift: NødvendigUtgiftReiseTilSamling;
    utgifterOffentligTransport: number;
    begrunnelse?: string;
    aktivitetId?: string;
}
export interface FaktaReiseTilSamlingPrivatBil extends ReiseVilkårFaktaBase {
    type: VilkårFaktaType.REISE_TIL_SAMLING_PRIVAT_BIL;
    nødvendigUtgift: NødvendigUtgiftReiseTilSamling;
    reiseAvstand: number;
    bompenger?: number | null;
    fergekostnad?: number | null;
    parkering?: number | null;
    piggdekkavgift?: number | null;
    begrunnelse?: string;
    aktivitetId?: string;
}

export interface NødvendigUtgiftReiseTilSamling {
    erUtgiftenNødvendig: SvarVurdering;
    begrunnelse?: string;
}

export interface FaktaFlyttebyrå extends VilkårFaktaBase {
    type: VilkårFaktaType.FLYTTING_FLYTTEBYRÅ;
    tilbud: TilbudFlyttebyrå[];
    erUtgifterDokumentert: boolean;
    nødvendigUtgift: NødvendigUtgiftReiseTilSamling;
}

export interface FaktaFlyttingSelv extends VilkårFaktaBase {
    type: VilkårFaktaType.FLYTTING_FLYTTE_SELV;
    erUtgifterDokumentert: boolean;
    avstandEnVei: number | null;
    henger: number | null;
    bompenger: number | null;
    ferge: number | null;
    parkering: number | null;
    nødvendigUtgift: NødvendigUtgiftReiseTilSamling;
}

export interface FaktaFlyttingUbestemt extends VilkårFaktaBase {
    type: VilkårFaktaType.FLYTTING_UBESTEMT;
}

export interface TilbudFlyttebyrå {
    navn: string | null;
    pris: number | null;
}

export enum VilkårFaktaType {
    DAGLIG_REISE_PRIVAT_BIL = 'DAGLIG_REISE_PRIVAT_BIL',
    DAGLIG_REISE_OFFENTLIG_TRANSPORT = 'DAGLIG_REISE_OFFENTLIG_TRANSPORT',
    REISE_TIL_SAMLING_OFFENTLIG_TRANSPORT = 'REISE_TIL_SAMLING_OFFENTLIG_TRANSPORT',
    REISE_TIL_SAMLING_PRIVAT_BIL = 'REISE_TIL_SAMLING_PRIVAT_BIL',
    FLYTTING_FLYTTEBYRÅ = 'FLYTTING_FLYTTEBYRÅ',
    FLYTTING_FLYTTE_SELV = 'FLYTTING_FLYTTE_SELV',
    FLYTTING_UBESTEMT = 'FLYTTING_UBESTEMT',
}

export const vilkårFaktaTypeTilTeXt: Record<VilkårFaktaType, string> = {
    DAGLIG_REISE_OFFENTLIG_TRANSPORT: 'Offentlig transport',
    DAGLIG_REISE_PRIVAT_BIL: 'Privat bil',
    REISE_TIL_SAMLING_OFFENTLIG_TRANSPORT: 'Offentlig transport',
    REISE_TIL_SAMLING_PRIVAT_BIL: 'Privat bil',
    FLYTTING_FLYTTEBYRÅ: 'Flyttebyrå',
    FLYTTING_FLYTTE_SELV: 'Flytting selv',
    FLYTTING_UBESTEMT: 'Ubestemt flytting',
};

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
    DAGLIG_REISE = 'DAGLIG_REISE',
    REISE_TIL_SAMLING = 'REISE_TIL_SAMLING',
    FLYTTING = 'FLYTTING',
}

export const vilkårtypeTilTekst: Record<Vilkårtype, string> = {
    PASS_BARN: 'Vilkår om pass av barn',
    LØPENDE_UTGIFTER_EN_BOLIG: 'Løpende utgifter én bolig',
    LØPENDE_UTGIFTER_TO_BOLIGER: 'Løpende utgifter to boliger',
    UTGIFTER_OVERNATTING: 'Utgifter til overnatting',
    DAGLIG_REISE: 'Vilkår om daglige reiser',
    REISE_TIL_SAMLING: 'Vilkår om reise til samling',
    FLYTTING: 'Vilkår om flytting',
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

export const vilkårTitle = (vilkår: Vilkår): string => {
    if (vilkår.type === Vilkårtype.DAGLIG_REISE && vilkår.fakta?.type) {
        return `Vilkår om daglige reiser ${vilkårFaktaTypeTilTeXt[vilkår.fakta.type] ?? 'ukjent type'}`;
    }
    return tekstEllerFeil(vilkårtypeTilTekst, vilkår.type) ?? 'Ukjent vilkår';
};

export const erFaktaDagligReiseOffentligTransport = (
    fakta: VilkårFakta
): fakta is FaktaDagligReiseOffentligTransport =>
    fakta.type === VilkårFaktaType.DAGLIG_REISE_OFFENTLIG_TRANSPORT;

export const erFaktaDagligReisePrivatBil = (
    fakta: VilkårFakta
): fakta is FaktaDagligReisePrivatBil => fakta.type === VilkårFaktaType.DAGLIG_REISE_PRIVAT_BIL;

export const erFaktaReiseTilSamlingOffentligTransport = (
    fakta: VilkårFakta
): fakta is FaktaReiseTilSamlingOffentligTransport =>
    fakta.type === VilkårFaktaType.REISE_TIL_SAMLING_OFFENTLIG_TRANSPORT;

export const erFaktaReiseTilSamlingPrivatBil = (
    fakta: VilkårFakta
): fakta is FaktaReiseTilSamlingPrivatBil =>
    fakta.type === VilkårFaktaType.REISE_TIL_SAMLING_PRIVAT_BIL;

export const erFaktaFlyttebyrå = (fakta: VilkårFakta): fakta is FaktaFlyttebyrå =>
    fakta.type === VilkårFaktaType.FLYTTING_FLYTTEBYRÅ;

export const erFaktaFlyttingSelv = (fakta: VilkårFakta): fakta is FaktaFlyttingSelv =>
    fakta.type === VilkårFaktaType.FLYTTING_FLYTTE_SELV;

export const erFaktaFlyttingUbestemt = (fakta: VilkårFakta): fakta is FaktaFlyttingUbestemt =>
    fakta.type === VilkårFaktaType.FLYTTING_UBESTEMT;
