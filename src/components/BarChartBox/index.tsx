import React from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts'

import { 
    Container, 
    SideLeft,
    SideRight,
    LegendContainer,
    Legend,
 } from './styles'

 import { formatCurrency } from '../../utils/formats'

interface BarChartBoxInterface {
    title: string,
    data: {
        name: string,
        amount: number,
        percent: number,
        color: string,
    }[],
}

const BarChartBox: React.FC<BarChartBoxInterface> = ({
    data, title,
}) => (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
              {
                  data.map((indicator) => (
                     <Legend key={indicator.name} color={indicator.color}>
                     <div>{indicator.percent || 0}%</div>
                     <span>{indicator.name}</span>
                     </Legend>
                ))
              }
            </LegendContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data} > 
                        <Bar dataKey="amount" name="Valor">
                            {data.map((indicator) => (
                                <Cell 
                                    key={indicator.name}
                                    cursor="pointer"
                                    fill={indicator.color}
                                    color={indicator.color}
                                />
                                ))}
                        </Bar>
                        <Tooltip
                         cursor={{ fill: 'none' }}
                         formatter={(value: Number) => formatCurrency(Number(value))}
                         />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    )

export default BarChartBox;
