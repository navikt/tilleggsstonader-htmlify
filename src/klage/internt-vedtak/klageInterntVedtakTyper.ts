import { Stønadstype } from '../../felles/stønadstype';

export interface KlageDokumentData {
    behandling: BehandlingKlage;
    personopplysninger: PersonopplysningerKlage;
    formkrav: FormkravVilkår;
    vurdering: Vurdering;
}

export interface PersonopplysningerKlage {
    navn: string;
    personIdent: string;
}

export interface BehandlingKlage {
    eksternFagsakId: string;
    stønadstype: Stønadstype;
    klageMottatt: string;
    resultat: KlageBehandlingResultat;
    påklagetVedtak?: PåklagetVedtak;
}

export interface PåklagetVedtak {
    behandlingstype: string;
    resultat: string;
    vedtakstidspunkt: string;
}

export enum KlageBehandlingResultat {
    MEDHOLD = 'MEDHOLD',
    IKKE_MEDHOLD = 'IKKE_MEDHOLD',
    IKKE_MEDHOLD_FORMKRAV_AVVIST = 'IKKE_MEDHOLD_FORMKRAV_AVVIST',
    HENLAGT = 'HENLAGT',
}

export const behandlingResultatTilTekst: Record<KlageBehandlingResultat, string> = {
    MEDHOLD: 'Medhold',
    IKKE_MEDHOLD: 'Oversendt til KA',
    IKKE_MEDHOLD_FORMKRAV_AVVIST: 'Ikke medhold formkrav avvist',
    HENLAGT: 'Henlagt',
};

export interface FormkravVilkår {
    klagePart: FormVilkår;
    klagefristOverholdt: FormVilkår;
    klagefristOverholdtUnntak?: FormkravFristUnntak;
    klageKonkret: FormVilkår;
    klageSignert: FormVilkår;
    saksbehandlerBegrunnelse?: string;
    brevtekst?: string;
}

export enum FormkravFristUnntak {
    UNNTAK_KAN_IKKE_LASTES = 'UNNTAK_KAN_IKKE_LASTES',
    UNNTAK_SÆRLIG_GRUNN = 'UNNTAK_SÆRLIG_GRUNN',
    IKKE_UNNTAK = 'IKKE_UNNTAK',
    IKKE_SATT = 'IKKE_SATT',
}

export const formkravFristUnntakTilTekst: Record<FormkravFristUnntak, string> = {
    UNNTAK_KAN_IKKE_LASTES: 'Ja, klager kan ikke lastes for å ha sendt inn klage etter fristen',
    UNNTAK_SÆRLIG_GRUNN: 'Ja, av særlige grunner er det rimelig at klagen blir behandlet',
    IKKE_UNNTAK: 'Nei',
    IKKE_SATT: 'Ikke satt',
};

export enum FormVilkår {
    OPPFYLT = 'OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    SKAL_IKKE_VURDERES = 'SKAL_IKKE_VURDERES',
    IKKE_SATT = 'IKKE_SATT',
}

export const formVilkårTilTekst: Record<FormVilkår, string> = {
    OPPFYLT: 'Oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    SKAL_IKKE_VURDERES: 'Skal ikke vurderes',
    IKKE_SATT: 'Ikke satt',
};

export interface Vurdering {
    vedtak: TypeVedtak;
    årsak?: ÅrsakOmgjøring;
    begrunnelseOmgjøring?: string;
    hjemmel?: Hjemmel; // TODO fjern når hjemler er tatt i bruk i klage
    hjemler?: Hjemmel[];
    innstillingKlageinstans?: string;
    interntNotat?: string;
}

// VEDTAK
export enum TypeVedtak {
    OMGJØR_VEDTAK = 'OMGJØR_VEDTAK',
    OPPRETTHOLD_VEDTAK = 'OPPRETTHOLD_VEDTAK',
}

