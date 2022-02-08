import styled from '@emotion/styled';
import React, {Fragment, useState} from 'react';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCriptomoneda = (label, stateInicial, opciones) => {
    // State de nuestro customHook
    const [state, setState] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label htmlFor="">{label}</Label>
            <Select onChange={e => setState(e.target.value)} value={state}>
                <option value="">-- Seleccione --</option>
                {
                    opciones.map(opcion => (
                        <option value={opcion.CoinInfo.Name} key={opcion.CoinInfo.Id}>{opcion.CoinInfo.FullName}</option>
                    ))
                }
            </Select>
        </Fragment>
    );

    // Retonar state, interfaz y fin que modifica el state

    return [state, SelectCripto, setState];
}

export default useCriptomoneda;