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

export default Materials;
