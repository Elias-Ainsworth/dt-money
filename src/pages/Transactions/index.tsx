import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionPaginateFooter,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useState } from 'react'
import { Paginate } from './components/Pagitane'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const itensPerPage = 5
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(transactions.length / itensPerPage)

  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage

  const currentItens = transactions.slice(startIndex, endIndex)

  function handleSetCurrentPage(index: number) {
    setCurrentPage(index)
  }

  function handleBeforeAndNextPage(type: string) {
    if (type === 'before') {
      setCurrentPage((data: number) => (data -= 1))
    }
    if (type === 'next') {
      setCurrentPage((data: number) => (data += 1))
    }
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {currentItens.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>

        <TransactionPaginateFooter>
          <Paginate
            pages={pages}
            handleSetCurrentPage={handleSetCurrentPage}
            handleBeforeAndNextPage={handleBeforeAndNextPage}
            currentPage={currentPage}
          />
        </TransactionPaginateFooter>
      </TransactionsContainer>
    </div>
  )
}
