// Handle logout functionality
document.querySelector('.logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    // Add your logout logic here
    window.location.href = 'index.html';
});

// Handle card clicks
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        // Add navigation logic for each option
        const title = card.querySelector('.option-title').textContent;
        console.log(`Clicked: ${title}`);
        // Add your navigation logic here
    });
});


// Existing code remains the same

// Add these new functions
document.addEventListener('DOMContentLoaded', () => {
    const createResumeCard = document.querySelector('.option-card');
    const mainContainer = document.querySelector('.container');
    const resumeBuilder = document.querySelector('.resume-builder');
    const jobDescriptionForm = document.querySelector('.job-description-form');
    const resumeSections = document.querySelector('.resume-sections');
    const sectionButtons = document.querySelectorAll('.section-btn');
    const sectionContents = document.querySelectorAll('.section-content');

    // Handle create resume click
    createResumeCard.addEventListener('click', (e) => {
        e.preventDefault();
        mainContainer.querySelector('h1').style.display = 'none';
        mainContainer.querySelector('.options-grid').style.display = 'none';
        resumeBuilder.style.display = 'block';
    });

    // Handle job description form submission
    document.getElementById('jobDetailsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            companyName: document.getElementById('companyName').value,
            jobTitle: document.getElementById('jobTitle').value,
            position: document.getElementById('position').value,
            skillsRequired: document.getElementById('skillsRequired').value,
            workDescription: document.getElementById('workDescription').value,
            prerequisites: document.getElementById('prerequisites').value
        };
        
        // Store in sessionStorage (will be cleared when browser closes)
        sessionStorage.setItem('jobDetails', JSON.stringify(formData));
        
        // Show resume sections
        jobDescriptionForm.style.display = 'none';
        resumeSections.style.display = 'flex';
    });

    // Handle section navigation
    sectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            sectionButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all sections
            sectionContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected section
            const sectionId = button.dataset.section;
            document.getElementById(sectionId).style.display = 'block';
        });
    });

    // Handle personal information form submission
    document.getElementById('personalInfoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            fullName: document.getElementById('fullName').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value
        };
        
        // Store in sessionStorage
        sessionStorage.setItem('personalInfo', JSON.stringify(formData));
        alert('Personal information saved successfully!');
    });

    // Clear stored data on logout
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        sessionStorage.clear();
    });
});