import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, } from 'recharts'

import { 
    Container,
    SideLeft,
    Legend,
    LegendContainer,
    SideRight,
 } from './styles'


interface PieChartInterface {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string,
    }[],
}

const PieChartComponent: React.FC<PieChartInterface> = ({ data }) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
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
                  <PieChart>
                      <Pie data={data} dataKey="percent">
                        {
                            data.map((indicator) => (
                                <Cell key={indicator.name} fill={indicator.color} />
                            ))
                        }
                      </Pie>
                  </PieChart>
              </ResponsiveContainer>
        </SideRight>
    </Container>
)

export default PieChartComponent;
