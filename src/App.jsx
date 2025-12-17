import React, { useState, createContext, useContext } from 'react';
import {
  Search,
  Wind,
  Home,
  Utensils,
  Factory,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

// ==================== DATABASE SCHEMA ====================
// This simulates a database - in production, this would be PostgreSQL/MongoDB
const FAN_DATABASE = {
  // Industrial Fans
  industrial: [
    {
      id: 'ind-001',
      model: 'CBM-10/10 600W 4P RE VR',
      category: 'industrial',
      motorPowerW: 600,
      speedRpm: 1400,
      staticPressurePa: 420,
      poles: 4,
      inletDiameterMm: 270,
      outletDiameterMm: 270,
      maxAirflowM3h: 3300,
      maxTemperatureC: 40,
      soundLevelDba: 68,
      weightKg: 20.8,
      maxCurrentA: 4.6,
      capacitorUf: 20,
      capacitorV: 450,
      speedController: 'RMB',
      phaseType: 'single',
      priceEur: 285,
      stockQuantity: 5,
      description:
        'Heavy-duty industrial fan for workshops, factories, and large spaces',
      minRoomVolumeM3: 100,
      maxRoomVolumeM3: 500,
      recommendedACH: 15,
    },
    {
      id: 'ind-002',
      model: 'CBM-9/9 300W 4P RE VR',
      category: 'industrial',
      motorPowerW: 300,
      speedRpm: 1400,
      staticPressurePa: 360,
      poles: 4,
      inletDiameterMm: 240,
      outletDiameterMm: 240,
      maxAirflowM3h: 2500,
      maxTemperatureC: 40,
      soundLevelDba: 64,
      weightKg: 16.7,
      maxCurrentA: 2.8,
      capacitorUf: 20,
      capacitorV: 450,
      speedController: 'RMB',
      phaseType: 'single',
      priceEur: 215,
      stockQuantity: 8,
      description:
        'Mid-range industrial fan for medium workshops and storage areas',
      minRoomVolumeM3: 50,
      maxRoomVolumeM3: 300,
      recommendedACH: 12,
    },
    {
      id: 'ind-003',
      model: 'CBM-7/9 300W 4P RE VR',
      category: 'industrial',
      motorPowerW: 300,
      speedRpm: 1400,
      staticPressurePa: 340,
      poles: 4,
      inletDiameterMm: 180,
      outletDiameterMm: 240,
      maxAirflowM3h: 2530,
      maxTemperatureC: 40,
      soundLevelDba: 67,
      weightKg: 9.8,
      maxCurrentA: 2.2,
      capacitorUf: 6,
      capacitorV: 450,
      speedController: 'RMB',
      phaseType: 'single',
      priceEur: 195,
      stockQuantity: 12,
      description: 'Compact industrial fan for smaller workshops and tool rooms',
      minRoomVolumeM3: 30,
      maxRoomVolumeM3: 200,
      recommendedACH: 12,
    },
  ],

  // Kitchen Fans
  kitchen: [
    {
      id: 'kit-001',
      model: 'CBM-12/12 750W 6P RE VR',
      category: 'kitchen',
      motorPowerW: 750,
      speedRpm: 900,
      staticPressurePa: 300,
      poles: 6,
      inletDiameterMm: 320,
      outletDiameterMm: 320,
      maxAirflowM3h: 5240,
      maxTemperatureC: 40,
      soundLevelDba: 68,
      weightKg: 24,
      maxCurrentA: 5.3,
      capacitorUf: 20,
      capacitorV: 450,
      speedController: 'RMB',
      phaseType: 'single',
      priceEur: 425,
      stockQuantity: 3,
      description: 'Professional commercial kitchen exhaust fan for restaurants',
      minRoomVolumeM3: 150,
      maxRoomVolumeM3: 600,
      recommendedACH: 25,
      greaseResistant: true,
    },
    {
      id: 'kit-002',
      model: 'CBM-10/10 515W 6P RE VR',
      category: 'kitchen',
      motorPowerW: 515,
      speedRpm: 900,
      staticPressurePa: 260,
      poles: 6,
      inletDiameterMm: 270,
      outletDiameterMm: 270,
      maxAirflowM3h: 4090,
      maxTemperatureC: 40,
      soundLevelDba: 67,
      weightKg: 17.5,
      maxCurrentA: 3.4,
      capacitorUf: 10,
      capacitorV: 450,
      speedController: 'RMB',
      phaseType: 'single',
      priceEur: 315,
      stockQuantity: 6,
      description: 'Medium-duty kitchen fan for cafes and small restaurants',
      minRoomVolumeM3: 80,
      maxRoomVolumeM3: 350,
      recommendedACH: 20,
      greaseResistant: true,
    },
    {
      id: 'kit-003',
      model: 'CBM-9/7 245W 6P RE VR',
      category: 'kitchen',
      motorPowerW: 245,
      speedRpm: 900,
      staticPressurePa: 220,
      poles: 6,
      inletDiameterMm: 240,
      outletDiameterMm: 180,
      maxAirflowM3h: 2650,
      maxTemperatureC: 50,
      soundLevelDba: 64,
      weightKg: 14,
      maxCurrentA: 2.0,
      capacitorUf: 13,
      capacitorV: 450,
      speedController: 'REB',
      phaseType: 'single',
      priceEur: 235,
      stockQuantity: 10,
      description: 'Residential kitchen fan for home cooking areas',
      minRoomVolumeM3: 30,
      maxRoomVolumeM3: 150,
      recommendedACH: 15,
      greaseResistant: true,
    },
  ],

  // Bathroom Fans
  bathroom: [
    {
      id: 'bath-001',
      model: 'CBM-7/7 147W 4P RE VR',
      category: 'bathroom',
      motorPowerW: 147,
      speedRpm: 1400,
      staticPressurePa: 180,
      poles: 4,
      inletDiameterMm: 180,
      outletDiameterMm: 180,
      maxAirflowM3h: 1470,
      maxTemperatureC: 40,
      soundLevelDba: 63,
      weightKg: 6.9,
      maxCurrentA: 1.2,
      capacitorUf: 7,
      capacitorV: 450,
      speedController: 'REB',
      phaseType: 'single',
      priceEur: 125,
      stockQuantity: 15,
      description: 'Standard bathroom exhaust fan for residential use',
      minRoomVolumeM3: 8,
      maxRoomVolumeM3: 30,
      recommendedACH: 8,
      humidityResistant: true,
    },
    {
      id: 'bath-002',
      model: 'CBM-7/7 72W 6P RE VR',
      category: 'bathroom',
      motorPowerW: 72,
      speedRpm: 900,
      staticPressurePa: 160,
      poles: 6,
      inletDiameterMm: 180,
      outletDiameterMm: 180,
      maxAirflowM3h: 1440,
      maxTemperatureC: 70,
      soundLevelDba: 56,
      weightKg: 6.5,
      maxCurrentA: 0.6,
      capacitorUf: 2.5,
      capacitorV: 450,
      speedController: 'REB',
      phaseType: 'single',
      priceEur: 95,
      stockQuantity: 20,
      description: 'Ultra-quiet bathroom fan for bedrooms and quiet spaces',
      minRoomVolumeM3: 5,
      maxRoomVolumeM3: 25,
      recommendedACH: 8,
      humidityResistant: true,
    },
    {
      id: 'bath-003',
      model: 'CBM-7/9 200W 6P RE VR',
      category: 'bathroom',
      motorPowerW: 200,
      speedRpm: 900,
      staticPressurePa: 170,
      poles: 6,
      inletDiameterMm: 180,
      outletDiameterMm: 240,
      maxAirflowM3h: 1900,
      maxTemperatureC: 40,
      soundLevelDba: 59,
      weightKg: 13.5,
      maxCurrentA: 1.5,
      capacitorUf: 4,
      capacitorV: 450,
      speedController: 'REB',
      phaseType: 'single',
      priceEur: 155,
      stockQuantity: 12,
      description: 'High-capacity bathroom fan for large bathrooms and spas',
      minRoomVolumeM3: 15,
      maxRoomVolumeM3: 45,
      recommendedACH: 8,
      humidityResistant: true,
    },
  ],
};

// ==================== CONTEXT & STATE MANAGEMENT ====================
const FanContext = createContext(null);

const useFanSelection = () => {
  const context = useContext(FanContext);
  if (!context) throw new Error('useFanSelection must be used within FanProvider');
  return context;
};

// Simple i18n dictionary (English / Arabic)
const STRINGS = {
  en: {
    appTitle: 'Fan Selection Assistant',
    appSubtitle: 'Find the perfect ventilation solution for your needs',
    welcomeTitle: 'Welcome',
    welcomeSubtitle:
      'Create an account or continue as guest to personalize your recommendations.',
    nameLabel: 'Name',
    emailLabel: 'Email',
    continueGuest: 'Continue as guest',
    continueEmail: 'Continue with email',
    userTypeTitle: 'Who will be my user?',
    userTypeSubtitle: 'Choose how much detail the user already knows.',
    userTypeExpert: 'Knows the details (70% cases)',
    userTypeExpertDesc:
      'They already have airflow/pressure numbers and want the best match.',
    userTypeGuided: 'Needs guidance',
    userTypeGuidedDesc:
      'We will calculate airflow from room dimensions and noise limits.',
    fanUseCaseTitle: 'Fan use case',
    fanUseCaseSubtitle: 'Choose motor option and where the fan will be installed.',
    motorWise: 'Motor wise',
    withMotor: 'With motor',
    withMotorDesc: 'Standard powered fans with datasheets.',
    withoutMotor: 'Without motor',
    withoutMotorDesc: 'Motorless fans — we’ll prep a request for you.',
    placeWise: 'Place wise',
    industrialTitle: 'Industrial',
    industrialDesc: 'Direct drive / single / double inlet',
    kitchenTitle: 'Household - Kitchen',
    kitchenDesc: 'Home and commercial kitchens',
    bathroomTitle: 'Household - Bathroom',
    bathroomDesc: 'Bathrooms, restrooms, humid spaces',
    industrialConfig: 'Industrial configuration',
    guidedUseCaseTitle: 'Choose a simple use case',
    guidedUseCaseDesc:
      'Most customers only need a fan for a kitchen or bathroom. Industrial is by query.',
    roomDimensionsTitle: 'Room dimensions',
    roomDimensionsExpertDesc:
      'Optional for expert users. We’ll calculate airflow if provided.',
    roomDimensionsGuidedDesc:
      'Required for guided users. We will calculate airflow from this volume.',
    lengthLabel: 'Length (meters)',
    widthLabel: 'Width (meters)',
    heightLabel: 'Height (meters)',
    roomVolumeLabel: 'Room Volume',
    airflowPressureTitle: 'Airflow & pressure',
    airflowPressureDesc:
      'Enter airflow and static pressure (what S&P customers usually ask).',
    desiredAirflowLabel: 'Desired Airflow (m³/h)',
    staticPressureLabel: 'Static Pressure (Pa)',
    airflowHint:
      'Required for expert users; auto-calculated if room size is set.',
    pressureHint: 'Filters to fans meeting or exceeding this pressure.',
    budgetLabel: 'Budget (EUR)',
    budgetPlaceholder: 'Optional maximum budget',
    ductLabel: 'Existing Duct Diameter (mm)',
    ductPlaceholder: 'Optional (e.g., 180, 240)',
    noiseTitle: 'Noise Sensitivity',
    noiseQuiet: 'Very Quiet (≤60 dB)',
    noiseQuietDesc: 'Bedrooms, offices, libraries - minimal noise',
    noiseModerate: 'Moderate (≤65 dB)',
    noiseModerateDesc:
      'Bathrooms, small kitchens - acceptable background noise',
    noiseIndustrial: 'Industrial (≤70 dB)',
    noiseIndustrialDesc: 'Workshops, factories - noise not a concern',
    back: 'Back',
    next: 'Next',
    showFans: 'Show fans',
    kitchenGuidedTitle: 'Kitchen fan',
    bathroomGuidedTitle: 'Bathroom fan',
    industrialGuidedTitle: 'Industrial',
    findFans: 'Find Fans',
  },
  ar: {
    appTitle: 'مساعد اختيار المراوح',
    appSubtitle: 'ابحث عن أفضل حل للتهوية حسب احتياجك',
    welcomeTitle: 'مرحباً',
    welcomeSubtitle:
      'يمكنك إنشاء حساب أو المتابعة كضيف للحصول على توصيات مخصصة.',
    nameLabel: 'الاسم',
    emailLabel: 'البريد الإلكتروني',
    continueGuest: 'المتابعة كضيف',
    continueEmail: 'المتابعة بالبريد الإلكتروني',
    userTypeTitle: 'من هو المستخدم؟',
    userTypeSubtitle: 'اختر مقدار التفاصيل التي يعرفها المستخدم.',
    userTypeExpert: 'يعرف التفاصيل (٧٠٪ من الحالات)',
    userTypeExpertDesc:
      'لديه قيم تدفق الهواء والضغط ويريد أفضل مراوح مطابقة.',
    userTypeGuided: 'يحتاج إلى مساعدة',
    userTypeGuidedDesc:
      'نحسب تدفق الهواء حسب أبعاد الغرفة وحدود الضوضاء.',
    fanUseCaseTitle: 'حالة استخدام المروحة',
    fanUseCaseSubtitle: 'اختر نوع المحرك ومكان تركيب المروحة.',
    motorWise: 'من ناحية المحرك',
    withMotor: 'بمحرك',
    withMotorDesc: 'مراوح مزودة بمحرك مع بيانات فنية كاملة.',
    withoutMotor: 'بدون محرك',
    withoutMotorDesc: 'مراوح بدون محرك — سنجهز لك اقتراحاً مناسباً.',
    placeWise: 'من ناحية المكان',
    industrialTitle: 'صناعي',
    industrialDesc: 'قيادة مباشرة / مدخل واحد / مدخل مزدوج',
    kitchenTitle: 'منزلي - مطبخ',
    kitchenDesc: 'مطابخ منزلية وتجارية',
    bathroomTitle: 'منزلي - حمام',
    bathroomDesc: 'حمامات، دورات مياه وأماكن رطبة',
    industrialConfig: 'تكوين صناعي',
    guidedUseCaseTitle: 'اختر حالة استخدام بسيطة',
    guidedUseCaseDesc:
      'معظم الزبائن يحتاجون مروحة للمطبخ أو الحمام. الحالات الصناعية تتم يدوياً.',
    roomDimensionsTitle: 'أبعاد الغرفة',
    roomDimensionsExpertDesc:
      'اختيارية للمستخدم الخبير. نحسب تدفق الهواء إذا تم تعبئتها.',
    roomDimensionsGuidedDesc:
      'مطلوبة للمستخدم الذي يحتاج مساعدة. نحسب تدفق الهواء من الحجم.',
    lengthLabel: 'الطول (متر)',
    widthLabel: 'العرض (متر)',
    heightLabel: 'الارتفاع (متر)',
    roomVolumeLabel: 'حجم الغرفة',
    airflowPressureTitle: 'تدفق الهواء والضغط',
    airflowPressureDesc: 'أدخل تدفق الهواء والضغط الاستاتيكي المطلوب.',
    desiredAirflowLabel: 'تدفق الهواء المطلوب (م³/ساعة)',
    staticPressureLabel: 'الضغط الاستاتيكي (باسكال)',
    airflowHint:
      'مطلوب للمستخدم الخبير؛ ويتم حسابه تلقائياً إذا تم إدخال حجم الغرفة.',
    pressureHint: 'نُظهر المراوح التي تحقق هذا الضغط أو أعلى.',
    budgetLabel: 'الميزانية (يورو)',
    budgetPlaceholder: 'حد أقصى اختياري للسعر',
    ductLabel: 'قطر مجرى الهواء الحالي (ملم)',
    ductPlaceholder: 'اختياري (مثال: 180، 240)',
    noiseTitle: 'حساسية الضوضاء',
    noiseQuiet: 'هادئ جداً (≤60 ديسيبل)',
    noiseQuietDesc: 'غرف النوم، المكاتب، المكتبات - ضوضاء قليلة جداً',
    noiseModerate: 'متوسط (≤65 ديسيبل)',
    noiseModerateDesc: 'الحمامات والمطابخ الصغيرة - ضوضاء مقبولة',
    noiseIndustrial: 'صناعي (≤70 ديسيبل)',
    noiseIndustrialDesc: 'ورش ومصانع - الضوضاء غير مشكلة',
    back: 'رجوع',
    next: 'التالي',
    showFans: 'عرض المراوح',
    kitchenGuidedTitle: 'مروحة للمطبخ',
    bathroomGuidedTitle: 'مروحة للحمام',
    industrialGuidedTitle: 'صناعي',
    findFans: 'ابحث عن المراوح',
    tabSelector: 'اختيار المروحة',
    tabInquiry: 'إرسال استفسار',
    inquiryTitle: 'إرسال استفسار',
    inquirySubtitle: 'تحتاج إلى مزيد من المعلومات؟ أرسل لنا أسئلتك أو متطلباتك.',
    inquiryNameLabel: 'الاسم',
    inquiryEmailLabel: 'البريد الإلكتروني',
    inquiryPhoneLabel: 'الهاتف (اختياري)',
    inquirySubjectLabel: 'الموضوع',
    inquiryMessageLabel: 'الرسالة',
    inquiryPlaceholderName: 'اسمك',
    inquiryPlaceholderEmail: 'your@email.com',
    inquiryPlaceholderPhone: '+1234567890',
    inquiryPlaceholderSubject: 'مثال: استفسار عن مروحة بدون محرك',
    inquiryPlaceholderMessage: 'اوصف متطلباتك أو أسئلتك أو المواصفات...',
    inquirySendButton: 'إرسال الاستفسار',
    inquirySuccess: 'تم إرسال الاستفسار بنجاح! سنعود إليك قريباً.',
    inquiryRequired: 'يرجى ملء جميع الحقول المطلوبة.',
  },
};

const useT = (lang) => (key) =>
  (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;

// ==================== MAIN APP COMPONENT ====================
export default function FanSelectionApp() {
  const [currentTab, setCurrentTab] = useState('selector'); // 'selector' | 'inquiry'
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('en'); // 'en' | 'ar'
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('expert'); // expert = knows details, guided = needs help
  const [motorType, setMotorType] = useState('with'); // with | without
  const [placeUseCase, setPlaceUseCase] = useState('');
  const [driveType, setDriveType] = useState('');
  const [category, setCategory] = useState('');
  const [roomDimensions, setRoomDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [noiseSensitivity, setNoiseSensitivity] = useState('moderate');
  const [budget, setBudget] = useState('');
  const [ductSize, setDuctSize] = useState('');
  const [manualAirflow, setManualAirflow] = useState('');
  const [pressurePa, setPressurePa] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [requirementSummary, setRequirementSummary] = useState(null);
  const [followUpMessage, setFollowUpMessage] = useState('');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Calculate required airflow based on room volume and category
  const calculateRequirements = () => {
    const selectedCategory = category || placeUseCase;

    // Motorless requests are handled as manual queries for expert users
    if (userType === 'expert' && motorType === 'without') {
      return {
        volume: null,
        requiredAirflow: manualAirflow ? parseFloat(manualAirflow) : null,
        recommendations: [],
        allMatches: 0,
        motorless: true,
      };
    }

    const volume =
      parseFloat(roomDimensions.length) *
      parseFloat(roomDimensions.width) *
      parseFloat(roomDimensions.height);

    const hasVolume = !isNaN(volume) && volume > 0;

    const achMap = {
      industrial: 12,
      kitchen: 20,
      bathroom: 8,
    };

    const autoAirflow =
      hasVolume && selectedCategory ? volume * achMap[selectedCategory] * 1.2 : null; // 20% safety factor

    const desiredAirflow =
      manualAirflow && parseFloat(manualAirflow) > 0
        ? parseFloat(manualAirflow)
        : autoAirflow;

    if (!desiredAirflow || !selectedCategory) return null;

    // Noise constraints
    const noiseMap = {
      quiet: 60,
      moderate: 65,
      industrial: 70,
    };

    // Filter fans
    const availableFans = FAN_DATABASE[selectedCategory] || [];
    let filteredFans = availableFans.filter((fan) => {
      const meetsAirflow = fan.maxAirflowM3h >= desiredAirflow;
      const meetsNoise = fan.soundLevelDba <= noiseMap[noiseSensitivity];
      const meetsVolume = hasVolume
        ? volume >= fan.minRoomVolumeM3 && volume <= fan.maxRoomVolumeM3
        : true;
      const meetsBudget = budget ? fan.priceEur <= parseFloat(budget) : true;
      const meetsDuct = ductSize
        ? Math.abs(fan.outletDiameterMm - parseFloat(ductSize)) <= 20
        : true;
      const meetsPressure =
        pressurePa && parseFloat(pressurePa) > 0
          ? fan.staticPressurePa >= parseFloat(pressurePa)
          : true;
      return (
        meetsAirflow &&
        meetsNoise &&
        meetsVolume &&
        meetsBudget &&
        meetsDuct &&
        meetsPressure
      );
    });

    // Sort by efficiency (airflow per watt) then price
    filteredFans = filteredFans.sort((a, b) => {
      const effA = a.maxAirflowM3h / a.motorPowerW;
      const effB = b.maxAirflowM3h / b.motorPowerW;
      if (Math.abs(effA - effB) < 0.5) return a.priceEur - b.priceEur;
      return effB - effA;
    });

    return {
      volume: hasVolume ? volume : null,
      requiredAirflow: desiredAirflow,
      recommendations: filteredFans.slice(0, 3),
      allMatches: filteredFans.length,
    };
  };

  const handleSearch = () => {
    const results = calculateRequirements();
    if (results) {
      setRecommendations(results.recommendations);
      setRequirementSummary(results);
      setStep(7);
    }
  };

  const resetSearch = () => {
    setStep(1);
    setUserName('');
    setUserEmail('');
    setUserType('expert');
    setMotorType('with');
    setPlaceUseCase('');
    setDriveType('');
    setCategory('');
    setRoomDimensions({ length: '', width: '', height: '' });
    setNoiseSensitivity('moderate');
    setBudget('');
    setDuctSize('');
    setManualAirflow('');
    setPressurePa('');
    setRecommendations([]);
    setRequirementSummary(null);
    setFollowUpMessage('');
  };

  // ==================== UI COMPONENTS ====================
  const CategoryCard = ({ value, icon: Icon, title, description, onSelect }) => (
    <button
      onClick={() => {
        if (onSelect) {
          onSelect(value);
        } else {
          setCategory(value);
          setStep(2);
        }
      }}
      className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
        category === value
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <Icon className="w-12 h-12 mx-auto mb-3 text-blue-600" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );

  const FanCard = ({ fan, rank }) => {
    const efficiency = (fan.maxAirflowM3h / fan.motorPowerW).toFixed(2);
    const volume =
      parseFloat(roomDimensions.length) *
      parseFloat(roomDimensions.width) *
      parseFloat(roomDimensions.height);
    const hasVolume = !isNaN(volume) && volume > 0;
    const requiredACH =
      fan.category === 'kitchen'
        ? 20
        : fan.category === 'bathroom'
        ? 8
        : 12;
    const actualACH = hasVolume ? (fan.maxAirflowM3h / volume).toFixed(1) : null;

    return (
      <div
        className={`p-6 rounded-lg border-2 ${
          rank === 1 ? 'border-green-500 bg-green-50' : 'border-gray-200'
        }`}
      >
        {rank === 1 && (
          <div className="flex items-center gap-2 mb-3 text-green-700 font-semibold">
            <CheckCircle className="w-5 h-5" />
            Best Match
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{fan.model}</h3>
            <p className="text-sm text-gray-600">{fan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">€{fan.priceEur}</div>
            <div className="text-xs text-gray-500">
              {fan.stockQuantity > 0 ? `${fan.stockQuantity} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-gray-500 text-xs mb-1">Airflow</div>
            <div className="font-bold">{fan.maxAirflowM3h} m³/h</div>
            <div className="text-xs text-green-600">
              {actualACH ? `${actualACH} ACH (need: ${requiredACH})` : 'ACH n/a (no room volume)'}
            </div>
          </div>

          <div className="bg-white p-3 rounded">
            <div className="text-gray-500 text-xs mb-1">Noise Level</div>
            <div className="font-bold">{fan.soundLevelDba} dB(A)</div>
            <div className="text-xs text-gray-600">
              {fan.soundLevelDba < 60
                ? 'Very Quiet'
                : fan.soundLevelDba < 65
                ? 'Quiet'
                : 'Moderate'}
            </div>
          </div>

          <div className="bg-white p-3 rounded">
            <div className="text-gray-500 text-xs mb-1">Power</div>
            <div className="font-bold">{fan.motorPowerW}W</div>
            <div className="text-xs text-gray-600">
              {fan.poles}P • {fan.speedRpm} RPM
            </div>
          </div>

          <div className="bg-white p-3 rounded">
            <div className="text-gray-500 text-xs mb-1">Efficiency</div>
            <div className="font-bold">{efficiency} m³/Wh</div>
            <div className="text-xs text-gray-600">Ø {fan.outletDiameterMm}mm</div>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {fan.speedController} Controller
          </span>
          {fan.greaseResistant && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
              Grease Resistant
            </span>
          )}
          {fan.humidityResistant && (
            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded">
              Humidity Resistant
            </span>
          )}
        </div>
        <div className="mt-4 pt-4 border-t text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Max Current: {fan.maxCurrentA}A</span>
            <span>Weight: {fan.weightKg}kg</span>
          </div>
          <div className="mt-1">
            Capacitor: {fan.capacitorUf}μF / {fan.capacitorV}V
          </div>
          <div className="mt-1">Static Pressure: {fan.staticPressurePa} Pa</div>
        </div>
      </div>
    );
  };

  // ==================== INQUIRY PAGE COMPONENT ====================
  const InquiryPage = () => {
    const handleInquirySubmit = () => {
      if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.subject || !inquiryForm.message) {
        window.alert(t('inquiryRequired'));
        return;
      }
      // Placeholder submission
      window.alert(t('inquirySuccess'));
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-20">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">{t('inquiryTitle')}</h2>
        </div>
        <p className="text-gray-600 mb-6">{t('inquirySubtitle')}</p>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t('inquiryNameLabel')} *
              </label>
              <input
                type="text"
                value={inquiryForm.name}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, name: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder={t('inquiryPlaceholderName')}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t('inquiryEmailLabel')} *
              </label>
              <input
                type="email"
                value={inquiryForm.email}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, email: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                placeholder={t('inquiryPlaceholderEmail')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              {t('inquiryPhoneLabel')}
            </label>
            <input
              type="tel"
              value={inquiryForm.phone}
              onChange={(e) =>
                setInquiryForm({ ...inquiryForm, phone: e.target.value })
              }
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              placeholder={t('inquiryPlaceholderPhone')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              {t('inquirySubjectLabel')} *
            </label>
            <input
              type="text"
              value={inquiryForm.subject}
              onChange={(e) =>
                setInquiryForm({ ...inquiryForm, subject: e.target.value })
              }
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              placeholder={t('inquiryPlaceholderSubject')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              {t('inquiryMessageLabel')} *
            </label>
            <textarea
              value={inquiryForm.message}
              onChange={(e) =>
                setInquiryForm({ ...inquiryForm, message: e.target.value })
              }
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              rows="6"
              placeholder={t('inquiryPlaceholderMessage')}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleInquirySubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              {t('inquirySendButton')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================
  const t = useT(lang);

  return (
    <FanContext.Provider
      value={{
        step,
        category,
        roomDimensions,
        noiseSensitivity,
        budget,
        ductSize,
        recommendations,
      }}
    >
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 ${
          lang === 'ar' ? 'direction-rtl' : ''
        }`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-6xl mx-auto pb-20">
          {/* Header */}
          {currentTab === 'selector' && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Wind className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">
                  {t('appTitle')}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ar')}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    lang === 'ar'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
            <p className="text-gray-600">{t('appSubtitle')}</p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      s < step
                        ? 'bg-green-500 text-white'
                        : s === step
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? '✓' : s}
                  </div>
                  {s < 7 && (
                    <div
                      className={`w-12 h-1 ${
                        s < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Main Content */}
          {currentTab === 'selector' && (
            <>
          {/* Step 1: Account */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{t('welcomeTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('welcomeSubtitle')}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder={lang === 'ar' ? 'أحمد محمد' : 'Jane Doe'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder={lang === 'ar' ? 'you@example.com' : 'you@example.com'}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    if (!userName) setUserName(lang === 'ar' ? 'ضيف' : 'Guest');
                    setStep(2);
                  }}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  {t('continueGuest')} <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={!userEmail}
                >
                  {t('continueEmail')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: User type */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{t('userTypeTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('userTypeSubtitle')}</p>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    setUserType('expert');
                    setStep(3);
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    userType === 'expert'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('userTypeExpert')}</div>
                  <div className="text-sm text-gray-600">
                    {t('userTypeExpertDesc')}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setUserType('guided');
                    setStep(3);
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    userType === 'guided'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('userTypeGuided')}</div>
                  <div className="text-sm text-gray-600">
                    {t('userTypeGuidedDesc')}
                  </div>
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Use case selection */}
          {step === 3 && userType === 'expert' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{t('fanUseCaseTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('fanUseCaseSubtitle')}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm font-semibold mb-2">
                    {t('motorWise')}
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setMotorType('with');
                        // Auto-select direct drive if industrial is already selected
                        if (placeUseCase === 'industrial') {
                          setDriveType('direct');
                        }
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        motorType === 'with'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-bold">{t('withMotor')}</div>
                      <div className="text-sm text-gray-600">
                        {t('withMotorDesc')}
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setMotorType('without');
                        // Clear kitchen/bathroom selections as they're not available for "without motor"
                        if (placeUseCase === 'kitchen' || placeUseCase === 'bathroom') {
                          setPlaceUseCase('');
                          setCategory('');
                        }
                        // Reset incompatible drive types when switching motor
                        if (placeUseCase === 'industrial' && driveType === 'direct') {
                          setDriveType('');
                        }
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        motorType === 'without'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-bold">{t('withoutMotor')}</div>
                      <div className="text-sm text-gray-600">
                        {t('withoutMotorDesc')}
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2">
                    {t('placeWise')}
                  </div>
                  <div className={`grid gap-3 ${motorType === 'with' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <CategoryCard
                      value="industrial"
                      icon={Factory}
                      title={t('industrialTitle')}
                      description={t('industrialDesc')}
                      onSelect={(val) => {
                        setPlaceUseCase(val);
                        setCategory(val);
                        // Auto-select direct drive if "with motor" is already selected
                        if (motorType === 'with') {
                          setDriveType('direct');
                        }
                      }}
                    />
                    {motorType === 'with' && (
                      <>
                        <CategoryCard
                          value="kitchen"
                          icon={Utensils}
                          title={t('kitchenTitle')}
                          description={t('kitchenDesc')}
                          onSelect={(val) => {
                            setPlaceUseCase(val);
                            setCategory(val);
                          }}
                        />
                        <CategoryCard
                          value="bathroom"
                          icon={Home}
                          title={t('bathroomTitle')}
                          description={t('bathroomDesc')}
                          onSelect={(val) => {
                            setPlaceUseCase(val);
                            setCategory(val);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {placeUseCase === 'industrial' && (
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  {[
                    // Direct drive only applicable for WITH motor
                    ...(motorType === 'with'
                      ? [{ id: 'direct', label: 'Direct drive' }]
                      : []),
                    // Single/double inlet only applicable for WITHOUT motor
                    ...(motorType === 'without'
                      ? [
                          { id: 'single', label: 'Single inlet' },
                          { id: 'double', label: 'Double inlet' },
                        ]
                      : []),
                  ].map((drive) => (
                    <button
                      key={drive.id}
                      onClick={() => setDriveType(drive.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        driveType === drive.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-bold">{drive.label}</div>
                      <div className="text-sm text-gray-600">
                        {t('industrialConfig')}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  onClick={() => {
                    if (placeUseCase) {
                      setCategory(placeUseCase);
                    }
                    setStep(4);
                  }}
                  disabled={!placeUseCase || (placeUseCase === 'industrial' && !driveType)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {t('next')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && userType === 'guided' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {t('guidedUseCaseTitle')}
              </h2>
              <p className="text-gray-600 mb-6">{t('guidedUseCaseDesc')}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <CategoryCard
                  value="kitchen"
                  icon={Utensils}
                  title={t('kitchenGuidedTitle')}
                  description="Fans for home or commercial kitchens"
                  onSelect={(val) => {
                    setPlaceUseCase(val);
                    setCategory(val);
                    setStep(4);
                  }}
                />
                <CategoryCard
                  value="bathroom"
                  icon={Home}
                  title={t('bathroomGuidedTitle')}
                  description="Fans for bathrooms and toilets"
                  onSelect={(val) => {
                    setPlaceUseCase(val);
                    setCategory(val);
                    setStep(4);
                  }}
                />
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Room Dimensions */}
          {step === 4 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {t('roomDimensionsTitle')}
              </h2>
              <p className="text-gray-600 mb-6">
                {userType === 'expert'
                  ? t('roomDimensionsExpertDesc')
                  : t('roomDimensionsGuidedDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('lengthLabel')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomDimensions.length}
                    onChange={(e) =>
                      setRoomDimensions({ ...roomDimensions, length: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="5.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('widthLabel')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomDimensions.width}
                    onChange={(e) =>
                      setRoomDimensions({ ...roomDimensions, width: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="4.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('heightLabel')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={roomDimensions.height}
                    onChange={(e) =>
                      setRoomDimensions({ ...roomDimensions, height: e.target.value })
                    }
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="2.8"
                  />
                </div>
              </div>

              {roomDimensions.length &&
                roomDimensions.width &&
                roomDimensions.height && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                      <Info className="w-5 h-5" />
                      {t('roomVolumeLabel')}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {(
                        parseFloat(roomDimensions.length) *
                        parseFloat(roomDimensions.width) *
                        parseFloat(roomDimensions.height)
                      ).toFixed(1)}{' '}
                      m³
                    </div>
                  </div>
                )}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                {userType === 'expert' ? (
                  <button
                    onClick={() => setStep(5)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    {t('next')} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(5)}
                    disabled={
                      !roomDimensions.length ||
                      !roomDimensions.width ||
                      !roomDimensions.height
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {t('next')} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Airflow & Pressure (expert only) */}
          {step === 5 && userType === 'expert' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {t('airflowPressureTitle')}
              </h2>
              <p className="text-gray-600 mb-6">{t('airflowPressureDesc')}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('desiredAirflowLabel')}
                  </label>
                  <input
                    type="number"
                    value={manualAirflow}
                    onChange={(e) => setManualAirflow(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="e.g., 1500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('airflowHint')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('staticPressureLabel')}
                  </label>
                  <input
                    type="number"
                    value={pressurePa}
                    onChange={(e) => setPressurePa(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder="e.g., 200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('pressureHint')}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('budgetLabel')}
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder={t('budgetPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t('ductLabel')}
                  </label>
                  <input
                    type="number"
                    value={ductSize}
                    onChange={(e) => setDuctSize(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    placeholder={t('ductPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  onClick={() => setStep(6)}
                  disabled={
                    motorType !== 'without' &&
                    !manualAirflow &&
                    userType === 'expert' &&
                    (!roomDimensions.length || !roomDimensions.width || !roomDimensions.height)
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {t('next')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Noise Sensitivity (guided only) */}
          {step === 5 && userType === 'guided' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">{t('noiseTitle')}</h2>
              <p className="text-gray-600 mb-6">
                Choose your noise preference for the fan
              </p>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    setNoiseSensitivity('moderate');
                    handleSearch();
                    setStep(7);
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    noiseSensitivity === 'moderate'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('noiseModerate')}</div>
                  <div className="text-sm text-gray-600">
                    {t('noiseModerateDesc')}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setNoiseSensitivity('quiet');
                    handleSearch();
                    setStep(7);
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    noiseSensitivity === 'quiet'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('noiseQuiet')}</div>
                  <div className="text-sm text-gray-600">
                    {t('noiseQuietDesc')}
                  </div>
                </button>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Noise Sensitivity (expert only) */}
          {step === 6 && userType === 'expert' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">{t('noiseTitle')}</h2>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setNoiseSensitivity('quiet')}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    noiseSensitivity === 'quiet'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('noiseQuiet')}</div>
                  <div className="text-sm text-gray-600">
                    {t('noiseQuietDesc')}
                  </div>
                </button>
                <button
                  onClick={() => setNoiseSensitivity('moderate')}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    noiseSensitivity === 'moderate'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('noiseModerate')}</div>
                  <div className="text-sm text-gray-600">
                    {t('noiseModerateDesc')}
                  </div>
                </button>
                <button
                  onClick={() => setNoiseSensitivity('industrial')}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    noiseSensitivity === 'industrial'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold mb-1">{t('noiseIndustrial')}</div>
                  <div className="text-sm text-gray-600">
                    {t('noiseIndustrialDesc')}
                  </div>
                </button>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  onClick={() => {
                    handleSearch();
                    setStep(7);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  {t('findFans')} <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Recommendations */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold">Recommended Fans</h2>
                    <p className="text-gray-600">
                      Based on your space and constraints
                    </p>
                  </div>
                </div>

                {requirementSummary && (
                  <div className="grid md:grid-cols-4 gap-3 mb-6 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-500 text-xs">Category</div>
                      <div className="font-bold capitalize">{category}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-500 text-xs">Motor</div>
                      <div className="font-bold capitalize">
                        {motorType === 'with' ? 'With motor' : 'Without motor'}
                      </div>
                    </div>
                    {placeUseCase === 'industrial' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-gray-500 text-xs">Drive</div>
                        <div className="font-bold">
                          {driveType === 'direct'
                            ? 'Direct drive'
                            : driveType === 'single'
                            ? 'Single inlet'
                            : 'Double inlet'}
                        </div>
                      </div>
                    )}
                    {requirementSummary.volume && (
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-gray-500 text-xs">Room Volume</div>
                        <div className="font-bold">
                          {requirementSummary.volume.toFixed(1)} m³
                        </div>
                      </div>
                    )}
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-500 text-xs">
                        Required Airflow{manualAirflow ? ' (manual)' : ''}
                      </div>
                      <div className="font-bold">
                        {requirementSummary.requiredAirflow
                          ? `${Math.round(requirementSummary.requiredAirflow)} m³/h`
                          : 'n/a'}
                      </div>
                    </div>
                    {pressurePa && (
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-gray-500 text-xs">Static Pressure</div>
                        <div className="font-bold">{pressurePa} Pa</div>
                      </div>
                    )}
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-500 text-xs">Noise Preference</div>
                      <div className="font-bold capitalize">{noiseSensitivity}</div>
                    </div>
                  </div>
                )}

                {requirementSummary?.motorless ? (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                    <div className="font-semibold text-yellow-800 mb-1">
                      Motorless configuration requested
                    </div>
                    <div className="text-sm text-yellow-700">
                      We will prepare motorless options for you. Send your request below.
                    </div>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {recommendations.map((fan, idx) => (
                      <FanCard key={fan.id} fan={fan} rank={idx + 1} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                    <div className="font-semibold text-yellow-800 mb-1">
                      No exact matches found
                    </div>
                    <div className="text-sm text-yellow-700">
                      Try widening noise, budget, or duct constraints, or reduce required
                      airflow.
                    </div>
                  </div>
                )}

                {requirementSummary && (
                  <div className="mt-4 text-sm text-gray-600">
                    {requirementSummary.motorless
                      ? 'Motorless request will be shared with support.'
                      : `Showing top ${recommendations.length} of ${requirementSummary.allMatches} suitable models.`}
                  </div>
                )}

                <div className="mt-6 flex gap-3 justify-center">
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Adjust Filters
                  </button>
                  <button
                    onClick={resetSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Start Over
                  </button>
                </div>

                <div className="mt-8 bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Need more information?</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Tell us what you need (motorless options, pressure curve, wiring, delivery).
                  </p>
                  <textarea
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none mb-3"
                    rows="4"
                    value={followUpMessage}
                    onChange={(e) => setFollowUpMessage(e.target.value)}
                    placeholder="Describe your request..."
                  />
                  <button
                    onClick={() => {
                      // Placeholder submission
                      window.alert('Request sent! We will get back to you shortly.');
                      setFollowUpMessage('');
                    }}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Send request
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
          )}

          {currentTab === 'inquiry' && <InquiryPage />}

          {/* Bottom Tab Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex">
                <button
                  onClick={() => setCurrentTab('selector')}
                  className={`flex-1 flex flex-col items-center justify-center py-3 px-4 transition-colors ${
                    currentTab === 'selector'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Wind className="w-6 h-6 mb-1" />
                  <span className="text-xs font-semibold">{t('tabSelector')}</span>
                </button>
                <button
                  onClick={() => setCurrentTab('inquiry')}
                  className={`flex-1 flex flex-col items-center justify-center py-3 px-4 transition-colors ${
                    currentTab === 'inquiry'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="w-6 h-6 mb-1" />
                  <span className="text-xs font-semibold">{t('tabInquiry')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FanContext.Provider>
  );
}


