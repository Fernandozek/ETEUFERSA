import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: var(--primaria-dark);
`
export interface BannerProps{
    
}

export default function TopBar(){
    return(
        <TopBarContainer>
            <p>ETEUFERSA - ESTAÇÃO DE TRATAMENTO DE ESGOTO UNIVERSIDADE FEDERAL RURAL DO SEMI-ÁRIDO</p>
        </TopBarContainer>
    );
}