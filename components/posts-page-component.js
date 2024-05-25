import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp, setPosts} from "../index.js";
import { getPostLikes, getPostDislikes, getPosts } from "../api.js";
import{formatDistanceToNow} from "date-fns"


export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
console.log(posts)
 const postHtml = posts.map((post, id)=>{
  const userNamesLikes = ()=>{  
//  const indexlike = document.querySelectorAll(".like-button").dataset ;
    posts.map((wholike)=>{
console.log(wholike.likes[0])
    })                                              // пользователи которые поставили лайк
    console.log(post.likes[id])
   return  post.likes.length? post.likes[0].name: 0 ; 
  }

     return `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
          <img src="https://glebkaf.github.io/webdev-cw-instapro/assets//images/${post.isLiked? 'like-active' : 'like-not-active'}.svg"
            <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
            </button>
            <p class="post-likes-text">Нравится: ${userNamesLikes()}
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}:</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${formatDistanceToNow(post.createdAt)} ago
          </p>
        </li>`
    }
  ).join('');
    const appHtml = `<div class="page-container">
      <div class="header-container"></div>
         <ul class="posts"
            <li class="post">${postHtml}</li>
         </ul>
      </div>`
  appEl.innerHTML = appHtml;
  

 const like =()=>{ 
  for (const likeButton of document.querySelectorAll(".like-button")) {                         //кнопка лайка
    likeButton.addEventListener('click', ()=>{
      const id = likeButton.dataset.postId;
      let liked = likeButton.dataset.liked;
      if (liked === 'false') {
        getPostLikes({ token: getToken()
          , id })
          .then(()=>{
          console.log('лайк')})
          getPosts({token: getToken()})
          .then((data)=>{
            setPosts(data.posts)
            renderApp() 
          })
          }
     else{
      getPostDislikes({token: getToken(), id})
        console.log('дизлайк')
        getPosts({token: getToken()})
        .then((data)=>{
          setPosts(data.posts)
          renderApp() 
        })
     }
    })
  }}

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  like()

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}




