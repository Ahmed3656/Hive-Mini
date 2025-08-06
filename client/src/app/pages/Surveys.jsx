import React from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Share2,
  Copy,
  Trash2,
  Calendar,
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
  useModal,
  usePagination,
  useToastHelpers,
} from '../../components/ui';
import { CreateSurveyModal } from '../../components/core';
import { useGlobalLoading } from '../../components/shared';

// API service functions
const surveyAPI = {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/API/Survey/GetAll`
    );
    const data = await response.json();

    if (!response.ok || data.Error) {
      throw new Error(data.Error?.Message || 'Failed to fetch surveys');
    }

    return data.Result || [];
  },

  async getById(id) {
    const response = await fetch(`/API/Survey/GetById?Id=${id}`);
    const data = await response.json();

    if (!response.ok || data.Error) {
      throw new Error(data.Error?.Message || 'Failed to fetch survey');
    }

    return data.Result;
  },

  async delete(id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/API/Survey/Delete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: id }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.Error) {
      throw new Error(data.Error?.Message || 'Failed to delete survey');
    }

    return data.Result;
  },
};

export const Surveys = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [surveys, setSurveys] = useState([]);

  const { success, danger, warning, info } = useToastHelpers();
  const { startLoading, stopLoading } = useGlobalLoading();
  const {
    isOpen: isCreateModalOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const fetchSurveys = useCallback(async () => {
    try {
      startLoading('Loading surveys', 'Please wait...', {
        type: 'spinner',
        color: 'blue',
      });

      const surveysData = await surveyAPI.getAll();
      setSurveys(surveysData);

      if (surveysData.length === 0) {
        info('No Surveys', 'No surveys found in the system.');
      }
    } catch (error) {
      danger('Error Loading Surveys', error.message);
      setSurveys([]);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, info, danger]);

  // Fetch all surveys on component mount
  useEffect(() => {
    fetchSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusCounts = useMemo(() => {
    const counts = surveys.reduce((acc, survey) => {
      const status = survey.Status || survey.status || 'Draft';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      All: surveys.length,
      Published: counts.Published || 0,
      Draft: counts.Draft || 0,
      Archived: counts.Archived || 0,
      Scheduled: counts.Scheduled || 0,
    };
  }, [surveys]);

  const tabs = [
    { id: 'All', label: 'All', count: statusCounts.All },
    { id: 'Published', label: 'Published', count: statusCounts.Published },
    { id: 'Draft', label: 'Draft', count: statusCounts.Draft },
    { id: 'Archived', label: 'Archived', count: statusCounts.Archived },
    { id: 'Scheduled', label: 'Scheduled', count: statusCounts.Scheduled },
  ];

  const filteredSurveys = useMemo(() => {
    let filtered = surveys;

    if (activeTab !== 'All') {
      filtered = filtered.filter((survey) => {
        const status = survey.Status || survey.status || 'Draft';
        return status === activeTab;
      });
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((survey) => {
        const title = survey.Title || survey.title || '';
        const createdBy = survey.CreatedByUserName;
        const modifiedBy = survey.ModifiedByUserName;
        const type = survey.Type || survey.type || '';
        const language = survey.Language || survey.language || '';

        return (
          title.toLowerCase().includes(searchLower) ||
          createdBy.toLowerCase().includes(searchLower) ||
          modifiedBy.toLowerCase().includes(searchLower) ||
          type.toLowerCase().includes(searchLower) ||
          language.toLowerCase().includes(searchLower)
        );
      });
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((survey) => {
        const modifiedAt = survey.ModifiedAt;
        if (!modifiedAt) return false;

        try {
          const surveyDate = new Date(modifiedAt);
          // Filter surveys created on the selected date (same day)
          console.log('surveyDate:', surveyDate, 'filterDate:', filterDate);
          return surveyDate.toDateString() === filterDate.toDateString();
        } catch {
          return false;
        }
      });
    }

    return filtered;
  }, [activeTab, searchTerm, dateFilter, surveys]);

  const { currentPage, setCurrentPage, paginatedData, totalItems } =
    usePagination(filteredSurveys, 8);

  const handleCreateSurvey = () => {
    openCreateModal();
  };

  const handleDeleteSurvey = async (survey) => {
    try {
      const surveyId = survey.ID || survey.id;
      const surveyTitle = survey.Title || survey.title || 'Unknown Survey';

      startLoading('Deleting survey', 'This may take a moment...', {
        type: 'spinner',
      });

      await surveyAPI.delete(surveyId);

      // Remove the deleted survey from the state
      setSurveys((prevSurveys) =>
        prevSurveys.filter((s) => (s.ID || s.id) !== surveyId)
      );

      success(
        'Survey Deleted',
        `"${surveyTitle}" has been permanently deleted.`
      );
    } catch (error) {
      danger('Delete Failed', error.message);
    } finally {
      stopLoading();
    }
  };

  const handleCopySurvey = (survey) => {
    const surveyTitle = survey.Title || survey.title || 'Unknown Survey';
    info(
      'Survey Copied',
      `"${surveyTitle}" has been copied to your clipboard.`
    );
  };

  const handleShareSurvey = (survey) => {
    const surveyTitle = survey.Title || survey.title || 'Unknown Survey';
    warning(
      'Share Link Generated',
      `Share link for "${surveyTitle}" has been generated.`
    );
  };

  const handleDownloadSurvey = (survey) => {
    const surveyTitle = survey.Title || survey.title || 'Unknown Survey';
    success('Download Started', `Downloading "${surveyTitle}"`);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setDateFilter('');
    setCurrentPage(1);
  };

  // Helper function to format dates (adjust based on your API date format)
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Helper function to get badge variant based on status
  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'secondary';
      case 'scheduled':
        return 'primary';
      default:
        return 'secondary';
    }
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
          <Calendar
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="date"
            placeholder="Filter by creation date..."
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10"
            title="Filter surveys by creation date"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredSurveys.length} of {surveys.length} surveys
          {activeTab !== 'All' && ` in "${activeTab}"`}
          {searchTerm && ` matching "${searchTerm}"`}
          {dateFilter &&
            ` created on ${new Date(dateFilter).toLocaleDateString()}`}
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
                paginatedData.map((survey) => {
                  const surveyId = survey.ID || survey.id;
                  const title =
                    survey.Title || survey.title || 'Untitled Survey';
                  const status = survey.Status || survey.status || 'Draft';
                  const createdBy = survey.CreatedByUserName;
                  const createdAt = Date(survey.CreatedAt).toLocaleString();
                  const modifiedAt = Date(survey.ModifiedAt).toLocaleString();
                  let expiresAt = new Date(survey.ModifiedAt);
                  expiresAt.setDate(expiresAt.getDate() + 30).toLocaleString();
                  const modifiedBy = survey.ModifiedByUserName;
                  const type = survey.Type || survey.type || 'N/A';
                  const language = survey.Language || survey.language || 'N/A';
                  const responses = survey.Responses || survey.responses || 0;
                  console.log('Survey:', survey);

                  return (
                    <TableRow key={surveyId}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">
                            {title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Created at {formatDate(createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(status)} size="sm">
                          {status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          <div>Expires at {formatDate(expiresAt)}</div>
                          <div>Publish at {formatDate(createdAt)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {createdBy}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {formatDate(modifiedAt)}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {modifiedBy}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {type}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {language}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600">
                        {responses}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <IconButton
                            title="View"
                            size="sm"
                            // onClick={() => handleViewSurvey(survey)}
                          >
                            <Eye size={14} className="sm:w-4 sm:h-4" />
                          </IconButton>
                          <IconButton
                            title="Download"
                            size="sm"
                            onClick={() => handleDownloadSurvey(survey)}
                          >
                            <Download size={14} className="sm:w-4 sm:h-4" />
                          </IconButton>
                          <IconButton
                            title="Share"
                            size="sm"
                            onClick={() => handleShareSurvey(survey)}
                          >
                            <Share2 size={14} className="sm:w-4 sm:h-4" />
                          </IconButton>
                          <IconButton
                            title="Copy"
                            size="sm"
                            onClick={() => handleCopySurvey(survey)}
                          >
                            <Copy size={14} className="sm:w-4 sm:h-4" />
                          </IconButton>
                          <IconButton title="More" size="sm">
                            <MoreHorizontal
                              size={14}
                              className="sm:w-4 sm:h-4"
                            />
                          </IconButton>
                          <IconButton
                            title="Delete"
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteSurvey(survey)}
                          >
                            <Trash2 size={14} className="sm:w-4 sm:h-4" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No surveys found</p>
                      <p className="text-sm mt-1">
                        {searchTerm || dateFilter
                          ? `No surveys match your search criteria`
                          : `No surveys in "${activeTab}" status`}
                      </p>
                      {surveys.length === 0 &&
                        !searchTerm &&
                        activeTab === 'All' && (
                          <Button
                            onClick={fetchSurveys}
                            className="mt-4"
                            variant="outline"
                          >
                            Refresh
                          </Button>
                        )}
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

        {/* Create Survey Modal */}
        <CreateSurveyModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSurveyCreated={fetchSurveys}
        />
      </div>
    </div>
  );
};
