import React from 'react';

import { NonBreakingDiv } from './felles';
import { Stønadsperiode } from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';

const StønadsperiodeRad: React.FC<{ periode: Stønadsperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv>
            <span>{periode.målgruppe}</span>
            <span>{periode.aktivitet}</span>
            <span>{formaterPeriode(periode)}</span>
        </NonBreakingDiv>
    );
};

const StønadsperioderContent: React.FC<{
    perioder: Stønadsperiode[];
}> = ({ perioder }) => {
    return (
        <NonBreakingDiv>
            <h1>Stønadsperioder</h1>
            {perioder.map((periode, index) => (
                <StønadsperiodeRad key={index} periode={periode} />
            ))}
        </NonBreakingDiv>
    );
};

export default StønadsperioderContent;
