import{a as m,S as b,i as d}from"./assets/vendor-Db2TdIkw.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();const L="https://pixabay.com/api/?per_page=15";async function f(o,e=1){const l={key:"49367974-1ddb9c95ea8d865fcbee88608",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e};try{return(await m.get(L,{params:l})).data}catch(r){console.log("Помилка при отриманні даних:",r)}}function w(o){return o.map(e=>`<li class="gallery-item">
    <a class="gallery-link" href=${e.largeImageURL}>
        <img class="gallery-image" src=${e.webformatURL} alt=${e.tags} />
    </a>
    <div class="info">
        <p class="gallery-info">Likes: <span class="galery-info-span">${e.likes}</span></p>
        <p class="gallery-info">Views: <span class="galery-info-span">${e.views}</span></p>
        <p class="gallery-info">Comments: <span class="galery-info-span">${e.comments}</span></p>
        <p class="gallery-info">Downloads: <span class="galery-info-span">${e.downloads}</span></p>
    </div>
</li>`).join("")}function g(o){document.querySelector(".gallery").insertAdjacentHTML("beforeend",w(o)),new b(".gallery a").refresh()}function v(){document.querySelector(".gallery").innerHTML=""}const n=document.querySelector(".loader"),h=document.querySelector(".form"),u=document.querySelector("input"),a=document.querySelector(".load-btn");let y=null,i=1,p=0;h.addEventListener("submit",S);a.addEventListener("click",q);async function S(o){if(o.preventDefault(),u.value.trim()==="")return d.show({message:"❌ Eter a search word",position:"topRight",color:"red"});v(),n.style.display="block",y=u.value,i=1;try{const e=await f(y,i);p=e.totalHits,e.hits.length===0?(a.style.display="none",d.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"red"})):(g(e.hits),a.classList.remove("visually-hidden"),p>15?a.style.display="block":a.style.display="none")}catch(e){console.log("Помилка при отриманні даних:",e)}finally{n.style.display="none"}h.reset()}async function q(){i+=1,n.style.display="block",n.style.top="100%";try{const o=await f(y,i);g(o.hits);const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}i*15>=p?(a.style.display="none",d.show({message:"❌ We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"})):a.style.display="block"}catch(o){console.log("Помилка при отриманні даних:",o)}finally{n.style.display="none"}}
//# sourceMappingURL=index.js.map
