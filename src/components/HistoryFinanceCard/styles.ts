import styled, { keyframes } from 'styled-components'

interface TagInterface {
    color: string,
}

const animate = keyframes`
    0%  {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 7px;
    margin: 10px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    animation: ${animate} .5s ease;
    :hover {
        opacity: 0.7;
        transform: translateX(10px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    > div span {
        font-weight: bold;
        font-size: 22px;
    }
`

export const Tag = styled.div<TagInterface>`
    background-color: ${props => props.color};
    width: 13px;
    height: 60%;
    position: absolute;
    left: 0;
`