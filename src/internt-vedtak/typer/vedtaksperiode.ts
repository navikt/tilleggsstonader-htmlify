import { AktivitetType, FaktiskMålgruppeType, MålgruppeType } from './målgruppeOgAktivitet';
import { Periode } from '../../felles/periode';

export interface Vedtaksperiode extends Periode {
    målgruppe: MålgruppeType | FaktiskMålgruppeType;
    aktivitet: AktivitetType;
}
