/*Author: Nathaniel Schiraldi
Student Number: 000855552
File Created: March 28, 2022
Description: Script used to create functionality to the asteroid space game with user validation on the index.html webpage.*/

// Global variable to keep track of the total asteroid breaks (state of the game).
let totalAsteroidBreaks = 0;

/**
 * Sets up the original state of the game.
 */
function gameSetup() {
    
    // Setting and getting variables.
    const svgNS = "http://www.w3.org/2000/svg";
    let hasError = false;
    let asteroidNumber = document.forms.asteroidForm.numberOfAsteroids.value;
    let asteroidError = document.querySelector("#asteroidError");
    let generateAsteroidsButton = document.querySelector("#generateAsteroidsButton");
    let resetGameButton = document.querySelector("#resetGameButton");

    /**
     * Validation for the number of asteroids the user chose.
     * Displays an error on the screen when the user provides an invalid input.
     */
    function asteroidValdiation() {
        if (isNaN(asteroidNumber) === false) {
            asteroidNumber = parseInt(asteroidNumber)
            if (asteroidNumber >= 1 && asteroidNumber <= 3) {
                hasError = false;
            }

            else {
                hasError = true;
                displayAsteroidError();
            }
        }

        else {
            hasError = true;
            displayAsteroidError();
        }
    }

    /**
     * Displays the error for the user.
     */
    function displayAsteroidError() {
        asteroidError.style.display="block";
    }
    
    /**
     * Generates the space background for the asteroid game. Sets the following attributes to comply with the SVG container.
     * 
     * @returns {Object} The new space object created.
     */
    function generateSpace() {
        let space = document.createElementNS(svgNS, "rect");
        space.setAttribute("id", "svgSpace");
        space.setAttribute("class", "space");
        space.setAttribute("y", "0");
        space.setAttribute("x", "0");
        space.setAttribute("width", "1280");
        space.setAttribute("height", "720");
        return space;
    }

    /**
     * Generates a circular star to be drawn in space. Sets the following attributes in order to create a circle.
     * 
     * @param {Number} number Number associated with the star.
     * @param {Number} cx Star's x-axis coordinate.
     * @param {Number} cy Star's y-axis coordinate. 
     * @param {Number} r Star's radius.
     * @returns {Object} The new star object created.
     */
    function generateStar(number, cx, cy, r) {
        let star = document.createElementNS(svgNS, "circle");
        star.setAttribute("id", "svgStar" + number);
        star.setAttribute("class", "star");
        star.setAttribute("cx", cx);
        star.setAttribute("cy", cy);
        star.setAttribute("r", r);
        return star;
    }
    
    /**
     * Generates a non-conventional (very weird) asteroid shape. Sets the following attributes in order to create a path.
     * The onmouseout attribute is set to take in a function parameter splitAsteroid which in turn has parameters asteroidNumber and totalAsteroidAmount.
     * Sets the opacity to the default so an animation can be used on the asteroid later.    
     * 
     * @param {Number} asteroidNumber Number associated with the asteroid.
     * @param {Number} totalAsteroidAmount The total number of asteroids. 
     * @param {String} d The list of commands to define a path.
     * @returns {Object} The new asteroid object created.
     */
    function generateAsteroid(asteroidNumber, totalAsteroidAmount, d) {
        let asteroid = document.createElementNS(svgNS, "path");
        asteroid.setAttribute("id", "svgAsteroid" + asteroidNumber);
        asteroid.setAttribute("class", "asteroid");
        asteroid.setAttribute("opacity", "1");
        asteroid.setAttribute("d", d);
        asteroid.setAttribute("onmouseout", "splitAsteroid(" + asteroidNumber +", " + totalAsteroidAmount + ");");
        return asteroid;
    }

    /**
     * View that creates the game components such as the stars and asteroids.
     * Also hides the display of the error text, generate asteroids button, and number of asteroids input.
     * Displays the reset button.
     */
    function createGameComponents() {
        asteroidError.style.display= "none";
        resetGameButton.style.display="inline";
        generateAsteroidsButton.style.display= "none";
        document.querySelector("#numberOfAsteroids").style.display= "none";
        
        let svg = document.getElementById("gameSection");
        
        // Measurment reference to perform calculations. 
        let svgWidth = parseInt(svg.getAttribute("width"));
        
        // SVG appends the space element.
        svg.appendChild(generateSpace());

        // Creates 45 stars in random locations and random sizes.
        // SVG appends the star element. 
        for (let starNumber = 1; starNumber <= 45; starNumber ++) {
            let starX = Math.floor(Math.random() * 1200) + 25;
            let starY = Math.floor(Math.random() * 645) + 25;
            let starR = Math.floor(Math.random() * 5) + 3;
            svg.appendChild(generateStar(starNumber, starX, starY, starR));
        }

        asteroidNumber = parseInt(asteroidNumber);
        
        // Loop used to create the required number of asteroids.
        for (let asteroidApperance = 1; asteroidApperance <= asteroidNumber; asteroidApperance ++) {
            
            let asteroidOffset = 0;
            
            // Logic used to determine an offset for the asteroids.
            if (asteroidNumber == 2) {
                if (asteroidApperance == 1) {
                    asteroidOffset -= 250;
                }
                else {
                    if (asteroidApperance == 2) {
                        asteroidOffset += 250;
                    }
                } 
            }

            if (asteroidNumber == 3) {
                if (asteroidApperance == 1) {
                    asteroidOffset -= 375;
                }
                else {
                    if (asteroidApperance == 3) {
                        asteroidOffset += 375;
                    }
                } 
            }

            // Determines the list of commands to create an asteroid path. 
            // Used this legendary tool https://yqnn.github.io/svg-path-editor/ to create the path shape of an asteroid. 
            // (This method was very painful lol. I regret doing the calculations by hand.)
            let asteroidD = String(
            "M " + ((svgWidth * 0.43828125) + asteroidOffset) + " " + (svgWidth * 0.2796875) + 
            " L " + ((svgWidth * 0.421875) + asteroidOffset) + " " + (svgWidth * 0.27265625) +
            " L " + ((svgWidth * 0.41171875) + asteroidOffset) + " " + (svgWidth * 0.25625) + 
            " L " + ((svgWidth * 0.403125) + asteroidOffset) + " " + (svgWidth * 0.24140625) + 
            " L " + ((svgWidth * 0.40546875) + asteroidOffset) + " " + (svgWidth * 0.22265625) +  
            " Q " + ((svgWidth * 0.4015625) + asteroidOffset) + " " + (svgWidth * 0.18828125) + " " + ((svgWidth * 0.43125) + asteroidOffset) + " " + (svgWidth * 0.184375) +
            " L " + ((svgWidth * 0.465625) + asteroidOffset) + " " + (svgWidth * 0.18828125) +    
            " L " + ((svgWidth * 0.49921875) + asteroidOffset) + " " + (svgWidth * 0.20390625) +     
            " L " + ((svgWidth * 0.509375) + asteroidOffset) + " " + (svgWidth * 0.24609375) +    
            " L " + ((svgWidth * 0.50234375) + asteroidOffset) + " " + (svgWidth * 0.2734325) + 
            " Q " + ((svgWidth * 0.48046875) + asteroidOffset) + " " + (svgWidth * 0.28828125) + " " + ((svgWidth * 0.459375) + asteroidOffset) + " " + (svgWidth * 0.28515625) +
            " Z");
            
            // SVG appends the asteroid element.
            svg.appendChild(generateAsteroid(asteroidApperance, asteroidNumber, asteroidD));
        }
    }

    // Calls the asteroid validation function to validate user input.
    asteroidValdiation();

    // If user input is valid the current state of the game is displayed (Number of Asteroids Broken) and the components are created.
    if (hasError === false) {
        document.querySelector("#asteroidBreakCounter").innerHTML = "<h3>Total Asteroids Broken: " + totalAsteroidBreaks + "</h3>";
        createGameComponents();
    }

}

