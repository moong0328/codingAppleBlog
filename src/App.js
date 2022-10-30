/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {
  // Destructuring 문법
  // useState: 자동 rerendering 됨.
  // 변경시 자동으로 html에 반영되게 만들고 싶을 때, 자주 변경이 될 것 같은 부분에 사용
  let [postTitle, setPostTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [favCount, setFavCount] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={() => {
        // array & object 다룰 때, 원본은 보존하는 것이 좋음
        // 기존 state와 신규 state가 같을 경우 변경 X (자원 절약)
        // array & object 담은 변수엔 화살표만 저장됨. ex: let arr = [1,2,3] ==> [1,2,3] -> arr\
        // array를 수정했지 변수에 있던 화살표는 수정 안됨
        // copyTitle == postTitle => True
        // Reference Data Type.
        let copyTitle = postTitle; // Shallow Copy
        copyTitle = [...postTitle]; // Deep Copy
        copyTitle[0] = '여자 코트 추천';
        setPostTitle(copyTitle);
      }}>POST 제목 변경 버튼</button>

      <button onClick={() => {
        let copyTitle = [...postTitle]; // Deep Copy
        copyTitle.sort()
        setPostTitle(copyTitle);
      }}>가나다순 정렬</button>
      <div className="list">
        {/* Data Binding */}
        <h4>
          { postTitle[0] } 
          <span onClick={() => setFavCount(favCount++)}>👍</span> 
          { favCount } 
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ postTitle[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ postTitle[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <Modal />
    </div>
  );
}


/* Component 👍
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지
 * 3. 자주 변경되는 html UI */
const Modal = () => {
  return (
    // fragment
    <> 
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}
/* Component 👎
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지
 * 3. 자주 변경되는 html UI */
export default App;
