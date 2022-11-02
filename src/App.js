/* eslint-disable */
import React from 'react'
import { useState } from 'react';
import './App.css';

const App = () => {
  // Destructuring 문법
  // useState: 자동 rerendering 됨.
  // 변경시 자동으로 html에 반영되게 만들고 싶을 때, 자주 변경이 될 것 같은 부분에 사용
  let [postTitle, setPostTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [favCount, setFavCount] = useState([0, 1, 2]);
  let [modal, setModal] = useState(false);
  let [modalTitle, setModalTitle] = useState(0);
  let [inputValue, setInputValue] = useState(null);
  // Array.map(() => {})
  // 1. array 자료 갯수만큼 함수 안의 코드를 실행
  // 2. 함수 내 파라미터는 array 안에 있는 Data
  // 3. return에 뭐 적으면 array로 담아줌

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

      {
        postTitle.map((data, i) => {
          return (
            <div className="list" key={ i }>
              <h4 onClick={() => {
                setModal(true);
                setModalTitle(i);
              }}>
                { i + 1 }. { data }
                <span onClick={(e) => {
                  e.stopPropagation();
                  let copyCountArray = [...favCount];
                  copyCountArray[i] = copyCountArray[i] + 1;
                  setFavCount(copyCountArray);
                }}>👍</span> 
                { favCount[i] }
                <button onClick={(e) => {
                  e.stopPropagation();
                  let copyTitle = [...postTitle];
                  // let filterTitle = copyTitle.filter(item => item !== data);
                  copyTitle.splice(i, 1)
                  let copyFavCount = [...favCount];
                  // let filterCount = copyFavCount.filter((item, index) => index !== i)
                  copyFavCount.splice(i, 1)

                  setPostTitle(copyTitle);
                  setFavCount(copyFavCount);
                }}>글 삭제</button>
              </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e) => {
        setInputValue(e.target.value);
        console.log(inputValue);
      } } />

      <button onClick={() => {
        let copyTitle = [...postTitle]; // Deep Copy
        copyTitle.unshift(inputValue);
        let copyFavCount = [...favCount];
        copyFavCount.unshift(0);

        setPostTitle(copyTitle);
        setFavCount(copyFavCount);
      }}> 글 추가 </button>

      {/* 
        동적 UI Making 3 Step
        1.html css 미리 디자인 완성
        2. UI의 현재 상태를 state로 저장
        3. state에 따라 UI가 어떻게 보일지 작성
      */}
      
      <ModalClass></ModalClass>

      {
        // 삼항연산자. 조건식 ? 참 : 거짓
        modal ? <Modal postTitle={postTitle} modalTitle={modalTitle} titleChange={() => {
          let copyTitle = postTitle; // Shallow Copy
          copyTitle = [...postTitle]; // Deep Copy
          copyTitle[0] = '여자 코트 추천';
          setPostTitle(copyTitle);
        }} /> : null
      }
    </div>
  );
}


/* Component 👍
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지
 * 3. 자주 변경되는 html UI */

/* 부모 → 자식 State 전송은 props
 * 1. <childComponent propsName={stateName}
 * 2. props 파라미터 등록 후 props.propsName
 * 자식 → 자식, 자식 → 부모는 안됨!
*/
const Modal = (props) => {
  return (
    // fragment
    <> 
      <div className="modal" style={{background : props.color}}>
        <h4>{ props.postTitle[props.modalTitle] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={ props.titleChange }>글수정</button>
      </div>
    </>
  )
}
/* Component 👎
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지
 * 3. 자주 변경되는 html UI 
*/

class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : 'KIM',
      age : 34
    }
  }
  render() {
    return (
      <div>
        하이요! { this.state.age } 
        <button onClick={() => {
          this.setState({age: 21})
        }}>State Change</button>
      </div>
    )
  }
}
export default App;
