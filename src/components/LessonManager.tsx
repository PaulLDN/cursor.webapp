import React, { useState } from 'react';
import { Lesson } from '@/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Plus, Edit, Trash2, Save, X, Play, FileText, Video, HelpCircle } from 'lucide-react';

interface LessonManagerProps {
  courseId: string;
  lessons: Lesson[];
  onLessonsChange: (lessons: Lesson[]) => void;
}

const LessonManager: React.FC<LessonManagerProps> = ({ courseId, lessons, onLessonsChange }) => {
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  console.log('LessonManager received lessons:', lessons, 'for course:', courseId);

  // Add error boundary and validation
  if (!lessons || !Array.isArray(lessons)) {
    console.error('LessonManager: Invalid lessons prop:', lessons);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: Invalid lessons data received</p>
        <p className="text-sm text-red-500 mt-1">Lessons: {JSON.stringify(lessons)}</p>
      </div>
    );
  }

  const handleCreateLesson = () => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'text',
      content: '',
      duration: 5,
      order: lessons.length + 1,
      isPublished: false,
      courseId,
    };
    setEditingLesson(newLesson);
    setShowCreateForm(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson({ ...lesson });
    setShowCreateForm(true);
  };

  const handleSaveLesson = () => {
    if (!editingLesson) return;

    const updatedLessons = editingLesson.id === 'new'
      ? [...lessons, { ...editingLesson, id: Date.now().toString() }]
      : lessons.map(lesson => lesson.id === editingLesson.id ? editingLesson : lesson);

    onLessonsChange(updatedLessons);
    setEditingLesson(null);
    setShowCreateForm(false);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    
    const updatedLessons = lessons.filter(lesson => lesson.id !== lessonId);
    onLessonsChange(updatedLessons);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />;
      case 'slide':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
        <Button onClick={handleCreateLesson} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      {/* Lessons List */}
      <div className="space-y-2">
        {sortedLessons.map((lesson) => (
          <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-gray-500">
                  {getLessonIcon(lesson.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-sm text-gray-500">{lesson.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{lesson.duration} min</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lesson.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditLesson(lesson)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && editingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingLesson.id === 'new' ? 'Create Lesson' : 'Edit Lesson'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingLesson(null);
                  setShowCreateForm(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Title
                  </label>
                  <Input
                    value={editingLesson.title}
                    onChange={(e) => setEditingLesson({...editingLesson, title: e.target.value})}
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Type
                  </label>
                  <select
                    value={editingLesson.type}
                    onChange={(e) => setEditingLesson({...editingLesson, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text">Text Lesson</option>
                    <option value="video">Video Lesson</option>
                    <option value="slide">Slide Lesson</option>
                    <option value="quiz">Quiz Lesson</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingLesson.description}
                  onChange={(e) => setEditingLesson({...editingLesson, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Enter lesson description"
                />
              </div>

              {editingLesson.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <Input
                    value={editingLesson.videoUrl || ''}
                    onChange={(e) => setEditingLesson({...editingLesson, videoUrl: e.target.value})}
                    placeholder="https://youtube.com/watch?v=... or video file URL"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={editingLesson.content}
                  onChange={(e) => setEditingLesson({...editingLesson, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter lesson content (supports Markdown)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={editingLesson.duration}
                    onChange={(e) => setEditingLesson({...editingLesson, duration: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <Input
                    type="number"
                    value={editingLesson.order}
                    onChange={(e) => setEditingLesson({...editingLesson, order: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={editingLesson.isPublished}
                    onChange={(e) => setEditingLesson({...editingLesson, isPublished: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                    Published
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingLesson(null);
                    setShowCreateForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveLesson}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Lesson
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonManager;
