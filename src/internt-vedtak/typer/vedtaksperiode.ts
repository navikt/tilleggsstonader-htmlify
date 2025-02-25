import { TypeStønadsperiode } from './vilkårperiode';
import { Periode } from '../../felles/periode';

export interface Vedtaksperiode extends Periode {
    målgruppe: TypeStønadsperiode;
    aktivitet: TypeStønadsperiode;
}