export const vedtakTilTekst: Record<TypeVedtak, string> = {
    OMGJØR_VEDTAK: 'Omgjør vedtak',
    OPPRETTHOLD_VEDTAK: 'Oppretthold vedtak',
};

// ÅRSAK
export enum ÅrsakOmgjøring {
    FEIL_I_LOVANDVENDELSE = 'FEIL_I_LOVANDVENDELSE',
    FEIL_REGELVERKSFORSTÅELSE = 'FEIL_REGELVERKSFORSTÅELSE',
    FEIL_ELLER_ENDRET_FAKTA = 'FEIL_ELLER_ENDRET_FAKTA',
    FEIL_PROSESSUELL = 'FEIL_PROSESSUELL',
    KØET_BEHANDLING = 'KØET_BEHANDLING',
    ANNET = 'ANNET',
}

export const årsakTilTekst: Record<ÅrsakOmgjøring, string> = {
    FEIL_I_LOVANDVENDELSE: 'Feil lovanvendelse',
    FEIL_REGELVERKSFORSTÅELSE: 'Feil regelverksforståelse',
    FEIL_ELLER_ENDRET_FAKTA: 'Feil eller endret fakta',
    FEIL_PROSESSUELL: 'Prosessuell feil',
    KØET_BEHANDLING: 'Søker eller den andre forelderen har en åpen behandling',
    ANNET: 'Annet',
};

enum UtlandsavtalerHjemmel {
    UTLAND_EØS = 'UTLAND_EØS',
    UTLAND_EØS_FORORDNINGEN_FEM = 'UTLAND_EØS_FORORDNINGEN_FEM',
    UTLAND_EØS_FORORDNINGEN_SEKS = 'UTLAND_EØS_FORORDNINGEN_SEKS',
    UTLAND_NORDISK = 'UTLAND_NORDISK',
    UTLAND_TRYGDEAVTALER = 'UTLAND_TRYGDEAVTALER',
}

enum ArbeidsmarkedslovenHjemmel {
    ARBML_13 = 'ARBML_13',
    ARBML_17 = 'ARBML_17',
    ARBML_22 = 'ARBML_22',
}

enum FolketrygdlovenHjemmelTS {
    FTRL_11_A_3 = 'FTRL_11_A_3',
    FTRL_11_A_4 = 'FTRL_11_A_4',
    FTRL_11_A_4_3 = 'FTRL_11_A_4_3',
    FTRL_15_11 = 'FTRL_15_11',
    FTRL_17_10 = 'FTRL_17_10',
    FTRL_17_15 = 'FTRL_17_15',
    FTRL_21_12 = 'FTRL_21_12',
    FTRL_22_13 = 'FTRL_22_13',
    FTRL_22_15 = 'FTRL_22_15',
    FTRL_22_17A = 'FTRL_22_17A',
}

enum TilleggsstønadforskriftenHjemmel {
    FS_TILL_ST_1_3_MOBILITET = 'FS_TILL_ST_1_3_MOBILITET',
    FS_TILL_ST_3_REISE = 'FS_TILL_ST_3_REISE',
    FS_TILL_ST_6_FLYTTING = 'FS_TILL_ST_6_FLYTTING',
    FS_TILL_ST_8_BOLIG = 'FS_TILL_ST_8_BOLIG',
    FS_TILL_ST_10_TILSYN = 'FS_TILL_ST_10_TILSYN',
    FS_TILL_ST_12_LAEREMIDLER = 'FS_TILL_ST_12_LAEREMIDLER',
    FS_TILL_ST_15_2 = 'FS_TILL_ST_15_2',
    FS_TILL_ST_15_3 = 'FS_TILL_ST_15_3',
}

enum ForeldeseslovenHjemmel {
    FL_2_3 = 'FL_2_3',
    FL_10 = 'FL_10',
}

enum ForvaltningslovenHjemmel {
    FVL_11 = 'FVL_11',
    FVL_17 = 'FVL_17',
    FVL_18_19 = 'FVL_18_19',
    FVL_35 = 'FVL_35',
    FVL_41 = 'FVL_41',
    FVL_42 = 'FVL_42',
}

