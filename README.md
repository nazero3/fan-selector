# Fan Selection Assistant

A React-based web application designed to help customers select the perfect ventilation fan for their needs. Built for a shop that sells solar and Palau fans, this MVP provides intelligent fan recommendations based on room dimensions, airflow requirements, pressure, noise sensitivity, and use case.

## 🌟 Features

- **Dual User Modes**:
  - **Expert Mode**: For customers who know their airflow/pressure requirements (70% of use cases)
  - **Guided Mode**: Simplified flow for customers who need help calculating requirements

- **Comprehensive Fan Categories**:
  - **Industrial Fans**: Direct drive, single inlet, double inlet configurations
  - **Kitchen Fans**: Residential and commercial kitchen exhaust fans
  - **Bathroom Fans**: Humidity-resistant fans for bathrooms and restrooms

- **Motor Options**:
  - Fans with motor (standard powered fans with datasheets)
  - Motorless fans (custom query handling)

- **Smart Filtering**:
  - Room volume calculation
  - Airflow requirements (manual or auto-calculated)
  - Static pressure matching
  - Noise sensitivity levels
  - Budget constraints
  - Duct diameter compatibility

- **Bilingual Support**:
  - English and Arabic (RTL support)
  - Language switcher on login page

- **Detailed Fan Information**:
  - Complete datasheet display (power, speed, capacitor, current, pressure)
  - Efficiency metrics
  - Stock availability
  - Price information

## 🚀 Tech Stack

- **React 18.3.1** - UI framework
- **Vite 5.4.10** - Build tool and dev server
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (via CDN)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nazero3/fan-selector.git
   cd fan-selector
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📖 Usage

### User Flow

1. **Login/Account** (Optional):
   - Enter name and email, or continue as guest
   - Select language (English/Arabic)

2. **User Type Selection**:
   - **Expert**: Knows airflow/pressure values
   - **Guided**: Needs help calculating requirements

3. **Use Case Selection**:
   - **Expert Path**:
     - Choose motor type (with/without)
     - Select place (Industrial/Household Kitchen/Household Bathroom)
     - For Industrial: Select drive type (direct drive for with motor, single/double inlet for without motor)
   - **Guided Path**:
     - Simple selection: Kitchen or Bathroom
     - Industrial redirects to query form

4. **Room Dimensions** (Optional for experts, required for guided):
   - Enter length, width, and height
   - System calculates room volume

5. **Airflow & Pressure** (Expert only):
   - Enter desired airflow (m³/h)
   - Enter static pressure (Pa)
   - Optional: Budget and duct diameter

6. **Noise Sensitivity** (Expert only):
   - Very Quiet (≤60 dB)
   - Moderate (≤65 dB)
   - Industrial (≤70 dB)

7. **Recommendations**:
   - System displays top 3 matching fans
   - Complete datasheet for each fan
   - Option to request more information

## 📁 Project Structure

```
fan-selector/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎯 Key Features Explained

### Expert Mode Flow
- Full control over all parameters
- Manual airflow and pressure input
- Detailed filtering options
- Motorless fans handled as custom queries

### Guided Mode Flow
- Simplified to kitchen/bathroom selection
- Automatic airflow calculation from room volume
- Industrial requests go directly to query form
- No complex parameter inputs required

### Fan Database
The application includes a simulated database with:
- Industrial fans (3 models)
- Kitchen fans (3 models)
- Bathroom fans (3 models)

Each fan includes complete specifications:
- Motor power (W)
- Speed (RPM)
- Airflow (m³/h)
- Static pressure (Pa)
- Noise level (dB)
- Capacitor specifications
- Maximum current
- Price and stock information

## 🌐 Internationalization

The application supports English and Arabic with:
- RTL (Right-to-Left) layout for Arabic
- Complete translation of all UI elements
- Language switcher in header
- Localized placeholders and labels

## 🔮 Future Enhancements

- [ ] Backend integration with real database
- [ ] User authentication and saved preferences
- [ ] Email integration for query submissions
- [ ] More fan models and categories
- [ ] Advanced filtering options
- [ ] Comparison tool for multiple fans
- [ ] PDF datasheet export
- [ ] Multi-language support for more languages

## 📝 License

This project is private and proprietary.

## 👤 Author

Built for a fan shop specializing in solar and Palau fans.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the repository owner.

---

**Note**: This is an MVP (Minimum Viable Product). The fan database is currently simulated and would need to be connected to a real database in production.

