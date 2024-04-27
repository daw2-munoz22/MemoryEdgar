function Loader({ Opened }) {  
  return (
    <>
      <style>
        {`
          .cortina {
            position: fixed;
            background: darkturquoise;
            top: 0;
            bottom: 0;
            left: 0vw;
            right: 100vw;
            transition: all 0.7s ease;
            transform-origin: top left;
            z-index: 0;
            overflow: hidden;
          }

          .texto {
            width: 100vw;
            height: 100%;
            margin: 0;
            transform-origin: top left;
            padding: 30px;
            font-size: 15vh;
          }
          .texto p {
            margin: 20vw;
          }
         
          @keyframes animaCortina {
            0% {
              transform: skewX(0deg);
            }
            50% {
              transform: skewX(-20deg);
            }
            100% {
              transform: skewX(0deg);
            }
          }
          @keyframes antiAnimacion {
            0% {
              transform: skewX(0deg);
            }
            50% {
              transform: skewX(20deg);
            }
            100% {
              transform: skewX(0deg);
            }
          }

          @keyframes oscilar {
              0%, 100% {
                  transform: translateY(-20px);
              }
              50% {
                  transform: translateY(20px);
              }
          }

          .oscilanteA, .oscilanteB, .oscilanteC {    
              width: 200px;
          }
          .oscilanteA {    
              animation: oscilar 3s ease-in-out infinite;
          }
          .oscilanteB {    
              animation: oscilar 2s ease-in-out infinite;
          }
          .oscilanteC {    
              animation: oscilar 1s ease-in-out infinite;
          }
          .imagen {
            height: 75px; width: 75px; align-items: center
          }
          .dialog {
            display: flex; flex-direction: row; justify-content: center; height: 100%; width: 100%;
          }

         .loading {                            
          right: 0;  
          animation: animaCortina 0.7s ease;
        }
        `}
      </style>            
      <div className={`${Opened ? "cortina loading" : "cortina"}`}>        
        <div className="texto">
          <div className="dialog">
            <span style={{ fontSize: '100px', color: 'white', fontFamily: 'Tahoma', alignSelf: 'center' }}>
              <img className="oscilanteA imagen" src="https://th.bing.com/th/id/R.6f3c089e901d16945fe418c107a3e9bc?rik=PptPIKFMm2Gc%2bQ&pid=ImgRaw&r=0" alt="superballAnimation" />
              <img className="oscilanteB imagen" src="https://th.bing.com/th/id/R.6f3c089e901d16945fe418c107a3e9bc?rik=PptPIKFMm2Gc%2bQ&pid=ImgRaw&r=0" alt="superballAnimation" />
              <img className="oscilanteC imagen" src="https://th.bing.com/th/id/R.6f3c089e901d16945fe418c107a3e9bc?rik=PptPIKFMm2Gc%2bQ&pid=ImgRaw&r=0" alt="superballAnimation" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
