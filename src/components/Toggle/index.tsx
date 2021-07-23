import React from 'react'

import { Container, ToggleLabel, ToggleSelector } from './styles'

interface ToggleInterface {
    labelLeft: string,
    labelRight: string,
    checked: boolean,
    onChange(): void,
}

const Toggle: React.FC<ToggleInterface> = ({
    checked, labelLeft, labelRight, onChange,
}) => (
    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
        <ToggleSelector 
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={onChange}
        />
        <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
)

export default Toggle