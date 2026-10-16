import { OffentligTransportTabell } from './OffentligTransportTabell';
import { PrivatBilTabell } from './PrivatBilTabell';
import { BeregningsresultatDagligReise } from '../../typer/beregningsresultatDagligeReiser';

export const DagligReiseBeregningsresultatTabell: React.FC<{
    beregningsresultat: BeregningsresultatDagligReise;
}> = ({ beregningsresultat }) => {
    const { offentligTransport, privatBil } = beregningsresultat;

    return (
        <>
            {offentligTransport && (
                <OffentligTransportTabell offentligTransportReiser={offentligTransport.reiser} />
            )}
            {privatBil && <PrivatBilTabell reiser={privatBil} />}
        </>
    );
};
