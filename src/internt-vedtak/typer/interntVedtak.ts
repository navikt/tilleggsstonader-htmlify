import { Søknad } from './søknad';
import { Vedtak } from './vedtak';
import { Vilkår } from './vilkår';
import { Stønadsperiode, Vilkårperiode } from './vilkårperiode';
import { Stønadstype } from '../../felles/stønadstype';

export interface InterntVedtak {
    behandling: Behandlinginfo;
    søknad?: Søknad;
    målgrupper: Vilkårperiode[];
    aktiviteter: Vilkårperiode[];
    stønadsperioder: Stønadsperiode[];
    vilkår: Vilkår[];
    vedtak: Vedtak;
}
// utgifter for tilsyn barn
// satt på vent?

export interface Behandlinginfo {
    behandlingId: string;
    eksternFagsakId: number;
    stønadstype: Stønadstype;
    årsak: ÅrsakBehandling;
    ident: string;
    opprettetTidspunkt: string;
    resultat: ResultatBehandling;
    vedtakstidspunkt: string;
    saksbehandler: string;
    beslutter?: string;
}

export enum ÅrsakBehandling {
    KLAGE = 'KLAGE',
    NYE_OPPLYSNINGER = 'NYE_OPPLYSNINGER',
    SØKNAD = 'SØKNAD',
    KORRIGERING_UTEN_BREV = 'KORRIGERING_UTEN_BREV',
    PAPIRSØKNAD = 'PAPIRSØKNAD',
    SATSENDRING = 'SATSENDRING',
    MANUELT_OPPRETTET = 'MANUELT_OPPRETTET',
}

export const årsakBehandlingTilTekst: Record<ÅrsakBehandling, string> = {
    KLAGE: 'Klage',
    NYE_OPPLYSNINGER: 'Nye opplysninger',
    SØKNAD: 'Søknad',
    KORRIGERING_UTEN_BREV: 'Korrigering uten brev',
    PAPIRSØKNAD: 'Papirsøknad',
    SATSENDRING: 'Satsendring',
    MANUELT_OPPRETTET: 'Manuelt opprettet',
};

export enum ResultatBehandling {
    INNVILGET = 'INNVILGET',
    OPPHØRT = 'OPPHØRT',
    AVSLÅTT = 'AVSLÅTT',
}

export const resultatBehandlingTilTekst: Record<ResultatBehandling, string> = {
    INNVILGET: 'Innvilget',
    OPPHØRT: 'Opphørt',
    AVSLÅTT: 'Avslått',
};
