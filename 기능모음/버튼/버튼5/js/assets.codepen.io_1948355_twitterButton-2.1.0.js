if(window.location.pathname.indexOf('/debug/')<0){const twitterStyle=document.createElement('style');twitterStyle.innerText=`

      .twitterLink {
          position: fixed;
          font-size: 16px;
          bottom: 0;
          right: 0;
          width: 2.5em;
          height: 2.5em;
          border-radius: 100% 0 0 0 / 100% 0 0 0;
          background-color: #777;
          box-shadow: 0 0 5px #0007;
          transform-origin: bottom right;
          transition: all 0.25s;
          cursor: pointer;
          z-index: 9999;
      }

      .twitterLink:hover {
          background-color: #00a2f5;
          box-shadow: 0 0 10px #000;
          transform: scale(1.25);
      }

      .twitterIcon {
          position: absolute;
          bottom: 0.2em;
          right: 0.2em;
          width: 1.5em;
          height: 1.5em;
          filter: drop-shadow(0 0 2px #0007);
      }
  `;document.querySelector('head').appendChild(twitterStyle);const twitterPath="https://twitter.com/amit_sheen";const twitterLink=document.createElement('a');twitterLink.classList="twitterLink"
twitterLink.addEventListener('click',()=>{window.open(twitterPath,'_top');})
const twitterIcon=document.createElement('img');twitterIcon.classList="twitterIcon"
twitterIcon.src="https://assets.codepen.io/1948355/twitterLogo4.png";twitterLink.appendChild(twitterIcon);document.querySelector('body').appendChild(twitterLink);}