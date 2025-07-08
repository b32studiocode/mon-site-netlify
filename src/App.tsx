import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  Upload, 
  Download,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase
} from 'lucide-react';

// Types
interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  status: 'active' | 'inactive' | 'vacation';
}

interface Shift {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'normal' | 'overtime' | 'night' | 'weekend';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
  manager: string;
  employeeCount: number;
}

// Sample data
const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@gmsi.fr',
    phone: '+33 1 23 45 67 89',
    department: 'Production',
    position: 'Opératrice',
    location: 'Atelier A',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jean Martin',
    email: 'jean.martin@gmsi.fr',
    phone: '+33 1 23 45 67 90',
    department: 'Maintenance',
    position: 'Technicien',
    location: 'Atelier B',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@gmsi.fr',
    phone: '+33 1 23 45 67 91',
    department: 'Qualité',
    position: 'Contrôleuse',
    location: 'Laboratoire',
    status: 'vacation'
  }
];

const sampleDepartments: Department[] = [
  { id: '1', name: 'Production', color: 'bg-blue-500', manager: 'Pierre Durand', employeeCount: 25 },
  { id: '2', name: 'Maintenance', color: 'bg-green-500', manager: 'Alain Moreau', employeeCount: 8 },
  { id: '3', name: 'Qualité', color: 'bg-purple-500', manager: 'Catherine Blanc', employeeCount: 6 },
  { id: '4', name: 'Logistique', color: 'bg-orange-500', manager: 'Michel Roux', employeeCount: 12 }
];

const sampleShifts: Shift[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2024-01-15',
    startTime: '08:00',
    endTime: '16:00',
    type: 'normal',
    status: 'scheduled'
  },
  {
    id: '2',
    employeeId: '2',
    date: '2024-01-15',
    startTime: '14:00',
    endTime: '22:00',
    type: 'normal',
    status: 'confirmed'
  }
];

// Components
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ title, value, icon, color, trend }) => (
  <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {trend && <p className="text-sm opacity-90">{trend}</p>}
      </div>
      <div className="text-4xl opacity-80">{icon}</div>
    </div>
  </div>
);

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        employee.status === 'active' ? 'bg-green-100 text-green-800' :
        employee.status === 'vacation' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {employee.status === 'active' ? 'Actif' :
         employee.status === 'vacation' ? 'Congés' : 'Inactif'}
      </span>
    </div>
    
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        <span>{employee.position}</span>
      </div>
      <div className="flex items-center">
        <Building2 className="w-4 h-4 mr-2" />
        <span>{employee.department}</span>
      </div>
      <div className="flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{employee.location}</span>
      </div>
      <div className="flex items-center">
        <Mail className="w-4 h-4 mr-2" />
        <span className="truncate">{employee.email}</span>
      </div>
      <div className="flex items-center">
        <Phone className="w-4 h-4 mr-2" />
        <span>{employee.phone}</span>
      </div>
    </div>
    
    <div className="mt-4 flex space-x-2">
      <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
        <Edit className="w-4 h-4 inline mr-1" />
        Modifier
      </button>
      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
        <Eye className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const DepartmentCard: React.FC<{ department: Department }> = ({ department }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className={`w-4 h-4 ${department.color} rounded-full mr-3`}></div>
        <h3 className="font-semibold text-gray-900">{department.name}</h3>
      </div>
      <span className="text-2xl font-bold text-gray-700">{department.employeeCount}</span>
    </div>
    
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center">
        <User className="w-4 h-4 mr-2" />
        <span>Manager: {department.manager}</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-2" />
        <span>{department.employeeCount} employés</span>
      </div>
    </div>
    
    <div className="mt-4">
      <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
        Voir les détails
      </button>
    </div>
  </div>
);

const PlanningCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  
  const getDaysInWeek = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Start on Monday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };
  
  const weekDays = getDaysInWeek(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Planning de la semaine</h2>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'week' ? 'bg-white shadow-sm' : ''
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'month' ? 'bg-white shadow-sm' : ''
              }`}
            >
              Mois
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4 inline mr-1" />
            Nouveau créneau
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header with days */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-2"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-2 text-center border-b">
                <div className="font-medium text-gray-900">
                  {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </div>
                <div className="text-sm text-gray-600">
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          <div className="max-h-96 overflow-y-auto">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1 border-b border-gray-100">
                <div className="p-2 text-xs text-gray-500 text-right">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {weekDays.map((day, dayIndex) => (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className="p-2 min-h-[40px] border-r border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Sample shift */}
                    {hour === 8 && dayIndex === 0 && (
                      <div className="bg-blue-100 border-l-4 border-blue-500 p-1 rounded text-xs">
                        <div className="font-medium">Marie D.</div>
                        <div className="text-gray-600">08:00-16:00</div>
                      </div>
                    )}
                    {hour === 14 && dayIndex === 0 && (
                      <div className="bg-green-100 border-l-4 border-green-500 p-1 rounded text-xs">
                        <div className="font-medium">Jean M.</div>
                        <div className="text-gray-600">14:00-22:00</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const filteredEmployees = sampleEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Fichier sélectionné:', file.name);
      // Ici vous pourriez ajouter la logique pour traiter le fichier Excel
    }
  };
  
  const exportToExcel = () => {
    console.log('Export vers Excel...');
    // Ici vous pourriez ajouter la logique pour exporter vers Excel
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">GMSI Planning</h1>
            </div>
            
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: Calendar },
                { id: 'employees', label: 'Employés', icon: Users },
                { id: 'departments', label: 'Départements', icon: Building2 },
                { id: 'planning', label: 'Planning', icon: Clock }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".xlsx,.xls,.csv"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Employés"
                value={sampleEmployees.length}
                icon={<Users />}
                color="bg-blue-600"
                trend="+2 ce mois"
              />
              <StatCard
                title="Départements"
                value={sampleDepartments.length}
                icon={<Building2 />}
                color="bg-green-600"
              />
              <StatCard
                title="Plannings Actifs"
                value="12"
                icon={<Calendar />}
                color="bg-purple-600"
                trend="Cette semaine"
              />
              <StatCard
                title="Heures Planifiées"
                value="320h"
                icon={<Clock />}
                color="bg-orange-600"
                trend="Cette semaine"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Plus className="w-6 h-6 mr-2 text-gray-400" />
                  <span className="text-gray-600">Nouvel Employé</span>
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <Calendar className="w-6 h-6 mr-2 text-gray-400" />
                  <span className="text-gray-600">Nouveau Planning</span>
                </button>
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <FileSpreadsheet className="w-6 h-6 mr-2 text-gray-400" />
                  <span className="text-gray-600">Générer Rapport</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité Récente</h2>
              <div className="space-y-4">
                {[
                  { action: 'Nouveau planning créé', user: 'Marie Dubois', time: 'Il y a 2h', status: 'success' },
                  { action: 'Employé ajouté', user: 'Jean Martin', time: 'Il y a 4h', status: 'info' },
                  { action: 'Planning modifié', user: 'Sophie Laurent', time: 'Il y a 6h', status: 'warning' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher un employé..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Tous les départements</option>
                    {sampleDepartments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Nouvel Employé
                </button>
              </div>
            </div>

            {/* Employees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Départements</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Nouveau Département
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleDepartments.map(department => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="space-y-6">
            <PlanningCalendar />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;