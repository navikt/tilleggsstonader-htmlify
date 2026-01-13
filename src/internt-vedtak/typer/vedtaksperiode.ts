import { AktivitetType, FaktiskMålgruppeType } from './målgruppeOgAktivitet';
import { Periode } from '../../felles/periode';

export interface Vedtaksperiode extends Periode {
    målgruppe: FaktiskMålgruppeType;
    aktivitet: AktivitetType;
    tilltaksvariant?: string;
}
