import React from 'react';

import { NonBreakingDiv } from './felles';
import { Stønadsperiode } from './typer/vilkårperiode';
import { formaterPeriode } from '../felles/datoFormat';

const StønadsperiodeRad: React.FC<{ periode: Stønadsperiode }> = ({ periode }) => {
    return (
        <NonBreakingDiv>
            <div>
                <strong>Målgruppe:</strong>
                {periode.målgruppe}
            </div>
            <div>
                <strong>Aktivitet:</strong>
                {periode.aktivitet}
            </div>
            <div>{formaterPeriode(periode)}</div>
        </NonBreakingDiv>
    );
};

const StønadsperioderContent: React.FC<{
    perioder: Stønadsperiode[];
}> = ({ perioder }) => {
    return (
        <NonBreakingDiv>
            <h2>Stønadsperioder</h2>
            {perioder.map((periode, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <hr />}
                    <StønadsperiodeRad periode={periode} />
                </React.Fragment>
            ))}
        </NonBreakingDiv>
    );
};

export default StønadsperioderContent;
