(function () {
    const botConfig = {
        botId: "cm2g51wzj2i0kn8bkqdvvnyx9", // Bot ID
        backendUrl: "https://your-backend-url.com", // Your chatbot backend
        iconUrl: "./front.png", // Main chat icon URL (PNG vector)
        audioUrl: "music.mp3", // Audio file to play on click
        iframeUrl: "https://chatbot-test-961251512.asia-south2.run.app/", // Chatbot iframe URL
    };

    // Inject responsive CSS styles into the document head
    const style = document.createElement('style');
    style.innerHTML = `
        /* Chat popup base style */
        #chat-popup {
            position: fixed;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            border-radius: 50px;
            transition: all 0.3s ease;
        }
        /* Mobile: full-screen */
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
        /* Laptop style: larger, centered popup */
        @media (min-width: 769px) and (max-width: 1023px) {
            #chat-popup {
                width: 80%;
                height: 90%;
                bottom: 8%;
                left: 12%;
                right: auto;
                border-radius: 10px;
            }
        }
        /* Desktop: widget with dynamic height based on viewport */
        @media (min-width: 1024px) {
            #chat-popup {
                width: 450px;
                height: 90vh;       /* 70% of the viewport height */
                max-height: 700px;  /* Optional maximum height */
                bottom: 5vh;       /* Using viewport units for spacing */
                right: 5%;
                left: auto;
                border-radius: 10px;
            }
        }
        /* Chat icon style */
        #chat-icon {
            position: fixed;
            bottom: 8%;
            right: 20px;
            cursor: pointer;
            height: 250px;
            width: auto;
        }
        /* Side vector style (desktop only) */
        #side-vector {
            position: fixed;
            height: 250px;
            width: auto;
            z-index: 1000;
            transform: scaleX(-1);
        }
        /* Chat controls style */
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

    // Create the main chat icon element
    const chatIcon = document.createElement("img");
    chatIcon.src = botConfig.iconUrl;
    chatIcon.id = "chat-icon";
    document.body.appendChild(chatIcon);

    let popupContainer;  // The chat popup container
    let sideVector;      // The left PNG element (desktop only)
    let resizeObserver;  // Observer for resizing the chat popup

    // Update side vector position relative to the chat popup
    function updateSideVectorPosition() {
        if (popupContainer && sideVector) {
            const rect = popupContainer.getBoundingClientRect();
            // Calculate offset to vertically center the side vector relative to the popup container
            const offset = (popupContainer.offsetHeight / 2) - (sideVector.offsetHeight / 2)+120;
            sideVector.style.top = (rect.top + offset) + "px";
            sideVector.style.left = (rect.left - sideVector.offsetWidth - 10) + "px";
        }
    }

    // Listen for fullscreen changes and window resize to update positioning
    function handleFullscreenChange() {
        setTimeout(updateSideVectorPosition, 100);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", updateSideVectorPosition);

    // On clicking the main chat icon
    chatIcon.addEventListener("click", function () {
        // Play audio when the icon is clicked
        const audio = new Audio(botConfig.audioUrl);
        audio.play();

        // Remove the main chat icon
        chatIcon.remove();

        // Create (or show) the chat popup container with the iframe and control buttons
        if (!popupContainer) {
            popupContainer = document.createElement("div");
            popupContainer.id = "chat-popup";
            popupContainer.innerHTML = `
                <div id="chat-controls">
                    <button id="minimize-chat">–</button>
                    <button id="close-chat">&times;</button>
                </div>
                <iframe id="chat-iframe" src="${botConfig.iframeUrl}" style="width: 100%; height: 100%; border-radius:10px;"></iframe>
            `;
            document.body.appendChild(popupContainer);

            // Attach event listeners for the control buttons
            document.getElementById("close-chat").addEventListener("click", function () {
                if (popupContainer) {
                    document.body.removeChild(popupContainer);
                    popupContainer = null;
                }
                if (sideVector) {
                    document.body.removeChild(sideVector);
                    sideVector = null;
                }
                // Re-add the chat icon
                document.body.appendChild(chatIcon);
            });

            document.getElementById("minimize-chat").addEventListener("click", function () {
                if (popupContainer) {
                    popupContainer.style.display = "none";
                }
                if (sideVector) {
                    sideVector.style.display = "none";
                }
                // Re-add the chat icon
                document.body.appendChild(chatIcon);
            });

            // Initialize ResizeObserver (if available) to adjust side vector on size changes
            if (window.ResizeObserver) {
                resizeObserver = new ResizeObserver(() => {
                    updateSideVectorPosition();
                });
                resizeObserver.observe(popupContainer);
            }
        } else {
            popupContainer.style.display = "block";
        }

        // For non-mobile devices, create/show the left side vector.
        if (window.innerWidth > 768) {
            if (!sideVector) {
                sideVector = document.createElement("img");
                sideVector.src = "side.png"; // Your PNG vector URL
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
