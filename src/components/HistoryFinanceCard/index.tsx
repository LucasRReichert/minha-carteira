import React from 'react'

import { Container, Tag } from './styles'

interface HistoryFinanceCardInterface {
    tagColor: string,
    title: string,
    subTitle: string,
    amount: string,
}

const HistoryFinanceCard: React.FC<HistoryFinanceCardInterface> = ({
    tagColor, title, subTitle, amount,
}) => {
    return (
        <Container>
            <Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subTitle}</small>
            </div>
            <h3>{amount}</h3>
        </Container>
    )
}

export default HistoryFinanceCard;
