import React from 'react';

import { NonBreakingDiv } from '../felles';
import { Detaljer } from './Detaljer';
import { TypeOgResultat } from './TypeOgResultat';
import { Vilkårperiode } from '../typer/vilkårperiode';

export const VilkårperioderContent: React.FC<{
    navn: 'Målgrupper' | 'Aktiviteter';
    perioder: Vilkårperiode[];
}> = ({ navn, perioder }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>{navn}</h2>
            {perioder.map((periode, indeks) => (
                <NonBreakingDiv
                    className={`vilkaarperiode-rad ${indeks === 0 ? 'first' : ''}`}
                    key={indeks}
                >
                    <TypeOgResultat periode={periode} />
                    <Detaljer periode={periode} />
                </NonBreakingDiv>
            ))}
        </NonBreakingDiv>
    );
};
