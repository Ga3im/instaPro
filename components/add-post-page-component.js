import { goToPage, getToken  } from "../index.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { POSTS_PAGE } from "../routes.js";
import { getPosts, postPosts } from "../api.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick, imageUrl, description }) {
const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml =`
    <div class="page-container">
        <div class="header-container"></div>
         <h3 class="form-title">Добавить пост</h3>
         <div class="form-inputs">
         <div class="upload-image-container">
          ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
           </div>
         </div>
           <label>
             Опишите фотографию:
             <textarea id="inputTextarea" class="input textarea" rows="4"></textarea>
           </label>
           </br></br></br>
           <div class="post-page-buttons">
             <button class="button" id="add-button">Добавить</button>
             <button class="back-button" id="backButton">Назад</button>
           </div>
           </div>
  `;
    appEl.innerHTML = appHtml;                                                     //отрисовка шапки
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    }); 
     
    const uploadImageContainer = appEl.querySelector(".upload-image-container");         // загрузка файла

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

   

    document.getElementById("add-button").addEventListener("click", () => {             //кнопка добавить
      const inputTextareaEl = document.getElementById("inputTextarea");
      onAddPostClick({
        description: inputTextareaEl.value,
        imageUrl: imageUrl,
      });
      postPosts({ token: getToken(),
        description: inputTextareaEl.value,
        imageUrl: imageUrl,
       })
      .then((data) => {
        return data.posts;
      })
      .then(()=>{
        getPosts({token: getToken()})
      })
    });
  };

  render();
  document.getElementById("backButton").addEventListener('click', () => {            //кнопка назад
      goToPage(POSTS_PAGE);
    })
  }