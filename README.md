# Disaster Management Frontend

This is the frontend of the Disaster Management Application built using React. It features an interactive map, incident dashboard, reporting form, filter panel, detailed incident view, and live disaster news.

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/gargisawaria/Disaster_Management_FrontEnd.git
cd Disaster_Management_FrontEnd

2. Install dependencies

npm install

3. Start the backend server first
    Make sure your backend is running before launching the frontend.

 4. Start the frontend

npm start

🔍 Application Features

![image](https://github.com/user-attachments/assets/a3dec653-267a-4f70-bdb2-cbd0c36791ad)

✅ Dashboard

    Navigate to Dashboard after the app loads.

    Displays an interactive map with markers for each incident.

    Clicking a marker will zoom in and show a popup with incident info.

📊 Incident Table

    Located below the map.

    Built using AG Grid React: supports sorting, filtering, and row selection.

    Clicking on any row navigates to a detailed incident view page.
![image](https://github.com/user-attachments/assets/08127598-0a60-4056-9a71-5afc4ba94a63)

➕ Add Incident

    Click the “+” icon to open a modal form.

    Submit new incident data through this modal.

![image](https://github.com/user-attachments/assets/13a3f2bf-6006-48c0-9758-97e06576aee6)

🎛️ Filter Panel

    Click the “Filter” button above the table.

    A sidebar opens allowing advanced filtering by type, severity, etc.
![image](https://github.com/user-attachments/assets/004f3b22-95f5-470b-a442-5965f091c3fe)

📰 Disaster News

    Click “News” in the top navigation bar.

    Shows latest disaster-related news using NewsData.io API.

    Includes an infinite loader to scroll through news feed.

![image](https://github.com/user-attachments/assets/9abd535e-e475-43af-9672-0f22338b25ee)

