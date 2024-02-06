import React from 'react';

import { NonBreakingDiv } from './felles';
import { Søknad } from './typer/søknad';
import { formaterNorskDatoTid } from '../felles/datoFormat';

const Søknadsinformasjon: React.FC<{
    søknad?: Søknad;
}> = ({ søknad }) => {
    if (!søknad) return null;
    return (
        <NonBreakingDiv>
            <h2>Søknad</h2>
            <div>Mottatt tidspunkt: {formaterNorskDatoTid(søknad.mottattTidspunkt)}</div>
        </NonBreakingDiv>
    );
};

export default Søknadsinformasjon;
