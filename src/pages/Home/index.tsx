import React, { useState } from "react";
import PageTemplate from "../Template";
import {
  Container,
  Painel,
  Title,
  TopInputs,
  Item,
  Label,
  BottomInputs,
  ButtonCalc,
} from "./styles";
import Input from "../../components/Input";
import Result from "../Result";
import "antd/dist/antd.css";
import { message } from "antd";
import { LagoasBaseData } from "../../types/LagoasBaseData";

const emptyLagoasBaseData: LagoasBaseData = {
  populacao: 20000,
  vazaoAfluente: 3000,
  DBOAfluente: 350,
  temperatura: 23,
  taxaVolumetrica: 0.15,
  taxaAcumulo: 0.04,
  quantidadeLagoas: 2,
  proporcao: 2,
  k: 0.27,
  dqo: 500,
  hAnaerobia: 4.5,
  hFacultativa: 1.8,
};

function Home() {
  const [calculated, setCalculated] = useState(false);
  const [lagoasBaseData, setLagoasBaseData] =
    useState<LagoasBaseData>(emptyLagoasBaseData);
  const [computedLagoasBaseData, setComputedLagoasBaseData] =
    useState<LagoasBaseData>(emptyLagoasBaseData);

  function updateLagoasBaseData(value: Partial<LagoasBaseData>) {
    setLagoasBaseData((prev) => ({ ...prev, ...value }));
  }

  const success = () => {
    message.success({
      content: "Dimensionamento efetuado com sucesso!",
      className: "custom-class",
      style: {
        marginTop: "10vh",
      },
    });
  };

  const error = () => {
    message.error({
      content: "Preencha os campos corretamente!",
      className: "custom-class",
      style: {
        marginTop: "10vh",
      },
    });
  };

  function calcular() {
    const validatedValues = !Object.values(lagoasBaseData).includes(0);
    if (validatedValues) {
      // const [vet1, vet2] = calc.dimensionamento(20.000, 3.000, 350, 23, 4.5, 1.8,  0.15, 0.04,2, 3);
      setComputedLagoasBaseData(lagoasBaseData);
      setCalculated(true);
      success();
    } else {
      error();
    }
  }

  return (
    <PageTemplate imageSrc={true} title={true} topBar={true}>
      <Container>
        <Painel>
          <Title>Painel de entrada de dados</Title>
          <TopInputs>
            <Item>
              <Label>
                <span className="tooltiptext">
                  População que será atendida pelo sistema
                </span>
                População <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.populacao}
                setValue={(e) => updateLagoasBaseData({ populacao: Number(e) })}
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Quantidade da entrada de esgoto por dia
                </span>
                Vazão afluente <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.vazaoAfluente}
                setValue={(e) =>
                  updateLagoasBaseData({ vazaoAfluente: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Quantidade de matéria orgânica expressa em massa
                </span>
                DBO afluente <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.DBOAfluente}
                setValue={(e) =>
                  updateLagoasBaseData({ DBOAfluente: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">Temperatura da lagoa</span>
                Temperatura °C <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.temperatura}
                setValue={(e) =>
                  updateLagoasBaseData({ temperatura: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Volume da lagoa anaeróbia para a conversão de carga de DBO
                  aplicada
                </span>
                Taxa volumétrica <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.taxaVolumetrica}
                setValue={(e) =>
                  updateLagoasBaseData({ taxaVolumetrica: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Acúmulo de lodo na lagoa anaeróbia
                </span>
                Taxa de acúmulo <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.taxaAcumulo}
                setValue={(e) =>
                  updateLagoasBaseData({ taxaAcumulo: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Serve para lagoa anaeróbia e facultativa
                </span>
                Quantidade de lagoas <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.quantidadeLagoas}
                setValue={(e) =>
                  updateLagoasBaseData({ quantidadeLagoas: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Proporção adotada para manter o formato retangular das lagoas,
                  EX: 2/1
                </span>
                Proporção/1 <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.proporcao}
                setValue={(e) => updateLagoasBaseData({ proporcao: Number(e) })}
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Correção do coeficiente de remoção DBO
                </span>
                K <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.k}
                setValue={(e) => updateLagoasBaseData({ k: Number(e) })}
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Para esgotos domésticos, a relação DQO/DBO varia em torno de
                  1,7 a 2,4.
                </span>
                DQO <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.dqo}
                setValue={(e) => updateLagoasBaseData({ dqo: Number(e) })}
              />
            </Item>
          </TopInputs>
          <div style={{ margin: "20px 0", color: "#828282", fontSize: "15px" }}>
            Adote profundidades (m) para as lagoas de estabilização!{" "}
          </div>
          <BottomInputs>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Recomendado entre 2,5 a 5,0 m
                </span>
                Anaeróbia <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.hAnaerobia}
                setValue={(e) =>
                  updateLagoasBaseData({ hAnaerobia: Number(e) })
                }
              />
            </Item>
            <Item>
              <Label>
                <span className="tooltiptext">
                  Recomendado entre 1,5 a 3,0 m
                </span>
                Facultativa <sup>🛈</sup>
              </Label>
              <Input
                type="number"
                value={lagoasBaseData.hFacultativa}
                setValue={(e) =>
                  updateLagoasBaseData({ hFacultativa: Number(e) })
                }
              />
            </Item>
          </BottomInputs>
          <ButtonCalc>
            <button onClick={calcular}>Dimensionar</button>
          </ButtonCalc>
        </Painel>
        {calculated ? (
          // <Result vet1={vet1} vet2={vet2} populacao={populacao_Calculated} vazao={vazaoAfluente_Calculated} DBOAfluente={DBOAfluente_Calculated} temperatura={temperatura_Calculated} taxaVolumetrica={taxaVolumetrica_Calculated} taxaAcumulo={taxaAcumulo_Calculated} quantidadeLagoas={quantidadeLagoas_Calculated} proporcao={proporcao_Calculated} k={k_Calculated} hAnaerobia={hAnaerobia_Calculated} hFacultativa={hFacultativa_Calculated} dqo={dqo_Calculated}/>
          <Result lagoasBaseData={computedLagoasBaseData} />
        ) : null}
      </Container>
    </PageTemplate>
  );
}

export default Home;
