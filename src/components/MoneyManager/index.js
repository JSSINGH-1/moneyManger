import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import TransactionList from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const paragraphStyle = {
  color: 'white',
}

class MoneyManager extends Component {
  state = {
    titleInput: '',
    moneyInputs: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  UpdateListData = id => {
    const {transactionsList} = this.state

    const UpdateList = transactionsList.filter(EachData => id !== EachData.id)
    this.setState({transactionsList: UpdateList})
  }

  submitForm = event => {
    event.preventDefault()
    const {moneyInputs, titleInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const AddTransaction = {
      id: v4(),
      amount: parseInt(moneyInputs),
      title: titleInput,
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, AddTransaction],
      titleInput: '',
      moneyInputs: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  IncomeType = event => {
    this.setState({titleInput: event.target.value})
  }

  IncomeMoney = event => {
    this.setState({moneyInputs: event.target.value})
  }

  incomeCategory = event => {
    this.setState({optionId: event.target.value})
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpense = () => {
    const {transactionsList} = this.state
    let ExpenseAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        ExpenseAmount += eachTransaction.amount
      }
    })
    return ExpenseAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {
      moneyInputs,
      titleInput,
      transactionsList,

      optionId,
    } = this.state

    const incomeAmount = this.getIncome()
    const ExpenseAmount = this.getExpense()
    const BalanceAmount = this.getBalance()

    console.log(incomeAmount)
    return (
      <div className="mainContainer">
        <div className="monyManager">
          <div className="nameContainer">
            <h1 className="heading">Hi, Janmejay</h1>
            <p className="para">
              Welcome Back to your <span className="money">Money Manager</span>
            </p>
          </div>
          <div className="balanceContainer">
            <div className="balanceCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="balanceImage"
              />
              <div className="balanceMoney">
                <p className="details-text">Your Balance</p>
                <p data-testid="balanceAmount">Rs {BalanceAmount}</p>
              </div>
            </div>
            <div className="secondBalanceCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="balanceImage"
              />
              <div className="balanceMoney">
                <p className="details-text">Your Income</p>
                <p data-testid="incomeAmount">Rs {incomeAmount}</p>
              </div>
            </div>
            <div className="ThirdBalanceCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="balanceImage"
              />
              <div className="balanceMoney">
                <p className="details-text">Your Expenses</p>
                <p data-testid="expensesAmount">Rs {ExpenseAmount}</p>
              </div>
            </div>
          </div>
          <div className="formContainer">
            <div className="formCard">
              <h1 className="formHeading">Add Transaction</h1>
              <form onSubmit={this.submitForm}>
                <div className="inputContainer">
                  <label htmlFor="title" className="labelEl">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={titleInput}
                    placeholder="TITLE"
                    onChange={this.IncomeType}
                    className="SelectL"
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="Amount" className="labelEl">
                    Amount
                  </label>
                  <input
                    type="text"
                    id="Amount"
                    value={moneyInputs}
                    placeholder="AMOUNT"
                    onChange={this.IncomeMoney}
                    className="SelectL"
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="selct" className="labelEl">
                    Type
                  </label>
                  <select
                    id="selct"
                    value={optionId}
                    onChange={this.incomeCategory}
                    className="SelectL"
                  >
                    {transactionTypeOptions.map(eachOption => (
                      <option
                        key={eachOption.optionId}
                        value={eachOption.optionId}
                      >
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="InformationCard">
              <h1 className="formHeading">History</h1>
              <ul className="information">
                <p>Title</p>
                <p>Amount</p>
                <p>Types</p>
                <p style={paragraphStyle}>.</p>
              </ul>
              {transactionsList.map(eachData => (
                <TransactionList
                  key={eachData.id}
                  eachItem={eachData}
                  UpdateListData={this.UpdateListData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