/**
 * Function that splits the Asteroids by creating two seperate smaller asteroids inplace of the larger asteroid.
 * This function is called when the user's mouse hovers over an asteroid and leaves the asteroid. 
 * 
 * @param {Number} asteroidNumber Number associated with the asteroid.
 * @param {Number} totalAsteroidAmount The total number of asteroids. 
 */
function splitAsteroid(asteroidNumber, totalAsteroidAmount) {
    
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.getElementById("gameSection");
    let currentAsteroidOpacityValue = document.querySelector("#svgAsteroid" + asteroidNumber).getAttribute("opacity");
    currentAsteroidOpacityValue = parseInt(currentAsteroidOpacityValue);
    
    /**
     * Animation used to lower the opacity every 15 milliseconds.
     * When the opacity reaches a negative number the asteroid is removed and the interval is cleared.
     * The updateAsteroidBreakCounter function is called.
     * The opacity on the asteroid is consitently being lowered and set.    
     */
    function updateAsteroidOpacity() {
        currentAsteroidOpacityValue -= 0.1;
        if (currentAsteroidOpacityValue < 0) {
            document.querySelector("#svgAsteroid" + asteroidNumber).style.display="none";
            clearInterval(asteroidOpacityAnimation);
            updateAsteroidBreakCounter();
        }

        else {
            document.querySelector("#svgAsteroid" + asteroidNumber).setAttribute("opacity", currentAsteroidOpacityValue);
        }
    }

    /**
     * Generates the first asteroid split. Sets the following attributes in order to create a path.
     * 
     * @param {Number} asteroidNumber Number associated with the small asteroid.
     * @param {String} d The list of commands to define a path.
     * @returns {Object} The first split of an asteroid object.
     */
    function generateAsteroidSplit1(asteroidNumber, d) {
        let splitAsteroid1 = document.createElementNS(svgNS, "path");
        splitAsteroid1.setAttribute("id", "svgSplitAsteroid" + asteroidNumber);
        splitAsteroid1.setAttribute("class", "splitAsteroid");
        splitAsteroid1.setAttribute("d", d);
        return splitAsteroid1;
    }

    /**
     * Generates the second asteroid split. Sets the following attributes in order to create a path.
     * 
     * @param {Number} asteroidNumber Number associated with the small asteroid.
     * @param {String} d The list of commands to define a path.
     * @returns {Object} The second split of an asteroid object.
     */
    function generateAsteroidSplit2(asteroidNumber, d) {
        let splitAsteroid2 = document.createElementNS(svgNS, "path");
        splitAsteroid2.setAttribute("id", "svgSplitAsteroid" + asteroidNumber);
        splitAsteroid2.setAttribute("class", "splitAsteroid");
        splitAsteroid2.setAttribute("d", d);
        return splitAsteroid2;
    }
    
    /**
     * Sets the interval for the animation to be displayed every 15 milliseconds. 
     */
    let asteroidOpacityAnimation = setInterval(function() {
        updateAsteroidOpacity();
    }, 15);

    
    // Measurment reference to perform calculations.
    let svgWidth = parseInt(svg.getAttribute("width"));

    // Loop used to create the required number of split asteroids.
    for (let currentAsteroid = 1; currentAsteroid <= totalAsteroidAmount; currentAsteroid++) {
        
        let asteroidsOffset = 0;
        
        // Logic used to determine an offset for the split asteroids.
        if (totalAsteroidAmount == 2) {
            if (asteroidNumber == 1) {
                asteroidsOffset -= 250;
            }
            else {
                if (asteroidNumber == 2) {
                    asteroidsOffset += 250;
                }
            }
        }

        if (totalAsteroidAmount == 3) {
            if (asteroidNumber == 1) {
                asteroidsOffset -= 375;
            }
            else {
                if (asteroidNumber == 3) {
                    asteroidsOffset += 375;
                }
            } 
        }

        // Determines the list of commands to create an asteroid path for the first split. 
        // Used the tool https://yqnn.github.io/svg-path-editor/ to create the path shape of the first split asteroid.
        let asteroidSplit1D = String(
        "M " + ((svgWidth * 0.47421875) + asteroidsOffset) + " " + (svgWidth * 0.28359375) + 
        " L " + ((svgWidth * 0.46484375) + asteroidsOffset) + " " + (svgWidth * 0.28125) +
        " L " + ((svgWidth * 0.459375) + asteroidsOffset) + " " + (svgWidth * 0.26328125) + 
        " L " + ((svgWidth * 0.453125) + asteroidsOffset) + " " + (svgWidth * 0.24140625) + 
        " L " + ((svgWidth * 0.45234375) + asteroidsOffset) + " " + (svgWidth * 0.23125) +  
        " Q " + ((svgWidth * 0.44921875) + asteroidsOffset) + " " + (svgWidth * 0.2140625) + " " + ((svgWidth * 0.475) + asteroidsOffset) + " " + (svgWidth * 0.1984375) +
        " L " + ((svgWidth * 0.4890625) + asteroidsOffset) + " " + (svgWidth * 0.2) +    
        " L " + ((svgWidth * 0.50234375) + asteroidsOffset) + " " + (svgWidth * 0.2140625) +     
        " L " + ((svgWidth * 0.509375) + asteroidsOffset) + " " + (svgWidth * 0.24140625) +    
        " L " + ((svgWidth * 0.50234375) + asteroidsOffset) + " " + (svgWidth * 0.25234375) + 
        " Q " + ((svgWidth * 0.5015625) + asteroidsOffset) + " " + (svgWidth * 0.27265625) + " " + ((svgWidth * 0.4875) + asteroidsOffset) + " " + (svgWidth * 0.2828125) +
        " Z");
        
        // SVG appends the first split asteroid element.
        svg.appendChild(generateAsteroidSplit1(asteroidNumber, asteroidSplit1D));
        
        // Determines the list of commands to create an asteroid path for the second split. 
        // Used the tool https://yqnn.github.io/svg-path-editor/ to create the path shape of the second split asteroid.
        let asteroidSplit2D = String(
        "M " + ((svgWidth * 0.428125) + asteroidsOffset) + " " + (svgWidth * 0.27890625) + 
        " L " + ((svgWidth * 0.41875) + asteroidsOffset) + " " + (svgWidth * 0.27265625) +
        " L " + ((svgWidth * 0.41015625) + asteroidsOffset) + " " + (svgWidth * 0.2609375) + 
        " L " + ((svgWidth * 0.4078125) + asteroidsOffset) + " " + (svgWidth * 0.2484375) + 
        " L " + ((svgWidth * 0.409375) + asteroidsOffset) + " " + (svgWidth * 0.22890625) +  
        " Q " + ((svgWidth * 0.41171875) + asteroidsOffset) + " " + (svgWidth * 0.16328125) + " " + ((svgWidth * 0.46171875) + asteroidsOffset) + " " + (svgWidth * 0.196875) +
        " L " + ((svgWidth * 0.4421875) + asteroidsOffset) + " " + (svgWidth * 0.2171875) +    
        " L " + ((svgWidth * 0.44375) + asteroidsOffset) + " " + (svgWidth * 0.2328125) +     
        " L " + ((svgWidth * 0.44609375) + asteroidsOffset) + " " + (svgWidth * 0.24765625) +    
        " L " + ((svgWidth * 0.4546875) + asteroidsOffset) + " " + (svgWidth * 0.27890625) + 
        " Q " + ((svgWidth * 0.45) + asteroidsOffset) + " " + (svgWidth * 0.28359375) + " " + ((svgWidth * 0.43984375) + asteroidsOffset) + " " + (svgWidth * 0.2796875) +
        " Z");
        
        // SVG appends the first second asteroid element.
        svg.appendChild(generateAsteroidSplit2(asteroidNumber, asteroidSplit2D));

    }
}

/**
 * Function that updates the counter for asteroid breaks. Increments the amount once per break.
 */
function updateAsteroidBreakCounter() {
    totalAsteroidBreaks ++;
    document.querySelector("#asteroidBreakCounter").innerHTML = "<h3>Total Asteroids Broken: " + totalAsteroidBreaks + "</h3>";
}

/**
 * Function that resets the game state so it becomes playable again. 
 * This would be considered the function called by an input element that doesn't use a form (This is how I interpreted the instructions, sorry if this is incorrect). 
 * This function accomplishes a neccesary action in order for the state of the game to be viewd as useful.
 * Hides the display of the reset buttons but enables the display of generate asteroids button and the number of asteroids input.
 * Removes all the previous dynamic SVG graphic elements.
 */
function resetGameState() {
    document.querySelector("#resetGameButton").style.display="none";
    document.querySelector("#generateAsteroidsButton").style.display = "inline";
    document.querySelector("#numberOfAsteroids").style.display = "inline";
    document.forms.asteroidForm.numberOfAsteroids.value = "";

    let removeGraphicElements = document.querySelector("#gameSection");
    
    while (removeGraphicElements.firstChild) {
        removeGraphicElements.removeChild(removeGraphicElements.lastChild);
    }

}