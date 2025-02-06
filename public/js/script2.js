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

// Profile Links Section
let profileData = JSON.parse(sessionStorage.getItem('profiles')) || [];
let educationData = JSON.parse(sessionStorage.getItem('education')) || [];
let currentEditIndex = -1;

function saveProfile() {
    const siteName = document.getElementById('siteName');
    const profileUrl = document.getElementById('profileUrl');
    
    if (!siteName.value || !profileUrl.value) {
        alert('Please fill all fields');
        return;
    }
    
    const profile = {
        site: siteName.value,
        url: profileUrl.value
    };
    
    if (currentEditIndex >= 0) {
        profileData[currentEditIndex] = profile;
        currentEditIndex = -1;
    } else {
        profileData.push(profile);
    }
    
    sessionStorage.setItem('profiles', JSON.stringify(profileData));
    displayProfilesTable();
    
    // Clear inputs
    siteName.value = '';
    profileUrl.value = '';
}

function displayProfilesTable() {
    const container = document.getElementById('profiles-display');
    if (!container) return;

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Site Name</th>
                    <th>URL</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${profileData.map((profile, index) => `
                    <tr>
                        <td>${profile.site}</td>
                        <td>${profile.url}</td>
                        <td>
                            <button onclick="editProfile(${index})" class="edit-btn">Edit</button>
                            <button onclick="deleteProfile(${index})" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function editProfile(index) {
    currentEditIndex = index;
    const profile = profileData[index];
    document.getElementById('siteName').value = profile.site;
    document.getElementById('profileUrl').value = profile.url;
}

function deleteProfile(index) {
    if (confirm('Are you sure you want to delete this profile?')) {
        profileData.splice(index, 1);
        sessionStorage.setItem('profiles', JSON.stringify(profileData));
        displayProfilesTable();
    }
}


function updateGradeInputs() {
    const gradeType = document.getElementById('gradeType').value;
    const gradeInputs = document.getElementById('gradeInputs');
    
    gradeInputs.innerHTML = '';
    
    if(gradeType === 'gpa' || gradeType === 'percentage') {
        gradeInputs.innerHTML = `
            <div class="form-group">
                <label>Scored ${gradeType.toUpperCase()}</label>
                <input type="number" id="scored" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Maximum ${gradeType.toUpperCase()}</label>
                <input type="number" id="maximum" step="0.01" required>
            </div>
        `;
    } else if(gradeType === 'grade') {
        gradeInputs.innerHTML = `
            <div class="form-group">
                <label>Grade</label>
                <input type="text" id="grade" required>
            </div>
        `;
    }
}

function displayEducationTable() {
    const container = document.getElementById('education-display');
    if (!container) return;

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Place of Study</th>
                    <th>Course</th>
                    <th>Duration</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${educationData.map((edu, index) => `
                    <tr>
                        <td>${edu.place}</td>
                        <td>${edu.course}</td>
                        <td>${edu.startMonth}/${edu.startYear} - ${edu.endMonth}/${edu.endYear}</td>
                        <td>${formatGrade(edu)}</td>
                        <td>
                            <button onclick="editEducation(${index})" class="edit-btn">Edit</button>
                            <button onclick="deleteEducation(${index})" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function formatGrade(edu) {
    if (edu.gradeType === 'gpa' || edu.gradeType === 'percentage') {
        return `${edu.scored}/${edu.maximum} ${edu.gradeType.toUpperCase()}`;
    }
    return edu.grade;
}

function saveEducation() {
    const inputs = {
        place: document.getElementById('placeOfStudy').value,
        course: document.getElementById('course').value,
        startMonth: document.getElementById('startMonth').value,
        startYear: document.getElementById('startYear').value,
        endMonth: document.getElementById('endMonth').value,
        endYear: document.getElementById('endYear').value,
        gradeType: document.getElementById('gradeType').value
    };
    
    if (Object.values(inputs).some(value => !value)) {
        alert('Please fill all fields');
        return;
    }
    
    if (inputs.gradeType === 'gpa' || inputs.gradeType === 'percentage') {
        inputs.scored = document.getElementById('scored').value;
        inputs.maximum = document.getElementById('maximum').value;
        if (!inputs.scored || !inputs.maximum) {
            alert('Please fill grade information');
            return;
        }
    } else if (inputs.gradeType === 'grade') {
        inputs.grade = document.getElementById('grade').value;
        if (!inputs.grade) {
            alert('Please fill grade information');
            return;
        }
    }
    
    if (currentEditIndex >= 0) {
        educationData[currentEditIndex] = inputs;
        currentEditIndex = -1;
    } else {
        educationData.push(inputs);
    }
    
    sessionStorage.setItem('education', JSON.stringify(educationData));
    displayEducationTable();
    clearEducationForm();
}

function editEducation(index) {
    currentEditIndex = index;
    const edu = educationData[index];
    
    document.getElementById('placeOfStudy').value = edu.place;
    document.getElementById('course').value = edu.course;
    document.getElementById('startMonth').value = edu.startMonth;
    document.getElementById('startYear').value = edu.startYear;
    document.getElementById('endMonth').value = edu.endMonth;
    document.getElementById('endYear').value = edu.endYear;
    document.getElementById('gradeType').value = edu.gradeType;
    
    // Trigger grade type change to show appropriate inputs
    updateGradeInputs();
    
    // Fill grade information
    setTimeout(() => {
        if (edu.gradeType === 'gpa' || edu.gradeType === 'percentage') {
            document.getElementById('scored').value = edu.scored;
            document.getElementById('maximum').value = edu.maximum;
        } else if (edu.gradeType === 'grade') {
            document.getElementById('grade').value = edu.grade;
        }
    }, 0);
}

function deleteEducation(index) {
    if (confirm('Are you sure you want to delete this education record?')) {
        educationData.splice(index, 1);
        sessionStorage.setItem('education', JSON.stringify(educationData));
        displayEducationTable();
    }
}

function clearEducationForm() {
    document.getElementById('placeOfStudy').value = '';
    document.getElementById('course').value = '';
    document.getElementById('startMonth').value = '';
    document.getElementById('startYear').value = '';
    document.getElementById('endMonth').value = '';
    document.getElementById('endYear').value = '';
    document.getElementById('gradeType').value = '';
    document.getElementById('gradeInputs').innerHTML = '';
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Profile Links
    document.getElementById('saveProfileBtn')?.addEventListener('click', saveProfile);
    displayProfilesTable();
    
    // Education
    document.getElementById('gradeType')?.addEventListener('change', updateGradeInputs);
    document.getElementById('saveEducationBtn')?.addEventListener('click', saveEducation);
    displayEducationTable();
});


let experienceData = JSON.parse(sessionStorage.getItem('experience')) || [];
let currentEditInd = -1;

function saveExperience() {
    const inputs = {
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        startMonth: document.getElementById('expStartMonth').value,
        startYear: document.getElementById('expStartYear').value,
        endMonth: document.getElementById('expEndMonth').value,
        endYear: document.getElementById('expEndYear').value,
        skills: document.getElementById('jobSkills').value,
        description: document.getElementById('jobDescription').value
    };
    
    if (Object.values(inputs).some(value => !value)) {
        alert('Please fill all fields');
        return;
    }
    
    if (currentEditInd >= 0) {
        experienceData[currentEditInd] = inputs;
        currentEditInd = -1;
    } else {
        experienceData.push(inputs);
    }
    
    sessionStorage.setItem('experience', JSON.stringify(experienceData));
    displayExperienceTable();
    clearExperienceForm();
}

function displayExperienceTable() {
    const container = document.getElementById('experience-display');
    if (!container) return;

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Duration</th>
                    <th>Skills</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${experienceData.map((exp, index) => `
                    <tr>
                        <td>${exp.company}</td>
                        <td>${exp.position}</td>
                        <td>${exp.startMonth}/${exp.startYear} - ${exp.endMonth}/${exp.endYear}</td>
                        <td>${exp.skills}</td>
                        <td>
                            <button onclick="editExperience(${index})" class="edit-btn">Edit</button>
                            <button onclick="deleteExperience(${index})" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function clearExperienceForm() {
    document.getElementById('company').value = '';
    document.getElementById('position').value = '';
    document.getElementById('expStartMonth').value = '';
    document.getElementById('expStartYear').value = '';
    document.getElementById('expEndMonth').value = '';
    document.getElementById('expEndYear').value = '';
    document.getElementById('jobSkills').value = '';
    document.getElementById('jobDescription').value = '';
}

function editExperience(index) {
    currentEditInd = index;
    const exp = experienceData[index];
    
    document.getElementById('company').value = exp.company;
    document.getElementById('position').value = exp.position;
    document.getElementById('expStartMonth').value = exp.startMonth;
    document.getElementById('expStartYear').value = exp.startYear;
    document.getElementById('expEndMonth').value = exp.endMonth;
    document.getElementById('expEndYear').value = exp.endYear;
    document.getElementById('jobSkills').value = exp.skills;
    document.getElementById('jobDescription').value = exp.description;
}

function deleteExperience(index) {
    if (confirm('Are you sure you want to delete this experience record?')) {
        experienceData.splice(index, 1);
        sessionStorage.setItem('experience', JSON.stringify(experienceData));
        displayExperienceTable();
    }
}

// Save and Next functionality for all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        'personal-info',
        'profile-links',
        'education',
        'experience',
        'projects',
        'skills',
        'certifications',
        'accomplishments',
        'extra-curricular'
    ];

    // Function to move to next section
    function moveToNextSection(currentSectionId) {
        const currentIndex = sections.indexOf(currentSectionId);
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            
            // Remove active class from all buttons
            document.querySelectorAll('.section-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to next section button
            document.querySelector(`[data-section="${nextSection}"]`).classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show next section
            document.getElementById(nextSection).style.display = 'block';
        }
    }

    // Add event listeners for save and next buttons
    document.querySelectorAll('.save-next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentSection = e.target.closest('.section-content').id;
            
            // Save current section data
            if (currentSection === 'personal-info') {
                document.getElementById('personalInfoForm').dispatchEvent(new Event('submit'));
            } else if (currentSection === 'profile-links') {
                const siteName = document.getElementById('siteName').value;
                const profileUrl = document.getElementById('profileUrl').value;
                if (siteName && profileUrl) {
                    saveProfile();
                }
            } else if (currentSection === 'education') {
                saveEducation();
            } else if (currentSection === 'experience') {
                saveExperience();
            }
            
            // Move to next section
            moveToNextSection(currentSection);
        });
    });

    // Initialize experience section display
    displayExperienceTable();
});