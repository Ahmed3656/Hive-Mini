import React from 'react';
import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Share2,
  Copy,
  Trash2,
} from 'lucide-react';
import {
  Badge,
  Button,
  IconButton,
  Input,
  Pagination,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  usePagination,
  useToastHelpers,
} from '../../components/ui';
import { surveyData } from '../../constants';

export const Surveys = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { success, danger, warning, info } = useToastHelpers();

  const statusCounts = useMemo(() => {
    const counts = surveyData.reduce((acc, survey) => {
      acc[survey.status] = (acc[survey.status] || 0) + 1;
      return acc;
    }, {});

    return {
      All: surveyData.length,
      Published: counts.Published || 0,
      Draft: counts.Draft || 0,
      Archived: counts.Archived || 0,
      Scheduled: counts.Scheduled || 0,
    };
  }, []);

  const tabs = [
    { id: 'All', label: 'All', count: statusCounts.All },
    { id: 'Published', label: 'Published', count: statusCounts.Published },
    { id: 'Draft', label: 'Draft', count: statusCounts.Draft },
    { id: 'Archived', label: 'Archived', count: statusCounts.Archived },
    { id: 'Scheduled', label: 'Scheduled', count: statusCounts.Scheduled },
  ];

  const filteredSurveys = useMemo(() => {
    let filtered = surveyData;

    if (activeTab !== 'All') {
      filtered = filtered.filter((survey) => survey.status === activeTab);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (survey) =>
          survey.title.toLowerCase().includes(searchLower) ||
          survey.createdBy.toLowerCase().includes(searchLower) ||
          survey.modifiedBy.toLowerCase().includes(searchLower) ||
          survey.type.toLowerCase().includes(searchLower) ||
          survey.language.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [activeTab, searchTerm]);

  const { currentPage, setCurrentPage, paginatedData, totalItems } =
    usePagination(filteredSurveys, 8);

  const handleCreateSurvey = () => {
    success(
      'Survey Created!',
      'Your new survey has been created successfully.'
    );
  };

  const handleDeleteSurvey = (surveyTitle) => {
    danger('Survey Deleted', `"${surveyTitle}" has been permanently deleted.`);
  };

  const handleCopySurvey = (surveyTitle) => {
    info(
      'Survey Copied',
      `"${surveyTitle}" has been copied to your clipboard.`
    );
  };

  const handleShareSurvey = (surveyTitle) => {
    warning(
      'Share Link Generated',
      `Share link for "${surveyTitle}" has been generated.`
    );
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Surveys
        </h1>
        <Button
          onClick={handleCreateSurvey}
          className="flex items-center space-x-2 w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>Create new survey</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          tabs={tabs}
          defaultTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Advanced search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredSurveys.length} of {surveyData.length} surveys
          {activeTab !== 'All' && ` in "${activeTab}"`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Created by</TableHead>
                <TableHead className="min-w-[120px]">Modified at</TableHead>
                <TableHead className="min-w-[120px]">Modified by</TableHead>
                <TableHead className="min-w-[80px]">Type</TableHead>
                <TableHead className="min-w-[100px]">Language</TableHead>
                <TableHead className="min-w-[100px]">Responses</TableHead>
                <TableHead className="min-w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {survey.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Created at {survey.createdAt}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          survey.status === 'Published'
                            ? 'success'
                            : survey.status === 'Draft'
                              ? 'warning'
                              : survey.status === 'Archived'
                                ? 'secondary'
                                : 'primary'
                        }
                        size="sm"
                      >
                        {survey.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>Expires at {survey.expires}</div>
                        <div>Publish at {survey.publish}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.createdBy}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.modifiedAt}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.modifiedBy}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.type}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.language}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-gray-600">
                      {survey.responses}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <IconButton
                          title="View"
                          size="sm"
                          onClick={() =>
                            info('Survey Opened', `Viewing "${survey.title}"`)
                          }
                        >
                          <Eye size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                        <IconButton
                          title="Download"
                          size="sm"
                          onClick={() =>
                            success(
                              'Download Started',
                              `Downloading "${survey.title}"`
                            )
                          }
                        >
                          <Download size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                        <IconButton
                          title="Share"
                          size="sm"
                          onClick={() => handleShareSurvey(survey.title)}
                        >
                          <Share2 size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                        <IconButton
                          title="Copy"
                          size="sm"
                          onClick={() => handleCopySurvey(survey.title)}
                        >
                          <Copy size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                        <IconButton title="More" size="sm">
                          <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                        <IconButton
                          title="Delete"
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteSurvey(survey.title)}
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No surveys found</p>
                      <p className="text-sm mt-1">
                        {searchTerm
                          ? `No surveys match your search "${searchTerm}"`
                          : `No surveys in "${activeTab}" status`}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={8}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
