import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">insta<span class="red-logo">Pro</span></h1>
      <button id="headerAddButton" class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
    <div class="night-theme">🌑</div>
     ${AUTH_PAGE ? ""
      : 
     `<img class="user-page" src="https://my.sky.pro/ea3302c05ddec8fbd920408f9c1338d4.svg">`}
      
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
  </div>
  
`;
  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {                                  // логотип
    goToPage(POSTS_PAGE);
  });


  let isTheme;
  element.querySelector(".night-theme").addEventListener('click', ()=>{                               //ночной режим
    if (isTheme) {
      document.getElementById("body").style.background = '#ffffff';
      element.querySelector(".night-theme").textContent = '🌑'
       isTheme = false;
    } else {
      document.getElementById("body").style.background = '#4a4d50';
      element.querySelector(".night-theme").textContent = '☀️'
       isTheme = true;
    }
  })
  

  element.querySelector(".logout-button")?.addEventListener("click", logout);                           // выйти, войти

  return element;
}
