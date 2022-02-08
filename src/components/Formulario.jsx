import React, {useEffect,useState} from 'react';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import styled from '@emotion/styled';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

const Boton = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({setMoneda, setCriptomoneda}) => {

    //State listado de Criptomonedas

    const [listacripto, setListaCripto] = useState([]);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de los Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'COP', nombre: 'Peso Colombianos'},
    ]
    // customHooks useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);
    const [error, setError] = useState(false);

    // customHooks useCriptomoneda
    const [criptomoneda, SelectCripto,] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);
    

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD#';
            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }

        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }
    
    return ( 
        <form onSubmit={cotizarMoneda} >
        {
            error ? <Error mensaje="Todos los campos son obligatorios"/>: null
        }
            <SelectMonedas />
            <SelectCripto />
            <Boton type="submit">Calcular</Boton>
        </form>
     );
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired
}

export default Formulario;