document.addEventListener('DOMContentLoaded', function() {
    const nameSelect = document.getElementById('name-select');
    const projectSelect = document.getElementById('project-select');
    const ctaButton = document.querySelector('.cta-button');
    
    // Clear any existing options first
    nameSelect.innerHTML = '';
    
    // Load names dynamically
    loadNamesFromManifest();
    
    async function loadNamesFromManifest() {
        try {
            console.log('Starting to load manifest...');
            
            // First, fetch the manifest file with cache busting
            const timestamp = new Date().getTime();
            console.log(`Fetching manifest with timestamp: ${timestamp}`);
            
            const manifestResponse = await fetch(`names/manifest.json?t=${timestamp}`, {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const manifest = await manifestResponse.json();
            
            console.log('Manifest loaded:', manifest);
            console.log('Files to load:', manifest.files.length);
            
            // Load each name file listed in manifest
            for (let i = 0; i < manifest.files.length; i++) {
                const fileName = manifest.files[i];
                console.log(`\n===== Loading file ${i + 1}: ${fileName} =====`);
                
                try {
                    const fileResponse = await fetch(`names/${fileName}?t=${timestamp}`, {
                        cache: 'no-cache',
                        headers: {
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                        }
                    });
                    
                    console.log(`Response status for ${fileName}: ${fileResponse.status}`);
                    
                    if (!fileResponse.ok) {
                        throw new Error(`HTTP error! status: ${fileResponse.status}`);
                    }
                    
                    const nameData = await fileResponse.json();
                    
                    console.log(`Successfully loaded ${fileName}:`, nameData);
                    
                    // Create option element
                    const option = document.createElement('option');
                    option.value = nameData.name;
                    option.textContent = nameData.name;
                    nameSelect.appendChild(option);
                    
                    console.log(`Added ${nameData.name} to dropdown`);
                    
                } catch (error) {
                    console.error(`ERROR with ${fileName}:`, error);
                    console.error(`Error type: ${error.name}`);
                    console.error(`Error message: ${error.message}`);
                }
            }
            
            console.log(`\nTotal options added: ${nameSelect.children.length}`);
            
            // Add a default "Select name" option at the beginning
            if (nameSelect.children.length > 0) {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select name';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                nameSelect.insertBefore(defaultOption, nameSelect.firstChild);
                console.log('Default option added');
            }
            
        } catch (error) {
            console.error('Error loading manifest:', error);
            console.error('Full error details:', error.stack);
            
            // Fallback option if manifest fails to load
            const errorOption = document.createElement('option');
            errorOption.value = '';
            errorOption.textContent = 'Unable to load names';
            errorOption.disabled = true;
            nameSelect.appendChild(errorOption);
        }
    }
    
    // Your original click handler
    ctaButton.addEventListener('click', function() {
        console.log('Selected name:', nameSelect.value);
        console.log('Selected project:', projectSelect.value);
        
        // Open the GitHub URL for the selected project and username
        if (nameSelect.value && projectSelect.value) {
            const githubUrl = `https://github.com/Salamander-Tech-Hub/${projectSelect.value}/tree/main/${nameSelect.value}`;
            window.open(githubUrl, '_blank');
        } else {
            alert('Please select both name and project');
        }
    });
    
    // Optional: Add change event listeners for real-time feedback
    nameSelect.addEventListener('change', function() {
        console.log(`Name changed to: ${this.value}`);
    });
    
    projectSelect.addEventListener('change', function() {
        console.log(`Project changed to: ${this.value}`);
    });
});