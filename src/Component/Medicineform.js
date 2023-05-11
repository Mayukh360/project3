import React, { useRef, useState, useContext, useEffect } from "react";
import Card from "./UI/Card";
import classes from "./MedicineForm.module.css";
import Button from "./Button.module.css";
import CartContext from "./store/Cart-Context";
import axios from "axios";

export default function MedicineForm() {
  const formRef = useRef();
  const [responseData, setResponseData] = useState([]); // State for the response data
  // const [selectedSize, setSelectedSize] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const shoeName = formRef.current.elements.shoeName.value;
    const description = formRef.current.elements.description.value;
    const price = formRef.current.elements.price.value;
    const large = formRef.current.elements.large.value;
    const medium = formRef.current.elements.medium.value;
    const small = formRef.current.elements.small.value;
    const item = {
      shoeName,
      description,
      price,
      large,
      medium,
      small,
    };
    console.log(item);
    axios
      .post(
        "https://crudcrud.com/api/ae9949ceef1848beb4990298fea748f6/shoecommerce",
        item
      )
      .then((response) => {
        console.log(response.data);
        fetchItems(); // Fetch the data after posting
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const fetchItems = () => {
    axios
      .get(
        "https://crudcrud.com/api/ae9949ceef1848beb4990298fea748f6/shoecommerce"
      )
      .then((response) => {
        setResponseData(response.data); // Update the response data state
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  useEffect(() => {
    fetchItems(); // Fetch the items when the component mounts
  }, []);

  const handleSizeButtonClick = (size, item) => {
    const selectedShoe = item.shoeName;
    const price=item.price;
    const newItem = {
      shoeName: selectedShoe,
      price:price,
      size: size,
      amount: 1
    };
  
    axios
      .post("https://crudcrud.com/api/5718029755604cf084c6ea9f312a5216/shoecommerce", newItem)
      .then((response) => {
        console.log(response.data);
        setResponseData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.shoeName === selectedShoe) {
              return {
                ...item,
                [size.toLowerCase()]: item[size.toLowerCase()] - 1
              };
            }
            return item;
          });
          return updatedData;
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  
  

  return (
    <Card className={classes.login}>
      <form ref={formRef} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="shoeName">Shoe Name</label>
          <input type="text" id="shoeName" />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" />
        </div>
        <div className={classes.control}>
          <label htmlFor="large">Large</label>
          <input type="number" id="large" min="1" />
          <label htmlFor="medium">Medium</label>
          <input type="number" id="medium" min="1" />
          <label htmlFor="small">Small</label>
          <input type="number" id="small" min="1" />
        </div>
        <button className={Button.button} type="submit">
          List Product
        </button>
      </form>
      <ul>
        {responseData.map((item) => (
          <li key={item._id}>
            Price: {item.shoeName} - Description: {item.description} -
            Price: {item.price} - Amount: {item.amount}{" "}
            <button onClick={() => handleSizeButtonClick("Large", item)}>
              Large-{item.large}
            </button>
            <button onClick={() => handleSizeButtonClick("Medium", item)}>
              Medium-{item.medium}
            </button>
            <button onClick={() => handleSizeButtonClick("Small", item)}>
              Small-{item.small}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
