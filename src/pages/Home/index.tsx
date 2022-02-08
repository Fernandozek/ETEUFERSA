import React, { useState } from "react";
import calc from '../../utils/calc';
import PageTemplate from "../Template";
import styled from "styled-components";
import Input from '../../components/Input';
import Result from '../Result';
import 'antd/dist/antd.css';
import { message } from 'antd';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .ant-message-notice-content{
        background: red;
    } 
    .ant-message-custom-content{

    } 
    .ant-message-success {
        background: red;

    }
`
const Painel = styled.div`
    width: 750px;
    height: 100%;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 130px;
    background-color: white;
`
const Title = styled.h2`
    color: #828282;
    text-align: center;
    margin: 10px 0;
`
const TopInputs = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: auto auto auto auto;
    padding: 10px;
`
const Item = styled.div`
    display: flex;
    height: 60px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
const Label = styled.label`
    font-size: 15px;
    color: #828282;
`
const BottomInputs = styled.div`
    width: 343px;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: auto auto;
    padding: 10px;
`
const ButtonCalc = styled.div`
    width: 100%;
    button{
        width: 150px;
        height: 40px;
        margin-left: 76%;
        margin-right: 0;
        padding: 10px;
        text-align: center;
        border: none;
        border-radius: 8px;
        background-color: var(--primaria);
        outline: none;
        font-size: 15px;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
    
`
function Home(){
    const [populacao, setPopulacao] = useState("");
    const [vazaoAfluente, setvazaoAfluente] = useState("");
    const [DBOAfluente, setDBOAfluente] = useState("");
    const [temperatura, setTemperatura] = useState("");
    const [taxaVolumetrica, setTaxaVolumetrica] = useState("");
    const [taxaAcumulo, setTaxaAcumulo] = useState("");
    const [quantidadeLagoas, setQuantidadeLagoas] = useState("");
    const [proporcao, setProporcao] = useState("");
    const [k, setK] = useState("");
    const [hAnaerobia, setHAnaerobia] = useState("");
    const [hFacultativa, setHFacultativa] = useState("");
    const [calculated, setCalculated] = useState(false);
    let [vet1, setVet1] = useState([Number()])
    let [vet2, setVet2] = useState([Number()])
    
    // console.log(populacao);
    const success = () => {
        message.success({
            content: 'Dimensionamento efetuado com sucesso!',
            className: 'custom-class',
            style: {
                marginTop: '10vh',
            }
        });
    };

    const error = () => {
        message.error({
            content: 'Preencha os campos corretamente!',
            className: 'custom-class',
            style: {
                marginTop: '10vh',
            },
        });
    };

    function calcular(){
        if( Number(populacao) > 0 &&
            Number(vazaoAfluente) > 0 &&
            Number(DBOAfluente) > 0 &&
            Number(temperatura) > 0 &&
            Number(taxaVolumetrica) > 0 &&
            Number(taxaAcumulo) > 0 &&
            Number(quantidadeLagoas) > 0 &&
            Number(proporcao) >= 0 &&
            Number(hAnaerobia) > 0 &&
            Number(hFacultativa) > 0 ){
                setCalculated(true);
                // const [vet1, vet2] = calc.dimensionamento(20.000, 3.000, 350, 23, 4.5, 1.8,  0.15, 0.04,2, 3);
                const [vet1, vet2] = calc.dimensionamento(Number(populacao), Number(vazaoAfluente), Number(DBOAfluente), Number(temperatura), Number(taxaVolumetrica), Number(taxaAcumulo), Number( quantidadeLagoas), Number(proporcao), Number(k), Number(hAnaerobia), Number(hFacultativa));
                setVet1(vet1);
                setVet2(vet2);
                success();
            }else{
                error()
            }
    }
    
    return(
        <PageTemplate
            imageSrc={true}
            title={true}
            topBar={true}
        >
            <Container>
                <Painel>
                    <Title>Painel de entrada de dados</Title>
                    <TopInputs>
                        <Item>
                            <Label>População</Label>
                            <Input type="number" err={Number(populacao) > 0} func={setPopulacao} />
                        </Item>
                        <Item>
                            <Label>Vazão afluente</Label>
                            <Input type="number" err={Number(vazaoAfluente) > 0} func={setvazaoAfluente} />
                        </Item>
                        <Item>
                            <Label>DBO afluente</Label>
                            <Input type="number" err={Number(DBOAfluente) > 0} func={setDBOAfluente} />
                        </Item>
                        <Item>
                            <Label>Temperatura °C</Label>
                            <Input type="number" err={Number(temperatura) > 0} func={setTemperatura} />
                        </Item>
                        <Item>
                            <Label>Taxa volumétrica</Label>
                            <Input type="number" err={Number(taxaVolumetrica) > 0} func={setTaxaVolumetrica} />
                        </Item>
                        <Item>
                            <Label>Taxa de acúmulo</Label>
                            <Input type="number" err={Number(taxaAcumulo) > 0} func={setTaxaAcumulo} />
                        </Item>
                        <Item>
                            <Label>Quantidade de lagoas</Label>
                            <Input type="number" err={Number(quantidadeLagoas) > 0} func={setQuantidadeLagoas} />
                        </Item>
                        <Item>
                            <Label>Proporção/1</Label>
                            <Input type="number" err={Number(proporcao) >= 0} func={setProporcao} />
                        </Item>
                        <Item>
                            <Label>K</Label>
                            <Input type="number" err={Number(k) > 0} func={setK} />
                        </Item>
                    </TopInputs>
                    <div style={{margin: '20px 0', color: "#828282", fontSize: "15px"}}>Adote profundidades (m) para as lagoas de estabilização! </div>
                    <BottomInputs>
                        <Item>
                            <Label>Anaeróbica</Label>
                            <Input type="number" err={Number(hAnaerobia) > 0 ? true : false} func={setHAnaerobia} />
                        </Item>
                        <Item>
                            <Label>Facultativa</Label>
                            <Input type="number" err={Number(hFacultativa) > 0 ? true : false}  func={setHFacultativa} />
                        </Item>
                    </BottomInputs>
                    <ButtonCalc>
                        <button onClick={calcular}>Dimensionar</button>
                    </ButtonCalc>
                </Painel>
                {calculated &&
                    <Result vet1={vet1} vet2={vet2} lagoas={quantidadeLagoas}/>
                }
            </Container>
        </PageTemplate>
    )
}

export default Home;