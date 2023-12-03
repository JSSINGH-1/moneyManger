import './index.css'

const TransactionList = props => {
  const {eachItem, UpdateListData} = props
  const {id, title, amount, type} = eachItem

  const OnDelete = () => {
    UpdateListData(id)
  }

  return (
    <li className="inforM">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button data-testid="delete" type="button" onClick={OnDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="image"
          data-testid="delete"
        />
      </button>
    </li>
  )
}

export default TransactionList
