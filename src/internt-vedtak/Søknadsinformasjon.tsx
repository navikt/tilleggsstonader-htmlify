import React from 'react';

import { NonBreakingDiv } from './felles';
import { Søknad } from './typer/søknad';

const Søknadsinformasjon: React.FC<{
    søknad?: Søknad;
}> = ({ søknad }) => {
    if (!søknad) return null;
    return (
        <NonBreakingDiv>
            <h1>Søknad</h1>
            <span>{søknad.mottattTidspunkt}</span>
        </NonBreakingDiv>
    );
};

export default Søknadsinformasjon;
