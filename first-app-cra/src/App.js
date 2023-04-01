import logo from './logo.svg';
import './App.css';
import React from 'react';
import Title from './components/Title';

const jsonLocalStorage = {  // <<<여기부터>>>
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))    // JSON API를 사용
  },
}
// JS -> key(이름) : value (함수)

// [h1] ==================================================
// function Title(props) {
//   return <h1>{props.children}</h1>;
// }

// [form] =================================================
const Form = ({ updateMainFood }) => {
  const [value, setValue] = React.useState("");
  // 한글검증
  const hangul = text => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  // 한글 에러 메세지
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(data) {
    const userValue = data.target.value;
    console.log(hangul(userValue));

    if (hangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
      setErrorMessage("");
    }

    setValue(userValue.toUpperCase());
  }

  // 빈 값인 상태에서 추가 버튼을 클릭하면, 에러 메세지 출력
  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (value === "") {
      setErrorMessage("빈 값으로 추가할 수 없습니다.");
      return;
    }

    updateMainFood();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요"
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">추가</button>
      <div style={{ color: "#f00" }}>{errorMessage}</div>
    </form>
  );
}

// [div] : mainCard =================================================
const MainCard = ({ img, onHandleHeartClick }) => {
  return (
    <div className="main-card">
      <img
        src={img}
        alt="올리브오일"
        width="400" />
      <button onClick={onHandleHeartClick}>🤍</button>
    </div>
  );
}

// [ul] : favorites =================================================
function Favorites({ favorites }) { // component는 대문자
  return (
    <ul className="favorites">
      {favorites.map(food => (<FoodItem img={food} key={food} />))}
    </ul>
  );
}

// [foodItem] ======================================================
function FoodItem(props) {
  return (
    <li>
      <img src={props.img} alt={props.title}
        style={{ width: "150px", height: "100px", backgroundSize: "contain" }} />
    </li>
  );
}

// [리액트를 이용하여 추가] =====================================
const foodLiInsert = document.querySelector('#food-li-insert');

const App = () => {
  const foodOne = "img/food-one.jpg";
  const foodTwo = "img/food-two.jpg";
  const foodThree = "img/food-three.jpg";
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites]
    = React.useState(jsonLocalStorage.getItem('favorites') || []);
  const [counter, setCounter] = React.useState(jsonLocalStorage.getItem('counter'));

  function updateMainFood() {
    setMainFood(foodTwo);
    const nextCounter = counter + 1; // const를 붙였다는것은 상수화
    setCounter(nextCounter);
    jsonLocalStorage.setItem("counter", nextCounter);
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainFood];    // favorites에 있는 값, 배열을 펼침
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  return (
    <div>
      <Title>페이지 {counter}</Title>
      <Form updateMainFood={updateMainFood} />
      <MainCard img={mainFood} onHandleHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