export type Hjemmel =
    | UtlandsavtalerHjemmel
    | ArbeidsmarkedslovenHjemmel
    | FolketrygdlovenHjemmelTS
    | TilleggsstønadforskriftenHjemmel
    | ForeldeseslovenHjemmel
    | ForvaltningslovenHjemmel;

const utlandsavtalerVisningstekster: Record<UtlandsavtalerHjemmel, string> = {
    UTLAND_EØS: 'EØS-avtalen',
    UTLAND_EØS_FORORDNINGEN_FEM: 'EØS-forordningen art. 5',
    UTLAND_EØS_FORORDNINGEN_SEKS: 'EØS-forordningen art. 6',
    UTLAND_NORDISK: 'Nordisk konvensjon',
    UTLAND_TRYGDEAVTALER: 'Trygdeavtaler',
};

const arbeidsmarkedslovenVisningstekster: Record<ArbeidsmarkedslovenHjemmel, string> = {
    ARBML_13: 'Arb.mark.lov § 13',
    ARBML_17: 'Arb.mark.lov § 17',
    ARBML_22: 'Arb.mark.lov § 22',
};

const folketrygdlovenTSVisningstekster: Record<FolketrygdlovenHjemmelTS, string> = {
    FTRL_11_A_3: 'Ftrl. § 11 A-3',
    FTRL_11_A_4: 'Ftrl. § 11 A-4',
    FTRL_11_A_4_3: 'Ftrl. § 11 A-4 3. ledd',
    FTRL_15_11: 'Ftrl. § 15-11',
    FTRL_17_10: 'Ftrl. § 17-10',
    FTRL_17_15: 'Ftrl. § 17-15',
    FTRL_21_12: 'Ftrl. § 21-12',
    FTRL_22_13: 'Ftrl. § 22-13',
    FTRL_22_15: 'Ftrl. § 22-15',
    FTRL_22_17A: 'Ftrl. § 22-17a',
};

const tilleggsstønadforskriftenVisningstekster: Record<TilleggsstønadforskriftenHjemmel, string> = {
    FS_TILL_ST_1_3_MOBILITET: 'Til.st.forskr. § 1 3. ledd',
    FS_TILL_ST_3_REISE: 'Til.st.forskr § 3',
    FS_TILL_ST_6_FLYTTING: 'Til.st.forskr. § 6',
    FS_TILL_ST_8_BOLIG: 'Til.st.forskr. § 8',
    FS_TILL_ST_10_TILSYN: 'Til.st.forskr. § 10',
    FS_TILL_ST_12_LAEREMIDLER: 'Til.st.forskr. § 12',
    FS_TILL_ST_15_2: 'Til.st.forskr § 15 2. ledd',
    FS_TILL_ST_15_3: 'Til.st.forskr. § 15 3. ledd',
};

const foreldeseslovenVisningstekster: Record<ForeldeseslovenHjemmel, string> = {
    FL_2_3: 'Foreld.lov §§ 2 og 3',
    FL_10: 'Foreld.lov § 10',
};

const forvaltningslovenVisningstekster: Record<ForvaltningslovenHjemmel, string> = {
    FVL_11: 'Fvl. § 11',
    FVL_17: 'Fvl. § 17 ',
    FVL_18_19: 'Fvl. §§ 18 og 19 ',
    FVL_35: 'Fvl. § 35',
    FVL_41: 'Fvl. § 41 ',
    FVL_42: 'Fvl. § 42',
};

export const hjemmelTilVisningstekst: Record<Hjemmel, string> = {
    ...utlandsavtalerVisningstekster,
    ...arbeidsmarkedslovenVisningstekster,
    ...folketrygdlovenTSVisningstekster,
    ...tilleggsstønadforskriftenVisningstekster,
    ...foreldeseslovenVisningstekster,
    ...forvaltningslovenVisningstekster,
};
