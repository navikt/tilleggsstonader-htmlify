interface Props {
    enhet: string;
    saksbehandlersignatur?: string;
    besluttersignatur?: string;
}
export const Signatur = (props: Props) => {
    const { enhet, saksbehandlersignatur, besluttersignatur } = props;
    return (
        <div>
            <br />
            <p style={{ float: 'left' }}>
                <div>Med vennlig hilsen </div>
                <div>{enhet}</div>
                <br />
                {saksbehandlersignatur && (
                    <div style={{ marginRight: '20px' }}>
                        {saksbehandlersignatur}{' '}
                        {besluttersignatur && (
                            <span style={{ marginLeft: '20px' }}>{besluttersignatur}</span>
                        )}
                    </div>
                )}
            </p>
        </div>
    );
};
