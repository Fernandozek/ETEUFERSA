import React,{ useRef } from "react";
import styled from "styled-components";
import jsPDF from 'jspdf';

const Page = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 63vw;
    padding: 10px;
    display: flex;
    margin-bottom: 30px;
    align-items: start;
    justify-content: space-around;
`

const Card = styled.div`
    width: 400px;
    height: 100%;
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleCard = styled.h2`
    color: var(--primaria);
    margin-bottom: 20px;
    font-weight: bold;
`

const Item = styled.div`
    width: 100%;
    padding-bottom: 5px;
    margin-bottom: 10px;
    text-height: 16px;
    font-size: 16px;
    border-bottom: 1px solid #828282;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        margin-bottom: 0;
    }
`

const Description = styled.p`
    font-weight: 500;
    cursor: help;
    position: relative;
    display: inline-block;

    .tooltiptext {
        visibility: hidden;
        min-width: 200px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 10%;
        margin-left: -105px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    :hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
`

const Value = styled.p`

`

const GraficContainer = styled.div`
    width: 100%;
    margin-top: 40px;
    padding: 10px;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Grafic = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Retangle = styled.div`
    position: relative;
    background: #83D2FF3B;
    border: 1px solid #828282;
`

const Anaerobia = styled.div`
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: center;
`

const Facultativa = styled.div`
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: center;
`

const TTop = styled.p`
    position: absolute;
    top: 2%;
    left: 40%;
    text-align: center;
    margin-bottom: 0;
`

const TRight = styled.p`
    position: absolute;
    top: 40%;
    left: 101%;
    text-align: right;
