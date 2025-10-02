import React, { useState } from 'react';
import { Upload, FileText, Image, Video, Download, Search, Filter, Eye, Trash2, Calendar, File as FileIcon, Plus, Link, Edit, Save } from 'lucide-react';

interface Material {
  id: number;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'image' | 'video';
  chapter: string;
  description: string;
  uploadDate: string;
  size?: string;
  url?: string;
  isEditing?: boolean;
}

interface MaterialsProps {
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}

const Materials: React.FC<MaterialsProps> = ({ materials, setMaterials }) => {
  // Initialize with sample materials if empty
  React.useEffect(() => {
    if (materials.length === 0) {
      const sampleMaterials: Material[] = [
        {
          id: 1,
          title: 'Химияның негізгі ұғымдары',
          type: 'pdf',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Химияның іргелі принциптері мен негізгі ұғымдары туралы толық нұсқаулық',
          uploadDate: '2024-01-15',
          size: '2.5 MB',
          url: '#'
        },
        {
          id: 2,
          title: 'Атом құрылысы презентациясы',
          type: 'ppt',
          chapter: '2-тарау: Атом құрылысы',
          description: 'Атом құрылысы мен электрон конфигурациясы туралы интерактивті презентация',
          uploadDate: '2024-01-20',
          size: '4.1 MB',
          url: '#'
        },
        {
          id: 3,
          title: 'Химиялық байланыс түрлері',
          type: 'doc',
          chapter: '3-тарау: Химиялық байланыс',
          description: 'Ионды, коваленттік және металдық байланыстар туралы толық ақпарат',
          uploadDate: '2024-01-25',
          size: '1.8 MB',
          url: '#'
        },
        {
          id: 4,
          title: 'Периодтық кесте диаграммасы',
          type: 'image',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Жоғары ажыратымдылықтағы периодтық кесте суреті',
          uploadDate: '2024-02-01',
          size: '3.2 MB',
          url: '#'
        },
        {
          id: 5,
          title: 'Химиялық реакциялар жіктелуі',
          type: 'pdf',
          chapter: '4-тарау: Химиялық реакциялар',
          description: 'Реакция түрлері мен олардың сипаттамалары',
          uploadDate: '2024-02-05',
          size: '2.1 MB',
          url: '#'
        },
        {
          id: 6,
          title: 'Зертхана қауіпсіздігі нұсқаулығы',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Химия зертханасында қауіпсіздік ережелері мен нұсқаулықтар',
          uploadDate: '2024-02-10',
          size: '1.5 MB',
          url: '#'
        },
        {
          id: 7,
          title: 'Органикалық химия кіріспе',
          type: 'ppt',
          chapter: '6-тарау: Органикалық химия',
          description: 'Органикалық қосылыстардың негізгі класстары мен қасиеттері',
          uploadDate: '2024-02-15',
          size: '5.3 MB',
          url: '#'
        },
        {
          id: 8,
          title: 'Қышқылдар мен негіздер теориясы',
          type: 'pdf',
          chapter: '5-тарау: Қышқылдар мен негіздер',
          description: 'Аррениус, Бренстед-Лоури және Льюис теорияларының салыстырмалы талдауы',
          uploadDate: '2024-02-20',
          size: '2.8 MB',
          url: '#'
        },
        // Text/Link type materials
        {
          id: 9,
          title: 'Химия формулалар жинағы',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Барлық маңызды химиялық формулалар мен теңдеулердің толық тізімі',
          uploadDate: '2024-02-25',
          size: '0.8 MB',
          url: 'https://example.com/formulas',
          isLink: true
        },
        {
          id: 10,
          title: 'Интерактивті периодтық кесте',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Онлайн интерактивті периодтық кесте - элементтер туралы толық ақпарат',
          uploadDate: '2024-03-01',
          url: 'https://ptable.com',
          isLink: true
        },
        {
          id: 11,
          title: 'Химиялық есептеулер калькуляторы',
          type: 'doc',
          chapter: '4-тарау: Химиялық реакциялар',
          description: 'Молярлық масса, концентрация және стехиометрия есептеулері үшін онлайн құрал',
          uploadDate: '2024-03-05',
          url: 'https://example.com/calculator',
          isLink: true
        },
        {
          id: 12,
          title: 'Химия терминдер сөздігі',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Химиялық терминдер мен анықтамалардың толық сөздігі',
          uploadDate: '2024-03-10',
          url: 'https://example.com/dictionary',
          isLink: true
        },
        {
          id: 13,
          title: 'Зертханалық жұмыстар нұсқаулығы',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'Практикалық жұмыстар мен эксперименттер жүргізу бойынша нұсқаулықтар',
          uploadDate: '2024-03-15',
          url: 'https://example.com/lab-guide',
          isLink: true
        },
        {
          id: 14,
          title: 'Химия бойынша видео дәрістер',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'YouTube арнасындағы химия дәрістерінің толық жинағы',
          uploadDate: '2024-03-20',
          url: 'https://youtube.com/chemistry-lectures',
          isLink: true
        },
        {
          id: 15,
          title: 'Химиялық реакциялар симуляторы',
          type: 'doc',
          chapter: '4-тарау: Химиялық реакциялар',
          description: 'Виртуалды зертханада химиялық реакцияларды модельдеу',
          uploadDate: '2024-03-25',
          url: 'https://example.com/simulator',
          isLink: true
        },
        {
          id: 16,
          title: 'Химия емтихандарына дайындық',
          type: 'doc',
          chapter: '1-тарау: Негізгі ұғымдар',
          description: 'ҰБТ және басқа емтихандарға дайындалу үшін материалдар жинағы',
          uploadDate: '2024-03-30',
          url: 'https://example.com/exam-prep',
          isLink: true
        }
      ];
      setMaterials(sampleMaterials);
    }
  }, [materials.length, setMaterials]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const chapters = [
    '1-тарау: Негізгі ұғымдар',
    '2-тарау: Атом құрылысы',
    '3-тарау: Химиялық байланыс',
    '4-тарау: Химиялық реакциялар',
    '5-тарау: Қышқылдар мен негіздер',
    '6-тарау: Органикалық химия'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newMaterial: Material = {
          id: Date.now() + Math.random(),
          title: file.name,
          type: getFileType(file.name),
          chapter: '1-тарау: Негізгі ұғымдар',
          description: `Жүктелген файл: ${file.name}`,
          uploadDate: new Date().toISOString().split('T')[0],
          size: formatFileSize(file.size),
          url: URL.createObjectURL(file)
        };
        setMaterials(prev => [newMaterial, ...prev]);
      });
    }
  };

  const editMaterial = (id: number) => {
    setMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, isEditing: true } : material
    ));
  };

  const saveMaterial = (id: number, updatedMaterial: Partial<Material>) => {
    setMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, ...updatedMaterial, isEditing: false } : material
    ));
  };

  const getFileType = (filename: string): 'pdf' | 'doc' | 'ppt' | 'image' | 'video' => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(ext || '')) return 'doc';
    if (['ppt', 'pptx'].includes(ext || '')) return 'ppt';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return 'image';
    if (['mp4', 'avi', 'mov'].includes(ext || '')) return 'video';
    return 'doc';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteMaterial = (id: number) => {
    setMaterials(prev => prev.filter(material => material.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return <FileText className="w-5 h-5" />;
      case 'ppt':
        return <FileIcon className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700';
      case 'doc':
        return 'bg-blue-100 text-blue-700';
      case 'ppt':
        return 'bg-orange-100 text-orange-700';
      case 'image':
        return 'bg-green-100 text-green-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || material.chapter === selectedChapter;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesChapter && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Материалдар
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Тараулар мен тақырыптар бойынша ұйымдастырылған барлық химия оқу материалдарыңызға қол жеткізіңіз. Оқу тәжірибеңізді жақсарту үшін ресурстарды жүктеп алыңыз және жүктеңіз.
        </p>
      </div>

      {/* Compact Upload Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <label className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg">
              <Upload className="w-5 h-5" />
              <span>Файл жүктеу</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.txt,.xlsx,.xls"
              />
            </label>
            <button
              onClick={() => {/* Add link functionality */}}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Link className="w-5 h-5" />
              <span>Сілтеме қосу</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-3">PDF, Word, PowerPoint, суреттер және сілтемелерді қолдау көрсетіледі</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Материалдарды іздеу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Chapter Filter */}
          <div className="lg:w-48">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
            >
              <option value="all">Барлық тараулар</option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="lg:w-40">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
            >
              <option value="all">Барлық түрлер</option>
              <option value="pdf">PDF</option>
              <option value="doc">Word</option>
              <option value="ppt">PowerPoint</option>
              <option value="image">Суреттер</option>
              <option value="video">Видеолар</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {filteredMaterials.length} материал табылды
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 text-sm ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 text-sm ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <div className="w-4 h-4 flex flex-col space-y-1">
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
                <div className="bg-current h-0.5 rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredMaterials.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg col-span-full">
            <p className="text-gray-500 text-lg">Сіздің критерийлеріңізге сәйкес материалдар табылмады.</p>
          </div>
        ) : (
          filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {viewMode === 'grid' ? (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${getTypeColor(material.type)} flex items-center justify-center`}>
                    {getTypeIcon(material.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {material.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{material.description}</p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="bg-gray-100 px-2 py-1 rounded text-center text-xs">{material.chapter}</div>
                      <div className="flex justify-between">
                        <span><Calendar className="w-3 h-3 inline mr-1" />{material.uploadDate}</span>
                        {material.size && <span>{material.size}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-xs">
                      <Eye className="w-3 h-3" />
                      <span>Көру</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-xs">
                      <Download className="w-3 h-3" />
                      <span>Жүктеу</span>
                    </button>
                    <button 
                      onClick={() => deleteMaterial(material.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => editMaterial(material.id)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {material.title}
                      </h3>
                      <p className="text-gray-600 mb-2 text-xs">{material.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{material.chapter}</span>
                        <span><Calendar className="w-3 h-3 inline mr-1" />Жүктелген: {material.uploadDate}</span>
                        {material.size && <span>Өлшемі: {material.size}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-xs">
                      <Eye className="w-4 h-4" />
                      <span>Көру</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 text-xs">
                      <Download className="w-4 h-4" />
                      <span>Жүктеп алу</span>
                    </button>
                    <button 
                      onClick={() => deleteMaterial(material.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => editMaterial(material.id)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Edit Form */}
              {material.isEditing && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <MaterialEditForm 
                    material={material}
                    chapters={chapters}
                    onSave={(updatedMaterial) => saveMaterial(material.id, updatedMaterial)}
                    onCancel={() => setMaterials(prev => prev.map(m => m.id === material.id ? { ...m, isEditing: false } : m))}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chapter Organization */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Тараулар бойынша материалдар</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const chapterMaterials = materials.filter(m => m.chapter === chapter);
            return (
              <div key={chapter} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900">{chapter}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{chapterMaterials.length} материал қолжетімді</p>
                <button 
                  onClick={() => setSelectedChapter(chapter)}
                  className="w-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 py-2 px-4 rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Материалдарды көру
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface MaterialEditFormProps {
  material: Material;
  chapters: string[];
  onSave: (updatedMaterial: Partial<Material>) => void;
  onCancel: () => void;
}

const MaterialEditForm: React.FC<MaterialEditFormProps> = ({ material, chapters, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    title: material.title,
    description: material.description,
    chapter: material.chapter
  });

  const handleSave = () => {
    onSave(editData);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Атауы</label>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Сипаттама</label>
        <textarea
          value={editData.description}
          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Тарау</label>
        <select
          value={editData.chapter}
          onChange={(e) => setEditData(prev => ({ ...prev, chapter: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          {chapters.map(chapter => (
            <option key={chapter} value={chapter}>{chapter}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors text-sm"
        >
          Бас тарту
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
        >
          <Save className="w-3 h-3" />
          <span>Сақтау</span>
        </button>
      </div>
    </div>
  );
};

export default Materials;