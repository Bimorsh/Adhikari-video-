// Handle drag and drop functionality
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropZone.classList.remove('dragover');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
}

// Handle file selection
if (fileInput) {
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

function handleFiles(files) {
    const file = files[0];
    if (file && file.type.startsWith('video/')) {
        uploadFile(file);
    } else {
        alert('Please select a valid video file');
    }
}

// Handle file upload
function uploadFile(file) {
    const formData = new FormData();
    formData.append('video', file);
    
    // Get processing options
    const upscale = document.getElementById('upscaleOption').checked;
    const compress = document.getElementById('compressOption').checked;
    const subtitle = document.getElementById('subtitleOption').checked;
    
    formData.append('upscale', upscale);
    formData.append('compress', compress);
    formData.append('subtitle', subtitle);

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress';
    progressBar.innerHTML = `
        <div class="progress-bar" role="progressbar" style="width: 0%" 
             aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    `;
    dropZone.appendChild(progressBar);

    // Upload with progress tracking
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            progressBar.querySelector('.progress-bar').style.width = percentComplete + '%';
        }
    });

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            window.location.reload(); // Refresh to show new video
        } else {
            alert('Upload failed. Please try again.');
        }
        progressBar.remove();
    };

    xhr.onerror = function() {
        alert('Upload failed. Please try again.');
        progressBar.remove();
    };

    xhr.send(formData);
}

// Handle video deletion
function deleteVideo(videoId) {
    if (confirm('Are you sure you want to delete this video?')) {
        fetch(`/delete-video/${videoId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert('Failed to delete video. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete video. Please try again.');
        });
    }
}

// Initialize video players
document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.video-js');
    players.forEach(player => {
        videojs(player);
    });
});
