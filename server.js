const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// API endpoint to get events
app.get('/api/events', (req, res) => {
  const events = {
    "coding": [
      {
        id: 1,
        title: "Hackathon 2023",
        date: "2023-09-15",
        time: "9:00 AM - 9:00 PM",
        location: "Computer Science Building",
        description: "24-hour coding competition to solve real-world problems",
        seats: 50,
        registered: 32
      },
      {
        id: 2,
        title: "Web Development Workshop",
        date: "2023-09-22",
        time: "2:00 PM - 5:00 PM",
        location: "Lab 101",
        description: "Learn modern web development techniques with React",
        seats: 30,
        registered: 18
      },
      {
        id: 3,
        title: "Competitive Programming Contest",
        date: "2023-10-05",
        time: "10:00 AM - 1:00 PM",
        location: "Online",
        description: "Sharpen your algorithmic skills with this coding contest",
        seats: 100,
        registered: 45
      }
    ],
    "sports": [
      {
        id: 4,
        title: "Inter-Department Cricket Tournament",
        date: "2023-09-18",
        time: "3:00 PM - 6:00 PM",
        location: "KLU Cricket Ground",
        description: "Annual cricket tournament between departments",
        seats: 88,
        registered: 66
      },
      {
        id: 5,
        title: "Basketball Training Camp",
        date: "2023-09-25",
        time: "4:00 PM - 6:00 PM",
        location: "Indoor Sports Complex",
        description: "Training camp for basketball enthusiasts",
        seats: 20,
        registered: 12
      }
    ],
    "music": [
      {
        id: 6,
        title: "Classical Music Night",
        date: "2023-09-20",
        time: "6:00 PM - 8:00 PM",
        location: "Auditorium",
        description: "An evening of classical music performances",
        seats: 200,
        registered: 120
      },
      {
        id: 7,
        title: "Band Practice Session",
        date: "2023-09-27",
        time: "5:00 PM - 7:00 PM",
        location: "Music Room",
        description: "Practice session for the university band",
        seats: 15,
        registered: 10
      }
    ],
    "art": [
      {
        id: 8,
        title: "Art Exhibition",
        date: "2023-09-30",
        time: "10:00 AM - 4:00 PM",
        location: "Art Gallery",
        description: "Exhibition of student artwork",
        seats: 150,
        registered: 85
      },
      {
        id: 9,
        title: "Photography Workshop",
        date: "2023-10-02",
        time: "2:00 PM - 5:00 PM",
        location: "Design Studio",
        description: "Learn photography techniques from professionals",
        seats: 25,
        registered: 18
      }
    ]
  };
  
  res.json(events);
});

// API endpoint to register for an event
app.post('/api/register', (req, res) => {
  const { eventId, studentEmail } = req.body;
  
  // In a real app, you would save this to a database
  console.log(`Student ${studentEmail} registered for event ${eventId}`);
  
  // Simulate successful registration
  res.json({ success: true, message: "Registration successful" });
});

// API endpoint for admin login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, you would check against a database
  // For demo purposes, use admin@kluniversity.in and password: admin123
  if (email === 'admin@kluniversity.in' && password === 'admin123') {
    res.json({ success: true, token: 'demo-token-12345' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// API endpoint to add a new event (admin only)
app.post('/api/admin/events', (req, res) => {
  // In a real app, you would validate the admin token and save to a database
  const event = req.body;
  console.log('New event added:', event);
  
  res.json({ success: true, message: "Event added successfully" });
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});