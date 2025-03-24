(function () {
    const botConfig = {
        botId: "cm2g51wzj2i0kn8bkqdvvnyx9",
        backendUrl: "https://your-backend-url.com",
        iconUrl: "icon cc st (1).png",
        audioUrl: "music.mp3",
        iframeUrl: "https://thomas007123.github.io/smaple/",
    };

    const style = document.createElement('style');
    style.innerHTML = `
        /* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
   #chat-iframe {
            background-color: transparent;
            border: none;
        }
        #chat-popup.collapsed { 
            pointer-events: none;
        }
        #welcome-message {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px 10px; /* Reduced padding */
    border-radius: 10px;
    z-index: 1101;
    font-size: 14px; /* Adjusted font size for better fit */
    opacity: 0;
    transition: opacity 0.5s ease;
    white-space: nowrap;
}

/* Small screens (phones) */
@media (max-width: 480px) {
    #welcome-message {
        padding: 3px 8px; /* Even smaller padding */
        font-size: 12px;  /* Adjust font size */
    }
}

/* Medium screens (tablets) */
@media (min-width: 481px) and (max-width: 768px) {
    #welcome-message {
        padding: 4px 9px;
        font-size: 13px;
    }
}

/* Large screens (desktops) */
@media (min-width: 769px) {
    #welcome-message {
        padding: 5px 10px; /* Default padding */
        font-size: 14px;
    }
}


/* Chat Container */
#chat-popup {
  position: fixed;
  bottom: 10%;
  right: 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 10px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: scale(0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Show Popup */
#chat-popup.show {
  opacity: 1;
  transform: scale(1);
}
  @media (max-width: 768px) {
            #chat-popup {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 8%;
                border-radius: 0;
            }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
            #chat-popup {
                width: 80%;
                height: 90%;
                bottom: 8%;
                left: 12%;
                right: auto;
            }
        }
        @media (min-width: 1024px) {
            #chat-popup {
                width: 350px;
                height: 80vh;
                max-height: 900px;
                bottom: 8vh;
                right: 5%;
            }
        }

/* Chat Icon */
#chat-icon {
  position: fixed;
  bottom: 7%;
  right: 20px;
  cursor: pointer;
  z-index: 999;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Chat Controls */


/* Welcome Message */
#welcome-message {
  position: fixed;
  background:rgb(41, 123, 200);
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 1101;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.5s ease;
  white-space: nowrap;
  font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: medium;
}

/* Side Vector */
#side-vector {
  position: fixed;
  height: 250px;
  width: auto;
}

/* Responsive Design */
@media (max-width: 480px) {
  #chat-icon {
    height: 150px;
    bottom: 5%;
    right: 0px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  #chat-icon {
    height: 200px;
    bottom: 6%;
    right: 5px;
  }
}

@media (min-width: 769px) {
  #chat-icon {
    height: 250px;
    bottom: 7%;
    right: 20px;
  }
}
   #chat-controls {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1100;
        }
        #chat-controls button {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            margin-left: 5px;
        }

    `;
    document.head.appendChild(style);

    const chatIcon = document.createElement('img');
    chatIcon.src = botConfig.iconUrl;
    chatIcon.id = 'chat-icon';
    document.body.appendChild(chatIcon);

    const welcomeMessage = document.createElement('div');
    welcomeMessage.id = 'welcome-message';
    welcomeMessage.textContent = 'Hello,I am Shankarini';
    document.body.appendChild(welcomeMessage);

    // Function to position the welcome message based on target image
    function positionWelcomeMessage() {
        const targetImage = document.getElementById('chat-icon');
        if (targetImage) {
            const rect = targetImage.getBoundingClientRect();
            const messageHeight = welcomeMessage.offsetHeight;
            const messageWidth = welcomeMessage.offsetWidth;
    
            let topOffset = 0;
            let leftOffset = 0;
    
            if (window.innerWidth <= 480) {
                // Small devices (phones)
                topOffset = -60;
                leftOffset = -125;
            } else if (window.innerWidth <= 768) {
                // Medium devices (tablets)
                topOffset = -70;
                leftOffset = -125;
            } else {
                // Large devices (desktops)
                topOffset = -80;
                leftOffset = -125;
            }
    
            welcomeMessage.style.top = `${rect.top + window.scrollY + (rect.height / 2) - (messageHeight / 2) + topOffset}px`;
            welcomeMessage.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (messageWidth / 2) + leftOffset}px`;
        }
    }
    

    chatIcon.onload = () => {
        positionWelcomeMessage();
        setTimeout(() => {
            welcomeMessage.style.opacity = '1';
            setTimeout(() => {
                welcomeMessage.style.opacity = '0';
                setTimeout(() => welcomeMessage.remove(), 500);
            }, 4000);
        }, 2000);
    };

    window.addEventListener('resize', positionWelcomeMessage);



    let popupContainer;
    let sideVector;
    let resizeObserver;

    function updateSideVectorPosition() {
        if (popupContainer && sideVector) {
            const rect = popupContainer.getBoundingClientRect();
            const sideVectorHeight = sideVector.offsetHeight;
            const sideVectorTop = rect.bottom - sideVectorHeight;
            sideVector.style.top = sideVectorTop + "20px";
            sideVector.style.left = (rect.left - sideVector.offsetWidth + 50) + "px";
        }
    }

    function handleFullscreenChange() {
        setTimeout(updateSideVectorPosition, 100);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", updateSideVectorPosition);

    chatIcon.addEventListener("click", function () {
        const audio = new Audio(botConfig.audioUrl);
        audio.play();
        chatIcon.remove();
        if (welcomeMessage) {
            welcomeMessage.remove();
        }    

        if (!popupContainer) {
            popupContainer = document.createElement("div");
            popupContainer.id = "chat-popup";
            popupContainer.innerHTML = `
                <div id="chat-controls">
                    <button id="minimize-chat">–</button>
                    <button id="close-chat">&times;</button>
                </div>
                <iframe id="chat-iframe" src="${botConfig.iframeUrl}" style="width: 100%; height: 100%;"></iframe>
            `;
            document.body.appendChild(popupContainer);
            setTimeout(() => popupContainer.classList.add("show"), 50);

            document.getElementById("close-chat").addEventListener("click", function () {
                if (popupContainer) {
                    popupContainer.classList.remove("show");
                    setTimeout(() => {
                        document.body.removeChild(popupContainer);
                        popupContainer = null;
                    }, 300);
                }
                if (sideVector) {
                    document.body.removeChild(sideVector);
                    sideVector = null;
                }
                document.body.appendChild(chatIcon);
            });

            document.getElementById("minimize-chat").addEventListener("click", function () {
                if (popupContainer) {
                    popupContainer.style.display = "none";
                }
                if (sideVector) {
                    sideVector.style.display = "none";
                }
                document.body.appendChild(chatIcon);
            });

            if (window.ResizeObserver) {
                resizeObserver = new ResizeObserver(() => updateSideVectorPosition());
                resizeObserver.observe(popupContainer);
            }
        } else {
            popupContainer.style.display = "block";
            setTimeout(() => popupContainer.classList.add("show"), 50);
        }

        if (window.innerWidth > 768) {
            if (!sideVector) {
                sideVector = document.createElement("img");
                sideVector.src = "icon cc sd (1).png";
                sideVector.id = "side-vector";
                sideVector.onload = updateSideVectorPosition;
                document.body.appendChild(sideVector);
            } else {
                sideVector.style.display = "block";
            }
            updateSideVectorPosition();
        }
    });
})();
