import { OffentligTransportTabell } from './OffentligTransportTabell';
import { PrivatBilTabell } from './PrivatBilTabell';
import { BeregningsresultatDagligReise } from '../typer/beregningsresultat';

export const DagligReiseBeregningsresultatTabell: React.FC<{
    beregningsresultatDagligReise: BeregningsresultatDagligReise;
}> = ({ beregningsresultatDagligReise }) => {
    const offentligTransport = beregningsresultatDagligReise.offentligTransport?.reiser ?? [];
    const privatBil = beregningsresultatDagligReise.privatBil?.reiser ?? [];

    return (
        <>
            {offentligTransport.length > 0 && (
                <OffentligTransportTabell offentligTransportReiser={offentligTransport} />
            )}
            {privatBil.length > 0 && <PrivatBilTabell privatBilReiser={privatBil} />}
        </>
    );
};