`

const PDFButton = styled.div`
    width: 100%;
    margin-top: 20px;
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
function Result(props: any) {
    const vet1 = props.vet1
    const vet2 = props.vet2
    let l = props.lagoas
    let list = []

    while (l > 0) {
        list.push(props.lagoas)
        l--
    }
    const canvas = useRef<HTMLCanvasElement>(null);

    const jsPdfGenerator = () => {
        var doc = new jsPDF('p', 'pt');
        doc.setFont('courier');
        doc.setFontSize(10);
        doc.text('ESTAÇÃO  DE  TRATAMENTO  DE  ESGOTO  UNIVERSIDADE  FEDERAL RURAL DO', 80, 50, {align: 'justify'});
        doc.text('SEMI-ÁRIDO - UFERSA', 80, 63);
        doc.text('Este programa é destinado à realização do pré-dimensionamento para', 80, 80);
        doc.text('uma estação de tratamento de esgoto do tipo anaeróbia seguida por', 80, 93);
        doc.text('lagoa facultativa (sistema australiano)', 80, 106);

        doc.setLineWidth(0.5);
        doc.line(485, 115, 80, 115);
        
        doc.text('Lagoa Anaeróbia', 80, 150);
        doc.text('Carga afluente de DBO =' + `${vet1[0].toFixed(3)} kgDBO/m³.d`, 100, 170);
        doc.text('Volume resultante da lagoa anaeróbia =' + `${vet1[1]} m³`, 100, 183);
        doc.text('Tempo de detenção =' + `${(vet1[2] / 1000).toFixed(1)} dia`, 100, 196);
        doc.text('Área requerida =' + `${(vet1[3] / 1000).toFixed(0)} m²`, 100, 209);
        doc.text('Acúmulo de lodo na lagoa anaeróbia =' + `${vet1[4]} m³/ano`, 100, 222);
        doc.text('Expessura da camada de lodo em 1 ano =' + `${vet1[5]}  cm/ano`, 100, 235);
        doc.text('Tempo para se atingir 1/3 da altura útil das lagoas =' + `${(vet1[6]).toFixed(1)} ano(s)`, 100, 248);
        
        doc.text('Lagoa Facultativa', 80, 285);

        doc.text('Carga afluente à lagoa facultativa =' + `${vet2[0]} kgDBO/d`, 100, 305);
        doc.text('Área requerida =' + `${vet2[1].toFixed(1)} ha (${((Number(vet2[1].toFixed(1)))).toFixed(3)} m²)`, 100, 318);
        doc.text('Área individual para cada ladoa facultativa =' + `${vet2[2].toFixed(1)} m²`, 100, 331);
        doc.text('volume resultante da lagoa facultativa =' + `${(vet2[3] / 1000).toFixed(3)} m³`, 100, 344);
        doc.text('Tempo de detenção Resultante =' + `${vet2[4].toFixed(2)} m³/ano`, 100, 357);
        doc.text('Correção para a temperatura de 23°C =' + `${vet2[5]}  cm/ano`, 100, 370);
        doc.text('Estimativa da DBO solúvel efluente =' + `${vet2[6].toFixed(0)} mg/l`, 100, 383);
        doc.text('Estimativa da DBO particulada efluente =' + `${(vet2[7])} mgDBO`, 100, 396);
        doc.text('DBO total efluente =' + `${vet2[8]} mg/l`, 100, 409);
        
        doc.text('Sistema Australiano', 80, 445);

        doc.text('Eficiência =' + `${vet2[9]}%`, 100, 465);
        doc.text('Area útil total =' + `${vet2[10]} ha`, 100, 478);
        doc.text('Area Total =' + `${vet2[11]} ha`, 100, 491);
        doc.text('Area per capita =' + `${vet2[12]} m²/hab`, 100, 504);
        
        let linha = 30;
        
        doc.output('dataurlnewwindow');
    
    }

    return (
        <Page>
            <Container>
                <Card>
                    <TitleCard>Lagoa Anaeróbia</TitleCard>
                    <Item>
                        <Description>Carga afluente de DBO
                            <span className="tooltiptext">Carga afluente de DBO</span>
                        </Description>
                        <Value>{vet1[0].toFixed(3)} kgDBO/m³.d</Value>
                    </Item>
                    <Item>
                        <Description>Volume
                            <span className="tooltiptext">Volume resultante da lagoa anaeróbia</span>
                        </Description>
                        <Value>{vet1[1]} m³</Value>
                    </Item>
                    <Item>
                        <Description>Tempo
                            <span className="tooltiptext">Tempo de detenção</span>
                        </Description>
                        <Value>{(vet1[2] / 1000).toFixed(1)} dia</Value>
                    </Item>
                    <Item>
                        <Description>Área
                            <span className="tooltiptext">Área requerida</span>
                        </Description>
                        <Value>{(vet1[3] / 1000).toFixed(0)} m²</Value>
                    </Item>
                    <Item>
                        <Description>Acumulação anual
                            <span className="tooltiptext">Acúmulo de lodo na lagoa anaeróbia</span>
                        </Description>
                        <Value>{vet1[4]} m³/ano</Value>
                    </Item>
                    <Item>
                        <Description>Expessura
                            <span className="tooltiptext">Expessura da camada de lodo em 1 ano</span>
                        </Description>
                        <Value>{vet1[5]}  cm/ano</Value>
                    </Item>
                    <Item>
                        <Description>Tempo para se atingir 1/3
                            <span className="tooltiptext">Tempo para se atingir 1/3 da altura útil das lagoas</span>
                        </Description>
                        <Value>{(vet1[6]).toFixed(1)} anos</Value>
                    </Item>
                </Card>
                <Card> 
                    <TitleCard>Lagoa Facultativa</TitleCard>
                    <Item>
                        <Description>Carga afluente
                            <span className="tooltiptext">Carga afluente à lagoa facultativa</span>
                        </Description>
                        <Value>{vet2[0]} kgDBO/d</Value>
                    </Item>
                    <Item>
                        <Description>Área
                            <span className="tooltiptext">Área requerida</span>
                        </Description>
                        <Value>{vet2[1].toFixed(1)} ha ({((Number(vet2[1].toFixed(1)))).toFixed(3)} m²) </Value>
                    </Item>
                    <Item>
                        <Description>Àrea de cada lagoa
                            <span className="tooltiptext">Área individual para cada ladoa facultativa</span>
                        </Description>
                        <Value>{vet2[2].toFixed(1)} m²</Value>
                    </Item>
                    <Item>
                        <Description>Volume
                            <span className="tooltiptext">volume resultante da lagoa facultativa</span>
                        </Description>
                        <Value>{(vet2[3] / 1000).toFixed(3)} m³</Value>
                    </Item>
                    <Item>
                        <Description>Tempo
                            <span className="tooltiptext">Tempo de detenção Resultante</span>
                        </Description>
                        <Value>{vet2[4].toFixed(2)} m³/ano</Value>
                    </Item>
                    <Item>
                        <Description>KT
                            <span className="tooltiptext">Correção para a temperatura de 23°C</span>
                        </Description>
                        <Value>{vet2[5]}  cm/ano</Value>
                    </Item>
                    <Item>
                        <Description>S
                            <span className="tooltiptext">Estimativa da DBO solúvel efluente</span>
                        </Description>
                        <Value>{vet2[6].toFixed(0)} mg/l</Value>
                    </Item>
                    <Item>
                        <Description>DBO<sub>5</sub> Particulada
                            <span className="tooltiptext">Estimativa da DBO particulada efluente</span>
                        </Description>
                        <Value>{(vet2[7])} mgDBO<sub>5</sub>/l</Value>
                    </Item>
                    <Item>
                        <Description>DBO efluente
                            <span className="tooltiptext">DBO total efluente</span>
                        </Description>
                        <Value>{vet2[8]} mg/l</Value>
                    </Item>
                </Card>
            </Container>
            <Card>
                <TitleCard>Sistema Australiano</TitleCard>
                <Item>
                    <Description>Eficiência
                        <span className="tooltiptext">Eficiência total do distema de lagoa anaeróbia-lagoa facultativa na remoção da DBO</span>
                    </Description>
                    <Value>{vet2[9]}%</Value>
                </Item>
                <Item>
                    <Description>Area útil total
                        <span className="tooltiptext">Lagoas anaeróbia + facultativa</span>
                    </Description>
                    <Value>{vet2[10]} ha</Value>
                </Item>
                <Item>
                    <Description>Area Total
                        <span className="tooltiptext">25% a 33% superior a área útil requerida</span>
                    </Description>
                    <Value>{vet2[11]} ha</Value>
                </Item>
                <Item>
                    <Description>Area per capita
                        <span className="tooltiptext">Área per capita</span>
                    </Description>
                    <Value>{vet2[12]} m²/hab </Value>
                </Item>
            </Card>
            <GraficContainer>
                <TitleCard>Layout do sistema</TitleCard>
                <Grafic>
                    <Anaerobia>
                        {
                            list.map(e => {
                                return (
                                    <Retangle style={{ width: `${vet1[8] * 3}px`,maxWidth: '170px', height: `${vet1[7] * 3}px`, minHeight: '35px', marginRight: "100px", fontSize: "10px" }}>
                                        <TTop>{vet1[8]}m</TTop>
                                        <TRight>{vet1[7]}m</TRight>
                                    </Retangle>
                                )
                            })
                        }
                    </Anaerobia>
                    <Facultativa>
                        {
                            list.map(e => {
                                return (
                                    <Retangle style={{ width: `${vet2[14] * 2}px`, maxWidth: '400px', height: `${vet2[13] * 2}px`,  minHeight: '50px'}}>
                                        <TTop>{vet2[14]}m</TTop>
                                        <TRight style={{ lineHeight: `${vet2[13] / 3}px` }}>{vet2[13]}m</TRight>
                                    </Retangle>
                                )
                            })
                        }
                    </Facultativa>
                </Grafic>
            </GraficContainer>
            <PDFButton>
                <button onClick={jsPdfGenerator}>Gerar Relatório</button>
            </PDFButton>

        </Page>
    );
}

export default Result;