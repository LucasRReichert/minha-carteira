import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonInterface = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonInterface> = ({children, ...rest}) => (
        <Container {...rest}>
             {children}
        </Container>
    )

export default Button;
