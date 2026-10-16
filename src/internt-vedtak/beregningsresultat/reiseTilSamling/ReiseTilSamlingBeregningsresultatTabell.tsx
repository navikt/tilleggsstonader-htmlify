import { OffentligTransportSamlingTabell } from './OffentligTransportSamlingTabell';
import { PrivatBilSamlingTabell } from './PrivatBilSamlingTabell';
import { BeregningsresultatReiseTilSamling } from '../../typer/beregningsresultatReiseTilSamling';

export const ReiseTilSamlingBeregningsresultatTabell: React.FC<{
    beregningsresultat: BeregningsresultatReiseTilSamling;
}> = ({ beregningsresultat }) => {
    const { offentligTransport, privatBil } = beregningsresultat;

    return (
        <>
            {offentligTransport && (
                <OffentligTransportSamlingTabell samlinger={offentligTransport} />
            )}
            {privatBil && <PrivatBilSamlingTabell samlinger={privatBil} />}
        </>
    );
};
