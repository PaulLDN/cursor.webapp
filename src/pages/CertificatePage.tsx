import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import { Download, ArrowLeft, Award } from 'lucide-react';

const CertificatePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const course = demoCourses.find(c => c.id === courseId);

  if (!course || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course or user not found</h2>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF download functionality would be implemented here');
  };

  const handleDownloadPNG = () => {
    // In a real implementation, this would generate and download a PNG
    alert('PNG download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={`/courses/${course.id}`} className="text-corporate-primary hover:text-corporate-secondary">
                ← Back to Course
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="h-5 w-5 text-corporate-primary" />
              <span className="text-sm text-gray-600">Certificate</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Certificate */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-gradient-corporate text-white p-8 text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
            <p className="text-blue-100">Corporate Training Platform</p>
          </div>

          {/* Certificate Content */}
          <div className="p-12 text-center">
            <p className="text-lg text-gray-600 mb-6">This is to certify that</p>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-8 border-b-2 border-corporate-primary pb-4 inline-block">
              {user.name}
            </h2>
            
            <p className="text-lg text-gray-600 mb-4">
              has successfully completed the course
            </p>
            
            <h3 className="text-2xl font-semibold text-corporate-primary mb-8">
              {course.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Date Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                <p className="text-lg font-mono text-gray-900">
                  {course.id.toUpperCase()}-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-4">
                This certificate verifies the successful completion of the course and demonstrates
                proficiency in the subject matter covered.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Verified by</p>
                  <p className="text-sm font-medium text-gray-700">Corporate Training Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={handleDownloadPDF} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={handleDownloadPNG} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </Button>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/courses">
            <Button>Browse More Courses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
