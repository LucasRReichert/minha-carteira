import React, { useState, useMemo, useCallback } from 'react'

import SelectInput from '../../components/SelectInput'
import ContentHeader from '../../components/ContentHeader'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'
import PieChartComponent from '../../components/PieChartComponent'
import HistoryBox from '../../components/HistoryBox'
import BarChartBox from '../../components/BarChartBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

import listMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'

import {
    Container,
    Content,
 } from './styles'

const Dashboard: React.FC = () => {
    const [monhtSelected, setMonthSelected] = useState<number>(new Date().getMonth() +1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        }catch{
            throw new Error('invalid month value.Is accept o - 24.')
        }
    },[])
    
    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year)
            setYearSelected(parseYear)
        }catch{
            throw new Error('invalid year value.Is accept integer.')
        }
    },[])

  const years = useMemo(() => {
      let uniqueYears: number[] = []

    const expensesAndGains = [...expenses, ...gains]

    expensesAndGains.forEach(item => {
         const date = new Date(item.date)
         const year = date.getFullYear()

         if (!uniqueYears.includes(year)) {
             uniqueYears.push(year)
         }
      })

      return uniqueYears.map(year => {
         return {
             value: year,
             label: year,
         }
      })
  }, [])

  const months = useMemo(() => {
    return listMonths.map((month, index) => {
        return {
         value: index +1,
         label: month,
        }
    })

}, [])

  const totalExpenses = useMemo(() => {
    let total: number = 0

    expenses.forEach(item => {
        const date = new Date(item.date)
        const year = date.getFullYear()
        const month = date.getMonth() +1

        if (month === monhtSelected && year === yearSelected) {
            try{
                total += Number(item.amount)
            } catch{
                throw new Error('Invalid amount. Amount must be number')
            }
        }
    })

    return total
  }, [monhtSelected, yearSelected])

  const totalGains = useMemo(() => {
    let total: number = 0

    gains.forEach(item => {
        const date = new Date(item.date)
        const year = date.getFullYear()
        const month = date.getMonth() +1

        if (month === monhtSelected && year === yearSelected) {
            try{
                total += Number(item.amount)
            } catch{
                throw new Error('Invalid amount. Amount must be number')
            }
        }
    })

    return total
  }, [monhtSelected, yearSelected])

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses
  }, [totalGains, totalExpenses])

  const userMessage = useMemo(() => {
    if (totalBalance < 0) {
        return {
            title:"Que triste!",
            description:"Nesse mês você gastou mais do que deveria",
            icon:sadImg,
            footerText:"Verifique seus gastos e tente cortar coisas desncessárias."
        }
    } 
    else if(totalBalance === 0){
        return {
            title:"Uufa!",
            description:"Nesse mês você gastou exatamente o que ganhou",
            icon:grinningImg,
            footerText:"Tenha cuidado."
        }
    }
    else {
        return {
            title:"Muito bem!",
            description:"Sua carteira está positiva",
            icon:happyImg,
            footerText:"Continue assim. Considere investir seu saldo."
        }
    }
  }, [totalBalance])

  const relationExpensesVsGains = useMemo(() => {
    const total = totalGains + totalExpenses

    const gainsPercent = (totalGains / total) * 100
    const expensesPercent = (totalExpenses / total) * 100
    const data = [
        {
            name: 'Entradas',
            value: totalGains,
            percent: Number(gainsPercent.toFixed(1)),
            color: '#E44C4E'
        },
        {
            name: 'Saídas',
            value: totalExpenses,
            percent: Number(expensesPercent.toFixed(1)),
            color: '#F7931B'
        },
    ]

    return data

  }, [totalGains, totalExpenses])

  const historyData = useMemo(() => {
        return listMonths.map((_, month) => {

            let amountEntry = 0
            gains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()

                if (gainMonth === month && gainYear === yearSelected) {
                    try{
                    amountEntry += Number(gain.amount)
                } catch {
                    throw new Error('amountEntry is invalid. amountEntry must be a number')
                }
                }
            })

            let amountOutput = 0
            expenses.forEach(expense => {
                const date = new Date(expense.date)
                const expenseMonth = date.getMonth()
                const expenseYear = date.getFullYear()

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try{
                        amountOutput += Number(expense.amount)
                } catch {
                    throw new Error('amountOutput is invalid. amountOutput must be a number')
                }
                }
            })

            return {
                monthNumber: month,
                month: listMonths[month].substr(0,3),
                amountEntry,
                amountOutput,
            }

        })
        .filter(item => {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
  }, [yearSelected])

  const relationExpensivesRecurrentVersusEventual= useMemo(() => {
    let amountRecurrent = 0
    let amountEventual = 0 

    expenses.filter((expense) => {
        const date = new Date(expense.date)
        const year = date.getFullYear()
        const month = date.getMonth() +1

        return month === monhtSelected && year === yearSelected
    }).forEach((expense) => {
        if (expense.frequency === 'recorrente') {
            return amountRecurrent += Number(expense.amount)
        } 
        if (expense.frequency === 'eventual') {
            return amountEventual += Number(expense.amount)
        } 
    })

    const total = amountRecurrent + amountEventual

    return [
        {
            name: 'Recorrentes',
            amount: amountRecurrent,
            percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
            color: '#F7931B',
        },
        {
            name: 'Eventuais',
            amount: amountEventual,
            percent: Number(((amountEventual / total) * 100).toFixed(1)),
            color: '#E44C4E',
        },
    ]

  }, [monhtSelected, yearSelected])

  const relationGainsRecurrentVersusEventual= useMemo(() => {
    let amountRecurrent = 0
    let amountEventual = 0 

    gains.filter((gain) => {
        const date = new Date(gain.date)
        const year = date.getFullYear()
        const month = date.getMonth() +1

        return month === monhtSelected && year === yearSelected
    }).forEach((gain) => {
        if (gain.frequency === 'recorrente') {
            return amountRecurrent += Number(gain.amount)
        } 
        if (gain.frequency === 'eventual') {
            return amountEventual += Number(gain.amount)
        } 
    })

    const total = amountRecurrent + amountEventual

    return [
        {
            name: 'Recorrentes',
            amount: amountRecurrent,
            percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
            color: '#F7931B',
        },
        {
            name: 'Eventuais',
            amount: amountEventual,
            percent: Number(((amountEventual / total) * 100).toFixed(1)),
            color: '#E44C4E',
        },
    ]

  }, [monhtSelected, yearSelected])

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monhtSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
            <Content>
                <WalletBox 
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color="#4E41F0"
                />
                <WalletBox 
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color="#F7931B"
                />
                <WalletBox 
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color="#E44C4E"
                />
                <MessageBox 
                    title={userMessage.title}
                    description={userMessage.description}
                    icon={userMessage.icon}
                    footerText={userMessage.footerText}
                />
                <PieChartComponent data={relationExpensesVsGains} />
                <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />
                <BarChartBox
                    data={relationExpensivesRecurrentVersusEventual}
                    title="Saídas"
                />
                <BarChartBox
                    data={relationGainsRecurrentVersusEventual}
                    title="Entradas"
                />
            </Content>
        </Container>
    )
}

export default Dashboard;
