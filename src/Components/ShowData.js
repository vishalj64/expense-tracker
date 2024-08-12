import { useEffect, useState } from "react";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [sum, setSum] = useState();
  const [rahulspent, setRahulspent] = useState(0);
  const [rameshspent, setRameshspent] = useState(0);
  const [showform, setShowForm] = useState(false);

  var rahulspent1 = 0;
  var rameshspent1 = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        setSum(data.reduce((result, v) => (result = result + v.price), 0));
        Shares(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchMenu();
  }, [showform]);

  const Shares = (data) => {
    data.map((sams) =>
      sams.payeeName === "Rahul"
        ? (rahulspent1 = rahulspent1 + sams.price)
        : (rameshspent1 = rameshspent1 + sams.price)
    );
    setRahulspent(rahulspent1);
    setRameshspent(rameshspent1);
  };

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.setDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulspent}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshspent.toFixed(2)}</span> <br />
      <span className="use-inline payable">
        {rahulspent > rameshspent ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulspent - rameshspent) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default ShowData;
