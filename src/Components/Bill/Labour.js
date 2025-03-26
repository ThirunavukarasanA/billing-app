import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Labour() {
  const [values, setValues] = useState({
    no: "",
    date: "",
    to: "",
    sno: "",
    particulars: "",
    qty: "",
    rate: "",
    datavalues: "",
  });

  const [count, setCount] = useState(0)
  const [grandtotal, setGrandtotal] = useState(0)

  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  // const [bookno, setBookno] = useState(0);

  const [items, setItems] = useState([]);

  var totalamt = values.qty * values.rate;
  values.datavalues = totalamt;


  // console.log(values);

  const valueChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const remove = (e) => {
    const editData = items.filter((v, i) => i === e);
    const remove = items.filter((v, i) => i !== e);
    setItems(remove);
    setGrandtotal(parseFloat(grandtotal)-parseFloat(editData[0].datavalues))
  };

  const edit = (e) => {
    const editData = items.filter((v, i) => i === e);
    let bill = {
      no: editData[0].no,
      date: editData[0].date,
      to: editData[0].to,
      sno: editData[0].sno,
      particulars: editData[0].particulars,
      qty: editData[0].qty,
      rate: editData[0].rate,
      datavalues: editData[0].datavalues,
    };
    console.log(parseFloat(grandtotal)-parseFloat(editData[0].datavalues));
    setGrandtotal(parseFloat(grandtotal)-parseFloat(editData[0].datavalues))
    setValues(bill);
    const remove = items.filter((v, i) => i !== e);
    setItems(remove);
  };
  const handleSubmit = () => {
    setItems((prev) => [...prev, values]);
    setGrandtotal(parseFloat(values.datavalues) + parseFloat(grandtotal))
    console.log(grandtotal);
    setValues({
      date: "",
      sno: "",
      to: "",
      particulars: "",
      qty: "",
      rate: "",
      datavalues: "",
    });
  };



  const getData = async () => {
    const data = await axios.get(``)
    
  }
 

  useEffect(()=>{
    const num = axios.get(`http://localhost:7000/api/labour`)
    console.log(num);
  },[])

  const handelStore = (e) => {
    // setCount(count+1)
    let json = {
      // no:values.no,
     products: items
    };
    setValues({
      date: "",
      sno: "",
      to: "",
      particulars: "",
      qty: "",
      rate: "",
      datavalues: "",
    });
    console.log("json",json);
    console.log("items",items);
    axios.post(`http://localhost:7000/api/labour`, json)
    .then((response) => {
      console.log(response);
      alert("Bill Added Sucessfully")
    })
    .catch((err) => {
      console.log(err);
      alert("Bill Not Added")
    })
  };

  return (
    <div>
      <div className="border mx-10 mt-10">
        <h4 className="text-center text-xl border mx-[45%] bg-black text-white">
          Labour Bill
        </h4>

        <h2 className="text-center text-4xl mt-2 text-red-900">
          Creative line Graphics
        </h2>

        {/* address */}
        <address className="text-center mt-3 text-blue-900">
          15(2)9, Daimond Lay Out, Mangalam Road, Karuvampalayam, Tiruppur - 641
          604.
        </address>

        <div className="flex flex-wrap border mb-2 mt-3"></div>

        <div className="w-[100%] flex flex-wrap">
          {/* <hr className="h-[1px] text-black"/> */}
          {/* No */}
          <div className="w-[50%] flex justify-start">
            <div className="mx-5">
              <label className="text-blue-900" 
              type="text"
              value={values.no}
              onChange={(e) => valueChange(e)}
              >No : {}</label>
              {/* <input
                type="text"
                className="w-[30px]"
                name="no"
                value={values.no}
                onChange={(e) => valueChange(e)}
              /> */}
            </div>
          </div>

          {/* Date */}
          <div className="w-[50%] flex justify-end">
            <div className="flex justify-end mx-6">
              <label className="text-blue-900">Date : </label>
              <input
                type="date"
                name="date"
                className=""
                value={values.date}
                onChange={(e) => valueChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap border mt-2"></div>

        <div className="mx-7 mt-3">
          <label className="text-blue-900">To. </label>
          <input
            className="w-[900px] border-b-2 border-dotted"
            type="text"
            name="to"
            value={values.to}
            onChange={(e) => valueChange(e)}
          />
        </div>

        <div className="flex flex-wrap border mt-2"></div>
        {/* particulars */}
        <div className="flex flex-wrap mx-10 gap-4 mt-3 ">
          <div className="">
            <label className="text-blue-900">S.No : </label>
            <input
              className="border-b-2 border-dotted w-[30px]"
              type="text"
              name="sno"
              value={values.sno}
              onChange={(e) => valueChange(e)}
            />
          </div>

          <div className="">
            <label className="text-blue-900">Particulars : </label>
            <input
              className="border-b-2 border-dotted w-[500px]"
              type="text"
              name="particulars"
              value={values.particulars}
              onChange={(e) => valueChange(e)}
            />
          </div>

          <div className="">
            <label className="text-blue-900">Qty : </label>
            <input
              className="border-b-2 border-dotted w-[30px]"
              type="text"
              name="qty"
              value={values.qty}
              onChange={(e) => valueChange(e)}
            />
          </div>

          <div className="">
            <label className="text-blue-900">Rate : </label>
            <input
              className="border-b-2 border-dotted w-[100px]"
              type="text"
              name="rate"
              value={values.rate}
              onChange={(e) => valueChange(e)}
            />
          </div>

          <div className="">
            <label className="text-blue-900">Amount : </label>
            <input
              className="border-b-2 border-dotted"
              type="text"
              name="amount"
              value={totalamt}
              onChange={(e) => valueChange(e)}
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            className="border rounded-md px-4 py-1"
            onClick={(e) => handleSubmit(e)}
          >
            OK
          </button>
        </div>
      </div>

      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
          <table class="w-[100%] text-center text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-2">No</th>
                <th>Date</th>
                <th>To</th>
                <th>S.no</th>
                <th>Particulars</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Remove</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {items?.map((v, i) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={i}
                >
                  <td>{v.no}</td>
                  <td>{v.date}</td>
                  <td>{v.to}</td>
                  <td>{v.sno}</td>
                  <td>{v.particulars}</td>
                  <td>{v.qty}</td>
                  <td>{v.rate}</td>
                  <td>{v.datavalues}</td>
                  <td onClick={() => remove(i)} className="cursor-pointer">
                    remove
                  </td>
                  <td onClick={() => edit(i)} className="cursor-pointer">
                    edit
                  </td>
                </tr>
              ))}
              <tr>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td>
                <td>Total : {grandtotal}</td>
              </tr>
            </tbody>
          </table>
            <button onClick={(e) => handelStore(e)} className="border rounded-md px-4 py-1">Submit</button>
        </div>
      </>

      <div className="text-center mt-3">
        <button
          onClick={(e) => handleLogout(e)}
          className="border rounded-md py-1 px-3"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
