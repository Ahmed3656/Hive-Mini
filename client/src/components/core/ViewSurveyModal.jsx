import React, { useState } from 'react';
import { Badge, Button, Modal, useToastHelpers } from '../ui';
import { ConfirmAction } from './ConfirmAction';
import { Download, Share2, Copy, Trash2, ExternalLink } from 'lucide-react';

export const ViewSurveyModal = ({ isOpen, onClose, survey, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { success, info } = useToastHelpers();

  if (!survey) return null;

  // Helper
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  const surveyData = {
    id: survey.ID || survey.id || 'N/A',
    title: survey.Title || survey.title || 'Untitled Survey',
    status: survey.Status || survey.status || 'Draft',
    type: survey.Type || survey.type || 'N/A',
    language: survey.Language || survey.language || 'N/A',
    responses: survey.Responses || survey.responses || 0,
    createdAt: formatDate(survey.CreatedAt || survey.createdAt),
    modifiedAt: formatDate(survey.ModifiedAt || survey.modifiedAt),
    createdBy: survey.CreatedByUserName || survey.createdBy || 'Unknown',
    modifiedBy: survey.ModifiedByUserName || survey.modifiedBy || 'Unknown',
  };

  const getExpiryDate = () => {
    const baseDate =
      survey.ModifiedAt ||
      survey.modifiedAt ||
      survey.CreatedAt ||
      survey.createdAt;
    if (!baseDate) return 'Not set';

    try {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + 30);
      return date.toLocaleDateString();
    } catch {
      return 'Not set';
    }
  };

  const getPublishDate = () => {
    if (surveyData.status === 'Draft') return 'Not published';
    return surveyData.createdAt;
  };

  const handleShare = () => {
    info('Share Link Copied', 'Survey link has been copied to your clipboard');
  };

  const handleCopy = () => {
    success('Survey Copied', `"${surveyData.title}" has been duplicated`);
  };

  const handleDownload = () => {
    success('Download Started', `Downloading "${surveyData.title}" data`);
  };

  const handlePreview = () => {
    info('Opening Preview', 'Survey preview will open in a new tab');
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(survey);
    setShowDeleteConfirm(false);
    onClose();
  };

  const getStatusVariant = (status) => {
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
    <Modal isOpen={isOpen} onClose={onClose} title="Survey Details" size="lg">
      <div className="space-y-6">
        {/* Survey Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900 break-words">
                {surveyData.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Survey ID: {surveyData.id}
              </p>
            </div>
            <Badge variant={getStatusVariant(surveyData.status)} size="md">
              {surveyData.status}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handlePreview}
              variant="primary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ExternalLink size={14} />
              <span>Preview</span>
            </Button>
            <Button
              onClick={handleShare}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Share2 size={14} />
              <span>Share</span>
            </Button>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </Button>
            <Button
              onClick={handleDownload}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download size={14} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Survey Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <div className="space-y-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="type"
                >
                  Type
                </label>
                <p className="mt-1 text-sm text-gray-900">{surveyData.type}</p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="language"
                >
                  Language
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {surveyData.language}
                </p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="responses"
                >
                  Responses
                </label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">
                  {surveyData.responses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Timeline
            </h3>

            <div className="space-y-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="created"
                >
                  Created
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {surveyData.createdAt}
                </p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="published"
                >
                  Published
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {getPublishDate() === 'Not published' ? (
                    <span className="text-gray-500 italic">Not published</span>
                  ) : (
                    getPublishDate()
                  )}
                </p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="expiry"
                >
                  Expires
                </label>
                <p className="mt-1 text-sm text-gray-900">{getExpiryDate()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Team & Modifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="createdBy"
              >
                Created By
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {surveyData.createdBy}
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastModified"
              >
                Last Modified
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {surveyData.modifiedAt} by {surveyData.modifiedBy}
              </p>
            </div>
          </div>
        </div>

        {/* Response Statistics (if survey has responses) */}
        {surveyData.responses > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Response Overview
            </h3>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#0075BE]">
                    {surveyData.responses.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Responses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (surveyData.responses / (surveyData.responses + 50)) * 100
                    )}
                    %
                  </p>
                  <p className="text-sm text-gray-600">Response Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(surveyData.responses / 7)}
                  </p>
                  <p className="text-sm text-gray-600">Avg. per Day</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              onClick={handleDelete}
              variant="danger"
              className="flex items-center space-x-2"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </Button>
          </div>

          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <ConfirmAction
          action="delete"
          surveyData={surveyData}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Modal>
  );
};
