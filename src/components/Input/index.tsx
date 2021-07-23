import React, { InputHTMLAttributes } from 'react'

import { Container } from './styles'

type InputInterface = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputInterface> = ({
...rest
}) => (
        <Container {...rest} />
    )

export default Input;
