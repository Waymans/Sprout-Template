function html(body, string){
    return `<!DOCTYPE html>
      <html>
        <style>
        html, body {
          padding: 1rem;
        }
        body {
          margin: 0;
          background: #eee;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          font-family: 'Mukta', sans-serif;
        }
        .main {
          width: 70vw;
          background: whitesmoke;
          border-radius: 5px;
          box-shadow: 1px 1px 5px #ccc;
        }
        .header { 
          text-align: center;
          padding: 3rem;
          background: seagreen;
            color: white;
        }
        .content { 
          padding: 3rem;
        }
        footer { 
          padding-top: 20px;
          font-size: 12px;
          color: #999;
          text-align: center;
          width: 70vw;
        }
        a {
          color: #999;
        }
        .svg-container {
          text-align: center;
        }
        svg {
          width: 8vw;
          height: auto;
        }
        @media only screen and (max-width: 600px) {
          .main { width: 90vw; }
        }
        </style>
        <body>

          <div>
            <div class="svg-container">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="300pt" height="390pt" viewBox="0 0 190 295"
                 preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(182,113,0);stop-opacity:1" />
                    <stop offset="80%" style="stop-color:rgba(42,223,57);stop-opacity:1" />
                  </linearGradient>
                </defs>
                <g transform="translate(-53,385) scale(0.1,-0.1)"
                  fill="url(#grad2)" stroke="none">
                  <path d="M2417 3654 c-303 -55 -552 -270 -721 -625 -61 -127 -114 -274 -142
                    -391 -9 -43 -21 -78 -24 -78 -4 0 -18 28 -30 63 -38 106 -125 268 -187 352
                    -108 145 -227 236 -367 281 -150 49 -372 32 -543 -43 l-42 -18 38 -80 c48
                    -100 125 -209 202 -286 193 -193 496 -339 793 -382 48 -7 87 -17 88 -22 3 -31
                    -27 -325 -33 -325 -5 0 -13 8 -18 18 -11 21 -81 72 -98 72 -7 0 -8 -12 -2 -39
                    15 -68 -4 -140 -89 -327 -28 -61 -58 -137 -67 -170 -23 -83 -31 -258 -15 -336
                    42 -214 209 -348 419 -336 245 15 399 237 363 522 -15 119 -41 201 -112 355
                    -65 140 -82 211 -70 286 4 28 6 51 5 53 -7 8 -70 -32 -111 -70 -42 -39 -43
                    -39 -48 -16 -6 32 -28 320 -24 323 2 1 48 12 103 25 504 114 817 442 889 932
                    9 58 16 144 16 192 l0 86 -47 -1 c-27 0 -83 -7 -126 -15z m-659 -960 c-84 -91
                    -170 -185 -191 -207 -31 -34 -35 -36 -20 -12 15 26 352 385 361 385 2 0 -65
                    -75 -150 -166z m-367 -128 c100 -62 137 -91 128 -100 -4 -4 -267 177 -278 191
                    -7 8 -2 5 150 -91z"/>
                </g>
              </svg>
            </div>
            <div class="main">
              <div class="header">Success!</div>
              <div class="content">
                ${string.isCreate ? 
                    `<p>Hi ${body.first},</p> 
                    <p>Congratulations, you have created an account on Sprout.</p>
                    <p>Enjoy!</p>` : 
                  string.isForgot ? 
                    `<p>Your password is: ${body.password}.</p>
                    <p>Didn't ask for it? Click <a href="https://sprout-template.glitch.me/contact">here</a>.</p>` : 
                  string.isContact ? 
                    `<p>Hi ${body.first},</p> 
                    <p>Thanks for reaching out to us. We will be in touch with you shortly.</p>` : null}
              </div>
            </div>
            <footer>
              <div>Sprout Inc, Address, Minnesota</div>
            </footer>
          </div>
        </body>
      </html>`;
}

module.exports = html;
