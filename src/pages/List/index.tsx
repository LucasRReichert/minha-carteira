import React, {useMemo, useState, useEffect} from 'react'
import  { uuid } from 'uuidv4'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import { Container, Content, Filters } from './styles'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'

import { formatCurrency, formatDate} from '../../utils/formats'
import listMonths from '../../utils/months'

interface RouteParamsInterface {
    match: {
        params: {
            type: string
        }
    }
}

interface DataInterface {
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string,
    id: string,
}

const List: React.FC<RouteParamsInterface> = ({ match }) => {
    const [data, setData] = useState<DataInterface[]>([])
    const [monhtSelected, setMonthSelected] = useState<number>(new Date().getMonth() +1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente' , 'eventual'])

    const { type: balanceType } = match.params

    const listInfos = useMemo(() => {
        return balanceType === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#4E41F0',
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
        }
    }, [balanceType])

    const listData = useMemo(() => { 
        return balanceType === 'entry-balance' ? gains : expenses
    },[balanceType])

    const months = useMemo(() => {
           return listMonths.map((month, index) => {
               return {
                value: index +1,
                label: month,
               }
           })

    }, [listData])

     const years = useMemo(() => {
         let uniqueYears: number[] = []

         listData.forEach(item => {
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

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

        if (alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency)
            setSelectedFrequency(filtered)
        } else {
            setSelectedFrequency((prev) => [...prev, frequency])
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        }catch{
            throw new Error('invalid month value.Is accept o - 24.')
        }
    }
    
    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year)
            setYearSelected(parseYear)
        }catch{
            throw new Error('invalid year value.Is accept integer.')
        }
    }

    useEffect(() => {
     const filteredData = listData.filter(item => {
        const date = new Date(item.date)
        const month = date.getMonth() +1
        const year = date.getFullYear()

        return month === monhtSelected && year === yearSelected && selectedFrequency.includes(item.frequency)
     })

     const formattedData = filteredData.map(item =>{
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(+item.amount),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        })
        setData(formattedData)
    }, [listData, monhtSelected, yearSelected, data.length, selectedFrequency])

    return (
        <Container>
            <ContentHeader title={listInfos.title} lineColor={listInfos.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monhtSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
                <Filters>
                    <button 
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                        ${selectedFrequency.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                    >
                        Recorrentes
                    </button>
                    <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual
                        ${selectedFrequency.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                    >
                        Eventuais
                    </button>
                </Filters>
                 <Content>
                     {
                        data.map(item => (
                            <HistoryFinanceCard    
                            key={item.id}             
                            tagColor={item.tagColor}
                            title={item.description}
                            subTitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                        ))
                     }
                </Content>
        </Container>
    )
}

export default List;
