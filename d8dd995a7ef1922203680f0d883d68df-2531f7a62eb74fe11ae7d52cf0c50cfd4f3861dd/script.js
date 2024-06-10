document.addEventListener('DOMContentLoaded', () => {
    const branches = document.querySelectorAll('.branch');
    branches.forEach(branch => {
        branch.addEventListener('click', () => {
            const branchName = branch.getAttribute('data-branch');
            const year = branch.parentElement.nextElementSibling.id;
            displayNotes(branchName, year);
        });
    });

    function displayNotes(branch, year) {
        const notesSection = document.getElementById(year);
        notesSection.innerHTML = `
            <h3>${branch} Notes</h3>
            <ul>
                <li><a href="#">Subject 1 Notes</a></li>
                <li><a href="#">Subject 2 Notes</a></li>
                <li><a href="#">Subject 3 Notes</a></li>
                <li><a href="#">PYQs</a></li>
                <li><a href="#">Lab Manual</a></li>
                <li><a href="#">Viva Questions</a></li>
                <li><a href="#">Practice Questions</a></li>
            </ul>
        `;
        notesSection.style.display = 'block';
        notesSection.classList.remove('hidden');
        notesSection.classList.add('fade-in');
    }
});








document.addEventListener('DOMContentLoaded', () => {
    // Existing JavaScript code

    // Visitor Counter
    const visitorCountElement = document.getElementById('visitor-count');
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 1000;

    // Function to update visitor count
    function updateVisitorCount() {
        visitorCount++;
        localStorage.setItem('visitorCount', visitorCount);
        visitorCountElement.textContent = visitorCount;
    }

    // Update visitor count on page load
    updateVisitorCount();
});







document.addEventListener('DOMContentLoaded', () => {
    const modeSelector = document.getElementById('mode-selector');
    const modes = ['default', 'dark-mode', 'bright-mode', 'gradient-mode', 'fancy-mode', 'happy-mode'];

    modeSelector.addEventListener('change', () => {
        document.body.classList.remove(...modes);
        const selectedMode = modeSelector.value;
        if (selectedMode === 'happy-mode') {
            addSmileys();
        } else {
            removeSmileys();
        }
        if (selectedMode !== 'default') {
            document.body.classList.add(selectedMode);
        }
    });

    function addSmileys() {
        removeSmileys();
        for (let i = 0; i < 50; i++) {
            const smiley = document.createElement('div');
            smiley.classList.add('smiley');
            smiley.textContent = '😊';
            smiley.style.top = `${Math.random() * 100}vh`;
            smiley.style.left = `${Math.random() * 100}vw`;
            smiley.style.animationDuration = `${Math.random() * 3 + 2}s`;
            document.body.appendChild(smiley);
        }
    }

    function removeSmileys() {
        const smileys = document.querySelectorAll('.smiley');
        smileys.forEach(smiley => smiley.remove());
    }
});



/**
 * YouTube Tutorial:
 * https://youtu.be/wG_5453Vq98
 */

console.clear();

// Select the circle element
const circleElement = document.querySelector('.circle');

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Update mouse position on the 'mousemove' event
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.17;

// Start animation
const tick = () => {
  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
}

// Start the animation loop
tick();



















document.getElementById('chatBotButton').addEventListener('click', function() {
    document.getElementById('chatBotWindow').style.display = 'block';
});

document.getElementById('closeChatBot').addEventListener('click', function() {
    document.getElementById('chatBotWindow').style.display = 'none';
});

document.getElementById('sendMessage').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'user-message';
        userMessageElement.textContent = userInput;
        document.getElementById('chatBody').appendChild(userMessageElement);
        document.getElementById('userInput').value = '';

        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'bot-message';
        botMessageElement.textContent = getBotResponse(userInput);
        document.getElementById('chatBody').appendChild(botMessageElement);
        
        // Scroll to the bottom of the chat
        document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight;
    }
}

