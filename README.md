# Video Processing Platform

A professional web application for video processing, featuring video upscaling, compression, and automatic subtitle generation.

## Features

- Video upload with drag-and-drop support
- AI-powered video upscaling
- Smart video compression
- Automatic subtitle generation
- Built-in video player
- User authentication
- Personal dashboard
- Download processed videos

## Prerequisites

- Python 3.8 or higher
- FFmpeg installed on your system
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd video-processing-platform
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required packages:
```bash
pip install -r requirements.txt
```

4. Initialize the database:
```bash
python app.py
```

5. The application will be available at `http://localhost:5000`

## Usage

1. Register a new account or login
2. Upload your video through the dashboard
3. Select the desired processing options:
   - Video upscaling
   - Video compression
   - Subtitle generation
4. Wait for the processing to complete
5. View, download, or delete your processed videos

## Project Structure

```
video-processing-platform/
├── app.py                 # Main application file
├── requirements.txt       # Python dependencies
├── static/               # Static files
│   ├── css/             # CSS styles
│   └── js/              # JavaScript files
├── templates/           # HTML templates
│   ├── base.html       # Base template
│   ├── index.html      # Landing page
│   └── dashboard.html  # User dashboard
└── uploads/            # Upload directory
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
