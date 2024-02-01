import { Søknad } from './søknad';
import { Stønadsperiode, Vilkårperiode } from './vilkårperiode';
import { Stønadstype } from '../../felles/stønadstype';

export interface InterntVedtak {
    behandling: Behandlinginfo;
    søknad?: Søknad;
    målgrupper: Vilkårperiode[];
    aktiviteter: Vilkårperiode[];
    stønadsperioder: Stønadsperiode[];
}
// utgifter for tilsyn barn
// satt på vent?

export interface Behandlinginfo {
    behandlingId: string;
    eksternFagsakId: number;
    stønadstype: Stønadstype;
    årsak: string;
    ident: string;
    opprettetTidspunkt: string;
    resultat: string;
    vedtakstidspunkt: string;
    saksbehandler: string;
    beslutter?: string;
}
