import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Video, Download, Search, Filter, Eye, Trash2, Calendar, File as FileIcon } from 'lucide-react';

interface Material {
  id: number;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'image' | 'video';
  chapter: string;
  description: string;
  uploadDate: string;
  size?: string;
  url?: string;
}

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [materials, setMaterials] = useState<Material[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const triggerUpload = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
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
      {/* Upload Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-2">Файлдарды сүйреп апарыңыз немесе таңдаңыз</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => triggerUpload('.pdf')} className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button onClick={() => triggerUpload('.jpg,.jpeg,.png,.gif')} className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
              <Image className="w-4 h-4" />
              <span>Сурет</span>
            </button>
            <button onClick={() => triggerUpload('.mp4,.avi,.mov')} className="flex items-center space-x-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
              <Video className="w-4 h-4" />
              <span>Видео</span>
            </button>
          </div>
        </div>
      </div>
      {/* Rest of your materials code (search, filters, list, etc.) remains unchanged */}
    </div>
  );
};

      {/* Compact Upload Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Upload Area */}
          <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer">
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-2">Файлдарды сүйреп апарыңыз немесе таңдаңыз</p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
            />
          </label>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
              <Image className="w-4 h-4" />
              <span>Сурет</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
              <Video className="w-4 h-4" />
              <span>Видео</span>
            </button>
          </div>
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
                  </div>
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
  );
};

export default Materials;