import React, { useState } from 'react';
import { Upload, FileText, Image, Video, Download, Search, Eye, Trash2, Calendar, File as FileIcon, Plus, Edit, Save } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkData, setLinkData] = useState({
    title: '',
    description: '',
    type: 'pdf' as Material['type'],
    chapter: '1-тарау: Негізгі ұғымдар',
    url: ''
  });

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

  const addMaterialFromLink = () => {
    if (!linkData.url.trim()) return;
    const newMaterial: Material = {
      id: Date.now() + Math.random(),
      title: linkData.title || 'Сілтеме материалы',
      type: linkData.type,
      chapter: linkData.chapter,
      description: linkData.description || 'Сілтеме арқылы қосылған',
      uploadDate: new Date().toISOString().split('T')[0],
      url: linkData.url
    };
    setMaterials(prev => [newMaterial, ...prev]);
    setLinkData({
      title: '',
      description: '',
      type: 'pdf',
      chapter: '1-тарау: Негізгі ұғымдар',
      url: ''
    });
    setShowLinkForm(false);
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
          Тараулар мен тақырыптар бойынша ұйымдастырылған барлық химия оқу материалдарыңызға қол жеткізіңіз.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center space-y-3">
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
          <p className="text-gray-600 text-sm">PDF, Word, PowerPoint, суреттер және басқа файлдарды қолдау көрсетіледі</p>
          <button
            onClick={() => setShowLinkForm(true)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Сілтеме қосу</span>
          </button>
        </div>
      </div>

      {/* Link Form Modal */}
      {showLinkForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Сілтеме арқылы материал қосу</h2>
            <input
              type="text"
              placeholder="Атауы"
              className="w-full px-3 py-2 border rounded-lg"
              value={linkData.title}
              onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
            />
            <textarea
              placeholder="Сипаттама"
              className="w-full px-3 py-2 border rounded-lg"
              value={linkData.description}
              onChange={(e) => setLinkData({ ...linkData, description: e.target.value })}
            />
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={linkData.type}
              onChange={(e) => setLinkData({ ...linkData, type: e.target.value as Material['type'] })}
            >
              <option value="pdf">PDF</option>
              <option value="doc">Word</option>
              <option value="ppt">PowerPoint</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={linkData.chapter}
              onChange={(e) => setLinkData({ ...linkData, chapter: e.target.value })}
            >
              {chapters.map(ch => <option key={ch} value={ch}>{ch}</option>)}
            </select>
            <input
              type="text"
              placeholder="Файл сілтемесі (URL)"
              className="w-full px-3 py-2 border rounded-lg"
              value={linkData.url}
              onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowLinkForm(false)} className="px-3 py-2 text-gray-600">Бас тарту</button>
              <button onClick={addMaterialFromLink} className="px-3 py-2 bg-green-600 text-white rounded-lg">Қосу</button>
            </div>
          </div>
        </div>
      )}

      {/* (Rest of your component stays same — list, filters, edit, etc.) */}
      {/* ... keep the rest of your original Materials.tsx unchanged ... */}
    </div>
  );
};

export default Materials;
