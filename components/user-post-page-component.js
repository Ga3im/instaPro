import { posts, goToPage, getToken, renderApp, setPosts} from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { getPostLikes, getPostDislikes, getPosts } from "../api.js";
import{formatDistanceToNow} from "date-fns"


const like =()=>{ 
  for (const likeButton of document.querySelectorAll(".like-button")) {                         //кнопка лайка
    likeButton.addEventListener('click', ()=>{
      const id = likeButton.dataset.postId;
      let liked = likeButton.dataset.liked;
      if (liked === 'false') {
        getPostLikes({ token: getToken()
          , id })
          .then(()=>{
            liked = 'true'
          console.log('лайк')})
          getPosts({token: getToken()})
          .then((data)=>{
            setPosts(data.posts)
            renderApp() 
          })
          }
     else{
      getPostDislikes({token: getToken(), id})
        liked = 'false'
        console.log('дизлайк')
        getPosts({token: getToken()})
        .then((data)=>{
          setPosts(data.posts)
          renderApp() 
        })
     }
    })
  }}

   export const renderUserPageImage = ({element})=>{                   

    const postHtml = posts.map((post)=>{
      return `
         <li class="post">
           <div class="post-image-container">
             <img class="post-image" src="${post.imageUrl}">
           </div>
           <div class="post-likes">
           <img src="https://glebkaf.github.io/webdev-cw-instapro/assets//images/${post.isLiked? 'like-active' : 'like-not-active'}.svg"
           <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
           </button>
           <p class="post-likes-text">Нравится: ${post.likes.length? post.likes[0].name: 0}
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
          <div class="posts-user-header">
          <img src="${posts[0]?.user.imageUrl}" class="posts-user-header__user-image">
          <p class="posts-user-header__user-name">${posts[0]?.user.name}</p>
      </div>
      <ul class="posts"
         <li class="post">${postHtml}</li>
      </ul>
          </div>`
      element.innerHTML = appHtml
   

     renderHeaderComponent({
           element: document.querySelector(".header-container"),
         });

         like()

      }

     