function getBotResponse(userInput) {
    const responses = {
        'hello': 'Hi there! How can I assist you?',
        'how are you': 'I am just a bot, but I am here to help you!',
        'bye': 'Goodbye! Have a great day!',
        'what is btech': 'B.Tech is a four-year undergraduate program focused on engineering and technology.',
        'available branches': 'The available branches are Computer Science, Mechanical, Electrical, Civil, Electronics, and more.',
        'cs notes': 'You can find Computer Science notes for all years on our website.',
        'mechanical notes': 'Mechanical Engineering notes are available for all years on our resources page.',
        'electrical notes': 'Electrical Engineering notes are provided for all years.',
        'civil notes': 'We have Civil Engineering notes for all years.',
        'electronics notes': 'Notes for Electronics Engineering are available for all years.',
        'first year notes': 'First-year notes for all branches are available.',
        'second year notes': 'Second-year notes can be found on the website for all branches.',
        'third year notes': 'We have third-year notes for all branches.',
        'fourth year notes': 'Fourth-year notes are available for all branches.',
        'cs resources': 'Computer Science resources include tutorials, past papers, and project ideas.',
        'mechanical resources': 'Mechanical Engineering resources include lab manuals, project ideas, and tutorials.',
        'electrical resources': 'Resources for Electrical Engineering include tutorials, past papers, and lab manuals.',
        'civil resources': 'Civil Engineering resources include project ideas, past papers, and tutorials.',
        'electronics resources': 'Electronics Engineering resources include lab manuals, project ideas, and past papers.',
        'cs books': 'Recommended books for Computer Science are listed on our website.',
        'mechanical books': 'We have a list of recommended books for Mechanical Engineering.',
        'electrical books': 'Check out our recommended books for Electrical Engineering.',
        'civil books': 'Recommended books for Civil Engineering are available.',
        'electronics books': 'We have a list of recommended books for Electronics Engineering.',
        'project ideas': 'You can find project ideas for all branches and years on our project ideas page.',
        'past papers': 'Past papers for all branches and years are available on our website.',
        'lab manuals': 'Lab manuals for all branches and years can be found in our resources section.',
        'tutorials': 'Tutorials for various subjects in B.Tech are available on our tutorials page.',
        'admission process': 'The admission process varies by institution but generally includes entrance exams like JEE.',
        'fee structure': 'Fee structure details can be found on the respective institution\'s website.',
        'scholarships': 'Various scholarships are available for B.Tech students based on merit and need.',
        'internship opportunities': 'Internship opportunities are often listed on our career resources page.',
        'placement statistics': 'Placement statistics can be found in the placement section of our website.',
        'exam dates': 'Exam dates are typically announced by the respective institutions.',
        'syllabus': 'The syllabus for each branch and year is available on our website.',
        'faculty': 'Information about faculty members can be found on the respective department\'s page.',
        'research opportunities': 'Research opportunities are available in various departments and labs.',
        'workshops': 'Workshops on different topics are regularly organized and listed on our events page.',
        'seminars': 'Seminars are conducted on various topics and details are available on the events page.',
        'clubs and societies': 'Information about student clubs and societies can be found on the student life page.',
        'hostel facilities': 'Details about hostel facilities are available on the accommodation page.',
        'transportation': 'Transportation details and routes are listed on our website.',
        'canteen services': 'Information about canteen services is available on the facilities page.',
        'library resources': 'Library resources include books, journals, and digital materials.',
        'sports facilities': 'Details about sports facilities are available on the sports page.',
        'cultural activities': 'Information about cultural activities can be found on the student life page.',
        'contact information': 'Contact information for various departments is listed on our contact page.',
        'alumni network': 'Our alumni network details and events are listed on the alumni page.',
        // Add more responses as needed
    };
    
    return responses[userInput.toLowerCase()] || "I'm sorry, I don't understand that. Please ask something else related to B.Tech notes and resources.";
}
